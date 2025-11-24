import React, { useState, useEffect } from "react";
import { Download, Mail, Github, Linkedin, Twitter } from "lucide-react";
import Button from "./Button";
import { ABOUT_DATA } from "../data";

interface HeroProps {
  onOpenContact: () => void;
}

const Hero: React.FC<HeroProps> = ({ onOpenContact }) => {
  const [statusIndex, setStatusIndex] = useState(0);

  const availabilityStatuses = [
    "Available for Internships",
    "Open to Full-time Opportunities",
    "Love to collabrate to Open Source",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setStatusIndex((prev) => (prev + 1) % availabilityStatuses.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const socialLinks = [
    {
      icon: <Github size={20} />,
      href: ABOUT_DATA.socials.github,
      label: "GitHub",
    },
    {
      icon: <Linkedin size={20} />,
      href: ABOUT_DATA.socials.linkedin,
      label: "LinkedIn",
    },
    {
      icon: <Twitter size={20} />,
      href: ABOUT_DATA.socials.twitter,
      label: "Twitter",
    },
    {
      icon: <Mail size={20} />,
      href: `mailto:${ABOUT_DATA.email}`,
      label: "Email",
    },
  ];

  const subject = "Business Inquiry";
  const body = "Hi Shaany,%0D%0A%0D%0AI would like to discuss...";

  return (
    <section className="relative pt-12 pb-12 px-4 md:pt-28 transition-colors duration-300">
      <div className="w-full">
        {/* Cover Photo Container */}
        <div className="relative w-full h-48 md:h-72 rounded-2xl overflow-hidden group border border-border shadow-sm">
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-60 z-10"></div>
          <img
            src="/cover1.png"
            alt="Cover"
            className="w-full h-full object-cover object-[25%_22.5%]  transform transition-transform duration-700 group-hover:scale-105"
          />
        </div>

        {/* Profile Info Area */}
        <div className="relative px-4 md:px-6 -mt-16 z-20 flex flex-col items-start gap-4">
          {/* Avatar */}
          <div className="relative">
            <div className="w-32 h-32 rounded-full p-1 bg-background border border-border shadow-xl">
              <img
                src="/profile1.png"
                alt={ABOUT_DATA.name}
                className="w-full h-full rounded-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="absolute bottom-4 right-2.5 group">
              <div className="w-4 h-4 bg-green-500 rounded-full border-2 border-background animate-pulse"></div>

              {/* Tooltip */}
              <span
                className="
      absolute -top-8 right-1/2 translate-x-1/2 
      whitespace-nowrap px-2 py-1 
      text-xs rounded-md bg-gray-800 text-white
      opacity-0 group-hover:opacity-100 
      transition-all duration-200
      pointer-events-none
    "
              >
                Online
              </span>
            </div>
          </div>

          {/* Name & Title */}
          <div
            className="flex flex-col w-full gap-4 animate-fade-in-up"
            style={{ animationDelay: "100ms" }}
          >
            <div>
              <h1 className="text-3xl md:text-4xl font-display font-bold text-text mb-1">
                Hi, I'm {ABOUT_DATA.name} -{" "}
                <span className="text-2xl font-medium text-accent">
                  {ABOUT_DATA.title}
                </span>
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-muted">
                {/* Dynamic Availability Status */}
                <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-surface/80 border border-border backdrop-blur-sm shadow-sm mt-2">
                  <span className="relative flex h-2 w-2 shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                  <span
                    key={statusIndex}
                    className="text-sm font-medium text-text/90 animate-fade-in whitespace-nowrap min-w-[180px]"
                  >
                    {availabilityStatuses[statusIndex]}
                  </span>
                </div>
              </div>
            </div>

            {/* Bio */}
            <p className="text-base md:text-lg text-muted leading-relaxed max-w-2xl">
              {ABOUT_DATA.bio}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 pt-2 w-full md:w-auto">
              <div className="flex gap-4">
                <a
                  href={ABOUT_DATA.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 md:flex-none"
                >
                  <Button
                    variant="secondary"
                    className="w-full"
                    icon={<Download size={18} />}
                  >
                    Resume
                  </Button>
                </a>
                <Button
                  onClick={() =>
                    (window.location.href = `mailto:${ABOUT_DATA.email}?subject=${subject}&body=${body}`)
                  }
                  variant="primary"
                  className="w-full"
                  icon={<Mail size={18} />}
                >
                  Contact
                </Button>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3 mt-2">
              {socialLinks.map((link, idx) => (
                <a
                  key={idx}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative p-2.5 rounded-full bg-surface border border-border text-muted hover:text-text hover:border-accent/50 hover:bg-surfaceHighlight transition-all duration-200"
                  aria-label={link.label}
                >
                  {link.icon}

                  {/* Tooltip */}
                  <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-text text-background text-[10px] font-bold rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-lg">
                    {link.label}
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-text transform rotate-45"></span>
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Stack Badges */}
        <div
          className="mt-8 px-4 md:px-6 animate-fade-in-up"
          style={{ animationDelay: "300ms" }}
        >
          <h3 className="text-xs font-bold text-muted uppercase tracking-wider mb-3">
            Tech Stack
          </h3>
          <div className="flex flex-wrap gap-2">
            {[
              "JavaScript",
              "TypeScript",
              "React",
              "Node.js",
              "Express.js",
              "MongoDB",
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
    </section>
  );
};

export default Hero;
