import type { Module } from '../../curriculumData';

export const controlFlow: Module = {
    id: "control-flow",
    title: "Chapter 4: 조건문과 반복문",
    topic: "if 표현식, when, for, while, 범위 연산자",
    content: `
## 1. if 표현식
Kotlin의 if는 값을 반환하는 표현식입니다.

## 2. when 표현식
switch-case를 대체하며 훨씬 강력한 기능을 제공합니다.

## 3. 반복문
- **for**: \`in\`과 범위를 사용해 순회
- **while**: Java와 동일
`,
    codeExamples: [
        {
            title: "when 사용법",
            language: "kotlin",
            code: `val result = when(x) {
    1 -> "일"
    in 2..10 -> "작은 수"
    else -> "나머지"
}`
        }
    ],
    keyPoints: [
        "if와 when은 값을 반환할 수 있어 변수에 직접 할당이 가능합니다.",
        "수치 범위는 .. 또는 until로 표현합니다."
    ],
    interviewQuestions: [
        {
            difficulty: 'Easy',
            question: "Kotlin에서 삼항 연산자가 있나요?",
            answer: "없습니다. if-else 표현식이 그 역할을 대신합니다."
        }
    ]
};
