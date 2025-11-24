import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Calendar } from 'lucide-react';
import { BlogPost } from '../types';

interface BlogCardProps {
  post: BlogPost;
  variant?: 'compact' | 'full';
}

const BlogCard: React.FC<BlogCardProps> = ({ post, variant = 'full' }) => {
  return (
    <Link 
      to={`/blog/${post.id}`}
      className="group flex flex-col h-full bg-surface border border-border rounded-xl overflow-hidden hover:border-muted/30 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
    >
      {/* Thumbnail */}
      <div className="relative aspect-[16/9] overflow-hidden bg-surfaceHighlight">
        <img 
          src={post.thumbnail} 
          alt={post.title}
          loading="lazy" 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-bold border border-white/10">
            {post.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex items-center gap-3 text-xs text-muted mb-3">
           <span className="flex items-center gap-1"><Calendar size={12}/> {post.date}</span>
           <span className="w-1 h-1 rounded-full bg-border"></span>
           <span className="flex items-center gap-1"><Clock size={12}/> {post.readTime}</span>
        </div>

        <h3 className="text-lg font-bold text-text mb-3 group-hover:text-accent transition-colors line-clamp-2">
          {post.title}
        </h3>
        
        <p className="text-muted text-sm leading-relaxed mb-4 line-clamp-3 flex-grow">
          {post.excerpt}
        </p>

        <div className="flex items-center text-sm font-bold text-text mt-auto group-hover:text-accent transition-colors gap-2">
          Read Article <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;