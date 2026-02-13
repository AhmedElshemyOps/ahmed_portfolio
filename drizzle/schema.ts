import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Portfolio Files Table
 * Stores metadata for user-uploaded files (CV, certificates, documents, etc.)
 * File bytes are stored in S3, this table only stores references and metadata
 */
export const portfolioFiles = mysqlTable("portfolio_files", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  fileName: varchar("fileName", { length: 255 }).notNull(),
  fileType: varchar("fileType", { length: 50 }).notNull(),
  mimeType: varchar("mimeType", { length: 100 }).notNull(),
  fileSize: int("fileSize").notNull(),
  s3Key: varchar("s3Key", { length: 500 }).notNull(),
  s3Url: text("s3Url").notNull(),
  category: varchar("category", { length: 100 }),
  displayName: varchar("displayName", { length: 255 }),
  isPublic: int("isPublic").default(1).notNull(),
  uploadedAt: timestamp("uploadedAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type PortfolioFile = typeof portfolioFiles.$inferSelect;
export type InsertPortfolioFile = typeof portfolioFiles.$inferInsert;

/**
 * Contact Messages Table
 * Stores messages submitted through the contact form
 * Used to track inquiries and send email notifications
 */
export const contactMessages = mysqlTable("contact_messages", {
  id: int("id").autoincrement().primaryKey(),
  visitorName: varchar("visitorName", { length: 255 }).notNull(),
  visitorEmail: varchar("visitorEmail", { length: 320 }).notNull(),
  visitorPhone: varchar("visitorPhone", { length: 20 }),
  subject: varchar("subject", { length: 255 }).notNull(),
  message: text("message").notNull(),
  isRead: int("isRead").default(0).notNull(),
  emailSent: int("emailSent").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type ContactMessage = typeof contactMessages.$inferSelect;
export type InsertContactMessage = typeof contactMessages.$inferInsert;

/**
 * Blog Posts Table
 * Stores published blog articles to establish thought leadership
 */
export const blogPosts = mysqlTable("blog_posts", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  excerpt: text("excerpt"),
  content: text("content").notNull(),
  category: varchar("category", { length: 100 }),
  tags: varchar("tags", { length: 500 }),
  author: varchar("author", { length: 255 }).default("Ahmed Mahmoud"),
  featuredImage: text("featuredImage"),
  readingTime: int("readingTime"),
  isPublished: int("isPublished").default(1).notNull(),
  publishedAt: timestamp("publishedAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type BlogPost = typeof blogPosts.$inferSelect;
export type InsertBlogPost = typeof blogPosts.$inferInsert;