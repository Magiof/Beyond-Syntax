import type { Module } from '../../curriculumData';

export const encapsulation: Module = {
    id: "encapsulation",
    title: "Chapter 10: 접근 제어자와 캡슐화",
    topic: "public/private/protected/default, getter/setter, 정보 은닉",
    content: `
## 1. 접근 제어자 (Access Modifiers)

**접근 제어자**는 클래스, 변수, 메서드에 대한 **접근 범위를 제한**하는 키워드입니다.

### 1.1 4가지 접근 제어자

| 제어자 | 같은 클래스 | 같은 패키지 | 자식 클래스 | 전체 |
|--------|-------------|-------------|-------------|------|
| \`public\` | ✅ | ✅ | ✅ | ✅ |
| \`protected\` | ✅ | ✅ | ✅ | ❌ |
| \`(default)\` | ✅ | ✅ | ❌ | ❌ |
| \`private\` | ✅ | ❌ | ❌ | ❌ |

### 1.2 사용 예시

\`\`\`java
public class Person {
    public String name;          // 어디서나 접근 가능
    protected int age;           // 같은 패키지 + 자식 클래스
    String address;              // (default) 같은 패키지만
    private String password;     // 같은 클래스만
}
\`\`\`

---

## 2. 캡슐화 (Encapsulation)

**캡슐화**는 데이터(필드)와 그 데이터를 처리하는 메서드를 하나로 묶고, **외부에서 직접 접근하지 못하게 숨기는** 것입니다.

### 2.1 왜 캡슐화가 필요한가?

\`\`\`java
// 나쁜 예: 필드를 public으로 노출
public class BankAccount {
    public double balance;
}

BankAccount acc = new BankAccount();
acc.balance = -10000;  // 음수 잔액! 유효성 검사 없음
\`\`\`

\`\`\`java
// 좋은 예: private + 메서드로 제어
public class BankAccount {
    private double balance;
    
    public void deposit(double amount) {
        if (amount > 0) {
            balance += amount;
        }
    }
    
    public boolean withdraw(double amount) {
        if (amount > 0 && balance >= amount) {
            balance -= amount;
            return true;
        }
        return false;
    }
    
    public double getBalance() {
        return balance;
    }
}
\`\`\`

### 캡슐화의 장점
1. **데이터 보호**: 잘못된 값 설정 방지
2. **유연성**: 내부 구현 변경 시 외부 코드에 영향 없음
3. **유지보수성**: 변경이 한 곳에서만 이루어짐

---

## 3. Getter와 Setter

**Getter**와 **Setter**는 private 필드에 접근하기 위한 public 메서드입니다.

### 3.1 Getter (Accessor)

필드 값을 **읽기** 위한 메서드입니다.

\`\`\`java
public class Person {
    private String name;
    
    // Getter
    public String getName() {
        return name;
    }
}
\`\`\`

### 3.2 Setter (Mutator)

필드 값을 **변경**하기 위한 메서드입니다.

\`\`\`java
public class Person {
    private String name;
    private int age;
    
    // Setter with validation
    public void setName(String name) {
        if (name != null && !name.isEmpty()) {
            this.name = name;
        }
    }
    
    public void setAge(int age) {
        if (age >= 0 && age <= 150) {
            this.age = age;
        }
    }
}
\`\`\`

### 3.3 읽기 전용 (Immutable) 패턴

Setter를 제공하지 않으면 불변 객체가 됩니다.

\`\`\`java
public class ImmutablePerson {
    private final String name;
    private final int age;
    
    public ImmutablePerson(String name, int age) {
        this.name = name;
        this.age = age;
    }
    
    public String getName() { return name; }
    public int getAge() { return age; }
    // Setter 없음 → 불변!
}
\`\`\`

---

## 4. 자바빈 규약 (JavaBean Convention)

### 4.1 규칙
1. 기본 생성자가 있어야 함
2. 모든 필드는 private
3. 필드마다 getter/setter 제공
4. Serializable 구현 (선택)

### 4.2 boolean 타입 Getter

boolean 필드의 getter는 \`is\`로 시작합니다.

\`\`\`java
public class User {
    private boolean active;
    
    public boolean isActive() {  // getActive() 대신 isActive()
        return active;
    }
    
    public void setActive(boolean active) {
        this.active = active;
    }
}
\`\`\`

---

## 5. 실전 예제: 학생 클래스

\`\`\`java
public class Student {
    // private 필드
    private String studentId;
    private String name;
    private int score;
    
    // 생성자
    public Student(String studentId, String name) {
        this.studentId = studentId;
        this.name = name;
        this.score = 0;
    }
    
    // Getter
    public String getStudentId() { return studentId; }
    public String getName() { return name; }
    public int getScore() { return score; }
    
    // Setter with validation
    public void setScore(int score) {
        if (score >= 0 && score <= 100) {
            this.score = score;
        } else {
            System.out.println("점수는 0~100 사이여야 합니다.");
        }
    }
    
    // 비즈니스 메서드
    public char getGrade() {
        if (score >= 90) return 'A';
        if (score >= 80) return 'B';
        if (score >= 70) return 'C';
        if (score >= 60) return 'D';
        return 'F';
    }
}
\`\`\`
`,
    codeExamples: [
        {
            title: "캡슐화 적용 전후 비교",
            language: "java",
            code: `// ===== 캡슐화 적용 전 (나쁜 예) =====
class BadBankAccount {
    public double balance;
    public String owner;
}

// 문제점:
BadBankAccount bad = new BadBankAccount();
bad.balance = -50000;  // 음수 잔액 허용!
bad.owner = "";        // 빈 이름 허용!


// ===== 캡슐화 적용 후 (좋은 예) =====
class GoodBankAccount {
    private String accountNumber;
    private String owner;
    private double balance;
    
    public GoodBankAccount(String accountNumber, String owner) {
        this.accountNumber = accountNumber;
        setOwner(owner);  // 유효성 검사 포함
        this.balance = 0;
    }
    
    // Getter
    public String getAccountNumber() { return accountNumber; }
    public String getOwner() { return owner; }
    public double getBalance() { return balance; }
    
    // Setter with validation
    public void setOwner(String owner) {
        if (owner != null && owner.length() >= 2) {
            this.owner = owner;
        } else {
            throw new IllegalArgumentException("이름은 2자 이상이어야 합니다.");
        }
    }
    
    // 비즈니스 로직
    public void deposit(double amount) {
        if (amount > 0) {
            balance += amount;
            System.out.println(amount + "원 입금. 잔액: " + balance);
        }
    }
    
    public boolean withdraw(double amount) {
        if (amount > 0 && balance >= amount) {
            balance -= amount;
            System.out.println(amount + "원 출금. 잔액: " + balance);
            return true;
        }
        System.out.println("출금 실패. 잔액 부족 또는 잘못된 금액.");
        return false;
    }
}`
        },
        {
            title: "접근 제어자 실습",
            language: "java",
            code: `// Person.java
package com.example.model;

public class Person {
    public String publicField = "public";
    protected String protectedField = "protected";
    String defaultField = "default";  // package-private
    private String privateField = "private";
    
    public void showAll() {
        // 같은 클래스 내에서는 모두 접근 가능
        System.out.println(publicField);
        System.out.println(protectedField);
        System.out.println(defaultField);
        System.out.println(privateField);
    }
}

// Test.java (같은 패키지)
package com.example.model;

public class Test {
    public void test() {
        Person p = new Person();
        System.out.println(p.publicField);     // ✅ OK
        System.out.println(p.protectedField);  // ✅ OK (같은 패키지)
        System.out.println(p.defaultField);    // ✅ OK (같은 패키지)
        // System.out.println(p.privateField); // ❌ 컴파일 에러!
    }
}

// OtherPackage.java (다른 패키지)
package com.example.other;

import com.example.model.Person;

public class OtherPackage {
    public void test() {
        Person p = new Person();
        System.out.println(p.publicField);     // ✅ OK
        // System.out.println(p.protectedField); // ❌ 다른 패키지
        // System.out.println(p.defaultField);   // ❌ 다른 패키지
        // System.out.println(p.privateField);   // ❌ private
    }
}`
        }
    ],
    keyPoints: [
        "접근 제어자는 public(전체) > protected(상속) > default(패키지) > private(클래스) 순으로 범위가 좁아집니다.",
        "캡슐화는 필드를 private으로 숨기고 메서드로 접근하게 하여 데이터를 보호합니다.",
        "Getter는 필드 값을 읽고, Setter는 유효성 검사 후 값을 설정합니다.",
        "boolean 타입의 Getter는 is로 시작합니다 (isActive, isValid 등).",
        "불변 객체를 만들려면 모든 필드를 final로 선언하고 Setter를 제공하지 않습니다."
    ],
    interviewQuestions: [
        {
            difficulty: 'Easy',
            question: "접근 제어자 4가지를 범위가 넓은 순서대로 나열하세요.",
            answer: "public > protected > default(package-private) > private"
        },
        {
            difficulty: 'Medium',
            question: "캡슐화(Encapsulation)를 하는 주된 목적은?",
            answer: "객체의 내부 데이터를 외부의 잘못된 접근으로부터 보호(정보 은닉)하고, 객체의 사용 방법(인터페이스)만 노출하여 결합도를 낮추기 위함입니다."
        }
    ]
};
