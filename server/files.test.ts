import { describe, it, expect, beforeAll, afterAll, vi } from 'vitest';
import { appRouter } from './routers';
import type { TrpcContext } from './_core/context';
import type { User } from '../drizzle/schema';

// Mock storage
vi.mock('./storage', () => ({
  storagePut: vi.fn(async () => ({
    key: 'test-key',
    url: 'https://example.com/test-file.pdf',
  })),
}));

// Mock database
vi.mock('./db', () => ({
  createPortfolioFile: vi.fn(async (file) => ({
    id: 1,
    ...file,
  })),
  getUserPortfolioFiles: vi.fn(async () => [
    {
      id: 1,
      userId: 1,
      fileName: 'cv.pdf',
      fileType: 'cv',
      mimeType: 'application/pdf',
      fileSize: 1024,
      s3Key: 'test-key',
      s3Url: 'https://example.com/test-file.pdf',
      category: 'cv',
      displayName: 'My CV',
      isPublic: 1,
      uploadedAt: new Date(),
      updatedAt: new Date(),
    },
  ]),
  getPortfolioFileById: vi.fn(async (id) => 
    id === 1 ? {
      id: 1,
      userId: 1,
      fileName: 'cv.pdf',
      fileType: 'cv',
      mimeType: 'application/pdf',
      fileSize: 1024,
      s3Key: 'test-key',
      s3Url: 'https://example.com/test-file.pdf',
      category: 'cv',
      displayName: 'My CV',
      isPublic: 1,
      uploadedAt: new Date(),
      updatedAt: new Date(),
    } : null
  ),
  deletePortfolioFile: vi.fn(async () => true),
  updatePortfolioFile: vi.fn(async (id, updates) => ({
    id,
    userId: 1,
    fileName: 'cv.pdf',
    fileType: 'cv',
    mimeType: 'application/pdf',
    fileSize: 1024,
    s3Key: 'test-key',
    s3Url: 'https://example.com/test-file.pdf',
    ...updates,
    uploadedAt: new Date(),
    updatedAt: new Date(),
  })),
}));

function createMockContext(): TrpcContext {
  const user: User = {
    id: 1,
    openId: 'test-user',
    email: 'test@example.com',
    name: 'Test User',
    loginMethod: 'manus',
    role: 'user',
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  return {
    user,
    req: {
      protocol: 'https',
      headers: {},
    } as TrpcContext['req'],
    res: {} as TrpcContext['res'],
  };
}

describe('File Management API', () => {
  let caller: ReturnType<typeof appRouter.createCaller>;

  beforeAll(() => {
    const ctx = createMockContext();
    caller = appRouter.createCaller(ctx);
  });

  describe('files.list', () => {
    it('should return list of user portfolio files', async () => {
      const files = await caller.files.list();
      expect(files).toBeDefined();
      expect(Array.isArray(files)).toBe(true);
      expect(files.length).toBeGreaterThan(0);
      expect(files[0]).toHaveProperty('fileName');
      expect(files[0]).toHaveProperty('s3Url');
    });
  });

  describe('files.upload', () => {
    it('should upload a file successfully', async () => {
      const testData = Buffer.from('test content').toString('base64');
      
      const result = await caller.files.upload({
        fileName: 'test.pdf',
        fileType: 'cv',
        mimeType: 'application/pdf',
        fileSize: 1024,
        category: 'cv',
        displayName: 'My Test CV',
        isPublic: true,
        fileData: testData,
      });

      expect(result).toBeDefined();
      expect(result.fileName).toBe('test.pdf');
      expect(result.fileType).toBe('cv');
      expect(result.s3Url).toBeDefined();
    });

    it('should validate required fields', async () => {
      try {
        await caller.files.upload({
          fileName: '',
          fileType: 'cv',
          mimeType: 'application/pdf',
          fileSize: 1024,
          isPublic: true,
          fileData: 'test',
        });
        expect.fail('Should have thrown validation error');
      } catch (error) {
        expect(error).toBeDefined();
      }
    });
  });

  describe('files.get', () => {
    it('should retrieve a file by ID', async () => {
      const file = await caller.files.get({ fileId: 1 });
      expect(file).toBeDefined();
      expect(file?.id).toBe(1);
      expect(file?.fileName).toBe('cv.pdf');
    });

    it('should return null for non-existent file', async () => {
      const file = await caller.files.get({ fileId: 999 });
      expect(file).toBeNull();
    });
  });

  describe('files.delete', () => {
    it('should delete a file successfully', async () => {
      const result = await caller.files.delete({ fileId: 1 });
      expect(result).toBe(true);
    });
  });

  describe('files.update', () => {
    it('should update file metadata', async () => {
      const updated = await caller.files.update({
        fileId: 1,
        displayName: 'Updated CV',
        category: 'cv',
        isPublic: false,
      });

      expect(updated).toBeDefined();
      expect(updated?.displayName).toBe('Updated CV');
      expect(updated?.isPublic).toBe(0);
    });
  });
});
