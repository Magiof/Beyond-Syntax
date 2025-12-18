import type { Module } from '../../curriculumData';

export const kotlinFlow: Module = {
    id: "kotlin-flow",
    title: "Chapter 14: 코틀린 플로우 - 선언적 비동기 데이터 스트림",
    topic: "Cold Stream, StateFlow vs SharedFlow, 연산자 체이닝, 배압 제어",
    content: `
## 1. Flow: 리액티브 프로그래밍의 코틀린식 해법

**Flow**는 코루틴 기반의 비동기 스트림으로, RxJava의 복잡함을 걷어내고 코틀린의 간결함과 구조적 동시성을 결합했습니다.

- **Cold Stream**: \`collect()\`와 같은 종결 연산이 호출되기 전까지는 데이터를 생산하지 않습니다. 각 구독자마다 독립적인 파이프라인이 생성됩니다.

---

## 2. Hot Stream: StateFlow와 SharedFlow

여러 구독자에게 데이터를 동시에 공유해야 할 때 사용합니다.

- **StateFlow**: 현재 상태를 유지하는 스트림입니다. 초기값이 필수이며, 항상 최신 상태를 구독자에게 전달합니다. (안드로이드의 LiveData를 완벽히 대체)
- **SharedFlow**: 상태가 아닌 '이벤트'를 전달합니다. 구독 시점 이전의 데이터는 기본적으로 무시됩니다. (Toast 메시지, Navigation 등)

---

## 3. 배압(Backpressure)과 버퍼링

데이터 생산 속도가 소비 속도보다 빠를 때의 전략입니다.

- **buffer()**: 생산과 소비를 별도의 코루틴에서 실행하여 병목을 줄입니다.
- **conflate()**: 중간 값들을 건너뛰고 오직 최신 값만 처리합니다.
- **collectLatest()**: 새로운 값이 오면 이전의 처리를 취소하고 새 작업을 시작합니다.

---

## 4. 연산자와 예외 처리

- **onStart / onCompletion**: 스트림의 시작과 끝을 감지합니다.
- **catch**: 스트림 도중 발생한 예외를 우아하게 잡아냅니다. (Upstream 예외만 포착 가능)
- **flowOn**: 특정 연산자가 실행될 디스패처를 변경합니다.
`,
    codeExamples: [
        {
            title: "StateFlow와 Flow 연산자 활용",
            language: "kotlin",
            code: `// ViewModel에서의 StateFlow 관리
private val _uiState = MutableStateFlow<State>(State.Loading)
val uiState = _uiState.asStateFlow()

// 데이터 흐름 처리
flowOf(1, 2, 3)
    .onEach { delay(100) }
    .map { it * 2 }
    .flowOn(Dispatchers.Default) // 계산은 백그라운드에서
    .collect { println(it) } // 결과는 호출한 스코프에서`
        }
    ],
    keyPoints: [
        "Flow는 중단 함수와 결합하여 비동기 데이터 흐론을 동기 코드처럼 읽기 좋게 만듭니다.",
        "상태 관리에는 StateFlow, 이벤트 전달에는 SharedFlow를 선택하는 것이 표준입니다.",
        "flowOn을 통해 특정 단계의 실행 환경(Thread)을 매우 세밀하게 제어할 수 있습니다."
    ],
    interviewQuestions: [
        {
            difficulty: 'Hard',
            question: "Flow와 Sequence의 차이점은 무엇인가요?",
            answer: "Sequence는 동기적인 지연 계산을 수행하지만, Flow는 중단 함수를 지원하여 비동기적인 지연 계산이 가능합니다. 즉, Flow 내부에서는 delay() 등을 호출할 수 있지만 Sequence에서는 불가능합니다."
        }
    ]
};
