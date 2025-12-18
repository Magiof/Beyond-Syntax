import type { Phase } from '../../curriculumData';
import { msaArchitecture } from './msa-architecture';
import { messageQueueKafka } from './message-queue-kafka';
import { redisCaching } from './redis-caching';

export const springPhase4: Phase = {
    id: "spring-phase4",
    title: "Phase 4: 분산 시스템과 확장성 (MSA)",
    goal: "대규모 트래픽을 처리하기 위한 분산 시스템 설계 역량을 갖춥니다. MSA 구조 이해부터 Kafka, Redis와 같은 메시징/캐시 인프라 활용 능력을 극대화합니다.",
    modules: [
        msaArchitecture,
        messageQueueKafka,
        redisCaching
    ]
};
