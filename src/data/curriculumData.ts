export interface CodeExample {
  title: string;
  language: string;
  code: string;
}

export interface InterviewQuestion {
  question: string;
  answer: string;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Hell';
}

export interface Module {
  id: string;
  title: string;
  topic: string;
  content?: string;
  codeExamples?: CodeExample[];
  keyPoints?: string[];
  interviewQuestions?: InterviewQuestion[];
}

export interface Phase {
  id: string;
  title: string;
  goal: string;
  modules: Module[];
}

// NEW: Track은 Phase의 상위 그룹 (Java, Kotlin, Spring 등)
export interface Track {
  id: string;
  title: string;
  description: string;
  icon: string;  // Material Icon name
  color: string; // Tailwind color class (e.g., 'blue', 'purple', 'green')
  phases: Phase[];
}

// Import all phases
import { javaPhase1 } from './java/phase1';
import { javaPhase2 } from './java/phase2';
import { kotlinPhase1 } from './kotlin/phase1';
import { kotlinPhase2 } from './kotlin/phase2';
import { springPhase1 } from './spring/phase1';
import { springPhase2 } from './spring/phase2';


// NEW: Track별로 Phase 그룹화
export const trackData: Track[] = [
  {
    id: "java",
    title: "Java",
    icon: "coffee",
    color: "orange",
    description: "기초부터 심화까지, 자바 백엔드 개발자의 길",
    phases: [javaPhase1, javaPhase2]
  },
  {
    id: "kotlin",
    title: "Kotlin",
    description: "코틀린 기초부터 코루틴까지",
    icon: "bolt",
    color: "purple",
    phases: [kotlinPhase1, kotlinPhase2]
  },
  {
    id: "spring",
    title: "Spring",
    description: "스프링 부트와 백엔드 개발",
    icon: "eco",
    color: "green",
    phases: [springPhase1, springPhase2]
  }
];

// 기존 curriculumData도 유지 (하위 호환성)
export const curriculumData: Phase[] = [
  javaPhase1,
  javaPhase2,
  kotlinPhase1,
  kotlinPhase2,
  springPhase1,
  springPhase2,
];
