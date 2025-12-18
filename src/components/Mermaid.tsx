'use client';

import React, { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

interface MermaidProps {
  chart: string;
}

const Mermaid: React.FC<MermaidProps> = ({ chart }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize mermaid with a dark theme and specific font settings
    mermaid.initialize({
      startOnLoad: false,
      theme: 'dark',
      securityLevel: 'loose',
      fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
      fontSize: 18,
      themeVariables: {
        darkMode: true,
        background: '#1e1e1e',
        primaryColor: '#3b82f6',
        secondaryColor: '#f59e0b',
        tertiaryColor: '#10b981',
        primaryTextColor: '#e2e8f0',
        lineColor: '#64748b',
        textColor: '#e2e8f0',
        mainBkg: '#1e1e1e',
        nodeBorder: '#334155',
      }
    });

    const renderChart = async () => {
      if (containerRef.current) {
        try {
          // Generate a unique ID for each chart
          const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
          const { svg } = await mermaid.render(id, chart);
          containerRef.current.innerHTML = svg;
        } catch (error) {
          console.error('Mermaid rendering failed:', error);
          if (containerRef.current) {
            containerRef.current.innerHTML = '<div class="text-red-500 text-sm">Diagram rendering failed. Please check syntax.</div>';
          }
        }
      }
    };

    renderChart();
  }, [chart]);

  return (
    <div className="my-8 flex justify-center bg-[#1e1e1e] p-6 rounded-xl shadow-lg border border-gray-800 overflow-x-auto">
      <div ref={containerRef} className="mermaid-chart" />
    </div>
  );
};

export default Mermaid;
