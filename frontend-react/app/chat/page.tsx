"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Send, LogOut, Paperclip, Sparkles, User, Code, Menu, X as XIcon, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import dynamic from "next/dynamic";
import { API_ENDPOINTS } from "@/lib/api";
import { FlickeringGrid } from "@/components/ui/flickering-grid";
import { cn } from "@/lib/utils";

// Dynamically import PythonCodeEditor (client-side only)
// Using Pyodide + CodeMirror for Python execution
const PythonCodeEditor = dynamic(() => import("@/components/PythonCodeEditorPyodide"), {
  ssr: false,
  loading: () => <div className="mt-4 p-4 bg-gray-100 rounded-lg">Loading code editor...</div>
});

interface Message {
  text: string;
  type: "user" | "ai";
  showEditor?: boolean;
}

interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  updatedAt: number;
}

const STORAGE_KEY = "tutorpy_sessions";
const INITIAL_MESSAGES: Message[] = [
  {
    text: "👋 Welcome to TutorPy! I'm here to help you learn Python programming. Describe a problem or concept you'd like to learn, and I'll guide you through it step by step.",
    type: "ai",
  },
];

// Debug: Log environment variable at component level
if (typeof window !== 'undefined') {
  console.log('🔍 DEBUG: NEXT_PUBLIC_API_URL =', process.env.NEXT_PUBLIC_API_URL || 'NOT SET');
  console.log('🔍 DEBUG: All NEXT_PUBLIC_ vars:', Object.keys(process.env).filter(k => k.startsWith('NEXT_PUBLIC_')));
}

