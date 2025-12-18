import type { Module } from '../../curriculumData';

export const operators: Module = {
    id: "operators",
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
        "&&와 ||는 단락 평가를 수행하여 불필요한 연산을 건너뜜니다.",
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
};
