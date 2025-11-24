import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Moon, Sun, Phone } from "lucide-react";
import { ABOUT_DATA } from "../data";
import Button from "./Button";
import { useTheme } from "../App";

interface NavbarProps {
  onOpenContact: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onOpenContact }) => {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  return (
    /* Top Sticky Navbar for all devices - Increased height to h-20 and padding */
    <nav className="flex sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border h-20 px-4 md:px-8 items-center justify-between transition-all duration-300">
      <Link to="/" className="flex items-center gap-3 group shrink-0">
        <div className="">
          <img
            src="../resources/profile/favicon.jpg"
            alt="Profile"
            className="w-10 h-10 rounded-md border border-border hover:scale-95 "
          />
        </div>
        <span className="font-bold text-base tracking-tight text-text  transition-colors">
          SHAANY
        </span>
      </Link>

      <div className="flex items-center gap-2 md:gap-4 shrink-0">
        <Link
          to="/"
          className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
            location.pathname === "/"
              ? "text-text bg-surfaceHighlight"
              : "text-muted hover:text-text"
          }`}
        >
          Home
        </Link>
        <Link
          to="/projects"
          className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
            location.pathname.startsWith("/projects")
              ? "text-text bg-surfaceHighlight"
              : "text-muted hover:text-text"
          }`}
        >
          Projects
        </Link>
        <Link
          to="/blog"
          className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
            location.pathname.startsWith("/blog")
              ? "text-text bg-surfaceHighlight"
              : "text-muted hover:text-text"
          }`}
        >
          Blog
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
