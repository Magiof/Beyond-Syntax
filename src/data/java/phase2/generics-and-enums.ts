import type { Module } from '../../curriculumData';

export const genericsAndEnums: Module = {
    id: "generics-and-enums",
    title: "Chapter 2: 타입 시스템의 깊이 - 제네릭 소거와 PECS",
    topic: "Type Erasure, Recursive Type Bounds, PECS, Strategy Enum",
    content: `
## 1. 제네릭의 실체: 소거(Erasure)

> **면접 단골 질문**: "자바의 제네릭은 런타임에 어떻게 존재하나요?"

C++의 템플릿과 달리, 자바의 제네릭은 **컴파일 시점에만 존재하고 런타임에는 사라집니다(Erasure).**

- **Compile Time**: \`List<String>\` → 타입 체크 수행.
- **Runtime**: \`List\` (Raw Type) → 모든 \`T\`는 \`Object\`로 치환됨. (명시적 캐스팅 코드가 자동 삽입됨)

이 때문에 \`new T()\`, \`instanceof T\` 같은 코드가 불가능한 것입니다. 런타임에는 \`T\`가 뭔지 모르니까요.

---

## 2. 한정적 와일드카드와 PECS 원칙

> **Effective Java Item 31: 한정적 와일드카드를 써서 API 유연성을 높이라**

제네릭은 기본적으로 **불공변(Invariant)**입니다. \`List<Object>\`에 \`List<String>\`을 넣을 수 없다는 뜻입니다. 이를 해결하기 위해 와일드카드를 씁니다.

### 공식: PECS (Producer-Extends, Consumer-Super)
- **Producer (생산자) -> extends**: 컬렉션에서 꺼내서 읽기만 할 때. (\`read-only\`)
- **Consumer (소비자) -> super**: 컬렉션에 무언가를 집어넣을 때. (\`write-only\`)

\`\`\`java
// Producer: src에서 꺼내서(Produce) 쓰니까 extends
// Consumer: dst에 집어넣어(Consume) 소비하니까 super
public void copy(List<? extends Number> src, List<? super Number> dst) {
    for (Number n : src) {
        dst.add(n);
    }
}
\`\`\`

---

## 3. 재귀적 타입 한정 (Recursive Type Bound)

> "**나 자신과 비교할 수 있는 타입만 허용한다**"

\`Comparable\` 인터페이스를 구현할 때 자주 보게 되는 패턴입니다.

\`\`\`java
// T는 자신(T)과 비교 가능한(Comparable) 애여야 한다.
public static <T extends Comparable<T>> T max(List<T> list) { ... }
\`\`\`
이 패턴은 \`Object\`가 아닌, 비교 능력을 갖춘 타입들끼리만 정렬 등을 수행하도록 강제합니다.

---

## 4. Enum: 단순 상수가 아닌 '싱글톤 객체'

자바의 Enum은 본질적으로 \`final\` 클래스이며, 각 상수는 **public static final 필드인 싱글톤 객체**입니다.
따라서, 전략 패턴(Strategy Pattern)을 Enum 하나로 구현할 수 있습니다.

`,
    codeExamples: [
        {
            title: "Enum을 활용한 전략 패턴 (상수별 메서드 구현)",
            language: "java",
            code: `public enum Operation {
    PLUS("+") {
        public double apply(double x, double y) { return x + y; }
    },
    MINUS("-") {
        public double apply(double x, double y) { return x - y; }
    },
    TIMES("*") {
        public double apply(double x, double y) { return x * y; }
    },
    DIVIDE("/") {
        public double apply(double x, double y) { return x / y; }
    };

    private final String symbol;

    Operation(String symbol) { this.symbol = symbol; }

    // 추상 메서드 선언 -> 각 상수가 이를 반드시 구현해야 함(Compiler Check)
    public abstract double apply(double x, double y);
}`
        }
    ],
    keyPoints: [
        "자바의 제네릭은 컴파일 타임에만 존재하며, 런타임에는 Object로 소거(Erasure)됩니다. (C++ 템플릿과의 차이점)",
        "API 유연성을 위해 PECS 원칙(Producer-extends, Consumer-super)을 반드시 지켜야 합니다. (Item 31)",
        "Enum은 상수별로 추상 메서드를 구현(Constant-specific method implementation)하여 다형성을 가질 수 있습니다."
    ],
    interviewQuestions: [
        {
            difficulty: 'Hard',
            question: "List<Object>와 List<?>의 차이는 무엇인가요?",
            answer: "List<Object>는 Object 타입만 넣을 수 있는 '구체적인 리스트'이고, List<?>는 '어떤 타입인지 모르는 리스트'입니다. List<?>에는 null 외에는 어떤 값도 넣을 수 없습니다(타입이 뭔지 모르니 안전하지 않아서). 반면 읽기는 가능합니다(Object로 읽힘)."
        },
        {
            difficulty: 'Hard',
            question: "제네릭 소거(Erasure)로 인해 발생하는 제약 사항은?",
            answer: "런타임에 타입 정보가 없으므로 new T()로 인스턴스를 생성하거나, T[] 배열을 생성할 수 없습니다. 또한 static 변수에는 제네릭 타입 파라미터 T를 사용할 수 없습니다(모든 인스턴스가 공유하므로)."
        }
    ]
};
