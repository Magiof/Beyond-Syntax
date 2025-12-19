'use client';

import React, { useState } from 'react';
import { Sidebar } from "@/components/Sidebar";
import { trackData } from "@/data/curriculumData";

interface Props {
  children: React.ReactNode;
}

export const MainLayout: React.FC<Props> = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <body className="flex h-screen overflow-hidden bg-white font-sans text-slate-900 selection:bg-blue-100 selection:text-blue-900 antialiased">
      {/* Sidebar - Fixed on desktop */}
      <div className={`hidden lg:block fixed inset-y-0 left-0 z-50 transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-72'}`}>
         <Sidebar tracks={trackData} isCollapsed={isCollapsed} onToggle={() => setIsCollapsed(!isCollapsed)} />
      </div>
      
      {/* Main Content */}
      <main className={`
        flex-1 overflow-y-auto custom-scrollbar bg-white w-full transition-all duration-300
        ${isCollapsed ? 'lg:ml-20' : 'lg:ml-72'}
      `}>
        {children}
      </main>
    </body>
  );
};
