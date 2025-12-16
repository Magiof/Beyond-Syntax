'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { Track } from '@/data/curriculumData';

interface Props {
  tracks: Track[];
}

export const Sidebar: React.FC<Props> = ({ tracks }) => {
  const pathname = usePathname();
  // Extract currentModuleId from pathname e.g. /learn/java-setup -> java-setup
  const currentModuleId = pathname?.startsWith('/learn/')
    ? pathname.split('/').pop() || ''
    : '';

  // 현재 모듈이 속한 Track과 Phase 찾기
  const findCurrentLocation = () => {
    if (!currentModuleId) {
      return {
        trackId: tracks[0]?.id || '',
        phaseId: tracks[0]?.phases[0]?.id || ''
      };
    }

    for (const track of tracks) {
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

  // Update active state when URL changes (e.g. user navigates directly or back/forward)
  useEffect(() => {
    const loc = findCurrentLocation();
    if (currentModuleId) {
      setActiveTrackId(loc.trackId);
      setOpenPhases(prev => {
        if (!prev.includes(loc.phaseId)) {
          return [...prev, loc.phaseId];
        }
        return prev;
      });
    }
  }, [currentModuleId]);

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
    <aside className="w-72 flex-shrink-0 flex flex-col border-r border-gray-200 bg-white h-screen">
      {/* Brand Logo Area */}
      <div className="h-16 flex items-center px-4 border-b border-gray-100 bg-white/50 backdrop-blur-sm sticky top-0 z-10">
        <Link href="/" className="flex items-center gap-3 group cursor-pointer w-full">
          <div className="relative w-10 h-10 flex items-center justify-center bg-gray-900 rounded-xl shadow-lg group-hover:shadow-blue-500/20 transition-all duration-300 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 opacity-20 group-hover:opacity-30 transition-opacity"></div>
            <span className="text-xl font-bold bg-gradient-to-br from-blue-400 to-purple-400 bg-clip-text text-transparent font-mono pt-1">
              {`>_`}
            </span>
          </div>
          <div className="flex flex-col">
            <h1 className="text-lg font-bold tracking-tight text-gray-900 leading-none group-hover:text-blue-600 transition-colors font-display">
              Beyond
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent ml-1">
                Syntax
              </span>
            </h1>
            <span className="text-[10px] uppercase tracking-widest text-gray-400 font-medium mt-1 group-hover:text-purple-500 transition-colors">
              Depth First Learning
            </span>
          </div>
        </Link>
      </div>

      {/* Track Tabs */}
      <div className="flex border-b border-gray-200 px-2 pt-2">
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
                flex-1 flex flex-col items-center gap-1 py-2.5 px-2 rounded-t-lg transition-all text-sm font-medium
                ${isActive
                  ? `${colors.bg} text-white`
                  : `text-gray-500 hover:bg-gray-100`
                }
              `}
            >
              <span className="material-icons text-lg">{track.icon}</span>
              <span className="text-xs">{track.title}</span>
            </button>
          );
        })}
      </div>

      {/* Track Description */}
      {activeTrack && (
        <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
          <p className="text-xs text-gray-600">{activeTrack.description}</p>
        </div>
      )}

      {/* Phase & Chapter List */}
      <nav className="flex-1 overflow-y-auto custom-scrollbar py-3 px-3 space-y-2">
        {activeTrack?.phases.map((phase) => {
          const isOpen = openPhases.includes(phase.id);
          const colors = trackColors[activeTrack.color] || trackColors.blue;

          return (
            <details
              key={phase.id}
              className="group"
              open={isOpen}
              onToggle={(e) => {
                const target = e.target as HTMLDetailsElement;
                if (target.open !== isOpen) {
                  togglePhase(phase.id);
                }
              }}
            >
              {/* Phase Header */}
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

              {/* Chapter List */}
              <div className="space-y-0.5 ml-3 mt-1 pl-3 border-l border-gray-200">
                {phase.modules.map((module) => {
                  const isActive = currentModuleId === module.id;
                  const colors = trackColors[activeTrack.color] || trackColors.blue;

                  return (
                    <Link
                      key={module.id}
                      href={`/learn/${module.id}`}
                      className={`
                        w-full text-left flex items-center justify-between px-3 py-2 text-sm rounded-md transition-colors block
                        ${isActive
                          ? `${colors.bg} text-white font-medium shadow-sm`
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
          );
        })}
      </nav>

      {/* User Footer */}
      <div className="p-4 border-t border-gray-200 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center text-white text-sm font-bold shadow-sm">
          🔥
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate">Made by <Link href="https://about.magiof.com" className="text-blue-600 hover:underline font-bold">황성원</Link></p>
          {/* <p className="text-xs text-gray-500 truncate">Keep going! 🔥</p> */}
        </div>
      </div>
    </aside>
  );
};
