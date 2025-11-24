import React from "react";
import {
  Github,
  Linkedin,
  Twitter,
  Mail,
  Lock,
  LayoutDashboard,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";
import { ABOUT_DATA } from "../data";

const Footer: React.FC = () => {
  return (
    <footer className="bg-surface border-t border-border py-12 mt-12">
      <div className="px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col items-center md:items-start gap-1">
          <span className="text-text font-bold text-lg tracking-tight">
            {ABOUT_DATA.name}
          </span>
          <span className="text-muted text-sm">
            Building digital experiences.
          </span>
        </div>

        <div className="flex gap-4">
          <a
            href={ABOUT_DATA.socials.github}
            className="text-muted hover:text-text transition-colors p-2 hover:bg-surfaceHighlight rounded-full"
          >
            <Github size={20} />
          </a>
          <a
            href={ABOUT_DATA.socials.linkedin}
            className="text-muted hover:text-text transition-colors p-2 hover:bg-surfaceHighlight rounded-full"
          >
            <Linkedin size={20} />
          </a>
          <a
            href={ABOUT_DATA.socials.twitter}
            className="text-muted hover:text-text transition-colors p-2 hover:bg-surfaceHighlight rounded-full"
          >
            <Twitter size={20} />
          </a>
          <a
            href={`mailto:${ABOUT_DATA.email}`}
            className="text-muted hover:text-text transition-colors p-2 hover:bg-surfaceHighlight rounded-full"
          >
            <Mail size={20} />
          </a>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-4 text-xs text-muted/50">
          <span>
            © {new Date().getFullYear()} {ABOUT_DATA.name}. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
