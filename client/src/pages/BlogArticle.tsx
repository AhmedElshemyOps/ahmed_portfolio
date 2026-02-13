import { trpc } from "@/lib/trpc";
import { useParams, Link } from "wouter";
import { Loader2, Calendar, Clock, ArrowLeft, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Streamdown } from "streamdown";

export default function BlogArticle() {
  const params = useParams();
  const slug = params.slug || "";

  const { data: post, isLoading, error } = trpc.blog.getBySlug.useQuery(
    { slug },
    { enabled: !!slug }
  );

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="animate-spin w-8 h-8 text-primary" />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <Link href="/blog">
            <a className="inline-flex items-center gap-2 text-primary hover:gap-3 transition-all mb-8">
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </a>
          </Link>
          <div className="bg-red-50 border border-red-200 rounded-lg p-8 text-center">
            <h1 className="text-2xl font-bold text-red-900 mb-2">Article Not Found</h1>
            <p className="text-red-700">The article you're looking for doesn't exist.</p>
          </div>
        </div>
      </div>
    );
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt || post.title,
        url: window.location.href,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Article Header */}
      <div className="bg-gradient-to-r from-primary to-primary/80 text-white py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <Link href="/blog">
            <a className="inline-flex items-center gap-2 text-white/90 hover:text-white transition-colors mb-6">
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </a>
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>
          {post.excerpt && (
            <p className="text-lg text-white/90 mb-6">{post.excerpt}</p>
          )}
          <div className="flex flex-wrap items-center gap-4">
            {post.category && (
              <Badge className="bg-white/20 text-white hover:bg-white/30">
                {post.category}
              </Badge>
            )}
            <div className="flex items-center gap-2 text-white/80">
              <Calendar className="w-4 h-4" />
              {format(new Date(post.publishedAt), "MMMM dd, yyyy")}
            </div>
            {post.readingTime && (
              <div className="flex items-center gap-2 text-white/80">
                <Clock className="w-4 h-4" />
                {post.readingTime} min read
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="max-w-3xl mx-auto px-4 py-12">
        {post.featuredImage && (
          <img
            src={post.featuredImage}
            alt={post.title}
            className="w-full h-96 object-cover rounded-lg mb-8"
          />
        )}

        <div className="prose prose-lg max-w-none mb-8">
          <Streamdown>{post.content}</Streamdown>
        </div>

        {/* Article Metadata */}
        <div className="border-t pt-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Written by</p>
              <p className="font-semibold text-lg">{post.author || "Ahmed Mahmoud"}</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleShare}
              className="gap-2"
            >
              <Share2 className="w-4 h-4" />
              Share
            </Button>
          </div>

          {post.tags && (
            <div className="flex flex-wrap gap-2">
              <span className="text-sm text-muted-foreground">Tags:</span>
              {post.tags.split(",").map((tag) => (
                <Badge key={tag.trim()} variant="secondary" className="text-xs">
                  {tag.trim()}
                </Badge>
              ))}
            </div>
          )}
        </div>

        {/* Back to Blog Link */}
        <div className="mt-12 pt-8 border-t">
          <Link href="/blog">
            <a className="inline-flex items-center gap-2 text-primary hover:gap-3 transition-all">
              <ArrowLeft className="w-4 h-4" />
              Back to All Articles
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
