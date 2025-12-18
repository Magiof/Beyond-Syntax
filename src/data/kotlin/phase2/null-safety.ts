import type { Module } from '../../curriculumData';

export const nullSafety: Module = {
    id: "null-safety",
    title: "Chapter 3: Null Safety - 컴파일러가 지켜주는 세상",
    topic: "Smart Cast internals, Platform Types, Safe Call Chains",
    content: `
## 1. 스마트 캐스트(Smart Cast): 컴파일러의 눈

코틀린의 Null Safety가 강력한 진짜 이유는 \`?\` 때문이 아니라, **제어 흐름 분석(Control Flow Analysis)** 때문입니다.

\`\`\`kotlin
fun printLength(str: String?) {
    // str.length // Error: Null일 수 있음
    
    if (str != null) {
        // 컴파일러가 if문을 읽고 "여기 안에서는 str이 절대 null이 아님"을 보증함
        // 별도의 캐스팅 없이 String? -> String으로 자동 변환(Smart Cast)
        println(str.length) 
    }
}
\`\`\`
이것은 단순히 편의 기능이 아니라, "**방어적 코드**"를 작성하면 보상으로 "**깔끔한 코드**"를 주는 코틀린의 철학입니다.

---

## 2. 플랫폼 타입 (Platform Types): 자바와의 위험한 동거

> **Warning**: 코틀린 개발자가 NPE(NullPointerError)를 만나는 90%의 원인은 자바 코드입니다.

자바에서 \`@Nullable\`, \`@NotNull\` 어노테이션이 없는 타입을 코틀린으로 가져오면 **\`String!\`** 처럼 느낌표가 붙은 타입이 됩니다.
이는 "**Null인지 아닌지 모르겠으니, 네가 알아서 조심해라**" 라는 뜻입니다.

- **전략 1**: 자바 쪽 코드를 수정할 수 있다면 어노테이션을 붙이십시오.
- **전략 2**: 불가능하다면, 코틀린에서 변수를 받을 때 **Nullable 타입(\`String?\`)으로 받아서 방어**하십시오.

---

## 3. 엘비스 연산자(?:)와 조기 반환(Early Return)

엘비스 연산자는 단순히 "기본값"을 주는 것보다, **에러 상황을 조기에 종료(Return/Throw)**시키는 데 더 강력합니다.

\`\`\`kotlin
val user = repo.findById(id) ?: throw IllegalArgumentException("User not found")
val email = user.email ?: return // 이메일 없으면 조용히 함수 종료
\`\`\`
이 패턴을 쓰면 \`if-else\` 중첩(Arrow of Death)을 획기적으로 줄일 수 있습니다.

---

## 4. lateinit vs by lazy: 초기화의 미학

"나중에 초기화하겠다"는 말은 같지만, 목적이 다릅니다.

| 기능 | lateinit | by lazy { ... } |
| :--- | :--- | :--- |
| **타입** | \`var\` (Mutable) | \`val\` (Immutable) |
| **용도** | 의존성 주입(DI), Unit Test \`@Setup\` | 무거운 객체 지연 로딩, 싱글톤 로직 |
| **Primitive** | 사용 불가 (\`Int\`, \`Double\` X) | 사용 가능 |
| **원리** | 초기화 안 하고 쓰면 예외 발생 | 처음 읽을 때 람다 실행 (Thread-safe) |

`,
    codeExamples: [
        {
            title: "Safe Call 체이닝과 let의 조합",
            language: "kotlin",
            code: `// 복잡한 중첩 객체 탐색도 한 줄로 안전하게 처리
val city: String? = order?.customer?.address?.city

// "모든 데이터가 완벽할 때만" 실행하고 싶으면 let 사용
order?.customer?.address?.let { addr ->
    // 여기 들어왔다는 건 order, customer, address 셋 다 null이 아님을 보장
    sendDelivery(addr)
}`
        }
    ],
    keyPoints: [
        "스마트 캐스트는 컴파일러가 코드의 흐름(if, when)을 분석하여 타입을 자동으로 좁혀주는 기능입니다.",
        "플랫폼 타입(String!)은 Null Safety의 사각지대입니다. 자바 라이브러리 사용 시 항상 방어 코드를 작성하십시오.",
        "lateinit은 DI 프레임워크를 위해, by lazy는 성능 최적화를 위해 탄생했습니다."
    ],
    interviewQuestions: [
        {
            difficulty: 'Hard',
            question: "자바 코드에서 가져온 리스트(List!)를 코틀린에서 List<String>으로 받을 때와 List<String?>으로 받을 때의 차이는?",
            answer: "List<String>으로 받으면 코틀린은 '절대 null이 없다'고 가정하고 최적화된 코드를 짜지만, 실제 런타임에 null이 들어있으면 읽는 순간 NPE가 터집니다. 반면 List<String?>은 'null이 있을 수 있다'고 보고 안전한 접근을 강제하므로 훨씬 안전합니다. 자바 컬렉션을 가져올 땐 항상 후자를 고려해야 합니다."
        }
    ]
};
