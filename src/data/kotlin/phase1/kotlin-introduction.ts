import type { Module } from '../../curriculumData';

export const kotlinIntroduction: Module = {
    id: "kotlin-introduction",
    title: "Chapter 1: Kotlin 시작하기",
    topic: "Kotlin이란, Java와의 비교, 기본 문법, Hello World",
    content: `
## 1. Kotlin이란?

**Kotlin**은 JetBrains가 2011년에 개발한 **현대적인 정적 타입 언어**입니다. 2019년 Google이 **Android의 공식 언어**로 채택했습니다.

### Kotlin의 특징

1. **JVM에서 실행**: 기존 Java 코드와 **100% 호환**
2. **간결한 문법**: 보일러플레이트 코드 대폭 감소
3. **Null Safety**: 컴파일 시점에 NullPointerException 방지
4. **함수형 프로그래밍**: 람다, 고차 함수 내장 지원
5. **멀티플랫폼**: JVM, Android, JavaScript, Native 지원

---

## 2. Java vs Kotlin 비교

### 2.1 Hello World

\`\`\`java
// Java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
\`\`\`

\`\`\`kotlin
// Kotlin
fun main() {
    println("Hello, World!")
}
\`\`\`

---

## 3. Kotlin 기본 문법

### 3.1 세미콜론 생략
Kotlin은 줄 끝에 세미콜론이 필요 없습니다.

### 3.2 타입 추론
컴파일러가 타입을 자동으로 추론합니다.

### 3.3 문자열 템플릿
$ 변수 또는 \${표현식}으로 문자열을 조합합니다.
`,
    codeExamples: [
        {
            title: "Kotlin 첫 프로그램",
            language: "kotlin",
            code: `fun main() {
    val name = "Kotlin"
    println("Hello, $name!")
}`
        }
    ],
    keyPoints: [
        "Kotlin은 JVM에서 동작하며 Java와 100% 상호 운용됩니다.",
        "세미콜론이 필요 없고, 타입 추론으로 간결한 코드를 작성합니다."
    ],
    interviewQuestions: [
        {
            difficulty: 'Easy',
            question: "Kotlin이 Java와 호환된다는 것은 무슨 의미인가요?",
            answer: "Kotlin은 Java와 동일하게 JVM 바이트코드로 컴파일되므로 서로의 클래스를 자유롭게 사용할 수 있습니다."
        }
    ]
};
