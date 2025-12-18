import type { Phase } from '../../curriculumData';
import { springbootAutoconfiguration } from './springboot-autoconfiguration';
import { aopAndTransactional } from './aop-and-transactional';
import { jpaInternalsAndTuning } from './jpa-internals-and-tuning';
import { springSecurityArchitecture } from './spring-security-architecture';
import { highTrafficAndPerformance } from './high-traffic-and-performance';
import { springWebflux } from './spring-webflux';

export const springPhase2: Phase = {
    id: "spring-phase2",
    title: "Phase 2: Spring Boot 심화 & 성능 튜닝",
    goal: "애플리케이션의 시동 원리부터 대용량 트래픽 처리를 위한 아키텍처와 성능 튜닝 기법을 마스터합니다.",
    modules: [
        springbootAutoconfiguration,
        aopAndTransactional,
        jpaInternalsAndTuning,
        springSecurityArchitecture,
        highTrafficAndPerformance,
        springWebflux
    ]
};
