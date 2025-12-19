import type { Phase, Track } from './types';
export type { CodeExample, InterviewQuestion, Module, Phase, Track } from './types';

// Import all phases
import { javaPhase1 } from './java/phase1';
import { javaPhase2 } from './java/phase2';
import { javaPhase3 } from './java/phase3';
import { javaPhase4 } from './java/phase4';
import { kotlinPhase1 } from './kotlin/phase1';
import { kotlinPhase2 } from './kotlin/phase2';
import { kotlinPhase3 } from './kotlin/phase3';
import { kotlinPhase4 } from './kotlin/phase4';
import { springPhase1 } from './spring/phase1';
import { springPhase2 } from './spring/phase2';
import { springPhase3 } from './spring/phase3';
import { springPhase4 } from './spring/phase4';
import { springPhase5 } from './spring/phase5';


// NEW: Track별로 Phase 그룹화
export const trackData: Track[] = [
  {
    id: "java",
    title: "Java",
    icon: "coffee",
    color: "orange",
    description: "기초부터 심화까지, 자바 백엔드 개발자의 길",
    phases: [javaPhase1, javaPhase2, javaPhase3, javaPhase4]
  },
  {
    id: "kotlin",
    title: "Kotlin",
    description: "코틀린 기초부터 아토믹 학습, 그리고 코루틴 비동기까지",
    icon: "bolt",
    color: "purple",
    phases: [kotlinPhase1, kotlinPhase2, kotlinPhase3, kotlinPhase4]
  },
  {
    id: "spring",
    title: "Spring",
    description: "스프링 부트와 백엔드 개발",
    icon: "eco",
    color: "green",
    phases: [springPhase1, springPhase2, springPhase3, springPhase4, springPhase5]
  }
];

// 기존 curriculumData도 유지 (하위 호환성)
export const curriculumData: Phase[] = [
  javaPhase1,
  javaPhase2,
  javaPhase3,
  javaPhase4,
  kotlinPhase1,
  kotlinPhase2,
  kotlinPhase3,
  kotlinPhase4,
  springPhase1,
  springPhase2,
  springPhase3,
  springPhase4,
  springPhase5,
];
