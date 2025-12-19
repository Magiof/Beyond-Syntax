import type { Module } from '../../types';

export const coroutineInternals: Module = {
    id: "coroutine-internals",
    title: "Chapter 12: 코루틴 해부 1 - CPS와 Context",
    topic: "CPS, State Machine, CoroutineContext, Dispatcher",
    content: `
## 1. 마법이 아닙니다. 컴파일러 기술입니다.

코루틴을 쓰면 비동기 코드를 동기 코드처럼 짤 수 있습니다. 어떻게 가능할까요?
컴파일러가 우리의 코드를 **CPS(Continuation Passing Style)**로 변환하고, 거대한 **State Machine**으로 재조립하기 때문입니다.

---

## 2. 상태 머신 (State Machine) 시각화

코드에 \`suspend\` 지점이 있을 때마다, 컴파일러는 이를 \`switch-case\` 문의 라벨로 쪼갭니다.

\`\`\`mermaid
flowchart TD
    Start((Start)) --> Label0["Label 0: 초기화"]
    Label0 --> Suspend1{Suspend Point 1}
    
    Suspend1 -- "Result Not Ready" --> Return["Return COROUTINE_SUSPENDED"]
    Suspend1 -- "Result Ready" --> Label1["Label 1: 재개(Resume)"]
    
    Return -.->|"Callback"| Label1
    Label1 --> Suspend2{Suspend Point 2}
    
    Suspend2 -- "Result Not Ready" --> Return
    Suspend2 -- "Result Ready" --> Label2["Label 2: 완료"]
    Label2 --> End((End))
\`\`\`

- **Continuation**: 이 모든 상태(지역 변수, 현재 라벨 위치)를 저장하는 객체입니다. 스레드가 쉬러 갈 때 이 객체를 힙(Heap)에 저장해두고, 나중에 돌아와서 복구합니다.

---

## 3. CoroutineContext: 코루틴의 DNA

코루틴은 실행될 때 **Context**라는 배낭을 메고 다닙니다. 이 배낭에는 이름, 스레드 정책, 예외 처리기 등이 들어있습니다.

\`\`\`kotlin
// Context는 'Map + Set' 처럼 동작합니다.
val context = Dispatchers.IO + CoroutineName("MyService") + Job()
\`\`\`

- **Dispatcher**: 스레드 풀 선택권 (IO, Default, Main).
- **Job**: 생명주기 관리자.
- **CoroutineName**: 디버깅용 이름표.
- **CoroutineExceptionHandler**: 예외 처리기.

---

## 4. Dispatcher: 스레드 택배 기사

\`Dispatchers.IO\`를 쓴다고 해서 IO 스레드가 바로 생기는 게 아닙니다. 코루틴은 "**작업(Continuation)을 포장해서 스레드 대기열(Queue)에 넣는 역할**"을 Dispatcher에게 위임합니다.

> **Deep Dive**: \`Dispatchers.Default\`와 \`Dispatchers.IO\`는 기본적으로 **같은 스레드 풀**을 공유합니다. 다만 IO는 "차단(Blocking)이 많을 것"이라 가정하고 스레드 생성 한도를 높게(최대 64개) 잡을 뿐입니다.

`,
    codeExamples: [
        {
            title: "CPS 변환 전과 후 (개념적)",
            language: "kotlin",
            code: `// [Before] 우리가 짜는 코드
suspend fun fetchDoc() {
    val data = network.request() // 중단점
    show(data)
}

// [After] 컴파일러가 만드는 코드 (Java 번역)
void fetchDoc(Continuation cont) {
    // 상태 머신 로드
    state = cont.label;
    
    switch(state) {
        case 0:
            cont.label = 1;
            // 결과가 바로 나오면 즉시 진행, 아니면 Return
            if (network.request(cont) == SUSPENDED) return; 
            break;
        case 1:
            data = cont.result;
            show(data);
    }
}`
        }
    ],
    keyPoints: [
        "suspend 함수는 컴파일 시점에 파라미터로 Continuation을 받는 함수로 변환됩니다.",
        "상태 머신 덕분에 스레드를 차단(Block)하지 않고도 함수 실행을 멈췄다 재개(Suspend/Resume)할 수 있습니다.",
        "CoroutineContext는 '+' 연산자로 쉽게 합칠 수 있으며, Dispatcher는 작업을 적절한 스레드에 '배달'하는 역할을 합니다."
    ],
    interviewQuestions: [
        {
            difficulty: 'Hell',
            question: "Dispatchers.Default와 Dispatchers.IO를 전환(withContext)할 때 스레드 컨텍스트 스위칭 비용이 발생하나요?",
            answer: "놀랍게도 항상 발생하지는 않습니다. 두 Dispatcher는 'CoroutineScheduler'라는 동일한 스레드 풀을 공유하기 때문에, 만약 현재 스레드가 양쪽 역할 모두 수행 가능하다면 스레드 변경 없이(No Switch) 수행할 수도 있습니다. 이것이 코루틴이 일반 스레드 풀 전환보다 가벼운 이유 중 하나입니다."
        }
    ]
};
