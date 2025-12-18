import type { Phase } from '../../curriculumData';
import { springIntroduction } from './spring-introduction';
import { iocAndDi } from './ioc-and-di';
import { springbootStart } from './springboot-start';
import { springMvcBasics } from './spring-mvc-basics';
import { restApiDevelopment } from './rest-api-development';
import { springDataJpa } from './spring-data-jpa';
import { exceptionHandlingAndValidation } from './exception-handling-and-validation';

export const springPhase1: Phase = {
    id: "spring-phase1",
    title: "Phase 1: Spring 기초",
    goal: "Spring 프레임워크의 핵심 개념과 Spring Boot를 학습합니다. IoC/DI, MVC, REST API, JPA를 다룹니다.",
    modules: [
        springIntroduction,
        iocAndDi,
        springbootStart,
        springMvcBasics,
        restApiDevelopment,
        springDataJpa,
        exceptionHandlingAndValidation
    ]
};
