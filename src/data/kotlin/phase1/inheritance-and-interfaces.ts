import type { Module } from '../../curriculumData';

export const inheritanceAndInterfaces: Module = {
    id: "inheritance-and-interfaces",
    title: "Chapter 7: 상속과 인터페이스",
    topic: "open/final, 상속, override, 인터페이스, sealed class",
    content: `
## 1. 상속
Kotlin 클래스는 기본적으로 \`final\`입니다. 상속을 허용하려면 \`open\` 키워드가 필요합니다.

## 2. 인터페이스
추상 메서드뿐만 아니라 기본 구현을 가진 메서드도 포함할 수 있습니다.

## 3. sealed class
상속받는 자식 클래스를 제한하여 안정성을 높입니다.
`,
    codeExamples: [
        {
            title: "상속 예제",
            language: "kotlin",
            code: `open class Animal { open fun sound() = "..." }
class Dog : Animal() { override fun sound() = "멍멍" }`
        }
    ],
    keyPoints: [
        "상속보다는 합성을 권장하는 언어 철학이 반영되어 있습니다.",
        "sealed class는 when 식과 함께 쓸 때 강력합니다."
    ],
    interviewQuestions: [
        {
            difficulty: 'Medium',
            question: "sealed class란?",
            answer: "상속 계층을 제한하여 컴파일 타임에 하위 타입을 모두 알 수 있게 하는 클래스입니다."
        }
    ]
};
