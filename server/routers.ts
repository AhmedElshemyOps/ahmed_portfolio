import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, protectedProcedure } from "./_core/trpc";
import { z } from "zod";
import { createPortfolioFile, getUserPortfolioFiles, getPortfolioFileById, deletePortfolioFile, updatePortfolioFile, createContactMessage, markEmailSent, getBlogPosts, getBlogPostBySlug, getBlogPostsByCategory } from "./db";
import { storagePut } from "./storage";
import { sendContactNotification, sendContactConfirmation } from "./email";
import { nanoid } from "nanoid";
import { ENV } from "./_core/env";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  files: router({
    list: protectedProcedure.query(({ ctx }) =>
      getUserPortfolioFiles(ctx.user.id)
    ),
    
    upload: protectedProcedure
      .input(z.object({
        fileName: z.string().min(1),
        fileType: z.enum(['cv', 'certificate', 'document', 'image']),
        mimeType: z.string(),
        fileSize: z.number().positive(),
        category: z.string().optional(),
        displayName: z.string().optional(),
        isPublic: z.boolean().default(true),
        fileData: z.string(),
      }))
      .mutation(async ({ ctx, input }) => {
        try {
          const buffer = Buffer.from(input.fileData, 'base64');
          const fileExtension = input.fileName.split('.').pop() || 'file';
          const s3Key = `portfolio-files/${ctx.user.id}/${input.fileType}/${nanoid()}.${fileExtension}`;
          
          const { url: s3Url } = await storagePut(s3Key, buffer, input.mimeType);
          
          const file = await createPortfolioFile({
            userId: ctx.user.id,
            fileName: input.fileName,
            fileType: input.fileType,
            mimeType: input.mimeType,
            fileSize: input.fileSize,
            s3Key,
            s3Url,
            category: input.category,
            displayName: input.displayName || input.fileName,
            isPublic: input.isPublic ? 1 : 0,
          });
          
          return file;
        } catch (error) {
          console.error('[Files] Upload failed:', error);
          throw error;
        }
      }),
    
    get: protectedProcedure
      .input(z.object({ fileId: z.number() }))
      .query(async ({ ctx, input }) => {
        const file = await getPortfolioFileById(input.fileId);
        if (!file) return null;
        
        if (file.userId !== ctx.user.id && !file.isPublic) {
          throw new Error('Unauthorized');
        }
        
        return file;
      }),
    
    delete: protectedProcedure
      .input(z.object({ fileId: z.number() }))
      .mutation(async ({ ctx, input }) => {
        const file = await getPortfolioFileById(input.fileId);
        if (!file) throw new Error('File not found');
        
        if (file.userId !== ctx.user.id) {
          throw new Error('Unauthorized');
        }
        
        return deletePortfolioFile(input.fileId);
      }),
    
    update: protectedProcedure
      .input(z.object({
        fileId: z.number(),
        displayName: z.string().optional(),
        category: z.string().optional(),
        isPublic: z.boolean().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        const file = await getPortfolioFileById(input.fileId);
        if (!file) throw new Error('File not found');
        
        if (file.userId !== ctx.user.id) {
          throw new Error('Unauthorized');
        }
        
        return updatePortfolioFile(input.fileId, {
          displayName: input.displayName,
          category: input.category,
          isPublic: input.isPublic ? 1 : 0,
        });
      }),
  }),

  blog: router({
    list: publicProcedure
      .input(z.object({
        limit: z.number().max(50).default(10),
        offset: z.number().default(0),
      }))
      .query(async ({ input }) => {
        try {
          const posts = await getBlogPosts(input.limit, input.offset);
          return {
            posts: posts || [],
            total: posts?.length || 0,
          };
        } catch (error) {
          console.error('[Blog] List error:', error);
          return { posts: [], total: 0 };
        }
      }),

    getBySlug: publicProcedure
      .input(z.object({
        slug: z.string().min(1),
      }))
      .query(async ({ input }) => {
        try {
          const post = await getBlogPostBySlug(input.slug);
          return post || null;
        } catch (error) {
          console.error('[Blog] Get by slug error:', error);
          return null;
        }
      }),

    getByCategory: publicProcedure
      .input(z.object({
        category: z.string().min(1),
        limit: z.number().max(50).default(10),
      }))
      .query(async ({ input }) => {
        try {
          const posts = await getBlogPostsByCategory(input.category, input.limit);
          return posts || [];
        } catch (error) {
          console.error('[Blog] Get by category error:', error);
          return [];
        }
      }),
  }),

  contact: router({
    submit: publicProcedure
      .input(z.object({
        visitorName: z.string().min(1, "Name is required"),
        visitorEmail: z.string().email("Valid email is required"),
        visitorPhone: z.string().optional(),
        subject: z.string().min(1, "Subject is required"),
        message: z.string().min(10, "Message must be at least 10 characters"),
      }))
      .mutation(async ({ input }) => {
        try {
          const message = await createContactMessage({
            visitorName: input.visitorName,
            visitorEmail: input.visitorEmail,
            visitorPhone: input.visitorPhone || null,
            subject: input.subject,
            message: input.message,
            isRead: 0,
            emailSent: 0,
          });

          if (!message) {
            throw new Error('Failed to save message');
          }

          const ownerEmail = ENV.ownerEmail || 'owner@example.com';
          const ownerName = ENV.ownerName || 'Portfolio Owner';

          const emailSent = await sendContactNotification(
            ownerEmail,
            input.visitorName,
            input.visitorEmail,
            input.visitorPhone || null,
            input.subject,
            input.message
          );

          if (emailSent) {
            await markEmailSent(message.id);
          }

          await sendContactConfirmation(input.visitorEmail, input.visitorName, ownerName);

          return {
            success: true,
            messageId: message.id,
            message: 'Thank you for your message! We will get back to you soon.',
          };
        } catch (error) {
          console.error('[Contact] Submission error:', error);
          throw error;
        }
      }),
  }),
});

export type AppRouter = typeof appRouter;
