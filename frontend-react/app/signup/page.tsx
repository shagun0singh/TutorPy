"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { API_ENDPOINTS } from "@/lib/api";
import { FlickeringGrid } from "@/components/ui/flickering-grid";
import { Code } from "lucide-react";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(API_ENDPOINTS.signup(), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("tutorpy_token", data.token);
        localStorage.setItem("tutorpy_user", JSON.stringify(data.user));
        
        // Check if there's a stored message from home page
        const firstMessage = localStorage.getItem("tutorpy_first_message");
        if (firstMessage) {
          // Keep the message stored, it will be sent in chat page
          router.push("/chat");
        } else {
          router.push("/chat");
        }
      } else {
        setError(data.error || "Failed to create account");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full h-full text-white flex items-center justify-center p-4 relative overflow-hidden bg-black">
      {/* Flickering Grid Background */}
      <FlickeringGrid
        className="z-0 fixed inset-0 w-full h-full"
        squareSize={4}
        gridGap={6}
        color="#8B5CF6"
        maxOpacity={0.3}
        flickerChance={0.1}
      />

      {/* Sign Up Form */}
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl p-8">
          {/* Logo and Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg w-10 h-10 flex items-center justify-center">
                <Code className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-white">TutorPy</h1>
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
            <p className="text-white/70">Join TutorPy and start learning Python</p>
          </div>

          {error && (
            <div className="bg-red-500/20 border border-red-500/30 text-red-200 px-4 py-3 rounded-lg mb-4 backdrop-blur-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white/90 mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-white placeholder:text-white/50"
                placeholder="John Doe"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white/90 mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-white placeholder:text-white/50"
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white/90 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-white placeholder:text-white/50"
                placeholder="At least 6 characters"
                minLength={6}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-600/40 hover:bg-purple-700/50 text-white font-semibold py-3 rounded-lg transition-colors disabled:opacity-50 backdrop-blur-md border border-white/20"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-white/70">
            Already have an account?{" "}
            <Link href="/signin" className="text-purple-400 hover:text-purple-300 hover:underline font-medium">
              Sign in
            </Link>
          </div>

          <div className="mt-4 text-center">
            <Link href="/" className="text-sm text-white/60 hover:text-white/80">
              ← Back to home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

