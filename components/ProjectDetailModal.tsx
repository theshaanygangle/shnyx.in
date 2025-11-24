import React from 'react';
import Modal from './Modal';
import { Project } from '../types';
import { Github, ExternalLink, Layers, Trophy, Wrench } from 'lucide-react';
import Button from './Button';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
}

const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <Modal isOpen={!!project} onClose={onClose} maxWidth="4xl">
      <div className="space-y-8">
        
        {/* Header */}
        <div className="space-y-4">
          <div className="aspect-video w-full rounded-xl overflow-hidden border border-white/10 bg-surfaceHighlight relative">
             <img src={project.images[0]} alt={project.title} className="w-full h-full object-cover" />
             <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent pt-20">
                <h2 className="text-3xl md:text-4xl font-bold text-white">{project.title}</h2>
                <p className="text-lg text-gray-300 mt-2">{project.summary}</p>
             </div>
          </div>
          
          <div className="flex flex-wrap gap-4 justify-between items-center pb-6 border-b border-white/10">
            <div className="flex gap-2">
               {project.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 rounded-full bg-white/5 text-xs font-medium text-muted border border-white/5">
                    {tag}
                  </span>
               ))}
            </div>
            <div className="flex gap-3">
               {project.links.repo && (
                   <a href={project.links.repo} target="_blank" rel="noreferrer">
                      <Button variant="secondary" size="sm" icon={<Github size={16}/>}>Code</Button>
                   </a>
               )}
               {project.links.live && (
                   <a href={project.links.live} target="_blank" rel="noreferrer">
                      <Button variant="primary" size="sm" icon={<ExternalLink size={16}/>}>Live Demo</Button>
                   </a>
               )}
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {/* Left Content */}
           <div className="md:col-span-2 space-y-8">
              <div className="space-y-3">
                 <h3 className="text-xl font-bold text-white flex items-center gap-2">
                   <Wrench size={20} className="text-accent" />
                   The Problem
                 </h3>
                 <p className="text-muted leading-relaxed">{project.details.problem}</p>
              </div>

              <div className="space-y-3">
                 <h3 className="text-xl font-bold text-white flex items-center gap-2">
                   <Layers size={20} className="text-accent" />
                   The Solution
                 </h3>
                 <p className="text-muted leading-relaxed">{project.details.solution}</p>
              </div>

              {/* Additional Images Gallery */}
              {project.images.length > 1 && (
                <div className="grid grid-cols-2 gap-4 mt-4">
                   {project.images.slice(1).map((img, idx) => (
                      <img key={idx} src={img} alt="Detail" className="rounded-lg border border-white/10 hover:opacity-80 transition-opacity cursor-pointer" />
                   ))}
                </div>
              )}
           </div>

           {/* Right Sidebar */}
           <div className="space-y-8">
              <div className="bg-surface p-5 rounded-xl border border-white/5 space-y-4">
                 <div>
                    <div className="text-xs text-muted uppercase font-bold mb-1">Role</div>
                    <div className="text-white">{project.details.role}</div>
                 </div>
                 <div>
                    <div className="text-xs text-muted uppercase font-bold mb-1">Year</div>
                    <div className="text-white">{project.year}</div>
                 </div>
                 <div>
                    <div className="text-xs text-muted uppercase font-bold mb-2">Tech Stack</div>
                    <div className="flex flex-wrap gap-2">
                       {project.details.techStack.map(t => (
                          <span key={t} className="text-xs text-muted bg-white/5 px-2 py-1 rounded">{t}</span>
                       ))}
                    </div>
                 </div>
              </div>

              {project.details.metrics && (
                 <div className="bg-surface p-5 rounded-xl border border-white/5">
                    <h4 className="text-white font-bold flex items-center gap-2 mb-4">
                       <Trophy size={16} className="text-yellow-500" />
                       Key Metrics
                    </h4>
                    <ul className="space-y-2">
                       {project.details.metrics.map((m, i) => (
                          <li key={i} className="text-sm text-muted flex items-start gap-2">
                             <span className="w-1 h-1 bg-accent rounded-full mt-2 shrink-0"></span>
                             {m}
                          </li>
                       ))}
                    </ul>
                 </div>
              )}
           </div>
        </div>

      </div>
    </Modal>
  );
};

export default ProjectDetailModal;