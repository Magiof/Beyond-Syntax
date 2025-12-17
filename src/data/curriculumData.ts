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
import { javaBasicsPhase } from './java/phase0-basics';
import { javaAdvancedPhase } from './java/phase1-advanced';
import { kotlinBasicsPhase } from './kotlin/phase2-basics';
import { kotlinAdvancedPhase } from './kotlin/phase3-advanced';
import { springBasicsPhase } from './spring/phase4-basics';
import { springAdvancedPhase } from './spring/phase5-advanced';


// NEW: Track별로 Phase 그룹화
export const trackData: Track[] = [
  {
    id: "java",
    title: "Java",
    description: "자바 기초부터 JVM 심화까지",
    icon: "coffee",
    color: "orange",
    phases: [javaBasicsPhase, javaAdvancedPhase]
  },
  {
    id: "kotlin",
    title: "Kotlin",
    description: "코틀린 기초부터 코루틴까지",
    icon: "bolt",
    color: "purple",
    phases: [kotlinBasicsPhase, kotlinAdvancedPhase]
  },
  {
    id: "spring",
    title: "Spring",
    description: "스프링 부트와 백엔드 개발",
    icon: "eco",
    color: "green",
    phases: [springBasicsPhase, springAdvancedPhase]
  }
];

// 기존 curriculumData도 유지 (하위 호환성)
export const curriculumData: Phase[] = [
  javaBasicsPhase,
  javaAdvancedPhase,
  kotlinBasicsPhase,
  kotlinAdvancedPhase,
  springBasicsPhase,
  springAdvancedPhase,
];
