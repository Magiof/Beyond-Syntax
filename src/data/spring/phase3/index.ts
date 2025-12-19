import type { Phase } from '../../types';
import { springBeanLifecycle } from './spring-bean-lifecycle';
import { transactionDeepDive } from './transaction-deep-dive';
import { springSecurityInternal } from './spring-security-internal';

export const springPhase3: Phase = {
    id: "spring-phase3",
    title: "Phase 3: Spring Internals (시니어 도약)",
    goal: "스프링 프레임워크의 내부 동작 원리를 깊이 있게 이해하고, 트랜잭션과 보안 같은 복잡한 기술적 문제를 디버깅하고 해결하는 능력을 기릅니다.",
    modules: [
        springBeanLifecycle,
        transactionDeepDive,
        springSecurityInternal
    ]
};
