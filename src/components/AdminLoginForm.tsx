"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Mail, KeyRound, AlertCircle, ArrowRight, Eye, EyeOff } from "lucide-react";

export default function AdminLoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setErrorMessage(data.error || "Invalid credentials. Please verify your email and password.");
        setIsLoading(false);
        return;
      }

      // Success: refresh page to reveal admin console
      router.refresh();
      window.location.reload();
    } catch {
      setErrorMessage("Network error during login. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Header Badge */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-neutral-900 text-white mb-4 shadow-sm">
            <Lock className="w-5 h-5" />
          </div>
          <span className="text-xs font-mono uppercase tracking-widest text-neutral-500 block mb-1">
            Restricted Access
          </span>
          <h1 className="text-2xl font-black text-neutral-900 tracking-tight">
            LucknowKaChaska Admin Console<span className="text-neutral-400">.</span>
          </h1>
          <p className="text-xs text-neutral-600 font-mono mt-2 max-w-xs mx-auto">
            Enter your admin credentials to access the content management system.
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white border border-neutral-200 rounded-xl p-6 sm:p-8 shadow-sm">
          {errorMessage && (
            <div className="mb-6 p-3.5 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2.5 text-xs text-red-800 font-mono">
              <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                Admin Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="businessritiksinghdeos@gmail.com"
                  className="w-full pl-9 pr-3 py-2.5 border border-neutral-300 rounded-lg text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent font-mono placeholder:text-neutral-400"
                  autoComplete="username"
                  autoFocus
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                Admin Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-400">
                  <KeyRound className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-9 pr-10 py-2.5 border border-neutral-300 rounded-lg text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent font-mono placeholder:text-neutral-400"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-neutral-400 hover:text-neutral-700 transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-6 py-2.5 px-4 bg-neutral-900 hover:bg-neutral-800 disabled:bg-neutral-400 text-white text-xs font-mono font-bold uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <span>Unlock Admin Console</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Config Note for Ritik */}
          <div className="mt-6 pt-5 border-t border-neutral-100 text-center">
            <p className="text-[11px] font-mono text-neutral-400">
              💡 Credentials source: <code className="text-neutral-600 bg-neutral-100 px-1 py-0.5 rounded">src/lib/auth-config.ts</code>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
