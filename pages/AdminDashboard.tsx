import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  FolderOpen,
  Award,
  FileText,
  LogOut,
  Plus,
  Edit,
  Trash2,
  Search,
  Eye,
  EyeOff,
  Bell,
  User,
  Menu,
  MessageSquare,
  Check,
  X,
  Star,
} from "lucide-react";
import Button from "../components/Button";
import {
  getAdminData,
  deleteAdminItem,
  saveAdminItem,
} from "../utils/adminStorage";
import { ContactMessage } from "../types";

type Section = "overview" | "projects" | "certifications" | "blog" | "messages";

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<Section>("overview");
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  // Data State
  const [data, setData] = useState(getAdminData());

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");
    if (!isAdmin) {
      navigate("/admin");
    }
  }, [navigate]);

  // Refresh data when focused
  useEffect(() => {
    const handleFocus = () => setData(getAdminData());
    window.addEventListener("focus", handleFocus);
    setData(getAdminData());
    return () => window.removeEventListener("focus", handleFocus);
  }, [activeSection]);

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    navigate("/admin");
  };

  const handleDelete = (
    id: string,
    type: "project" | "cert" | "blog" | "message"
  ) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    deleteAdminItem(type, id);
    setData(getAdminData());
  };

  const togglePublish = (item: any, type: "project" | "cert" | "blog") => {
    const newItem = { ...item, published: !item.published };
    saveAdminItem(type, newItem);
    setData(getAdminData());
  };

  const handleEdit = (id: string, type: "project" | "cert" | "blog") => {
    navigate(`/admin/edit/${type}/${id}`);
  };

  const handleAdd = (type: "project" | "cert" | "blog") => {
    navigate(`/admin/edit/${type}/new`);
  };

  // --- Sorting & Priority Logic for Messages ---
  const getMessagePriority = (msg: ContactMessage) => {
    let score = 0;
    // Priority for Founder/HR
    if (["Founder", "HR"].includes(msg.role)) score += 2;
    // Priority for Job Offers
    if (msg.inquiry === "Job Offer") score += 1;
    return score;
  };

  const sortedMessages = [...data.messages].sort(
    (a: ContactMessage, b: ContactMessage) => {
      // Sort by priority first (desc), then by date (desc)
      const scoreA = getMessagePriority(a);
      const scoreB = getMessagePriority(b);
      if (scoreA !== scoreB) return scoreB - scoreA;
      return (
        new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
      );
    }
  );

  // --- Render Functions ---

  const renderOverview = () => (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 animate-fade-in">
      <div className="bg-surface border border-border rounded-xl p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="p-3 bg-blue-500/10 rounded-lg text-accent">
            <FolderOpen size={24} />
          </div>
          <span className="text-xs text-green-500 font-bold bg-green-500/10 px-2 py-1 rounded">
            Active
          </span>
        </div>
        <h3 className="text-3xl font-bold text-text mb-1">
          {data.projects.length}
        </h3>
        <p className="text-sm text-muted">Total Projects</p>
      </div>

      <div className="bg-surface border border-border rounded-xl p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="p-3 bg-purple-500/10 rounded-lg text-purple-500">
            <Award size={24} />
          </div>
          <span className="text-xs text-muted font-bold bg-surfaceHighlight px-2 py-1 rounded">
            Total
          </span>
        </div>
        <h3 className="text-3xl font-bold text-text mb-1">
          {data.certs.length}
        </h3>
        <p className="text-sm text-muted">Certifications</p>
      </div>

      <div className="bg-surface border border-border rounded-xl p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="p-3 bg-orange-500/10 rounded-lg text-orange-500">
            <FileText size={24} />
          </div>
          <span className="text-xs text-green-500 font-bold bg-green-500/10 px-2 py-1 rounded">
            Published
          </span>
        </div>
        <h3 className="text-3xl font-bold text-text mb-1">
          {data.blogs.length}
        </h3>
        <p className="text-sm text-muted">Blog Posts</p>
      </div>

      <div
        className="bg-surface border border-border rounded-xl p-6 cursor-pointer hover:border-accent/50 transition-colors"
        onClick={() => setActiveSection("messages")}
      >
        <div className="flex justify-between items-start mb-4">
          <div className="p-3 bg-red-500/10 rounded-lg text-red-500">
            <MessageSquare size={24} />
          </div>
          <span className="text-xs text-red-500 font-bold bg-red-500/10 px-2 py-1 rounded">
            Inbox
          </span>
        </div>
        <h3 className="text-3xl font-bold text-text mb-1">
          {data.messages.length}
        </h3>
        <p className="text-sm text-muted">Messages</p>
      </div>
    </div>
  );

  const renderTable = (
    items: any[],
    type: "project" | "cert" | "blog",
    columns: { key: string; label: string }[]
  ) => (
    <div className="bg-surface border border-border rounded-xl overflow-hidden animate-fade-in">
      <div className="p-4 border-b border-border flex justify-between items-center">
        <div className="relative">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
          />
          <input
            type="text"
            placeholder="Search..."
            className="pl-9 pr-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:border-accent w-40 md:w-64"
          />
        </div>
        <Button
          size="sm"
          icon={<Plus size={16} />}
          onClick={() => handleAdd(type)}
        >
          Add New
        </Button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-surfaceHighlight text-muted uppercase text-xs">
            <tr>
              <th className="px-6 py-3">Status</th>
              {columns.map((col) => (
                <th key={col.key} className="px-6 py-3">
                  {col.label}
                </th>
              ))}
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {items.map((item) => (
              <tr
                key={item.id}
                className="hover:bg-surfaceHighlight/50 transition-colors"
              >
                <td className="px-6 py-4">
                  <button
                    onClick={() => togglePublish(item, type)}
                    className={`flex items-center gap-2 px-2 py-1 rounded text-xs font-bold border transition-colors ${
                      item.published
                        ? "bg-green-500/10 text-green-500 border-green-500/20 hover:bg-green-500/20"
                        : "bg-red-500/10 text-red-500 border-red-500/20 hover:bg-red-500/20"
                    }`}
                  >
                    {item.published ? <Eye size={12} /> : <EyeOff size={12} />}
                    {item.published ? "Published" : "Hidden"}
                  </button>
                </td>
                {columns.map((col) => (
                  <td key={col.key} className="px-6 py-4 text-text">
                    {col.key === "thumbnail" ? (
                      <img
                        src={item[col.key]}
                        alt="thumb"
                        className="w-8 h-8 rounded object-cover bg-surfaceHighlight border border-white/10"
                      />
                    ) : (
                      <span className="line-clamp-1">{item[col.key]}</span>
                    )}
                  </td>
                ))}
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => handleEdit(item.id, type)}
                      className="p-2 hover:bg-surfaceHighlight rounded text-blue-400 transition-colors"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id, type)}
                      className="p-2 hover:bg-surfaceHighlight rounded text-red-400 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderMessages = () => (
    <div className="bg-surface border border-border rounded-xl overflow-hidden animate-fade-in">
      <div className="p-4 border-b border-border">
        <h2 className="text-lg font-bold text-text">Inquiries & Bookings</h2>
      </div>
      <div className="divide-y divide-border">
        {sortedMessages.length === 0 ? (
          <div className="p-8 text-center text-muted">No messages yet.</div>
        ) : (
          sortedMessages.map((msg: ContactMessage) => {
            const isImp = getMessagePriority(msg) >= 1;

            // Mail Templates
            const confirmSubject = `Meeting Confirmation: ${msg.agenda}`;
            const confirmBody = `Hi ${
              msg.name
            },\n\nI am confirming our meeting on ${new Date(
              msg.date
            ).toLocaleDateString()} at ${msg.time} via ${
              msg.platform
            }.\n\nLooking forward to speaking with you.\n\nBest,\nShaany`;
            const confirmLink = `mailto:${
              msg.email
            }?subject=${encodeURIComponent(
              confirmSubject
            )}&body=${encodeURIComponent(confirmBody)}`;

            const declineSubject = `Regarding our meeting: ${msg.agenda}`;
            const declineBody = `Hi ${msg.name},\n\nThank you for reaching out. Unfortunately, I won't be able to make the proposed time slot. Could we assume a different time?\n\nBest,\nShaany`;
            const declineLink = `mailto:${
              msg.email
            }?subject=${encodeURIComponent(
              declineSubject
            )}&body=${encodeURIComponent(declineBody)}`;

            return (
              <div
                key={msg.id}
                className="p-6 hover:bg-surfaceHighlight/30 transition-colors flex flex-col md:flex-row gap-6"
              >
                {/* Info Column */}
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-3 mb-1">
                    {isImp && (
                      <span className="px-2 py-0.5 bg-red-500 text-white text-[10px] font-bold uppercase rounded flex items-center gap-1">
                        <Star size={10} fill="currentColor" /> IMP
                      </span>
                    )}
                    <h3 className="font-bold text-lg text-text">{msg.name}</h3>
                    <span className="text-xs text-muted px-2 py-1 bg-surfaceHighlight rounded border border-border">
                      {msg.role}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-1 gap-x-4 text-sm text-muted">
                    <div>
                      <span className="font-bold text-text/80">Inquiry:</span>{" "}
                      {msg.inquiry}
                    </div>
                    <div>
                      <span className="font-bold text-text/80">Email:</span>{" "}
                      {msg.email}
                    </div>
                    <div>
                      <span className="font-bold text-text/80">Phone:</span>{" "}
                      {msg.countryCode} {msg.phone}
                    </div>
                    <div>
                      <span className="font-bold text-text/80">Time:</span>{" "}
                      {new Date(msg.date).toLocaleDateString()} @ {msg.time}
                    </div>
                    <div className="sm:col-span-2 mt-2 p-3 bg-surfaceHighlight/50 rounded-lg border border-border/50 text-text/90 italic">
                      "{msg.message || msg.agenda}"
                    </div>
                  </div>
                </div>

                {/* Actions Column */}
                <div className="flex flex-row md:flex-col gap-3 items-start justify-start md:justify-center min-w-[140px]">
                  <a href={confirmLink} className="w-full">
                    <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-green-500/10 text-green-500 border border-green-500/20 rounded-lg hover:bg-green-500/20 transition-colors font-medium text-sm">
                      <Check size={16} /> Confirm
                    </button>
                  </a>

                  <a href={declineLink} className="w-full">
                    <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-500/10 text-red-500 border border-red-500/20 rounded-lg hover:bg-red-500/20 transition-colors font-medium text-sm">
                      <X size={16} /> Decline
                    </button>
                  </a>

                  <button
                    onClick={() => handleDelete(msg.id, "message")}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 text-muted hover:text-text hover:bg-surfaceHighlight rounded-lg transition-colors text-xs"
                  >
                    <Trash2 size={14} /> Remove
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen pt-20 bg-background">
      {/* --- Sidebar (Mobile Toggle) --- */}
      <aside
        className={`w-64 fixed left-0 top-20 bottom-0 border-r border-border bg-background z-20 transition-transform duration-300 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div className="p-6 flex flex-col h-full">
          <h2 className="text-xs font-bold text-muted uppercase mb-4">
            Management
          </h2>
          <nav className="space-y-1 flex-1">
            {[
              {
                id: "overview",
                label: "Overview",
                icon: <LayoutDashboard size={18} />,
              },
              {
                id: "projects",
                label: "Projects",
                icon: <FolderOpen size={18} />,
              },
              {
                id: "certifications",
                label: "Certifications",
                icon: <Award size={18} />,
              },
              { id: "blog", label: "Blog Posts", icon: <FileText size={18} /> },
              {
                id: "messages",
                label: "Messages",
                icon: <MessageSquare size={18} />,
              },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveSection(item.id as Section);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  activeSection === item.id
                    ? "bg-accent/10 text-accent"
                    : "text-muted hover:text-text hover:bg-surfaceHighlight"
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </aside>

      {/* --- Overlay for mobile sidebar --- */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-10 md:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* --- Main Content --- */}
      <main className="flex-1 md:ml-64 flex flex-col min-w-0">
        {/* --- Admin Navbar --- */}
        <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden p-2 text-muted hover:text-text"
            >
              <Menu size={20} />
            </button>
            <div>
              <h1 className="text-lg font-bold text-text capitalize flex items-center gap-2">
                Dashboard{" "}
                <span className="text-muted text-sm font-normal">
                  / {activeSection}
                </span>
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 text-muted hover:text-text rounded-full hover:bg-surfaceHighlight transition-colors relative">
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-accent rounded-full border border-background"></span>
            </button>

            <div className="h-6 w-px bg-border"></div>

            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <div className="text-sm font-bold text-text">Admin User</div>
                <div className="text-xs text-muted">Super Admin</div>
              </div>
              <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center border border-accent/50 text-accent">
                <User size={16} />
              </div>
            </div>

            <div className="h-6 w-px bg-border"></div>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-sm font-medium text-red-400 hover:text-red-300 transition-colors"
            >
              <LogOut size={16} />
            </button>
          </div>
        </header>

        {/* --- Page Content --- */}
        <div className="p-6 md:p-10 flex-1 overflow-y-auto">
          {activeSection === "overview" && renderOverview()}

          {activeSection === "projects" &&
            renderTable(data.projects, "project", [
              { key: "thumbnail", label: "Thumb" },
              { key: "title", label: "Title" },
              { key: "category", label: "Category" },
              { key: "year", label: "Year" },
            ] as any)}

          {activeSection === "certifications" &&
            renderTable(data.certs, "cert", [
              { key: "thumbnail", label: "Thumb" },
              { key: "title", label: "Title" },
              { key: "issuer", label: "Issuer" },
              { key: "date", label: "Date" },
            ])}

          {activeSection === "blog" &&
            renderTable(data.blogs, "blog", [
              { key: "thumbnail", label: "Thumb" },
              { key: "title", label: "Title" },
              { key: "category", label: "Category" },
              { key: "date", label: "Date" },
            ])}

          {activeSection === "messages" && renderMessages()}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
