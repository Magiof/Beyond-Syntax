import type { Module } from '../../types';

export const inheritanceAndPolymorphism: Module = {
    id: "inheritance-and-polymorphism",
    title: "Chapter 4: 상속의 함정과 다형성(Polymorphism)",
    topic: "Liskov Substitution Principle, Composition over Inheritance, V-Table",
    content: `
## 1. 상속(Inheritance)의 목적은 '재사용'이 아닙니다

> [!CAUTION]
> **흔한 오해**: "A의 코드를 B에서 또 쓰기 귀찮으니까 상속받아야지." -> **유지보수의 악몽**이 시작되는 순간입니다.

**엔지니어링 관점의 상속**:
상속은 "**타입의 계층 구조(Type Hierarchy)**"를 만들기 위함입니다. 즉, "**B는 A의 일종이다(Is-A)**"라는 명제가 성립할 때만 사용해야 합니다. 단순 코드 재사용은 **조립(Composition)** 으로 해결하는 것이 정석입니다(Effective Java Item 18).

---

## 2. Deep Dive: 다형성의 작동 원리 (Virtual Method Table)

부모 타입 변수(\`Parent p\`)에 자식 객체(\`new Child()\`)를 담았을 때, 어떻게 자식의 재정의된 메서드가 호출될까요?

\`\`\`mermaid
flowchart TD
    subgraph Method_Area ["Method Area (Global)"]
        PVTable["Parent V-Table"]
        CVTable["Child V-Table"]
        
        P_Run["Parent.run() Addr"]
        C_Run["Child.run() Addr (Override)"]
        P_Eat["Parent.eat() Addr"]
    end
    
    subgraph Heap ["Heap Memory"]
        ChildObj["Child Instance"]
    end
    
    subgraph Stack ["Stack Memory"]
        Ref["Parent p"]
    end
    
    Ref -->|"p points to"| ChildObj
    ChildObj -.->|"vptr (points to)"| CVTable
    
    CVTable -->|"offset 0: run()"| C_Run
    CVTable -->|"offset 1: eat()"| P_Eat
    PVTable -->|"offset 0: run()"| P_Run
    
    style C_Run fill:#f96,stroke:#333
    style P_Run fill:#eee,stroke:#999
\`\`\`

- **V-Table (가상 메서드 테이블)**: 컴파일러는 클래스마다 메서드 주소록(V-Table)을 만듭니다.
- **Dynamic Dispatch**: 실행 시점(Runtime)에 \`p.run()\`을 호출하면, \`p\`가 가리키는 실제 객체(\`Child\`)의 V-Table을 찾아가서, 오버라이딩된 \`C_Run\` 주소를 실행합니다. 이것이 다형성의 마법(Dynamic Dispatch)입니다.

---

## 3. 리스코프 치환 원칙 (LSP)

> "**자식 클래스는 언제나 부모 클래스를 대체할 수 있어야 한다.**"

상속을 잘못 쓰면 이 원칙이 깨집니다.
- **위반 사례**: \`Rectangle\`(직사각형)을 상속받아 \`Square\`(정사각형)을 만드는 경우.
    - 직사각형은 \`setWidth\`와 \`setHeight\`가 독립적이어야 하지만, 정사각형은 하나를 바꾸면 다른 하나도 강제로 바뀝니다.
    - \`Rectangle r = new Square()\`로 쓰는 순간, 직사각형인 줄 알고 짠 기존 로직들이 다 망가집니다.

---

## 4. 해결책: 상속보다는 컴포지션(Composition)

> **Effective Java Item 18: 상속보다는 조합(Composition)을 사용하라**

기존 클래스를 확장하는 대신, 새로운 클래스 안에 \`private\` 필드로 기존 클래스의 인스턴스를 참조하게 만드는 설계를 **컴포지션**이라 합니다.

\`\`\`java
// Bad: HashSet의 기능을 일부 바꾸려고 상속받음 (내부 구현 의존성 생김)
public class MySet<E> extends HashSet<E> { ... }

// Good: HashSet을 '사용'하는 형태로 설계 (Composition)
public class ForwardingSet<E> implements Set<E> {
    private final Set<E> s; // Composition
    public ForwardingSet(Set<E> s) { this.s = s; }
    
    public void add(E e) { s.add(e); }
    // 필요한 기능만 추가/변경
}
\`\`\`
이렇게 하면 캡슐화가 깨지지 않고, 상위 클래스의 내부 구현이 바뀌어도 내 클래스는 안전합니다.
`,
    codeExamples: [
        {
            title: "Composition(조립)을 이용한 기능 확장",
            language: "java",
            code: `// 상속(Inheritance)이 아님! 
// 기존 Engine 기능을 가져다 쓰는 조립(Composition) 패턴
public class Car {
    // 1. 핵심 부품을 필드로 보유
    private final Engine engine;
    
    // 2. 생성자를 통해 의존성 주입 (Dependency Injection의 기초)
    public Car(Engine engine) {
        this.engine = engine;
    }
    
    public void drive() {
        // 3. 내가 직접 구현하지 않고, 부품에게 위임 (Delegation)
        engine.start(); 
        System.out.println("차가 주행합니다.");
    }
}`
        }
    ],
    keyPoints: [
        "상속은 '코드 재사용'이 아니라 '타입 계층'을 위한 도구입니다. (Is-A 관계)",
        "다형성은 런타임에 실제 객체의 V-Table을 참조하는 'Dynamic Dispatch'로 작동합니다.",
        "상속의 단점(결합도 증가, 캡슐화 파괴)을 피하려면 'Composition(조립)'을 우선 고려하십시오. (Item 18)"
    ],
    interviewQuestions: [
        {
            difficulty: 'Hard',
            question: "Dynamic Dispatch(동적 디스패치)가 무엇인가요?",
            answer: "컴파일 시점이 아닌 **런타임 시점**에, 실제 객체의 타입에 따라 실행할 메서드를 결정하는 메커니즘입니다. JVM은 객체 헤더의 클래스 포인터를 통해 V-Table(가상 메서드 테이블)을 조회하고, 여기서 오버라이딩된 실제 메서드 주소를 찾아 실행합니다."
        },
        {
            difficulty: 'Hard',
            question: "LSP(리스코프 치환 원칙) 위반의 대표적인 예시는?",
            answer: "직사각형(Rectangle)을 상속받은 정사각형(Square) 예시가 대표적입니다. 부모인 직사각형은 가로/세로를 독립적으로 변경할 수 있어야 한다는 '계약'이 있지만, 자식인 정사각형은 이를 위반(하나를 바꾸면 같이 바뀜)하므로, 부모 타입으로 대체해서 사용할 때 논리적 오류를 발생시킵니다."
        }
    ]
};
