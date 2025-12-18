import type { Module } from '../../curriculumData';

export const advancedGenericsAndDelegation: Module = {
    id: "advanced-generics-and-delegation",
    title: "Chapter 2: Advanced Generics & Delegation",
    topic: "Variance (in/out), Star Projection, Delegation Pattern (by)",
    content: `
## 1. 변성 (Variance)
- **out (공변성)**: 생성자(Producer), 읽기 전용
- **in (반공변성)**: 소비자(Consumer), 쓰기 전용

## 2. 위임 (Delegation)
\`by\` 키워드를 통해 합성을 상속처럼 간편하게 구현합니다.
- 클래스 위임, 프로퍼티 위임
`,
    codeExamples: [
        {
            title: "by lazy 위임",
            language: "kotlin",
            code: `val name: String by lazy { "Kotlin" }`
        }
    ],
    keyPoints: [
        "in/out을 통해 제네릭의 유연한 상단/하단 캐스팅을 제어합니다.",
        "by 키워드는 보일러플레이트 코드를 줄이는 강력한 도구입니다."
    ],
    interviewQuestions: [
        {
            difficulty: 'Hard',
            question: "자바의 ? extends T와 대응되는 코틀린 키워드는?",
            answer: "out 키워드입니다."
        }
    ]
};
