import { notFound } from 'next/navigation';
import { trackData } from '@/data/curriculumData';
import { ModuleDetail } from '@/components/ModuleDetail';
import React from 'react';

// Use standard params type for Next.js 15
type Params = Promise<{ moduleId: string }>;

export async function generateStaticParams() {
  const params = [];
  for (const track of trackData) {
    for (const phase of track.phases) {
      for (const module of phase.modules) {
        params.push({ moduleId: module.id });
      }
    }
  }
  return params;
}

export default async function LearnPage({ params }: { params: Params }) {
  const { moduleId } = await params;

  // Find module data
  let moduleData;
  for (const track of trackData) {
    for (const phase of track.phases) {
      const found = phase.modules.find(m => m.id === moduleId);
      if (found) {
        moduleData = found;
        break;
      }
    }
    if (moduleData) break;
  }

  if (!moduleData) {
    notFound();
  }

  return (
    <div className="p-8 lg:p-16 max-w-5xl mx-auto">
      <ModuleDetail module={moduleData} />
    </div>
  );
}
