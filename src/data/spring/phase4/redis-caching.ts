import type { Module } from '../../types';

export const redisCaching: Module = {
    id: "redis-caching",
    title: "Chapter 3: Redis와 고성능 캐싱 전략",
    topic: "Look-aside, Write-through, Redis Data Structures, Cache Eviction",
    content: `
## 1. 왜 캐시가 필요한가?

DB 조회는 디스크 I/O를 수반하므로 속도가 느리고 부하가 큽니다.
자주 조회되지만 잘 변하지 않는 데이터를 **메모리(RAM)**에 저장하여 응답 속도를 획기적으로 개선합니다.

---

## 2. 주요 캐시 전략

### 2.1 Look-aside (Cache Aside) - 실무에서 가장 흔함
1. 캐시에서 데이터를 찾음.
2. 있으면 반환 (Cache Hit).
3. 없으면 DB에서 조회 후 캐시에 저장하고 반환 (Cache Miss).

### 2.2 Write-through
데이터를 저장할 때 항상 DB와 캐시에 동시에 저장합니다. 데이터 일관성은 좋지만 쓰기 성능이 약간 떨어집니다.

---

## 3. Redis 핵심 데이터 구조

캐시 용도 외에도 다양한 기능을 제공합니다.
- **String**: 단순 키-값.
- **List**: 메시지 큐 등.
- **Set**: 중복 없는 집합 (친구 추천 등).
- **Hash**: 객체 저장 (필드별 접근 가능).
- **Sorted Set**: 순위 데이터 (랭킹 시스템 - 가장 인기).

---

## 4. 스프링과 레디스 연동 (Spring Data Redis)

\`\`\`java
@Service
public class ProductService {
    @Cacheable(value = "products", key = "#id")
    public Product getProduct(Long id) {
        // 이 로직은 캐시에 데이터가 없을 때만 실행됨
        return productRepository.findById(id).orElseThrow();
    }

    @CacheEvict(value = "products", key = "#id")
    public void updateProduct(Long id, ProductDto dto) {
        // 수정 시 캐시 삭제
    }
}
\`\`\`

---

## 5. 실전 트러블슈팅: 캐시 문제

- **Cache Stampede**: 여러 서버가 동시에 캐시 미스를 겪어 DB로 부하가 몰리는 현상. (만료 시간 설정 주의)
- **Lazy Loading vs Write-through**: 어떤 데이터를 캐싱할지에 따라 전략을 다르게 가져가야 합니다.
- **Eviction Policy**: 메모리가 꽉 찼을 때 어떤 데이터를 지울지 결정 (\`LRU\`, \`LFU\` 등).
`,
    codeExamples: [
        {
            title: "Redis를 활용한 분산 락(Distributed Lock) 구현",
            language: "java",
            code: `// Redisson 라이브러리 활용
RLock lock = redissonClient.getLock("order-lock");
try {
    if (lock.tryLock(10, 1, TimeUnit.SECONDS)) {
        // 재고 차감 등 임계 구역 로직 수행
    }
} finally {
    lock.unlock();
}`
        }
    ],
    keyPoints: [
        "Redis는 단일 스레드로 동작하므로 무거운 명령어(\`keys *\`)를 사용하면 서비스가 멈출 수 있습니다.",
        "캐시 만료 시간(TTL)은 데이터 성격에 따라 신중히 짧게 설정하는 것이 좋습니다.",
        "로그인 세션이나 랭킹 시스템 구축에는 Redis가 정답에 가깝습니다."
    ],
    interviewQuestions: [
        {
            difficulty: 'Hard',
            question: "Redis와 로컬 캐시(Ehcache, Caffeine)의 차이점은 무엇인가요?",
            answer: "로컬 캐시는 속도가 매우 빠르나 서버 간 데이터 공유가 어렵고 정합성 문제가 생기기 쉽습니다. Redis는 네트워크 오버헤드가 발생하지만 모든 서버가 동일한 데이터를 공유할 수 있어 분산 환경에 적합합니다."
        },
        {
            difficulty: 'Hell',
            question: "Redis가 단일 스레드인데도 불구하고 아주 빠른 이유는?",
            answer: "1. 디스크가 아닌 메모리에서 연산하며, 2. 컨텍스트 스위칭 오버헤드가 없고, 3. 비차단 I/O Multiplexing(epoll/kqueue)을 사용하여 수많은 네트워크 요청을 효율적으로 처리하기 때문입니다."
        }
    ]
};
