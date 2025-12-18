import type { Phase } from '../../curriculumData';
import { javaQuickStart } from './java-quick-start';
import { javaFundamentals } from './java-fundamentals';
import { arraysAndStrings } from './arrays-and-strings';
import { oopFundamentals } from './oop-fundamentals';
import { inheritanceAndPolymorphism } from './inheritance-and-polymorphism';
import { interfacesAndAbstractClasses } from './interfaces-and-abstract-classes';

export const javaPhase1: Phase = {
    id: "java-phase1",
    title: "Phase 1: 자바 입문과 객체지향의 근간",
    goal: "자바의 기초부터 객체지향의 본질까지 단계별로 학습합니다. 초보자를 위한 '입문' 영역과 시니어를 위한 '심도' 영역이 구분되어 있습니다.",
    modules: [
        javaQuickStart,
        javaFundamentals,
        arraysAndStrings,
        oopFundamentals,
        inheritanceAndPolymorphism,
        interfacesAndAbstractClasses
    ]
};
