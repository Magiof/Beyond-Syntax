import type { Module } from '../../types';

export const advancedMetaprogramming: Module = {
    id: "advanced-metaprogramming",
    title: "Chapter 18: 고급 메타 프로그래밍 - 프레임워크 설계의 정수",
    topic: "Context Receivers, Reflection, KSP vs Kapt, 비정형 데이터 처리",
    content: `
## 1. 다중 컨텍스트의 시대: Context Receivers

기존 익스텐션 함수는 하나의 수신 객체(\`this\`)만 가질 수 있었습니다. 코틀린의 새로운 실험적 기능인 **Context Receivers**를 사용하면 함수가 실행되기 위해 필요한 여러 환경(Context)을 명시적으로 요구할 수 있습니다.

- **장점**: 의존성 주입을 명시적인 타입 시스템으로 끌어올리고, 거대한 DSL 설계 시 문맥을 더 정교하게 제어할 수 있습니다.

---

## 2. 어노테이션 프로세싱의 진화: KSP (Kotlin Symbol Processing)

자바의 APT를 기반으로 한 \`kapt\`는 스터브 생성 단계 때문에 빌드 속도가 느렸습니다. 

- **KSP**: 프로젝트의 모든 심볼에 직접 접근하는 코틀린 전용 도구입니다. kapt보다 최대 2~3배 빠른 빌드 속도를 제공하며, 코틀린 특유의 기능(Nullability 등)을 완벽히 이해합니다.

---

## 3. Reflection: 런타임의 지배자

\`kotlin-reflect\` 라이브러리를 통해 클래스의 프로퍼티, 함수, 애노테이션을 동적으로 분석합니다.

- **KClass vs Class**: 자바의 \`Class\` 객체와 코틀린의 \`KClass\` 간의 전환 및 활용법을 익힙니다.
- **성능**: 리플렉션은 강력하지만 호출 비용이 큽니다. 캐싱 전략이나 델리게이트를 통해 성능 저하를 최소화하는 방법을 배웁니다.
`,
    codeExamples: [
        {
            title: "Context Receivers와 KSP 개념 예시",
            language: "kotlin",
            code: `// Context Receivers (실험적 기능 활성 필요)
context(CoroutineScope, Logger)
fun fetchData() {
    launch { // CoroutineScope 컨텍스트 사용
        info("Fetching data...") // Logger 컨텍스트 사용
    }
}

// KSP: 어노테이션 기반 코드 생성 (라이브러리 설계자용)
@AutoElement
class MyComponent`
        }
    ],
    keyPoints: [
        "Context Receivers는 복잡한 의존성 관계를 우아하게 해결할 수 있는 미래입니다.",
        "KSP는 현대적인 코틀린 라이브러리 개발의 필수 관문입니다.",
        "리플렉션은 꼭 필요한 곳에만 사용하며, 성능과 보안의 트레이드오프를 고려해야 합니다."
    ],
    interviewQuestions: [
        {
            difficulty: 'Hell',
            question: "KSP가 Kapt보다 빠른 근본적인 이유는 무엇인가요?",
            answer: "Kapt는 자바 애노테이션 프로세서를 돌리기 위해 코틀린 코드를 자바 코드로 변환하는 '스터브 생성' 과정이 필요하지만, KSP는 코틀린 컴파일러 플러그인으로서 AST(Abstract Syntax Tree)에 직접 접근하여 스터브 생성 없이 코드를 분석하기 때문입니다."
        }
    ]
};
