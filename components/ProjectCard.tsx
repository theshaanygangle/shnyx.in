import React from 'react';
import { ExternalLink, Github, ArrowUpRight } from 'lucide-react';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
  onClick: (project: Project) => void;
  variant?: 'compact' | 'full';
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick, variant = 'full' }) => {
  return (
    <div 
      className="group relative bg-surface border border-border rounded-xl overflow-hidden hover:border-muted/30 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col h-full"
      onClick={() => onClick(project)}
    >
      {/* Image Area */}
      <div className="relative aspect-video overflow-hidden bg-surfaceHighlight">
        <img 
          src={project.thumbnail} 
          alt={project.title} 
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Overlay Quick Actions */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 backdrop-blur-sm">
          <button className="px-4 py-2 bg-white text-black rounded-full text-sm font-bold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75 shadow-lg">
            View Details
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-text group-hover:text-accent transition-colors">{project.title}</h3>
          <ArrowUpRight size={18} className="text-muted opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        
        <p className="text-muted text-sm line-clamp-2 mb-4 flex-grow">{project.summary}</p>
        
        <div className="flex flex-wrap gap-2 mt-auto">
          {project.tags.slice(0, 3).map(tag => (
            <span key={tag} className="text-xs px-2 py-1 rounded bg-background text-muted border border-border">
              {tag}
            </span>
          ))}
          {project.tags.length > 3 && (
            <span className="text-xs px-2 py-1 rounded bg-background text-muted border border-border">+{project.tags.length - 3}</span>
          )}
        </div>
        
        <div className="flex items-center gap-4 mt-4 pt-4 border-t border-border" onClick={(e) => e.stopPropagation()}>
           {project.links.live && (
             <a href={project.links.live} target="_blank" rel="noopener noreferrer" className="text-xs flex items-center gap-1 text-muted hover:text-text transition-colors">
               <ExternalLink size={12} /> Live Demo
             </a>
           )}
           {project.links.repo && (
             <a href={project.links.repo} target="_blank" rel="noopener noreferrer" className="text-xs flex items-center gap-1 text-muted hover:text-text transition-colors">
               <Github size={12} /> Source
             </a>
           )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;