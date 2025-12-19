import type { Phase } from '../../types';
import { atomicFundamentals } from './atomic-fundamentals';
import { variablesAndTypes } from './variables-and-types';
import { nullSafety } from './null-safety';
import { controlFlow } from './control-flow';
import { functions } from './functions';
import { classesAndObjects } from './classes-and-objects';

export const kotlinPhase1: Phase = {
    id: "kotlin-phase1",
    title: "Phase 1: 아토믹 코틀린 - 기초와 철학",
    goal: "아토믹 학습법을 통해 코틀린의 기초를 다지고, 타입 시스템과 객체지향의 근간을 완벽히 이해합니다.",
    modules: [
        atomicFundamentals,
        variablesAndTypes,
        nullSafety,
        controlFlow,
        functions,
        classesAndObjects
    ]
};
