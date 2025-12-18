import type { Module } from '../../curriculumData';

export const polymorphism: Module = {
    id: "polymorphism",
    title: "Chapter 12: 다형성 (Polymorphism)",
    topic: "업캐스팅/다운캐스팅, instanceof, 동적 바인딩",
    content: `
## 1. 다형성(Polymorphism)이란?

**다형성**은 "하나의 타입으로 여러 형태의 객체를 참조"할 수 있는 능력입니다.

\`\`\`java
Animal animal1 = new Dog();
Animal animal2 = new Cat();
\`\`\`

---

## 2. 업캐스팅 (Upcasting)

**자식 타입 → 부모 타입**으로 변환하는 것입니다. **자동**으로 수행됩니다.

\`\`\`java
Animal a = new Dog();  // 업캐스팅 (자동)
a.eat();               // ✅ OK (Animal에 있음)
// a.bark();           // ❌ 컴파일 에러! (Animal에 없음)
\`\`\`

> 업캐스팅하면 **부모 타입에 정의된 멤버만** 접근 가능합니다.

---

## 3. 다운캐스팅 (Downcasting)

**부모 타입 → 자식 타입**으로 변환하는 것입니다. **명시적 캐스팅** 필요합니다.

\`\`\`java
Animal a = new Dog();  // 업캐스팅
Dog d = (Dog) a;       // 다운캐스팅 (명시적)
d.bark();              // ✅ OK
\`\`\`

---

## 4. instanceof 연산자

객체가 **특정 타입인지 확인**합니다. 다운캐스팅 전에 항상 확인해야 합니다.

\`\`\`java
if (animal instanceof Dog) {
    Dog dog = (Dog) animal;
    dog.bark();
}

// Java 16+ 패턴 매칭
if (animal instanceof Dog dog) {
    dog.bark();
}
\`\`\`

---

## 5. 동적 바인딩 (Dynamic Binding)

**실행 시점**에 실제 객체의 타입에 따라 호출할 메서드가 결정됩니다.

\`\`\`java
Animal a = new Dog();
a.sound();  // Dog의 sound()가 호출됨 (동적 바인딩)
\`\`\`

---

## 6. 다형성의 활용

### 6.1 매개변수 다형성
\`\`\`java
void feed(Animal animal) {
    animal.eat();
}
\`\`Feed(new Dog());
\`\`\`

### 6.2 컬렉션에서의 다형성
\`\`\`java
List<Animal> animals = new ArrayList<>();
animals.add(new Dog());
animals.add(new Cat());
\`\`\`
`,
    codeExamples: [
        {
            title: "다형성을 활용한 결제 시스템",
            language: "java",
            code: `abstract class PaymentMethod {
    protected double balance;
    abstract void pay(double amount);
    abstract String getType();
}

class CreditCard extends PaymentMethod {
    @Override
    void pay(double amount) { System.out.println("카드 결제: " + amount); }
    @Override
    String getType() { return "신용카드"; }
}

class BankTransfer extends PaymentMethod {
    @Override
    void pay(double amount) { System.out.println("계좌 이체: " + amount); }
    @Override
    String getType() { return "계좌이체"; }
}

public class Main {
    public static void process(PaymentMethod m, double a) {
        m.pay(a);
    }
    public static void main(String[] args) {
        process(new CreditCard(), 10000);
        process(new BankTransfer(), 20000);
    }
}`
        }
    ],
    keyPoints: [
        "다형성은 부모 타입 참조 변수로 자식 타입 객체를 다루는 것입니다.",
        "업캐스팅은 자동, 다운캐스팅은 명시적 캐스팅이 필요합니다.",
        "instanceof로 타입을 확인하여 안전하게 캐스팅할 수 있습니다.",
        "동적 바인딩에 의해 실제 객체의 오버라이딩된 메서드가 호출됩니다."
    ],
    interviewQuestions: [
        {
            difficulty: 'Medium',
            question: "다형성(Polymorphism)이란 무엇인가요?",
            answer: "부모 타입의 참조 변수로 여러 자식 객체를 참조하여, 동일한 호출로 객체마다 다른 동작을 수행하게 하는 성질입니다."
        }
    ]
};
