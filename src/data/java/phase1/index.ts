import type { Phase } from '../../curriculumData';
import { javaIntroduction } from './java-introduction';
import { variablesAndDatatypes } from './variables-and-datatypes';
import { operators } from './operators';
import { controlFlow } from './control-flow';
import { loops } from './loops';
import { arrays } from './arrays';
import { strings } from './strings';
import { methods } from './methods';
import { classAndObject } from './class-and-object';
import { encapsulation } from './encapsulation';
import { inheritance } from './inheritance';
import { polymorphism } from './polymorphism';
import { abstractAndInterface } from './abstract-and-interface';
import { exceptionHandling } from './exception-handling';
import { collections } from './collections';
import { generics } from './generics';
import { lambdaExpressions } from './lambda-expressions';
import { streamApi } from './stream-api';

export const javaPhase1: Phase = {
    id: "java-phase1",
    title: "Phase 1: Java 완전 기초",
    goal: "Java 문법을 처음부터 체계적으로 학습합니다. 변수, 조건문, 반복문, 클래스, 객체지향까지 공식 문서 수준으로 상세하게 다룹니다.",
    modules: [
        javaIntroduction,
        variablesAndDatatypes,
        operators,
        controlFlow,
        loops,
        arrays,
        strings,
        methods,
        classAndObject,
        encapsulation,
        inheritance,
        polymorphism,
        abstractAndInterface,
        exceptionHandling,
        collections,
        generics,
        lambdaExpressions,
        streamApi
    ]
};
