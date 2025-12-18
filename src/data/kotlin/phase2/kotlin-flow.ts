import type { Module } from '../../curriculumData';

export const kotlinFlow: Module = {
    id: "kotlin-flow",
    title: "Chapter 5: Reactive Programming with Flow",
    topic: "Cold/Hot Streams, Backpressure, StateFlow vs SharedFlow",
    content: `
## 1. Flow (Cold Stream)
구독자가 있어야 데이터가 흐르기 시작하며, 각 구독자마다 독립적인 실행 흐름을 갖습니다.

## 2. StateFlow & SharedFlow (Hot Stream)
상태 유지나 이벤트 브로드캐스팅에 적합한 공유 가능한 스트림입니다.

## 3. 배압 (Backpressure) 관리
buffer, conflate, collectLatest 등을 통해 처리 속도 차이를 해결합니다.
`,
    codeExamples: [
        {
            title: "StateFlow 사용법",
            language: "kotlin",
            code: `val _state = MutableStateFlow(0)
val state = _state.asStateFlow()`
        }
    ],
    keyPoints: [
        "UI 상태 관리는 주로 StateFlow를 사용합니다.",
        "일회성 이벤트(Toast 등)는 SharedFlow가 적합할 수 있습니다."
    ],
    interviewQuestions: [
        {
            difficulty: 'Medium',
            question: "Flow는 왜 Cold Stream인가요?",
            answer: "collect()가 호출되는 시점에 비로소 생산자 블록이 실행되기 때문입니다."
        }
    ]
};
