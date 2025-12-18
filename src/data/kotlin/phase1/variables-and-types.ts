import type { Module } from '../../curriculumData';

export const variablesAndTypes: Module = {
    id: "variables-and-types",
    title: "Chapter 2: 변수와 타입 - 쾌적한 타입 시스템",
    topic: "val vs var, 타입 추론, 기본 타입, Any/Unit/Nothing",
    content: `
## 1. 가변성 제어: val vs var

코틀린은 설계 단계부터 **불변성(Immutability)**을 지향합니다. 이는 멀티스레드 환경에서 안전하고 예측 가능한 코드를 작성하는 핵심입니다.

- **val (Value)**: 한 번 할당하면 값을 바꿀 수 없는 읽기 전용 변수입니다. 자바의 \`final\`과 유사합니다. **(권장)**
- **var (Variable)**: 값을 여러 번 바꿀 수 있는 가변 변수입니다.

> **Atomic Tip**: 기본적으로 모든 변수를 \`val\`로 선언하고, 정말 필요한 경우에만 \`var\`로 변경하는 습관을 기르세요. 이는 부수 효과(Side Effect)를 줄이는 첫걸음입니다.

---

## 2. 컴파일러의 마법: 타입 추론 (Type Inference)

자바와 달리 모든 변수의 타입을 명시할 필요가 없습니다. 코틀린 컴파일러는 우변의 식을 보고 타입을 자동으로 결정합니다.

\`\`\`kotlin
val name = "Kotlin" // String으로 추론
val age = 25        // Int로 추론
\`\`\`

---

## 3. 모든 것이 객체인 기본 타입

코틀린에는 자바와 같은 원시 타입(Primitive Type)이 따로 존재하지 않습니다. 모든 타입(Int, Double, Boolean 등)은 객체로 취급됩니다.

- **이득**: 숫자 타입에서도 메서드를 호출할 수 있습니다. (예: \`1.toDouble()\`)
- **성능 걱정은 NO**: 실행 시점(Runtime)에는 JVM의 원시 타입으로 변환되어 최적화되므로 성능 저하가 없습니다.

---

## 4. 코틀린의 특별한 삼총사

### 4.1 Any
자바의 \`Object\`와 유사하지만, 원시 타입을 포함한 모든 타입의 최상위 계층입니다. \`toString()\`, \`equals()\`, \`hashCode()\`를 제공합니다.

### 4.2 Unit
함수가 의미 있는 값을 반환하지 않을 때 사용합니다. 자바의 \`void\`와 유사하지만, 생략 가능하며 실제로는 싱글톤 객체입니다.

### 4.3 Nothing
결코 성공적으로 끝나지 않는 함수(예: 항상 예외를 던지는 함수)의 반환 타입입니다. 함수의 결과를 사용할 수 없음을 컴파일 시점에 명시합니다.
`,
    codeExamples: [
        {
            title: "Nothing 타입의 활용",
            language: "kotlin",
            code: `fun fail(message: String): Nothing {
    throw IllegalArgumentException(message)
}

fun main() {
    val data: String? = null
    // data가 null이면 fail이 호출되고, 그 이후 코드는 결코 실행되지 않음을 보장함
    val s = data ?: fail("Name required")
    println(s.length) // 여기서 s는 무조건 null이 아님이 보장됨 (Nothing의 마법)
}`
        }
    ],
    keyPoints: [
        "val은 불변, var는 가변을 의미하며 불변 지향 설계를 권장합니다.",
        "타입 추론은 가독성을 높여주지만, 공용 API 설계 시에는 타입을 명시하는 것이 좋습니다.",
        "Nothing은 함수의 '비정상 종료'를 나타내는 강력한 타입 시스템 도구입니다."
    ],
    interviewQuestions: [
        {
            difficulty: 'Hard',
            question: "자바의 void와 코틀린 Unit의 결정적인 차이는 무엇인가요?",
            answer: "void는 반환값이 없음을 나타내는 키워드일 뿐이지만, Unit은 싱글톤 인스턴스를 가지는 실제 객체입니다. 따라서 Unit은 제네릭 인자로 사용될 수 있어 함수의 인터페이스 일관성을 유지하기에 훨씬 유리합니다."
        }
    ]
};
