import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Github, ExternalLink, Calendar, Layers, Trophy, Target, ArrowRight, Cpu } from 'lucide-react';
import { PROJECTS_DATA } from '../data';
import Button from '../components/Button';

const ProjectDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const project = PROJECTS_DATA.find(p => p.id === id);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!project) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-2xl font-bold text-text mb-4">Project not found</h2>
        <Button onClick={() => navigate('/projects')}>Back to Projects</Button>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 px-4 md:px-6 animate-fade-in">
      
      {/* Top Navigation */}
      <div className="mb-6">
        <button 
          onClick={() => navigate(-1)} 
          className="group flex items-center gap-2 text-muted hover:text-text transition-colors text-sm font-medium"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> 
          Back
        </button>
      </div>

      {/* Header / Hero */}
      <div className="mb-10">
        <div className="flex flex-col gap-4 mb-8">
          <div className="flex flex-wrap gap-2 mb-2">
             <span className="px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-bold border border-accent/20">
               {project.category}
             </span>
             {project.featured && (
               <span className="px-3 py-1 rounded-full bg-surface text-muted text-xs font-bold border border-border">
                 Featured
               </span>
             )}
          </div>
          <h1 className="text-3xl md:text-5xl font-display font-bold text-text leading-tight">
            {project.title}
          </h1>
          <p className="text-lg md:text-xl text-muted max-w-2xl leading-relaxed">
            {project.summary}
          </p>
        </div>

        {/* Main Hero Image (Eager loaded for LCP) */}
        <div className="rounded-2xl overflow-hidden border border-border bg-surfaceHighlight aspect-video shadow-xl mb-8">
          <img 
            src={project.images[0]} 
            alt={project.title} 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Quick Links & Stats Bar */}
        <div className="flex flex-wrap items-center justify-between gap-6 border-y border-border py-6">
           <div className="flex gap-4">
             {project.links.live && (
               <a href={project.links.live} target="_blank" rel="noopener noreferrer">
                 <Button variant="primary" size="sm" icon={<ExternalLink size={16}/>}>Live Demo</Button>
               </a>
             )}
             {project.links.repo && (
               <a href={project.links.repo} target="_blank" rel="noopener noreferrer">
                 <Button variant="secondary" size="sm" icon={<Github size={16}/>}>View Code</Button>
               </a>
             )}
           </div>
           <div className="flex items-center gap-6 text-sm text-muted">
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <span>{project.year}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>{project.details.role}</span>
              </div>
           </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-20">
        
        {/* Left Column: Narrative */}
        <div className="lg:col-span-8 space-y-10">
          
          {/* Problem / Challenge */}
          <section>
            <h3 className="text-xl font-bold text-text mb-4 flex items-center gap-3">
              <Target className="text-accent" size={22} />
              The Challenge
            </h3>
            <div className="prose prose-invert text-muted leading-relaxed">
              <p>{project.details.problem}</p>
            </div>
          </section>

          {/* Solution & Approach */}
          <section>
            <h3 className="text-xl font-bold text-text mb-4 flex items-center gap-3">
              <Layers className="text-accent" size={22} />
              Solution & Approach
            </h3>
            <div className="prose prose-invert text-muted leading-relaxed">
              <p>{project.details.solution}</p>
              <p className="mt-4">
                {project.description}
              </p>
            </div>
          </section>

          {/* Additional Images */}
          {project.images.length > 1 && (
            <section>
              <h3 className="text-lg font-bold text-text mb-4">Project Gallery</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.images.slice(1).map((img, idx) => (
                  <div key={idx} className="rounded-xl overflow-hidden border border-border bg-surfaceHighlight">
                    <img 
                      src={img} 
                      alt={`${project.title} screenshot ${idx + 2}`} 
                      loading="lazy"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" 
                    />
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right Column: Sidebar Details */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Tech Stack */}
          <div className="bg-surface border border-border rounded-xl p-6">
            <h3 className="text-base font-bold text-text mb-4 flex items-center gap-2">
              <Cpu size={18} className="text-muted" />
              Tech Stack
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.details.techStack.map(tech => (
                <span key={tech} className="px-3 py-1.5 rounded bg-background text-sm text-muted border border-border">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Metrics / Learnings */}
          {project.details.metrics && (
            <div className="bg-surface border border-border rounded-xl p-6">
               <h3 className="text-base font-bold text-text mb-4 flex items-center gap-2">
                  <Trophy size={18} className="text-yellow-500" />
                  Key Outcomes
               </h3>
               <ul className="space-y-3">
                 {project.details.metrics.map((metric, i) => (
                   <li key={i} className="flex items-start gap-3 text-sm text-muted">
                     <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                     {metric}
                   </li>
                 ))}
               </ul>
            </div>
          )}

        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="border-t border-border pt-12 flex flex-col items-center justify-center gap-6">
        <h3 className="text-lg font-bold text-text">More to explore</h3>
        <Link to="/projects">
          <Button variant="secondary" size="lg" icon={<ArrowRight size={18} />}>
            View All Projects
          </Button>
        </Link>
      </div>

    </div>
  );
};

export default ProjectDetailPage;