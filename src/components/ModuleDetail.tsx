'use client';

import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import type { Module } from '@/data/curriculumData';
import Mermaid from './Mermaid';
import { TableOfContents } from './TableOfContents';

interface Props {
  module: Module;
}

// 코드를 라인별로 분리하여 테이블 형식으로 렌더링
const CodeBlockWithLineNumbers: React.FC<{ code: string; language: string; title?: string }> = ({ code, language, title }) => {
  const lines = code.split('\n');
  
  return (
    <div className="dark-code-block bg-[#1e1e1e] rounded-xl overflow-hidden shadow-2xl my-6 border border-gray-800">
      <div className="flex justify-between items-center px-4 py-2 bg-[#2d2d2d]">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
          <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
        </div>
        {title && <span className="text-xs text-gray-400 font-mono">{title}</span>}
        <span className="text-xs text-gray-500 font-bold uppercase">{language}</span>
      </div>
      <div className="p-4 overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <tbody className="font-mono text-sm leading-6">
            {lines.map((line, idx) => (
              <tr key={idx}>
                <td className="select-none text-gray-600 text-right pr-4 w-8 border-r border-gray-700">
                  {idx + 1}
                </td>
                <td className="pl-4">
                  <SyntaxHighlighter
                    language={language}
                    style={vscDarkPlus}
                    customStyle={{
                      margin: 0,
                      padding: 0,
                      background: 'transparent',
                      display: 'inline',
                    }}
                    PreTag="span"
                  >
                    {line || ' '}
                  </SyntaxHighlighter>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

import { usePathname } from 'next/navigation';

export const ModuleDetail: React.FC<Props> = ({ module }) => {
  const [isCompleted, setIsCompleted] = useState(false);
  const pathname = usePathname();
  // Extract trackId from URL /learn/[trackId]/[moduleId]
  const trackId = pathname?.split('/')[2] || 'java';

  // Track별 테마 컬러 매핑
  const themeColors: Record<string, { primary: string, text: string, bg: string, ring: string, border: string }> = {
    java: { primary: 'bg-orange-500', text: 'text-orange-500', bg: 'bg-orange-50', ring: 'ring-orange-500', border: 'border-orange-500' },
    kotlin: { primary: 'bg-purple-600', text: 'text-purple-600', bg: 'bg-purple-50', ring: 'ring-purple-600', border: 'border-purple-600' },
    spring: { primary: 'bg-emerald-600', text: 'text-emerald-600', bg: 'bg-emerald-50', ring: 'ring-emerald-600', border: 'border-emerald-600' },
    // Default fallback
    unknown: { primary: 'bg-blue-500', text: 'text-blue-500', bg: 'bg-blue-50', ring: 'ring-blue-500', border: 'border-blue-500' }
  };

  const theme = themeColors[trackId] || themeColors.unknown;

  useEffect(() => {
    // Check localStorage
    // New key format: completed-[trackId]-[moduleId]
    // Legacy fallback: completed-[moduleId] (optional, but good for transition if needed, though we are doing a hard break)
    const saved = localStorage.getItem(`completed-${trackId}-${module.id}`);
    setIsCompleted(saved === 'true');
    
    // Scroll to top on module change
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [module.id, trackId]);

  const handleComplete = () => {
    const newState = !isCompleted;
    setIsCompleted(newState);
    if (trackId) {
        localStorage.setItem(`completed-${trackId}-${module.id}`, String(newState));
    }
  };

  return (
    <div className="max-w-6xl mx-auto pb-20">
      {/* Header Section */}
      <header className="mb-12 border-b border-gray-200 pb-8 pt-8">
        <div className="flex items-center gap-2 mb-6">
          <span className={`material-icons ${theme.text} text-sm`}>book</span>
          <span className={`text-xs font-bold ${theme.text} tracking-wide uppercase`}>Learning Module</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
          {module.title}
        </h1>
        <p className="text-lg text-gray-500">
          {module.topic}
        </p>
      </header>

      <div className="xl:flex gap-12 relative items-start">
        {/* Main Content Column */}
        <div className="flex-1 min-w-0">
          <div className="prose prose-lg prose-slate max-w-none text-gray-700 leading-loose">
            {module.content && (
              <ReactMarkdown 
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeSlug]}
                components={{
                  code({node, inline, className, children, ...props}: any) {
                    const match = /language-(\w+)/.exec(className || '');
                    const content = String(children).replace(/\n$/, '');
                    const isMultiLine = content.includes('\n');

                      let language = match ? match[1] : '';

                      // Fallback: className이 없어도 내용이 Mermaid 키워드로 시작하면 Mermaid로 처리
                      if (!language && (content.trim().startsWith('graph ') || content.trim().startsWith('sequenceDiagram') || content.trim().startsWith('classDiagram') || content.trim().startsWith('flowchart'))) {
                        language = 'mermaid';
                      }

                      if (!inline && (match || isMultiLine || language === 'mermaid')) {
                        // Handle Mermaid diagrams
                        if (language === 'mermaid') {
                          return (
                            <div className="mermaid-container my-10 p-8 bg-[#0f172a] rounded-2xl shadow-xl border border-slate-800 overflow-hidden group transition-all hover:shadow-2xl hover:border-slate-700">
                              <div className="flex items-center gap-2 mb-4 opacity-50 group-hover:opacity-100 transition-opacity">
                                <span className="material-icons text-slate-400 text-sm">schema</span>
                                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Architecture Visualization</span>
                              </div>
                              <Mermaid chart={content} />
                            </div>
                          );
                        }

                        return language ? (
                          <CodeBlockWithLineNumbers code={content} language={language} />
                        ) : (
                          // 언어 미지정 코드블록 (ASCII 아트, 다이어그램 등) - 라이트 배경
                          <div className="rounded-xl overflow-x-auto my-8 bg-slate-50 border border-slate-200 p-8 shadow-inner">
                             <pre className="whitespace-pre font-mono text-sm text-slate-800 leading-relaxed">{content}</pre>
                          </div>
                        );
                      }
                    // 인라인 코드
                    return (
                      <code className="bg-red-50 text-red-600 px-1.5 py-0.5 rounded-md font-mono text-sm border border-red-100 not-prose" {...props}>
                        {children}
                      </code>
                    );
                  },
                  h1: ({children, ...props}) => <h1 {...props} className="text-3xl font-extrabold text-gray-900 mt-12 mb-6 pb-4 border-b border-gray-200 scroll-mt-28">{children}</h1>,
                  h2: ({children, ...props}) => (
                    <div className="flex items-center gap-3 mb-6 mt-16">
                      <div className={`w-1 h-8 ${theme.primary} rounded-full`}></div>
                      <h2 className="text-2xl font-bold text-gray-900 scroll-mt-28" {...props}>{children}</h2>
                    </div>
                  ),
                  h3: ({children, ...props}) => <h3 {...props} className="text-lg font-bold text-gray-900 mt-8 mb-4 pl-4 border-l-2 border-gray-200 scroll-mt-28">{children}</h3>,
                  h4: ({children, ...props}) => <h4 {...props} className="font-semibold text-gray-900 mt-6 mb-2 scroll-mt-28">{children}</h4>,
                  p: ({children}) => <p className="mb-6 leading-relaxed text-gray-600">{children}</p>,
                  ul: ({children}) => <ul className="list-disc pl-5 space-y-1 text-gray-600 text-sm">{children}</ul>,
                  li: ({children}) => <li>{children}</li>,
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
                    return <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">{children}</th>;
                  },
                  tr({children}) {
                    return <tr className="bg-white divide-x divide-gray-200 hover:bg-gray-50/50 transition-colors">{children}</tr>;
                  },
                  td({children}) {
                    return <td className="px-6 py-4 whitespace-pre-wrap text-sm text-gray-600 align-top">{children}</td>;
                  },
                  strong({children}) {
                    return <strong className="font-bold text-gray-900">{children}</strong>;
                  },
                  blockquote({children}) {
                    // GitHub Alerts support ([!NOTE], [!TIP], [!IMPORTANT], [!WARNING], [!CAUTION])
                    // ReactMarkdown typically wraps the content in a 'p' tag as the first child.
                    const childrenArray = React.Children.toArray(children);
                    
                    // Helper to find the alert type and remaining content
                    let alertType: string | null = null;
                    let firstChildIdx = -1;
                    let textNodeIdx = -1;
                    
                    for (let i = 0; i < childrenArray.length; i++) {
                      const child: any = childrenArray[i];
                      if (child && child.props && child.props.children) {
                        const grandChildren = React.Children.toArray(child.props.children);
                        for (let j = 0; j < grandChildren.length; j++) {
                          const grandChild = grandChildren[j];
                          if (typeof grandChild === 'string') {
                            const match = grandChild.match(/^\s*\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]\s*/i);
                            if (match) {
                              alertType = match[1].toUpperCase();
                              firstChildIdx = i;
                              textNodeIdx = j;
                              break;
                            }
                          }
                        }
                      }
                      if (alertType) break;
                    }

                    if (alertType) {
                      const style = {
                        NOTE: { bg: 'bg-blue-50', border: 'border-blue-500', text: 'text-blue-800', icon: 'info', iconColor: 'text-blue-500', titleColor: 'text-blue-500' },
                        TIP: { bg: 'bg-emerald-50', border: 'border-emerald-500', text: 'text-emerald-800', icon: 'lightbulb', iconColor: 'text-emerald-500', titleColor: 'text-emerald-500' },
                        IMPORTANT: { bg: 'bg-purple-50', border: 'border-purple-500', text: 'text-purple-800', icon: 'report_problem', iconColor: 'text-purple-500', titleColor: 'text-purple-500' },
                        WARNING: { bg: 'bg-orange-50', border: 'border-orange-500', text: 'text-orange-800', icon: 'warning', iconColor: 'text-orange-500', titleColor: 'text-orange-500' },
                        CAUTION: { bg: 'bg-red-50', border: 'border-red-500', text: 'text-red-800', icon: 'dangerous', iconColor: 'text-red-500', titleColor: 'text-red-500' }
                      }[alertType] || { bg: 'bg-blue-50', border: 'border-blue-500', text: 'text-blue-800', icon: 'info', iconColor: 'text-blue-500', titleColor: 'text-blue-500' };

                      // Create a modified first child with the marker removed
                      const targetChild: any = childrenArray[firstChildIdx];
                      const targetGrandChildren = React.Children.toArray(targetChild.props.children);
                      const modifiedGrandChildren = [
                        ...targetGrandChildren.slice(0, textNodeIdx),
                        (targetGrandChildren[textNodeIdx] as string).replace(/^\s*\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]\s*/i, ''),
                        ...targetGrandChildren.slice(textNodeIdx + 1)
                      ];

                      const modifiedChild = React.cloneElement(targetChild, { 
                        children: modifiedGrandChildren,
                        className: (targetChild.props.className || '') + ' !m-0 line-relaxed'
                      });

                      const otherChildren = [
                        ...childrenArray.slice(0, firstChildIdx),
                        modifiedChild,
                        ...childrenArray.slice(firstChildIdx + 1)
                      ];

                      return (
                        <div className={`my-8 border-l-4 ${style.border} ${style.bg} p-5 rounded-r-xl shadow-sm border-y border-r border-opacity-10 transition-all hover:shadow-md`}>
                          <div className="flex items-center gap-2.5 mb-3">
                            <span className={`material-icons ${style.iconColor} text-2xl`}>{style.icon}</span>
                            <span className={`font-black uppercase text-xs tracking-widest ${style.titleColor}`}>{alertType}</span>
                          </div>
                          <div className={`text-base leading-relaxed ${style.text} font-medium`}>
                            {otherChildren}
                          </div>
                        </div>
                      );
                    }
                                        return (
                        <blockquote className="border-l-4 border-slate-300 pl-8 my-10 italic text-slate-600 bg-slate-50/50 py-6 pr-8 rounded-r-2xl shadow-inner border-y border-r border-slate-100">
                          {children}
                        </blockquote>
                      );
                    }
                }}
              >
                {module.content}
              </ReactMarkdown>
            )}
          </div>

          {/* Key Points */}
          {module.keyPoints && (
            <section className="mt-16 bg-yellow-50 rounded-xl p-6 border border-yellow-200">
              <h3 className="flex items-center gap-2 text-lg font-bold text-yellow-800 mb-4">
                <span className="material-icons text-xl">lightbulb</span>
                핵심 요약
              </h3>
              <ul className="space-y-3">
                {module.keyPoints.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-yellow-200 text-yellow-800 text-xs font-bold flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <span className="text-sm text-yellow-900 mt-0.5">{point}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Code Examples */}
          {module.codeExamples && module.codeExamples.length > 0 && (
            <section className="mt-16">
              <div className="flex items-center gap-3 mb-8">
                <span className={`material-icons ${theme.text}`}>code</span>
                <h2 className="text-xl font-bold text-gray-900">실전 코드 예제</h2>
              </div>
              <div className="space-y-8">
                {module.codeExamples.map((ex, idx) => (
                  <CodeBlockWithLineNumbers 
                    key={idx} 
                    code={ex.code} 
                    language={ex.language} 
                    title={ex.title} 
                  />
                ))}
              </div>
            </section>
          )}

          {/* Interview Questions */}
          {module.interviewQuestions && module.interviewQuestions.length > 0 && (
            <section className="mt-20 border-t border-gray-100 pt-12">
              <div className="flex items-center gap-3 mb-8">
                <span className="material-icons text-purple-600 text-2xl">psychology</span>
                <div>
                  <h2 id="tech-interview" className="text-2xl font-bold text-gray-900 toc-heading">Tech Interview Challenge</h2>
                  <p className="text-gray-500 text-sm mt-1">현업 면접관이 실제로 던지는 질문입니다. 먼저 스스로 답해보세요.</p>
                </div>
              </div>
              <div className="space-y-4">
                {module.interviewQuestions.map((q, idx) => (
                  <div key={idx} className="group border border-gray-200 rounded-xl overflow-hidden transition-all duration-300 hover:border-purple-200 hover:shadow-lg hover:shadow-purple-500/5 bg-white">
                    <details className="group/details">
                      <summary className="flex items-start justify-between p-6 cursor-pointer select-none list-none [&::-webkit-details-marker]:hidden bg-gray-50/50 group-open/details:bg-purple-50/30 transition-colors">
                        <div className="flex items-start gap-4">
                          <span className={`
                            flex-shrink-0 px-3 py-1 rounded-md text-xs font-bold border shadow-sm
                            ${q.difficulty === 'Easy' ? 'bg-gradient-to-br from-green-50 via-green-100 to-green-200 text-green-700 border-green-300' : ''}
                            ${q.difficulty === 'Medium' ? 'bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 text-blue-700 border-blue-300' : ''}
                            ${q.difficulty === 'Hard' ? 'bg-gradient-to-br from-orange-50 via-orange-100 to-orange-200 text-orange-800 border-orange-300' : ''}
                            ${q.difficulty === 'Hell' ? 'bg-gradient-to-br from-red-50 via-red-100 to-red-200 text-red-800 border-red-300' : ''}
                            ${!['Easy', 'Medium', 'Hard', 'Hell'].includes(q.difficulty) ? 'bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 text-gray-700 border-gray-300' : ''}
                          `}>
                            {q.difficulty}
                          </span>
                          <h3 className="text-lg font-bold text-gray-800 leading-snug group-hover:text-purple-700 transition-colors">
                            {q.question}
                          </h3>
                        </div>
                        <span className="material-icons text-gray-400 transform group-open/details:rotate-180 transition-transform duration-300">
                          expand_more
                        </span>
                      </summary>
                      <div className="p-6 pt-2 bg-white border-t border-gray-100">
                        <div className="flex gap-4 mt-2">
                          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-md">
                            A
                          </div>
                          <div className="prose prose-slate prose-sm max-w-none text-gray-600 leading-relaxed">
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>{q.answer}</ReactMarkdown>
                          </div>
                        </div>
                      </div>
                    </details>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Completion Footer */}
          <div className="flex justify-center mt-12 pb-12">
            <button
              onClick={handleComplete}
              className={`
                flex items-center gap-2 px-8 py-3 rounded-full font-bold transition-all shadow-lg hover:scale-105 active:scale-95
                ${isCompleted 
                  ? 'bg-green-100 text-green-700 hover:bg-green-200 ring-2 ring-green-500 ring-offset-2' 
                  : `${theme.primary} text-white hover:opacity-90 ring-offset-2 hover:ring-2 ${theme.ring}`
                }
              `}
            >
              <span className="material-icons text-sm">check_circle</span>
              {isCompleted ? '학습 완료됨 (다시 보기)' : '이 모듈 학습 완료'}
            </button>
          </div>
        </div>

        {/* Right Sidebar for TOC */}
        <TableOfContents key={module.id} />
      </div>
    </div>
  );
};
