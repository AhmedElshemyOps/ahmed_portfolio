import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, protectedProcedure } from "./_core/trpc";
import { z } from "zod";
import { createPortfolioFile, getUserPortfolioFiles, getPortfolioFileById, deletePortfolioFile, updatePortfolioFile } from "./db";
import { storagePut } from "./storage";
import { nanoid } from "nanoid";

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
});

export type AppRouter = typeof appRouter;
