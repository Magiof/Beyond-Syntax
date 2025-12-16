'use client';

import React, { useEffect, useState } from 'react';

interface Heading {
  id: string;
  text: string;
  level: number;
}

export const TableOfContents = () => {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    // 약간의 지연을 주어 ReactMarkdown이 렌더링되고 rehype-slug가 ID를 붙인 후 실행되도록 함
    // (보통 useEffect는 렌더링 후 실행되지만, 안전장치)
    const scanHeadings = () => {
      const elements = Array.from(document.querySelectorAll('.prose h1, .prose h2, .prose h3'))
        .map((element) => ({
          id: element.id,
          text: element.textContent || '',
          level: Number(element.tagName.substring(1)),
        }))
        .filter((heading) => heading.id);

      setHeadings(elements);
    };

    const timeoutId = setTimeout(scanHeadings, 100);

    // IntersectionObserver
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '0px 0px -40% 0px', threshold: 0.5 }
    );

    // 요소 관찰은 headings 상태가 업데이트된 직후에 수행해야 함 (useEffect 분리 또는 여기서 처리)
    // 여기서는 headings 찾은 후 바로 observe가 안되므로(state update 비동기),
    // 별도 useEffect로 분리하거나 DOM 요소를 직접 잡아서 observe.
    // DOM 요소는 이미 있으므로 직접 잡아서 observe 가능.
    const observeElements = () => {
       const targets = document.querySelectorAll('.prose h1, .prose h2, .prose h3');
       targets.forEach(t => observer.observe(t));
    };
    
    // scan 후 observe
    setTimeout(observeElements, 150);

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, []);

  if (headings.length === 0) return null;

  return (
    <nav className="hidden xl:block w-64 sticky top-24 self-start pl-8 border-l border-gray-100 max-h-[calc(100vh-6rem)] overflow-y-auto overflow-x-hidden custom-scrollbar">
      <h4 className="text-xs font-bold text-gray-400 mb-4 uppercase tracking-wider">
        On This Page
      </h4>
      <ul className="space-y-2">
        {headings.map((heading) => (
          <li
            key={heading.id}
            className={`transition-colors duration-200 ${
              heading.level === 3 ? 'pl-4 mt-1' : ''
            }`}
          >
            <a
              href={`#${heading.id}`}
              className={`block text-sm transition-all duration-200 ${
                activeId === heading.id
                  ? 'text-blue-600 font-bold translate-x-1'
                  : heading.level === 3 
                    ? 'text-gray-500 font-normal hover:text-gray-800' // Level 3: 얇고 작게
                    : 'text-gray-600 font-medium hover:text-gray-900' // Level 2: 보통
              } ${heading.level === 3 ? 'text-xs' : 'text-sm'}`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(heading.id)?.scrollIntoView({
                  behavior: 'smooth',
                  block: 'start',
                });
                history.replaceState(null, '', `#${heading.id}`);
                setActiveId(heading.id);
              }}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
