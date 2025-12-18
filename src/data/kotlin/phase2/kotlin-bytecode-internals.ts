import type { Module } from '../../curriculumData';

export const kotlinBytecodeInternals: Module = {
    id: "kotlin-bytecode-internals",
    title: "Chapter 1: Kotlin Bytecode Magic",
    topic: "Inline Functions, Reified, Value Class, Null Safety Internals",
    content: `
## 1. Kotlin 바이트코드 해부
Kotlin 코드가 JVM 바이트코드로 어떻게 변환되는지 이해하면 성능 최적화가 가능합니다.

## 2. Inline Functions
함수 본문과 람다 코드를 호출 지점에 직접 삽입하여 객체 생성 오버헤드를 줄입니다.

## 3. Reified Type Parameters
인라인 함수의 특성을 활용해 런타임에 제네릭 타입 정보에 접근합니다.

## 4. Value Class
런타임에 객체 생성 없이 내부 프로퍼티 타입으로 최적화되는 경량 클래스입니다.
`,
    codeExamples: [
        {
            title: "reified 활용",
            language: "kotlin",
            code: `inline fun <reified T> isType(value: Any): Boolean = value is T`
        }
    ],
    keyPoints: [
        "inline은 람다 오버헤드를 줄여줍니다.",
        "value class는 객체 할당 비용을 제거합니다."
    ],
    interviewQuestions: [
        {
            difficulty: 'Hard',
            question: "reified 키워드의 원리는?",
            answer: "컴파일 시점에 해당 타입을 실제 타입으로 대체하여 바이트코드를 생성합니다."
        }
    ]
};
