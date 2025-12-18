import type { Module } from '../../curriculumData';

export const methods: Module = {
    id: "methods",
    title: "Chapter 8: 메서드 (Method)",
    topic: "메서드 정의, 매개변수, 반환값, 오버로딩, 가변인자, 재귀",
    content: `
## 1. 메서드(Method)란?

**메서드**는 특정 작업을 수행하는 **코드의 묶음**입니다. 다른 언어에서는 함수(function)라고 부르기도 합니다.

### 왜 메서드를 사용하는가?
1. **코드 재사용**: 같은 코드를 여러 번 작성하지 않아도 됨
2. **가독성 향상**: 코드를 논리적 단위로 분리
3. **유지보수 용이**: 수정이 필요하면 한 곳만 변경

---

## 2. 메서드 정의

### 2.1 기본 구조

\`\`\`java
접근제어자 반환타입 메서드명(매개변수) {
    // 실행할 코드
    return 반환값;  // 반환타입이 void가 아닌 경우
}
\`\`\`

### 2.2 예시

\`\`\`java
public static int add(int a, int b) {
    int sum = a + b;
    return sum;
}
\`\`\`

| 요소 | 설명 |
|------|------|
| \`public\` | 접근 제어자 (어디서나 접근 가능) |
| \`static\` | 정적 메서드 (객체 생성 없이 호출 가능) |
| \`int\` | 반환 타입 (정수를 반환) |
| \`add\` | 메서드 이름 |
| \`(int a, int b)\` | 매개변수 (입력값) |

---

## 3. 메서드 호출

\`\`\`java
public class Calculator {
    public static void main(String[] args) {
        // 메서드 호출
        int result = add(5, 3);
        System.out.println("결과: " + result);  // 8
    }
    
    public static int add(int a, int b) {
        return a + b;
    }
}
\`\`\`

---

## 4. 반환 타입

### 4.1 void (반환값 없음)

\`\`\`java
public static void printMessage(String msg) {
    System.out.println(msg);
    // return 생략 가능 (또는 return;만 작성)
}
\`\`\`

### 4.2 기본형 반환

\`\`\`java
public static int getMax(int a, int b) {
    return (a > b) ? a : b;
}
\`\`\`

### 4.3 참조형 반환

\`\`\`java
public static String getGreeting(String name) {
    return "안녕하세요, " + name + "님!";
}
\`\`\`

---

## 5. 매개변수 (Parameters)

### 5.1 기본 매개변수

\`\`\`java
public static void greet(String name, int age) {
    System.out.println(name + "님, " + age + "세 환영합니다!");
}

// 호출
greet("홍길동", 25);
\`\`\`

### 5.2 Call by Value

Java는 **값에 의한 호출**입니다. 메서드에 전달되는 것은 값의 복사본입니다.

\`\`\`java
public static void main(String[] args) {
    int num = 10;
    changeValue(num);
    System.out.println(num);  // 10 (변경되지 않음!)
}

public static void changeValue(int n) {
    n = 100;  // 복사본만 변경
}
\`\`\`

### 5.3 배열/객체의 경우

참조형의 경우, 참조값(주소)이 복사되므로 **내용 변경은 반영**됩니다.

\`\`\`java
public static void main(String[] args) {
    int[] arr = {1, 2, 3};
    changeArray(arr);
    System.out.println(arr[0]);  // 100 (변경됨!)
}

public static void changeArray(int[] a) {
    a[0] = 100;  // 같은 배열을 참조
}
\`\`\`

---

## 6. 메서드 오버로딩 (Overloading)

**같은 이름**의 메서드를 **매개변수를 다르게** 하여 여러 개 정의할 수 있습니다.

\`\`\`java
public static int add(int a, int b) {
    return a + b;
}

public static int add(int a, int b, int c) {
    return a + b + c;
}

public static double add(double a, double b) {
    return a + b;
}

// 호출
add(1, 2);        // 첫 번째 메서드
add(1, 2, 3);     // 두 번째 메서드
add(1.5, 2.5);    // 세 번째 메서드
\`\`\`

### 오버로딩 조건
- 매개변수의 **개수**가 다르거나
- 매개변수의 **타입**이 다르거나
- 매개변수의 **순서**가 다르면 (권장하지 않음)

> **주의**: 반환 타입만 다른 것은 오버로딩이 아닙니다!

---

## 7. 가변인자 (Varargs)

매개변수 개수가 정해지지 않았을 때 사용합니다.

\`\`\`java
public static int sum(int... numbers) {
    int total = 0;
    for (int n : numbers) {
        total += n;
    }
    return total;
}

// 호출
sum(1, 2);           // 3
sum(1, 2, 3, 4, 5);  // 15
sum();               // 0
\`\`\`

> **규칙**: 가변인자는 매개변수 목록의 **마지막**에 와야 합니다.

---

## 8. 재귀 메서드 (Recursion)

**자기 자신을 호출**하는 메서드입니다.

\`\`\`java
public static int factorial(int n) {
    if (n <= 1) {
        return 1;  // 기본 케이스 (탈출 조건)
    }
    return n * factorial(n - 1);  // 재귀 호출
}

// factorial(5) = 5 * 4 * 3 * 2 * 1 = 120
\`\`\`

### 재귀의 필수 요소
1. **기본 케이스 (Base Case)**: 재귀를 멈추는 조건
2. **재귀 단계**: 문제를 더 작은 부분으로 분할
`,
    codeExamples: [
        {
            title: "메서드 정의와 오버로딩",
            language: "java",
            code: `public class MethodDemo {
    public static void main(String[] args) {
        // 1. 기본 메서드 호출
        sayHello();
        
        // 2. 매개변수와 반환값
        String greeting = greet("홍길동");
        System.out.println(greeting);
        
        // 3. 오버로딩
        System.out.println("2 + 3 = " + add(2, 3));
        System.out.println("2 + 3 + 4 = " + add(2, 3, 4));
        System.out.println("2.5 + 3.5 = " + add(2.5, 3.5));
        
        // 4. 가변인자
        System.out.println("합계: " + sum(1, 2, 3, 4, 5));
    }
    
    // 반환값 없는 메서드
    public static void sayHello() {
        System.out.println("안녕하세요!");
    }
    
    // 반환값 있는 메서드
    public static String greet(String name) {
        return "환영합니다, " + name + "님!";
    }
    
    // 오버로딩 - 정수 2개
    public static int add(int a, int b) {
        return a + b;
    }
    
    // 오버로딩 - 정수 3개
    public static int add(int a, int b, int c) {
        return a + b + c;
    }
    
    // 오버로딩 - 실수 2개
    public static double add(double a, double b) {
        return a + b;
    }
    
    // 가변인자
    public static int sum(int... numbers) {
        int total = 0;
        for (int n : numbers) {
            total += n;
        }
        return total;
    }
}`
        },
        {
            title: "재귀 메서드 예제",
            language: "java",
            code: `public class RecursionDemo {
    public static void main(String[] args) {
        // 1. 팩토리얼
        System.out.println("5! = " + factorial(5));  // 120
        
        // 2. 피보나치 수열
        System.out.print("피보나치: ");
        for (int i = 0; i < 10; i++) {
            System.out.print(fibonacci(i) + " ");
        }
        System.out.println();
        // 0 1 1 2 3 5 8 13 21 34
        
        // 3. 거듭제곱
        System.out.println("2^10 = " + power(2, 10));  // 1024
    }
    
    // 팩토리얼: n! = n * (n-1) * ... * 1
    public static int factorial(int n) {
        if (n <= 1) return 1;  // 기본 케이스
        return n * factorial(n - 1);
    }
    
    // 피보나치: F(n) = F(n-1) + F(n-2)
    public static int fibonacci(int n) {
        if (n <= 0) return 0;
        if (n == 1) return 1;
        return fibonacci(n - 1) + fibonacci(n - 2);
    }
    
    // 거듭제곱: x^n
    public static long power(int x, int n) {
        if (n == 0) return 1;
        if (n == 1) return x;
        // 분할 정복: x^n = x^(n/2) * x^(n/2)
        long half = power(x, n / 2);
        if (n % 2 == 0) {
            return half * half;
        } else {
            return half * half * x;
        }
    }
}`
        }
    ],
    keyPoints: [
        "메서드는 코드 재사용성, 가독성, 유지보수성을 높이는 핵심 구조입니다.",
        "Java는 Call by Value입니다. 기본형은 값이 복사되고, 참조형은 주소가 복사됩니다.",
        "오버로딩은 같은 이름의 메서드를 매개변수를 다르게 하여 여러 개 정의하는 것입니다.",
        "가변인자(...)를 사용하면 매개변수 개수를 유연하게 받을 수 있습니다.",
        "재귀 메서드는 반드시 기본 케이스(탈출 조건)가 있어야 무한 호출을 방지합니다."
    ],
    interviewQuestions: [
        {
            difficulty: 'Medium',
            question: "Java는 Call by Value인가요, Call by Reference인가요?",
            answer: "Java는 항상 **Call by Value**입니다. 기본형은 값 자체가 복사되고, 참조형은 '주소값'이 복사되어 전달됩니다. 객체 자체를 공유하는 것처럼 보이지만 실제로는 주소값을 복사해 주는 것입니다."
        },
        {
            difficulty: 'Easy',
            question: "오버로딩(Overloading)의 조건은 무엇인가요?",
            answer: "메서드 이름이 같아야 하고, 매개변수의 개수나 타입이 달라야 합니다. 반환 타입만 다른 경우는 오버로딩이 아닙니다."
        }
    ]
};
