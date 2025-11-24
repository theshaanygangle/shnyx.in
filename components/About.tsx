import React from "react";
import { ABOUT_DATA } from "../data";
import GitHubHeatmap from "./GitHubHeatmap";

const About: React.FC = () => {
  return (
    <section className="py-12 px-4 md:px-6 " id="about">
      <div className="flex justify-center items-baseline gap-4 mb-8 ">
        <h2 className="text-text text-2xl md:text-3xl font-display font-bold">
          About Me
        </h2>
      </div>

      <div className="flex flex-col gap-12">
        {/* Bio Section with Left Avatar */}
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start">
          {/* Avatar - Small & Left */}
          <div className="shrink-0">
            <div className="relative group">
              <img
                src="../resources/profile/frame1.png"
                alt="Profile"
                loading="lazy"
                className="w-24 h-24 md:w-60 md:h-80 rounded-xl object-cover object-top border border-border  transition-all duration-500 shadow-lg group-hover:scale-105"
              />
            </div>
          </div>

          {/* Bio Text */}
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-text mb-2">Who I am</h3>
              <p className="text-base text-muted leading-relaxed">
                I’m Shaany, a full-stack developer who believes in learning by
                building. My journey into development has been shaped by
                curiosity and consistency. I love turning ideas into clean
                interfaces, reliable backends, and smooth user experiences.
                Coding became my way of growing—one project at a time—teaching
                me clarity, discipline, and effective problem-solving. Today, I
                focus on crafting meaningful digital experiences with
                TypeScript, React, and Node.js, driven by the excitement of what
                I can build next to learn and grow.
              </p>
              {/* Skills */}
              <div>
                <h3 className="text-lg font-semibold text-text my-4 flex items-center gap-2">
                  Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    "JavaScript",
                    "TypeScript",
                    "Node.js",
                    "Express.js",
                    "MongoDB",
                    "MySQL",
                    "REST",
                    "WebSockets",
                    "Git",
                    "GitHub",
                    "JWT",
                    "OAuth",
                    "Bcrypt",
                    "Vercel",
                    "Docker",
                  ].map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 rounded-lg bg-surface border border-border text-xs font-medium text-muted hover:text-accent hover:border-accent/30 transition-colors cursor-default select-none"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Stats Row Inline */}
          </div>
        </div>

        {/* GitHub & Skills */}
        <div className="space-y-8">
          {/* GitHub */}
          {/* <div>
            <h3 className="text-lg font-semibold text-text  flex items-center gap-2">
              Activity
            </h3>
            <GitHubHeatmap data={ABOUT_DATA.github} />
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default About;
