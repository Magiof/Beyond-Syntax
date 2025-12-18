import type { Module } from '../../curriculumData';

export const controlFlow: Module = {
    id: "control-flow",
    title: "Chapter 4: 제어 흐름 - 식(Expression)으로 생각하기",
    topic: "if 표현식, when, for/while, Range & Progression",
    content: `
## 1. 문(Statement)인가, 식(Expression)인가?

자바와 코틀린의 가장 큰 차이 중 하나는 **제어 구조를 대하는 태도**입니다.

- **문(Statement)**: 자신을 둘러싼 블록 내에서만 존재하며 값을 반환하지 않습니다. (자바의 \`if\`)
- **식(Expression)**: 결과 값을 계산해내며 다른 식의 일부로 쓰일 수 있습니다. (코틀린의 \`if\`)

> **Kotlin In Action**: 루프를 제외한 대부분의 제어 구조가 식입니다. 이를 통해 변수에 값을 직접 할당하거나 함수의 반환값으로 바로 사용할 수 있어 코드가 선언적으로 변합니다.

---

## 2. if 표현식

삼항 연산자가 따로 없는 코틀린에서는 \`if-else\`가 그 역할을 대신합니다.

\`\`\`kotlin
val max = if (a > b) a else b
\`\`\`

---

## 3. when: switch의 진화형

\`when\`은 단순한 분기를 넘어, 훨씬 유연한 조건을 처리합니다.

- **임의의 객체 허용**: 숫자뿐만 아니라 객체(Set, String 등)를 그대로 비교할 수 있습니다.
- **인자 없는 when**: 조건문에서 복잡한 논리 연산이 필요할 때 가독성을 극도로 높여줍니다.

---

## 4. 범위와 반복 (Ranges & Progressions)

코틀린은 \`..\` 연산자를 사용하여 수치 범위를 나타냅니다.

- **..**: 마지막 숫자 포함 (\`1..10\`)
- **until**: 마지막 숫자 제외 (\`1 until 10\`)
- **downTo / step**: 감소하는 루프나 단계별 이동

\`\`\`kotlin
for (i in 1..10 step 2) {
    println(i) // 1, 3, 5, 7, 9
}
\`\`\`
`,
    codeExamples: [
        {
            title: "when에서의 스마트 캐스트와 인자 없는 활용",
            language: "kotlin",
            code: `fun eval(expr: Expr): Int = when(expr) {
    is Num -> expr.value // is 검사 후 자동으로 스마트 캐스트됨
    is Sum -> eval(expr.left) + eval(expr.right)
    else -> throw IllegalArgumentException("Unknown expression")
}

// 인자 없는 when: 복잡한 논리 조건 처리
fun mix(c1: Color, c2: Color) = when {
    (c1 == RED && c2 == YELLOW) -> ORANGE
    (c1 == YELLOW && c2 == BLUE) -> GREEN
    else -> throw Exception("Dirty color")
}`
        }
    ],
    keyPoints: [
        "코틀린의 if와 when은 값을 반환하는 표현식입니다.",
        "when은 스마트 캐스트와 결합하여 자바의 instanceof 지옥을 해결합니다.",
        "for 루프는 인덱스 기반이 아닌 '항목 순회' 중심으로 설계되었습니다."
    ],
    interviewQuestions: [
        {
            difficulty: 'Medium',
            question: "왜 코틀린은 switch 대신 when을 도입했으며, 어떤 장점이 있나요?",
            answer: "switch는 상수 값만 비교 가능하지만, when은 임의의 객체, 범위 검사, 타입 검사 등 훨씬 광합위한 조건을 처리할 수 있습니다. 또한 인자 없이 사용할 경우 여러 복잡한 if-else if 문을 훨씬 읽기 좋게 구조화할 수 있습니다."
        }
    ]
};
