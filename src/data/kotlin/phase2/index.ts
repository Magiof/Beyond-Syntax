import type { Phase } from '../../types';
import { nullSafety } from './null-safety';
import { classesAndObjects } from './classes-and-objects';
import { inheritanceAndInterfaces } from './inheritance-and-interfaces';
import { scopeFunctions } from './scope-functions';
import { delegationAndGenerics } from './delegation-and-generics';

export const kotlinPhase2: Phase = {
    id: "kotlin-phase2",
    title: "Phase 2: 객체지향과 타입 시스템의 정수 (Idiomatic Kotlin)",
    goal: "코틀린의 타입 시스템과 객체지향 특징을 심화 학습하며, 코틀린답게(Idiomatic) 코드를 작성하는 법을 익힙니다.",
    modules: [
        nullSafety,
        classesAndObjects,
        inheritanceAndInterfaces,
        scopeFunctions,
        delegationAndGenerics
    ]
};
