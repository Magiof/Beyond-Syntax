import type { Module } from '../../curriculumData';

export const variablesAndDatatypes: Module = {
    id: "variables-and-datatypes",
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
};
