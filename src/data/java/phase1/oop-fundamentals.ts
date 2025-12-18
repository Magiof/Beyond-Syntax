import type { Module } from '../../curriculumData';

export const oopFundamentals: Module = {
    id: "oop-fundamentals",
    title: "Chapter 3: 객체지향의 본질 - 불변식(Invariant)과 캡슐화",
    topic: "Class Invariants, Heap Layout, Object Header, Effective Java Item 15/16",
    content: `
## 1. Class vs Object: Engineering View

입문서에서는 클래스를 '붕어빵 틀'이라고 설명하지만, 엔지니어링 관점에서는 "**데이터의 구조(Layout)와 불변식(Invariant)의 집합**" 입니다.

### 1.1 Memory Layout (Deep Dive)
객체는 메모리(Heap) 상에서 어떻게 존재할까요? 단순히 필드 값만 저장되는 것이 아닙니다.

\`\`\`mermaid
flowchart TD
    subgraph Stack_Frame ["Stack Frame"]
        Ref["reference (4 bytes)"]
    end

    subgraph Heap_Memory ["Heap Memory"]
        ObjectHeader["Object Header"]
        Fields["Fields"]
    end

    Ref --> ObjectHeader

    subgraph Object_Layout ["Java Object Layout (JOL)"]
        direction TB
        MarkWord["Mark Word (8 bytes): GC 상태, HashCode, Lock 정보"]
        KlassPtr["Klass Pointer (4 bytes): 클래스 메타데이터 주소"]
        Body["Instance Data (Fields): 실제 데이터"]
        Padding["Padding: 8바이트 정렬을 위한 빈 공간"]
    end

    ObjectHeader --- MarkWord
    MarkWord --- KlassPtr
    KlassPtr --- Body
    Body --- Padding
\`\`\`

- **Mark Word**: 객체의 주민등록증 같은 것입니다. 이 객체가 현재 Locking 상태인지, GC 대상인지, HashCode는 무엇인지 기록합니다.
- **Klass Pointer**: 이 객체가 어떤 클래스(Class Meta)의 인스턴스인지 가리킵니다.

---

## 2. 불변식(Invariant)과 생성자

> [!IMPORTANT]
> **핵심 개념 (Effective Java):** 생성자는 단순히 값을 넣는 메서드가 아닙니다. "**객체가 태어날 때부터 유효한(Valid) 상태임**" 을 보장하는 관문입니다.

### 2.1 불변식이란?
프로그램이 실행되는 동안 "**반드시 참이어야 하는 조건**" 입니다.
- 예: "나이는 음수일 수 없다", "은행 잔고는 마이너스 통장이 아닌 한 0 이상이어야 한다".

\`\`\`java
public class User {
    private int age;

    // 생성자: 불변식 수립 (Establish Invariants)
    public User(int age) {
        if (age < 0) {
            throw new IllegalArgumentException("나이는 음수일 수 없습니다.");
        }
        this.age = age;
    }
}
\`\`\`
생성자에서 이 검증을 하지 않는다면, \`User\` 객체는 태어날 때부터 '잘못된 상태(Corrupted State)'를 가질 수 있습니다.

---

## 3. 정보 은닉(Information Hiding)의 진짜 이유

> **Effective Java Item 15: 클래스와 멤버의 접근 권한을 최소화하라**

\`private\`을 쓰는 이유는 "부끄러워서"가 아닙니다. **시스템의 복잡성(Complexity)을 낮추기 위해서**입니다.

### 3.1 엔지니어링 관점의 이득
1.  **API와 구현의 분리**: 내부 필드(\`private list\`)를 \`ArrayList\`에서 \`LinkedList\`로 바꿔도, 외부 코드는 전혀 수정할 필요가 없습니다.
2.  **불변식 보호**: \`public\` 필드는 외부에서 언제든 \`user.age = -500\`이라고 조작할 수 있습니다. \`private\`으로 잠그고 \`Setter\`를 통해 검증 로직을 거치게 해야만 데이터 무결성이 지켜집니다.

---

## 4. 변경 가능성(Mutability) 최소화

> **Effective Java Item 17: 변경 가능성을 최소화하라**

가능하다면 모든 필드를 \`final\`로 선언하십시오.
- **Thread Safety**: 불변 객체(Immutable Object)는 동기화 없이도 스레드로부터 안전합니다.
- **Simplicity**: 상태가 변하지 않으므로, 객체를 생성한 시점의 상태가 파괴될 때까지 유지됩니다.

\`\`\`java
// Best Practice: Value Object (Immutable)
public final class Money {
    private final long amount; // 한 번 정해지면 절대 안 바뀜

    public Money(long amount) {
        this.amount = amount;
    }

    public Money plus(Money other) {
        // 내 값을 바꾸는 게 아니라(Mutate), 새로운 객체를 만듦(Return New)
        return new Money(this.amount + other.amount);
    }
}
\`\`\`
`,
    codeExamples: [
        {
            title: "Effective Encapsulation",
            language: "java",
            code: `public class BankAccount {
    // 1. 모든 필드는 private
    private long balance;
    
    public BankAccount(long initialBalance) {
        if (initialBalance < 0) throw new IllegalArgumentException();
        this.balance = initialBalance;
    }

    // 2. Setter보다는 명확한 '행위'를 나타내는 메서드 제공
    public void deposit(long amount) {
        if (amount <= 0) throw new IllegalArgumentException("입금액 오류");
        this.balance += amount;
        // Invariant 유지됨: balance는 절대 음수가 될 수 없음
    }

    // 3. Getter는 필요한 경우에만 (방어적 복사 고려)
    public long getBalance() {
        return balance;
    }
}`
        }
    ],
    keyPoints: [
        "객체는 메모리(Heap) 상에서 Header와 Body로 구성되며, Header에는 GC/Lock 정보가 담깁니다.",
        "생성자의 존재 목적은 '초기화'가 아니라 '불변식(Invariant) 수립'입니다.",
        "가능한 한 모든 필드를 private final로 만들어 불변 객체(Immutable)를 지향하십시오. (Effective Java Item 17)"
    ],
    interviewQuestions: [
        {
            difficulty: 'Hard',
            question: "자바의 객체 헤더(Object Header)인 Mark Word에는 어떤 정보가 저장되나요?",
            answer: "Mark Word(64bit JVM 기준 8바이트)에는 객체의 HashCode, GC 세대 나이(Age), 그리고 동기화를 위한 Lock 상태(Biased Lock, Lightweight Lock 등) 정보가 비트 단위로 패킹되어 저장됩니다."
        },
        {
            difficulty: 'Medium',
            question: "왜 Setter를 무분별하게 만들면 안 되나요?",
            answer: "Setter가 있으면 객체는 언제든 상태가 변할 수 있는 '가변(Mutable)' 상태가 됩니다. 이는 스레드 안전성을 해치고, 객체의 불변식이 언제 어디서 깨졌는지 추적하기 어렵게 만듭니다. 따라서 상태 변경이 꼭 필요한 경우에만, 의도가 명확한 메서드(예: changePassword)를 제공해야 합니다."
        }
    ]
};
