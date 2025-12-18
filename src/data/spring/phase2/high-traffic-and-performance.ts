import type { Module } from '../../curriculumData';

export const highTrafficAndPerformance: Module = {
    id: "high-traffic-and-performance",
    title: "Chapter 5: 대용량 트래픽 처리 & 성능 튜닝",
    topic: "Thread Pool, Connection Pool, Caching, Bulkhead",
    content: `
## 1. 커넥션 풀 튜닝
HikariCP 설정을 최적화하여 DB 병목을 해결합니다.

## 2. 캐싱 전략
로컬 캐시(Ehcache)와 글로벌 캐시(Redis)를 적재적소에 배치합니다.

## 3. 서킷 브레이커
외부 API 장애 시 시스템 전체로 전파되는 것을 막는 격리 기법입니다.
`,
    codeExamples: [
        {
            title: "Redis 캐싱",
            language: "java",
            code: `@Cacheable(value = "users", key = "#id")\npublic User get(Long id) { ... }`
        }
    ],
    keyPoints: [
        "대용량 트래픽의 핵심은 DB 부하 분산입니다.",
        "모니터링을 통한 지속적인 튜닝이 필요합니다."
    ],
    interviewQuestions: [
        {
            difficulty: 'Hard',
            question: "Look-aside 캐싱 전략이란?",
            answer: "캐시에 데이터가 있으면 반환하고, 없으면 DB에서 조회 후 캐시에 채워넣는 방식입니다."
        }
    ]
};
