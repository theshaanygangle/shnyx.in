import React, { useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Clock, Calendar, Tag, User } from "lucide-react";
import { BLOG_POSTS, ABOUT_DATA } from "../data";
import Button from "../components/Button";

const BlogDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const post = BLOG_POSTS.find((p) => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!post) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-2xl font-bold text-text mb-4">Article not found</h2>
        <Button onClick={() => navigate("/blog")}>Back to Blog</Button>
      </div>
    );
  }

  return (
    <article className="pt-24 pb-20 px-4 md:px-6 animate-fade-in max-w-2xl mx-auto">
      {/* Back Link */}
      <div className="mb-8">
        <Link
          to="/blog"
          className="group inline-flex items-center gap-2 text-muted hover:text-text transition-colors text-sm font-medium"
        >
          <ArrowLeft
            size={16}
            className="group-hover:-translate-x-1 transition-transform"
          />
          Back to Articles
        </Link>
      </div>

      {/* Header */}
      <header className="mb-10">
        <div className="flex flex-wrap gap-3 mb-4 text-xs font-medium">
          <span className="px-2 py-1 rounded bg-accent/10 text-accent border border-accent/20">
            {post.category}
          </span>
          <span className="flex items-center gap-1 text-muted">
            <Calendar size={12} /> {post.date}
          </span>
          <span className="flex items-center gap-1 text-muted">
            <Clock size={12} /> {post.readTime}
          </span>
        </div>

        <h1 className="text-3xl md:text-4xl font-display font-bold text-text leading-tight mb-6">
          {post.title}
        </h1>

        {/* Author */}
        <div className="flex items-center gap-3 border-b border-border pb-8">
          <img
            src="../resources/profile/favicon.png"
            alt="Author"
            className="w-10 h-10 rounded-full border border-border"
          />
          <div>
            <div className="text-sm font-bold text-text">{ABOUT_DATA.name}</div>
            <div className="text-xs text-muted">{ABOUT_DATA.title}</div>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="prose prose-invert prose-lg max-w-none mb-12">
        {/* Render simplified content - in a real app use a Markdown renderer */}
        <img
          src={post.thumbnail}
          alt={post.title}
          className="w-full rounded-xl mb-8"
        />

        <p className="text-lg text-text/90 leading-relaxed font-medium mb-8">
          {post.excerpt}
        </p>

        {post.content && (
          <div className="text-muted whitespace-pre-wrap font-sans">
            {post.content}
          </div>
        )}
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 pt-8 border-t border-border">
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-surface border border-border text-xs text-muted"
          >
            <Tag size={12} /> {tag}
          </span>
        ))}
      </div>
    </article>
  );
};

export default BlogDetailPage;
