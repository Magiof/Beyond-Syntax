import type { Module } from '../../curriculumData';

export const variablesAndTypes: Module = {
    id: "variables-and-types",
    title: "Chapter 2: 변수와 타입",
    topic: "val/var, 기본 타입, Any/Unit/Nothing, 타입 변환",
    content: `
## 1. 변수 선언
- **val**: 불변 (재할당 불가, Java의 final)
- **var**: 가변 (재할당 가능)

## 2. 기본 타입
Kotlin은 모든 것이 객체이며, 암시적 타입 변환이 없습니다.
- Int, Long, Float, Double, Boolean, Char 등

## 3. 특별한 타입
- **Any**: 모든 클래스의 최상위 타입
- **Unit**: 반환값 없음 (void와 유사)
- **Nothing**: 함수가 정상적으로 종료되지 않음
`,
    codeExamples: [
        {
            title: "변수 선언 예시",
            language: "kotlin",
            code: `val name: String = "Kotlin"
var age = 10
age = 11`
        }
    ],
    keyPoints: [
        "기본적으로 val을 사용하고 필요할 때만 var를 사용합니다.",
        "표준 타입 변환 메서드(toInt, toLong 등)를 사용해야 합니다."
    ],
    interviewQuestions: [
        {
            difficulty: 'Easy',
            question: "val과 var의 차이는?",
            answer: "val은 불변, var는 가변 변수입니다."
        }
    ]
};
