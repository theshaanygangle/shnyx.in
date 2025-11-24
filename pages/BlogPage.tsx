import React, { useState, useMemo } from "react";
import { BLOG_POSTS } from "../data";
import BlogCard from "../components/BlogCard";
import { Search, PenTool } from "lucide-react";
import Button from "../components/Button";
import { Link } from "react-router-dom";

const BlogPage: React.FC = () => {
  const [filter, setFilter] = useState<string>("All");
  const [search, setSearch] = useState<string>("");

  // Extract unique categories
  const categories = [
    "All",
    ...Array.from(new Set(BLOG_POSTS.map((p) => p.category))),
  ];

  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter((post) => {
      const matchesCategory = filter === "All" || post.category === filter;
      const matchesSearch =
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(search.toLowerCase()) ||
        post.tags.some((tag) =>
          tag.toLowerCase().includes(search.toLowerCase())
        );

      return matchesCategory && matchesSearch;
    });
  }, [filter, search]);

  return (
    <div className="pt-24 pb-20 px-4 md:px-6 min-h-screen animate-fade-in">
      {/* Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-text mb-3">
            Blogs & Insights
          </h1>
          <p className="text-muted max-w-xl">
            Tutorials, technical deep dives, and my learnings as a developer.
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-6 mb-10 items-start md:items-center justify-between">
        {/* Categories */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 border ${
                filter === cat
                  ? "bg-text text-background border-text"
                  : "bg-transparent text-muted border-border hover:border-muted hover:text-text"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full md:w-64">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
            size={16}
          />
          <input
            type="text"
            placeholder="Search articles..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-surface border border-border rounded-full py-2 pl-10 pr-4 text-sm text-text focus:outline-none focus:border-accent/50 transition-colors placeholder-muted/70"
          />
        </div>
      </div>

      {/* Grid */}
      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 border border-dashed border-border rounded-2xl bg-surface/30">
          <h3 className="text-xl font-bold text-text mb-2">No Blogs found!</h3>
          <p className="text-muted">Try adjusting your search or filter.</p>
          <button
            onClick={() => {
              setFilter("All");
              setSearch("");
            }}
            className="mt-4 text-accent hover:text-black"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
};

export default BlogPage;
