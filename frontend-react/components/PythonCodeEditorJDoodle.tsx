"use client";

import { useEffect, useRef, useState } from "react";
import { X, Code } from "lucide-react";
import { CodeBlock, CodeBlockCopyButton } from "@/components/ui/code-block";
import { cn } from "@/lib/utils";

interface PythonCodeEditorJDoodleProps {
  initialCode?: string;
  embedId?: string; // JDoodle Embed ID (get from JDoodle dashboard)
  isOpen: boolean;
  onClose: () => void;
  codeExample?: string; // Optional code example to display
}

/**
 * JDoodle Embed Python Code Editor - Popup Modal Style
 */
export default function PythonCodeEditorJDoodle({ 
  embedId = "7ab0035236964f5d", // JDoodle Embed ID
  isOpen,
  onClose,
  initialCode,
  codeExample
}: PythonCodeEditorJDoodleProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setIsInitialized(false);
      setScriptLoaded(false);
      return;
    }

    const createDirectIframe = (element: HTMLDivElement, src: string) => {
      // Clear any existing content
      element.innerHTML = '';
      // Create iframe directly as fallback
      const iframe = document.createElement('iframe');
      iframe.src = src;
      iframe.style.width = '100%';
      iframe.style.height = '600px';
      iframe.style.border = 'none';
      iframe.setAttribute('allow', 'clipboard-read; clipboard-write');
      element.appendChild(iframe);
      setIsInitialized(true);
      console.log("✅ JDoodle iframe created directly");
    };

    const loadAndInitialize = async () => {
      try {
        // Check if script already exists
        let script: HTMLScriptElement | null = document.querySelector('script[src*="jdoodle-pym.min.js"]');
        
        if (!script) {
          // Load JDoodle PyM script
          script = document.createElement("script");
          script.src = "https://www.jdoodle.com/assets/jdoodle-pym.min.js";
          script.async = true;
          script.type = "text/javascript";
          
          await new Promise<void>((resolve, reject) => {
            script!.onload = () => {
              setScriptLoaded(true);
              console.log("✅ JDoodle PyM script loaded");
              resolve();
            };
            
            script!.onerror = () => {
              console.error("❌ Failed to load JDoodle script");
              setScriptLoaded(true); // Still try direct iframe
              resolve();
            };
            
            document.head.appendChild(script!);
          });
        } else {
          setScriptLoaded(true);
        }

        // Wait for DOM and PyM to be ready
        await new Promise(resolve => setTimeout(resolve, 500));

        // Initialize PyM or use direct iframe
        if (containerRef.current) {
          const element = containerRef.current;
          const src = `https://www.jdoodle.com/embed/v1/${embedId}`;
          
          // Check if already has iframe
          if (element.querySelector('iframe')) {
            setIsInitialized(true);
            return;
          }

          // Try PyM initialization first
          if (typeof window !== 'undefined' && (window as any).pym) {
            const pym = (window as any).pym;
            try {
              // PyM.Parent(id, url, config)
              new pym.Parent(`jdoodle-${embedId}`, src, {});
              // Check after a moment if iframe was created
              setTimeout(() => {
                if (element.querySelector('iframe')) {
                  setIsInitialized(true);
                  console.log("✅ JDoodle embed initialized via PyM");
                } else {
                  // PyM didn't work, use direct iframe
                  createDirectIframe(element, src);
                }
              }, 1000);
            } catch (error) {
              console.error("❌ PyM initialization error:", error);
              createDirectIframe(element, src);
            }
          } else {
            // PyM not available, use direct iframe
            console.log("⚠️ PyM not available, using direct iframe");
            createDirectIframe(element, src);
          }
        }
      } catch (error) {
        console.error("❌ Error loading JDoodle:", error);
        // Fallback to direct iframe
        if (containerRef.current) {
          createDirectIframe(containerRef.current, `https://www.jdoodle.com/embed/v1/${embedId}`);
        }
      }
    };

    loadAndInitialize();
  }, [isOpen, embedId]);

  // Don't render if not open
  if (!isOpen) return null;

  // JDoodle Embed in a popup modal
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
          "relative w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-md border bg-background/10 backdrop-blur-md text-foreground shadow-2xl",
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
                   <span className="text-white font-semibold">Python Editor (JDoodle)</span>
                 </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/20 transition-colors text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
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
        
        {/* JDoodle Embed Container - Using CodeBlock styling */}
        <div className={cn(
          "relative w-full overflow-hidden rounded-md border bg-background/10 backdrop-blur-sm",
          "border-white/20"
        )} style={{ minHeight: '600px' }}>
          {/* Loading indicator */}
          {(!scriptLoaded || !isInitialized) && (
            <div className="absolute inset-0 flex items-center justify-center bg-transparent z-10">
              <div className="text-center text-white">
                <div className="w-8 h-8 border-4 border-purple-400 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                <p>Loading Python compiler...</p>
              </div>
            </div>
          )}
          
          {/* JDoodle Embed */}
          <div 
            ref={containerRef}
            id={`jdoodle-${embedId}`}
            data-pym-src={`https://www.jdoodle.com/embed/v1/${embedId}`}
            className="w-full h-full bg-background/5"
          />
        </div>
      </div>
    </div>
  );
}
