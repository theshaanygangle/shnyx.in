import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  Suspense,
  lazy,
} from "react";
import {
  HashRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Quote from "./components/Quote";
import ContactModal from "./components/ContactModal";

// Lazy Load Pages for Performance
const Home = lazy(() => import("./pages/Home"));
const ProjectsPage = lazy(() => import("./pages/ProjectsPage"));
const ProjectDetailPage = lazy(() => import("./pages/ProjectDetailPage"));
const BlogPage = lazy(() => import("./pages/BlogPage"));
const BlogDetailPage = lazy(() => import("./pages/BlogDetailPage"));
const WriteBlogPage = lazy(() => import("./pages/WriteBlogPage"));
const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const AdminEditor = lazy(() => import("./pages/AdminEditor"));

// Theme Context
type Theme = "light" | "dark";
interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}
export const ThemeContext = createContext<ThemeContextType>({
  theme: "dark",
  toggleTheme: () => {},
});
export const useTheme = () => useContext(ThemeContext);

// Loading Spinner Component
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[60vh] w-full">
    <div className="relative w-12 h-12">
      <div className="absolute top-0 left-0 w-full h-full border-4 border-surfaceHighlight rounded-full"></div>
      <div className="absolute top-0 left-0 w-full h-full border-4 border-accent rounded-full animate-spin border-t-transparent"></div>
    </div>
  </div>
);

// Layout wrapper to conditionally hide Navbar/Footer for admin pages
const Layout: React.FC<{
  children: React.ReactNode;
  onOpenContact: () => void;
}> = ({ children, onOpenContact }) => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdminRoute && <Navbar onOpenContact={onOpenContact} />}

      <main className="flex-grow w-full">{children}</main>

      {!isAdminRoute && <Quote />}
      {!isAdminRoute && <Footer />}
    </>
  );
};

// Internal component to handle route-based layout styling
const AppContent: React.FC = () => {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    // Conditional max-width: w-full for admin, max-w-5xl for public
    <div
      className={`w-full mx-auto bg-background text-text font-sans min-h-screen shadow-2xl transition-colors duration-300 relative flex flex-col overflow-x-hidden ${
        isAdminRoute ? "" : "max-w-5xl md:border-x border-border"
      }`}
    >
      <Layout onOpenContact={() => setIsContactOpen(true)}>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route
              path="/"
              element={<Home onOpenContact={() => setIsContactOpen(true)} />}
            />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/projects/:id" element={<ProjectDetailPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/write" element={<WriteBlogPage />} />
            <Route path="/blog/:id" element={<BlogDetailPage />} />

            {/* Admin Routes */}
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/edit/:type/:id" element={<AdminEditor />} />
          </Routes>
        </Suspense>
      </Layout>

      {/* Global Modals */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </div>
  );
};

const App: React.FC = () => {
  // Theme State
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme");
      if (saved === "light" || saved === "dark") return saved;
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
    return "dark";
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <Router>
        <AppContent />
      </Router>
    </ThemeContext.Provider>
  );
};

export default App;
