import type { Module } from '../../types';

export const kotlinDsl: Module = {
    id: "kotlin-dsl",
    title: "Chapter 15: 코틀린 DSL - 언어 위에 언어를 설계하다",
    topic: "Lambda with Receiver, @DslMarker, Scope Control, Declaration vs Builder",
    content: `
## 1. DSL: 가독성을 넘어선 '표현력'의 도구

> **Kotlin Philosophy**: "코드는 다른 사람에게 보여주기 위한 이야기여야 합니다."

코틀린 DSL은 수신 객체 지정 람다(Lambda with Receiver)를 극단적으로 활용하여, 복잡한 트리 구조나 설정(Build) 로직을 **선언적**으로 표현합니다.

---

## 2. DSL 구조 시각화: 코드에서 객체 트리로

우리가 짜는 중괄호 블록은 내부적으로 객체의 계층 구조를 형성합니다.

\`\`\`mermaid
flowchart TD
    Code["html { body { p { 'Hello' } } }"] --> Builder["HtmlBuilder"]
    Builder --> Child1["BodyBuilder"]
    Child1 --> Child2["PBuilder"]
    
    subgraph Receiver ["수신 객체(this)의 전이"]
        direction LR
        thisHtml[this: Html] --> thisBody[this: Body] --> thisP[this: P]
    end
\`\`\`

- **this의 마법**: 블록 안에서 \`this\`는 해당 레벨의 빌더 객체를 가리킵니다. 이를 통해 마치 객체 내부 메서드인 것처럼 하위 요소를 추가할 수 있습니다.

---

## 3. 강력한 경계: @DslMarker

DSL이 깊어지면 자칫 안쪽 블록에서 상위 블록의 메서드를 호출하는 실수를 할 수 있습니다. (\`body\` 안에서 \`html\` 메서드를 또 부르는 등)

- **@DslMarker**: 가장 가까운 수신 객체 외에는 다른 수신 객체의 메서드 호출을 막는 **스코프 제어** 도구입니다. 컴파일 타임에 잘못된 계층 구조 생성을 원천 차단합니다.

---

## 4. Invoke와 Infix: 자연어에 한 걸음 더

- **invoke**: \`myObj()\` 형식으로 함수처럼 호출하게 하여, 초기화 로직을 부드럽게 연결합니다.
- **infix**: \`1 to 10\`, \`customer shouldBe active\` 처럼 마침표와 괄호를 없앤 영문장 같은 코드를 만듭니다.
`,
    codeExamples: [
        {
            title: "Type-Safe Builder: @DslMarker 적용 예시",
            language: "kotlin",
            code: `@DslMarker
annotation class MyHtmlDsl

@MyHtmlDsl
class Tag(val name: String)

fun html(init: Tag.() -> Unit) = Tag("html").apply(init)

// 사용
html {
    // 여기서 다른 'html' 블록을 또 부르는 것을 컴파일러가 막아줌
    Tag("body").apply { 
        // 묵시적 this는 Body 레벨
    }
}`
        }
    ],
    keyPoints: [
        "수신 객체 지정 람다는 정적 타입을 유지하며 동적인 가독성을 제공합니다.",
        "DSL은 단순한 코드 단축이 아니라, 도메인의 지식을 코드로 박아 넣는 행위입니다.",
        "Gradle이나 Ktor 같은 대형 프레임워크의 성공 기반에는 코틀린의 DSL 능력이 있습니다."
    ],
    interviewQuestions: [
        {
            difficulty: 'Hell',
            question: "왜 DSL 내부에서는 'apply'보다 'run'이나 직접적인 수신 객체 지정 람다를 선호하나요?",
            answer: "apply는 항상 '자기 자신'을 반환하기 때문에 계층 구조를 쌓을 때 직관성이 떨어질 수 있습니다. 반면 수신 객체 지정 람다를 직접 정의하면, 블록의 반환값을 제어하거나 특정 빌더 흐름을 더 정교하게 설계할 수 있기 때문입니다."
        }
    ]
};
