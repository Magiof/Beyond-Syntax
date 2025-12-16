import React from 'react';
import { CheckCircle2, Circle, ChevronRight, Layout } from 'lucide-react';
import type { Phase, Module } from '../data/curriculumData';

interface Props {
  curriculum: Phase[];
  currentModuleId: string;
  completedModuleIds: string[];
  onSelectModule: (module: Module) => void;
}

export const Sidebar: React.FC<Props> = ({ 
  curriculum, 
  currentModuleId, 
  completedModuleIds, 
  onSelectModule 
}) => {
  return (
    <aside className="w-80 h-screen bg-slate-50 border-r border-gray-200 flex flex-col fixed left-0 top-0 overflow-hidden">
      {/* Brand Header */}
      <div className="p-6 border-b border-gray-200 bg-white">
        <h1 className="flex items-center gap-3 text-xl font-extrabold text-slate-900 tracking-tight">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-blue-200 shadow-lg">
            <Layout size={18} />
          </div>
          Dev Course
        </h1>
        <p className="text-xs text-gray-500 font-medium mt-2 ml-11">
          Full-Stack Expert Curriculum
        </p>
      </div>

      {/* Navigation List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-8">
        {curriculum.map((phase) => (
          <div key={phase.id}>
            <h2 className="px-3 text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
              {phase.title}
            </h2>
            <div className="space-y-1">
              {phase.modules.map((module) => {
                const isActive = currentModuleId === module.id;
                const isCompleted = completedModuleIds.includes(module.id);

                return (
                  <button
                    key={module.id}
                    onClick={() => onSelectModule(module)}
                    className={`
                      w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group flex items-center justify-between
                      ${isActive 
                        ? 'bg-blue-600 text-white shadow-md shadow-blue-200' 
                        : 'text-gray-600 hover:bg-gray-200/50 hover:text-gray-900'
                      }
                    `}
                  >
                    <span className="truncate mr-2">{module.title}</span>
                    {isCompleted ? (
                      <CheckCircle2 size={16} className={isActive ? 'text-blue-200' : 'text-green-500'} />
                    ) : (
                      isActive && <ChevronRight size={16} className="text-blue-200 opacity-50" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* User Progress Footer (Optional) */}
      <div className="p-4 border-t border-gray-200 bg-white">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-lg">
            🧑‍💻
          </div>
          <div>
            <p className="text-sm font-bold text-gray-900">황성원</p>
            <p className="text-xs text-gray-500">Keep going! 🔥</p>
          </div>
        </div>
      </div>
    </aside>
  );
};
