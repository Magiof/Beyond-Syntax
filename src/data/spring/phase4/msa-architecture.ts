import type { Module } from '../../types';

export const msaArchitecture: Module = {
    id: "msa-architecture",
    title: "Chapter 1: MSA - 분산 시스템의 거래(Transaction)",
    topic: "2PC Limits, Saga Pattern, Outbox Pattern, Distributed Tracing",
    content: `
## 1. 분산 트랜잭션의 딜레마

> **CAP 정리**: 분산 시스템에서 일관성(Consistency), 가용성(Availability), 분할 내성(Partition Tolerance) 세 가지를 모두 만족하는 것은 불가능합니다.

MSA에서는 각 서비스가 독립된 DB를 가집니다. "주문"과 "결제"가 서로 다른 DB에 있는데, 어떻게 **원자성(Atomicity)** 을 보장할까요?
과거의 **2PC (Two-Phase Commit)**는 너무 느려서 현대 MSA에서는 거의 쓰지 않습니다. 대신 **Saga Pattern**을 사용합니다.

---

## 2. Saga Pattern: 보상 트랜잭션

실패하면 "되돌리는 작업(Compensating Transaction)"을 실행합니다.

\`\`\`mermaid
sequenceDiagram
    participant User
    participant OrderService
    participant PayService
    
    User->>OrderService: "1. 주문 생성 요청"
    OrderService->>OrderService: "[Local Tx] 주문 대기 상태 저장"
    OrderService->>PayService: "2. 결제 요청 (Event)"
    
    rect rgb(255, 200, 200)
    Note over PayService: "결제 실패! (잔액 부족)"
    PayService-->>OrderService: "3. 결제 실패 이벤트 발행"
    end
    
    OrderService->>OrderService: "[Local Tx] 주문 취소 처리 (보상 트랜잭션)"
    OrderService-->>User: "4. 주문 실패 알림"
\`\`\`

- **Orchestration**: 중앙의 지휘자(Orchestrator)가 프로세스를 제어합니다.
- **Choreography**: 각 서비스가 이벤트를 구독하고 반응하는 방식입니다. (결합도가 낮음)

---

## 3. Transactional Outbox Pattern

"DB 저장"과 "이벤트 발행(Kafka)"은 원자적으로 실행될 수 있을까요?
DB는 커밋했는데 Kafka가 죽어서 메시지를 못 보내면 데이터 불일치가 발생합니다.

**해결책**:
1.  이벤트를 바로 메시지 큐에 보내지 않고, **같은 DB 트랜잭션 안에서 'Outbox' 테이블에 저장**합니다. (성공 보장)
2.  별도의 폴러(Poller)나 CDC(Debezium)가 Outbox 테이블을 읽어서 Kafka로 전송합니다.

---

## 4. 장애 전파 차단: Circuit Breaker

한 서비스의 장애가 전체 시스템 마비로 번지는 것을 막기 위해 두꺼비집(Circuit Breaker)을 내립니다.

- **Open**: 에러율이 임계치를 넘으면 회로를 열어 즉시 에러를 반환합니다. (빠른 실패)
- **Half-Open**: 일정 시간이 지나면 살짝 요청을 보내보고, 성공하면 다시 닫습니다(Closed).
`,
    codeExamples: [
        {
            title: "Outbox Pattern 구현 개념 (JPA)",
            language: "java",
            code: `// 같은 트랜잭션 안에서 비즈니스 로직과 메시지 저장을 수행
@Transactional
public void placeOrder(Order order) {
    // 1. 주문 저장
    orderRepository.save(order);
    
    // 2. 이벤트 저장 (Kafka로 바로 보내지 않음!)
    OutboxEvent event = new OutboxEvent("ORDER_CREATED", order.getId());
    outboxRepository.save(event);
}`
        }
    ],
    keyPoints: [
        "MSA에서 강한 일관성(Strong Consistency)은 포기하고, 결과적 일관성(Eventual Consistency)을 추구해야 합니다.",
        "Saga Pattern은 실패 시 반드시 보상 트랜잭션을 실행하여 데이터를 원복시켜야 합니다.",
        "Outbox Pattern은 'DB 커밋'과 '메시지 발송'을 원자적으로 묶는 유일한 방법입니다."
    ],
    interviewQuestions: [
        {
            difficulty: 'Hell',
            question: "분산 추적(Distributed Tracing)이 뭔가요?",
            answer: "MSA에서는 하나의 요청이 수십 개의 서비스를 거쳐갈 수 있습니다. 이때 'Trace ID'라는 고유 식별자를 발급하여 헤더에 싣고 다니면서, 전체 호출 경로(Zipkin, Jaeger 등)를 시각화하고 병목 지점을 찾는 기술입니다."
        }
    ]
};
