import React from "react";
import Hero from "../components/Hero";
import About from "../components/About";
import WallOfFame from "../components/WallOfFame";
import ProjectCard from "../components/ProjectCard";
import BlogCard from "../components/BlogCard";
import { PROJECTS_DATA, BLOG_POSTS } from "../data";
import { Project } from "../types";
import { ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { ABOUT_DATA } from "../data";

interface HomeProps {
  onOpenContact: () => void;
}

const Home: React.FC<HomeProps> = ({ onOpenContact }) => {
  const navigate = useNavigate();

  // Limit to 4 to keep the grid balanced in 2 columns (matching blog cards)
  const featuredProjects = PROJECTS_DATA.filter((p) => p.featured).slice(0, 4);
  const recentPosts = BLOG_POSTS.slice(0, 2);

  const handleOpenProject = (project: Project) => {
    navigate(`/projects/${project.id}`);
  };

  const subject = "Business Inquiry";
  const body = "Hi Shaany,%0D%0A%0D%0AI would like to discuss...";

  return (
    <div className="animate-fade-in">
      <Hero onOpenContact={onOpenContact} />

      {/* Featured Projects Section */}
      <section className="py-16 bg-surfaceHighlight/30">
        <div className="px-4 md:px-6">
          <div className="flex justify-center">
            <div className="flex flex-col items-start mb-8">
              <h2 className="text-2xl md:text-3xl font-display font-bold text-text">
                Projects
              </h2>
              <div className="inline-flex items-center gap-2 px-3 py-1 mt-3 rounded-full bg-surface text-muted text-[10px] font-bold uppercase tracking-wider border border-border w-fit mb-3">
                Selected Work
              </div>
            </div>
          </div>

          {/* Grid: grid-cols-2 for wider cards equal to blog cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            {featuredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onClick={handleOpenProject}
                variant="compact"
              />
            ))}
          </div>

          <div className="flex justify-center">
            <Link to="/projects">
              <Button
                variant="secondary"
                size="lg"
                icon={<ArrowRight size={18} />}
                className="w-full md:w-auto"
              >
                View All Projects
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <About />

      <WallOfFame />

      {/* Recent Blog Section */}
      <section className="py-16 px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-center mb-8 gap-4">
          <div className="">
            <div className="flex justify-center items-baseline gap-4 mb-2">
              <h2 className="text-text text-2xl md:text-3xl font-display font-bold">
                Blogs
              </h2>
            </div>
            <p className="text-muted max-w-xl">
              Thoughts on engineering, design, and product development.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {recentPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>

        <div className="flex justify-center">
          <Link to="/blog">
            <Button
              variant="secondary"
              size="lg"
              icon={<ArrowRight size={18} />}
              className="w-full md:w-auto"
            >
              View All Blogs
            </Button>
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 md:px-6">
        <div className="bg-gradient-to-br from-surface to-surfaceHighlight border border-border rounded-2xl p-8 md:p-12 text-center relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2 transition-opacity group-hover:opacity-75"></div>

          <h2 className="text-2xl md:text-4xl font-bold text-text mb-4 relative z-10">
            Ready to build something amazing?
          </h2>
          <p className="text-muted text-base md:text-lg mb-8 max-w-xl mx-auto relative z-10">
            I'm currently available for internship, open source projects and
            open to full-time opportunities.
          </p>
          <div className="relative z-10">
            <button
              onClick={() =>
                (window.location.href = `mailto:${ABOUT_DATA.email}?subject=${subject}&body=${body}`)
              }
              className="bg-text text-background px-8 py-3 rounded-full font-bold hover:opacity-90 hover:scale-105 transition-all duration-200 shadow-lg flex items-center gap-2 mx-auto"
            >
              Book a call <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
