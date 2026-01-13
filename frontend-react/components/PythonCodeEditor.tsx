"use client";

import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { Play, Loader2, Code } from "lucide-react";

// Declare Pyodide types for CDN version
declare global {
  interface Window {
    loadPyodide: (options: { indexURL: string }) => Promise<any>;
    pyodide?: any;
  }
}

// Dynamically import Monaco Editor (client-side only)
const Editor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
  loading: () => <div className="h-full flex items-center justify-center bg-gray-900 text-white">Loading editor...</div>
});

interface PythonCodeEditorProps {
  initialCode?: string;
}

export default function PythonCodeEditor({ initialCode = "# Write your Python code here\nprint('Hello, World!')" }: PythonCodeEditorProps) {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState<string>("");
  const [isRunning, setIsRunning] = useState(false);
  const [pyodide, setPyodide] = useState<any>(null);
  const [isLoadingPyodide, setIsLoadingPyodide] = useState(true);
  const editorRef = useRef<any>(null);

  // Load Pyodide from CDN (client-side only)
  useEffect(() => {
    if (typeof window === "undefined") return;

    const loadPyodide = async () => {
      try {
        // Load Pyodide from CDN (not npm package to avoid bundling issues)
        const script = document.createElement("script");
        script.src = "https://cdn.jsdelivr.net/pyodide/v0.25.1/full/pyodide.js";
        script.async = true;
        
        script.onload = async () => {
          try {
            // Wait a bit for Pyodide to be fully available
            await new Promise(resolve => setTimeout(resolve, 100));
            
            // @ts-ignore - Pyodide is loaded globally from CDN
            if (window.loadPyodide) {
              const pyodideInstance = await window.loadPyodide({
                indexURL: "https://cdn.jsdelivr.net/pyodide/v0.25.1/full/",
              });
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
  }, []);

  const handleEditorDidMount = (editor: any) => {
    editorRef.current = editor;
  };

  const runCode = async () => {
    if (!pyodide || isRunning) return;

    setIsRunning(true);
    setOutput("Running...\n");

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
        setOutput("Code executed successfully (no output).\n");
      }
    } catch (error: any) {
      // Reset stdout on error
      pyodide.setStdout({ batched: () => {} });
      
      // Extract error message
      const errorMsg = error.message || error.toString();
      setOutput(`❌ Error: ${errorMsg}\n`);
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden bg-white shadow-lg">
      {/* Editor Header */}
      <div className="bg-gray-800 text-white px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm font-mono flex items-center gap-2">
            <Code className="w-4 h-4" />
            Python Editor
          </span>
        </div>
        <button
          onClick={runCode}
          disabled={isRunning || isLoadingPyodide || !pyodide}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed px-4 py-1.5 rounded text-sm font-semibold transition-colors"
        >
          {isRunning ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Running...
            </>
          ) : (
            <>
              <Play className="w-4 h-4" />
              Run Code
            </>
          )}
        </button>
      </div>

      {/* Monaco Editor */}
      <div className="h-64 border-b border-gray-300">
        <Editor
          height="100%"
          defaultLanguage="python"
          value={code}
          onChange={(value) => setCode(value || "")}
          onMount={handleEditorDidMount}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: "on",
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 4,
            wordWrap: "on",
          }}
        />
      </div>

      {/* Output Terminal */}
      <div className="bg-gray-900 text-green-400 p-4 font-mono text-sm min-h-[120px] max-h-[200px] overflow-y-auto">
        {isLoadingPyodide ? (
          <div className="flex items-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Loading Python runtime...</span>
          </div>
        ) : (
          <pre className="whitespace-pre-wrap">{output || "Output will appear here..."}</pre>
        )}
      </div>
    </div>
  );
}


