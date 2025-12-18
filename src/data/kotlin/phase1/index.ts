import type { Phase } from '../../curriculumData';
import { kotlinIntroduction } from './kotlin-introduction';
import { variablesAndTypes } from './variables-and-types';
import { nullSafety } from './null-safety';
import { controlFlow } from './control-flow';
import { functions } from './functions';
import { classesAndObjects } from './classes-and-objects';
import { inheritanceAndInterfaces } from './inheritance-and-interfaces';
import { collections } from './collections';
import { lambdasAndHigherOrderFunctions } from './lambdas-and-higher-order-functions';
import { scopeFunctions } from './scope-functions';

export const kotlinPhase1: Phase = {
    id: "kotlin-phase1",
    title: "Phase 1: Kotlin 기초",
    goal: "Kotlin의 기본 문법과 특징을 학습합니다. Java와의 차이점, Null Safety, 함수형 프로그래밍 기초를 다룹니다.",
    modules: [
        kotlinIntroduction,
        variablesAndTypes,
        nullSafety,
        controlFlow,
        functions,
        classesAndObjects,
        inheritanceAndInterfaces,
        collections,
        lambdasAndHigherOrderFunctions,
        scopeFunctions
    ]
};
