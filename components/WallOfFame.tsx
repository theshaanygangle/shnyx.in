import React, { useState } from "react";
import { ACHIEVEMENTS } from "../data";
import { ExternalLink, X, ZoomIn, Award } from "lucide-react";

const WallOfFame: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section className="py-12 px-4 md:px-6 " id="wall-of-fame">
      <div className="flex justify-center items-baseline gap-4 mb-8">
        <h2 className="text-text text-2xl md:text-3xl font-display font-bold">
          Certifications
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ACHIEVEMENTS.map((item) => (
          <div
            key={item.id}
            className="group relative bg-surface border border-border rounded-xl overflow-hidden hover:border-muted/30 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col h-full"
          >
            {/* Top Section with Image/Actions */}
            <div className="relative aspect-video bg-surfaceHighlight border-b border-border overflow-hidden">
              <img
                src={item.thumbnail}
                alt={item.title}
                loading="lazy"
                className="w-full h-full object-cover object-[25%_15%] transition-transform duration-500 group-hover:scale-105"
              />

              {/* Overlay Actions */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 backdrop-blur-sm">
                <button
                  onClick={() => setSelectedImage(item.thumbnail)}
                  className="p-2 bg-surface text-text rounded-full hover:bg-accent hover:text-black transition-colors shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
                  title="View Certificate"
                >
                  <ZoomIn size={18} />
                </button>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-5 flex flex-col flex-grow">
              <div className="flex justify-between items-start mb-2 gap-2">
                <h3 className="text-lg font-bold text-text group-hover:text-accent transition-colors line-clamp-2">
                  {item.title}
                </h3>
                <Award
                  size={20}
                  className="text-muted group-hover:text-accent shrink-0 transition-colors mt-1"
                />
              </div>

              <p className="text-sm text-muted mb-4 line-clamp-1">
                {item.issuer}
              </p>

              <div className="mt-auto pt-4 border-t border-border flex items-center justify-between text-xs text-muted">
                <span className="font-mono bg-surfaceHighlight px-2 py-1 rounded">
                  Issued {item.date}
                </span>
                {item.url && (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 group-hover:text-text transition-colors hover:underline"
                  >
                    Verify <ExternalLink size={10} />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm animate-fade-in"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors p-2 bg-black/20 rounded-full"
          >
            <X size={32} />
          </button>

          <div
            className="relative max-w-4xl w-full max-h-[90vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage}
              alt="Certificate Full View"
              className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl border border-white/10"
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default WallOfFame;
