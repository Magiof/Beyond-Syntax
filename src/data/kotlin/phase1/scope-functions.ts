import type { Module } from '../../curriculumData';

export const scopeFunctions: Module = {
    id: "scope-functions",
    title: "Chapter 10: 스코프 함수",
    topic: "let, run, with, apply, also",
    content: `
## 1. 스코프 함수란?
객체의 컨텍스트 내에서 특정 작업 블록을 실행할 수 있게 해주는 함수들입니다.

## 2. 다섯 가지 스코프 함수
- **let**: null 체크, 결과 반환
- **apply**: 객체 설정 후 객체 자신 반환
- **also**: 객체 사용 후 객체 자신 반환 (로깅 등)
- **run**: 객체 초기화 후 결과 반환
- **with**: 객체에 대한 여러 작업 수행
`,
    codeExamples: [
        {
            title: "apply vs let",
            language: "kotlin",
            code: `val person = Person().apply { name = "A" }
val length = person.name.let { it.length }`
        }
    ],
    keyPoints: [
        "가독성을 높이는 용도지만, 너무 남용하면 코드가 복잡해질 수 있습니다.",
        "상황에 맞는 적절한 스코프 함수 선택이 중요합니다."
    ],
    interviewQuestions: [
        {
            difficulty: 'Medium',
            question: "apply와 also의 차이는?",
            answer: "apply는 객체를 this로 참조하고, also는 it으로 참조합니다."
        }
    ]
};
