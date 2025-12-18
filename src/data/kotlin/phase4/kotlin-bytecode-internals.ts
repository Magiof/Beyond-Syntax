import type { Module } from '../../curriculumData';

export const kotlinBytecodeInternals: Module = {
    id: "kotlin-bytecode-internals",
    title: "Chapter 16: JVM 바이트코드 마법 - Zero-Cost 추상화",
    topic: "Inline & Reified, Value Class (Zero-overhead), Null Safety Bytecode, Mangling",
    content: `
## 1. Zero-Cost Abstraction: 성능과 편의의 공존

시니어 코틀린 개발자는 단순히 "편리해서" 코틀린을 쓰는 게 아니라, "**런타임 비용 없이 편리함을 얻기 때문에**" 씁니다. 컴파일러가 바이트코드를 어떻게 주무르는지 이해해야 합니다.

---

## 2. Reified: 제네릭 타입 소거(Erasure)의 유일한 해법

원래 JVM은 런타임에 제네릭 타입을 지웁니다(\`List<String>\` -> \`List\`). 하지만 코틀린은 \`reified\`로 이를 되살립니다.

\`\`\`mermaid
flowchart TD
    Source["inline fun <reified T> printT() { ... }"]
    Call["printT<String>()"]
    
    Source -->|Compile| CallSite["{ /* String.class 직접 대입 */ }"]
    
    subgraph Inside_Bytecode ["컴파일 타임 치환"]
        CallSite
    end
\`\`\`

- **원리**: 함수 호출 지점에 코드를 통째로 복사해 넣으면서(Inline), \`T\`를 실제 타입(\`String\`)으로 바꿔치기합니다. 
- **결과**: 리플렉션 없이 \`T::class\`를 다룰 수 있으며, 성능 손실이 전혀 없습니다.

---

## 3. 객체 생성 비용 제로: Value Class

도메인 모델링(\`Id\`, \`Password\` 등)을 위해 래퍼 클래스를 만들면 힙 메모리 점유와 GC 호출이 발생합니다.

- **Value Class**: 런타임에는 원시 타입(Primitive)으로 존재하고, 코드에서는 객체처럼 동작합니다.
- **Mangling (이름 맹글링)**: 바이트코드 상에서 일반 타입과 구분하기 위해 함수 이름을 \`login-hash123\` 처럼 바꿉니다. 이는 자바에서 코틀린의 내부 로직을 함부로 호출하지 못하게 막는 보안 효과도 있습니다.

---

## 4. Null Safety: 방어 코드는 어디에?

\`String\`은 런타임에 null이 들어올 수 있습니다. 하지만 코틀린은 어떻게 막을까요?

- **Assertion**: Non-null로 선언된 파라미터가 있는 함수 맨 윗줄에 컴파일러가 \`Intrinsics.checkNotNullParameter\`를 박아 넣습니다. 
- **효과**: "나중에 터질 에러(NPE)"를 "지금 당장 터질 에러"로 바꿔서 문제 추적 비용을 획기적으로 낮춥니다.
`,
    codeExamples: [
        {
            title: "Reified vs Non-reified (바이트코드 관점)",
            language: "kotlin",
            code: `// 일반 제네릭: 런타임에 T가 뭔지 모름
fun <T> check(item: Any) = item is T // Error: Cannot check for instance of erased type

// Reified: 호출 지점에 실제 타입이 박힘
inline fun <reified T> check(item: Any) = item is T // Success!

// Value class: 래퍼지만 런타임엔 String
@JvmInline
value class UserId(val value: String)`
        }
    ],
    keyPoints: [
        "inline 함수는 호출 지점에 코드를 복사하여 함수 호출 오버헤드를 없앱니다.",
        "Value Class는 도메인 중심 설계를 성능 저하 없이 가능하게 해주는 핵심 기술입니다.",
        "코틀린의 모든 '마법'은 컴파일 타임의 영리한 바이트코드 조작에서 기인합니다."
    ],
    interviewQuestions: [
        {
            difficulty: 'Hell',
            question: "왜 인라인 함수의 코드가 너무 길면 성능에 역효과가 나나요?",
            answer: "호출 지점마다 코드가 복사되기 때문에, 함수의 크기가 크고 호출 지점이 많으면 바이트코드 전체 크기가 급격히 팽창(Code Bloat)합니다. 이는 JVM의 코드 캐시 부족을 유발하거나 명령어 캐시 적중률을 떨어뜨려 오히려 성능을 저하시킬 수 있습니다."
        }
    ]
};
