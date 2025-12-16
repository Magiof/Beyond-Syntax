import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { CheckCircle, BookOpen, Lightbulb, Code2 } from 'lucide-react';
import type { Module } from '../data/curriculumData';

interface Props {
  module: Module;
  onComplete: () => void;
  isCompleted: boolean;
}

export const ModuleDetail: React.FC<Props> = ({ module, onComplete, isCompleted }) => {

  return (
    <div className="max-w-4xl mx-auto pb-20">
      {/* Header Section */}
      <header className="mb-12 border-b border-gray-200 pb-8">
        <div className="flex items-center gap-2 text-sm font-semibold text-blue-600 mb-3 uppercase tracking-wider">
          <BookOpen size={16} />
          <span>Learning Module</span>
        </div>
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4 leading-tight">
          {module.title}
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed font-light">
          {module.topic}
        </p>
      </header>

      {/* Main Content */}
      <div className="prose prose-lg prose-slate max-w-none text-gray-700 leading-loose">
        {module.content && (
          <ReactMarkdown 
            remarkPlugins={[remarkGfm]}
            components={{
              code({node, inline, className, children, ...props}: any) {
                const match = /language-(\w+)/.exec(className || '');
                const content = String(children).replace(/\n$/, '');
                const isMultiLine = content.includes('\n');

                if (!inline && (match || isMultiLine)) {
                  return match ? (
                    <div className="rounded-lg overflow-hidden shadow-lg border border-gray-800 my-6">
                      <div className="bg-[#1e1e1e] px-4 py-2 flex items-center border-b border-gray-700">
                        <span className="text-xs text-gray-400 font-mono">{match[1]}</span>
                      </div>
                      <SyntaxHighlighter
                        style={vscDarkPlus}
                        language={match[1]}
                        PreTag="div"
                        customStyle={{ margin: 0, padding: '1.5rem', fontSize: '0.95rem' }}
                        {...props}
                      >
                        {content}
                      </SyntaxHighlighter>
                    </div>
                  ) : (
                    <div className="rounded-lg overflow-x-auto shadow-sm border border-gray-200 my-6 bg-gray-50 p-6 font-mono text-sm text-gray-800">
                       <pre className="whitespace-pre">{content}</pre>
                    </div>
                  );
                }
                return (
                  <code className="bg-gray-100 text-red-500 rounded px-1.5 py-0.5 font-mono text-sm border border-gray-200" {...props}>
                    {children}
                  </code>
                );
              },
              h1: ({children}) => <h1 className="text-3xl font-extrabold text-gray-900 mt-12 mb-6 pb-4 border-b border-gray-200">{children}</h1>,
              h2: ({children}) => <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6 flex items-center gap-2"><span className="w-1.5 h-8 bg-blue-600 rounded-full inline-block"></span>{children}</h2>,
              h3: ({children}) => <h3 className="text-xl font-bold text-gray-800 mt-8 mb-4 ml-4 pl-4 border-l-4 border-gray-200">{children}</h3>,
              h4: ({children}) => <h4 className="text-lg font-bold text-gray-800 mt-6 mb-3 ml-6">{children}</h4>,
              table({children}) {

                return (
                  <div className="overflow-x-auto my-8 border border-gray-200 rounded-xl shadow-sm">
                    <table className="min-w-full divide-y divide-gray-200">
                      {children}
                    </table>
                  </div>
                );
              },
              thead({children}) {
                return <thead className="bg-gray-50">{children}</thead>;
              },
              th({children}) {
                return <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">{children}</th>;
              },
              tr({children}) {
                return <tr className="divide-x divide-gray-200 hover:bg-gray-50/50 transition-colors">{children}</tr>;
              },
              td({children}) {
                return <td className="px-6 py-4 whitespace-pre-wrap text-sm text-gray-700 align-top">{children}</td>;
              }
            }}
          >
            {module.content}
          </ReactMarkdown>
        )}
      </div>

      {/* Key Points */}
      {module.keyPoints && (
        <section className="mt-16 bg-amber-50/50 rounded-2xl p-8 border border-amber-100">
          <h3 className="flex items-center gap-3 text-xl font-bold text-amber-900 mb-6">
            <Lightbulb className="text-amber-500" />
            핵심 요약
          </h3>
          <ul className="space-y-4">
            {module.keyPoints.map((point, idx) => (
              <li key={idx} className="flex gap-4 items-start text-amber-900/80 font-medium">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-200 text-amber-800 flex items-center justify-center text-sm font-bold mt-0.5">
                  {idx + 1}
                </span>
                {point}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Code Examples */}
      {module.codeExamples && module.codeExamples.length > 0 && (
        <section className="mt-16">
          <h3 className="flex items-center gap-3 text-2xl font-bold text-gray-900 mb-8">
            <Code2 className="text-blue-600" />
            실전 코드 예제
          </h3>
          <div className="space-y-12">
            {module.codeExamples.map((ex, idx) => (
              <div key={idx} className="group relative rounded-xl overflow-hidden shadow-2xl bg-[#1e1e1e] ring-1 ring-white/10">
                <div className="flex items-center justify-between px-4 py-3 bg-[#252526] border-b border-white/5">
                  <div className="flex items-center gap-3">
                    <span className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                      <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                      <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                    </span>
                    <span className="text-gray-400 text-sm font-medium font-mono ml-2">
                      {ex.title}
                    </span>
                  </div>
                  <span className="text-xs font-bold text-gray-500 uppercase font-mono tracking-wider">
                    {ex.language}
                  </span>
                </div>
                <SyntaxHighlighter
                  language={ex.language}
                  style={vscDarkPlus}
                  customStyle={{
                    margin: 0,
                    padding: '1.5rem',
                    fontSize: '14px',
                    lineHeight: '1.6',
                    background: 'transparent',
                  }}
                  showLineNumbers={true}
                  wrapLines={true}
                >
                  {ex.code}
                </SyntaxHighlighter>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Completion Footer */}
      <section className="mt-20 flex flex-col items-center gap-8 border-t border-gray-200 pt-16">
        
        {/* Complete Button */}
        <button
          onClick={onComplete}
          className={`
            group flex items-center gap-3 px-8 py-4 rounded-full text-lg font-bold transition-all duration-300
            ${isCompleted 
              ? 'bg-green-100 text-green-700 hover:bg-green-200 ring-2 ring-green-500 ring-offset-2' 
              : 'bg-gray-900 text-white hover:bg-gray-800 hover:scale-105 shadow-xl hover:shadow-2xl'
            }
          `}
        >
          <CheckCircle className={isCompleted ? 'fill-green-600 text-white' : ''} />
          {isCompleted ? '학습 완료됨 (다시 보기)' : '이 모듈 학습 완료'}
        </button>
      </section>
    </div>
  );
};
