import React, { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  icon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  isLoading = false,
  icon,
  className = "",
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent/50 disabled:opacity-50 disabled:cursor-not-allowed motion-safe:hover:-translate-y-0.5 active:translate-y-0";

  const variants = {
    primary:
      "bg-surface text-text hover:bg-gray-200 hover:bg-muted hover:text-[#e4e4e7] shadow-lg shadow-white/5 ",
    secondary:
      "bg-surfaceHighlight text-text hover:bg-[#27272A] hover:text-[#e4e4e7] border border-white/5",
    ghost: "bg-transparent text-muted hover:text-text hover:bg-white/5",
    outline:
      "bg-transparent border border-muted/30 text-text hover:border-text/50",
  };

  const sizes = {
    sm: "h-8 px-3 text-sm gap-2",
    md: "h-10 px-5 text-sm gap-2.5",
    lg: "h-12 px-7 text-base gap-3",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <svg
          className="animate-spin h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      ) : icon ? (
        <span className="flex items-center">{icon}</span>
      ) : null}
      {children}
    </button>
  );
};

export default Button;
