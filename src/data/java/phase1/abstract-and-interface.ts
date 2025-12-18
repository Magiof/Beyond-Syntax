import type { Module } from '../../curriculumData';

export const abstractAndInterface: Module = {
    id: "abstract-and-interface",
    title: "Chapter 13: 추상 클래스와 인터페이스",
    topic: "abstract 클래스, interface, default 메서드, 다중 구현",
    content: `
## 1. 추상 클래스 (Abstract Class)

**추상 클래스**는 인스턴스를 직접 생성할 수 없는 클래스입니다.

\`\`\`java
abstract class Animal {
    abstract void sound();  // 추상 메서드
    void eat() { System.out.println("먹는다"); } // 일반 메서드
}
\`\`\`

### 특징
- \`new Animal()\` 불가
- 자식 클래스에서 추상 메서드 반드시 구현
- 필드, 생성자, 일반 메서드 모두 가질 수 있음

---

## 2. 인터페이스 (Interface)

**인터페이스**는 추상 메서드들의 집합으로, 객체의 **역할**을 정의합니다.

\`\`\`java
interface Flyable {
    void fly();  // public abstract 생략됨
}
\`\`\`

### 특징
- 다중 구현 가능 (\`implements A, B\`)
- Java 8+에서 \`default\`, \`static\` 메서드 가능
- 필드는 \`public static final\`(상수)만 가능

---

## 3. 추상 클래스 vs 인터페이스

| 비교 | 추상 클래스 | 인터페이스 |
|------|-----------|-----------|
| 키워드 | \`abstract class\` | \`interface\` |
| 구현 | \`extends\` (단일 상속) | \`implements\` (다중 구현) |
| 필드 | 인스턴스 변수 가능 | 상수만 가능 |
| 목적 | 공통 속성/기능 상속 | 인터페이스(규칙) 정의 |

---

## 4. default 메서드 (Java 8+)

인터페이스에서 **기본 구현**을 제공할 수 있습니다.

\`\`\`java
interface Vehicle {
    default void horn() {
        System.out.println("빵빵!");
    }
}
\`\`\`
`,
    codeExamples: [
        {
            title: "인터페이스 다중 구현",
            language: "java",
            code: `interface Flyable { void fly(); }
interface Swimmable { void swim(); }

class Duck implements Flyable, Swimmable {
    @Override
    public void fly() { System.out.println("오리가 난다"); }
    @Override
    public void swim() { System.out.println("오리가 수영한다"); }
}

public class Main {
    public static void main(String[] args) {
        Duck d = new Duck();
        d.fly();
        d.swim();
    }
}`
        }
    ],
    keyPoints: [
        "추상 클래스는 미완성 설계도이며, 인터페이스는 기본 규격(역할)입니다.",
        "인터페이스는 다중 구현을 지원하여 결합도를 낮춥니다.",
        "Java 8부터 인터페이스도 default 메서드를 통해 구현을 가질 수 있습니다."
    ],
    interviewQuestions: [
        {
            difficulty: 'Medium',
            question: "추상 클래스와 인터페이스의 차이는?",
            answer: "추상 클래스는 'is-a' 관계로 본질적인 공통점을 묶을 때 사용하고, 인터페이스는 'can-do' 관계로 동작의 규격을 정의할 때 사용합니다."
        }
    ]
};
