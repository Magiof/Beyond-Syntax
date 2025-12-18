import type { Module } from '../../curriculumData';

export const coroutineInternals: Module = {
    id: "coroutine-internals",
    title: "Chapter 3: Coroutine Internals",
    topic: "CPS (Continuation-Passing Style), State Machine, Suspend Functions",
    content: `
## 1. Suspend 함수의 비밀
컴파일러에 의해 CPS(Continuation-Passing Style)로 변환됩니다.

## 2. 상태 머신 (State Machine)
코루틴은 내부적으로 Switch-Case 문 기반의 상태 머신으로 동작하여 중단과 재개를 관리합니다.

## 3. Continuation
현재 실행 상태를 저장하고 나중에 다시 시작할 수 있게 해주는 객체입니다.
`,
    codeExamples: [
        {
            title: "중단 함수 예시",
            language: "kotlin",
            code: `suspend fun fetchData() { delay(1000) }`
        }
    ],
    keyPoints: [
        "코루틴은 스레드를 차단하지 않고 중단합니다.",
        "상태 머신을 통해 중단 지점부터 재개할 수 있습니다."
    ],
    interviewQuestions: [
        {
            difficulty: 'Hard',
            question: "suspend 함수의 동작 원리(CPS)를 설명하세요.",
            answer: "마지막 파라미터로 Continuation 객체를 전달받아, 중단 시 현재 상태를 저장하고 재개 시 label을 통해 해당 지점부터 다시 실행합니다."
        }
    ]
};
