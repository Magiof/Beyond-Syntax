import type { Module } from '../../curriculumData';

export const lambdasAndHigherOrderFunctions: Module = {
    id: "lambdas-and-higher-order-functions",
    title: "Chapter 9: 고차 함수와 람다",
    topic: "람다 표현식, 고차 함수, it, 함수 참조",
    content: `
## 1. 람다 표현식
함수를 인자로 전달하거나 변수에 저장할 수 있는 익명 함수입니다.

## 2. 고차 함수 (Higher-Order Function)
함수를 매개변수로 받거나 함수를 반환하는 함수입니다.

## 3. 인라인 함수 (Inline Function)
람다 사용 시 발생하는 성능 오버헤드를 줄이기 위한 최적화 기법입니다.
`,
    codeExamples: [
        {
            title: "고차 함수 예제",
            language: "kotlin",
            code: `fun operate(a: Int, b: Int, op: (Int, Int) -> Int) = op(a, b)
println(operate(3, 4) { x, y -> x + y })`
        }
    ],
    keyPoints: [
        "마지막 인자가 람다라면 괄호 밖으로 뺄 수 있습니다.",
        "함수 참조(::)를 통해 기존 함수도 람다처럼 쓸 수 있습니다."
    ],
    interviewQuestions: [
        {
            difficulty: 'Medium',
            question: "고차 함수란 무엇인가요?",
            answer: "함수를 값으로 취급하여 인자로 넘기거나 결과로 받을 수 있는 함수입니다."
        }
    ]
};
