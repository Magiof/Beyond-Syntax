import type { Phase } from '../../curriculumData';
import { lambdasAndOptionals } from './lambdas-and-optionals';
import { streamApi } from './stream-api';
import { concurrencyMastery } from './concurrency-mastery';
import { modernJavaFeatures } from './modern-java-features';

export const javaPhase3: Phase = {
    id: "java-phase3",
    title: "Phase 3: 현대적 자바 - 함수형 프로그래밍과 비동기",
    goal: "자바 8의 람다와 스트림부터, 최신 버전의 레코드, 가상 스레드까지 현대적 자바의 핵심 패러다임을 마스터합니다.",
    modules: [
        lambdasAndOptionals,
        streamApi,
        concurrencyMastery,
        modernJavaFeatures
    ]
};
