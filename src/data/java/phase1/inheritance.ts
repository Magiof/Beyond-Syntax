import type { Module } from '../../curriculumData';

export const inheritance: Module = {
    id: "inheritance",
    title: "Chapter 11: 상속 (Inheritance)",
    topic: "extends, 메서드 오버라이딩, super 키워드, Object 클래스",
    content: `
## 1. 상속(Inheritance)이란?

**상속**은 기존 클래스(부모)의 필드와 메서드를 새 클래스(자식)가 **물려받는** 것입니다.

### 상속의 장점
1. **코드 재사용**: 중복 코드 제거
2. **확장성**: 기존 기능에 새 기능 추가
3. **유지보수성**: 공통 기능은 부모에서 한 번만 수정

---

## 2. 상속 문법

\`\`\`java
class 자식클래스 extends 부모클래스 {
    // 추가 필드와 메서드
}
\`\`\`

### 예시

\`\`\`java
// 부모 클래스
class Animal {
    String name;
    
    void eat() {
        System.out.println(name + "이(가) 먹습니다.");
    }
    
    void sleep() {
        System.out.println(name + "이(가) 잡니다.");
    }
}

// 자식 클래스
class Dog extends Animal {
    void bark() {
        System.out.println(name + "이(가) 짖습니다: 멍멍!");
    }
}

// 사용
Dog dog = new Dog();
dog.name = "바둑이";  // 부모의 필드 사용
dog.eat();            // 부모의 메서드 사용
dog.bark();           // 자식만의 메서드
\`\`\`

---

## 3. 메서드 오버라이딩 (Overriding)

부모의 메서드를 자식이 **재정의**하는 것입니다.

\`\`\`java
class Animal {
    void sound() {
        System.out.println("동물이 소리를 냅니다.");
    }
}

class Dog extends Animal {
    @Override  // 어노테이션 (선택이지만 권장)
    void sound() {
        System.out.println("멍멍!");
    }
}

class Cat extends Animal {
    @Override
    void sound() {
        System.out.println("야옹!");
    }
}
\`\`\`

### 오버라이딩 규칙
1. 메서드 이름, 매개변수, 반환타입이 **동일**해야 함
2. 접근 제어자는 부모와 **같거나 넓어야** 함
3. 예외는 부모와 **같거나 좁아야** 함 (더 구체적인 예외)

> **오버로딩 vs 오버라이딩**
> - 오버로딩: 같은 클래스 내, 매개변수 다름
> - 오버라이딩: 상속 관계, 메서드 재정의

---

## 4. super 키워드

\`super\`는 **부모 클래스를 참조**합니다.

### 4.1 부모의 필드/메서드 접근

\`\`\`java
class Parent {
    String name = "부모";
    
    void greet() {
        System.out.println("안녕, 나는 " + name);
    }
}

class Child extends Parent {
    String name = "자식";  // 같은 이름의 필드
    
    void introduce() {
        System.out.println("내 이름: " + this.name);   // 자식
        System.out.println("부모 이름: " + super.name); // 부모
    }
    
    @Override
    void greet() {
        super.greet();  // 부모 메서드 호출
        System.out.println("그리고 나는 " + this.name);
    }
}
\`\`\`

### 4.2 부모 생성자 호출

자식 생성자에서 **반드시** 부모 생성자가 호출됩니다.

\`\`\`java
class Parent {
    String name;
    
    Parent(String name) {
        this.name = name;
    }
}

class Child extends Parent {
    int age;
    
    Child(String name, int age) {
        super(name);  // 부모 생성자 호출 (첫 줄에 위치!)
        this.age = age;
    }
}
\`\`\`

> **규칙**: \`super()\`는 생성자의 **첫 번째 줄**에 와야 합니다.
> 명시하지 않으면 컴파일러가 \`super()\`를 자동 삽입합니다.

---

## 5. Object 클래스

모든 클래스의 **최상위 부모**입니다.

\`\`\`java
class MyClass { }
// 위는 실제로 아래와 같음
class MyClass extends Object { }
\`\`\`

### Object의 주요 메서드

| 메서드 | 설명 |
|--------|------|
| \`toString()\` | 객체를 문자열로 표현 |
| \`equals(Object o)\` | 객체 동등성 비교 |
| \`hashCode()\` | 해시 코드 반환 |
| \`getClass()\` | 런타임 클래스 정보 |
| \`clone()\` | 객체 복제 |

---

## 6. final 키워드와 상속

### 6.1 final 클래스

상속될 수 없는 클래스입니다.

\`\`\`java
final class FinalClass {
    // 이 클래스를 상속할 수 없음
}
\`\`\`

### 6.2 final 메서드

오버라이딩될 수 없는 메서드입니다.

\`\`\`java
class Parent {
    final void importantMethod() {
        // 자식이 변경할 수 없음
    }
}
\`\`\`
`,
    codeExamples: [
        {
            title: "상속과 오버라이딩 예제",
            language: "java",
            code: `// 부모 클래스
class Vehicle {
    String brand;
    int speed;
    
    Vehicle(String brand) {
        this.brand = brand;
        this.speed = 0;
    }
    
    void accelerate(int amount) {
        speed += amount;
        System.out.println(brand + " 속도: " + speed + "km/h");
    }
    
    void stop() {
        speed = 0;
        System.out.println(brand + " 정지");
    }
    
    void describe() {
        System.out.println("이것은 " + brand + " 탈것입니다.");
    }
}

// 자식 클래스 1
class Car extends Vehicle {
    int numDoors;
    
    Car(String brand, int numDoors) {
        super(brand);  // 부모 생성자 호출
        this.numDoors = numDoors;
    }
    
    @Override
    void describe() {
        System.out.println(brand + " 자동차, " + numDoors + "도어");
    }
    
    void honk() {
        System.out.println("빵빵!");
    }
}

// 자식 클래스 2
class Motorcycle extends Vehicle {
    boolean hasSidecar;
    
    Motorcycle(String brand, boolean hasSidecar) {
        super(brand);
        this.hasSidecar = hasSidecar;
    }
    
    @Override
    void describe() {
        String sidecar = hasSidecar ? "사이드카 있음" : "사이드카 없음";
        System.out.println(brand + " 오토바이, " + sidecar);
    }
}

// 사용
public class Main {
    public static void main(String[] args) {
        Car car = new Car("현대", 4);
        car.accelerate(60);   // 부모 메서드
        car.describe();       // 오버라이딩된 메서드
        car.honk();           // 자식만의 메서드
        
        Motorcycle bike = new Motorcycle("할리", true);
        bike.accelerate(80);
        bike.describe();
    }
}`
        },
        {
            title: "super 키워드 활용",
            language: "java",
            code: `class Employee {
    protected String name;
    protected double salary;
    
    public Employee(String name, double salary) {
        this.name = name;
        this.salary = salary;
    }
    
    public double calculateBonus() {
        return salary * 0.1;  // 기본 보너스 10%
    }
    
    public void displayInfo() {
        System.out.println("이름: " + name);
        System.out.println("급여: " + salary);
        System.out.println("보너스: " + calculateBonus());
    }
}

class Manager extends Employee {
    private int teamSize;
    
    public Manager(String name, double salary, int teamSize) {
        super(name, salary);  // 부모 생성자 호출
        this.teamSize = teamSize;
    }
    
    @Override
    public double calculateBonus() {
        // 부모의 보너스 + 팀원당 추가 보너스
        return super.calculateBonus() + (teamSize * 10000);
    }
    
    @Override
    public void displayInfo() {
        super.displayInfo();  // 부모 메서드 호출
        System.out.println("관리 팀원 수: " + teamSize);
    }
}

public class Main {
    public static void main(String[] args) {
        Employee emp = new Employee("김직원", 3000000);
        emp.displayInfo();
        
        System.out.println("---");
        
        Manager mgr = new Manager("박매니저", 5000000, 10);
        mgr.displayInfo();
    }
}`
        }
    ],
    keyPoints: [
        "상속은 extends 키워드를 사용하며, Java는 단일 상속만 허용합니다.",
        "오버라이딩은 부모의 메서드를 자식이 재정의하는 것이며, @Override 어노테이션 사용을 권장합니다.",
        "super 키워드로 부모의 필드, 메서드, 생성자에 접근할 수 있습니다.",
        "자식 생성자는 반드시 부모 생성자를 호출하며, super()는 첫 줄에 위치해야 합니다.",
        "모든 클래스는 Object 클래스를 상속받습니다."
    ],
    interviewQuestions: [
        {
            difficulty: 'Easy',
            question: "Java는 다중 상속을 지원하나요?",
            answer: "클래스 간의 다중 상속은 지원하지 않습니다. 하지만 인터페이스는 다중 구현이 가능합니다."
        },
        {
            difficulty: 'Medium',
            question: "super()와 this()의 차이점은?",
            answer: "super()는 부모 클래스의 생성자를 호출하고, this()는 같은 클래스 내의 다른 생성자를 호출합니다. 둘 다 생성자의 첫 줄에만 올 수 있습니다."
        }
    ]
};
