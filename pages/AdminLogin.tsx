import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, ArrowRight, AlertCircle } from "lucide-react";
import Button from "../components/Button";

const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Simulated Authentication
    setTimeout(() => {
      if (email === "admin@shaany.dev" && password === "admin123") {
        localStorage.setItem("isAdmin", "true");
        navigate("/admin/dashboard");
      } else {
        setError("Invalid credentials. Access denied.");
        setIsLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 animate-fade-in">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-surfaceHighlight rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/5">
            <Lock size={32} className="text-accent" />
          </div>
          <h1 className="text-2xl font-display font-bold text-text">
            Admin Access
          </h1>
          <p className="text-muted text-sm mt-2">
            Enter your credentials to access the dashboard.
          </p>
        </div>

        <form
          onSubmit={handleLogin}
          className="bg-surface border border-border rounded-xl p-8 shadow-2xl space-y-6"
        >
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 flex items-center gap-3 text-red-400 text-sm">
              <AlertCircle size={16} />
              {error}
            </div>
          )}

          <div className="space-y-2">
            <label className="text-xs font-bold text-muted uppercase">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-background border border-border rounded-lg p-3 text-text focus:border-accent focus:outline-none transition-colors"
              placeholder="admin@shaany.dev"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-muted uppercase">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-background border border-border rounded-lg p-3 text-text focus:border-accent focus:outline-none transition-colors"
              placeholder="••••••••"
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            className="w-full justify-center"
            isLoading={isLoading}
            icon={<ArrowRight size={18} />}
          >
            Sign In
          </Button>
        </form>

        <div className="text-center mt-8">
          <button
            onClick={() => navigate("/")}
            className="text-sm text-muted hover:text-text transition-colors"
          >
            Return to Portfolio
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
