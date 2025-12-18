import type { Module } from '../../curriculumData';

export const collections: Module = {
    id: "collections",
    title: "Chapter 8: 컬렉션",
    topic: "List, Set, Map, 불변/가변, 컬렉션 함수",
    content: `
## 1. 불변 vs 가변
Kotlin은 읽기 전용 컬렉션과 수정 가능 컬렉션을 엄격히 구분합니다.

## 2. 주요 컬렉션
- List, Set, Map

## 3. 컬렉션 함수
filter, map, flatMap, groupBy 등 강력한 함수형 연산자를 지원합니다.
`,
    codeExamples: [
        {
            title: "컬렉션 연산",
            language: "kotlin",
            code: `val list = listOf(1, 2, 3)
val evens = list.filter { it % 2 == 0 }`
        }
    ],
    keyPoints: [
        "기본적으로 불변 컬렉션을 사용하는 것이 안전합니다.",
        "표준 라이브러리 함수를 활용해 가독성 높은 코드를 짭니다."
    ],
    interviewQuestions: [
        {
            difficulty: 'Easy',
            question: "listOf와 mutableListOf의 차이는?",
            answer: "listOf는 읽기 전용, mutableListOf는 수정 가능한 리스트를 만듭니다."
        }
    ]
};
