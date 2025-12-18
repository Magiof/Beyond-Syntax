import type { Module } from '../../curriculumData';

export const atomicFundamentals: Module = {
    id: "atomic-fundamentals",
    title: "Chapter 1: 아토믹 코틀린 - 기초와 철학",
    topic: "Atomic approach, Kotlin In Action, Hello World, 실용주의 언어",
    content: `
## 1. 아토믹 학습법 (The Atomic Approach)

**Atomic Kotlin**의 철학은 복잡한 프로그래밍 개념을 더 이상 쪼갤 수 없는 아주 작은 단위(**Atoms**)로 나누어 학습하는 것입니다.
- **왜 쪼개는가?**: 한 번에 하나의 지식만 뇌에 입력함으로써 학습 인지 부하를 최소화하고, 기초를 탄탄하게 다지기 위함입니다.
- **이 장의 목표**: 코틀린이라는 언어의 가장 작은 조각들을 살펴보고, 그것들이 어떻게 결합되어 강력한 프로그램을 만드는지 이해합니다.

---

## 2. Kotlin In Action: 실용주의의 정수

코틀린은 상아탑에서 만들어진 이론 중심의 언어가 아닙니다. 실제 개발 현장의 문제를 해결하기 위해 **JetBrains**에서 탄생했습니다.

- **실용성 (Pragmatic)**: 특정 프로그래밍 패러다임을 강요하지 않고, 자바 개발자들이 겪는 실제 고통(NPE, 보일러플레이트)을 해결하는 데 집중합니다.
- **상호 운용성 (Interoperable)**: "자바와 함께 쓸 수 있는가?"는 코틀린 설계의 최우선 순위였습니다. 기존 자바 라이브러리를 그대로 쓰면서 코틀린의 장점만 취할 수 있습니다.
- **안전성 (Safe)**: 설계 단계부터 시스템의 오류 가능성을 줄이는 장치(Null Safety, Immutable by default)를 마련했습니다.

---

## 3. 첫 번째 아톰: Hello, Kotlin!

가장 단순한 형태의 코틀린 프로그램을 해부해 봅니다.

\`\`\`kotlin
fun main() {
  println("Hello, Atomic World!")
}
\`\`\`

- **fun**: 함수(function)를 선언할 때 사용하는 키워드입니다. 자바의 \`public static void\`보다 훨씬 직관적입니다.
- **main**: 프로그램의 시작점(Entry Point)입니다. 클래스 없이도 최상위 레벨에 존재할 수 있습니다.
- **println**: 표준 출력을 담당합니다. \`System.out.println\`의 지루한 입력을 줄여주는 래퍼입니다.
- **세미콜론(;)**: 코틀린에서는 줄 바꿈이 문장의 끝을 의미하므로 세미콜론이 필수가 아닙니다. (선택적 사용 가능)

> **Deep Dive**: 왜 코틀린은 함수를 클래스 밖에 둘 수 있을까요?
> 
> 자바는 모든 코드가 클래스 안에 있어야 하는 "순수 객체지향"을 지향했지만, 현실에서는 유틸리티 함수처럼 클래스가 불필요한 경우도 많습니다. 코틀린은 이를 **최상위 함수(Top-level functions)**로 허용하여 구조를 더 가볍게 만듭니다. 컴파일 시점에는 내부적으로 클래스가 생성되어 JVM과의 호환성을 유지합니다.
`,
    codeExamples: [
        {
            title: "문자열 템플릿과 간결한 main 함수",
            language: "kotlin",
            code: `// 매개변수가 없는 main 함수도 지원 (v1.3+)
fun main() {
    val name = "Atomic Kotlin"
    // $ 기호를 사용하여 변수를 문자열에 직접 삽입
    println("Welcome to $name!")
    
    // 표현식을 중괄호 {}로 감싸서 사용
    println("2 + 2 = ${2 + 2}")
}`
        }
    ],
    keyPoints: [
        "아토믹 학습법은 지식을 작은 조각으로 나누어 완벽히 이해하는 것을 목표로 합니다.",
        "코틀린은 세 가지 기둥(실용성, 상호 운용성, 안전성) 위에 세워진 실무 중심 언어입니다.",
        "최상위 함수와 세미콜론 생략은 코드를 더 읽기 쉽고 간결하게 만듭니다."
    ],
    interviewQuestions: [
        {
            difficulty: 'Medium',
            question: "자바와 비교했을 때 코틀린의 '실용성'을 보여주는 사례는 무엇인가요?",
            answer: "가장 대표적으로 NPE를 방지하는 Null Safety 시스템, 타입을 고정하지 않고도 자동으로 추론하는 타입 추론 시스템, 그리고 데이터 클래스나 간결한 생성자 선언을 통한 보일러플레이트 코드의 대폭적인 감소를 들 수 있습니다."
        }
    ]
};
