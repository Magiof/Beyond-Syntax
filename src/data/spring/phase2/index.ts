import type { Phase } from '../../curriculumData';
import { springbootAutoconfiguration } from './springboot-autoconfiguration';
import { aopAndTransactional } from './aop-and-transactional';
import { jpaInternalsAndTuning } from './jpa-internals-and-tuning';
import { springSecurityArchitecture } from './spring-security-architecture';
import { highTrafficAndPerformance } from './high-traffic-and-performance';
import { springWebflux } from './spring-webflux';

export const springPhase2: Phase = {
    id: "spring-phase2",
    title: "Phase 2: 서비스 추상화와 전략적 설계 (PSA와 예외 전략)",
    goal: "테스트 가능한 설계를 바탕으로 서비스 추상화(PSA)의 강력함을 체험하고, 일관된 예외 처리 및 JPA 내부 동작 원리를 심층 학습합니다.",
    modules: [
        springbootAutoconfiguration,
        aopAndTransactional,
        jpaInternalsAndTuning,
        springSecurityArchitecture,
        highTrafficAndPerformance,
        springWebflux
    ]
};
