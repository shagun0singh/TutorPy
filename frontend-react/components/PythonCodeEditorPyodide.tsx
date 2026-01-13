"use client";

import { useEffect, useRef, useState } from "react";
import { X, Play, Loader2, Lightbulb, Code } from "lucide-react";
import CodeMirror from "@uiw/react-codemirror";
import { python } from "@codemirror/lang-python";
import { oneDark } from "@codemirror/theme-one-dark";
import { CodeBlock, CodeBlockCopyButton } from "@/components/ui/code-block";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { API_ENDPOINTS } from "@/lib/api";
import {
  getProblemHints,
  addHint,
  getHintHistoryString,
  type ProblemHints,
} from "@/lib/hints";

// Declare Pyodide types for CDN version
declare global {
  interface Window {
    loadPyodide: (options: { indexURL: string }) => Promise<any>;
    pyodide?: any;
  }
}

interface PythonCodeEditorPyodideProps {
  initialCode?: string;
  isOpen: boolean;
  onClose: () => void;
  codeExample?: string; // Optional code example to display
  problem?: string; // The problem statement from chat
}

export default function PythonCodeEditorPyodide({ 
  initialCode = "# Write your Python code here\nprint('Hello, World!')",
  isOpen,
  onClose,
  codeExample,
  problem = "",
}: PythonCodeEditorPyodideProps) {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState<string>("");
  const [isRunning, setIsRunning] = useState(false);
  const [pyodide, setPyodide] = useState<any>(null);
  const [isLoadingPyodide, setIsLoadingPyodide] = useState(true);
  const [isDark, setIsDark] = useState(true);
  const [hintLevel, setHintLevel] = useState(0);
  const [isLoadingHint, setIsLoadingHint] = useState(false);
  const [currentHint, setCurrentHint] = useState<string>("");
  const [problemHints, setProblemHints] = useState<ProblemHints | null>(null);
  const editorRef = useRef<any>(null);
  const lastErrorRef = useRef<string>("");

  // Load problem hints when problem changes
  useEffect(() => {
    if (problem) {
      const hints = getProblemHints(problem);
      setProblemHints(hints);
      setHintLevel(hints.currentLevel);
      if (hints.hints.length > 0) {
        setCurrentHint(hints.hints[hints.hints.length - 1].hint);
      }
    }
  }, [problem]);

  // Load Pyodide from CDN (client-side only)
  useEffect(() => {
    if (!isOpen || typeof window === "undefined") return;

    const loadPyodide = async () => {
      try {
        // Check if Pyodide is already loaded
        if (window.pyodide) {
          setPyodide(window.pyodide);
          setIsLoadingPyodide(false);
          setOutput("✅ Python runtime ready!\n");
          return;
        }

        // Load Pyodide from CDN
        const script = document.createElement("script");
        script.src = "https://cdn.jsdelivr.net/pyodide/v0.25.1/full/pyodide.js";
        script.async = true;
        
        script.onload = async () => {
          try {
            await new Promise(resolve => setTimeout(resolve, 100));
            
            if (window.loadPyodide) {
              const pyodideInstance = await window.loadPyodide({
                indexURL: "https://cdn.jsdelivr.net/pyodide/v0.25.1/full/",
              });
              window.pyodide = pyodideInstance; // Cache for reuse
              setPyodide(pyodideInstance);
              setIsLoadingPyodide(false);
              setOutput("✅ Python runtime loaded! Ready to run code.\n");
            } else {
              throw new Error("loadPyodide function not found");
            }
          } catch (error) {
            console.error("Failed to initialize Pyodide:", error);
            setOutput("❌ Failed to initialize Python runtime. Please refresh the page.\n");
            setIsLoadingPyodide(false);
          }
        };
        
        script.onerror = () => {
          console.error("Failed to load Pyodide script");
          setOutput("❌ Failed to load Python runtime. Please refresh the page.\n");
          setIsLoadingPyodide(false);
        };
        
        document.head.appendChild(script);
      } catch (error) {
        console.error("Failed to load Pyodide:", error);
        setOutput("❌ Failed to load Python runtime. Please refresh the page.\n");
        setIsLoadingPyodide(false);
      }
    };

    loadPyodide();
  }, [isOpen]);

  // Reset code when modal opens with new initialCode
  useEffect(() => {
    if (isOpen && initialCode) {
      setCode(initialCode);
    }
  }, [isOpen, initialCode]);

  const runCode = async () => {
    if (!pyodide || isRunning) return;

    setIsRunning(true);
    setOutput("Running...\n");
    lastErrorRef.current = "";

    try {
      // Capture stdout
      let capturedOutput = "";
      pyodide.setStdout({
        batched: (text: string) => {
          capturedOutput += text;
        },
      });

      // Run the code
      const result = pyodide.runPython(code);

      // Reset stdout
      pyodide.setStdout({ batched: () => {} });

      // Display output
      if (capturedOutput) {
        setOutput(capturedOutput);
      } else if (result !== undefined && result !== null) {
        setOutput(`Result: ${result}\n`);
      } else {
        setOutput("✅ Code executed successfully (no output).\n");
      }
    } catch (error: any) {
      // Reset stdout on error
      pyodide.setStdout({ batched: () => {} });
      
      // Extract error message
      const errorMsg = error.message || error.toString();
      lastErrorRef.current = errorMsg;
      setOutput(`❌ Error: ${errorMsg}`);
    } finally {
      setIsRunning(false);
    }
  };

  const getNextHint = async () => {
    if (!problem || isLoadingHint || hintLevel >= 4) return;

    setIsLoadingHint(true);
    const nextLevel = hintLevel + 1;

    try {
      const token = localStorage.getItem("tutorpy_token");
      if (!token) {
        setCurrentHint("Please sign in to get hints.");
        setIsLoadingHint(false);
        return;
      }

      // Get current code from editor
      const currentCode = code;
      const hintHistory = problemHints ? getHintHistoryString(problemHints) : "No previous hints given.";

      // Build hint prompt with few-shot examples
      const hintPrompt = `You are a Python coding tutor. The user is working on a coding problem and needs a progressive hint.

Problem: ${problem}

User's current code:
\`\`\`python
${currentCode}
\`\`\`

Previous hints given:
${hintHistory}

${lastErrorRef.current ? `Pyodide error when running code:\n${lastErrorRef.current}\n` : ''}

Give ONLY hint level ${nextLevel}:
- Level 1: Conceptual hint (what concept to think about)
- Level 2: Syntax/structure hint (what syntax element is needed)
- Level 3: Logic hint (what logic step is missing)
- Level 4: Debug hint (specific issue to fix)

Examples:
User code: \`for i in range(10) print(i)\` Level 1
→ "Think about how loops and print work together."

User code: \`for i in range(10) print(i)\` Level 2
→ "Print needs parentheses inside loops."

User code: \`for i in range(10): print(i)\` Level 3
→ "Check if your loop body is properly indented."

User code: \`for i in range(10):\n  print(i)\` Level 4
→ "The code looks correct. Try running it to see the output."

Rules:
- 1-2 sentences maximum
- NO solutions or code
- NO complete answers
- Guide thinking, don't solve
- If there's an error, address it specifically

Give hint level ${nextLevel} now:`;

      const apiUrl = API_ENDPOINTS.chat();
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ message: hintPrompt }),
      });

      if (!response.ok) {
        throw new Error("Failed to get hint");
      }

      const data = await response.json();
      const hint = data.reply || "Unable to generate hint. Please try again.";

      // Save hint to localStorage
      if (problem) {
        const updated = addHint(problem, hint);
        setProblemHints(updated);
        setHintLevel(updated.currentLevel);
      }

      setCurrentHint(hint);
    } catch (error: any) {
      console.error("Error getting hint:", error);
      setCurrentHint("Failed to get hint. Please try again.");
    } finally {
      setIsLoadingHint(false);
    }
  };

  // Don't render if not open
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      
      {/* Modal Content */}
      <div 
        className={cn(
          "relative w-full max-w-5xl max-h-[90vh] overflow-hidden rounded-md border bg-background/10 backdrop-blur-md text-foreground shadow-2xl flex flex-col",
          "border-white/20"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/20 bg-gradient-to-r from-purple-500/20 to-blue-500/20">
                 <div className="flex items-center gap-3">
                   <div className="bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg w-8 h-8 flex items-center justify-center">
                     <Code className="w-5 h-5 text-white" />
                   </div>
                   <span className="text-white font-semibold">Python Editor (Pyodide)</span>
                 </div>
          <div className="flex items-center gap-2">
            {problem && (
              <Button
                onClick={getNextHint}
                disabled={isLoadingHint || hintLevel >= 4 || !pyodide}
                size="sm"
                variant="outline"
                className="bg-yellow-600/20 hover:bg-yellow-600/30 text-yellow-200 border-yellow-500/30"
              >
                {isLoadingHint ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Getting hint...
                  </>
                ) : (
                  <>
                    <Lightbulb className="w-4 h-4 mr-2" />
                    Get Next Hint {hintLevel > 0 && `(${hintLevel}/4)`}
                  </>
                )}
              </Button>
            )}
            <Button
              onClick={runCode}
              disabled={isRunning || isLoadingPyodide || !pyodide}
              size="sm"
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              {isRunning ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Running...
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 mr-2" />
                  Run Code
                </>
              )}
            </Button>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white/20 transition-colors text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        {/* Current Hint Display */}
        {currentHint && (
          <div className="px-6 py-3 border-b border-white/20 bg-yellow-500/10 backdrop-blur-sm">
            <div className="flex items-start gap-2">
              <Lightbulb className="w-4 h-4 mt-0.5 text-yellow-400 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-semibold text-yellow-200 mb-1">Hint {hintLevel}:</p>
                <p className="text-sm text-yellow-100">{currentHint}</p>
              </div>
            </div>
          </div>
        )}
        
        {/* Code Example Section (if provided) */}
        {codeExample && (
          <div className="p-4 border-b border-white/20 bg-background/5">
            <CodeBlock
              code={codeExample}
              language="python"
              showLineNumbers={false}
              className="bg-background/10 border-white/20"
            >
              <CodeBlockCopyButton />
            </CodeBlock>
          </div>
        )}
        
        {/* Editor Section */}
        <div className={cn(
          "flex-1 flex flex-col overflow-hidden",
          "bg-background/5"
        )}>
          {/* CodeMirror Editor */}
          <div className="flex-1 min-h-[400px] border-b border-white/20 overflow-hidden">
            <CodeMirror
              value={code}
              height="100%"
              extensions={[python()]}
              theme={isDark ? oneDark : undefined}
              onChange={(value) => setCode(value)}
              basicSetup={{
                lineNumbers: true,
                foldGutter: true,
                dropCursor: false,
                allowMultipleSelections: false,
                indentOnInput: true,
                bracketMatching: true,
                closeBrackets: true,
                autocompletion: true,
                highlightSelectionMatches: true,
              }}
            />
          </div>

          {/* Output Terminal */}
          <div className={cn(
            "border-t border-white/20 p-4 min-h-[150px] max-h-[200px] overflow-y-auto",
            "bg-background/5"
          )}>
            {isLoadingPyodide ? (
              <div className="flex items-center gap-2 text-white/70">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Loading Python runtime...</span>
              </div>
            ) : output ? (
              <div className="space-y-2">
                {output.startsWith("❌ Error:") ? (
                  <CodeBlock
                    code={output}
                    language="text"
                    showLineNumbers={false}
                    className="bg-red-950/30 border-red-500/30"
                  >
                    <CodeBlockCopyButton />
                  </CodeBlock>
                ) : output.startsWith("✅") ? (
                  <CodeBlock
                    code={output}
                    language="text"
                    showLineNumbers={false}
                    className="bg-green-950/30 border-green-500/30"
                  >
                    <CodeBlockCopyButton />
                  </CodeBlock>
                ) : (
                  <CodeBlock
                    code={output}
                    language="python"
                    showLineNumbers={false}
                    className="bg-gray-900/50 border-white/10"
                  >
                    <CodeBlockCopyButton />
                  </CodeBlock>
                )}
              </div>
            ) : (
              <div className="text-white/50 text-sm font-mono italic">
                Output will appear here...
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
