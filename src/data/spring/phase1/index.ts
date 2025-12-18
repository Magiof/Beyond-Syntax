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
    title: "Phase 1: 오브젝트와 의존관계 (IoC/DI의 본질)",
    goal: "전형적인 DAO 리팩토링 과정을 통해 관심사를 분리하고, 제어의 역전(IoC)과 의존관계 주입(DI)이 왜 필요한지 본질적으로 이해합니다.",
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
