import type { Module } from '../../types';

export const lambdasAndHigherOrderFunctions: Module = {
    id: "lambdas-and-higher-order-functions",
    title: "Chapter 9: 고차 함수와 람다 - 코드 블록을 값으로",
    topic: "람다 문법, it 파라미터, 인라인 함수, SAM 변환",
    content: `
## 1. 람다: 이름 없는 코드 조각

람다는 다른 함수에 인자로 넘기거나 변수에 저장할 수 있는 작은 코드 블록입니다. 자바 8의 람다와 유사하지만, 훨씬 더 간결하고 강력합니다.

- **문법**: \`{ 파라미터 -> 본문 }\` 형태를 가집니다. 항상 중괄호 \`{}\`로 감싸집니다.
- **it**: 람다의 파라미터가 딱 하나뿐이고 타입을 추론할 수 있다면, 이름을 지정하지 않고 \`it\`이라는 예약어를 사용할 수 있습니다.

---

## 2. 코틀린의 특징: trailing lambda

함수의 마지막 인자가 람다라면, 괄호 밖으로 람다를 뺄 수 있습니다. 이는 코틀린 특유의 읽기 좋은 DSL 스타일을 만듭니다.

\`\`\`kotlin
// 괄호 안에 넣는 방식
list.maxBy({ p: Person -> p.age })

// Trailing lambda 방식 (권장)
list.maxBy { it.age }
\`\`\`

---

## 3. 고차 함수 (Higher-Order Functions)

함수를 인자로 받거나 함수를 반환하는 함수를 말합니다. 코틀린 표준 라이브러리의 \`filter\`, \`map\`, \`with\`, \`use\` 등이 모두 고차 함수입니다.

---

## 4. 인라인 함수 (Inline Functions)와 성능

람다를 사용하면 익명 클래스 객체가 생성되어 메모리 오버헤드가 발생할 수 있습니다. **inline** 키워드를 사용하면 컴파일러가 함수의 본문을 호출 지점에 직접 끼워 넣어 객체 생성 없이 성능을 최적화합니다.

> **Warning**: 인라인 함수는 코드 크기를 키울 수 있으므로, 람다를 인자로 받는 작은 함수에 주로 사용해야 합니다.

---

## 5. SAM (Single Abstract Method) 변환

자바의 추상 메서드가 하나뿐인 인터페이스(예: \`Runnable\`, \`OnClickListener\`)를 코틀린 람다로 전달할 수 있게 해주는 마법입니다. 자바 코드와의 강력한 상호 운용성을 보장합니다.
`,
    codeExamples: [
        {
            title: "람다와 컬렉션 조작",
            language: "kotlin",
            code: `val people = listOf(Person("Alice", 29), Person("Bob", 31))

// 가장 나이 많은 사람 찾기
println(people.maxBy { it.age })

// 필터링과 매핑 결합
val names = people.filter { it.age > 30 }
                  .map { it.name }`
        }
    ],
    keyPoints: [
        "람다는 중괄호 안에 작성하며, 마지막 인자일 경우 괄호 밖으로 뺄 수 있습니다.",
        "it은 단일 파라미터 람다를 극도로 간결하게 만듭니다.",
        "inline 함수를 통해 고차 함수 사용 시의 성능 걱정을 덜 수 있습니다."
    ],
    interviewQuestions: [
        {
            difficulty: 'Hard',
            question: "인라인 함수(inline)를 사용하면 성능 외에 제어 흐름 측면에서 어떤 차이가 있나요?",
            answer: "인라인 함수 내의 람다에서는 '비로컬 반환(Non-local return)'이 가능합니다. 즉, 람다 안에서 return을 사용하면 람다를 호출한 외부 함수까지 종료시킬 수 있습니다. 이는 일반 람다에서는 불가능한 제어 흐름입니다."
        }
    ]
};
