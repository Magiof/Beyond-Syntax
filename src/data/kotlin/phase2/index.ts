import type { Phase } from '../../curriculumData';
import { kotlinBytecodeInternals } from './kotlin-bytecode-internals';
import { advancedGenericsAndDelegation } from './advanced-generics-and-delegation';
import { coroutineInternals } from './coroutine-internals';
import { structuredConcurrency } from './structured-concurrency';
import { kotlinFlow } from './kotlin-flow';
import { kotlinDsl } from './kotlin-dsl';

export const kotlinPhase2: Phase = {
    id: "kotlin-phase2",
    title: "Phase 2: Kotlin 심화 & 코루틴",
    goal: "코틀린의 '마법'을 바이트코드 레벨에서 해부하고, 코루틴의 내부 상태 머신을 이해하며, 실전 패턴을 익힙니다.",
    modules: [
        kotlinBytecodeInternals,
        advancedGenericsAndDelegation,
        coroutineInternals,
        structuredConcurrency,
        kotlinFlow,
        kotlinDsl
    ]
};
