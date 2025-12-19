'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { Track } from '@/data/curriculumData';

interface Props {
  tracks: Track[];
  isCollapsed: boolean;
  onToggle: () => void;
}

export const Sidebar: React.FC<Props> = ({ tracks, isCollapsed, onToggle }) => {
  const pathname = usePathname();
  // Extract trackId and moduleId from pathname e.g. /learn/java/java-setup
  const pathParts = pathname?.split('/') || [];
  const currentTrackId = pathParts[2] || '';
  const currentModuleId = pathParts[3] || '';

  // 현재 모듈이 속한 Track과 Phase 찾기
  const findCurrentLocation = () => {
    if (!currentModuleId || !currentTrackId) {
      return {
        trackId: tracks[0]?.id || '',
        phaseId: tracks[0]?.phases[0]?.id || ''
      };
    }
    // Trust URL first
    const track = tracks.find(t => t.id === currentTrackId);
    if (track) {
        for (const phase of track.phases) {
             if (phase.modules.some(m => m.id === currentModuleId)) {
                  return { trackId: track.id, phaseId: phase.id };
             }
        }
    }

    return {
      trackId: tracks[0]?.id || '',
      phaseId: tracks[0]?.phases[0]?.id || ''
    };
  };

  const { trackId: initialTrackId, phaseId: initialPhaseId } = findCurrentLocation();

  const [activeTrackId, setActiveTrackId] = useState(initialTrackId);
  const [openPhases, setOpenPhases] = useState<string[]>([initialPhaseId]);

  // Update active state when URL changes
  useEffect(() => {
    const loc = findCurrentLocation();
    if (currentModuleId && currentTrackId) {
      setActiveTrackId(loc.trackId);
      setOpenPhases(prev => {
        if (!prev.includes(loc.phaseId)) {
          return [...prev, loc.phaseId];
        }
        return prev;
      });
    }
  }, [currentModuleId, currentTrackId]);

  const togglePhase = (phaseId: string) => {
    setOpenPhases(prev =>
      prev.includes(phaseId)
        ? prev.filter(id => id !== phaseId)
        : [...prev, phaseId]
    );
  };

  // Track 색상 매핑
  const trackColors: Record<string, { bg: string; bgHover: string; text: string; border: string }> = {
    orange: { bg: 'bg-orange-500', bgHover: 'hover:bg-orange-600', text: 'text-orange-600', border: 'border-orange-500' },
    purple: { bg: 'bg-purple-500', bgHover: 'hover:bg-purple-600', text: 'text-purple-600', border: 'border-purple-500' },
    green: { bg: 'bg-green-500', bgHover: 'hover:bg-green-600', text: 'text-green-600', border: 'border-green-500' },
    blue: { bg: 'bg-blue-500', bgHover: 'hover:bg-blue-600', text: 'text-blue-600', border: 'border-blue-500' },
  };

  const activeTrack = tracks.find(t => t.id === activeTrackId);

  return (
    <aside className={`
      relative flex-shrink-0 flex flex-col border-r border-gray-200 bg-white h-screen transition-all duration-300 ease-in-out
      ${isCollapsed ? 'lg:w-20' : 'lg:w-72'}
      w-72 lg:flex
    `}>
      {/* Sidebar Toggle Button - Desktop Only */}
      <button
        onClick={onToggle}
        className="hidden lg:flex absolute -right-3 top-20 w-6 h-6 bg-white border border-gray-200 rounded-full items-center justify-center text-gray-400 hover:text-gray-600 hover:border-gray-300 shadow-sm z-50 transition-all"
      >
        <span className="material-icons text-sm">
          {isCollapsed ? 'chevron_right' : 'chevron_left'}
        </span>
      </button>

      {/* Brand Logo Area */}
      <div className={`
        h-16 flex items-center border-b border-gray-100 bg-white/50 backdrop-blur-sm sticky top-0 z-10 transition-all
        ${isCollapsed ? 'lg:px-0 lg:justify-center' : 'px-4'}
        px-4
      `}>
        <Link href="/" className={`flex items-center gap-3 group cursor-pointer ${isCollapsed ? 'lg:w-auto' : 'w-full'} w-full`}>
          <div className="relative w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-xl shadow-lg transition-all duration-300 overflow-hidden bg-black">
            <img
              src="/brand/logo.png"
              alt="Beyond Syntax"
              className="w-full h-full object-contain"
              draggable={false}
            />
          </div>
          <div className={`flex flex-col overflow-hidden ${isCollapsed ? 'lg:hidden' : 'block'}`}>
            <h1 className="text-lg font-bold tracking-tight text-gray-900 leading-none group-hover:text-blue-600 transition-colors font-display truncate">
              Beyond
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent ml-1">
                Syntax
              </span>
            </h1>
            <span className="text-[10px] uppercase tracking-widest text-gray-400 font-medium mt-1 group-hover:text-purple-500 transition-colors truncate">
              Depth First Learning
            </span>
          </div>
        </Link>
      </div>

      {/* Track Tabs */}
      <div className={`flex border-b border-gray-200 pt-2 ${isCollapsed ? 'lg:flex-col lg:px-2 lg:pb-2 lg:gap-2' : 'px-2'}`}>
        {tracks.map((track) => {
          const isActive = activeTrackId === track.id;
          const colors = trackColors[track.color] || trackColors.blue;

          return (
            <button
              key={track.id}
              onClick={() => {
                setActiveTrackId(track.id);
                // Open first phase of this track
                if (track.phases.length > 0) {
                  setOpenPhases([track.phases[0].id]);
                }
              }}
              className={`
                flex flex-col items-center justify-center gap-1 transition-all text-sm font-medium
                ${isCollapsed ? 'lg:w-full lg:py-3 lg:rounded-xl' : 'flex-1 py-2.5 px-2 rounded-t-lg'}
                ${!isCollapsed ? 'flex-1 py-2.5 px-2 rounded-t-lg' : 'lg:w-full w-auto flex-1 py-2.5 px-2 lg:rounded-xl rounded-t-lg'}
                ${isActive
                  ? `${colors.bg} text-white shadow-md`
                  : `text-gray-400 hover:text-gray-600 hover:bg-gray-100`
                }
              `}
              title={isCollapsed ? track.title : ''}
            >
              <span className="material-icons text-xl">{track.icon}</span>
              <span className={`text-xs ${isCollapsed ? 'lg:hidden' : 'block'}`}>{track.title}</span>
            </button>
          );
        })}
      </div>

      {/* Track Description */}
      <div className={`px-4 py-3 bg-gray-50 border-b border-gray-200 ${isCollapsed ? 'lg:hidden' : 'block'}`}>
        {activeTrack && <p className="text-xs text-gray-600">{activeTrack.description}</p>}
      </div>

      {/* Phase & Chapter List */}
      <nav className={`flex-1 overflow-y-auto custom-scrollbar py-3 space-y-2 ${isCollapsed ? 'lg:px-2 px-3' : 'px-3'}`}>
        {activeTrack?.phases.map((phase) => {
          const isOpen = openPhases.includes(phase.id);
          const colors = trackColors[activeTrack.color] || trackColors.blue;

          return (
            <React.Fragment key={phase.id}>
              {/* Desktop Collapsed Indicator */}
              {isCollapsed && (
                <div
                  className={`hidden lg:block w-full h-1 my-2 rounded-full ${colors.bg} opacity-20`}
                  title={phase.title}
                />
              )}
              
              {/* Desktop Collapsed - No details, just small marks above. 
                  Mobile or Expanded - Show full details. */}
              <details
                className={`group ${isCollapsed ? 'lg:hidden' : 'block'}`}
                open={isOpen}
                onToggle={(e) => {
                  const target = e.target as HTMLDetailsElement;
                  if (target.open !== isOpen) {
                    togglePhase(phase.id);
                  }
                }}
              >
                <summary className={`flex items-center justify-between px-3 py-2.5 cursor-pointer rounded-lg transition-all select-none border-l-4 ${colors.border} bg-gray-50 hover:bg-gray-100`}>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-bold ${colors.text} uppercase tracking-wide`}>
                      {phase.title}
                    </span>
                  </div>
                  <span className={`material-icons text-base transition-transform duration-200 text-gray-400 ${isOpen ? 'rotate-180' : ''}`}>
                    expand_more
                  </span>
                </summary>

                <div className="space-y-0.5 ml-3 mt-1 pl-3 border-l border-gray-200">
                  {phase.modules.map((module) => {
                    const isActive = currentModuleId === module.id;
                    const modColors = trackColors[activeTrack.color] || trackColors.blue;

                    return (
                      <Link
                        key={module.id}
                        href={`/learn/${activeTrack.id}/${module.id}`}
                        className={`
                          w-full text-left flex items-center justify-between px-3 py-2 text-sm rounded-md transition-colors block
                          ${isActive
                            ? `${modColors.bg} text-white font-medium shadow-sm`
                            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                          }
                        `}
                      >
                        <span className="truncate">{module.title}</span>
                        {isActive && (
                          <span className="material-icons text-sm">chevron_right</span>
                        )}
                      </Link>
                    );
                  })}
                </div>
              </details>
            </React.Fragment>
          );
        })}
      </nav>

      {/* User Footer */}
      <div className={`border-t border-gray-100 bg-gray-50/30 transition-all ${isCollapsed ? 'p-0 py-4' : 'p-6'}`}>
        <div className={`flex items-center group ${isCollapsed ? 'flex-col gap-4' : 'gap-4'}`}>
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center text-white shadow-md group-hover:shadow-lg transition-all duration-300 overflow-hidden">
               <span className="material-icons text-lg">person</span>
            </div>
            {!isCollapsed && <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full shadow-sm"></div>}
          </div>
          {!isCollapsed ? (
            <>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-0.5">Architect</p>
                <p className="text-sm font-bold text-gray-900 truncate">
                   <Link href="https://about.magiof.com" target="_blank" className="hover:text-blue-600 transition-colors">
                     황성원
                   </Link>
                </p>
              </div>
              <Link 
                href="https://github.com/magiof" 
                target="_blank"
                className="w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:bg-white hover:text-gray-900 hover:shadow-sm transition-all"
              >
                <span className="material-icons text-xl">code</span>
              </Link>
            </>
          ) : (
            <Link 
              href="https://github.com/magiof" 
              target="_blank"
              className="w-10 h-10 flex items-center justify-center rounded-xl text-gray-400 hover:bg-white hover:text-gray-900 hover:shadow-md transition-all"
            >
              <span className="material-icons text-2xl">code</span>
            </Link>
          )}
        </div>
      </div>
    </aside>
  );
};
