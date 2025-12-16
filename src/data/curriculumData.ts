export interface CodeExample {
  title: string;
  language: string;
  code: string;
}

export interface Module {
  id: string;
  title: string;
  topic: string;
  content?: string;
  codeExamples?: CodeExample[];
  keyPoints?: string[];
}

export interface Phase {
  id: string;
  title: string;
  goal: string;
  modules: Module[];
}

// Import all phases
import { javaBasicsPhase } from './java/phase0-basics';
import { kotlinBasicsPhase } from './kotlin/phase2-basics';
import { springBasicsPhase } from './spring/phase4-basics';

// Temporarily keeping existing advanced phases inline until they are migrated
const javaAdvancedPhase: Phase = {
  id: "phase1",
  title: "Phase 1: Java 심화 (Deep Dive)",
  goal: "JVM의 내부 동작 원리와 메모리 모델을 바이트코드 레벨까지 파헤칩니다.",
  modules: [
    {
      id: "p1-m1",
      title: "JVM Architecture & Memory Model",
      topic: "Class Loader Subsystem, Runtime Data Areas, TLAB & Allocation",
      content: `## JVM 아키텍처 심화 (추후 상세 내용 추가 예정)

이 챕터에서는 JVM의 내부 동작을 깊이 있게 학습합니다.`,
      keyPoints: [
        "Class Loading은 Loading -> Linking -> Initialization 순으로 진행",
        "JVM 메모리는 Method Area, Heap, Stack, PC Register, Native Method Stack으로 구성",
        "TLAB으로 멀티스레드 환경의 객체 할당 성능 최적화"
      ]
    },
    {
      id: "p1-m2",
      title: "Concurrency Deep Dive",
      topic: "Java Monitor Internals, AQS, CAS & Atomic, False Sharing",
      content: `## 동시성 프로그래밍 심화 (추후 상세 내용 추가 예정)

synchronized, ReentrantLock, Atomic 클래스의 내부 동작을 분석합니다.`,
      keyPoints: [
        "synchronized는 Biased -> Lightweight -> Heavyweight 순으로 Lock Escalation",
        "AQS는 CLH Queue 기반의 동기화 프레임워크",
        "False Sharing은 @Contended로 해결"
      ]
    }
  ]
};

// kotlinBasicsPhase is now imported from ./kotlin/phase2-basics.ts

const kotlinAdvancedPhase: Phase = {
  id: "phase3",
  title: "Phase 3: Kotlin 심화 & 코루틴",
  goal: "코틀린의 '마법'을 바이트코드 레벨에서 해부하고, 코루틴의 내부 상태 머신을 이해합니다.",
  modules: [
    {
      id: "p3-m1",
      title: "Inline Functions & Bytecode",
      topic: "Inline Functions, Lambda Overhead, Null Safety Bytecode",
      content: `## Kotlin 바이트코드 분석 (추후 상세 내용 추가 예정)

inline 함수와 람다의 내부 동작을 분석합니다.`,
      keyPoints: [
        "inline 함수는 호출 지점에 코드를 복사하여 성능 최적화",
        "reified 키워드로 런타임에 제네릭 타입 참조 가능",
        "Null Safety는 컴파일러가 삽입하는 체크 코드로 구현"
      ]
    }
  ]
};

// springBasicsPhase is now imported from ./spring/phase4-basics.ts

const springAdvancedPhase: Phase = {
  id: "phase5",
  title: "Phase 5: Spring Boot 심화",
  goal: "AutoConfiguration의 마법을 걷어내고 프록시의 동작을 제어합니다.",
  modules: [
    {
      id: "p5-m1",
      title: "Spring Boot AutoConfiguration",
      topic: "@AutoConfiguration, Conditional, SpringFactoriesLoader",
      content: `## AutoConfiguration 원리 (추후 상세 내용 추가 예정)

Spring Boot의 자동 설정 메커니즘을 분석합니다.`,
      keyPoints: [
        "@EnableAutoConfiguration은 spring.factories에서 설정 클래스 로드",
        "@ConditionalOnXxx로 런타임에 빈 등록 여부 결정",
        "사용자 빈이 있으면 @ConditionalOnMissingBean에 의해 자동 설정은 무시"
      ]
    }
  ]
};

// Export all curriculum data
export const curriculumData: Phase[] = [
  javaBasicsPhase,
  javaAdvancedPhase,
  kotlinBasicsPhase,
  kotlinAdvancedPhase,
  springBasicsPhase,
  springAdvancedPhase,
];
