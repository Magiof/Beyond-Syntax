import { redirect } from 'next/navigation';
import { trackData } from '@/data/curriculumData';

export default function Home() {
  // Find the first available track and module
  const firstTrack = trackData[0];
  const firstModule = firstTrack?.phases[0]?.modules[0];
  
  if (firstTrack && firstModule) {
    const url = `/learn/${firstTrack.id}/${firstModule.id}`;
    redirect(url);
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Welcome to Beyond Syntax</h1>
        <p className="text-gray-600">No modules found. Please check curriculum data.</p>
      </div>
    </div>
  );
}