export default function ChatPage() {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string>("");
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

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

  // Load sessions from storage
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed: ChatSession[] = JSON.parse(stored);
        setSessions(parsed);
        if (parsed.length > 0) {
          setCurrentSessionId(parsed[0].id);
          setMessages(parsed[0].messages || INITIAL_MESSAGES);
          return;
        }
      } catch {
        // ignore parse errors
      }
    }
    // Create default session
    const newSession: ChatSession = {
      id: crypto.randomUUID(),
      title: "New chat",
      messages: INITIAL_MESSAGES,
      updatedAt: Date.now(),
    };
    setSessions([newSession]);
    setCurrentSessionId(newSession.id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify([newSession]));
  }, []);

  const persistSessions = (updater: (prev: ChatSession[]) => ChatSession[]) => {
    setSessions((prev) => {
      const updated = updater(prev);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const updateCurrentSessionMessages = (nextMessages: Message[]) => {
    if (!currentSessionId) return;
    persistSessions((prev) =>
      prev.map((s) =>
        s.id === currentSessionId
          ? {
              ...s,
              messages: nextMessages,
              updatedAt: Date.now(),
              title:
                s.title === "New chat"
                  ? nextMessages.find((m) => m.type === "user")?.text?.slice(0, 40) || "New chat"
                  : s.title,
            }
          : s
      )
    );
  };

  const switchSession = (id: string) => {
    const target = sessions.find((s) => s.id === id);
    if (!target) return;
    setCurrentSessionId(id);
    setMessages(target.messages || INITIAL_MESSAGES);
  };

  const startNewSession = () => {
    const newSession: ChatSession = {
      id: crypto.randomUUID(),
      title: "New chat",
      messages: INITIAL_MESSAGES,
      updatedAt: Date.now(),
    };
    const updated = [newSession, ...sessions];
    persistSessions(() => updated);
    setCurrentSessionId(newSession.id);
    setMessages(INITIAL_MESSAGES);
    setInput("");
  };

  // Handle stored message from home page (separate effect to avoid dependency issues)
  useEffect(() => {
    const firstMessage = localStorage.getItem("tutorpy_first_message");
    if (firstMessage && user) {
      // Clear the stored message
      localStorage.removeItem("tutorpy_first_message");
      // Auto-send the message after a short delay
      setTimeout(() => {
        setInput(firstMessage);
        // Use a ref or direct call to handleSend
        const sendStoredMessage = async () => {
          const messageToSend = firstMessage.trim();
          if (!messageToSend) return;

          setInput("");
          setMessagesWithPersist((prev) => [...prev, { text: messageToSend, type: "user" }]);
          setLoading(true);

          try {
            const token = localStorage.getItem("tutorpy_token");
            if (!token) return;

            const apiUrl = API_ENDPOINTS.chat();
            const response = await fetch(apiUrl, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({ message: messageToSend }),
            });

            const data = await response.json();

            if (response.ok) {
              setMessagesWithPersist((prev) => [...prev, { text: data.reply, type: "ai", showEditor: true }]);
            } else {
              let errorMessage = data.error || "Sorry, I encountered an error. Please try again.";
              if (response.status === 401) {
                errorMessage = "Session expired. Please sign in again.";
                localStorage.removeItem("tutorpy_token");
                localStorage.removeItem("tutorpy_user");
                setTimeout(() => router.push("/signin"), 2000);
              }
              setMessagesWithPersist((prev) => [...prev, { text: errorMessage, type: "ai" }]);
            }
          } catch (error: any) {
            setMessagesWithPersist((prev) => [
              ...prev,
              { text: `Error: ${error.message || 'Unknown error'}`, type: "ai" },
            ]);
          } finally {
            setLoading(false);
          }
        };
        sendStoredMessage();
      }, 500);
    }
  }, [user, router]);

  useEffect(() => {
    // Scroll to bottom when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const setMessagesWithPersist = (updater: (prev: Message[]) => Message[]) => {
    setMessages((prev) => {
      const next = updater(prev);
      updateCurrentSessionMessages(next);
      return next;
    });
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput("");
    setMessagesWithPersist((prev) => [...prev, { text: userMessage, type: "user" }]);
    setLoading(true);

    try {
      const token = localStorage.getItem("tutorpy_token");
      
      if (!token) {
        setMessagesWithPersist((prev) => [
          ...prev,
          { text: "Please sign in to continue. Redirecting...", type: "ai" },
        ]);
        setTimeout(() => router.push("/signin"), 2000);
        return;
      }
      
      const apiUrl = API_ENDPOINTS.chat();
      console.log('🔗 Calling API:', apiUrl);
      console.log('🔑 Token present:', !!token);
      console.log('🌍 NEXT_PUBLIC_API_URL:', process.env.NEXT_PUBLIC_API_URL || 'NOT SET');
      
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          message: userMessage,
          history: messages.map((m) => ({
            role: m.type === "user" ? "user" : "assistant",
            content: m.text,
          })),
        }),
      });

      console.log('📥 Response status:', response.status);
      console.log('📥 Response headers:', Object.fromEntries(response.headers.entries()));
      
      const data = await response.json();
      console.log('📥 Response data:', data);
      console.log('🔑 Token being sent:', token ? `${token.substring(0, 20)}...` : 'NO TOKEN');

      if (response.ok) {
        // Show code editor after AI response
        setMessagesWithPersist((prev) => [...prev, { text: data.reply, type: "ai", showEditor: true }]);
      } else {
        let errorMessage = data.error || "Sorry, I encountered an error. Please try again.";
        
        // Log full error for debugging
        console.error('❌ Chat API Error:', {
          status: response.status,
          statusText: response.statusText,
          error: data.error,
          data: data
        });
        
        // Handle specific auth errors
        if (response.status === 401) {
          errorMessage = data.error || "Authentication failed. Please sign in again.";
          console.error('❌ Auth Error:', data.error);
          console.error('❌ Full error data:', data);
          localStorage.removeItem("tutorpy_token");
          localStorage.removeItem("tutorpy_user");
          setTimeout(() => router.push("/signin"), 2000);
        }
        
        setMessagesWithPersist((prev) => [
          ...prev,
          { text: errorMessage, type: "ai" },
        ]);
      }
    } catch (error: any) {
      console.error('❌ Network or API call error:', error);
      console.error('❌ Error details:', {
        message: error.message,
        stack: error.stack,
        name: error.name
      });
      
      let errorMessage = "Network error. Please check your connection.";
      if (error.message) {
        errorMessage = `Error: ${error.message}`;
      }
      
      setMessagesWithPersist((prev) => [
        ...prev,
        { text: errorMessage, type: "ai" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("tutorpy_token");
    localStorage.removeItem("tutorpy_user");
    setIsProfileOpen(false);
    router.push("/");
  };

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };

    if (isProfileOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isProfileOpen]);

  if (!user) return null;

  return (
    <div className="flex h-screen bg-black relative overflow-hidden">
      {/* Flickering Grid Background */}
      <FlickeringGrid
        className="z-0 fixed inset-0 w-full h-full"
        squareSize={4}
        gridGap={6}
        color="#8B5CF6"
        maxOpacity={0.3}
        flickerChance={0.1}
      />
      
      {/* Layout: sidebar + main */}
      <div className="relative z-10 flex flex-1">
        {/* Sidebar Toggle Button */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className={cn(
            "fixed left-4 top-4 z-50 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 p-2 rounded-full transition-all shadow-lg",
            isSidebarOpen && "left-[292px]"
          )}
        >
          {isSidebarOpen ? (
            <PanelLeftClose className="w-5 h-5 text-white" />
          ) : (
            <PanelLeftOpen className="w-5 h-5 text-white" />
          )}
        </button>

        {/* Sidebar */}
        <aside
          className={cn(
            "w-72 bg-white/5 backdrop-blur-md border-r border-white/10 flex flex-col transition-all duration-300 ease-in-out",
            isSidebarOpen 
              ? "translate-x-0 relative" 
              : "fixed left-0 top-0 h-full -translate-x-full z-40"
          )}
        >
          <div className="p-4 border-b border-white/10 flex items-center justify-between">
            <div className="text-white font-semibold">Conversations</div>
            <button
              onClick={startNewSession}
              className="text-xs px-2 py-1 rounded bg-purple-600/80 hover:bg-purple-700/80 text-white"
            >
              New
            </button>
          </div>
          <div className="flex-1 overflow-y-auto">
            {sessions.map((s) => (
              <button
                key={s.id}
                onClick={() => switchSession(s.id)}
                className={cn(
                  "w-full text-left px-4 py-3 border-b border-white/5 transition-colors",
                  s.id === currentSessionId
                    ? "bg-white/10 text-white"
                    : "text-gray-200 hover:bg-white/5"
                )}
              >
                <div className="text-sm font-semibold truncate">{s.title || "Conversation"}</div>
                <div className="text-xs text-gray-400 truncate">
                  {s.messages.find((m) => m.type === "user")?.text || "No messages yet"}
                </div>
              </button>
            ))}
          </div>
        </aside>

        {/* Main */}
        <div className="flex-1 flex flex-col">
          <header className="bg-transparent text-white p-6">
            <div className="max-w-4xl mx-auto flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg w-8 h-8 flex items-center justify-center">
                  <Code className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">TutorPy</h1>
                  <p className="text-sm opacity-90">Welcome back, {user.name}!</p>
                </div>
              </div>
            </div>
          </header>

      {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4">
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
                              ? "bg-[#667eea]/30 backdrop-blur-md text-white rounded-br-none border border-white/20"
                              : "bg-white/20 backdrop-blur-md text-white shadow-md rounded-bl-none border border-white/20"
                          }`}
                        >
                      {message.text && message.text.split("\n").map((line, i) => (
                        <p key={i} className="mb-2 last:mb-0">
                          {line}
                        </p>
                      ))}
                    </div>
                    
                    {/* Show code editor button after AI response */}
                    {message.type === "ai" && message.showEditor && (
                      <div className="mt-4">
                        <button
                          onClick={() => setIsEditorOpen(true)}
                          className="bg-purple-600/30 hover:bg-purple-700/40 backdrop-blur-md text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2 border border-white/20"
                        >
                          <Sparkles className="w-4 h-4" />
                          Open Python Compiler
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-white/20 backdrop-blur-md shadow-md px-4 py-3 rounded-lg rounded-bl-none border border-white/20">
                    <div className="flex gap-2">
                      <div className="w-2 h-2 bg-white/70 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-white/70 rounded-full animate-bounce delay-100"></div>
                      <div className="w-2 h-2 bg-white/70 rounded-full animate-bounce delay-200"></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

        {/* Input */}
        <div className="p-6 bg-transparent">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl rounded-full p-3 flex items-center">
              <button className="p-2 rounded-full hover:bg-white/10 transition-all">
                <Paperclip className="w-5 h-5 text-gray-300" />
              </button>
              <button className="p-2 rounded-full hover:bg-white/10 transition-all">
                <Sparkles className="w-5 h-5 text-purple-400" />
              </button>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && !loading && input.trim() && handleSend()}
                placeholder="Ask any Python question..."
                className="bg-transparent flex-1 outline-none text-white pl-4 placeholder:text-gray-400"
                disabled={loading}
              />
              {input && (
                <button
                  onClick={handleSend}
                  disabled={loading || !input.trim()}
                  className="bg-purple-600/40 hover:bg-purple-700/50 disabled:bg-gray-600/30 disabled:cursor-not-allowed text-white rounded-full px-4 py-2 text-sm font-semibold transition-colors flex items-center gap-2 backdrop-blur-md border border-white/20"
                >
                  {loading ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                  {loading ? "Sending..." : "Send"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>

      {/* Python Editor Modal */}
      <PythonCodeEditor 
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
        initialCode="# Try implementing the solution here!\n# Example: print('Hello, World!')"
        problem={messages.find(m => m.type === "user")?.text || ""}
      />

      {/* Profile Bar - Fixed at Right Corner */}
      <div className="fixed right-4 top-4 z-50" ref={profileRef}>
        <button
          onClick={() => setIsProfileOpen(!isProfileOpen)}
          className="flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 px-3 py-2 rounded-full transition-colors shadow-lg"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold text-sm">
            {user?.name?.charAt(0).toUpperCase() || "U"}
          </div>
        </button>

        {/* Profile Dropdown Menu */}
        {isProfileOpen && (
          <div className="absolute right-0 top-full mt-2 w-72 bg-gray-800/95 backdrop-blur-md rounded-lg border border-white/20 shadow-2xl z-50 overflow-hidden">
            {/* Header */}
            <div className="px-4 py-3 border-b border-white/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-white/70 text-xs">
                  <div className="w-3 h-3 rounded bg-white/20 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded bg-white/40"></div>
                  </div>
                  <span>This profile is managed</span>
                </div>
              </div>
            </div>

            {/* Profile Info */}
            <div className="px-4 py-4">
              <div className="flex flex-col items-center mb-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold text-2xl mb-3">
                  {user?.name?.charAt(0).toUpperCase() || "U"}
                </div>
                <div className="text-white font-semibold text-lg">{user?.name || "User"}</div>
                <div className="text-white/60 text-sm mt-1 break-all text-center">
                  {user?.email || "No email"}
                </div>
              </div>
            </div>

            {/* Logout Button */}
            <div className="border-t border-white/10 px-4 py-3">
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 px-4 py-2 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

