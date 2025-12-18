import type { Phase } from '../../curriculumData';
import { kotlinDsl } from './kotlin-dsl';
import { kotlinBytecodeInternals } from './kotlin-bytecode-internals';
import { advancedMetaprogramming } from './advanced-metaprogramming';

export const kotlinPhase4: Phase = {
    id: "kotlin-phase4",
    title: "Phase 4: 고급 메타 프로그래밍과 JVM 심화 최적화",
    goal: "DSL 구축, 리플렉션, Context Receivers 등 고급 메타 프로그래밍과 JVM 바이트코드 수준의 성능 최적화를 다룹니다.",
    modules: [
        kotlinDsl,
        kotlinBytecodeInternals,
        advancedMetaprogramming
    ]
};
