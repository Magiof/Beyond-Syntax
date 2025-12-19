import type { Module } from '../../types';

export const messageQueueKafka: Module = {
    id: "message-queue-kafka",
    title: "Chapter 2: 분산 메시지 큐 (Kafka)",
    topic: "Producer/Consumer, Topic/Partition, Consumer Group, Exactly-once Delivery",
    content: `
## 1. Kafka란 무엇인가?

카프카(Apache Kafka)는 고성능 **분산 이벤트 스트리밍 플랫폼**입니다. 단순한 메시지 큐를 넘어, 대용량 데이터를 저장하고 처리하는 능력이 뛰어납니다.

### 핵심 개념
- **Topic**: 메시지가 저장되는 카테고리.
- **Partition**: 토픽을 여러 서버로 분산 저장하는 단위 (순서 보장의 기준).
- **Producer**: 메시지를 발행하여 토픽에 저장함.
- **Consumer**: 토픽으로부터 메시지를 읽어옴.
- **Broker**: 카프카 서버 인스턴스.

---

## 2. 카프카의 고성능 비결

1. **순차 I/O (Sequential I/O)**: 디스크에 메시지를 차례대로 기록하여 속도가 매우 빠름.
2. **Zero Copy**: OS 커널 레벨에서 데이터를 바로 네트워크로 전송하여 CPU 부하를 최소화.
3. **분산 확장**: 파티션을 늘려 처리량(Throughput)을 선형적으로 증가시킴.

---

## 3. 컨슈머 그룹 (Consumer Group)

동일한 토픽을 여러 컨슈머가 나눠서 읽을 때 사용합니다.
- **Rebalancing**: 컨슈머가 추가되거나 사라지면 파티션 할당을 다시 조정함.
- **Offset**: 어디까지 읽었는지 기록하는 포인터.

---

## 4. 스프링과 카프카 연동 (Spring for Kafka)

\`\`\`java
// Producer
@Service
public class KafkaProducer {
    @Autowired
    private KafkaTemplate<String, String> kafkaTemplate;

    public void sendMessage(String message) {
        kafkaTemplate.send("my-topic", message);
    }
}

// Consumer
@Service
public class KafkaConsumer {
    @KafkaListener(topics = "my-topic", groupId = "group-1")
    public void consume(String message) {
        System.out.println("Received: " + message);
    }
}
\`\`\`

---

## 5. 실전 고려사항: 메시지 유실과 중복

- **acks=all**: 모든 복제본에 저장이 완료될 때까지 대기 (유실 최소화).
- **Idempotent Producer**: 네트워크 재시도로 인한 중복 발행 방지.
- **Exactly-once (정확히 한 번)**: 트랜잭션 기능을 통해 메시지 생산과 소비를 원자적으로 처리.
`,
    codeExamples: [
        {
            title: "Kafka 트랜잭션 설정 (Exactly-once)",
            language: "java",
            code: `@Transactional
public void processOrder(Order order) {
    // 1. DB 저장
    orderRepository.save(order);
    // 2. 카프카 메시지 발행
    kafkaTemplate.send("order-events", order.getId());
} // DB와 Kafka 발행이 모두 성공해야 커밋됨`
        }
    ],
    keyPoints: [
        "카프카는 파티션 단위로 메시지 순서를 보장합니다 (토픽 전체 순서는 아님).",
        "컨슈머의 개수는 최대 파티션 개수를 넘어도 소용이 없습니다 (노는 컨슈머 발생).",
        "비즈니스 로직에 따라 유실(at-most-once)과 중복(at-least-once) 정책을 선택해야 합니다."
    ],
    interviewQuestions: [
        {
            difficulty: 'Hard',
            question: "Kafka에서 파티션을 무작정 늘리면 안 되는 이유는?",
            answer: "파티션이 늘어나면 파일 핸들의 증가, 리밸런싱 시간 증가, 장애 복구 시 소요 시간 증가 등의 오버헤드가 발생합니다. 적절한 벤치마킹이 필수입니다."
        },
        {
            difficulty: 'Hell',
            question: "Consumer Rebalancing 시 발생하는 'Stop the World'를 어떻게 줄이나요?",
            answer: "가급적 정적 그룹 멤버십(Static Group Membership)을 활용하거나, 점진적 리밸런싱(Cooperative Sticky Assignor) 옵션을 사용하여 전체 가동 중단을 피할 수 있습니다."
        }
    ]
};
