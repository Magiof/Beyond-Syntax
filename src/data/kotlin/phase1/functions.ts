import type { Module } from '../../types';

export const functions: Module = {
    id: "functions",
    title: "Chapter 5: 함수 - 1급 객체로서의 함수",
    topic: "최상위 함수, 파라미터 기본값, 확장 함수, 로컬 함수",
    content: `
## 1. 최상위 함수 (Top-level Functions)

자바에서는 의미 없는 \`Utils\` 클래스를 만들어 정적 메서드를 넣어야 했지만, 코틀린에서는 **클래스 밖 최상위 레벨**에 직접 함수를 정의할 수 있습니다.

- **장점**: 불필요한 클래스 계층을 줄이고 코드 가독성을 높입니다.
- **JVM 이면**: 컴파일 시 파일 이름을 딴 클래스(예: \`FunctionsKt\`)의 static 메서드로 변환됩니다.

---

## 2. 오버로딩 중독 치료: 디폴트 파라미터

비슷한 기능을 위해 여러 개의 함수를 오버로딩할 필요가 없습니다. 파라미터에 기본값을 지정할 수 있기 때문입니다.

\`\`\`kotlin
fun joinToString(separator: String = ", ", prefix: String = "", postfix: String = "") { ... }
\`\`\`

- **이름 붙인 인자 (Named Arguments)**: 호출 시 파라미터 이름을 명시하여 어떤 인자가 어떤 역할을 하는지 명확히 알 수 있습니다.

---

## 3. 마법 같은 확장 함수 (Extension Functions)

기존 라이브러리의 클래스를 수정하지 않고도 새로운 메서드를 추가할 수 있는 기능입니다.

\`\`\`kotlin
// String 클래스에 lastChar 메서드 추가
fun String.lastChar(): Char = this[this.length - 1]
\`\`\`

- **정적 바인딩**: 확장 함수는 내부적으로 수신 객체를 첫 번째 인자로 받는 정적 메서드입니다. 오버라이딩은 불가능하다는 점에 주의하세요.

---

## 4. 코드 중복 제거: 로컬 함수

함수 내부에 또 다른 함수를 정의할 수 있습니다. 특정 함수 안에서만 반복되는 로직을 깔끔하게 캡슐화할 수 있습니다.
`,
    codeExamples: [
        {
            title: "파라미터 기본값과 이름 붙인 인자의 조합",
            language: "kotlin",
            code: `fun <T> joinToString(
    collection: Collection<T>,
    separator: String = ", ",
    prefix: String = "(",
    postfix: String = ")"
): String {
    // ... 구현
}

fun main() {
    val list = listOf(1, 2, 3)
    // 일부 인자만 이름을 붙여 순서를 바꿔서 호출 가능
    println(joinToString(list, postfix = "]", prefix = "["))
}`
        }
    ],
    keyPoints: [
        "최상위 함수를 통해 유틸리티 클래스의 파편화를 방지합니다.",
        "디폴트 파라미터와 이름 붙인 인자는 실무에서 코드 가독성을 획기적으로 높여줍니다.",
        "확장 함수는 '기존 코드를 건드리지 않고 확장한다(OCP)'는 객체지향 원칙을 가장 우아하게 구현합니다."
    ],
    interviewQuestions: [
        {
            difficulty: 'Hard',
            question: "확장 함수가 자바의 상속이나 데코레이터 패턴과 다른 점은 무엇인가요?",
            answer: "확장 함수는 클래스 외부에서 호출되는 정적 메서드로 컴파일되므로, 실제 클래스의 구조를 변경하거나 상속 계층에 영향을 주지 않습니다. 또한 런타임이 아닌 컴파일 타임에 결정되므로 오버라이딩되지 않으며 성능 손실이 거의 없습니다."
        }
    ]
};
