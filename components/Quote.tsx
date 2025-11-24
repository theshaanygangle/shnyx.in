import React from "react";
import { Quote as QuoteIcon } from "lucide-react";

const Quote: React.FC = () => {
  // You can randomize this or keep it static
  const quote = "The only way to do great work is to love what you do.";
  const author = "Steve Jobs";

  return (
    <section className="px-4 md:px-6 py-8 max-w-3xl mx-auto w-full">
      <div className="bg-surface/30 border border-border rounded-xl p-6 md:p-8 flex flex-col items-center text-center relative overflow-hidden group hover:border-accent/20 transition-colors duration-300">
        {/* Background Decor */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent/20 to-transparent opacity-50"></div>

        <QuoteIcon
          size={32}
          className="text-accent/10 absolute top-4 left-6 transform -scale-x-100"
        />

        <blockquote className="relative z-10 max-w-lg mx-auto">
          <p className="text-text/90 font-display text-lg md:text-xl font-medium italic mb-3 leading-relaxed">
            "{quote}"
          </p>
          <footer className="text-muted text-xs font-bold uppercase tracking-widest">
            — {author}
          </footer>
        </blockquote>
      </div>
    </section>
  );
};

export default Quote;
