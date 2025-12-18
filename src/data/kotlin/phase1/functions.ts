import type { Module } from '../../curriculumData';

export const functions: Module = {
    id: "functions",
    title: "Chapter 5: 함수",
    topic: "함수 정의, 기본 인자, 이름 있는 인자, 확장 함수, 중위 함수",
    content: `
## 1. 함수 정의
\`fun\` 키워드를 사용하며, 단일 표현식 함수는 \`=\`로 축약 가능합니다.

## 2. 유연한 호출
- 기본 인자(Default Arguments) 제공
- 이름 있는 인자(Named Arguments)로 가독성 향상

## 3. 확장 함수 (Extension Function)
기존 클래스에 새로운 메서드를 추가하는 마법 같은 기능입니다.
`,
    codeExamples: [
        {
            title: "확장 함수 예시",
            language: "kotlin",
            code: `fun String.addHello() = "Hello $this"
println("Kotlin".addHello())`
        }
    ],
    keyPoints: [
        "확장 함수는 상속 없이도 기존 기능을 확장할 수 있게 해줍니다.",
        "기본 인자는 오버로딩의 번거로움을 줄여줍니다."
    ],
    interviewQuestions: [
        {
            difficulty: 'Medium',
            question: "확장 함수란 무엇인가요?",
            answer: "클래스 외부에서 그 클래스의 멤버 메서드처럼 호출할 수 있는 함수를 정의하는 기능입니다."
        }
    ]
};
