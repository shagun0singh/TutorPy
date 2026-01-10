"use client";

import * as React from "react";
import { Paperclip, Sparkles } from "lucide-react";
import Link from "next/link";
import { FlickeringGrid } from "./flickering-grid";

const Hero1 = () => {
  const [inputValue, setInputValue] = React.useState("");

  const handleGetStarted = () => {
    // Redirect to signup
    window.location.href = "/signup";
  };

  const handleSend = () => {
    if (inputValue.trim()) {
      // Store the message and redirect to try the free message
      localStorage.setItem("tutorpy_first_message", inputValue);
      window.location.href = "/try";
    }
  };

  return (
    <div className="min-h-screen text-white flex flex-col relative overflow-hidden bg-black">
      {/* Flickering Grid Background */}
      <FlickeringGrid
        className="z-0 absolute inset-0 w-full h-full"
        squareSize={4}
        gridGap={6}
        color="#8B5CF6"
        maxOpacity={0.3}
        flickerChance={0.1}
      />
      {/* Header */}
      <header className="flex justify-between items-center p-6 relative z-10">
        <div className="flex items-center gap-2">
          <div className="bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg w-8 h-8 flex items-center justify-center font-bold">
            🐍
          </div>
          <div className="font-bold text-md text-white">TutorPy</div>
        </div>
        <button 
          onClick={handleGetStarted}
          className="bg-white text-gray-900 hover:bg-gray-100 rounded-full px-4 py-2 text-sm cursor-pointer font-semibold transition-all"
        >
          Get Started
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 text-center relative z-10">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="flex-1 flex justify-center">
            <div className="bg-purple-500/10 backdrop-blur-sm border border-purple-500/30 rounded-full px-4 py-2 flex items-center gap-2  w-fit mx-4">
              <span className="text-xs flex items-center gap-2 text-white">
                <span className="bg-gradient-to-br from-purple-500 to-blue-500 p-1 rounded-full">🎓</span>
                Learn Python Step-by-Step
              </span>
            </div>
          </div>
          {/* Headline */}
          <h1 className="text-5xl font-bold leading-tight text-white">
            Master Python with AI Guidance
          </h1>

          {/* Subtitle */}
          <p className="text-md text-gray-300">
            Your personal AI tutor that helps you learn Python programming through interactive step-by-step guidance.
          </p>

          {/* Search bar */}
          <div className="relative max-w-2xl mx-auto w-full">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl rounded-full p-3 flex items-center">
              <button className="p-2 rounded-full hover:bg-white/10 transition-all">
                <Paperclip className="w-5 h-5 text-gray-300" />
              </button>
              <button className="p-2 rounded-full hover:bg-white/10 transition-all">
                <Sparkles className="w-5 h-5 text-purple-400" />
              </button>
              <input
                type="text"
                placeholder="Ask any Python question... (Try it free!)"
                className="bg-transparent flex-1 outline-none text-white pl-4 placeholder:text-gray-400"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              />
              {inputValue && (
                <button 
                  onClick={handleSend}
                  className="bg-purple-600 hover:bg-purple-700 text-white rounded-full px-4 py-2 text-sm font-semibold transition-all"
                >
                  Send
                </button>
              )}
            </div>
          </div>

          {/* Suggestion pills */}
          <div className="flex flex-wrap justify-center gap-2 mt-12 max-w-2xl mx-auto">
            <button 
              onClick={() => setInputValue("How do I create a for loop in Python?")}
              className="bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white rounded-full px-4 py-2 text-sm transition-all"
            >
              How do I create a for loop?
            </button>
            <button 
              onClick={() => setInputValue("Explain Python dictionaries")}
              className="bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white rounded-full px-4 py-2 text-sm transition-all"
            >
              Explain Python dictionaries
            </button>
            <button 
              onClick={() => setInputValue("What are Python classes?")}
              className="bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white rounded-full px-4 py-2 text-sm transition-all"
            >
              What are Python classes?
            </button>
            <button 
              onClick={() => setInputValue("How to read files in Python?")}
              className="bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white rounded-full px-4 py-2 text-sm transition-all"
            >
              How to read files in Python?
            </button>
            <button 
              onClick={() => setInputValue("Explain list comprehensions")}
              className="bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white rounded-full px-4 py-2 text-sm transition-all"
            >
              Explain list comprehensions
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export { Hero1 };

