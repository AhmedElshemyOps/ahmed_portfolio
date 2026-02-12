import { describe, it, expect, beforeAll, vi } from 'vitest';
import { appRouter } from './routers';
import type { TrpcContext } from './_core/context';

// Mock database
vi.mock('./db', () => ({
  createContactMessage: vi.fn(async (msg) => ({
    id: 1,
    ...msg,
    createdAt: new Date(),
  })),
  markEmailSent: vi.fn(async () => {}),
}));

// Mock email service
vi.mock('./email', () => ({
  sendContactNotification: vi.fn(async () => true),
  sendContactConfirmation: vi.fn(async () => true),
}));

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: 'https',
      headers: {},
    } as TrpcContext['req'],
    res: {} as TrpcContext['res'],
  };
}

describe('Contact Form API', () => {
  let caller: ReturnType<typeof appRouter.createCaller>;

  beforeAll(() => {
    const ctx = createPublicContext();
    caller = appRouter.createCaller(ctx);
  });

  describe('contact.submit', () => {
    it('should submit a contact form successfully', async () => {
      const result = await caller.contact.submit({
        visitorName: 'John Doe',
        visitorEmail: 'john@example.com',
        visitorPhone: '+1234567890',
        subject: 'Job Inquiry',
        message: 'I am interested in discussing a hospitality operations role with you.',
      });

      expect(result).toBeDefined();
      expect(result.success).toBe(true);
      expect(result.messageId).toBeDefined();
      expect(result.message).toContain('Thank you');
    });

    it('should validate required fields', async () => {
      try {
        await caller.contact.submit({
          visitorName: '',
          visitorEmail: 'john@example.com',
          subject: 'Test',
          message: 'Test message content here',
        });
        expect.fail('Should have thrown validation error');
      } catch (error) {
        expect(error).toBeDefined();
      }
    });

    it('should validate email format', async () => {
      try {
        await caller.contact.submit({
          visitorName: 'John Doe',
          visitorEmail: 'invalid-email',
          subject: 'Test',
          message: 'Test message content here',
        });
        expect.fail('Should have thrown validation error');
      } catch (error) {
        expect(error).toBeDefined();
      }
    });

    it('should validate minimum message length', async () => {
      try {
        await caller.contact.submit({
          visitorName: 'John Doe',
          visitorEmail: 'john@example.com',
          subject: 'Test',
          message: 'Short',
        });
        expect.fail('Should have thrown validation error');
      } catch (error) {
        expect(error).toBeDefined();
      }
    });

    it('should accept optional phone number', async () => {
      const result = await caller.contact.submit({
        visitorName: 'Jane Smith',
        visitorEmail: 'jane@example.com',
        subject: 'Consulting Inquiry',
        message: 'I would like to discuss process improvement consulting services.',
      });

      expect(result.success).toBe(true);
    });
  });
});
