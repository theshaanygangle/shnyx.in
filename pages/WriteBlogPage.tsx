import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Save, Eye, Edit2, Image as ImageIcon, 
  Tag, Hash, Layout, Clock, CheckCircle, AlertCircle, FileText 
} from 'lucide-react';
import Button from '../components/Button';
import { ABOUT_DATA } from '../data';

const WriteBlogPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'write' | 'preview'>('write');
  const [isDirty, setIsDirty] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    thumbnail: '',
    category: 'Engineering',
    tags: '',
    slug: ''
  });

  // Auto-generate slug and check dirtiness
  useEffect(() => {
    if (formData.title) {
      const slug = formData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
      setFormData(prev => ({ ...prev, slug }));
    }
  }, [formData.title]);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setIsDirty(true);
  };

  const calculateReadTime = () => {
    const words = formData.content.trim().split(/\s+/).length;
    const minutes = Math.ceil(words / 200);
    return `${minutes} min read`;
  };

  const handlePublish = () => {
    if (!formData.title || !formData.content) return;
    
    setIsPublishing(true);
    // Simulate API call
    setTimeout(() => {
      setIsPublishing(false);
      setIsDirty(false);
      alert('Article published successfully! (Simulation)');
      navigate('/blog');
    }, 1500);
  };

  return (
    <div className="pt-24 pb-20 px-4 md:px-6 min-h-screen animate-fade-in">
      
      {/* Top Navigation Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 border-b border-border pb-6">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/blog')} 
            className="group p-2 rounded-full hover:bg-surfaceHighlight text-muted hover:text-text transition-colors"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> 
          </button>
          <div>
            <h1 className="text-2xl font-display font-bold text-text">Write & Manage</h1>
            <p className="text-xs text-muted flex items-center gap-2">
              {isDirty ? (
                <span className="flex items-center gap-1 text-yellow-500"><AlertCircle size={10} /> Unsaved changes</span>
              ) : (
                <span className="flex items-center gap-1 text-green-500"><CheckCircle size={10} /> Draft saved</span>
              )}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" icon={<Save size={16} />}>
            Save Draft
          </Button>
          <Button 
            variant="primary" 
            size="sm" 
            icon={isPublishing ? undefined : <Layout size={16} />}
            isLoading={isPublishing}
            onClick={handlePublish}
            disabled={!formData.title || !formData.content}
          >
            Publish
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Editor / Preview */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          
          {/* Title Input */}
          <div className="space-y-2">
            <input 
              type="text" 
              placeholder="Article Title..." 
              className="w-full bg-transparent text-3xl md:text-4xl font-bold text-text placeholder-muted/50 border-none focus:ring-0 px-0 py-2"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
            />
            <div className="flex items-center gap-2 text-xs text-muted font-mono">
              <span className="text-accent">slug:</span>
              <span>/blog/{formData.slug || '...'}</span>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-1 border-b border-border">
            <button 
              onClick={() => setActiveTab('write')}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${
                activeTab === 'write' 
                  ? 'border-accent text-text' 
                  : 'border-transparent text-muted hover:text-text'
              }`}
            >
              <Edit2 size={14} /> Write
            </button>
            <button 
              onClick={() => setActiveTab('preview')}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${
                activeTab === 'preview' 
                  ? 'border-accent text-text' 
                  : 'border-transparent text-muted hover:text-text'
              }`}
            >
              <Eye size={14} /> Preview
            </button>
          </div>

          {/* Main Content Area */}
          <div className="min-h-[500px] relative">
            {activeTab === 'write' ? (
              <textarea 
                className="w-full h-full min-h-[500px] bg-surface/30 border border-border rounded-xl p-6 text-text placeholder-muted/50 focus:outline-none focus:border-accent/50 focus:bg-surface/50 transition-all resize-y font-mono leading-relaxed"
                placeholder="Write your story here using Markdown..."
                value={formData.content}
                onChange={(e) => handleChange('content', e.target.value)}
              />
            ) : (
              <div className="w-full min-h-[500px] bg-surfaceHighlight/20 border border-border rounded-xl p-8 prose prose-invert max-w-none">
                {/* Simple Simulated Markdown Preview */}
                {formData.thumbnail && (
                  <img src={formData.thumbnail} alt="Cover" className="w-full h-64 object-cover rounded-lg mb-6" />
                )}
                <h1 className="text-3xl font-bold mb-4">{formData.title || 'Untitled'}</h1>
                {formData.content ? (
                  <div className="whitespace-pre-wrap">{formData.content}</div>
                ) : (
                  <p className="text-muted italic">Nothing to preview yet...</p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Settings Sidebar */}
        <div className="space-y-6">
          
          <div className="bg-surface border border-border rounded-xl p-5 space-y-5 sticky top-24">
            <h3 className="font-bold text-text flex items-center gap-2 border-b border-border pb-3">
              <Layout size={16} /> Post Settings
            </h3>

            {/* Excerpt */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-muted uppercase">Excerpt</label>
              <textarea 
                rows={3}
                className="w-full bg-background border border-border rounded-lg p-3 text-sm text-text focus:border-accent/50 focus:outline-none"
                placeholder="Short summary for SEO and cards..."
                value={formData.excerpt}
                onChange={(e) => handleChange('excerpt', e.target.value)}
              />
            </div>

            {/* Thumbnail */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-muted uppercase flex items-center gap-2">
                <ImageIcon size={12} /> Cover Image URL
              </label>
              <input 
                type="text"
                className="w-full bg-background border border-border rounded-lg p-3 text-sm text-text focus:border-accent/50 focus:outline-none"
                placeholder="https://..."
                value={formData.thumbnail}
                onChange={(e) => handleChange('thumbnail', e.target.value)}
              />
              {formData.thumbnail && (
                <div className="relative aspect-video rounded-lg overflow-hidden border border-border mt-2">
                  <img src={formData.thumbnail} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}
            </div>

            {/* Category */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-muted uppercase flex items-center gap-2">
                <Hash size={12} /> Category
              </label>
              <select 
                className="w-full bg-background border border-border rounded-lg p-3 text-sm text-text focus:border-accent/50 focus:outline-none appearance-none"
                value={formData.category}
                onChange={(e) => handleChange('category', e.target.value)}
              >
                <option>Engineering</option>
                <option>Frontend</option>
                <option>Backend</option>
                <option>DevOps</option>
                <option>Career</option>
                <option>Design</option>
              </select>
            </div>

            {/* Tags */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-muted uppercase flex items-center gap-2">
                <Tag size={12} /> Tags
              </label>
              <input 
                type="text"
                className="w-full bg-background border border-border rounded-lg p-3 text-sm text-text focus:border-accent/50 focus:outline-none"
                placeholder="React, TypeScript, ..."
                value={formData.tags}
                onChange={(e) => handleChange('tags', e.target.value)}
              />
              <div className="flex flex-wrap gap-1 mt-2">
                {formData.tags.split(',').filter(t => t.trim()).map((tag, i) => (
                  <span key={i} className="text-[10px] px-2 py-0.5 bg-surfaceHighlight rounded text-muted">
                    {tag.trim()}
                  </span>
                ))}
              </div>
            </div>

            {/* Meta Info Display */}
            <div className="pt-4 border-t border-border grid grid-cols-2 gap-4">
              <div>
                <div className="text-xs text-muted mb-1">Author</div>
                <div className="text-sm font-bold text-text flex items-center gap-2">
                   <div className="w-5 h-5 rounded-full bg-border overflow-hidden">
                     <img src="https://picsum.photos/seed/avatar/40" className="w-full h-full" alt="Me" />
                   </div>
                   {ABOUT_DATA.name}
                </div>
              </div>
              <div>
                <div className="text-xs text-muted mb-1">Read Time</div>
                <div className="text-sm font-bold text-text flex items-center gap-1">
                  <Clock size={14} className="text-accent" />
                  {calculateReadTime()}
                </div>
              </div>
            </div>

          </div>

          {/* Management Sidebar */}
          <div className="bg-surface border border-border rounded-xl p-5 space-y-4">
            <h3 className="font-bold text-text flex items-center gap-2 border-b border-border pb-3">
              <FileText size={16} /> Your Articles
            </h3>
            <div className="space-y-2">
               <div className="p-3 rounded-lg bg-surfaceHighlight/30 border border-border hover:border-accent/50 cursor-pointer transition-colors group">
                  <div className="text-sm font-bold group-hover:text-accent transition-colors">Optimizing React Perf...</div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-[10px] text-muted">Oct 12, 2025</span>
                    <span className="text-[10px] font-bold text-green-500 bg-green-500/10 px-1.5 py-0.5 rounded">Published</span>
                  </div>
               </div>
               <div className="p-3 rounded-lg bg-surfaceHighlight/30 border border-border hover:border-accent/50 cursor-pointer transition-colors group">
                  <div className="text-sm font-bold group-hover:text-accent transition-colors">Next.js 15 Thoughts</div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-[10px] text-muted">2 hours ago</span>
                    <span className="text-[10px] font-bold text-yellow-500 bg-yellow-500/10 px-1.5 py-0.5 rounded">Draft</span>
                  </div>
               </div>
               <Button variant="ghost" size="sm" className="w-full text-xs mt-2">View All</Button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default WriteBlogPage;