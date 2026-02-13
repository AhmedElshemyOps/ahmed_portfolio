import { trpc } from "@/lib/trpc";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, Calendar, Clock, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { format } from "date-fns";

export default function Blog() {
  const { data, isLoading, error } = trpc.blog.list.useQuery({
    limit: 10,
    offset: 0,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="animate-spin w-8 h-8 text-primary" />
      </div>
    );
  }

  const posts = data?.posts || [];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-primary/80 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Insights & Articles</h1>
          <p className="text-lg text-white/90">
            Exploring hospitality operations trends, digital transformation, and operational excellence
          </p>
        </div>
      </div>

      {/* Blog Posts */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
            <p className="text-red-800">Failed to load blog posts. Please try again later.</p>
          </div>
        )}

        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No blog posts available yet.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`}>
                <a className="block hover:no-underline">
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                    <CardHeader>
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div className="flex-1">
                          <CardTitle className="text-2xl mb-2 hover:text-primary transition-colors">
                            {post.title}
                          </CardTitle>
                          <CardDescription className="text-base">{post.excerpt}</CardDescription>
                        </div>
                        {post.featuredImage && (
                          <img
                            src={post.featuredImage}
                            alt={post.title}
                            className="w-32 h-32 object-cover rounded-lg flex-shrink-0"
                          />
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap items-center gap-4 mb-4">
                        {post.category && (
                          <Badge variant="secondary">{post.category}</Badge>
                        )}
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          {format(new Date(post.publishedAt), "MMM dd, yyyy")}
                        </div>
                        {post.readingTime && (
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="w-4 h-4" />
                            {post.readingTime} min read
                          </div>
                        )}
                      </div>

                      {post.tags && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {post.tags.split(",").map((tag) => (
                            <Badge key={tag.trim()} variant="outline" className="text-xs">
                              {tag.trim()}
                            </Badge>
                          ))}
                        </div>
                      )}

                      <div className="inline-flex items-center gap-2 text-primary transition-all">
                        Read Article
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </CardContent>
                  </Card>
                </a>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
