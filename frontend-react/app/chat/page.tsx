"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Send, LogOut } from "lucide-react";
import dynamic from "next/dynamic";
import { API_ENDPOINTS } from "@/lib/api";

// Dynamically import PythonCodeEditor (client-side only)
const PythonCodeEditor = dynamic(() => import("@/components/PythonCodeEditor"), {
  ssr: false,
  loading: () => <div className="mt-4 p-4 bg-gray-100 rounded-lg">Loading code editor...</div>
});

interface Message {
  text: string;
  type: "user" | "ai";
  showEditor?: boolean;
}

export default function ChatPage() {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "👋 Welcome to TutorPy! I'm here to help you learn Python programming. Describe a problem or concept you'd like to learn, and I'll guide you through it step by step.",
      type: "ai",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem("tutorpy_token");
    const userData = localStorage.getItem("tutorpy_user");

    if (!token) {
      router.push("/signin");
      return;
    }

    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, [router]);

  useEffect(() => {
    // Scroll to bottom when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { text: userMessage, type: "user" }]);
    setLoading(true);

    try {
      const token = localStorage.getItem("tutorpy_token");
      const response = await fetch(API_ENDPOINTS.chat(), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await response.json();

      if (response.ok) {
        // Show code editor after AI response
        setMessages((prev) => [...prev, { text: data.reply, type: "ai", showEditor: true }]);
      } else {
        setMessages((prev) => [
          ...prev,
          { text: data.error || "Sorry, I encountered an error. Please try again.", type: "ai" },
        ]);
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { text: "Network error. Please check your connection.", type: "ai" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("tutorpy_token");
    localStorage.removeItem("tutorpy_user");
    router.push("/");
  };

  if (!user) return null;

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white p-4 shadow-lg">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">TutorPy</h1>
            <p className="text-sm opacity-90">Welcome back, {user.name}!</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        <div className="max-w-4xl mx-auto space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
            >
              <div className="max-w-[90%]">
                <div
                  className={`px-4 py-3 rounded-lg ${
                    message.type === "user"
                      ? "bg-[#667eea] text-white rounded-br-none"
                      : "bg-white text-gray-800 shadow-md rounded-bl-none"
                  }`}
                >
                  {message.text && message.text.split("\n").map((line, i) => (
                    <p key={i} className="mb-2 last:mb-0">
                      {line}
                    </p>
                  ))}
                </div>
                
                {/* Show code editor after AI response */}
                {message.type === "ai" && message.showEditor && (
                  <div className="mt-4">
                    <PythonCodeEditor 
                      initialCode="# Try implementing the solution here!\n# Example: print('Hello, World!')"
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-white shadow-md px-4 py-3 rounded-lg rounded-bl-none">
                <div className="flex gap-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="border-t border-gray-200 p-4 bg-white">
        <div className="max-w-4xl mx-auto flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            placeholder="Describe a Python problem or concept..."
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#667eea] text-gray-900"
            disabled={loading}
          />
          <button
            onClick={handleSend}
            disabled={loading || !input.trim()}
            className="bg-[#667eea] hover:bg-[#5568d3] text-white px-6 py-3 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <Send className="w-5 h-5" />
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

