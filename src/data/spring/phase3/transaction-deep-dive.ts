import type { Module } from '../../types';

export const transactionDeepDive: Module = {
    id: "transaction-deep-dive",
    title: "Chapter 2: Spring Transaction Deep Dive",
    topic: "Declarative Transaction, AOP Proxy, Propagation, Isolation Level, Self-invocation",
    content: `
## 1. @Transactional의 동작 원리 (AOP)

스프링의 트랜잭션은 **AOP(Aspect Oriented Programming)**를 통해 구현됩니다.
- 빈 초기화 시점에 \`TransactionInterceptor\`가 포함된 **프록시 객체**를 생성합니다.
- 프록시는 실제 호출 전에 \`TransactionManager\`를 통해 트랜잭션을 시작하고, 성공 시 커밋, 실패 시 롤백을 수행합니다.

---

## 2. 주의사항: 자기 호출 (Self-invocation) 문제

트랜잭션이 적용되지 않는 가장 흔한 경우입니다.
\`\`\`java
@Service
public class OrderService {
    public void register() {
        process(); // 트랜잭션이 적용되지 않음!
    }

    @Transactional
    public void process() { ... }
}
\`\`\`
- **원인**: 프록시 내부에서 자신의 메서드를 직접 호출하면 프록시를 거치지 않기 때문입니다.
- **해결**: 별도의 서비스로 분리하거나, \`ObjectProvider\`를 통한 셀프 주입(비권장)을 사용합니다.

---

## 3. 트랜잭션 전파 (Propagation)

기존 트랜잭션이 있을 때 새로운 트랜잭션을 어떻게 처리할지 결정합니다.

- **REQUIRED**: (기본값) 기존 것이 있으면 합류, 없으면 생성.
- **REQUIRES_NEW**: 기존 것이 있든 없든 무조건 새 트랜잭션 생성 (독립적 동작).
- **MANDATORY**: 기존 것이 없으면 예외 발생.
- **SUPPORT**: 있으면 사용, 없으면 트랜잭션 없이 진행.

> **Tip**: \`REQUIRES_NEW\`를 사용할 때는 데이터베이스 커넥션을 2개 점유하게 되므로 커넥션 풀 고갈에 주의해야 합니다.

---

## 4. 격리 수준 (Isolation Level)

동시에 여러 트랜잭션이 진행될 때 데이터 일관성을 어떻게 유지할지 결정합니다. (\`READ_COMMITTED\`가 DB 기본값인 경우가 많음)

- **DEFAULT**: DB 설정을 따름.
- **READ_UNCOMMITTED**: Dirty Read 발생 가능 (추천 안 함).
- **READ_COMMITTED**: 커밋된 데이터만 읽음. Non-repeatable Read 발생 가능.
- **REPEATABLE_READ**: 트랜잭션 내 동일 결과 보장. Phantom Read 발생 가능 (MySQL InnoDB는 여기서 웬만하면 방지).
- **SERIALIZABLE**: 가장 안전하지만 성능이 매우 떨어짐.

---

## 5. 결함 상황과 롤백 규칙

- **RuntimeException / Error**: 기본적으로 롤백됨.
- **Checked Exception**: 기본적으로 롤백되지 않음! (**중요**)
  - 비즈니스 예외(이미 결제된 주문 등)는 개발자가 직접 처리하도록 유도하기 위함입니다.
  - 롤백하려면 \`rollbackFor = Exception.class\` 설정을 추가해야 합니다.
`,
    codeExamples: [
        {
            title: "트랜잭션 전파 예시 (REQUIRES_NEW)",
            language: "java",
            code: `@Transactional
public void parent() {
    orderRepository.save(order);
    try {
        logService.saveLog(log); // REQUIRES_NEW
    } catch (Exception e) {
        // 로그 저장이 실패해도 주문은 커밋되어야 함
    }
}`
        }
    ],
    keyPoints: [
        "AOP 프록시 방식이므로 내부 호출(Self-invocation) 시 트랜잭션이 적용되지 않습니다.",
        "체크 예외는 기본적으로 롤백되지 않으므로 서비스 설계에 주의가 필요합니다.",
        "전파 레벨에 따라 커넥션 고갈이 발생할 수 있으므로 신중히 선택하세요."
    ],
    interviewQuestions: [
        {
            difficulty: 'Hard',
            question: "프라이빗(private) 메서드에 @Transactional을 붙이면 왜 동작하지 않나요?",
            answer: "AOP 프록시는 부모 클래스를 상속받거나 인터페이스를 구현하여 오버라이딩하는 방식인데, private 메서드는 오버라이딩이 불가능하므로 프록시가 가로챌 수 없기 때문입니다."
        },
        {
            difficulty: 'Hell',
            question: "@Transactional(readOnly = true)의 성능상 이점은 무엇인가요?",
            answer: "1. 하이버네이트는 스냅샷을 찍지 않아 메모리를 절약하고 변경 감지(Dirty Checking)를 수행하지 않습니다. 2. DB가 Master-Slave 구조일 경우 Slave로 읽기 요청을 분산할 수 있습니다."
        }
    ]
};
