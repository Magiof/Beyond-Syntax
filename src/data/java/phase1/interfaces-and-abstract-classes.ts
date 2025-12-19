import type { Module } from '../../types';

export const interfacesAndAbstractClasses: Module = {
    id: "interfaces-and-abstract-classes",
    title: "Chapter 5: 추상화 전략 - Skeleton Implementation과 Mixin",
    topic: "Effective Java Item 20/23, Mixin, Template Method Pattern",
    content: `
## 1. 인터페이스 vs 추상 클래스: 엔지니어링 기준

> **Effective Java Item 20: 추상 클래스보다는 인터페이스를 우선하라**

자바 8부터 디폴트 메서드(Default Method)가 생기면서 인터페이스의 위상이 완전히 달라졌습니다.

### 1.1 믹스인(Mixin) 정의 가능
인터페이스는 클래스의 주된 타입 외에 "**선택적 행위**"를 믹스인(끼워넣기)할 수 있는 유일한 도구입니다.
- \`Comparable\`, \`Cloneable\`, \`AutoCloseable\` 등이 대표적입니다.
- 추상 클래스는 단일 상속 제약 때문에 믹스인으로 사용할 수 없습니다.

---

## 2. 골격 구현 (Skeleton Implementation) 패턴

인터페이스의 유연함과 추상 클래스의 코드 재사용성을 동시에 잡는 **최강의 설계 패턴**입니다. (Java Collections Framework의 \`AbstractList\`, \`AbstractSet\`이 이 패턴입니다.)

\`\`\`mermaid
classDiagram
    class Interface {
        <<interface>>
        +methodA()
        +methodB()
        +methodC()
    }
    
    class AbstractSkeleton {
        <<abstract>>
        +methodA() [Implemented]
        +methodB() [Implemented]
    }
    
    class ConcreteImpl {
        +methodC() [Implement This Only!]
    }
    
    Interface <|.. AbstractSkeleton
    AbstractSkeleton <|-- ConcreteImpl
\`\`\`

- **Interface**: 타입을 정의합니다. (설계)
- **Abstract Class**: \`methodA\`, \`methodB\` 같이 뻔한 공통 로직을 미리 구현해둡니다. (구현 도우미)
- **Concrete Class**: 이를 상속받으면, 지루한 구현은 생략하고 핵심 로직인 \`methodC\`에만 집중할 수 있습니다.

---

## 3. 태그 달린 클래스(Tagged Class)보다는 계층 구조

> **Effective Java Item 23: 태그 달린 클래스보다는 클래스 계층구조를 활용하라**

**Bad Practice (Tagged Class)**:
하나의 클래스 안에 \`enum Type { CIRCLE, RECTANGLE }\` 같은 태그를 넣고 \`switch\`문으로 동작을 분기하지 마십시오. 새로운 타입이 추가될 때마다 모든 \`switch\`문을 찾아 수정해야 합니다(OCP 위반).

**Good Practice (Hierarchy)**:
서로 다른 동작은 서로 다른 클래스로 분리하고, 루트(Root)를 추상 클래스나 인터페이스로 정의하십시오.

---

## 4. 전략 패턴 (Strategy Pattern)의 핵심

인터페이스는 단순한 규격이 아니라, "**알고리즘을 통째로 갈아끼우는 소켓**"입니다.

\`\`\`java
// Strategy Interface
public interface SortStrategy {
    void sort(int[] numbers);
}

// Concrete Strategy A
public class QuickSort implements SortStrategy { ... }

// Concrete Strategy B
public class MergeSort implements SortStrategy { ... }

// Context (전략을 사용하는 쪽)
public class Sorter {
    private SortStrategy strategy;
    
    // 런타임에 전략 교체 가능 (DI)
    public void setStrategy(SortStrategy strategy) {
        this.strategy = strategy;
    }
}
\`\`\`
이것이 스프링 프레임워크가 동작하는 핵심 원리(PSA)입니다.
`,
    codeExamples: [
        {
            title: "Skeleton Implementation (골격 구현) 실전 예제",
            language: "java",
            code: `// 1. 순수한 인터페이스 (Type Definition)
interface VendingMachine {
    void processCoin(int val);
    void selectProduct(String name);
    void deliverProduct();
    // ... 메서드가 10개 더 있다고 가정
}

// 2. 골격 구현 클래스 (지루한 구현 담당)
abstract class AbstractVendingMachine implements VendingMachine {
    // 모든 자판기의 공통 로직은 여기서 미리 “템플릿”으로 구현
    @Override
    public void processCoin(int val) {
        System.out.println(val + "원이 투입되었습니다.");
    }
    @Override
    public void deliverProduct() {
        System.out.println("상품 배출구 확인...");
    }
}

// 3. 실제 구현체 (핵심 로직만 신경 쓰면 됨!)
public class CokeMachine extends AbstractVendingMachine {
    @Override
    public void selectProduct(String name) {
        System.out.println("콜라 특화 로직: " + name + " 선택됨");
    }
    // processCoin, deliverProduct는 이미 구현되어 있어 편함
}`
        }
    ],
    keyPoints: [
        "추상 클래스보다는 인터페이스를 우선하되, 구현의 편의를 위해 '골격 구현(Skeleton Implementation)'을 함께 제공하는 것이 좋습니다.",
        "인터페이스는 다중 상속이 가능하므로 '믹스인(Mixin)' 정의에 적합합니다.",
        "타입(Type) 정보가 내부에 태그(enum)로 들어있는 클래스는 안티 패턴입니다. 계층 구조로 리팩토링하십시오."
    ],
    interviewQuestions: [
        {
            difficulty: 'Hard',
            question: "자바 8의 Default Method가 도입된 진짜 이유는 무엇인가요?",
            answer: "가장 주된 이유는 '하위 호환성(Backward Compatibility)'을 유지하면서 기존 인터페이스에 새로운 기능을 추가하기 위해서입니다. (예: Collection 인터페이스에 stream() 추가). 이를 통해 기존 구현체들을 깨뜨리지 않고 API를 진화시킬 수 있었습니다."
        },
        {
            difficulty: 'Medium',
            question: "추상 클래스와 인터페이스의 결정적인 차이 하나만 꼽자면?",
            answer: "‘상태(State, 필드)’의 유무보다는 '**다중 상속' 가능 여부** 가 엔지니어링 관점에서 가장 큽니다. 추상 클래스는 단일 상속 제약으로 인해 계층 구조에 갇히지만, 인터페이스는 어떤 클래스에도 유연하게 믹스인(Mixin)될 수 있습니다."
        }
    ]
};
