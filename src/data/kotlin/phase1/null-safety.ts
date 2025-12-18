import type { Module } from '../../curriculumData';

export const nullSafety: Module = {
    id: "null-safety",
    title: "Chapter 3: Null Safety",
    topic: "Nullable 타입, ?. ?:, !!, let, lateinit",
    content: `
## 1. Nullable과 Non-null
Kotlin은 타입 수준에서 null 가능성을 제어합니다.

## 2. 연산자
- **?.**: 안전 호출 (null이면 null 반환)
- **?:**: 엘비스 연산자 (null이면 기본값 사용)
- **!!**: Non-null 단언 (null이면 NPE 발생)

## 3. 지연 초기화
- **lateinit**: 나중에 초기화할 var
- **by lazy**: 첫 사용 시 초기화되는 val
`,
    codeExamples: [
        {
            title: "null 처리 예시",
            language: "kotlin",
            code: `val name: String? = null
println(name?.length ?: 0)`
        }
    ],
    keyPoints: [
        "?.와 ?:를 활용하여 안전하게 null을 처리합니다.",
        "!!는 가급적 사용하지 않습니다."
    ],
    interviewQuestions: [
        {
            difficulty: 'Medium',
            question: "lateinit과 lazy의 차이는?",
            answer: "lateinit은 var에 사용하며 수동으로 초기화하고, lazy는 val에 사용하며 첫 접근 시 자동 초기화됩니다."
        }
    ]
};
