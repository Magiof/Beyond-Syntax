import type { Phase } from '../../curriculumData';
import { jvmInternals } from './jvm-internals';
import { gcTuningAndOptimization } from './gc-tuning-and-optimization';
import { reflectionAndProxies } from './reflection-and-proxies';
import { advancedPatternsAndArchitecture } from './advanced-patterns-and-architecture';

export const javaPhase4: Phase = {
    id: "java-phase4",
    title: "Phase 4: JVM 내부 구조와 마이크로 성능 최적화",
    goal: "JVM 아키텍처, GC 튜닝, 리플렉션 등 자바의 가장 깊은 내부 동작 원리와 고수준의 소프트웨어 설계 패턴을 학습합니다.",
    modules: [
        jvmInternals,
        gcTuningAndOptimization,
        reflectionAndProxies,
        advancedPatternsAndArchitecture
    ]
};
