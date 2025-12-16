import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import type { Module } from '../data/curriculumData';

interface Props {
  module: Module;
}

export const ModuleCard: React.FC<Props> = ({ module }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(`completed-${module.id}`);
    if (saved === 'true') setIsCompleted(true);
  }, [module.id]);

  const toggleCompletion = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newState = !isCompleted;
    setIsCompleted(newState);
    localStorage.setItem(`completed-${module.id}`, String(newState));
  };
 
  // ... (header part omitted for brevity, assuming replace_file_content handles it well if I target specific block or use chunks, but replace_file_content replaces a block)
  
  // Actually, I'll use multi_replace for safer edits.


  return (
    <div className={`group border-l-4 rounded-r-xl transition-all duration-300 mb-6 font-sans ${isCompleted ? 'border-green-500 bg-white shadow-sm' : 'border-blue-600 bg-white shadow-md hover:shadow-xl'}`}>
      
      {/* Header Area */}
      <div 
        className="p-6 cursor-pointer flex justify-between items-center gap-6" 
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <span className={`text-xs font-bold uppercase tracking-wider px-2 py-1 rounded ${isCompleted ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
              {isCompleted ? 'COMPLETED' : 'LESSON'}
            </span>
            <h3 className={`text-xl font-bold leading-tight ${isCompleted ? 'text-gray-500 line-through' : 'text-gray-900 group-hover:text-blue-700 transition-colors'}`}>
              {module.title}
            </h3>
          </div>
          <p className="text-gray-600 font-medium text-sm leading-relaxed">{module.topic}</p>
        </div>
        
        <div className="flex items-center gap-4">
          <button
            onClick={toggleCompletion}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
              isCompleted 
                ? 'bg-green-500 text-white scale-110 shadow-green-200 shadow-lg' 
                : 'bg-gray-50 text-gray-300 hover:bg-blue-500 hover:text-white hover:scale-105'
            }`}
            title={isCompleted ? "Mark as Incomplete" : "Mark as Completed"}
          >
             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </button>
          
          <div className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Expanded Content Area */}
      {isOpen && (
        <div className="px-8 pb-10 animate-fadeIn bg-white rounded-b-xl border-t border-gray-100">
          
          {/* 1. Learning Content (Markdown) */}
          {module.content && (
            <div className="prose prose-lg prose-slate max-w-none mt-8 mb-12">
               <ReactMarkdown remarkPlugins={[remarkGfm]}>{module.content}</ReactMarkdown>
            </div>
          )}

          {/* 2. Key Points Box */}
          {module.keyPoints && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-12 shadow-sm">
              <h4 className="flex items-center gap-2 font-bold text-amber-800 mb-4 text-lg">
                <span>💡</span> 핵심 요약 (Key Takeaways)
              </h4>
              <ul className="grid gap-3">
                {module.keyPoints.map((point, idx) => (
                  <li key={idx} className="flex gap-3 text-amber-900 leading-relaxed items-start">
                    <span className="text-amber-500 font-bold shrink-0 mt-1.5">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* 3. Code Examples with Syntax Highlighting */}
          {module.codeExamples && module.codeExamples.length > 0 && (
            <div className="space-y-10 mb-12">
              <h4 className="text-xl font-bold text-gray-900 border-b pb-2">💻 실전 코드 예제</h4>
              {module.codeExamples.map((ex, idx) => (
                <div key={idx} className="rounded-xl overflow-hidden shadow-2xl border border-gray-800">
                  <div className="bg-[#1e1e1e] px-4 py-3 flex justify-between items-center border-b border-gray-700">
                    <span className="text-gray-200 font-mono text-sm font-bold flex items-center gap-2">
                       <span className="w-3 h-3 rounded-full bg-red-500"/>
                       <span className="w-3 h-3 rounded-full bg-yellow-500"/>
                       <span className="w-3 h-3 rounded-full bg-green-500"/>
                       <span className="ml-2">{ex.title}</span>
                    </span>
                    <span className="text-xs text-gray-500 font-mono bg-black/30 px-2 py-1 rounded">{ex.language}</span>
                  </div>
                  <SyntaxHighlighter 
                    language={ex.language} 
                    style={vscDarkPlus} 
                    customStyle={{ margin: 0, padding: '1.5rem', fontSize: '0.9rem', lineHeight: '1.6' }}
                    showLineNumbers={true}
                  >
                    {ex.code}
                  </SyntaxHighlighter>
                </div>
              ))}
            </div>
          )}


        </div>
      )}
    </div>
  );
};
