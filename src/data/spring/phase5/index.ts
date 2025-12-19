import type { Phase } from '../../types';
import { dockerKubernetes } from './docker-kubernetes';
import { monitoringObservability } from './monitoring-observability';

export const springPhase5: Phase = {
    id: "spring-phase5",
    title: "Phase 5: 인프라와 관측성 (DevOps)",
    goal: "애플리케이션 개발을 넘어, 실제 운영 환경을 구축하고 안정적인 서비스를 유지하기 위한 기술적 토대를 완성합니다. Docker/K8s 배포부터 모니터링 시스템 구축까지 다룹니다.",
    modules: [
        dockerKubernetes,
        monitoringObservability
    ]
};
