import React, { useState, useMemo } from "react";
import { PROJECTS_DATA } from "../data";
import { Project } from "../types";
import ProjectCard from "../components/ProjectCard";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ProjectsPage: React.FC = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<string>("All");
  const [search, setSearch] = useState<string>("");

  const categories = ["All", "Frontend", "Backend", "Full Stack"];

  const filteredProjects = useMemo(() => {
    return PROJECTS_DATA.filter((project) => {
      const matchesCategory = filter === "All" || project.category === filter;
      const matchesSearch =
        project.title.toLowerCase().includes(search.toLowerCase()) ||
        project.summary.toLowerCase().includes(search.toLowerCase()) ||
        project.tags.some((tag) =>
          tag.toLowerCase().includes(search.toLowerCase())
        );

      return matchesCategory && matchesSearch;
    });
  }, [filter, search]);

  const handleOpenProject = (project: Project) => {
    navigate(`/projects/${project.id}`);
  };

  return (
    <div className="pt-24 pb-20 px-4 md:px-6 min-h-screen animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-display font-bold text-text mb-3">
          All Projects
        </h1>
        <p className="text-muted max-w-xl">
          A collection of the web applications and tools I’ve created
        </p>
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
            placeholder="Search projects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-surface border border-border rounded-full py-2 pl-10 pr-4 text-sm text-text focus:outline-none focus:border-accent/50 transition-colors placeholder-muted/70"
          />
        </div>
      </div>

      {/* Grid */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={handleOpenProject}
              variant="compact"
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 border border-dashed border-border rounded-2xl bg-surface/30">
          <h3 className="text-xl font-bold text-text mb-2">
            No projects found
          </h3>
          <p className="text-muted">Try adjusting your search or filter.</p>
          <button
            onClick={() => {
              setFilter("All");
              setSearch("");
            }}
            className="mt-4 text-accent hover:underline"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
};

export default ProjectsPage;
