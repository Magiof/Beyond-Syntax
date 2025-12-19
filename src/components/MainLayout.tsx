'use client';

import React, { useState } from 'react';
import { Sidebar } from "@/components/Sidebar";
import { trackData } from "@/data/curriculumData";

interface Props {
  children: React.ReactNode;
}

export const MainLayout: React.FC<Props> = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <body className="flex h-screen overflow-hidden bg-white font-sans text-slate-900 selection:bg-blue-100 selection:text-blue-900 antialiased">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-100 flex items-center justify-between px-4 z-40">
        <div className="flex items-center gap-3">
          <img src="/brand/logo.png" alt="Logo" className="w-8 h-8 rounded-lg bg-black object-contain" />
          <span className="font-bold text-gray-900">Beyond Syntax</span>
        </div>
        <button 
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <span className="material-icons">{isMobileOpen ? 'close' : 'menu'}</span>
        </button>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobileOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar - Fixed on desktop, Drawer on mobile */}
      <div className={`
        fixed inset-y-0 left-0 z-50 transition-all duration-300 transform
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        ${isCollapsed ? 'lg:w-20' : 'lg:w-72'}
      `}>
         <Sidebar 
           tracks={trackData} 
           isCollapsed={isCollapsed} 
           onToggle={() => setIsCollapsed(!isCollapsed)} 
         />
      </div>
      
      {/* Main Content */}
      <main className={`
        flex-1 overflow-y-auto custom-scrollbar bg-white w-full transition-all duration-300 pt-16 lg:pt-0
        ${isCollapsed ? 'lg:ml-20' : 'lg:ml-72'}
      `}>
        {children}
      </main>
    </body>
  );
};
