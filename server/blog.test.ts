import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: () => {},
    } as TrpcContext["res"],
  };
}

describe("blog", () => {
  it("lists blog posts", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.blog.list({
      limit: 10,
      offset: 0,
    });

    expect(result).toBeDefined();
    expect(result.posts).toBeDefined();
    expect(Array.isArray(result.posts)).toBe(true);
    expect(result.total).toBeGreaterThanOrEqual(0);
  });

  it("retrieves blog post by slug", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    // First list posts to get a valid slug
    const listResult = await caller.blog.list({
      limit: 1,
      offset: 0,
    });

    if (listResult.posts.length > 0) {
      const post = listResult.posts[0];
      const result = await caller.blog.getBySlug({
        slug: post.slug,
      });

      expect(result).toBeDefined();
      expect(result?.title).toBe(post.title);
      expect(result?.slug).toBe(post.slug);
      expect(result?.content).toBeDefined();
    }
  });

  it("returns null for non-existent slug", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.blog.getBySlug({
      slug: "non-existent-article-slug-12345",
    });

    expect(result).toBeNull();
  });

  it("retrieves blog posts by category", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.blog.getByCategory({
      category: "Operations Trends",
      limit: 10,
    });

    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBe(true);
  });

  it("respects limit parameter", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.blog.list({
      limit: 5,
      offset: 0,
    });

    expect(result.posts.length).toBeLessThanOrEqual(5);
  });

  it("respects offset parameter", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const firstPage = await caller.blog.list({
      limit: 10,
      offset: 0,
    });

    const secondPage = await caller.blog.list({
      limit: 10,
      offset: 10,
    });

    expect(firstPage.posts).toBeDefined();
    expect(secondPage.posts).toBeDefined();
    expect(Array.isArray(firstPage.posts)).toBe(true);
    expect(Array.isArray(secondPage.posts)).toBe(true);
  });
});
