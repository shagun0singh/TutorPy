"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function TryPage() {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Get the first message from localStorage
    const firstMessage = localStorage.getItem("tutorpy_first_message");
    if (firstMessage) {
      setMessage(firstMessage);
      handleSendMessage(firstMessage);
      localStorage.removeItem("tutorpy_first_message");
    }
  }, []);

  const handleSendMessage = async (msg: string) => {
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: msg }),
      });

      const data = await res.json();
      if (res.ok) {
        setResponse(data.reply);
        // Show modal after response
        setTimeout(() => setShowModal(true), 2000);
      } else {
        setResponse(data.error || "Sorry, something went wrong.");
      }
    } catch (error) {
      setResponse("Sorry, something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white p-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold">TutorPy</h1>
          <p className="text-sm opacity-90">Try it free - No login required!</p>
        </div>
      </header>

      {/* Messages */}
      <div className="max-w-4xl mx-auto p-4 space-y-4">
        {message && (
          <div className="flex justify-end">
            <div className="bg-[#667eea] text-white px-4 py-3 rounded-lg rounded-br-none max-w-[80%]">
              {message}
            </div>
          </div>
        )}

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

        {response && (
          <div className="flex justify-start">
            <div className="bg-white shadow-md px-4 py-3 rounded-lg rounded-bl-none max-w-[80%]">
              {response}
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full animate-in fade-in slide-in-from-bottom-4">
            <div className="text-center mb-6">
              <div className="text-5xl mb-4">🎉</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Ready to continue learning?
              </h2>
              <p className="text-gray-600">
                You've used your free message! Create a free account to continue learning Python
                with unlimited AI guidance.
              </p>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center gap-2 text-gray-700">
                <span className="text-green-500">✓</span> Unlimited questions
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <span className="text-green-500">✓</span> Step-by-step guidance
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <span className="text-green-500">✓</span> Save your progress
              </div>
            </div>

            <div className="space-y-3">
              <Link
                href="/signup"
                className="block w-full bg-[#667eea] hover:bg-[#5568d3] text-white text-center font-semibold py-3 rounded-lg transition-colors"
              >
                Create Free Account
              </Link>
              <Link
                href="/signin"
                className="block w-full bg-gray-100 hover:bg-gray-200 text-gray-800 text-center font-semibold py-3 rounded-lg transition-colors"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

