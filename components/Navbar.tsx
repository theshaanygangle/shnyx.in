import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Moon, Sun, Phone, House, Hammer, FilePenLine } from "lucide-react";
import { ABOUT_DATA } from "../data";
import Button from "./Button";
import { useTheme } from "../App";
import { Mail } from "lucide-react";

interface NavbarProps {
  onOpenContact: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onOpenContact }) => {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  return (
    /* Top Sticky Navbar for all devices - Increased height to h-20 and padding */
    <nav className="flex sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border h-20 px-4 md:px-8 items-center justify-between transition-all duration-300">
      <Link to="/" className="flex items-center gap-2 md:gap-3 group shrink-0">
        <div className="">
          <img
            src="/favicon.jpg"
            alt="Profile"
            className="w-10 h-10 rounded-md border border-border hover:scale-95 "
          />
        </div>
        <span className="flex font-bold text-base tracking-tight text-text  transition-colors">
          SHNYX<p className="text-[#2aa3f4]">.in</p>
        </span>
      </Link>

      <div className="flex items-center md:gap-4 ">
        <Link
          to="/"
          className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
            location.pathname === "/"
              ? "text-text bg-surfaceHighlight"
              : "text-muted hover:text-text"
          }`}
        >
          {/* Mobile: show icon */}
          <span className="block md:hidden">
            <House size={18} />
          </span>

          {/* Desktop: show text */}
          <span className="hidden md:block">Home</span>
        </Link>
        <Link
          to="/projects"
          className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
            location.pathname.startsWith("/projects")
              ? "text-text bg-surfaceHighlight"
              : "text-muted hover:text-text"
          }`}
        >
          {/* Mobile: show icon */}
          <span className="block md:hidden">
            <Hammer size={18} />
          </span>

          {/* Desktop: show text */}
          <span className="hidden md:block">Projects</span>
        </Link>
        <Link
          to="/blog"
          className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
            location.pathname.startsWith("/blog")
              ? "text-text bg-surfaceHighlight"
              : "text-muted hover:text-text"
          }`}
        >
          {/* Mobile: show icon */}
          <span className="block md:hidden">
            <FilePenLine size={18} />
          </span>

          {/* Desktop: show text */}
          <span className="hidden md:block">Blog</span>
        </Link>

        <div className="w-px h-5 bg-border mx-1 md:mx-2"></div>

        <button
          onClick={toggleTheme}
          className="p-2.5 text-muted hover:text-text hover:bg-surfaceHighlight rounded-full transition-colors"
          aria-label="Toggle Theme"
        >
          {theme === "dark" ? <Moon size={20} /> : <Sun size={20} />}
        </button>

        {/* <Button 
          variant="secondary" 
          size="md" 
          onClick={onOpenContact} 
          className="ml-1 md:ml-2 hidden sm:flex"
        >
          Let's Talk
        </Button> */}
        {/* <Button
          variant="secondary"
          size="sm"
          onClick={onOpenContact}
          className="ml-1 sm:hidden"
        >
          <Phone size={18} />
        </Button> */}
      </div>
    </nav>
  );
};

export default Navbar;
