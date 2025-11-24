import React from 'react';
import { GitHubData } from '../types';

const GitHubHeatmap: React.FC<{ data: GitHubData }> = ({ data }) => {
  // Simulate a year of data (52 weeks * 7 days)
  // In a real app, we would fetch this from GitHub API
  const generateHeatmap = () => {
    const weeks = 52;
    const days = 7;
    const grid = [];
    
    for (let i = 0; i < weeks; i++) {
      const week = [];
      for (let j = 0; j < days; j++) {
        // Random contribution level 0-4
        // Bias towards 0 and 1 for realism
        const rand = Math.random();
        let level = 0;
        if (rand > 0.9) level = 4;
        else if (rand > 0.7) level = 3;
        else if (rand > 0.5) level = 2;
        else if (rand > 0.2) level = 1;
        
        week.push(level);
      }
      grid.push(week);
    }
    return grid;
  };

  const grid = React.useMemo(() => generateHeatmap(), []);

  const getColor = (level: number) => {
    switch (level) {
      case 1: return 'bg-green-900/40';
      case 2: return 'bg-green-700/60';
      case 3: return 'bg-green-500/80';
      case 4: return 'bg-green-400';
      default: return 'bg-[#27272A]';
    }
  };

  return (
    <a 
      href={data.profile} 
      target="_blank" 
      rel="noopener noreferrer"
      className="block p-6 rounded-2xl border border-dashed border-white/10 bg-surface/30 hover:bg-surface/50 transition-colors group"
    >
      <div className="flex justify-between items-end mb-4">
        <div>
          <h4 className="text-sm font-medium text-muted uppercase tracking-wider mb-1">GitHub Contributions</h4>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-white">{data.contributions.toLocaleString()}</span>
            <span className="text-xs text-muted">in the last year</span>
          </div>
        </div>
        <div className="text-xs text-muted text-right">
          Last active: <span className="text-white">{data.lastActive}</span>
        </div>
      </div>

      <div className="flex gap-[3px] overflow-hidden h-[100px] mask-fade-right">
        {grid.map((week, wIndex) => (
          <div key={wIndex} className="flex flex-col gap-[3px]">
            {week.map((level, dIndex) => (
              <div 
                key={`${wIndex}-${dIndex}`} 
                className={`w-[10px] h-[10px] rounded-[2px] ${getColor(level)}`}
              />
            ))}
          </div>
        ))}
      </div>
      
      <div className="mt-3 flex items-center justify-end gap-2 text-[10px] text-muted">
        <span>Less</span>
        <div className="flex gap-1">
           <div className="w-2 h-2 rounded-[1px] bg-[#27272A]"></div>
           <div className="w-2 h-2 rounded-[1px] bg-green-900/40"></div>
           <div className="w-2 h-2 rounded-[1px] bg-green-700/60"></div>
           <div className="w-2 h-2 rounded-[1px] bg-green-500/80"></div>
           <div className="w-2 h-2 rounded-[1px] bg-green-400"></div>
        </div>
        <span>More</span>
      </div>
    </a>
  );
};

export default GitHubHeatmap;