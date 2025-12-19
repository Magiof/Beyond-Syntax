import type { Phase } from '../../types';
import { atomicFundamentals } from './atomic-fundamentals';
import { variablesAndTypes } from './variables-and-types';
import { controlFlow } from './control-flow';
import { functions } from './functions';
import { collections } from './collections';
import { lambdasAndHigherOrderFunctions } from './lambdas-and-higher-order-functions';

export const kotlinPhase1: Phase = {
    id: "kotlin-phase1",
    title: "Phase 1: 아토믹 코틀린 - 기초와 함수형 사고의 시작",
    goal: "아토믹 학습법을 통해 코틀린의 기초를 다지고, 함수형 프로그래밍의 핵심인 람다와 콜렉션을 깊게 이해합니다.",
    modules: [
        atomicFundamentals,
        variablesAndTypes,
        controlFlow,
        functions,
        lambdasAndHigherOrderFunctions,
        collections
    ]
};
