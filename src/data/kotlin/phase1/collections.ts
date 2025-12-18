import type { Module } from '../../curriculumData';

export const collections: Module = {
    id: "collections",
    title: "Chapter 8: 컬렉션 - 간결하고 견고한 데이터 조작",
    topic: "Read-only vs Mutable, 함수형 연산자, Sequence, 자바 호환성",
    content: `
## 1. 인터페이스 분리: Read-only vs Mutable

코틀린 컬렉션 설계의 핵심은 **읽기 전용 인터페이스**와 **변경 가능한 인터페이스**의 명확한 분리입니다.

- **Collection / List / Set / Map**: 읽기 전용입니다. 데이터를 수정하는 메서드가 아예 없습니다.
- **MutableCollection / MutableList** 등: 데이터를 추가, 삭제할 수 있는 메서드를 포함합니다.

> **Atomic Tip**: 가능하면 항상 읽기 전용 컬렉션을 사용하세요. 함수가 컬렉션을 인자로 받을 때 읽기 전용 타입을 요구하면, 그 함수가 데이터를 변경하지 않을 것임을 컴파일 레벨에서 보장받을 수 있습니다.

---

## 2. 함수형 연산자의 정수

루프를 직접 돌리는 대신, 선언적인 함수를 사용하여 데이터를 가공합니다.

- **filter**: 조건에 맞는 요소만 남깁니다.
- **map**: 각 요소를 변환합니다.
- **all / any**: 조건을 만족하는지 검사합니다.
- **groupBy**: 특정 기준에 따라 그룹화합니다. (Map 반환)
- **flatMap**: 중첩된 컬렉션을 평탄화하면서 변환합니다.

---

## 3. 지연 계산: Sequence (Lazy Processing)

기존 컬렉션 연산은 매 단계마다 중간 리스트를 생성합니다. 데이터가 매우 크다면 이는 비효율적입니다.

- **Sequence**: 자바의 \`Stream\`과 유사하게, 최종 연산이 호출될 때까지 계산을 미룹니다.
- **장점**: 중간 리스트 생성을 피하고, 효율적인 체이닝이 가능합니다.

---

## 4. 자바와의 공생

코틀린 컬렉션은 실제로는 자바의 표준 컬렉션 클래스입니다. 별도의 변환 비용 없이 자바 코드와 주고받을 수 있지만, 코틀린 컴파일러가 읽기 전용 여부를 체크해 주는 마법을 부립니다.
`,
    codeExamples: [
        {
            title: "효율적인 컬렉션 조작과 Sequence",
            language: "kotlin",
            code: `val numbers = (1..1000000).toList()

// 일반 방식: filter 후 중간 리스트 생성 -> map 후 중간 리스트 생성
val result = numbers.filter { it % 2 == 0 }.map { it * it }.take(5)

// Sequence 방식: 중간 리스트 없이 원소별로 파이프라인 통과
val lazyResult = numbers.asSequence()
                        .filter { it % 2 == 0 }
                        .map { it * it }
                        .take(5)
                        .toList()`
        }
    ],
    keyPoints: [
        "읽기 전용과 가변 인터페이스의 분리는 코틀린의 가장 강력한 설계 철학 중 하나입니다.",
        "Sequence는 대용량 데이터 처리 시 성능 우위를 점할 수 있는 도구입니다.",
        "자바 컬렉션과의 100% 호환성은 코틀린의 실용성을 대변합니다."
    ],
    interviewQuestions: [
        {
            difficulty: 'Medium',
            question: "listOf()로 만든 리스트를 자바 코드에 넘겼을 때, 자바 코드가 add()를 호출하면 어떻게 되나요?",
            answer: "런타임에 UnsupportedOperationException이 발생합니다. 코틀린의 읽기 전용 컬렉션은 자바의 변경 불가능한(Unmodifiable) 컬렉션으로 취급되기 때문입니다."
        }
    ]
};
