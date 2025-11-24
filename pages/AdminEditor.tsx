import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Save, Eye, EyeOff, Layout, Sun, Moon } from "lucide-react";
import Button from "../components/Button";
import { getSingleItem, saveAdminItem } from "../utils/adminStorage";
import ProjectCard from "../components/ProjectCard";
import BlogCard from "../components/BlogCard";
import { useTheme } from "../App";

// Import actual page components for exact preview
import ProjectDetailPage from "./ProjectDetailPage";
import BlogDetailPage from "./BlogDetailPage";

// Types
import { Project, BlogPost, Achievement } from "../types";

const AdminEditor: React.FC = () => {
  const { type, id } = useParams<{ type: string; id: string }>();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const [formData, setFormData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [previewMode, setPreviewMode] = useState<"card" | "detail">("card");

  // --- Initialization ---
  useEffect(() => {
    if (!type || !id) {
      navigate("/admin/dashboard");
      return;
    }

    // Check Auth
    if (!localStorage.getItem("isAdmin")) navigate("/admin");

    if (id === "new") {
      // Init Empty State
      const baseId = Math.random().toString(36).substr(2, 9);
      let initial: any = { id: baseId, published: true };

      if (type === "project") {
        initial = {
          ...initial,
          title: "",
          summary: "",
          description: "",
          thumbnail: "",
          category: "Frontend",
          year: new Date().getFullYear().toString(),
          tags: [],
          images: [],
          links: {},
          details: {
            techStack: [],
            metrics: [],
            problem: "",
            solution: "",
            role: "",
          },
        };
      } else if (type === "blog") {
        initial = {
          ...initial,
          title: "",
          excerpt: "",
          category: "Frontend",
          date: new Date().toLocaleDateString(),
          readTime: "5 min read",
          tags: [],
          thumbnail: "",
          content: "",
        };
      } else if (type === "cert") {
        initial = {
          ...initial,
          title: "",
          issuer: "",
          date: "",
          thumbnail: "",
        };
      }
      setFormData(initial);
    } else {
      // Load Existing
      const existing = getSingleItem(type, id);
      if (existing) {
        setFormData(JSON.parse(JSON.stringify(existing))); // Deep copy
      } else {
        navigate("/admin/dashboard");
      }
    }
    setLoading(false);
  }, [type, id, navigate]);

  // --- Handlers ---
  const handleInputChange = (field: string, value: any) => {
    setFormData((prev: any) => {
      const next = { ...prev, [field]: value };
      return next;
    });
  };

  // Helper for nested/array changes logic
  const handleNestedChange = (path: string, value: string) => {
    setFormData((prev: any) => {
      const next = { ...prev };

      // Handle specialized string-to-array conversions
      if (path === "tagsStr")
        next.tags = value
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean);
      else if (path === "imagesStr")
        next.images = value
          .split("\n")
          .map((s) => s.trim())
          .filter(Boolean);
      else if (path === "techStackStr") {
        if (!next.details) next.details = {};
        next.details.techStack = value
          .split(",")
          .map((s: string) => s.trim())
          .filter(Boolean);
      } else if (path === "metricsStr") {
        if (!next.details) next.details = {};
        next.details.metrics = value
          .split("\n")
          .map((s: string) => s.trim())
          .filter(Boolean);
      } else if (path === "liveLink" || path === "repoLink") {
        if (!next.links) next.links = {};
        if (path === "liveLink") next.links.live = value;
        if (path === "repoLink") next.links.repo = value;
      } else if (path.startsWith("details.")) {
        const key = path.split(".")[1];
        if (!next.details) next.details = {};
        next.details[key] = value;
      }

      return next;
    });
  };

  const handleSave = () => {
    if (type && formData) {
      saveAdminItem(type, formData);
      navigate("/admin/dashboard");
    }
  };

  // --- Getters for Form Inputs ---
  const getVal = (path: string) => {
    if (!formData) return "";
    if (path === "tagsStr") return formData.tags?.join(", ") || "";
    if (path === "imagesStr") return formData.images?.join("\n") || "";
    if (path === "techStackStr")
      return formData.details?.techStack?.join(", ") || "";
    if (path === "metricsStr")
      return formData.details?.metrics?.join("\n") || "";
    if (path === "liveLink") return formData.links?.live || "";
    if (path === "repoLink") return formData.links?.repo || "";
    if (path.startsWith("details."))
      return formData.details?.[path.split(".")[1]] || "";
    return formData[path] || "";
  };

  if (loading || !formData)
    return <div className="min-h-screen pt-24 text-center">Loading...</div>;

  return (
    <div className="min-h-screen pt-20 bg-background flex flex-col h-screen overflow-hidden">
      {/* --- Top Bar --- */}
      <div className="h-16 border-b border-border bg-surface flex items-center justify-between px-6 shrink-0 z-20">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/admin/dashboard")}
            className="p-2 hover:bg-surfaceHighlight rounded-full text-muted hover:text-text transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-lg font-bold text-text flex items-center gap-2">
              {id === "new" ? "New" : "Edit"} {type}
            </h1>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-xs text-muted mr-4 hidden sm:block">
            {formData.published ? (
              <span className="text-green-500 flex items-center gap-1">
                <Eye size={12} /> Live
              </span>
            ) : (
              <span className="text-yellow-500 flex items-center gap-1">
                <EyeOff size={12} /> Hidden
              </span>
            )}
          </div>
          <Button variant="ghost" onClick={() => navigate("/admin/dashboard")}>
            Cancel
          </Button>
          <Button
            variant="primary"
            icon={<Save size={16} />}
            onClick={handleSave}
          >
            Save Changes
          </Button>
        </div>
      </div>

      {/* --- Split Layout --- */}
      <div className="flex-1 flex overflow-hidden">
        {/* --- LEFT: SCROLLABLE FORM --- */}
        <div className="w-full lg:w-1/2 overflow-y-auto p-6 lg:p-10 border-r border-border custom-scrollbar pb-32">
          <div className="max-w-2xl mx-auto space-y-8">
            {/* PROJECT FORM */}
            {type === "project" && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-muted uppercase">
                      Title
                    </label>
                    <input
                      value={formData.title}
                      onChange={(e) =>
                        handleInputChange("title", e.target.value)
                      }
                      className="w-full bg-surface border border-border rounded-lg p-3 text-sm focus:border-accent outline-none"
                      placeholder="Project Title"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-muted uppercase">
                      Category
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) =>
                        handleInputChange("category", e.target.value)
                      }
                      className="w-full bg-surface border border-border rounded-lg p-3 text-sm focus:border-accent outline-none"
                    >
                      {[
                        "Frontend",
                        "Backend",
                        "Full Stack",
                        "Tools",
                        "Open Source",
                      ].map((c) => (
                        <option key={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-muted uppercase">
                    Thumbnail URL
                  </label>
                  <input
                    value={formData.thumbnail}
                    onChange={(e) =>
                      handleInputChange("thumbnail", e.target.value)
                    }
                    className="w-full bg-surface border border-border rounded-lg p-3 text-sm focus:border-accent outline-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-muted uppercase">
                    Short Summary
                  </label>
                  <textarea
                    value={formData.summary}
                    onChange={(e) =>
                      handleInputChange("summary", e.target.value)
                    }
                    className="w-full bg-surface border border-border rounded-lg p-3 text-sm focus:border-accent outline-none"
                    rows={2}
                  />
                </div>

                <div className="bg-surfaceHighlight/30 p-6 rounded-xl border border-border space-y-6">
                  <h3 className="text-sm font-bold text-text flex items-center gap-2 border-b border-border pb-2">
                    <Layout size={16} /> Detail View Content
                  </h3>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-muted uppercase">
                      The Problem
                    </label>
                    <textarea
                      value={getVal("details.problem")}
                      onChange={(e) =>
                        handleNestedChange("details.problem", e.target.value)
                      }
                      className="w-full bg-surface border border-border rounded-lg p-3 text-sm focus:border-accent outline-none"
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-muted uppercase">
                      The Solution
                    </label>
                    <textarea
                      value={getVal("details.solution")}
                      onChange={(e) =>
                        handleNestedChange("details.solution", e.target.value)
                      }
                      className="w-full bg-surface border border-border rounded-lg p-3 text-sm focus:border-accent outline-none"
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-muted uppercase">
                      Tech Stack (comma separated)
                    </label>
                    <input
                      value={getVal("techStackStr")}
                      onChange={(e) =>
                        handleNestedChange("techStackStr", e.target.value)
                      }
                      className="w-full bg-surface border border-border rounded-lg p-3 text-sm focus:border-accent outline-none"
                      placeholder="React, Node.js..."
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-muted uppercase">
                      Role
                    </label>
                    <input
                      value={getVal("details.role")}
                      onChange={(e) =>
                        handleNestedChange("details.role", e.target.value)
                      }
                      className="w-full bg-surface border border-border rounded-lg p-3 text-sm focus:border-accent outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-muted uppercase">
                    Tags (comma separated)
                  </label>
                  <input
                    value={getVal("tagsStr")}
                    onChange={(e) =>
                      handleNestedChange("tagsStr", e.target.value)
                    }
                    className="w-full bg-surface border border-border rounded-lg p-3 text-sm focus:border-accent outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-muted uppercase">
                      Live Link
                    </label>
                    <input
                      value={getVal("liveLink")}
                      onChange={(e) =>
                        handleNestedChange("liveLink", e.target.value)
                      }
                      className="w-full bg-surface border border-border rounded-lg p-3 text-sm focus:border-accent outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-muted uppercase">
                      Repo Link
                    </label>
                    <input
                      value={getVal("repoLink")}
                      onChange={(e) =>
                        handleNestedChange("repoLink", e.target.value)
                      }
                      className="w-full bg-surface border border-border rounded-lg p-3 text-sm focus:border-accent outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-muted uppercase">
                    Gallery Images (one per line)
                  </label>
                  <textarea
                    value={getVal("imagesStr")}
                    onChange={(e) =>
                      handleNestedChange("imagesStr", e.target.value)
                    }
                    className="w-full bg-surface border border-border rounded-lg p-3 text-sm focus:border-accent outline-none font-mono text-xs"
                    rows={4}
                    placeholder="https://..."
                  />
                </div>
              </>
            )}

            {/* BLOG FORM */}
            {type === "blog" && (
              <>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-muted uppercase">
                    Article Title
                  </label>
                  <input
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    className="w-full bg-surface border border-border rounded-lg p-3 text-lg font-bold focus:border-accent outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-muted uppercase">
                      Category
                    </label>
                    <input
                      value={formData.category}
                      onChange={(e) =>
                        handleInputChange("category", e.target.value)
                      }
                      className="w-full bg-surface border border-border rounded-lg p-3 text-sm focus:border-accent outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-muted uppercase">
                      Read Time
                    </label>
                    <input
                      value={formData.readTime}
                      onChange={(e) =>
                        handleInputChange("readTime", e.target.value)
                      }
                      className="w-full bg-surface border border-border rounded-lg p-3 text-sm focus:border-accent outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-muted uppercase">
                    Cover Image
                  </label>
                  <input
                    value={formData.thumbnail}
                    onChange={(e) =>
                      handleInputChange("thumbnail", e.target.value)
                    }
                    className="w-full bg-surface border border-border rounded-lg p-3 text-sm focus:border-accent outline-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-muted uppercase">
                    Excerpt
                  </label>
                  <textarea
                    value={formData.excerpt}
                    onChange={(e) =>
                      handleInputChange("excerpt", e.target.value)
                    }
                    className="w-full bg-surface border border-border rounded-lg p-3 text-sm focus:border-accent outline-none"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-muted uppercase">
                    Content (Markdown)
                  </label>
                  <textarea
                    value={formData.content}
                    onChange={(e) =>
                      handleInputChange("content", e.target.value)
                    }
                    className="w-full bg-surface border border-border rounded-lg p-4 text-sm font-mono leading-relaxed focus:border-accent outline-none"
                    rows={15}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-muted uppercase">
                    Tags (comma separated)
                  </label>
                  <input
                    value={getVal("tagsStr")}
                    onChange={(e) =>
                      handleNestedChange("tagsStr", e.target.value)
                    }
                    className="w-full bg-surface border border-border rounded-lg p-3 text-sm focus:border-accent outline-none"
                  />
                </div>
              </>
            )}

            {/* CERT FORM */}
            {type === "cert" && (
              <>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-muted uppercase">
                    Certificate Title
                  </label>
                  <input
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    className="w-full bg-surface border border-border rounded-lg p-3 text-sm focus:border-accent outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-muted uppercase">
                      Issuer
                    </label>
                    <input
                      value={formData.issuer}
                      onChange={(e) =>
                        handleInputChange("issuer", e.target.value)
                      }
                      className="w-full bg-surface border border-border rounded-lg p-3 text-sm focus:border-accent outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-muted uppercase">
                      Date
                    </label>
                    <input
                      value={formData.date}
                      onChange={(e) =>
                        handleInputChange("date", e.target.value)
                      }
                      className="w-full bg-surface border border-border rounded-lg p-3 text-sm focus:border-accent outline-none"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-muted uppercase">
                    Thumbnail URL
                  </label>
                  <input
                    value={formData.thumbnail}
                    onChange={(e) =>
                      handleInputChange("thumbnail", e.target.value)
                    }
                    className="w-full bg-surface border border-border rounded-lg p-3 text-sm focus:border-accent outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-muted uppercase">
                    Validation URL
                  </label>
                  <input
                    value={formData.url}
                    onChange={(e) => handleInputChange("url", e.target.value)}
                    className="w-full bg-surface border border-border rounded-lg p-3 text-sm focus:border-accent outline-none"
                  />
                </div>
              </>
            )}

            <div className="pt-8 text-center text-xs text-muted">
              Changes are auto-synced to preview. <br /> Click 'Save Changes' to
              persist.
            </div>
          </div>
        </div>

        {/* --- RIGHT: LIVE PREVIEW --- */}
        <div className="hidden lg:flex flex-col w-1/2 bg-black/5 dark:bg-black/40 relative">
          {/* Toolbar */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-surface border border-border rounded-full p-1.5 flex gap-2 shadow-xl z-10">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-surfaceHighlight text-muted hover:text-text transition-colors"
              title="Toggle Theme"
            >
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <div className="w-px bg-border h-full my-auto mx-1"></div>
            {type !== "cert" && (
              <>
                <button
                  onClick={() => setPreviewMode("card")}
                  className={`px-3 py-1.5 text-xs font-bold rounded-full transition-colors ${
                    previewMode === "card"
                      ? "bg-text text-background"
                      : "text-muted hover:text-text"
                  }`}
                >
                  Card
                </button>
                <button
                  onClick={() => setPreviewMode("detail")}
                  className={`px-3 py-1.5 text-xs font-bold rounded-full transition-colors ${
                    previewMode === "detail"
                      ? "bg-text text-background"
                      : "text-muted hover:text-text"
                  }`}
                >
                  Detail
                </button>
              </>
            )}
          </div>

          {/* Preview Canvas */}
          {/* Added responsive wrapper to simulate exact window look inside the pane */}
          <div
            className={`flex-1 overflow-y-auto custom-scrollbar flex flex-col ${theme}`}
          >
            {/* Container simulating public app layout width behavior */}
            <div className="flex-1 w-full bg-background relative flex justify-center">
              <div className="w-full max-w-5xl h-full flex flex-col items-center p-8 pt-20">
                {/* Project Preview */}
                {type === "project" &&
                  (previewMode === "card" ? (
                    <div className="w-full max-w-md">
                      <ProjectCard
                        project={formData as Project}
                        onClick={() => {}}
                        variant="full"
                      />
                    </div>
                  ) : (
                    // Render Actual Page Component
                    <div className="w-full h-full border border-border rounded-xl shadow-2xl overflow-hidden bg-background">
                      <ProjectDetailPage previewProject={formData as Project} />
                    </div>
                  ))}

                {/* Blog Preview */}
                {type === "blog" &&
                  (previewMode === "card" ? (
                    <div className="w-full max-w-md">
                      <BlogCard post={formData as BlogPost} />
                    </div>
                  ) : (
                    // Render Actual Page Component
                    <div className="w-full h-full border border-border rounded-xl shadow-2xl overflow-hidden bg-background">
                      <BlogDetailPage previewPost={formData as BlogPost} />
                    </div>
                  ))}

                {/* Certificate Preview (Only Card Mode) */}
                {type === "cert" && (
                  <div className="w-full max-w-sm">
                    <div className="group relative bg-surface border border-border rounded-xl overflow-hidden shadow-xl">
                      <div className="aspect-video bg-surfaceHighlight border-b border-border">
                        <img
                          src={formData.thumbnail}
                          className="w-full h-full object-cover"
                          alt="cert"
                        />
                      </div>
                      <div className="p-5">
                        <h3 className="font-bold text-lg text-text">
                          {formData.title}
                        </h3>
                        <p className="text-muted text-sm">{formData.issuer}</p>
                        <div className="mt-4 pt-4 border-t border-border flex justify-between text-xs text-muted">
                          <span>{formData.date}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminEditor;
