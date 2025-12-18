import type { Module } from '../../curriculumData';

export const structuredConcurrency: Module = {
    id: "structured-concurrency",
    title: "Chapter 4: Structured Concurrency & Patterns",
    topic: "Job Hierarchy, Cancellation Propagation, Exception Handling, SupervisorJob",
    content: `
## 1. 구조적 동시성 (Structured Concurrency)
비동기 작업을 부모-자식 관계로 묶어 생명주기를 안전하게 관리합니다.

## 2. 취소 전파
부모가 취소되면 자식도 취소되며, 자식의 실패는 기본적으로 부모에게 전파됩니다.

## 3. SupervisorJob
자식의 실패가 부모나 형제에게 영향을 주지 않도록 하는 방화벽 역할을 합니다.
`,
    codeExamples: [
        {
            title: "supervisorScope 활용",
            language: "kotlin",
            code: `supervisorScope {
    async { throw Exception() }
    async { "Success" }
}`
        }
    ],
    keyPoints: [
        "구조적 동시성은 코루틴 누수를 방지합니다.",
        "사용 목적에 따라 coroutineScope와 supervisorScope를 구분해서 사용합니다."
    ],
    interviewQuestions: [
        {
            difficulty: 'Medium',
            question: "Job과 SupervisorJob의 차이는?",
            answer: "Job은 자식의 실패를 전파하지만, SupervisorJob은 자식의 실패를 무시합니다."
        }
    ]
};
