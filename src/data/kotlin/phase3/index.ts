import type { Phase } from '../../types';
import { coroutineInternals } from './coroutine-internals';
import { structuredConcurrency } from './structured-concurrency';
import { kotlinFlow } from './kotlin-flow';

export const kotlinPhase3: Phase = {
    id: "kotlin-phase3",
    title: "Phase 3: 실전 코루틴과 리액티브 스트림 (비동기 제어)",
    goal: "비동기 프로그래밍의 핵심인 코루틴의 내부 동작 원리와 실전 활용 패턴, 그리고 Flow를 이용한 리액티브 스트림을 학습합니다.",
    modules: [
        coroutineInternals,
        structuredConcurrency,
        kotlinFlow
    ]
};
