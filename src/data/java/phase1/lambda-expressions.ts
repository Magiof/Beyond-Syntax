import type { Module } from '../../curriculumData';

export const lambdaExpressions: Module = {
    id: "lambda-expressions",
    title: "Chapter 17: 람다 표현식",
    topic: "함수형 인터페이스, 람다 문법, 메서드 참조",
    content: `
## 1. 람다 표현식
함수를 하나의 식으로 표현한 것입니다. 익명 객체를 대체할 수 있습니다.

\`\`\`java
(a, b) -> a + b
\`\`\`

---

## 2. 함수형 인터페이스
추상 메서드가 단 하나인 인터페이스입니다. (\`@FunctionalInterface\`)

### 주요 표준 인터페이스
- \`Consumer<T>\`: 입력을 받아 소비
- \`Supplier<T>\`: 결과를 제공
- \`Function<T, R>\`: 입력을 받아 다른 타입으로 변환
- \`Predicate<T>\`: 조건을 검사하여 boolean 반환

---

## 3. 메서드 참조
람다를 더 간결하게 표현합니다.
\`\`\`java
System.out::println
\`\`\`
`,
    codeExamples: [
        {
            title: "람다 활용",
            language: "java",
            code: `List<String> list = Arrays.asList("a", "b");
list.forEach(s -> System.out.println(s));`
        }
    ],
    keyPoints: [
        "코드가 훨씬 간결해지고 가독성이 높아집니다.",
        "함수형 프로그래밍 스타일을 자바에 도입했습니다."
    ],
    interviewQuestions: [
        {
            difficulty: 'Medium',
            question: "람다 표현식의 조건은?",
            answer: "구현하려는 목표 인터페이스가 함수형 인터페이스(추상 메서드 1개)여야 합니다."
        }
    ]
};
