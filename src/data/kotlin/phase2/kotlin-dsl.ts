import type { Module } from '../../curriculumData';

export const kotlinDsl: Module = {
    id: "kotlin-dsl",
    title: "Chapter 6: Kotlin DSL & Meta-programming",
    topic: "Type-Safe Builders, Lambda with Receiver, KSP",
    content: `
## 1. Kotlin DSL
코드를 자연어 구문처럼 작성할 수 있게 해주는 기술입니다.

## 2. 수신 객체 지정 람다
람다 내부에서 특정 객체의 멤버를 바로 사용할 수 있게 해주는 핵심 기능입니다.

## 3. KSP (Kotlin Symbol Processing)
컴파일 타임에 어노테이션을 분석하고 코드를 생성하는 최신 도구입니다.
`,
    codeExamples: [
        {
            title: "간단한 DSL 빌더",
            language: "kotlin",
            code: `fun request(block: RequestBuilder.() -> Unit) { ... }`
        }
    ],
    keyPoints: [
        "수신 객체 지정 람다는 DSL의 핵심입니다.",
        "KSP는 kapt보다 빠른 빌드 속도를 제공합니다."
    ],
    interviewQuestions: [
        {
            difficulty: 'Hard',
            question: "Lambda with Receiver가 DSL 구현에 어떤 도움을 주나요?",
            answer: "this 객체의 멤버를 직접 호출할 수 있게 하여, 중괄호 구조로 계층적인 설정을 직관적으로 표현할 수 있게 합니다."
        }
    ]
};
