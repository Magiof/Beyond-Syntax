import type { Module } from '../../curriculumData';

export const streamApi: Module = {
    id: "stream-api",
    title: "Chapter 18: 스트림 API",
    topic: "중간 연산, 최종 연산, 선언적 데이터 처리",
    content: `
## 1. 스트림이란?
데이터 소스를 함수형 스타일로 처리하는 통로입니다. 원본 데이터를 변경하지 않습니다.

---

## 2. 연산 단계
1. **생성**: \`.stream()\`
2. **중간 연산 (Lazy)**: \`filter\`, \`map\`, \`sorted\`, \`distinct\`
3. **최종 연산**: \`forEach\`, \`collect\`, \`sum\`, \`reduce\`

---

## 3. 특징
- **지연 연산**: 최종 연산 전까지 중간 연산은 실행되지 않음
- **재사용 불가**: 한 번 소비된 스트림은 다시 사용할 수 없음
`,
    codeExamples: [
        {
            title: "스트림 파이프라인",
            language: "java",
            code: `int sum = list.stream()
    .filter(n -> n % 2 == 0)
    .mapToInt(n -> n * 2)
    .sum();`
        }
    ],
    keyPoints: [
        "선언적 코드로 데이터를 처리하여 가독성이 높습니다.",
        "병렬 처리가 쉽습니다 (\`.parallelStream()\`)."
    ],
    interviewQuestions: [
        {
            difficulty: 'Medium',
            question: "스트림의 중간 연산과 최종 연산의 차이는?",
            answer: "중간 연산은 스트림을 반환하며 연결 가능하고 지연 연산되는 반면, 최종 연산은 결과를 도출하고 스트림을 종료시킵니다."
        }
    ]
};
