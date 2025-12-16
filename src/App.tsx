import { useState, useEffect } from 'react';
import { curriculumData, type Module } from './data/curriculumData';
import { Sidebar } from './components/Sidebar';
import { ModuleDetail } from './components/ModuleDetail';
import { Menu } from 'lucide-react';

function App() {
  // Global State
  const [currentModule, setCurrentModule] = useState<Module>(curriculumData[0].modules[0]);
  const [completedModules, setCompletedModules] = useState<string[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // For mobile responsibility if needed

  // Load progress from localStorage
  useEffect(() => {
    const loaded = Object.keys(localStorage)
      .filter(k => k.startsWith('completed-') && localStorage.getItem(k) === 'true')
      .map(k => k.replace('completed-', ''));
    setCompletedModules(loaded);
  }, []);

  const handleModuleSelect = (module: Module) => {
    setCurrentModule(module);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleComplete = () => {
    const isCurrentlyCompleted = completedModules.includes(currentModule.id);
    let newCompleted;
    
    if (isCurrentlyCompleted) {
      newCompleted = completedModules.filter(id => id !== currentModule.id);
      localStorage.setItem(`completed-${currentModule.id}`, 'false');
    } else {
      newCompleted = [...completedModules, currentModule.id];
      localStorage.setItem(`completed-${currentModule.id}`, 'true');
    }
    
    setCompletedModules(newCompleted);
  };

  return (
    <div className="flex min-h-screen bg-white font-sans text-slate-900 selection:bg-blue-100 selection:text-blue-900">
      
      {/* Sidebar - Fixed */}
      <div className={`${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} fixed inset-y-0 left-0 z-50 w-80 transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        <Sidebar 
          curriculum={curriculumData}
          currentModuleId={currentModule.id}
          completedModuleIds={completedModules}
          onSelectModule={handleModuleSelect}
        />
      </div>

      {/* Main Content - Scrollable */}
      <main className="flex-1 min-w-0 bg-white">
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center p-4 border-b border-gray-100 bg-white sticky top-0 z-40">
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 -ml-2 text-gray-600">
            <Menu />
          </button>
          <span className="font-bold text-gray-900 ml-2">{currentModule.title}</span>
        </div>

        <div className="p-8 lg:p-16 max-w-5xl mx-auto">
          <ModuleDetail 
            module={currentModule} 
            onComplete={handleComplete}
            isCompleted={completedModules.includes(currentModule.id)}
          />
        </div>
      </main>

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}

export default App;
