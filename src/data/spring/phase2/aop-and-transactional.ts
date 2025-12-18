import type { Module } from '../../curriculumData';

export const aopAndTransactional: Module = {
    id: "aop-and-transactional",
    title: "Chapter 2: AOP와 트랜잭션 - 프록시의 보이지 않는 손",
    topic: "JDK vs CGLIB, Self-invocation Trap, Proxy Interceptor Chain, Propagation",
    content: `
## 1. 프록시(Proxy)가 만드는 마법의 터널

우리가 주입받는 \`@Service\` 객체는 실제 클래스가 아닌, 스프링이 만든 **대리(Proxy)** 객체입니다.

\`\`\`mermaid
flowchart LR
    Client["Caller"] -->|1. method()| Proxy["**Spring Proxy**<br>Advisor / Interceptor"]
    Proxy -->|2. Transaction Start| DB[(Database)]
    Proxy -->|3. Call| Target["**Real Bean**<br>Business Logic"]
    Target -->|4. Return| Proxy
    Proxy -->|5. Commit / Rollback| DB
    Proxy -->|6. Result| Client
\`\`\`

---

## 2. JDK Dynamic Proxy vs CGLIB (Decision Tree)

스프링 부트는 기본적으로 **CGLIB**를 사용하지만, 그 차이를 아는 것이 중요합니다.

- **JDK Proxy**: 타겟의 **인터페이스**를 구현하여 프록시 생성. 타겟 클래스 형변환 불가(\`ClassCastException\`).
- **CGLIB**: 타겟 클래스를 **상속(Subclassing)**하여 바이트코드 조작. 인터페이스 없이도 작동. \`final\` 클래스/메서드에는 사용 불가.

---

## 3. 치명적인 함정: Self-invocation (내부 호출)

\`@Transactional\`이 붙은 메서드를 같은 클래스 내의 다른 메서드가 부르면, 트랜잭션이 무시됩니다.

\`\`\`java
public class MyService {
    public void outer() {
        inner(); // 여기서 프록시를 거치지 않고 직접(this) 호출!
    }

    @Transactional
    public void inner() { ... }
}
\`\`\`

- **원인**: Caller가 프록시를 통해 호출해야 Interceptor가 동작하는데, 내부 호출은 프록시를 건너뛰고 **진짜 객체(this)**를 직접 부르기 때문입니다.
- **해결**: 트랜잭션이 필요한 메서드는 별도의 서비스로 분리하는 것이 가장 객체지향적인(SRP) 해결법입니다.

---

## 4. 트랜잭션 전파 (Propagation)와 원자성

- **REQUIRED**: 부모 트랜잭션이 있으면 합류, 없으면 생성. (가장 많이 쓰임)
- **REQUIRES_NEW**: 부모를 멈추고 **완전히 새로운** 트랜잭션 시작. 로그 기록 등 부모 성공 여부와 상관없이 저장해야 할 때 사용합니다.
`,
    codeExamples: [
        {
            title: "Self-invocation 해결: 구조적 분리",
            language: "java",
            code: `// [Bad] 한 클래스에 다 있음
@Service
public class OrderService {
    public void order() { save(); }
    @Transactional public void save() { ... }
}

// [Good] 관심사 분리
@Service
public class OrderProcessor {
    private final OrderRepository repo;
    
    @Transactional
    public void processOrder() {
        repo.save(); // 외부 호출이므로 프록시가 정상 작동!
    }
}`
        }
    ],
    keyPoints: [
        "스프링 AOP는 프록시 기반으로 동작하며, 이는 런타임에 빈을 바꿔치기하는 기술입니다.",
        "내부 호출 문제는 프록시 아키텍처의 근본적인 한계이므로 설계로 극복해야 합니다.",
        "CGLIB는 상속을 이용하므로 기본 생성자가 필요하며 메서드를 final로 선언하면 안 됩니다."
    ],
    interviewQuestions: [
        {
            difficulty: 'Hell',
            question: "왜 @Transactional은 public 메서드에만 적용되나요?",
            answer: "스프링 AOP 프록시 방식의 한계 때문입니다. JDK 프록시는 인터페이스 기반이므로 당연히 public만 가능하고, CGLIB는 외부에서 오버라이딩을 해야 하는데 private 메서드는 자식 클래스에서 접근 및 오버라이딩이 불가능하기 때문입니다. (기술적으로는 바이트코드 조작으로 가능하지만, 스프링은 일관성을 위해 허용하지 않습니다.)"
        }
    ]
};
