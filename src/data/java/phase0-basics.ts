import type { Phase } from '../curriculumData';

export const javaBasicsPhase: Phase = {
    id: "phase0",
    title: "Phase 0: Java 완전 기초",
    goal: "Java 문법을 처음부터 체계적으로 학습합니다. 변수, 조건문, 반복문, 클래스, 객체지향까지 공식 문서 수준으로 상세하게 다룹니다.",
    modules: [
        {
            id: "p0-m1",
            title: "Chapter 1: Java란 무엇인가",
            topic: "Java의 역사, 특징, JDK/JRE/JVM의 차이, 첫 프로그램 작성",
            content: `
## 1. Java란 무엇인가? 

**Java**는 1995년 Sun Microsystems(현재 Oracle)의 제임스 고슬링(James Gosling)이 개발한 **객체지향 프로그래밍 언어**입니다.

### 1.1 Java의 탄생 배경

Java는 원래 가전제품에 들어가는 소프트웨어를 만들기 위해 개발되었습니다. 당시 C++은 플랫폼마다 다시 컴파일해야 했고, 메모리 관리가 어려웠습니다. Java는 이 문제를 해결하기 위해 **"Write Once, Run Anywhere"**(한 번 작성하면 어디서든 실행)를 목표로 설계되었습니다.

### 1.2 Java의 핵심 특징

#### 1) 플랫폼 독립성 (Platform Independence)
Java 코드는 **바이트코드(.class)** 로 컴파일되고, 이 바이트코드는 **JVM(Java Virtual Machine)** 위에서 실행됩니다. JVM만 설치되어 있다면 Windows, Mac, Linux 어디서든 동일하게 동작합니다.

\`\`\`
[소스코드 .java] → javac 컴파일러 → [바이트코드 .class] → JVM → 실행
\`\`\`

#### 2) 객체지향 프로그래밍 (OOP)
Java는 **완전한 객체지향 언어**입니다. 모든 코드는 **클래스(Class)** 안에 작성되어야 하며, **캡슐화**, **상속**, **다형성**, **추상화**의 4대 원칙을 지원합니다.

#### 3) 자동 메모리 관리 (Garbage Collection)
C/C++에서는 개발자가 직접 메모리를 할당(malloc)하고 해제(free)해야 합니다. Java는 **가비지 컬렉터(GC)** 가 사용하지 않는 객체를 자동으로 정리해줍니다.

#### 4) 강력한 타입 체크 (Strongly Typed)
Java는 **정적 타입(Static Typing)** 언어입니다. 변수를 선언할 때 반드시 타입을 명시해야 하며, 컴파일 시점에 타입 오류를 검사합니다.

#### 5) 멀티스레딩 지원
Java는 언어 차원에서 **멀티스레딩**을 지원합니다. \`Thread\` 클래스와 \`Runnable\` 인터페이스를 통해 동시에 여러 작업을 처리할 수 있습니다.

---

## 2. JDK, JRE, JVM의 차이

Java를 처음 배울 때 가장 혼란스러운 개념입니다. 정확히 구분해봅시다.

### 2.1 JVM (Java Virtual Machine)
- **정의**: 바이트코드(.class)를 실행하는 가상 머신
- **역할**: 바이트코드를 해당 OS가 이해할 수 있는 기계어로 변환하여 실행
- **특징**: 플랫폼마다 다른 JVM이 존재 (Windows용 JVM, Mac용 JVM 등)

### 2.2 JRE (Java Runtime Environment)
- **정의**: Java 프로그램을 **실행**하기 위한 환경
- **구성**: JVM + 핵심 라이브러리(java.lang, java.util 등)
- **용도**: Java 프로그램을 실행만 하는 사용자에게 필요

### 2.3 JDK (Java Development Kit)
- **정의**: Java 프로그램을 **개발**하기 위한 도구 모음
- **구성**: JRE + 컴파일러(javac) + 디버거 + 개발 도구
- **용도**: Java 개발자에게 필요

\`\`\`
JDK (개발 도구)
 ├── JRE (실행 환경)
 │    ├── JVM (가상 머신)
 │    └── 핵심 라이브러리
 ├── javac (컴파일러)
 ├── java (실행기)
 ├── javadoc (문서 생성)
 └── jar (압축 도구)
\`\`\`

---

## 3. 개발 환경 설정

### 3.1 JDK 설치
1. [Oracle JDK](https://www.oracle.com/java/technologies/downloads/) 또는 [OpenJDK](https://adoptium.net/) 다운로드
2. 운영체제에 맞는 버전 설치
3. 환경 변수 설정 (JAVA_HOME, PATH)

### 3.2 설치 확인
터미널(명령 프롬프트)에서 다음 명령어로 확인:

\`\`\`bash
java -version    # JRE/JVM 버전 확인
javac -version   # 컴파일러 버전 확인
\`\`\`

---

## 4. 첫 번째 프로그램: Hello World

모든 프로그래밍 언어 학습의 시작, Hello World를 작성해봅시다.

### 4.1 코드 작성

\`\`\`java
// 파일명: HelloWorld.java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
\`\`\`

### 4.2 코드 분석 (한 줄씩 이해하기)

| 코드 | 설명 |
|------|------|
| \`public class HelloWorld\` | HelloWorld라는 이름의 공개(public) 클래스 선언. 파일명과 클래스명이 **반드시 일치**해야 함 |
| \`public static void main(String[] args)\` | 프로그램의 **시작점(Entry Point)**. JVM은 이 메서드부터 실행 시작 |
| \`System.out.println(...)\` | 콘솔에 텍스트를 출력하고 줄바꿈 |

### 4.3 컴파일과 실행

\`\`\`bash
# 1. 컴파일 (소스코드 → 바이트코드)
javac HelloWorld.java

# 2. 실행 (바이트코드 실행)
java HelloWorld

# 출력: Hello, World!
\`\`\`

### 4.4 main 메서드의 구성 요소

\`\`\`java
public static void main(String[] args)
\`\`\`

| 키워드 | 의미 |
|--------|------|
| \`public\` | 접근 제어자. 어디서든 접근 가능 |
| \`static\` | 정적 메서드. 객체 생성 없이 호출 가능 |
| \`void\` | 반환 타입. 아무것도 반환하지 않음 |
| \`main\` | 메서드 이름. JVM이 찾는 고정된 이름 |
| \`String[] args\` | 매개변수. 명령줄 인자를 배열로 받음 |
`,
            codeExamples: [
                {
                    title: "Hello World 기본",
                    language: "java",
                    code: `public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`
                },
                {
                    title: "명령줄 인자 사용하기",
                    language: "java",
                    code: `public class Greeting {
    public static void main(String[] args) {
        // args 배열에 명령줄 인자가 들어옴
        if (args.length > 0) {
            System.out.println("안녕하세요, " + args[0] + "님!");
        } else {
            System.out.println("안녕하세요!");
        }
    }
}

// 실행: java Greeting 홍길동
// 출력: 안녕하세요, 홍길동님!`
                }
            ],
            keyPoints: [
                "Java는 '한 번 작성하면 어디서든 실행(Write Once, Run Anywhere)'을 목표로 설계된 객체지향 언어입니다.",
                "JDK는 개발 도구, JRE는 실행 환경, JVM은 바이트코드를 실행하는 가상 머신입니다.",
                "모든 Java 코드는 클래스 안에 작성되어야 합니다.",
                "main 메서드는 프로그램의 시작점이며, public static void main(String[] args) 형식이어야 합니다.",
                "소스 파일(.java)은 javac로 컴파일하여 바이트코드(.class)를 생성하고, java 명령으로 실행합니다."
            ],
            interviewQuestions: [
                {
                    difficulty: 'Easy',
                    question: "JDK, JRE, JVM의 차이점을 설명해주세요.",
                    answer: "JDK는 개발 도구(javac 등)를 포함하고, JRE는 실행 환경(라이브러리)을 포함하며, JVM은 실제로 바이트코드를 실행하는 가상 머신입니다. (JDK ⊃ JRE ⊃ JVM)"
                },
                {
                    difficulty: 'Medium',
                    question: "main 메서드가 public static void인 이유는 무엇인가요?",
                    answer: "JVM이 외부에서 접근해야 하므로 public, 객체 생성 없이 실행해야 하므로 static, 반환값이 없으므로 void이어야 합니다."
                }
            ]
        },
        {
            id: "p0-m2",
            title: "Chapter 2: 변수와 자료형",
            topic: "변수 선언, 기본형 8가지, 참조형, 형변환, 리터럴, 상수",
            content: `
## 1. 변수(Variable)란?

**변수**는 데이터를 저장하기 위한 **메모리 공간의 이름**입니다.

### 1.1 변수의 선언과 초기화

\`\`\`java
// 선언: 타입과 변수명 지정
int age;

// 초기화: 값 할당
age = 25;

// 선언과 초기화를 동시에
int height = 175;
\`\`\`

### 1.2 변수 명명 규칙

| 규칙 | 예시 |
|------|------|
| 첫 글자는 문자, $, _ 만 가능 | \`name\`, \`$price\`, \`_count\` ✅ |
| 숫자로 시작 불가 | \`1stPlace\` ❌ |
| 예약어 사용 불가 | \`int\`, \`class\`, \`public\` ❌ |
| 대소문자 구분 | \`Name\`과 \`name\`은 다른 변수 |

### 1.3 Java 네이밍 컨벤션

| 종류 | 표기법 | 예시 |
|------|--------|------|
| 변수, 메서드 | camelCase | \`firstName\`, \`getUserName()\` |
| 클래스, 인터페이스 | PascalCase | \`Person\`, \`ArrayList\` |
| 상수 | SCREAMING_SNAKE_CASE | \`MAX_VALUE\`, \`PI\` |

---

## 2. 자료형(Data Type)

Java의 자료형은 크게 **기본형(Primitive Type)** 과 **참조형(Reference Type)** 으로 나뉩니다.

### 2.1 기본형 (Primitive Types) - 총 8가지

기본형은 **실제 값**을 저장합니다.

#### 정수형

| 타입 | 크기 | 범위 | 기본값 |
|------|------|------|--------|
| \`byte\` | 1 byte | -128 ~ 127 | 0 |
| \`short\` | 2 bytes | -32,768 ~ 32,767 | 0 |
| \`int\` | 4 bytes | 약 -21억 ~ 21억 | 0 |
| \`long\` | 8 bytes | 약 ±922경 | 0L |

\`\`\`java
int number = 100;        // 일반적인 정수
long bigNumber = 100L;   // 큰 정수 (L 접미사 필수)
\`\`\`

#### 실수형

| 타입 | 크기 | 정밀도 | 기본값 |
|------|------|--------|--------|
| \`float\` | 4 bytes | 약 7자리 | 0.0f |
| \`double\` | 8 bytes | 약 15자리 | 0.0d |

\`\`\`java
float pi = 3.14f;         // float은 f 접미사 필수
double precise = 3.141592653589793;  // 더 정밀한 실수
\`\`\`

#### 문자형

| 타입 | 크기 | 설명 | 기본값 |
|------|------|------|--------|
| \`char\` | 2 bytes | 유니코드 문자 1개 | '\\u0000' |

\`\`\`java
char letter = 'A';         // 작은따옴표 사용
char korean = '가';        // 한글도 저장 가능
char unicode = '\\u0041';  // 유니코드로 'A'
\`\`\`

#### 논리형

| 타입 | 크기 | 값 | 기본값 |
|------|------|------|--------|
| \`boolean\` | 1 bit | true 또는 false | false |

\`\`\`java
boolean isAdult = true;
boolean hasLicense = false;
\`\`\`

### 2.2 참조형 (Reference Types)

참조형은 **객체의 주소(참조값)** 를 저장합니다.

- **클래스**: \`String\`, \`ArrayList\`, 사용자 정의 클래스
- **인터페이스**: \`List\`, \`Map\`, \`Runnable\`
- **배열**: \`int[]\`, \`String[]\`
- **열거형**: \`enum\`

\`\`\`java
String name = "홍길동";     // String은 참조형 (클래스)
int[] numbers = {1, 2, 3}; // 배열도 참조형
\`\`\`

---

## 3. 리터럴 (Literal)

**리터럴**은 코드에 직접 작성된 값 자체를 말합니다.

\`\`\`java
int a = 100;        // 100은 정수 리터럴
double b = 3.14;    // 3.14는 실수 리터럴
char c = 'X';       // 'X'는 문자 리터럴
String s = "Hello"; // "Hello"는 문자열 리터럴
boolean t = true;   // true는 논리 리터럴
\`\`\`

### 진법 표현

\`\`\`java
int decimal = 100;      // 10진수
int binary = 0b1100100; // 2진수 (0b 접두사)
int octal = 0144;       // 8진수 (0 접두사)
int hex = 0x64;         // 16진수 (0x 접두사)
// 위 4개 모두 같은 값(100)
\`\`\`

---

## 4. 상수 (Constant)

**상수**는 값을 변경할 수 없는 변수입니다. \`final\` 키워드를 사용합니다.

\`\`\`java
final double PI = 3.141592653589793;
final int MAX_USERS = 100;

PI = 3.14;  // ❌ 컴파일 에러! 상수는 변경 불가
\`\`\`

---

## 5. 형변환 (Type Casting)

### 5.1 자동 형변환 (묵시적 형변환)

작은 타입에서 큰 타입으로는 자동 변환됩니다.

\`\`\`
byte → short → int → long → float → double
         ↑
        char
\`\`\`

\`\`\`java
int intValue = 100;
long longValue = intValue;    // int → long (자동)
double doubleValue = intValue; // int → double (자동)
\`\`\`

### 5.2 강제 형변환 (명시적 형변환)

큰 타입에서 작은 타입으로는 **명시적 캐스팅**이 필요합니다.

\`\`\`java
double pi = 3.14159;
int intPi = (int) pi;  // 3 (소수점 손실!)

long big = 10000000000L;
int small = (int) big; // 오버플로우 주의!
\`\`\`

### 5.3 주의사항

\`\`\`java
// 정수 나눗셈의 함정
int a = 5;
int b = 2;
double result1 = a / b;       // 2.0 (정수 나눗셈 먼저 수행)
double result2 = (double) a / b; // 2.5 (원하는 결과)
\`\`\`
`,
            codeExamples: [
                {
                    title: "기본형 변수 선언 및 사용",
                    language: "java",
                    code: `public class DataTypes {
    public static void main(String[] args) {
        // 정수형
        byte smallNum = 127;
        short mediumNum = 32000;
        int normalNum = 2_000_000_000;  // 언더스코어로 가독성 향상
        long bigNum = 9_000_000_000_000_000_000L;
        
        // 실수형
        float floatNum = 3.14f;
        double doubleNum = 3.141592653589793;
        
        // 문자형
        char letter = 'A';
        char korean = '가';
        
        // 논리형
        boolean isJavaFun = true;
        
        // 출력
        System.out.println("byte: " + smallNum);
        System.out.println("int: " + normalNum);
        System.out.println("double: " + doubleNum);
        System.out.println("char: " + letter);
        System.out.println("boolean: " + isJavaFun);
    }
}`
                },
                {
                    title: "형변환 예제",
                    language: "java",
                    code: `public class TypeCasting {
    public static void main(String[] args) {
        // 1. 자동 형변환 (작은 → 큰)
        int intVal = 100;
        long longVal = intVal;      // int → long
        float floatVal = longVal;   // long → float
        double doubleVal = floatVal; // float → double
        
        System.out.println("자동 형변환: " + doubleVal);
        
        // 2. 강제 형변환 (큰 → 작은)
        double pi = 3.99;
        int truncated = (int) pi;   // 3 (소수점 버림)
        System.out.println("강제 형변환: " + truncated);
        
        // 3. char와 int 변환
        char ch = 'A';
        int ascii = ch;             // 65
        char backToChar = (char) 66; // 'B'
        System.out.println("A의 ASCII: " + ascii);
        System.out.println("66의 문자: " + backToChar);
    }
}`
                }
            ],
            keyPoints: [
                "Java의 기본형은 8가지입니다: byte, short, int, long, float, double, char, boolean",
                "정수는 기본적으로 int, 실수는 double로 취급됩니다. long은 L, float은 f 접미사가 필요합니다.",
                "참조형은 객체의 메모리 주소를 저장하며, String, 배열, 클래스 등이 해당됩니다.",
                "final 키워드로 상수를 선언하면 값을 변경할 수 없습니다.",
                "작은 타입 → 큰 타입은 자동 형변환, 큰 타입 → 작은 타입은 (타입) 캐스팅이 필요합니다."
            ],
            interviewQuestions: [
                {
                    difficulty: 'Easy',
                    question: "기본형(Primitive)과 참조형(Reference)의 차이는 무엇인가요?",
                    answer: "기본형은 실제 값을 메모리(Stack)에 저장하고, 참조형은 객체의 주소값을 저장하여 Heap 영역의 객체를 가리킵니다."
                },
                {
                    difficulty: 'Medium',
                    question: "Java에서 정수 오버플로우가 발생하면 어떻게 되나요?",
                    answer: "에러가 발생하지 않고, 최소값으로 순환(Wrap-around)합니다. 예를 들어 int 최대값 + 1은 int 최소값이 됩니다."
                }
            ]
        },
        {
            id: "p0-m3",
            title: "Chapter 3: 연산자",
            topic: "산술, 비교, 논리, 대입, 비트, 삼항 연산자와 연산자 우선순위",
            content: `
## 1. 연산자(Operator)란?

**연산자**는 변수나 값에 대해 **연산을 수행**하는 기호입니다. 연산의 대상이 되는 것을 **피연산자(Operand)** 라고 합니다.

---

## 2. 산술 연산자 (Arithmetic Operators)

수학 계산에 사용하는 기본 연산자입니다.

| 연산자 | 의미 | 예시 | 결과 |
|--------|------|------|------|
| \`+\` | 덧셈 | \`5 + 3\` | 8 |
| \`-\` | 뺄셈 | \`5 - 3\` | 2 |
| \`*\` | 곱셈 | \`5 * 3\` | 15 |
| \`/\` | 나눗셈 | \`5 / 3\` | 1 (정수끼리는 정수) |
| \`%\` | 나머지 | \`5 % 3\` | 2 |

### 주의: 정수 나눗셈

\`\`\`java
int a = 7, b = 2;
int result1 = a / b;       // 3 (소수점 버림)
double result2 = a / b;    // 3.0 (여전히 정수 나눗셈 먼저!)
double result3 = (double) a / b;  // 3.5 (올바른 방법)
\`\`\`

---

## 3. 증감 연산자 (Increment/Decrement)

값을 1씩 증가시키거나 감소시킵니다.

| 연산자 | 의미 | 설명 |
|--------|------|------|
| \`++a\` | 전위 증가 | 먼저 증가시킨 후 값 사용 |
| \`a++\` | 후위 증가 | 값을 먼저 사용한 후 증가 |
| \`--a\` | 전위 감소 | 먼저 감소시킨 후 값 사용 |
| \`a--\` | 후위 감소 | 값을 먼저 사용한 후 감소 |

\`\`\`java
int a = 5;
System.out.println(a++);  // 5 출력 후 a는 6
System.out.println(++a);  // a가 7이 된 후 7 출력
\`\`\`

---

## 4. 비교 연산자 (Comparison Operators)

두 값을 비교하여 **boolean(true/false)** 을 반환합니다.

| 연산자 | 의미 | 예시 | 결과 |
|--------|------|------|------|
| \`==\` | 같다 | \`5 == 5\` | true |
| \`!=\` | 다르다 | \`5 != 3\` | true |
| \`>\` | 크다 | \`5 > 3\` | true |
| \`<\` | 작다 | \`5 < 3\` | false |
| \`>=\` | 크거나 같다 | \`5 >= 5\` | true |
| \`<=\` | 작거나 같다 | \`5 <= 3\` | false |

### 주의: 문자열 비교

\`\`\`java
String s1 = "Hello";
String s2 = "Hello";
String s3 = new String("Hello");

System.out.println(s1 == s2);      // true (같은 리터럴 참조)
System.out.println(s1 == s3);      // false (다른 객체!)
System.out.println(s1.equals(s3)); // true (내용 비교)
\`\`\`

> **중요**: 문자열 비교는 반드시 \`.equals()\` 메서드를 사용하세요!

---

## 5. 논리 연산자 (Logical Operators)

boolean 값들을 조합합니다.

| 연산자 | 의미 | 설명 |
|--------|------|------|
| \`&&\` | AND | 둘 다 true면 true |
| \`||\` | OR | 하나라도 true면 true |
| \`!\` | NOT | true↔false 반전 |

### 단락 평가 (Short-circuit Evaluation)

\`\`\`java
// && : 첫 번째가 false면 두 번째는 실행 안 함
if (false && someMethod()) { } // someMethod() 호출 안 됨

// || : 첫 번째가 true면 두 번째는 실행 안 함
if (true || someMethod()) { }  // someMethod() 호출 안 됨
\`\`\`

---

## 6. 대입 연산자 (Assignment Operators)

값을 변수에 할당합니다.

| 연산자 | 의미 | 동등한 표현 |
|--------|------|-------------|
| \`=\` | 대입 | \`a = 5\` |
| \`+=\` | 더하고 대입 | \`a = a + 5\` |
| \`-=\` | 빼고 대입 | \`a = a - 5\` |
| \`*=\` | 곱하고 대입 | \`a = a * 5\` |
| \`/=\` | 나누고 대입 | \`a = a / 5\` |
| \`%=\` | 나머지 대입 | \`a = a % 5\` |

---

## 7. 삼항 연산자 (Ternary Operator)

조건에 따라 두 값 중 하나를 선택합니다.

\`\`\`java
// 문법: 조건 ? 참일때값 : 거짓일때값
int age = 20;
String status = (age >= 18) ? "성인" : "미성년자";
System.out.println(status);  // "성인"
\`\`\`

---

## 8. 연산자 우선순위

| 우선순위 | 연산자 |
|----------|--------|
| 1 (높음) | \`()\`, \`[]\`, \`.\` |
| 2 | \`++\`, \`--\`, \`!\`, \`~\` (단항) |
| 3 | \`*\`, \`/\`, \`%\` |
| 4 | \`+\`, \`-\` |
| 5 | \`<\`, \`>\`, \`<=\`, \`>=\` |
| 6 | \`==\`, \`!=\` |
| 7 | \`&&\` |
| 8 | \`||\` |
| 9 (낮음) | \`=\`, \`+=\`, \`-=\` 등 |

> **팁**: 헷갈리면 괄호 \`()\`를 사용하세요!
`,
            codeExamples: [
                {
                    title: "산술 및 증감 연산자",
                    language: "java",
                    code: `public class ArithmeticDemo {
    public static void main(String[] args) {
        // 기본 산술
        int x = 10, y = 3;
        System.out.println("덧셈: " + (x + y));  // 13
        System.out.println("뺄셈: " + (x - y));  // 7
        System.out.println("곱셈: " + (x * y));  // 30
        System.out.println("나눗셈: " + (x / y)); // 3
        System.out.println("나머지: " + (x % y)); // 1
        
        // 증감 연산자
        int a = 5;
        System.out.println(a++);  // 5 (후위: 출력 후 증가)
        System.out.println(a);    // 6
        System.out.println(++a);  // 7 (전위: 증가 후 출력)
    }
}`
                },
                {
                    title: "논리 연산자와 삼항 연산자",
                    language: "java",
                    code: `public class LogicalDemo {
    public static void main(String[] args) {
        int age = 25;
        boolean hasLicense = true;
        
        // 논리 연산자
        boolean canDrive = (age >= 18) && hasLicense;
        System.out.println("운전 가능: " + canDrive);  // true
        
        // 삼항 연산자
        String category = (age >= 65) ? "노인" : 
                          (age >= 18) ? "성인" : "미성년자";
        System.out.println("분류: " + category);  // "성인"
        
        // 단락 평가 예시
        int num = 0;
        boolean result = (num != 0) && (10 / num > 1);
        // num이 0이라 첫 조건 false → 뒤는 실행 안 함 (0으로 나누기 방지!)
        System.out.println("결과: " + result);  // false
    }
}`
                }
            ],
            keyPoints: [
                "정수끼리 나눗셈(/)은 정수 결과만 나옵니다. 실수 결과가 필요하면 형변환하세요.",
                "전위(++a)는 증가 후 사용, 후위(a++)는 사용 후 증가입니다.",
                "문자열 비교는 == 대신 .equals() 메서드를 사용해야 합니다.",
                "&&와 ||는 단락 평가를 수행하여 불필요한 연산을 건너뜁니다.",
                "삼항 연산자(조건 ? A : B)는 간단한 if-else를 한 줄로 표현합니다."
            ],
            interviewQuestions: [
                {
                    difficulty: 'Easy',
                    question: "문자열을 비교할 때 == 대신 equals()를 써야 하는 이유는?",
                    answer: "== 연산자는 메모리 주소를 비교하고, equals()는 문자열의 내용을 비교하기 때문입니다. 서로 다른 객체라도 내용이 같으면 equals는 true를 반환합니다."
                },
                {
                    difficulty: 'Medium',
                    question: "&&와 & 연산자의 차이점(단락 평가)은?",
                    answer: "&&는 앞의 조건이 거짓이면 뒤의 조건을 실행하지 않지만(Short-circuit), &는 앞의 결과와 상관없이 뒤의 조건도 모두 실행합니다."
                }
            ]
        },
        {
            id: "p0-m4",
            title: "Chapter 4: 조건문",
            topic: "if-else, switch-case, switch expression (Java 14+)",
            content: `
## 1. 조건문이란?

**조건문**은 주어진 조건에 따라 **다른 코드를 실행**하게 하는 제어 구조입니다.

---

## 2. if 문

### 2.1 기본 if 문

\`\`\`java
if (조건식) {
    // 조건이 true일 때 실행되는 코드
}
\`\`\`

\`\`\`java
int score = 85;
if (score >= 60) {
    System.out.println("합격입니다!");
}
\`\`\`

### 2.2 if-else 문

\`\`\`java
if (조건식) {
    // true일 때
} else {
    // false일 때
}
\`\`\`

\`\`\`java
int age = 15;
if (age >= 18) {
    System.out.println("성인입니다.");
} else {
    System.out.println("미성년자입니다.");
}
\`\`\`

### 2.3 if-else if-else 문

여러 조건을 순차적으로 검사합니다.

\`\`\`java
int score = 85;

if (score >= 90) {
    System.out.println("A학점");
} else if (score >= 80) {
    System.out.println("B학점");
} else if (score >= 70) {
    System.out.println("C학점");
} else if (score >= 60) {
    System.out.println("D학점");
} else {
    System.out.println("F학점");
}
// 출력: B학점
\`\`\`

### 2.4 중첩 if 문

\`\`\`java
int age = 25;
boolean hasLicense = true;

if (age >= 18) {
    if (hasLicense) {
        System.out.println("운전 가능합니다.");
    } else {
        System.out.println("면허가 필요합니다.");
    }
} else {
    System.out.println("나이가 부족합니다.");
}
\`\`\`

---

## 3. switch 문

하나의 변수를 여러 값과 비교할 때 유용합니다.

### 3.1 기본 switch 문

\`\`\`java
int day = 3;
String dayName;

switch (day) {
    case 1:
        dayName = "월요일";
        break;
    case 2:
        dayName = "화요일";
        break;
    case 3:
        dayName = "수요일";
        break;
    case 4:
        dayName = "목요일";
        break;
    case 5:
        dayName = "금요일";
        break;
    case 6:
    case 7:
        dayName = "주말";
        break;
    default:
        dayName = "잘못된 입력";
}
System.out.println(dayName);  // 수요일
\`\`\`

### 3.2 break의 중요성

\`break\`가 없으면 다음 case도 실행됩니다 (fall-through).

\`\`\`java
int num = 1;
switch (num) {
    case 1:
        System.out.println("One");
        // break 없음!
    case 2:
        System.out.println("Two");
        break;
    case 3:
        System.out.println("Three");
}
// 출력: One
//       Two
\`\`\`

### 3.3 switch에서 사용 가능한 타입

- \`byte\`, \`short\`, \`int\`, \`char\`
- \`String\` (Java 7+)
- \`enum\`
- **불가**: \`long\`, \`float\`, \`double\`, \`boolean\`

---

## 4. switch 표현식 (Java 14+)

더 간결하고 안전한 새로운 switch 문법입니다.

### 4.1 화살표(->) 문법

\`\`\`java
int day = 3;
String dayName = switch (day) {
    case 1 -> "월요일";
    case 2 -> "화요일";
    case 3 -> "수요일";
    case 4 -> "목요일";
    case 5 -> "금요일";
    case 6, 7 -> "주말";
    default -> "잘못된 입력";
};
System.out.println(dayName);  // 수요일
\`\`\`

### 4.2 yield 키워드

블록 내에서 값을 반환할 때 사용합니다.

\`\`\`java
int month = 2;
int days = switch (month) {
    case 1, 3, 5, 7, 8, 10, 12 -> 31;
    case 4, 6, 9, 11 -> 30;
    case 2 -> {
        System.out.println("2월은 특별합니다.");
        yield 28;  // 블록 안에서 값 반환
    }
    default -> throw new IllegalArgumentException("잘못된 월: " + month);
};
System.out.println(month + "월은 " + days + "일");
\`\`\`

### 4.3 장점

1. **break 불필요**: fall-through 방지
2. **간결함**: 한 줄로 표현 가능
3. **표현식**: 값 반환 가능
4. **완전성 검사**: 모든 케이스를 다루지 않으면 컴파일 에러
`,
            codeExamples: [
                {
                    title: "if-else if-else 학점 계산",
                    language: "java",
                    code: `public class GradeCalculator {
    public static void main(String[] args) {
        int score = 87;
        char grade;
        String message;
        
        if (score >= 90) {
            grade = 'A';
            message = "우수합니다!";
        } else if (score >= 80) {
            grade = 'B';
            message = "좋습니다.";
        } else if (score >= 70) {
            grade = 'C';
            message = "보통입니다.";
        } else if (score >= 60) {
            grade = 'D';
            message = "노력이 필요합니다.";
        } else {
            grade = 'F';
            message = "재수강 대상입니다.";
        }
        
        System.out.println("점수: " + score);
        System.out.println("학점: " + grade);
        System.out.println(message);
    }
}`
                },
                {
                    title: "switch 표현식 (Java 14+)",
                    language: "java",
                    code: `public class SwitchExpressionDemo {
    public static void main(String[] args) {
        String day = "수";
        
        // 화살표 문법 switch 표현식
        String dayType = switch (day) {
            case "월", "화", "수", "목", "금" -> "평일";
            case "토", "일" -> "주말";
            default -> "잘못된 입력";
        };
        
        // 블록과 yield 사용
        int dayNumber = switch (day) {
            case "월" -> 1;
            case "화" -> 2;
            case "수" -> {
                System.out.println("주 중간입니다!");
                yield 3;  // 블록 안에서 값 반환
            }
            case "목" -> 4;
            case "금" -> 5;
            case "토" -> 6;
            case "일" -> 7;
            default -> -1;
        };
        
        System.out.println(day + "요일은 " + dayType);
        System.out.println("일주일 중 " + dayNumber + "번째 날");
    }
}`
                }
            ],
            keyPoints: [
                "if 문은 조건이 true일 때만 해당 블록을 실행합니다.",
                "else if를 사용하면 여러 조건을 순차적으로 검사할 수 있습니다.",
                "switch 문에서 break를 빠뜨리면 다음 case로 넘어갑니다 (fall-through).",
                "Java 14+의 switch 표현식은 -> 문법으로 더 간결하고 안전합니다.",
                "switch 표현식에서 블록을 사용할 때는 yield로 값을 반환합니다."
            ],
            interviewQuestions: [
                {
                    difficulty: 'Easy',
                    question: "switch 문에서 break를 생략하면 어떤 일이 발생하나요?",
                    answer: "Fall-through 현상이 발생하여, 다음 case문의 코드까지 연속적으로 실행됩니다."
                },
                {
                    difficulty: 'Medium',
                    question: "Java 14의 switch 표현식(Expression)이 기존 switch 문과 다른 점은?",
                    answer: "값을 반환할 수 있고, -> 화살표 문법을 사용하여 break 없이도 fall-through를 방지하며 더 간결합니다."
                }
            ]
        },
        {
            id: "p0-m5",
            title: "Chapter 5: 반복문",
            topic: "for, while, do-while, enhanced for, break/continue, 중첩 반복문",
            content: `
## 1. 반복문이란?

**반복문**은 특정 코드 블록을 **조건이 만족하는 동안 반복** 실행하는 제어 구조입니다.

---

## 2. for 문

가장 많이 사용되는 반복문입니다. 반복 횟수가 **정해져 있을 때** 적합합니다.

### 2.1 기본 문법

\`\`\`java
for (초기화; 조건식; 증감식) {
    // 반복할 코드
}
\`\`\`

\`\`\`java
// 1부터 5까지 출력
for (int i = 1; i <= 5; i++) {
    System.out.println(i);
}
// 출력: 1, 2, 3, 4, 5
\`\`\`

### 2.2 실행 순서

1. **초기화** (한 번만 실행)
2. **조건 검사** (false면 종료)
3. **코드 블록 실행**
4. **증감식 실행**
5. 2번으로 돌아감

### 2.3 다양한 예시

\`\`\`java
// 역순 출력
for (int i = 10; i >= 1; i--) {
    System.out.println(i);
}

// 2씩 증가
for (int i = 0; i <= 10; i += 2) {
    System.out.println(i);  // 0, 2, 4, 6, 8, 10
}

// 무한 루프 (조건 생략)
for (;;) {
    // 영원히 실행 (break로 탈출 필요)
}
\`\`\`

---

## 3. while 문

조건이 true인 동안 반복합니다. 반복 횟수가 **정해지지 않았을 때** 적합합니다.

\`\`\`java
while (조건식) {
    // 조건이 true인 동안 반복
}
\`\`\`

\`\`\`java
int count = 0;
while (count < 5) {
    System.out.println("Count: " + count);
    count++;
}
\`\`\`

---

## 4. do-while 문

**최소 1번은 반드시 실행**됩니다. 조건 검사가 코드 실행 후에 이루어집니다.

\`\`\`java
do {
    // 최소 1번 실행
} while (조건식);
\`\`\`

\`\`\`java
int num = 10;
do {
    System.out.println(num);  // 10 출력
    num++;
} while (num < 5);  // 조건 false지만 이미 1번 실행됨
\`\`\`

### while vs do-while

\`\`\`java
int x = 10;

// while: 한 번도 실행 안 됨
while (x < 5) {
    System.out.println("while: " + x);
}

// do-while: 1번 실행됨
do {
    System.out.println("do-while: " + x);  // 출력됨!
} while (x < 5);
\`\`\`

---

## 5. Enhanced for 문 (for-each)

배열이나 컬렉션을 순회할 때 가장 간결한 방법입니다.

\`\`\`java
for (타입 변수명 : 배열/컬렉션) {
    // 각 요소에 대해 실행
}
\`\`\`

\`\`\`java
int[] numbers = {10, 20, 30, 40, 50};

for (int num : numbers) {
    System.out.println(num);
}
// 출력: 10, 20, 30, 40, 50
\`\`\`

### 주의사항

\`\`\`java
// Enhanced for에서는 인덱스 접근 불가
// 인덱스가 필요하면 일반 for 사용
for (int i = 0; i < numbers.length; i++) {
    System.out.println("인덱스 " + i + ": " + numbers[i]);
}
\`\`\`

---

## 6. break와 continue

### 6.1 break

반복문을 **즉시 종료**합니다.

\`\`\`java
for (int i = 1; i <= 10; i++) {
    if (i == 5) {
        break;  // 5에서 반복 종료
    }
    System.out.println(i);
}
// 출력: 1, 2, 3, 4
\`\`\`

### 6.2 continue

현재 반복을 **건너뛰고** 다음 반복으로 넘어갑니다.

\`\`\`java
for (int i = 1; i <= 5; i++) {
    if (i == 3) {
        continue;  // 3은 건너뜀
    }
    System.out.println(i);
}
// 출력: 1, 2, 4, 5
\`\`\`

### 6.3 레이블(Label)을 이용한 중첩 루프 탈출

\`\`\`java
outer:  // 레이블 정의
for (int i = 0; i < 3; i++) {
    for (int j = 0; j < 3; j++) {
        if (i == 1 && j == 1) {
            break outer;  // 바깥 루프까지 탈출
        }
        System.out.println(i + ", " + j);
    }
}
// (1, 1)에서 전체 루프 종료
\`\`\`

---

## 7. 중첩 반복문

\`\`\`java
// 구구단 2~9단
for (int dan = 2; dan <= 9; dan++) {
    System.out.println("--- " + dan + "단 ---");
    for (int i = 1; i <= 9; i++) {
        System.out.println(dan + " x " + i + " = " + (dan * i));
    }
}
\`\`\`
`,
            codeExamples: [
                {
                    title: "다양한 for 문 활용",
                    language: "java",
                    code: `public class ForLoopDemo {
    public static void main(String[] args) {
        // 1. 기본 for문: 1부터 10까지 합계
        int sum = 0;
        for (int i = 1; i <= 10; i++) {
            sum += i;
        }
        System.out.println("1~10 합계: " + sum);  // 55
        
        // 2. 역순 카운트다운
        System.out.print("발사 카운트다운: ");
        for (int i = 5; i >= 1; i--) {
            System.out.print(i + " ");
        }
        System.out.println("발사!");
        
        // 3. Enhanced for (배열 순회)
        String[] fruits = {"사과", "바나나", "오렌지"};
        for (String fruit : fruits) {
            System.out.println("과일: " + fruit);
        }
    }
}`
                },
                {
                    title: "별 찍기 (중첩 반복문)",
                    language: "java",
                    code: `public class StarPattern {
    public static void main(String[] args) {
        int n = 5;
        
        // 1. 직각삼각형
        // *
        // **
        // ***
        // ****
        // *****
        System.out.println("=== 직각삼각형 ===");
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= i; j++) {
                System.out.print("*");
            }
            System.out.println();
        }
        
        // 2. 역삼각형
        // *****
        // ****
        // ***
        // **
        // *
        System.out.println("=== 역삼각형 ===");
        for (int i = n; i >= 1; i--) {
            for (int j = 1; j <= i; j++) {
                System.out.print("*");
            }
            System.out.println();
        }
    }
}`
                }
            ],
            keyPoints: [
                "for 문은 반복 횟수가 정해져 있을 때, while 문은 조건 기반 반복에 적합합니다.",
                "do-while은 조건과 관계없이 최소 1번은 실행됩니다.",
                "Enhanced for(for-each)는 배열/컬렉션 순회에 가장 간결하지만 인덱스 접근이 불가합니다.",
                "break는 반복문을 즉시 종료하고, continue는 현재 반복만 건너뜁니다.",
                "중첩 반복문에서 바깥 루프를 탈출하려면 레이블(label)과 함께 break를 사용합니다."
            ],
            interviewQuestions: [
                {
                    difficulty: 'Easy',
                    question: "for 문과 while 문은 각각 언제 사용하는 것이 좋은가요?",
                    answer: "반복 횟수가 명확할 때는 for 문, 특정 조건이 만족될 때까지 반복해야 할 때는 while 문이 적합합니다."
                },
                {
                    difficulty: 'Easy',
                    question: "break와 continue의 차이점은?",
                    answer: "break는 반복문을 완전히 종료하고 탈출하지만, continue는 현재 반복만 건너뛰고 다음 반복 조건 검사로 넘어갑니다."
                }
            ]
        },
        {
            id: "p0-m6",
            title: "Chapter 6: 배열",
            topic: "1차원 배열, 다차원 배열, 배열 복사, Arrays 유틸리티",
            content: `
## 1. 배열(Array)이란?

**배열**은 **같은 타입**의 데이터를 **연속된 메모리 공간**에 저장하는 자료구조입니다.

### 핵심 특징
- **고정 크기**: 한 번 생성하면 크기 변경 불가
- **0부터 시작하는 인덱스**: 첫 번째 요소는 index 0
- **빠른 접근**: 인덱스로 O(1) 시간에 접근 가능

---

## 2. 배열 선언과 생성

### 2.1 선언 방법

\`\`\`java
// 방법 1 (권장)
int[] numbers;

// 방법 2 (C 스타일, 권장하지 않음)
int numbers[];
\`\`\`

### 2.2 생성 (메모리 할당)

\`\`\`java
int[] numbers = new int[5];  // 크기 5인 int 배열 생성
// 기본값으로 초기화됨: [0, 0, 0, 0, 0]
\`\`\`

### 2.3 선언과 초기화 동시에

\`\`\`java
// 방법 1: new 키워드와 함께
int[] scores = new int[] {90, 85, 77, 92, 88};

// 방법 2: 간단한 방법 (변수 선언과 동시에만 가능)
int[] scores = {90, 85, 77, 92, 88};
\`\`\`

---

## 3. 배열 접근과 수정

### 3.1 요소 접근

\`\`\`java
int[] arr = {10, 20, 30, 40, 50};

System.out.println(arr[0]);  // 10 (첫 번째 요소)
System.out.println(arr[4]);  // 50 (마지막 요소)
System.out.println(arr[5]);  // ArrayIndexOutOfBoundsException!
\`\`\`

### 3.2 요소 수정

\`\`\`java
arr[2] = 300;  // 30 → 300으로 변경
System.out.println(arr[2]);  // 300
\`\`\`

### 3.3 배열 길이

\`\`\`java
int length = arr.length;  // 5 (length는 속성, 메서드 아님!)
\`\`\`

---

## 4. 배열 순회

\`\`\`java
int[] numbers = {1, 2, 3, 4, 5};

// 방법 1: 일반 for문
for (int i = 0; i < numbers.length; i++) {
    System.out.println("인덱스 " + i + ": " + numbers[i]);
}

// 방법 2: Enhanced for (인덱스 필요 없을 때)
for (int num : numbers) {
    System.out.println(num);
}
\`\`\`

---

## 5. 다차원 배열

### 5.1 2차원 배열

\`\`\`java
// 3행 4열 배열 생성
int[][] matrix = new int[3][4];

// 초기화와 동시에 생성
int[][] matrix = {
    {1, 2, 3, 4},
    {5, 6, 7, 8},
    {9, 10, 11, 12}
};

// 접근
System.out.println(matrix[1][2]);  // 7 (2행 3열)
\`\`\`

### 5.2 가변 배열 (Jagged Array)

각 행마다 열의 개수가 다를 수 있습니다.

\`\`\`java
int[][] jagged = new int[3][];
jagged[0] = new int[2];  // 첫 번째 행: 2열
jagged[1] = new int[4];  // 두 번째 행: 4열
jagged[2] = new int[3];  // 세 번째 행: 3열
\`\`\`

### 5.3 2차원 배열 순회

\`\`\`java
int[][] matrix = {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}};

for (int i = 0; i < matrix.length; i++) {
    for (int j = 0; j < matrix[i].length; j++) {
        System.out.print(matrix[i][j] + " ");
    }
    System.out.println();
}
\`\`\`

---

## 6. 배열 복사

### 6.1 얕은 복사 (Shallow Copy)

\`\`\`java
int[] original = {1, 2, 3};
int[] copy = original;  // 같은 배열을 참조!

copy[0] = 100;
System.out.println(original[0]);  // 100 (원본도 변경됨!)
\`\`\`

### 6.2 깊은 복사 (Deep Copy)

\`\`\`java
// 방법 1: for문
int[] original = {1, 2, 3};
int[] copy = new int[original.length];
for (int i = 0; i < original.length; i++) {
    copy[i] = original[i];
}

// 방법 2: Arrays.copyOf (권장)
int[] copy = Arrays.copyOf(original, original.length);

// 방법 3: System.arraycopy
int[] copy = new int[original.length];
System.arraycopy(original, 0, copy, 0, original.length);

// 방법 4: clone()
int[] copy = original.clone();
\`\`\`

---

## 7. Arrays 유틸리티 클래스

\`java.util.Arrays\` 클래스는 배열 관련 유용한 메서드를 제공합니다.

\`\`\`java
import java.util.Arrays;

int[] arr = {3, 1, 4, 1, 5, 9, 2, 6};

// 배열 출력
System.out.println(Arrays.toString(arr));  // [3, 1, 4, 1, 5, 9, 2, 6]

// 정렬
Arrays.sort(arr);
System.out.println(Arrays.toString(arr));  // [1, 1, 2, 3, 4, 5, 6, 9]

// 이진 검색 (정렬된 배열에서만 사용)
int index = Arrays.binarySearch(arr, 5);  // 5가 있는 인덱스 반환

// 배열 채우기
int[] fillArr = new int[5];
Arrays.fill(fillArr, 7);  // [7, 7, 7, 7, 7]

// 배열 비교
int[] arr1 = {1, 2, 3};
int[] arr2 = {1, 2, 3};
System.out.println(Arrays.equals(arr1, arr2));  // true
\`\`\`
`,
            codeExamples: [
                {
                    title: "배열 기본 사용법",
                    language: "java",
                    code: `public class ArrayBasics {
    public static void main(String[] args) {
        // 1. 배열 생성과 초기화
        int[] scores = {85, 90, 77, 92, 88};
        
        // 2. 배열 순회 및 합계/평균
        int sum = 0;
        for (int score : scores) {
            sum += score;
        }
        double average = (double) sum / scores.length;
        System.out.println("합계: " + sum);
        System.out.println("평균: " + average);
        
        // 3. 최댓값/최솟값 찾기
        int max = scores[0];
        int min = scores[0];
        for (int i = 1; i < scores.length; i++) {
            if (scores[i] > max) max = scores[i];
            if (scores[i] < min) min = scores[i];
        }
        System.out.println("최고점: " + max);
        System.out.println("최저점: " + min);
    }
}`
                },
                {
                    title: "2차원 배열과 Arrays 활용",
                    language: "java",
                    code: `import java.util.Arrays;

public class Array2DDemo {
    public static void main(String[] args) {
        // 2차원 배열: 3명의 학생, 각각 4과목 점수
        int[][] scores = {
            {85, 90, 77, 92},  // 학생 1
            {88, 75, 95, 80},  // 학생 2
            {90, 85, 88, 92}   // 학생 3
        };
        
        // 각 학생의 평균 점수 계산
        for (int i = 0; i < scores.length; i++) {
            int sum = 0;
            for (int j = 0; j < scores[i].length; j++) {
                sum += scores[i][j];
            }
            double avg = (double) sum / scores[i].length;
            System.out.println("학생 " + (i + 1) + " 평균: " + avg);
        }
        
        // Arrays 유틸리티 사용
        int[] numbers = {5, 2, 8, 1, 9};
        System.out.println("원본: " + Arrays.toString(numbers));
        
        Arrays.sort(numbers);
        System.out.println("정렬: " + Arrays.toString(numbers));
        
        int[] copy = Arrays.copyOf(numbers, numbers.length);
        System.out.println("복사: " + Arrays.toString(copy));
    }
}`
                }
            ],
            keyPoints: [
                "배열은 같은 타입의 데이터를 연속된 메모리에 저장하며, 크기는 생성 시 고정됩니다.",
                "배열 인덱스는 0부터 시작하며, 범위를 벗어나면 ArrayIndexOutOfBoundsException이 발생합니다.",
                "배열 참조를 복사하면 같은 배열을 공유합니다. 독립적인 복사본은 Arrays.copyOf() 등을 사용하세요.",
                "2차원 배열은 '배열의 배열'이며, 각 행의 길이가 다를 수 있습니다 (가변 배열).",
                "Arrays 클래스는 정렬(sort), 검색(binarySearch), 비교(equals), 출력(toString) 등을 제공합니다."
            ],
            interviewQuestions: [
                {
                    difficulty: 'Easy',
                    question: "배열의 가장 큰 단점은 무엇인가요?",
                    answer: "생성 시 크기가 고정되어 변경할 수 없다는 점입니다. 데이터 추가/삭제가 불가능하고, 크기를 넘어가면 예외가 발생합니다."
                },
                {
                    difficulty: 'Medium',
                    question: "배열 복사 시 Shallow Copy와 Deep Copy의 차이는?",
                    answer: "Shallow Copy는 주소값만 복사하여 원본과 같은 객체를 공유하지만, Deep Copy는 실제 데이터(객체)를 새로운 메모리에 복제하여 원본과 독립적입니다."
                }
            ]
        },
        {
            id: "p0-m7",
            title: "Chapter 7: 문자열 (String)",
            topic: "String 클래스, 불변성, StringBuilder, 주요 메서드, 문자열 비교",
            content: `
## 1. String 클래스란?

**String**은 Java에서 문자열을 다루는 **클래스**입니다. 기본형(primitive)이 아닌 **참조형(reference type)** 입니다.

### 1.1 String 생성 방법

\`\`\`java
// 방법 1: 리터럴 (권장) - String Pool 사용
String str1 = "Hello";

// 방법 2: new 키워드 - 새 객체 생성
String str2 = new String("Hello");
\`\`\`

### 1.2 String Pool

문자열 리터럴은 **String Pool**(String Constant Pool)이라는 특별한 메모리 영역에 저장됩니다.

\`\`\`java
String a = "Java";
String b = "Java";
String c = new String("Java");

System.out.println(a == b);  // true (같은 Pool 객체)
System.out.println(a == c);  // false (c는 새 객체)
System.out.println(a.equals(c));  // true (내용은 같음)
\`\`\`

---

## 2. String의 불변성 (Immutability)

**String 객체는 한 번 생성되면 변경할 수 없습니다.**

\`\`\`java
String str = "Hello";
str = str + " World";  // 새로운 String 객체 생성!
\`\`\`

기존 "Hello" 객체는 그대로 있고, "Hello World"라는 새 객체가 생성되어 str이 이를 참조합니다.

### 불변성의 이유
1. **보안**: 네트워크, 파일 경로 등에 사용 시 변조 방지
2. **스레드 안전**: 여러 스레드에서 공유해도 안전
3. **해시코드 캐싱**: HashMap 등에서 키로 사용 시 효율적

---

## 3. 주요 String 메서드

### 3.1 길이와 접근

\`\`\`java
String str = "Hello, Java!";

str.length()          // 12 (문자열 길이)
str.charAt(0)         // 'H' (첫 번째 문자)
str.charAt(7)         // 'J' (8번째 문자)
str.isEmpty()         // false
str.isBlank()         // false (Java 11+, 공백문자만 있어도 true)
\`\`\`

### 3.2 검색

\`\`\`java
String str = "Hello, Java!";

str.indexOf("Java")      // 7 (처음 등장 위치)
str.indexOf("Python")    // -1 (없으면)
str.lastIndexOf("l")     // 3 (마지막 등장 위치)
str.contains("Java")     // true (포함 여부)
str.startsWith("Hello")  // true
str.endsWith("!")        // true
\`\`\`

### 3.3 추출

\`\`\`java
String str = "Hello, Java!";

str.substring(7)         // "Java!" (7번부터 끝까지)
str.substring(0, 5)      // "Hello" (0~4번까지)
\`\`\`

### 3.4 변환

\`\`\`java
String str = "  Hello, Java!  ";

str.toUpperCase()        // "  HELLO, JAVA!  "
str.toLowerCase()        // "  hello, java!  "
str.trim()               // "Hello, Java!" (앞뒤 공백 제거)
str.strip()              // "Hello, Java!" (Java 11+, 유니코드 공백 포함)
str.replace("Java", "World")  // "  Hello, World!  "
\`\`\`

### 3.5 분할과 결합

\`\`\`java
// 분할
String csv = "apple,banana,orange";
String[] fruits = csv.split(",");  // ["apple", "banana", "orange"]

// 결합
String joined = String.join("-", fruits);  // "apple-banana-orange"
\`\`\`

---

## 4. 문자열 비교

### 4.1 equals vs ==

\`\`\`java
String a = "Hello";
String b = "Hello";
String c = new String("Hello");

// == : 참조(주소) 비교
System.out.println(a == b);  // true (String Pool)
System.out.println(a == c);  // false (다른 객체)

// equals : 내용 비교 (항상 이것을 사용!)
System.out.println(a.equals(c));  // true
\`\`\`

### 4.2 대소문자 무시 비교

\`\`\`java
String a = "Hello";
String b = "HELLO";
System.out.println(a.equalsIgnoreCase(b));  // true
\`\`\`

### 4.3 사전순 비교

\`\`\`java
String a = "apple";
String b = "banana";
a.compareTo(b);  // 음수 (a < b)
b.compareTo(a);  // 양수 (b > a)
\`\`\`

---

## 5. StringBuilder와 StringBuffer

**많은 문자열을 연결할 때**는 String 대신 StringBuilder를 사용하세요.

### 5.1 왜 필요한가?

\`\`\`java
// 나쁜 예: 매번 새 String 객체 생성 (성능 저하)
String result = "";
for (int i = 0; i < 1000; i++) {
    result += i;  // 1000개의 String 객체 생성!
}

// 좋은 예: StringBuilder 사용
StringBuilder sb = new StringBuilder();
for (int i = 0; i < 1000; i++) {
    sb.append(i);
}
String result = sb.toString();
\`\`\`

### 5.2 주요 메서드

\`\`\`java
StringBuilder sb = new StringBuilder("Hello");
sb.append(" World");    // "Hello World"
sb.insert(5, ",");      // "Hello, World"
sb.delete(5, 6);        // "Hello World"
sb.reverse();           // "dlroW olleH"
sb.toString();          // String으로 변환
\`\`\`

### 5.3 StringBuilder vs StringBuffer

| 특성 | StringBuilder | StringBuffer |
|------|---------------|--------------|
| 스레드 안전성 | X (동기화 없음) | O (동기화됨) |
| 성능 | 빠름 | 느림 |
| 사용 상황 | 단일 스레드 | 멀티스레드 |
`,
            codeExamples: [
                {
                    title: "String 주요 메서드 활용",
                    language: "java",
                    code: `public class StringDemo {
    public static void main(String[] args) {
        String email = "user@example.com";
        
        // 이메일 유효성 검사
        boolean hasAt = email.contains("@");
        boolean hasDot = email.contains(".");
        System.out.println("유효한 이메일: " + (hasAt && hasDot));
        
        // 사용자명과 도메인 추출
        int atIndex = email.indexOf("@");
        String username = email.substring(0, atIndex);
        String domain = email.substring(atIndex + 1);
        System.out.println("사용자: " + username);
        System.out.println("도메인: " + domain);
        
        // 문자열 포맷팅
        String formatted = String.format("안녕하세요, %s님!", username);
        System.out.println(formatted);
        
        // CSV 파싱
        String data = "홍길동,25,서울";
        String[] parts = data.split(",");
        System.out.println("이름: " + parts[0]);
        System.out.println("나이: " + parts[1]);
        System.out.println("도시: " + parts[2]);
    }
}`
                },
                {
                    title: "StringBuilder 성능 비교",
                    language: "java",
                    code: `public class StringBuilderDemo {
    public static void main(String[] args) {
        int n = 10000;
        
        // String 연결 (느림)
        long start1 = System.currentTimeMillis();
        String s = "";
        for (int i = 0; i < n; i++) {
            s += "a";
        }
        long time1 = System.currentTimeMillis() - start1;
        
        // StringBuilder (빠름)
        long start2 = System.currentTimeMillis();
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < n; i++) {
            sb.append("a");
        }
        String result = sb.toString();
        long time2 = System.currentTimeMillis() - start2;
        
        System.out.println("String 연결: " + time1 + "ms");
        System.out.println("StringBuilder: " + time2 + "ms");
        
        // StringBuilder 활용 예시
        StringBuilder html = new StringBuilder();
        html.append("<ul>\\n");
        String[] items = {"사과", "바나나", "오렌지"};
        for (String item : items) {
            html.append("  <li>").append(item).append("</li>\\n");
        }
        html.append("</ul>");
        System.out.println(html);
    }
}`
                }
            ],
            keyPoints: [
                "String은 불변(immutable)입니다. 수정하면 새 객체가 생성됩니다.",
                "문자열 비교는 반드시 == 대신 .equals() 메서드를 사용하세요.",
                "문자열 리터럴은 String Pool에 저장되어 같은 값은 재사용됩니다.",
                "많은 문자열 연결 작업에는 StringBuilder를 사용하여 성능을 향상시키세요.",
                "String의 주요 메서드: length(), charAt(), substring(), split(), contains(), replace(), trim() 등이 있습니다."
            ],
            interviewQuestions: [
                {
                    difficulty: 'Medium',
                    question: "String 객체가 불변(Immutable)인 이유는 무엇인가요?",
                    answer: "보안(네트워크/DB 연결 문자열 변조 방지), 스레드 안전성(동기화 불필요), String Pool을 통한 메모리 절약(캐싱) 등을 위해서입니다."
                },
                {
                    difficulty: 'Easy',
                    question: "많은 문자열을 연결할 때 String + 연산 대신 StringBuilder를 써야 하는 이유는?",
                    answer: "String은 불변이라 + 연산 시 매번 새로운 객체를 생성하여 메모리 낭비가 심하지만, StringBuilder는 내부 버퍼를 변경하므로 훨씬 효율적입니다."
                }
            ]
        },
        {
            id: "p0-m8",
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
        },
        {
            id: "p0-m9",
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
        },
        {
            id: "p0-m10",
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
        },
        {
            id: "p0-m11",
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

\`\`\`java
class Person {
    String name;
    int age;
    
    @Override
    public String toString() {
        return "Person{name='" + name + "', age=" + age + "}";
    }
    
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Person person = (Person) o;
        return age == person.age && name.equals(person.name);
    }
}
\`\`\`

---

## 6. final 키워드와 상속

### 6.1 final 클래스

상속될 수 없는 클래스입니다.

\`\`\`java
final class FinalClass {
    // 이 클래스를 상속할 수 없음
}
// class Child extends FinalClass { } // 컴파일 에러!
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
        // 보너스: 300000
        
        System.out.println("---");
        
        Manager mgr = new Manager("박매니저", 5000000, 10);
        mgr.displayInfo();
        // 보너스: 500000 + 100000 = 600000
    }
}`
                }
            ],
            keyPoints: [
                "상속은 extends 키워드를 사용하며, Java는 단일 상속만 허용합니다 (클래스는 하나만 상속 가능).",
                "오버라이딩은 부모의 메서드를 자식이 재정의하는 것이며, @Override 어노테이션 사용을 권장합니다.",
                "super 키워드로 부모의 필드, 메서드, 생성자에 접근할 수 있습니다.",
                "자식 생성자는 반드시 부모 생성자를 호출하며, super()는 첫 줄에 위치해야 합니다.",
                "모든 클래스는 Object 클래스를 상속받으며, toString(), equals(), hashCode() 등을 오버라이드할 수 있습니다."
            ],
            interviewQuestions: [
                {
                    difficulty: 'Easy',
                    question: "Java는 다중 상속을 지원하나요?",
                    answer: "클래스 간의 다중 상속은 지원하지 않습니다(Diamond 문제 방지). 하지만 인터페이스는 다중 구현이 가능합니다."
                },
                {
                    difficulty: 'Medium',
                    question: "super()와 this()의 차이점은?",
                    answer: "super()는 부모 클래스의 생성자를 호출하고, this()는 같은 클래스 내의 다른 생성자를 호출합니다. 둘 다 생성자의 첫 줄에만 올 수 있습니다."
                }
            ]
        },
        {
            id: "p0-m12",
            title: "Chapter 12: 다형성 (Polymorphism)",
            topic: "업캐스팅/다운캐스팅, instanceof, 동적 바인딩",
            content: `
## 1. 다형성(Polymorphism)이란?

**다형성**은 "하나의 타입으로 여러 형태의 객체를 참조"할 수 있는 능력입니다.

\`\`\`java
// 하나의 타입(Animal)으로 다양한 객체 참조
Animal animal1 = new Dog();
Animal animal2 = new Cat();
Animal animal3 = new Bird();
\`\`\`

---

## 2. 업캐스팅 (Upcasting)

**자식 타입 → 부모 타입**으로 변환하는 것입니다. **자동**으로 수행됩니다.

\`\`\`java
class Animal { }
class Dog extends Animal { }

Dog dog = new Dog();
Animal animal = dog;  // 업캐스팅 (자동)
\`\`\`

### 업캐스팅 후 제한

\`\`\`java
class Animal {
    void eat() { System.out.println("먹기"); }
}

class Dog extends Animal {
    void bark() { System.out.println("멍멍"); }
}

Animal a = new Dog();  // 업캐스팅
a.eat();    // ✅ OK (Animal에 있음)
// a.bark();  // ❌ 컴파일 에러! (Animal에 없음)
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

### 잘못된 다운캐스팅

\`\`\`java
Animal a = new Cat();  // 실제 객체는 Cat
Dog d = (Dog) a;       // 런타임 에러! ClassCastException
\`\`\`

---

## 4. instanceof 연산자

객체가 **특정 타입인지 확인**합니다. 다운캐스팅 전에 항상 확인해야 합니다.

\`\`\`java
Animal animal = new Dog();

if (animal instanceof Dog) {
    Dog dog = (Dog) animal;  // 안전한 다운캐스팅
    dog.bark();
}

if (animal instanceof Cat) {
    Cat cat = (Cat) animal;  // 이 블록은 실행 안 됨
}
\`\`\`

### Java 16+ 패턴 매칭

\`\`\`java
// instanceof와 캐스팅을 한 번에
if (animal instanceof Dog dog) {
    dog.bark();  // 캐스팅 없이 바로 사용
}
\`\`\`

---

## 5. 동적 바인딩 (Dynamic Binding)

**실행 시점**에 실제 객체의 타입에 따라 호출할 메서드가 결정됩니다.

\`\`\`java
class Animal {
    void sound() { System.out.println("..."); }
}

class Dog extends Animal {
    @Override
    void sound() { System.out.println("멍멍"); }
}

class Cat extends Animal {
    @Override
    void sound() { System.out.println("야옹"); }
}

public class Main {
    public static void main(String[] args) {
        Animal[] animals = {new Dog(), new Cat(), new Dog()};
        
        for (Animal a : animals) {
            a.sound();  // 동적 바인딩: 실제 객체 타입의 메서드 호출
        }
        // 출력: 멍멍, 야옹, 멍멍
    }
}
\`\`\`

---

## 6. 다형성의 활용

### 6.1 매개변수 다형성

\`\`\`java
void feed(Animal animal) {
    animal.eat();  // 모든 Animal 하위 타입 받기 가능
}

feed(new Dog());
feed(new Cat());
feed(new Bird());
\`\`\`

### 6.2 반환 타입 다형성

\`\`\`java
Animal createAnimal(String type) {
    if (type.equals("dog")) return new Dog();
    if (type.equals("cat")) return new Cat();
    return new Animal();
}
\`\`\`

### 6.3 컬렉션에서의 다형성

\`\`\`java
List<Animal> animals = new ArrayList<>();
animals.add(new Dog());
animals.add(new Cat());
animals.add(new Bird());

for (Animal a : animals) {
    a.sound();  // 각자의 sound() 메서드 호출
}
\`\`\`

---

## 7. 다형성과 설계 원칙

### OCP (Open-Closed Principle)

"확장에는 열려 있고, 수정에는 닫혀 있어야 한다."

\`\`\`java
// 나쁜 예: 새 동물 추가 시 코드 수정 필요
void makeSound(String animalType) {
    if (animalType.equals("dog")) {
        System.out.println("멍멍");
    } else if (animalType.equals("cat")) {
        System.out.println("야옹");
    }
    // 새 동물 추가마다 else if 추가...
}

// 좋은 예: 다형성 활용
void makeSound(Animal animal) {
    animal.sound();  // 새 동물 추가해도 이 코드는 변경 없음
}
\`\`\`
`,
            codeExamples: [
                {
                    title: "다형성을 활용한 결제 시스템",
                    language: "java",
                    code: `// 부모 클래스 (또는 인터페이스)
abstract class PaymentMethod {
    protected double balance;
    
    abstract void pay(double amount);
    abstract String getType();
    
    void showBalance() {
        System.out.println(getType() + " 잔액: " + balance);
    }
}

// 자식 클래스들
class CreditCard extends PaymentMethod {
    private String cardNumber;
    
    CreditCard(String cardNumber, double limit) {
        this.cardNumber = cardNumber;
        this.balance = limit;
    }
    
    @Override
    void pay(double amount) {
        if (balance >= amount) {
            balance -= amount;
            System.out.println("신용카드 결제: " + amount + "원");
        } else {
            System.out.println("한도 초과!");
        }
    }
    
    @Override
    String getType() { return "신용카드"; }
}

class BankTransfer extends PaymentMethod {
    private String accountNumber;
    
    BankTransfer(String accountNumber, double balance) {
        this.accountNumber = accountNumber;
        this.balance = balance;
    }
    
    @Override
    void pay(double amount) {
        if (balance >= amount) {
            balance -= amount;
            System.out.println("계좌이체 결제: " + amount + "원");
        } else {
            System.out.println("잔액 부족!");
        }
    }
    
    @Override
    String getType() { return "계좌이체"; }
}

// 다형성 활용
public class PaymentProcessor {
    public static void processPayment(PaymentMethod method, double amount) {
        // 어떤 결제 수단이든 동일한 인터페이스로 처리
        method.pay(amount);
        method.showBalance();
    }
    
    public static void main(String[] args) {
        PaymentMethod card = new CreditCard("1234-5678", 1000000);
        PaymentMethod bank = new BankTransfer("110-1234", 500000);
        
        processPayment(card, 50000);  // 신용카드 결제
        processPayment(bank, 30000);  // 계좌이체 결제
    }
}`
                },
                {
                    title: "instanceof와 다운캐스팅",
                    language: "java",
                    code: `abstract class Shape {
    abstract double area();
    abstract void draw();
}

class Circle extends Shape {
    double radius;
    
    Circle(double radius) { this.radius = radius; }
    
    @Override
    double area() { return Math.PI * radius * radius; }
    
    @Override
    void draw() { System.out.println("○ (반지름: " + radius + ")"); }
    
    // Circle만의 메서드
    double circumference() { return 2 * Math.PI * radius; }
}

class Rectangle extends Shape {
    double width, height;
    
    Rectangle(double w, double h) { width = w; height = h; }
    
    @Override
    double area() { return width * height; }
    
    @Override
    void draw() { System.out.println("□ (" + width + " x " + height + ")"); }
    
    // Rectangle만의 메서드
    double diagonal() { return Math.sqrt(width*width + height*height); }
}

public class Main {
    public static void main(String[] args) {
        Shape[] shapes = {
            new Circle(5),
            new Rectangle(4, 6),
            new Circle(3)
        };
        
        for (Shape s : shapes) {
            // 다형성: 공통 메서드 호출
            s.draw();
            System.out.println("면적: " + s.area());
            
            // instanceof로 타입 확인 후 다운캐스팅
            if (s instanceof Circle c) {  // Java 16+ 패턴 매칭
                System.out.println("둘레: " + c.circumference());
            }
            
            if (s instanceof Rectangle r) {
                System.out.println("대각선: " + r.diagonal());
            }
            System.out.println();
        }
    }
}`
                }
            ],
            keyPoints: [
                "다형성은 부모 타입 참조 변수로 여러 자식 타입 객체를 다룰 수 있게 합니다.",
                "업캐스팅(자식→부모)은 자동이고, 다운캐스팅(부모→자식)은 명시적 캐스팅이 필요합니다.",
                "다운캐스팅 전에 instanceof로 타입을 확인해야 ClassCastException을 방지할 수 있습니다.",
                "동적 바인딩에 의해 실행 시점에 실제 객체의 오버라이딩된 메서드가 호출됩니다.",
                "다형성을 활용하면 새로운 타입 추가 시 기존 코드 수정 없이 확장이 가능합니다 (OCP)."
            ],
            interviewQuestions: [
                {
                    difficulty: 'Medium',
                    question: "다형성(Polymorphism)이란 무엇인가요?",
                    answer: "하나의 객체나 메서드가 여러 가지 형태를 가질 수 있는 성질입니다. 구체적으로는 부모 타입의 참조 변수로 여러 자식 객체를 참조하여, 동일한 호출로 다른 동작(오버라이딩된 메서드)을 실행하는 것입니다."
                },
                {
                    difficulty: 'Hard',
                    question: "instanceof 연산자는 언제, 왜 사용하나요?",
                    answer: "다운캐스팅(Downcasting)을 하기 전에 해당 객체가 실제로 그 타입인지 확인하기 위해 사용합니다. 확인하지 않고 캐스팅하면 ClassCastException이 발생할 수 있습니다."
                }
            ]
        },
        {
            id: "p0-m13",
            title: "Chapter 13: 추상 클래스와 인터페이스",
            topic: "abstract 클래스, interface, default 메서드, 다중 구현",
            content: `
## 1. 추상화 (Abstraction)

**추상화**는 복잡한 시스템에서 **핵심 개념만 추출**하여 단순화하는 것입니다. Java에서는 **추상 클래스**와 **인터페이스**를 통해 추상화를 구현합니다.

---

## 2. 추상 클래스 (Abstract Class)

**추상 클래스**는 **인스턴스를 직접 생성할 수 없는** 클래스입니다. 하나 이상의 **추상 메서드**를 포함할 수 있습니다.

### 2.1 추상 클래스 정의

\`\`\`java
abstract class Animal {
    String name;
    
    // 일반 메서드 (구현 있음)
    void eat() {
        System.out.println(name + "이(가) 먹습니다.");
    }
    
    // 추상 메서드 (구현 없음, 자식이 반드시 구현)
    abstract void sound();
}
\`\`\`

### 2.2 추상 클래스 상속

\`\`\`java
class Dog extends Animal {
    Dog(String name) {
        this.name = name;
    }
    
    @Override
    void sound() {
        System.out.println(name + ": 멍멍!");
    }
}

class Cat extends Animal {
    Cat(String name) {
        this.name = name;
    }
    
    @Override
    void sound() {
        System.out.println(name + ": 야옹!");
    }
}
\`\`\`

### 2.3 추상 클래스 사용

\`\`\`java
// Animal a = new Animal();  // ❌ 컴파일 에러! 추상 클래스는 인스턴스화 불가

Animal dog = new Dog("바둑이");  // ✅ OK (다형성)
Animal cat = new Cat("나비");

dog.sound();  // 바둑이: 멍멍!
cat.sound();  // 나비: 야옹!
dog.eat();    // 바둑이이(가) 먹습니다. (상속된 일반 메서드)
\`\`\`

### 2.4 추상 클래스의 특징

| 특징 | 설명 |
|------|------|
| 인스턴스 생성 | ❌ 불가 |
| 생성자 | ✅ 가질 수 있음 (자식 생성 시 호출) |
| 필드 | ✅ 가질 수 있음 |
| 일반 메서드 | ✅ 구현된 메서드 가능 |
| 추상 메서드 | ✅ 0개 이상 가능 |
| 상속 | 단일 상속만 가능 |

---

## 3. 인터페이스 (Interface)

**인터페이스**는 **순수한 추상 타입**으로, 구현해야 할 **메서드 시그니처**만 정의합니다.

### 3.1 인터페이스 정의

\`\`\`java
interface Flyable {
    void fly();  // public abstract 생략 가능
}

interface Swimmable {
    void swim();
}
\`\`\`

### 3.2 인터페이스 구현

\`\`\`java
class Duck implements Flyable, Swimmable {  // 다중 구현 가능!
    @Override
    public void fly() {
        System.out.println("오리가 날아갑니다.");
    }
    
    @Override
    public void swim() {
        System.out.println("오리가 수영합니다.");
    }
}
\`\`\`

### 3.3 인터페이스 특징

| 특징 | Java 7 이전 | Java 8+ |
|------|-------------|---------|
| 필드 | public static final만 | 좌동 |
| 메서드 | public abstract만 | default, static, private 추가 |
| 다중 구현 | ✅ 가능 | ✅ 가능 |

---

## 4. default 메서드 (Java 8+)

인터페이스에서 **구현을 제공**할 수 있는 메서드입니다.

\`\`\`java
interface Vehicle {
    void start();
    void stop();
    
    // default 메서드: 기본 구현 제공
    default void horn() {
        System.out.println("빵빵!");
    }
}

class Car implements Vehicle {
    @Override
    public void start() {
        System.out.println("자동차 시동");
    }
    
    @Override
    public void stop() {
        System.out.println("자동차 정지");
    }
    
    // horn()은 오버라이드하지 않아도 됨 (기본 구현 사용)
}
\`\`\`

### default 메서드의 용도

1. **하위 호환성**: 기존 인터페이스에 새 메서드 추가 시 기존 구현체 깨지지 않음
2. **공통 기능**: 여러 구현체에서 동일한 로직 재사용

---

## 5. static 메서드 (Java 8+)

인터페이스에서 **유틸리티 메서드**를 제공합니다.

\`\`\`java
interface MathUtils {
    static int add(int a, int b) {
        return a + b;
    }
    
    static int multiply(int a, int b) {
        return a * b;
    }
}

// 인터페이스명으로 직접 호출
int sum = MathUtils.add(5, 3);  // 8
\`\`\`

---

## 6. 추상 클래스 vs 인터페이스

| 비교 항목 | 추상 클래스 | 인터페이스 |
|-----------|-------------|------------|
| **키워드** | \`abstract class\` | \`interface\` |
| **상속/구현** | \`extends\` (단일) | \`implements\` (다중) |
| **인스턴스 필드** | ✅ 가능 | ❌ 불가 (상수만) |
| **생성자** | ✅ 가능 | ❌ 불가 |
| **접근 제어자** | 모두 가능 | public만 (Java 9+ private 가능) |
| **사용 시점** | "is-a" 관계, 공통 상태/동작 | "can-do" 능력, 역할 정의 |

### 언제 무엇을 사용할까?

\`\`\`java
// 추상 클래스: 공통 상태와 동작이 있을 때
abstract class Pet {
    protected String name;
    protected int age;
    
    void sleep() {
        System.out.println(name + "이(가) 잡니다.");
    }
    
    abstract void makeSound();
}

// 인터페이스: 능력/역할을 정의할 때
interface Trainable {
    void train();
}

interface Playable {
    void play();
}

// 조합 사용
class Dog extends Pet implements Trainable, Playable {
    // 구현...
}
\`\`\`
`,
            codeExamples: [
                {
                    title: "추상 클래스 예제",
                    language: "java",
                    code: `// 추상 클래스: 도형
abstract class Shape {
    protected String color;
    
    // 생성자 (자식이 호출)
    public Shape(String color) {
        this.color = color;
    }
    
    // 일반 메서드
    public void displayColor() {
        System.out.println("색상: " + color);
    }
    
    // 추상 메서드 (자식이 구현)
    public abstract double area();
    public abstract double perimeter();
}

// 구체 클래스: 원
class Circle extends Shape {
    private double radius;
    
    public Circle(String color, double radius) {
        super(color);  // 부모 생성자 호출
        this.radius = radius;
    }
    
    @Override
    public double area() {
        return Math.PI * radius * radius;
    }
    
    @Override
    public double perimeter() {
        return 2 * Math.PI * radius;
    }
}

// 구체 클래스: 사각형
class Rectangle extends Shape {
    private double width, height;
    
    public Rectangle(String color, double width, double height) {
        super(color);
        this.width = width;
        this.height = height;
    }
    
    @Override
    public double area() {
        return width * height;
    }
    
    @Override
    public double perimeter() {
        return 2 * (width + height);
    }
}

// 사용
public class Main {
    public static void main(String[] args) {
        Shape[] shapes = {
            new Circle("빨강", 5),
            new Rectangle("파랑", 4, 6)
        };
        
        for (Shape s : shapes) {
            s.displayColor();
            System.out.println("면적: " + s.area());
            System.out.println("둘레: " + s.perimeter());
            System.out.println();
        }
    }
}`
                },
                {
                    title: "인터페이스와 다중 구현",
                    language: "java",
                    code: `// 인터페이스 정의
interface Flyable {
    void fly();
}

interface Swimmable {
    void swim();
}

interface Walkable {
    void walk();
    
    // default 메서드
    default void rest() {
        System.out.println("휴식 중...");
    }
}

// 다중 인터페이스 구현
class Duck implements Flyable, Swimmable, Walkable {
    private String name;
    
    public Duck(String name) {
        this.name = name;
    }
    
    @Override
    public void fly() {
        System.out.println(name + "이(가) 날아갑니다.");
    }
    
    @Override
    public void swim() {
        System.out.println(name + "이(가) 수영합니다.");
    }
    
    @Override
    public void walk() {
        System.out.println(name + "이(가) 걷습니다.");
    }
    
    // rest()는 default 구현 사용 (오버라이드 선택)
}

// 인터페이스 타입으로 사용 (다형성)
public class Main {
    public static void main(String[] args) {
        Duck duck = new Duck("도널드");
        
        // 다양한 인터페이스 타입으로 참조 가능
        Flyable flyer = duck;
        Swimmable swimmer = duck;
        Walkable walker = duck;
        
        flyer.fly();      // 날기
        swimmer.swim();   // 수영
        walker.walk();    // 걷기
        walker.rest();    // default 메서드
    }
}`
                }
            ],
            keyPoints: [
                "추상 클래스는 abstract 키워드로 선언하며, 직접 인스턴스화할 수 없습니다.",
                "추상 메서드는 구현 없이 시그니처만 정의하며, 자식 클래스가 반드시 구현해야 합니다.",
                "인터페이스는 다중 구현이 가능하며, 클래스는 extends로 하나, implements로 여러 인터페이스를 조합할 수 있습니다.",
                "Java 8+에서 인터페이스는 default 메서드(기본 구현)와 static 메서드를 가질 수 있습니다.",
                "추상 클래스는 'is-a' 관계와 공통 상태에, 인터페이스는 'can-do' 능력 정의에 적합합니다."
            ],
            interviewQuestions: [
                {
                    difficulty: 'Medium',
                    question: "추상 클래스와 인터페이스의 결정적인 차이는 무엇인가요?",
                    answer: "추상 클래스는 '상태(필드)'와 '생성자'를 가질 수 있고 'is-a' 관계(본질)를 나타내지만, 인터페이스는 상수 외의 상태를 가질 수 없고 'can-do'(기능)를 정의하며 다중 구현이 가능합니다."
                },
                {
                    difficulty: 'Easy',
                    question: "인터페이스도 구현된 메서드를 가질 수 있나요?",
                    answer: "네, Java 8부터는 default 메서드와 static 메서드를 통해 구현부를 가질 수 있습니다."
                }
            ]
        },
        {
            id: "p0-m14",
            title: "Chapter 14: 예외 처리",
            topic: "try-catch-finally, throw/throws, 체크/언체크 예외, 사용자 정의 예외",
            content: `
## 1. 예외(Exception)란?

**예외**는 프로그램 실행 중 발생하는 **비정상적인 상황**입니다. 예외 처리를 통해 프로그램이 갑자기 종료되지 않고 **적절히 대응**할 수 있습니다.

---

## 2. 예외 계층 구조

\`\`\`
Throwable
├── Error (시스템 오류, 복구 불가)
│   ├── OutOfMemoryError
│   ├── StackOverflowError
│   └── ...
└── Exception (예외, 복구 가능)
    ├── RuntimeException (Unchecked)
    │   ├── NullPointerException
    │   ├── ArrayIndexOutOfBoundsException
    │   ├── ClassCastException
    │   └── ...
    └── IOException, SQLException (Checked)
        └── ...
\`\`\`

### Checked vs Unchecked 예외

| 종류 | 컴파일러 검사 | 처리 강제 | 예시 |
|------|---------------|-----------|------|
| **Checked** | ✅ | ✅ 필수 (try-catch 또는 throws) | IOException, SQLException |
| **Unchecked** | ❌ | ❌ 선택 | NullPointerException, ArrayIndexOutOfBoundsException |

---

## 3. try-catch 문

### 3.1 기본 구조

\`\`\`java
try {
    // 예외가 발생할 수 있는 코드
} catch (예외타입 변수명) {
    // 예외 발생 시 실행되는 코드
}
\`\`\`

\`\`\`java
try {
    int result = 10 / 0;  // ArithmeticException 발생
    System.out.println("결과: " + result);  // 실행 안 됨
} catch (ArithmeticException e) {
    System.out.println("0으로 나눌 수 없습니다!");
    System.out.println("예외 메시지: " + e.getMessage());
}
System.out.println("프로그램 계속 실행");
\`\`\`

### 3.2 다중 catch

\`\`\`java
try {
    // 여러 종류의 예외 가능
} catch (ArithmeticException e) {
    System.out.println("산술 오류");
} catch (ArrayIndexOutOfBoundsException e) {
    System.out.println("배열 인덱스 오류");
} catch (Exception e) {
    // 모든 예외를 잡는 핸들러 (마지막에 위치)
    System.out.println("알 수 없는 오류: " + e.getMessage());
}
\`\`\`

### 3.3 멀티 catch (Java 7+)

\`\`\`java
try {
    // ...
} catch (ArithmeticException | NullPointerException e) {
    System.out.println("산술 또는 널 오류: " + e.getMessage());
}
\`\`\`

---

## 4. finally 블록

**finally**는 예외 발생 여부와 관계없이 **항상 실행**됩니다.

\`\`\`java
FileReader reader = null;
try {
    reader = new FileReader("file.txt");
    // 파일 읽기
} catch (FileNotFoundException e) {
    System.out.println("파일을 찾을 수 없습니다.");
} finally {
    // 리소스 정리 (항상 실행)
    if (reader != null) {
        try {
            reader.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
\`\`\`

---

## 5. try-with-resources (Java 7+)

**AutoCloseable**을 구현한 리소스를 자동으로 닫아줍니다.

\`\`\`java
// try-with-resources: 자동으로 close() 호출
try (FileReader reader = new FileReader("file.txt");
     BufferedReader br = new BufferedReader(reader)) {
    String line;
    while ((line = br.readLine()) != null) {
        System.out.println(line);
    }
} catch (IOException e) {
    System.out.println("파일 읽기 오류: " + e.getMessage());
}
// reader, br 자동으로 닫힘!
\`\`\`

---

## 6. throw와 throws

### 6.1 throw: 예외 발생시키기

\`\`\`java
public void setAge(int age) {
    if (age < 0) {
        throw new IllegalArgumentException("나이는 음수일 수 없습니다.");
    }
    this.age = age;
}
\`\`\`

### 6.2 throws: 예외 선언 (호출자에게 위임)

\`\`\`java
public void readFile(String path) throws IOException {
    FileReader reader = new FileReader(path);  // IOException 발생 가능
    // ...
}

// 호출하는 쪽에서 처리
try {
    readFile("data.txt");
} catch (IOException e) {
    System.out.println("파일 오류");
}
\`\`\`

---

## 7. 사용자 정의 예외

### 7.1 커스텀 예외 클래스

\`\`\`java
// Checked 예외
class InsufficientBalanceException extends Exception {
    private double amount;
    
    public InsufficientBalanceException(String message, double amount) {
        super(message);
        this.amount = amount;
    }
    
    public double getAmount() {
        return amount;
    }
}

// Unchecked 예외
class InvalidAgeException extends RuntimeException {
    public InvalidAgeException(String message) {
        super(message);
    }
}
\`\`\`

### 7.2 사용 예시

\`\`\`java
class BankAccount {
    private double balance;
    
    public void withdraw(double amount) throws InsufficientBalanceException {
        if (amount > balance) {
            throw new InsufficientBalanceException(
                "잔액 부족! 현재: " + balance + ", 요청: " + amount, 
                amount
            );
        }
        balance -= amount;
    }
}
\`\`\`

---

## 8. 예외 처리 모범 사례

### ✅ Do

1. **구체적인 예외를 먼저** catch (하위 → 상위 순서)
2. **의미 있는 예외 메시지** 제공
3. **리소스는 try-with-resources** 사용
4. **예외를 무시하지 않기** (빈 catch 블록 금지)

### ❌ Don't

\`\`\`java
// 나쁜 예: 예외 무시
try {
    // ...
} catch (Exception e) {
    // 아무것도 안 함 (최악!)
}

// 나쁜 예: 너무 넓은 예외
try {
    // ...
} catch (Exception e) {  // 모든 예외를 뭉뚱그림
    System.out.println("오류");
}
\`\`\`
`,
            codeExamples: [
                {
                    title: "기본 예외 처리",
                    language: "java",
                    code: `public class ExceptionDemo {
    public static void main(String[] args) {
        // 1. 기본 try-catch
        try {
            int[] arr = {1, 2, 3};
            System.out.println(arr[5]);  // ArrayIndexOutOfBoundsException
        } catch (ArrayIndexOutOfBoundsException e) {
            System.out.println("배열 인덱스 오류: " + e.getMessage());
        }
        
        // 2. 다중 catch
        try {
            String str = null;
            System.out.println(str.length());  // NullPointerException
        } catch (NullPointerException e) {
            System.out.println("널 참조 오류!");
        } catch (Exception e) {
            System.out.println("기타 오류: " + e.getMessage());
        }
        
        // 3. finally
        try {
            int result = divide(10, 2);
            System.out.println("결과: " + result);
        } catch (ArithmeticException e) {
            System.out.println("나누기 오류");
        } finally {
            System.out.println("finally 블록 실행됨");
        }
        
        System.out.println("프로그램 정상 종료");
    }
    
    public static int divide(int a, int b) {
        return a / b;
    }
}`
                },
                {
                    title: "사용자 정의 예외",
                    language: "java",
                    code: `// 커스텀 예외 정의
class InvalidScoreException extends Exception {
    private int score;
    
    public InvalidScoreException(String message, int score) {
        super(message);
        this.score = score;
    }
    
    public int getScore() {
        return score;
    }
}

// 학생 클래스
class Student {
    private String name;
    private int score;
    
    public Student(String name) {
        this.name = name;
    }
    
    public void setScore(int score) throws InvalidScoreException {
        if (score < 0 || score > 100) {
            throw new InvalidScoreException(
                "점수는 0~100 사이여야 합니다. 입력값: " + score, 
                score
            );
        }
        this.score = score;
    }
    
    public char getGrade() {
        if (score >= 90) return 'A';
        if (score >= 80) return 'B';
        if (score >= 70) return 'C';
        if (score >= 60) return 'D';
        return 'F';
    }
}

// 사용
public class Main {
    public static void main(String[] args) {
        Student student = new Student("홍길동");
        
        try {
            student.setScore(85);  // 정상
            System.out.println("학점: " + student.getGrade());
            
            student.setScore(150);  // 예외 발생!
        } catch (InvalidScoreException e) {
            System.out.println("예외 발생: " + e.getMessage());
            System.out.println("잘못된 점수: " + e.getScore());
        }
    }
}`
                }
            ],
            keyPoints: [
                "예외는 Checked(컴파일러가 검사, 처리 강제)와 Unchecked(RuntimeException 하위, 처리 선택)로 나뉩니다.",
                "try-catch로 예외를 잡고, finally는 예외 발생 여부와 관계없이 항상 실행됩니다.",
                "try-with-resources는 AutoCloseable 리소스를 자동으로 닫아줍니다 (Java 7+).",
                "throw로 예외를 발생시키고, throws로 호출자에게 예외 처리를 위임합니다.",
                "사용자 정의 예외는 Exception(Checked) 또는 RuntimeException(Unchecked)을 상속합니다."
            ],
            interviewQuestions: [
                {
                    difficulty: 'Medium',
                    question: "Checked Exception과 Unchecked Exception의 차이는?",
                    answer: "Checked Exception(Exception 상속)은 컴파일러가 처리를 강제하며(try-catch 필수), Unchecked Exception(RuntimeException 상속)은 처리를 강제하지 않습니다."
                },
                {
                    difficulty: 'Easy',
                    question: "try-with-resources 구문을 사용하는 이유는?",
                    answer: "파일이나 네트워크 연결 같은 리소스를 사용 후 자동으로 close() 해주어 자원 누수를 방지하고 코드를 간결하게 합니다."
                }
            ]
        },
        {
            id: "p0-m15",
            title: "Chapter 15: 컬렉션 프레임워크",
            topic: "List, Set, Map, Iterator, ArrayList vs LinkedList",
            content: `
## 1. 컬렉션 프레임워크란?

**컬렉션 프레임워크**는 데이터를 저장하고 관리하는 **자료구조와 알고리즘을 표준화**한 라이브러리입니다.

### 배열의 한계
- 크기가 고정됨
- 중간에 삽입/삭제가 어려움
- 타입별로 다른 배열 필요

### 컬렉션의 장점
- **동적 크기**: 자동으로 크기 조절
- **다양한 자료구조**: List, Set, Map 등
- **유틸리티 메서드**: 정렬, 검색, 순회 등

---

## 2. 컬렉션 계층 구조

\`\`\`
Collection (인터페이스)
├── List (순서 O, 중복 O)
│   ├── ArrayList
│   ├── LinkedList
│   └── Vector
├── Set (순서 X, 중복 X)
│   ├── HashSet
│   ├── LinkedHashSet
│   └── TreeSet
└── Queue (FIFO)
    ├── LinkedList
    └── PriorityQueue

Map (Key-Value 쌍, 키는 중복 X)
├── HashMap
├── LinkedHashMap
├── TreeMap
└── Hashtable
\`\`\`

---

## 3. List 인터페이스

**순서가 있고 중복을 허용**하는 컬렉션입니다.

### 3.1 ArrayList

**배열 기반**으로 구현됩니다. 인덱스로 빠르게 접근할 수 있습니다.

\`\`\`java
import java.util.ArrayList;
import java.util.List;

List<String> fruits = new ArrayList<>();

// 추가
fruits.add("사과");
fruits.add("바나나");
fruits.add("오렌지");
fruits.add(1, "포도");  // 인덱스 1에 삽입

// 접근
System.out.println(fruits.get(0));  // 사과
System.out.println(fruits.size());  // 4

// 수정
fruits.set(0, "딸기");  // 사과 → 딸기

// 삭제
fruits.remove("바나나");     // 값으로 삭제
fruits.remove(0);            // 인덱스로 삭제

// 포함 여부
boolean has = fruits.contains("오렌지");  // true
\`\`\`

### 3.2 LinkedList

**노드 기반**으로 구현됩니다. 삽입/삭제가 빠릅니다.

\`\`\`java
import java.util.LinkedList;

LinkedList<Integer> numbers = new LinkedList<>();
numbers.add(1);
numbers.add(2);
numbers.addFirst(0);  // 맨 앞에 추가
numbers.addLast(3);   // 맨 뒤에 추가

System.out.println(numbers);  // [0, 1, 2, 3]
\`\`\`

### 3.3 ArrayList vs LinkedList

| 비교 | ArrayList | LinkedList |
|------|-----------|------------|
| 내부 구조 | 동적 배열 | 이중 연결 리스트 |
| 접근 속도 | O(1) | O(n) |
| 삽입/삭제 | O(n) | O(1) |
| 메모리 | 효율적 | 노드당 추가 메모리 |
| 사용 시점 | 읽기/조회 많을 때 | 삽입/삭제 많을 때 |

---

## 4. Set 인터페이스

**순서가 없고 중복을 허용하지 않는** 컬렉션입니다.

### 4.1 HashSet

해시 테이블 기반으로 O(1) 성능을 제공합니다.

\`\`\`java
import java.util.HashSet;
import java.util.Set;

Set<String> names = new HashSet<>();
names.add("홍길동");
names.add("김철수");
names.add("홍길동");  // 중복, 추가 안 됨!

System.out.println(names.size());  // 2
System.out.println(names);  // [홍길동, 김철수] (순서 보장 X)
\`\`\`

### 4.2 LinkedHashSet

입력 순서를 유지하는 Set입니다.

\`\`\`java
Set<String> orderedSet = new LinkedHashSet<>();
orderedSet.add("C");
orderedSet.add("A");
orderedSet.add("B");
System.out.println(orderedSet);  // [C, A, B] (입력 순서 유지)
\`\`\`

### 4.3 TreeSet

정렬된 상태를 유지합니다 (자연 순서 또는 Comparator).

\`\`\`java
import java.util.TreeSet;

Set<Integer> sortedSet = new TreeSet<>();
sortedSet.add(5);
sortedSet.add(1);
sortedSet.add(3);
System.out.println(sortedSet);  // [1, 3, 5] (정렬됨)
\`\`\`

---

## 5. Map 인터페이스

**키-값(Key-Value) 쌍**으로 데이터를 저장합니다. 키는 중복 불가입니다.

### 5.1 HashMap

\`\`\`java
import java.util.HashMap;
import java.util.Map;

Map<String, Integer> scores = new HashMap<>();

// 추가
scores.put("홍길동", 85);
scores.put("김철수", 90);
scores.put("이영희", 77);

// 접근
System.out.println(scores.get("홍길동"));  // 85

// 수정 (같은 키로 다시 put)
scores.put("홍길동", 95);

// 삭제
scores.remove("이영희");

// 포함 여부
boolean hasKey = scores.containsKey("김철수");  // true
boolean hasValue = scores.containsValue(90);    // true

// 기본값
int score = scores.getOrDefault("박민수", 0);  // 없으면 0 반환
\`\`\`

### 5.2 Map 순회

\`\`\`java
// 1. keySet() - 키 순회
for (String key : scores.keySet()) {
    System.out.println(key + ": " + scores.get(key));
}

// 2. entrySet() - 키-값 쌍 순회 (권장)
for (Map.Entry<String, Integer> entry : scores.entrySet()) {
    System.out.println(entry.getKey() + ": " + entry.getValue());
}

// 3. values() - 값만 순회
for (Integer value : scores.values()) {
    System.out.println(value);
}
\`\`\`

---

## 6. Iterator

컬렉션을 순회하는 표준 인터페이스입니다.

\`\`\`java
List<String> list = new ArrayList<>(Arrays.asList("A", "B", "C"));

Iterator<String> it = list.iterator();
while (it.hasNext()) {
    String item = it.next();
    if (item.equals("B")) {
        it.remove();  // 순회 중 안전하게 삭제
    }
}
System.out.println(list);  // [A, C]
\`\`\`

### for-each vs Iterator

\`\`\`java
// for-each 중 삭제 시 ConcurrentModificationException 발생!
for (String item : list) {
    if (item.equals("B")) {
        list.remove(item);  // ❌ 에러!
    }
}

// Iterator 사용 시 안전
Iterator<String> it = list.iterator();
while (it.hasNext()) {
    if (it.next().equals("B")) {
        it.remove();  // ✅ OK
    }
}
\`\`\`

---

## 7. Collections 유틸리티 클래스

\`\`\`java
import java.util.Collections;

List<Integer> nums = new ArrayList<>(Arrays.asList(3, 1, 4, 1, 5));

Collections.sort(nums);          // 정렬: [1, 1, 3, 4, 5]
Collections.reverse(nums);       // 역순: [5, 4, 3, 1, 1]
Collections.shuffle(nums);       // 섞기
int max = Collections.max(nums); // 최댓값
int min = Collections.min(nums); // 최솟값
int freq = Collections.frequency(nums, 1);  // 1의 개수
\`\`\`
`,
            codeExamples: [
                {
                    title: "List 활용 예제",
                    language: "java",
                    code: `import java.util.*;

public class ListDemo {
    public static void main(String[] args) {
        // ArrayList 사용
        List<String> students = new ArrayList<>();
        students.add("홍길동");
        students.add("김철수");
        students.add("이영희");
        students.add("박민수");
        
        // 순회 - for-each
        System.out.println("=== 학생 목록 ===");
        for (String student : students) {
            System.out.println(student);
        }
        
        // 순회 - 인덱스
        for (int i = 0; i < students.size(); i++) {
            System.out.println((i + 1) + "번: " + students.get(i));
        }
        
        // 검색
        int index = students.indexOf("김철수");
        System.out.println("김철수 위치: " + index);
        
        // 정렬
        Collections.sort(students);
        System.out.println("정렬 후: " + students);
        
        // 역순 정렬
        Collections.sort(students, Collections.reverseOrder());
        System.out.println("역순 후: " + students);
        
        // 특정 조건으로 필터링 (Java 8+)
        students.removeIf(s -> s.startsWith("김"));
        System.out.println("김씨 제거 후: " + students);
    }
}`
                },
                {
                    title: "Map 활용 예제",
                    language: "java",
                    code: `import java.util.*;

public class MapDemo {
    public static void main(String[] args) {
        // 학생 점수 관리
        Map<String, Integer> scores = new HashMap<>();
        scores.put("홍길동", 85);
        scores.put("김철수", 90);
        scores.put("이영희", 77);
        scores.put("박민수", 92);
        
        // 점수 조회
        System.out.println("홍길동 점수: " + scores.get("홍길동"));
        
        // 모든 학생 점수 출력
        System.out.println("\\n=== 전체 성적 ===");
        for (Map.Entry<String, Integer> entry : scores.entrySet()) {
            String grade = getGrade(entry.getValue());
            System.out.printf("%s: %d점 (%s)%n", 
                entry.getKey(), entry.getValue(), grade);
        }
        
        // 통계
        int sum = 0;
        for (int score : scores.values()) {
            sum += score;
        }
        double avg = (double) sum / scores.size();
        System.out.printf("\\n평균: %.2f점%n", avg);
        System.out.println("최고점: " + Collections.max(scores.values()));
        System.out.println("최저점: " + Collections.min(scores.values()));
        
        // 조건부 처리
        scores.computeIfPresent("홍길동", (k, v) -> v + 5);  // 5점 추가
        System.out.println("홍길동 보너스 후: " + scores.get("홍길동"));
    }
    
    static String getGrade(int score) {
        if (score >= 90) return "A";
        if (score >= 80) return "B";
        if (score >= 70) return "C";
        if (score >= 60) return "D";
        return "F";
    }
}`
                }
            ],
            keyPoints: [
                "List는 순서가 있고 중복을 허용하며, ArrayList(배열 기반)와 LinkedList(노드 기반)가 있습니다.",
                "Set은 중복을 허용하지 않으며, HashSet(순서 X), LinkedHashSet(입력 순서), TreeSet(정렬)이 있습니다.",
                "Map은 Key-Value 쌍으로 저장하며, 키는 중복 불가합니다. HashMap이 가장 많이 사용됩니다.",
                "for-each 중 컬렉션 수정은 ConcurrentModificationException을 발생시킵니다. Iterator.remove()를 사용하세요.",
                "Collections 유틸리티 클래스는 정렬, 역순, 섞기, 최대/최소값 등의 기능을 제공합니다."
            ],
            interviewQuestions: [
                {
                    difficulty: 'Easy',
                    question: "ArrayList와 LinkedList의 차이점은?",
                    answer: "ArrayList는 배열 기반이라 조회가 빠르지만 중간 삽입/삭제가 느리고, LinkedList는 노드 연결 기반이라 조회는 느리지만 삽입/삭제가 빠릅니다."
                },
                {
                    difficulty: 'Medium',
                    question: "HashMap과 HashTable의 차이는?",
                    answer: "HashMap은 동기화되지 않아 빠르고 null 키를 허용하지만, HashTable은 동기화되어 스레드 안전하지만 느리고 null을 허용하지 않습니다. (최신엔 ConcurrentHashMap 권장)"
                }
            ]
        },
        {
            id: "p0-m16",
            title: "Chapter 16: 제네릭 (Generics)",
            topic: "제네릭 클래스/메서드, 타입 파라미터, 와일드카드, 타입 소거",
            content: `
## 1. 제네릭이란?

**제네릭**은 클래스나 메서드에서 사용할 **데이터 타입을 나중에 지정**할 수 있게 하는 기능입니다.

### 제네릭 없이

\`\`\`java
// Object로 모든 타입을 받지만...
List list = new ArrayList();
list.add("Hello");
list.add(123);  // 다른 타입도 추가 가능

String s = (String) list.get(0);  // 형변환 필요
String s2 = (String) list.get(1); // 런타임 에러! (Integer → String)
\`\`\`

### 제네릭 사용

\`\`\`java
List<String> list = new ArrayList<>();  // String만 저장
list.add("Hello");
// list.add(123);  // 컴파일 에러!

String s = list.get(0);  // 형변환 불필요
\`\`\`

### 제네릭의 장점
1. **타입 안전성**: 컴파일 시점에 타입 체크
2. **형변환 불필요**: 자동으로 올바른 타입 반환
3. **코드 재사용**: 하나의 코드로 여러 타입 처리

---

## 2. 제네릭 클래스

### 2.1 정의

\`\`\`java
class Box<T> {  // T = Type Parameter
    private T content;
    
    public void set(T content) {
        this.content = content;
    }
    
    public T get() {
        return content;
    }
}
\`\`\`

### 2.2 사용

\`\`\`java
Box<String> stringBox = new Box<>();
stringBox.set("Hello");
String s = stringBox.get();  // 형변환 불필요

Box<Integer> intBox = new Box<>();
intBox.set(123);
int n = intBox.get();  // Auto Unboxing
\`\`\`

### 2.3 타입 파라미터 관례

| 문자 | 의미 | 예시 |
|------|------|------|
| T | Type | \`Box<T>\` |
| E | Element | \`List<E>\` |
| K | Key | \`Map<K, V>\` |
| V | Value | \`Map<K, V>\` |
| N | Number | \`class Calc<N extends Number>\` |
| R | Return | \`Function<T, R>\` |

---

## 3. 제네릭 메서드

클래스 전체가 아닌 **특정 메서드만** 제네릭으로 만들 수 있습니다.

\`\`\`java
public class Util {
    // 제네릭 메서드
    public static <T> void printArray(T[] arr) {
        for (T item : arr) {
            System.out.println(item);
        }
    }
    
    public static <T> T getFirst(List<T> list) {
        if (list.isEmpty()) return null;
        return list.get(0);
    }
}

// 사용
String[] names = {"A", "B", "C"};
Util.printArray(names);  // 타입 추론됨

Integer[] nums = {1, 2, 3};
Util.printArray(nums);
\`\`\`

---

## 4. 제한된 타입 파라미터 (Bounded Type)

### 4.1 상한 제한 (extends)

\`\`\`java
// Number와 그 하위 타입만 허용
class NumberBox<T extends Number> {
    private T value;
    
    public double doubleValue() {
        return value.doubleValue();  // Number의 메서드 사용 가능
    }
}

NumberBox<Integer> intBox = new NumberBox<>();  // ✅ OK
NumberBox<Double> doubleBox = new NumberBox<>();  // ✅ OK
// NumberBox<String> strBox = new NumberBox<>();  // ❌ 컴파일 에러!
\`\`\`

### 4.2 다중 제한

\`\`\`java
// 클래스와 인터페이스 조합 (클래스가 먼저)
class MyClass<T extends Number & Comparable<T>> {
    // T는 Number를 상속하고 Comparable을 구현해야 함
}
\`\`\`

---

## 5. 와일드카드 (Wildcard)

\`?\`를 사용하여 알 수 없는 타입을 표현합니다.

### 5.1 비제한 와일드카드 (?)

\`\`\`java
public void printList(List<?> list) {
    for (Object item : list) {
        System.out.println(item);
    }
}

// 모든 타입의 List를 받을 수 있음
printList(new ArrayList<String>());
printList(new ArrayList<Integer>());
\`\`\`

### 5.2 상한 와일드카드 (? extends T)

**읽기 전용**으로 사용합니다. T와 T의 하위 타입을 허용합니다.

\`\`\`java
public double sum(List<? extends Number> list) {
    double total = 0;
    for (Number n : list) {
        total += n.doubleValue();
    }
    return total;
}

sum(new ArrayList<Integer>());  // ✅ OK
sum(new ArrayList<Double>());   // ✅ OK
\`\`\`

### 5.3 하한 와일드카드 (? super T)

**쓰기 전용**으로 사용합니다. T와 T의 상위 타입을 허용합니다.

\`\`\`java
public void addNumbers(List<? super Integer> list) {
    list.add(1);
    list.add(2);
    list.add(3);
}

addNumbers(new ArrayList<Integer>()); // ✅ OK
addNumbers(new ArrayList<Number>());  // ✅ OK
addNumbers(new ArrayList<Object>());  // ✅ OK
\`\`\`

### 5.4 PECS 원칙

**P**roducer **E**xtends, **C**onsumer **S**uper

- 데이터를 **읽기(꺼내기)**만 한다 → \`? extends\`
- 데이터를 **쓰기(넣기)**만 한다 → \`? super\`

---

## 6. 타입 소거 (Type Erasure)

제네릭은 **컴파일 시점에만** 존재하고, 런타임에는 **타입 정보가 제거**됩니다.

\`\`\`java
// 컴파일 전
List<String> list = new ArrayList<>();
list.add("Hello");
String s = list.get(0);

// 컴파일 후 (바이트코드)
List list = new ArrayList();  // 제네릭 제거
list.add("Hello");
String s = (String) list.get(0);  // 컴파일러가 캐스팅 추가
\`\`\`

### 타입 소거의 결과

\`\`\`java
// 런타임에 같은 타입으로 취급됨
List<String> stringList = new ArrayList<>();
List<Integer> intList = new ArrayList<>();

System.out.println(stringList.getClass() == intList.getClass());  // true!
\`\`\`
`,
            codeExamples: [
                {
                    title: "제네릭 클래스 구현",
                    language: "java",
                    code: `// 제네릭 Pair 클래스
class Pair<K, V> {
    private K key;
    private V value;
    
    public Pair(K key, V value) {
        this.key = key;
        this.value = value;
    }
    
    public K getKey() { return key; }
    public V getValue() { return value; }
    
    public void setKey(K key) { this.key = key; }
    public void setValue(V value) { this.value = value; }
    
    @Override
    public String toString() {
        return "(" + key + ", " + value + ")";
    }
}

// 제네릭 스택 구현
class GenericStack<E> {
    private List<E> elements = new ArrayList<>();
    
    public void push(E item) {
        elements.add(item);
    }
    
    public E pop() {
        if (isEmpty()) {
            throw new RuntimeException("스택이 비어있습니다.");
        }
        return elements.remove(elements.size() - 1);
    }
    
    public E peek() {
        if (isEmpty()) {
            throw new RuntimeException("스택이 비어있습니다.");
        }
        return elements.get(elements.size() - 1);
    }
    
    public boolean isEmpty() {
        return elements.isEmpty();
    }
    
    public int size() {
        return elements.size();
    }
}

// 사용
public class Main {
    public static void main(String[] args) {
        // Pair 사용
        Pair<String, Integer> student = new Pair<>("홍길동", 85);
        System.out.println(student.getKey() + ": " + student.getValue());
        
        // 스택 사용
        GenericStack<String> stack = new GenericStack<>();
        stack.push("A");
        stack.push("B");
        stack.push("C");
        
        while (!stack.isEmpty()) {
            System.out.println(stack.pop());  // C, B, A
        }
    }
}`
                },
                {
                    title: "와일드카드 활용",
                    language: "java",
                    code: `import java.util.*;

public class WildcardDemo {
    public static void main(String[] args) {
        List<Integer> intList = Arrays.asList(1, 2, 3, 4, 5);
        List<Double> doubleList = Arrays.asList(1.1, 2.2, 3.3);
        
        // extends: 읽기 전용 (합계 계산)
        System.out.println("정수 합: " + sum(intList));
        System.out.println("실수 합: " + sum(doubleList));
        
        // super: 쓰기 전용
        List<Number> numbers = new ArrayList<>();
        addIntegers(numbers);
        System.out.println("Numbers: " + numbers);
    }
    
    // ? extends Number: Number의 하위 타입 읽기 가능
    public static double sum(List<? extends Number> list) {
        double total = 0;
        for (Number n : list) {
            total += n.doubleValue();
        }
        return total;
    }
    
    // ? super Integer: Integer의 상위 타입에 쓰기 가능
    public static void addIntegers(List<? super Integer> list) {
        for (int i = 1; i <= 5; i++) {
            list.add(i);
        }
    }
    
    // 비제한 와일드카드: 모든 타입 허용 (읽기 전용)
    public static void printList(List<?> list) {
        for (Object item : list) {
            System.out.println(item);
        }
    }
    
    // 제네릭 메서드
    public static <T extends Comparable<T>> T max(List<T> list) {
        if (list.isEmpty()) return null;
        T max = list.get(0);
        for (T item : list) {
            if (item.compareTo(max) > 0) {
                max = item;
            }
        }
        return max;
    }
}`
                }
            ],
            keyPoints: [
                "제네릭은 타입을 파라미터로 받아 컴파일 시점에 타입 안전성을 보장합니다.",
                "제네릭 클래스는 <T>, 제네릭 메서드는 반환타입 앞에 <T>를 붙여 정의합니다.",
                "extends로 타입 파라미터의 상한을 제한할 수 있습니다 (T extends Number).",
                "와일드카드(?)는 읽기 전용(? extends)과 쓰기 전용(? super)으로 구분합니다. PECS 원칙을 기억하세요.",
                "제네릭 타입 정보는 컴파일 후 제거됩니다 (타입 소거). 런타임에는 원시 타입으로 동작합니다."
            ],
            interviewQuestions: [
                {
                    difficulty: 'Easy',
                    question: "제네릭(Generics)을 사용하는 주된 이유는?",
                    answer: "컴파일 시점에 타입을 체크하여 타입 안전성을 높이고, 불필요한 캐스팅 코드를 줄이기 위해서입니다."
                },
                {
                    difficulty: 'Hard',
                    question: "타입 소거(Type Erasure)란 무엇인가요?",
                    answer: "제네릭은 컴파일 타임에만 존재하고, 컴파일된 바이트코드(.class)에는 제네릭 타입 정보가 지워지고(Object 또는 상한타입으로 변환) 원시 타입으로 남는 것을 말합니다. 하위 호환성을 위함입니다."
                }
            ]
        },
        {
            id: "p0-m17",
            title: "Chapter 17: 람다 표현식",
            topic: "함수형 인터페이스, 람다 문법, 메서드 참조, 클로저",
            content: `
## 1. 람다 표현식이란?

**람다 표현식(Lambda Expression)** 은 **익명 함수**를 간결하게 표현하는 문법입니다. Java 8에서 도입되었습니다.

### 람다 이전

\`\`\`java
// 익명 클래스로 Runnable 구현
Runnable task = new Runnable() {
    @Override
    public void run() {
        System.out.println("Hello!");
    }
};
\`\`\`

### 람다 사용

\`\`\`java
Runnable task = () -> System.out.println("Hello!");
\`\`\`

---

## 2. 람다 문법

### 2.1 기본 형식

\`\`\`java
(매개변수) -> { 실행문; }
\`\`\`

### 2.2 다양한 형태

\`\`\`java
// 매개변수 없음
() -> System.out.println("Hello")

// 매개변수 1개 (괄호 생략 가능)
x -> x * 2
(x) -> x * 2

// 매개변수 2개 이상
(x, y) -> x + y

// 실행문이 여러 줄
(x, y) -> {
    int sum = x + y;
    return sum;
}

// 타입 명시 (보통 생략)
(int x, int y) -> x + y
\`\`\`

---

## 3. 함수형 인터페이스 (Functional Interface)

람다는 **추상 메서드가 딱 1개**인 인터페이스의 구현체로 사용됩니다.

\`\`\`java
@FunctionalInterface
interface Calculator {
    int calculate(int a, int b);
}

Calculator add = (a, b) -> a + b;
Calculator multiply = (a, b) -> a * b;

System.out.println(add.calculate(5, 3));      // 8
System.out.println(multiply.calculate(5, 3)); // 15
\`\`\`

### 주요 내장 함수형 인터페이스

| 인터페이스 | 메서드 | 설명 |
|------------|--------|------|
| \`Runnable\` | \`void run()\` | 매개변수/반환값 없음 |
| \`Consumer<T>\` | \`void accept(T)\` | 매개변수 받고 반환값 없음 |
| \`Supplier<T>\` | \`T get()\` | 매개변수 없고 반환값 있음 |
| \`Function<T,R>\` | \`R apply(T)\` | 매개변수 받고 변환하여 반환 |
| \`Predicate<T>\` | \`boolean test(T)\` | 조건 검사 |
| \`BiFunction<T,U,R>\` | \`R apply(T,U)\` | 매개변수 2개 |

\`\`\`java
import java.util.function.*;

// Consumer: 소비자 (반환값 없음)
Consumer<String> printer = s -> System.out.println(s);
printer.accept("Hello");

// Supplier: 공급자 (매개변수 없음)
Supplier<Double> random = () -> Math.random();
System.out.println(random.get());

// Function: 변환
Function<String, Integer> length = s -> s.length();
System.out.println(length.apply("Hello"));  // 5

// Predicate: 조건 검사
Predicate<Integer> isPositive = n -> n > 0;
System.out.println(isPositive.test(5));    // true
System.out.println(isPositive.test(-3));   // false
\`\`\`

---

## 4. 메서드 참조 (Method Reference)

람다를 **더 간결하게** 표현하는 방법입니다.

### 4.1 종류

| 유형 | 람다 | 메서드 참조 |
|------|------|-------------|
| 정적 메서드 | \`x -> Math.abs(x)\` | \`Math::abs\` |
| 인스턴스 메서드 | \`s -> s.length()\` | \`String::length\` |
| 특정 객체의 메서드 | \`x -> out.println(x)\` | \`System.out::println\` |
| 생성자 | \`() -> new ArrayList()\` | \`ArrayList::new\` |

\`\`\`java
import java.util.Arrays;
import java.util.List;

List<String> names = Arrays.asList("Alice", "Bob", "Charlie");

// 람다
names.forEach(s -> System.out.println(s));

// 메서드 참조
names.forEach(System.out::println);
\`\`\`

---

## 5. 클로저 (Closure)

람다는 **외부 변수를 캡처**할 수 있습니다. 단, 캡처된 변수는 **effectively final**이어야 합니다.

\`\`\`java
String prefix = "Hello, ";  // effectively final

Consumer<String> greeter = name -> {
    System.out.println(prefix + name);  // 외부 변수 사용
};

greeter.accept("World");  // Hello, World

// prefix = "Hi, ";  // ❌ 재할당하면 람다에서 사용 불가!
\`\`\`

---

## 6. 람다 활용 예제

### 리스트 정렬

\`\`\`java
List<String> names = new ArrayList<>(Arrays.asList("Charlie", "Alice", "Bob"));

// Comparator 람다
names.sort((a, b) -> a.compareTo(b));
// 또는 메서드 참조
names.sort(String::compareTo);
\`\`\`

### 조건부 필터링

\`\`\`java
List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

// 짝수만 필터링
numbers.stream()
    .filter(n -> n % 2 == 0)
    .forEach(System.out::println);  // 2, 4, 6, 8, 10
\`\`\`
`,
            codeExamples: [
                {
                    title: "람다 기본 예제",
                    language: "java",
                    code: `import java.util.*;
import java.util.function.*;

public class LambdaDemo {
    public static void main(String[] args) {
        // 1. Runnable
        Runnable task = () -> System.out.println("람다로 실행!");
        new Thread(task).start();
        
        // 2. Comparator
        List<String> fruits = Arrays.asList("Banana", "Apple", "Cherry");
        fruits.sort((a, b) -> a.compareTo(b));
        System.out.println("정렬: " + fruits);
        
        // 3. Consumer
        Consumer<String> printer = s -> System.out.println(">> " + s);
        fruits.forEach(printer);
        
        // 4. Predicate
        Predicate<Integer> isEven = n -> n % 2 == 0;
        System.out.println("4는 짝수? " + isEven.test(4));
        System.out.println("5는 짝수? " + isEven.test(5));
        
        // 5. Function
        Function<String, Integer> strLength = String::length;
        System.out.println("'Hello' 길이: " + strLength.apply("Hello"));
        
        // 6. BiFunction
        BiFunction<Integer, Integer, Integer> multiply = (a, b) -> a * b;
        System.out.println("5 * 3 = " + multiply.apply(5, 3));
    }
}`
                },
                {
                    title: "사용자 정의 함수형 인터페이스",
                    language: "java",
                    code: `// 함수형 인터페이스 정의
@FunctionalInterface
interface StringProcessor {
    String process(String input);
}

@FunctionalInterface
interface Calculator {
    double calculate(double a, double b);
}

public class CustomFunctionalInterface {
    public static void main(String[] args) {
        // StringProcessor 사용
        StringProcessor toUpper = s -> s.toUpperCase();
        StringProcessor addBrackets = s -> "[" + s + "]";
        StringProcessor reverse = s -> new StringBuilder(s).reverse().toString();
        
        String text = "hello";
        System.out.println(toUpper.process(text));      // HELLO
        System.out.println(addBrackets.process(text));  // [hello]
        System.out.println(reverse.process(text));       // olleh
        
        // Calculator 사용
        Calculator add = (a, b) -> a + b;
        Calculator sub = (a, b) -> a - b;
        Calculator mul = (a, b) -> a * b;
        Calculator div = (a, b) -> a / b;
        
        printResult("덧셈", add, 10, 3);  // 13.0
        printResult("뺄셈", sub, 10, 3);  // 7.0
        printResult("곱셈", mul, 10, 3);  // 30.0
        printResult("나눗셈", div, 10, 3); // 3.333...
    }
    
    static void printResult(String op, Calculator calc, double a, double b) {
        System.out.println(op + ": " + calc.calculate(a, b));
    }
}`
                }
            ],
            keyPoints: [
                "람다 표현식은 (매개변수) -> { 실행문 } 형태로 익명 함수를 간결하게 표현합니다.",
                "함수형 인터페이스는 추상 메서드가 1개인 인터페이스이며, @FunctionalInterface로 명시할 수 있습니다.",
                "주요 내장 인터페이스: Consumer(소비), Supplier(공급), Function(변환), Predicate(조건검사).",
                "메서드 참조(::)는 람다를 더 간결하게 표현합니다. 예: System.out::println",
                "람다가 외부 변수를 캡처할 때 해당 변수는 effectively final이어야 합니다."
            ],
            interviewQuestions: [
                {
                    difficulty: 'Medium',
                    question: "람다 표현식이란 무엇인가요?",
                    answer: "메서드를 하나의 식(Expression)으로 표현한 것으로, 익명 함수(Anonymous Function)를 생성하는 간결한 문법입니다."
                },
                {
                    difficulty: 'Easy',
                    question: "함수형 인터페이스(Functional Interface)의 조건은?",
                    answer: "추상 메서드가 오직 하나만 존재해야 합니다. (default나 static 메서드는 있어도 됨)"
                }
            ]
        },
        {
            id: "p0-m18",
            title: "Chapter 18: 스트림 API",
            topic: "Stream 생성, 중간 연산, 최종 연산, 병렬 스트림",
            content: `
## 1. 스트림(Stream)이란?

**스트림**은 컬렉션, 배열 등의 데이터를 **함수형 스타일로 처리**하는 API입니다. Java 8에서 도입되었습니다.

### 기존 방식 (명령형)

\`\`\`java
List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
int sum = 0;
for (int n : numbers) {
    if (n % 2 == 0) {
        sum += n * 2;
    }
}
System.out.println(sum);  // 60
\`\`\`

### 스트림 방식 (선언형)

\`\`\`java
int sum = numbers.stream()
    .filter(n -> n % 2 == 0)  // 짝수만
    .mapToInt(n -> n * 2)     // 2배
    .sum();                    // 합계
System.out.println(sum);  // 60
\`\`\`

---

## 2. 스트림 특징

1. **원본 데이터 변경 없음**: 스트림은 원본을 수정하지 않고 새 값을 생성
2. **지연 연산 (Lazy Evaluation)**: 최종 연산이 호출될 때까지 중간 연산은 실행되지 않음
3. **일회용**: 스트림은 한 번 사용하면 재사용 불가

---

## 3. 스트림 생성

\`\`\`java
// 1. 컬렉션에서
List<String> list = Arrays.asList("a", "b", "c");
Stream<String> stream1 = list.stream();

// 2. 배열에서
String[] arr = {"a", "b", "c"};
Stream<String> stream2 = Arrays.stream(arr);

// 3. Stream.of()
Stream<Integer> stream3 = Stream.of(1, 2, 3);

// 4. 범위 (IntStream)
IntStream range1 = IntStream.range(1, 5);      // 1, 2, 3, 4
IntStream range2 = IntStream.rangeClosed(1, 5); // 1, 2, 3, 4, 5

// 5. 무한 스트림
Stream<Integer> infinite = Stream.iterate(0, n -> n + 2);  // 0, 2, 4, 6...
Stream<Double> randoms = Stream.generate(Math::random);
\`\`\`

---

## 4. 중간 연산 (Intermediate Operations)

중간 연산은 **스트림을 반환**하며, 여러 개를 연결할 수 있습니다.

### 4.1 filter - 조건 필터링

\`\`\`java
Stream<Integer> evens = numbers.stream()
    .filter(n -> n % 2 == 0);  // 짝수만
\`\`\`

### 4.2 map - 변환

\`\`\`java
Stream<Integer> doubled = numbers.stream()
    .map(n -> n * 2);  // 각 요소를 2배

Stream<String> upperNames = names.stream()
    .map(String::toUpperCase);  // 대문자로
\`\`\`

### 4.3 flatMap - 중첩 구조 평탄화

\`\`\`java
List<List<Integer>> nested = Arrays.asList(
    Arrays.asList(1, 2),
    Arrays.asList(3, 4),
    Arrays.asList(5, 6)
);

List<Integer> flat = nested.stream()
    .flatMap(List::stream)  // [[1,2],[3,4]] → [1,2,3,4]
    .collect(Collectors.toList());
\`\`\`

### 4.4 sorted - 정렬

\`\`\`java
names.stream()
    .sorted()                              // 자연 정렬
    .sorted(Comparator.reverseOrder())    // 역순
    .sorted((a, b) -> a.length() - b.length())  // 길이순
\`\`\`

### 4.5 distinct - 중복 제거

\`\`\`java
Arrays.asList(1, 2, 2, 3, 3, 3).stream()
    .distinct()  // 1, 2, 3
\`\`\`

### 4.6 limit / skip

\`\`\`java
numbers.stream().limit(5);  // 처음 5개만
numbers.stream().skip(3);   // 처음 3개 건너뛰기
\`\`\`

### 4.7 peek - 디버깅용 중간 확인

\`\`\`java
numbers.stream()
    .peek(n -> System.out.println("원본: " + n))
    .map(n -> n * 2)
    .peek(n -> System.out.println("변환: " + n))
    .collect(Collectors.toList());
\`\`\`

---

## 5. 최종 연산 (Terminal Operations)

최종 연산은 **스트림을 소비**하고 결과를 반환합니다.

### 5.1 forEach - 각 요소 처리

\`\`\`java
names.stream().forEach(System.out::println);
\`\`\`

### 5.2 collect - 결과 수집

\`\`\`java
// 리스트로
List<String> list = stream.collect(Collectors.toList());

// 셋으로
Set<String> set = stream.collect(Collectors.toSet());

// 문자열 결합
String joined = names.stream()
    .collect(Collectors.joining(", "));  // "a, b, c"

// Map으로
Map<String, Integer> map = names.stream()
    .collect(Collectors.toMap(
        s -> s,           // key
        s -> s.length()   // value
    ));
\`\`\`

### 5.3 reduce - 누적 계산

\`\`\`java
int sum = numbers.stream()
    .reduce(0, (a, b) -> a + b);  // 초깃값 0, 누적

Optional<Integer> max = numbers.stream()
    .reduce(Integer::max);  // 최댓값
\`\`\`

### 5.4 count, min, max, sum, average

\`\`\`java
long count = numbers.stream().count();
Optional<Integer> min = numbers.stream().min(Integer::compare);
Optional<Integer> max = numbers.stream().max(Integer::compare);

// 기본형 스트림
int sum = IntStream.rangeClosed(1, 10).sum();
double avg = IntStream.rangeClosed(1, 10).average().orElse(0);
\`\`\`

### 5.5 anyMatch, allMatch, noneMatch

\`\`\`java
boolean hasEven = numbers.stream().anyMatch(n -> n % 2 == 0);  // 하나라도 짝수?
boolean allPositive = numbers.stream().allMatch(n -> n > 0);   // 모두 양수?
boolean noNegative = numbers.stream().noneMatch(n -> n < 0);   // 음수 없음?
\`\`\`

### 5.6 findFirst, findAny

\`\`\`java
Optional<Integer> first = numbers.stream()
    .filter(n -> n > 5)
    .findFirst();  // 조건 만족하는 첫 번째

Optional<Integer> any = numbers.parallelStream()
    .filter(n -> n > 5)
    .findAny();  // 아무거나 (병렬 시 유용)
\`\`\`

---

## 6. 병렬 스트림 (Parallel Stream)

멀티코어를 활용한 병렬 처리입니다.

\`\`\`java
// 병렬 스트림 생성
numbers.parallelStream()
    .filter(n -> n % 2 == 0)
    .forEach(System.out::println);

// 순차 → 병렬 변환
numbers.stream()
    .parallel()
    .map(n -> n * 2)
    .collect(Collectors.toList());
\`\`\`

### 주의사항
- **상태 공유 금지**: 병렬 처리 시 외부 상태 변경 금지
- **순서 보장 X**: parallelStream에서 순서가 필요하면 forEachOrdered 사용
- **항상 빠르진 않음**: 데이터 양이 적으면 오버헤드만 증가
`,
            codeExamples: [
                {
                    title: "스트림 기본 활용",
                    language: "java",
                    code: `import java.util.*;
import java.util.stream.*;

public class StreamDemo {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
        
        // 1. filter + map + collect
        List<Integer> result = numbers.stream()
            .filter(n -> n % 2 == 0)    // 짝수만
            .map(n -> n * 2)            // 2배
            .collect(Collectors.toList());
        System.out.println("결과: " + result);  // [4, 8, 12, 16, 20]
        
        // 2. reduce
        int sum = numbers.stream()
            .reduce(0, Integer::sum);
        System.out.println("합계: " + sum);  // 55
        
        // 3. 통계
        IntSummaryStatistics stats = numbers.stream()
            .mapToInt(Integer::intValue)
            .summaryStatistics();
        System.out.println("개수: " + stats.getCount());
        System.out.println("합계: " + stats.getSum());
        System.out.println("평균: " + stats.getAverage());
        System.out.println("최소: " + stats.getMin());
        System.out.println("최대: " + stats.getMax());
        
        // 4. 조건 검사
        boolean hasNegative = numbers.stream().anyMatch(n -> n < 0);
        System.out.println("음수 있음? " + hasNegative);  // false
    }
}`
                },
                {
                    title: "스트림 실전 예제",
                    language: "java",
                    code: `import java.util.*;
import java.util.stream.*;

class Student {
    String name;
    int score;
    
    Student(String name, int score) {
        this.name = name;
        this.score = score;
    }
    
    // getters
    public String getName() { return name; }
    public int getScore() { return score; }
}

public class StreamPractice {
    public static void main(String[] args) {
        List<Student> students = Arrays.asList(
            new Student("홍길동", 85),
            new Student("김철수", 92),
            new Student("이영희", 78),
            new Student("박민수", 95),
            new Student("정수진", 88)
        );
        
        // 1. 80점 이상 학생 이름 (점수 순 정렬)
        List<String> passed = students.stream()
            .filter(s -> s.getScore() >= 80)
            .sorted((a, b) -> b.getScore() - a.getScore())  // 내림차순
            .map(Student::getName)
            .collect(Collectors.toList());
        System.out.println("80점 이상: " + passed);
        
        // 2. 평균 점수
        double avg = students.stream()
            .mapToInt(Student::getScore)
            .average()
            .orElse(0);
        System.out.println("평균: " + avg);
        
        // 3. 최고점 학생
        Optional<Student> top = students.stream()
            .max(Comparator.comparing(Student::getScore));
        top.ifPresent(s -> System.out.println("최고점: " + s.getName()));
        
        // 4. 이름 → 점수 Map 변환
        Map<String, Integer> scoreMap = students.stream()
            .collect(Collectors.toMap(
                Student::getName,
                Student::getScore
            ));
        System.out.println("점수표: " + scoreMap);
        
        // 5. 점수대별 그룹핑
        Map<String, List<Student>> groups = students.stream()
            .collect(Collectors.groupingBy(s -> {
                if (s.getScore() >= 90) return "A";
                if (s.getScore() >= 80) return "B";
                return "C";
            }));
        groups.forEach((grade, list) -> {
            System.out.println(grade + "등급: " + 
                list.stream().map(Student::getName)
                    .collect(Collectors.joining(", ")));
        });
    }
}`
                }
            ],
            keyPoints: [
                "스트림은 원본 데이터를 변경하지 않고 새로운 결과를 생성하는 함수형 API입니다.",
                "중간 연산(filter, map, sorted)은 스트림을 반환하고, 최종 연산(collect, forEach)이 호출될 때 실행됩니다.",
                "collect(Collectors.toList()/toSet()/toMap())로 결과를 수집합니다.",
                "reduce는 스트림 요소를 하나로 누적합니다. (sum, max, min 등)",
                "parallelStream()으로 병렬 처리가 가능하지만, 항상 빠른 것은 아니며 순서 보장이 안 될 수 있습니다."
            ],
            interviewQuestions: [
                {
                    difficulty: 'Medium',
                    question: "스트림(Stream)과 for 루프의 차이점은?",
                    answer: "스트림은 '무엇을(What)' 할지 선언하는 내부 반복 방식이고, for 루프는 '어떻게(How)' 할지 명시하는 외부 반복 방식입니다. 스트림은 가독성이 좋고 병렬 처리가 쉽습니다."
                },
                {
                    difficulty: 'Hard',
                    question: "스트림의 지연 연산(Lazy Evaluation)이란?",
                    answer: "중간 연산(filter, map)은 즉시 실행되지 않고, 최종 연산(collect 등)이 호출될 때까지 미뤄졌다가 한 번에 최적화되어 수행되는 특성입니다."
                }
            ]
        }
    ]
};
