import type { Module } from '../../curriculumData';

export const modernJavaFeatures: Module = {
    id: "modern-java-features",
    title: "Chapter 4: 자바의 현대화 - 11부터 21까지",
    topic: "Records, Sealed Classes, Type Matching, Text Blocks",
    content: `
## 1. 자바의 변신: 더 이상 무겁지 않은 언어

자바는 Java 9 이후 6개월 단위의 빠른 릴리즈 모델을 채택하며 현대적인 언어 스펙들을 대거 도입했습니다. 이제 주석으로 때우던 보일러플레이트 코드와 작별할 시간입니다.

---

## 2. Records (Java 14/16): 불변 데이터의 정석 (What/How/When)

- **What**: 데이터를 담기만 하는 클래스(DTO)를 선언할 때, 필드, 생성자, Getter, equals, hashCode를 단 한 줄로 끝내줍니다.
- **How**: \`public record UserDto(String name, int age) {}\`
- **When**: DB에서 꺼내온 데이터를 API 응답으로 보낼 때처럼, '읽기 전용' 데이터 뭉치가 필요할 때 씁니다.

---

## 3. Sealed Classes (Java 15/17): 상속의 한계 정하기 (What/How/When)

- **What**: 아무나 내 클래스를 상속받지 못하게, '허락된 자식'들만 정의합니다.
- **How**: \`public sealed class Shape permits Circle, Square {}\`
- **When**: 도메인 설계 시 "도형은 오직 원과 사각형뿐이야"라고 엄격하게 규정하고 싶을 때 씁니다.

---

## 4. Pattern Matching for switch (Java 17/21)

장황했던 \`instanceof\`와 강제 형변환(Casting) 코드를 우아하게 바꿔줍니다.

\`\`\`java
return switch (obj) {
    case Integer i -> String.format("숫자: %d", i);
    case String s  -> String.format("글자: %s", s);
    default        -> obj.toString();
};
\`\`\`

---

## 5. Text Blocks (Java 13/15): 멀티라인 문자열

JSON이나 SQL 쿼리를 자바 코드 안에 넣을 때 \`\\n\`과 \`+\` 연산자로 고생하지 않아도 됩니다.

\`\`\`java
String query = """
    SELECT * 
    FROM orders 
    WHERE status = 'COMPLETED'
    """;
\`\`\`
`,
    codeExamples: [
        {
            title: "현대적 자바의 결합",
            language: "java",
            code: `// Record와 Text Block의 합작
record OrderDetail(String id, int amount) {}

public void printOrder(OrderDetail order) {
    String json = """
        {
            "orderId": "%s",
            "price": %d
        }
        """.formatted(order.id(), order.amount());
    System.out.println(json);
}`
        }
    ],
    keyPoints: [
        "Record는 DTO 작성을 획기적으로 줄여주는 현대 자바의 핵심 도구입니다.",
        "패턴 매칭을 통해 타입 체크와 캐스팅을 동시에 안전하게 수행할 수 있습니다.",
        "텍스트 블록은 쿼리나 JSON 가독성을 비약적으로 향상시킵니다."
    ],
    interviewQuestions: [
        {
            difficulty: 'Medium',
            question: "왜 Record는 일반 클래스와 달리 상속이 불가능한가요?",
            answer: "Record는 '불변 데이터 states' 그 자체를 표현하기 위해 탄생했습니다. 상속을 허용하면 자식 클래스에서 상태를 추가하거나 동작을 바꿀 수 있게 되어, Record가 보장하는 '단순한 데이터 전달자'로서의 불변성과 예측 가능성이 깨지기 때문입니다."
        }
    ]
};
