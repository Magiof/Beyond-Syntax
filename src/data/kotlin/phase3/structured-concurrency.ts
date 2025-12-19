import type { Module } from '../../types';

export const structuredConcurrency: Module = {
    id: "structured-concurrency",
    title: "Chapter 13: 구조적 동시성 - 코루틴의 가계도",
    topic: "Job Hierarchy, Exception Propagation, SupervisorJob, Strategy",
    content: `
## 1. 구조적 동시성 (Structured Concurrency)

> "**부모는 자식을 기다린다. 그리고 자식의 불행(예외)은 부모의 불행이다.**"

코루틴은 스레드처럼 "Fire-and-Forget(쏘고 잊기)" 방식이 아닙니다. 반드시 **부모-자식 관계**를 형성하여 생명주기를 관리합니다.

\`\`\`mermaid
flowchart TD
    Parent["Parent Job"] --> Child1["Child Job 1"]
    Parent --> Child2["Child Job 2"]
    
    Child1 -- "X Exception!" --> Parent
    Parent -- "Cancel Signal" --> Child2
    Parent -- "Cancel Signal" --> Yourself["Parent Cancelled"]

    style Child1 fill:#f9f,stroke:#333,stroke-width:2px
    style Parent fill:#ffaaaa,stroke:#333,stroke-width:2px
\`\`\`

- **전파(Propagation)**: 자식 하나가 예외를 던지면, 부모와 다른 형제들도 모두 취소됩니다. (기본 행동)
- **대기(Join)**: 부모 스코프는 모든 자식의 작업이 끝날 때까지 자동으로 기다려줍니다.

---

## 2. 실패의 고립: SupervisorJob

만약 "이미지 업로드는 실패해도 텍스트 업로드는 성공해야 한다"면 어떻게 해야 할까요?
**SupervisorJob**은 자식의 예외를 부모에게 전파하지 않도록 막는 **방화벽(Firewall)** 역할을 합니다.

- **일반 Job**: 연대 책임 (All or Nothing)
- **SupervisorJob**: 각자 도생 (Independent Failure)

> **Tip**: 주로 \`supervisorScope { ... }\` 빌더를 사용하여 자식들의 실패 영역을 국소화합니다.

---

## 3. 예외가 사라지는 마술? (Exception Handling)

코루틴 빌더에 따라 예외를 다루는 방식이 다릅니다.

1.  **launch**: 예외 발생 **즉시** 부모에게 던집니다. (\`try-catch\`로 감싸도 소용없는 경우가 많습니다. 왜냐하면 비동기로 던지니까요!)
    - *해결*: \`CoroutineExceptionHandler\`를 Context에 추가해야 합니다.
2.  **async**: 예외를 결과 객체(\`Deferred\`) 안에 **저장**해둡니다.
    - *시점*: 사용자가 \`await()\`를 호출하는 순간 예외가 터집니다.

---

## 4. 실전 전략: 부모의 마음가짐

- **ViewModel**: 보통 \`viewModelScope\`는 \`SupervisorJob\`으로 구성되어 있습니다. UI 컴포넌트 하나가 에러 났다고 앱이 죽으면 안 되니까요.
- **Server Request**: 트랜잭션 단위 작업은 일반 \`Job\`을 써서, 하나라도 실패하면 전체 롤백되게 하는 것이 안전합니다.
`,
    codeExamples: [
        {
            title: "coroutineScope(연대책임) vs supervisorScope(각자도생)",
            language: "kotlin",
            code: `// Case 1: coroutineScope (All Die)
suspend fun loadAll() = try {
    coroutineScope {
        launch { throw Exception("Fail 1") } // 여기서 터지면
        launch { delay(100); print("Success 2") } // 얘도 취소됨!
    }
} catch (e: Exception) {
    print("Caught: $e")
}

// Case 2: supervisorScope (One Survivor)
suspend fun safeLoad() = supervisorScope {
    launch { throw Exception("Fail 1") } // 혼자 죽음
    launch { delay(100); print("Success 2") } // 얘는 살아남아서 실행됨!
}`
        }
    ],
    keyPoints: [
        "구조적 동시성은 '부모가 자식을 책임진다(관리 & 대기)'는 강력한 계약입니다.",
        "하나의 실패가 전체 취소로 이어지는 것을 막으려면 SupervisorJob이나 supervisorScope를 사용하십시오.",
        "launch와 async는 예외 처리 메커니즘이 다르므로 주의해야 합니다."
    ],
    interviewQuestions: [
        {
            difficulty: 'Hard',
            question: "부모 코루틴의 Job을 취소하면 자식 코루틴은 어떻게 되나요?",
            answer: "부모 Job이 취소되면 모든 자식 Job에게 취소 신호가 전달됩니다. 코루틴은 '협력적 취소' 방식을 따르므로, 자식 코루틴 내에서 yield()나 delay() 같은 중단 함수를 호출하거나isActive 체크를 하고 있다면 즉시 중단됩니다."
        }
    ]
};
