import type { Module } from '../../curriculumData';

export const classAndObject: Module = {
    id: "class-and-object",
    title: "Chapter 9: 클래스와 객체",
    topic: "클래스 정의, 필드, 생성자, this 키워드, 인스턴스 vs 클래스 변수",
    content: `
## 1. 객체지향 프로그래밍 (OOP)

**객체지향 프로그래밍(Object-Oriented Programming)** 은 프로그램을 **객체(Object)** 들의 상호작용으로 설계하는 패러다임입니다.

### OOP의 4대 원칙
1. **캡슐화 (Encapsulation)**: 데이터와 메서드를 하나로 묶고 정보 은닉
2. **상속 (Inheritance)**: 기존 클래스를 확장하여 새 클래스 생성
3. **다형성 (Polymorphism)**: 같은 인터페이스, 다른 구현
4. **추상화 (Abstraction)**: 복잡한 시스템을 단순화

---

## 2. 클래스(Class)와 객체(Object)

### 2.1 클래스란?
- **설계도/청사진**입니다.
- 객체가 가져야 할 **속성(필드)** 과 **동작(메서드)** 을 정의합니다.

### 2.2 객체란?
- **클래스의 실체(인스턴스)** 입니다.
- 메모리에 할당된 실제 데이터입니다.

\`\`\`
클래스 : 객체 = 붕어빵 틀 : 붕어빵
               = 설계도 : 건물
               = 자동차 도면 : 실제 자동차
\`\`\`

---

## 3. 클래스 정의

\`\`\`java
public class Person {
    // 필드 (속성, 멤버 변수)
    String name;
    int age;
    
    // 메서드 (동작, 행위)
    void introduce() {
        System.out.println("안녕하세요, " + name + "입니다.");
    }
}
\`\`\`

---

## 4. 객체 생성과 사용

\`\`\`java
public class Main {
    public static void main(String[] args) {
        // 객체 생성 (인스턴스화)
        Person person1 = new Person();
        
        // 필드 접근
        person1.name = "홍길동";
        person1.age = 25;
        
        // 메서드 호출
        person1.introduce();  // "안녕하세요, 홍길동입니다."
        
        // 다른 객체 생성
        Person person2 = new Person();
        person2.name = "김철수";
        person2.age = 30;
        person2.introduce();  // "안녕하세요, 김철수입니다."
    }
}
\`\`\`

---

## 5. 생성자 (Constructor)

**생성자**는 객체가 생성될 때 **자동으로 호출**되는 특수한 메서드입니다.

### 5.1 생성자의 특징
- 클래스 이름과 **같은 이름**
- **반환 타입이 없음** (void도 아님)
- 객체 초기화에 사용

### 5.2 기본 생성자

\`\`\`java
public class Person {
    String name;
    int age;
    
    // 기본 생성자 (매개변수 없음)
    // 아무 생성자도 정의하지 않으면 컴파일러가 자동 생성
    public Person() {
        name = "이름 없음";
        age = 0;
    }
}
\`\`\`

### 5.3 매개변수가 있는 생성자

\`\`\`java
public class Person {
    String name;
    int age;
    
    // 매개변수가 있는 생성자
    public Person(String name, int age) {
        this.name = name;  // this = 현재 객체
        this.age = age;
    }
}

// 사용
Person p = new Person("홍길동", 25);
\`\`\`

### 5.4 생성자 오버로딩

\`\`\`java
public class Person {
    String name;
    int age;
    
    // 생성자 1: 기본
    public Person() {
        this("이름 없음", 0);  // 다른 생성자 호출
    }
    
    // 생성자 2: 이름만
    public Person(String name) {
        this(name, 0);
    }
    
    // 생성자 3: 전체
    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }
}
\`\`\`

---

## 6. this 키워드

\`this\`는 **현재 객체 자신**을 가리키는 참조입니다.

### 6.1 필드와 매개변수 구분

\`\`\`java
public class Person {
    String name;
    
    public Person(String name) {
        this.name = name;  // this.name = 필드, name = 매개변수
    }
}
\`\`\`

### 6.2 다른 생성자 호출

\`\`\`java
public class Person {
    String name;
    int age;
    
    public Person() {
        this("기본", 0);  // 다른 생성자 호출 (첫 줄에서만 가능)
    }
    
    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }
}
\`\`\`

---

## 7. 인스턴스 변수 vs 클래스 변수 (static)

### 7.1 인스턴스 변수

각 객체마다 **별도로** 존재합니다.

\`\`\`java
public class Person {
    String name;  // 인스턴스 변수
}

Person p1 = new Person();
Person p2 = new Person();
p1.name = "홍길동";
p2.name = "김철수";  // p1과 p2는 각각 다른 name을 가짐
\`\`\`

### 7.2 클래스 변수 (static)

모든 객체가 **공유**합니다. 클래스 레벨에 존재합니다.

\`\`\`java
public class Person {
    String name;              // 인스턴스 변수
    static int totalCount;    // 클래스 변수 (공유)
    
    public Person(String name) {
        this.name = name;
        totalCount++;  // 객체 생성될 때마다 증가
    }
}

Person p1 = new Person("홍길동");
Person p2 = new Person("김철수");
System.out.println(Person.totalCount);  // 2 (클래스명으로 접근 권장)
\`\`\`

### 7.3 static 메서드

\`\`\`java
public class Calculator {
    public static int add(int a, int b) {
        return a + b;
    }
}

// 객체 생성 없이 호출
int result = Calculator.add(5, 3);
\`\`\`

> **주의**: static 메서드에서는 인스턴스 변수에 **직접 접근할 수 없습니다**.
`,
    codeExamples: [
        {
            title: "클래스 정의와 객체 생성",
            language: "java",
            code: `public class Car {
    // 필드 (속성)
    String brand;
    String model;
    int year;
    double fuelLevel;
    
    // 생성자
    public Car(String brand, String model, int year) {
        this.brand = brand;
        this.model = model;
        this.year = year;
        this.fuelLevel = 100.0;  // 기본 연료량
    }
    
    // 메서드 (동작)
    public void drive(double distance) {
        double fuelUsed = distance * 0.1;  // 1km당 0.1L 소비
        if (fuelLevel >= fuelUsed) {
            fuelLevel -= fuelUsed;
            System.out.println(distance + "km 주행 완료. 남은 연료: " + fuelLevel + "L");
        } else {
            System.out.println("연료 부족!");
        }
    }
    
    public void refuel(double amount) {
        fuelLevel += amount;
        System.out.println("주유 완료. 현재 연료: " + fuelLevel + "L");
    }
    
    public void showInfo() {
        System.out.println(year + " " + brand + " " + model);
    }
}

// Main 클래스
public class Main {
    public static void main(String[] args) {
        Car myCar = new Car("Tesla", "Model 3", 2023);
        myCar.showInfo();     // 2023 Tesla Model 3
        myCar.drive(100);     // 100km 주행 완료. 남은 연료: 90.0L
        myCar.refuel(20);     // 주유 완료. 현재 연료: 110.0L
    }
}`
        },
        {
            title: "static 변수와 메서드",
            language: "java",
            code: `public class BankAccount {
    // 인스턴스 변수
    private String owner;
    private double balance;
    
    // 클래스 변수 (static)
    private static double interestRate = 0.02;  // 이자율 (모든 계좌 공통)
    private static int totalAccounts = 0;       // 총 계좌 수
    
    public BankAccount(String owner, double initialDeposit) {
        this.owner = owner;
        this.balance = initialDeposit;
        totalAccounts++;  // 객체 생성될 때마다 증가
    }
    
    // 인스턴스 메서드
    public void deposit(double amount) {
        balance += amount;
    }
    
    // static 메서드
    public static int getTotalAccounts() {
        return totalAccounts;
    }
    
    public static void setInterestRate(double rate) {
        interestRate = rate;
    }
    
    public void applyInterest() {
        balance += balance * interestRate;
    }
    
    public void showInfo() {
        System.out.println("소유자: " + owner + ", 잔액: " + balance);
    }
}

public class Main {
    public static void main(String[] args) {
        // static 메서드는 클래스명으로 호출
        System.out.println("총 계좌 수: " + BankAccount.getTotalAccounts());  // 0
        
        BankAccount acc1 = new BankAccount("홍길동", 10000);
        BankAccount acc2 = new BankAccount("김철수", 20000);
        
        System.out.println("총 계좌 수: " + BankAccount.getTotalAccounts());  // 2
        
        // 이자율 변경 (모든 계좌에 적용)
        BankAccount.setInterestRate(0.03);
        
        acc1.applyInterest();
        acc2.applyInterest();
        
        acc1.showInfo();  // 잔액: 10300.0
        acc2.showInfo();  // 잔액: 20600.0
    }
}`
        }
    ],
    keyPoints: [
        "클래스는 객체의 설계도이며, 객체는 클래스의 인스턴스(실체)입니다.",
        "생성자는 객체 생성 시 자동 호출되며, 클래스명과 같고 반환 타입이 없습니다.",
        "this는 현재 객체 자신을 가리키며, 필드와 매개변수 이름이 같을 때 구분에 사용됩니다.",
        "static 변수는 모든 객체가 공유하고, static 메서드는 객체 없이 호출할 수 있습니다.",
        "static 메서드에서는 인스턴스 변수에 직접 접근할 수 없습니다."
    ],
    interviewQuestions: [
        {
            difficulty: 'Easy',
            question: "클래스와 객체(인스턴스)의 차이는?",
            answer: "클래스는 객체를 만들기 위한 설계도(틀)이고, 객체는 그 설계도를 통해 메모리에 실제 생성된 실체입니다."
        },
        {
            difficulty: 'Medium',
            question: "static 메서드에서 인스턴스 변수를 사용할 수 없는 이유는?",
            answer: "static 메서드는 객체 생성 없이 실행될 수 있지만, 인스턴스 변수는 객체가 생성되어야만 존재하기 때문입니다. (시점의 차이)"
        }
    ]
};
