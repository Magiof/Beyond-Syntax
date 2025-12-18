import type { Module } from '../../curriculumData';

export const collections: Module = {
    id: "collections",
    title: "Chapter 15: 컬렉션 프레임워크",
    topic: "List, Set, Map, ArrayList, HashSet, HashMap",
    content: `
## 1. List (순서 O, 중복 O)
- **ArrayList**: 배열 기반, 조회 빠름
- **LinkedList**: 노드 연결, 삽입/삭제 빠름

## 2. Set (순서 X, 중복 X)
- **HashSet**: 해시 테이블 기반
- **TreeSet**: 정렬 제공

## 3. Map (Key-Value 쌍)
- **HashMap**: 키 중복 불가
- **TreeMap**: 키 순서 정렬

---

## 4. Iterator
컬렉션을 순회하기 위한 표준 방식입니다.
\`\`\`java
Iterator<String> it = list.iterator();
while(it.hasNext()) { ... }
\`\`\`
`,
    codeExamples: [
        {
            title: "HashMap 활용",
            language: "java",
            code: `Map<String, Integer> map = new HashMap<>();
map.put("Alice", 90);
map.put("Bob", 80);
System.out.println(map.get("Alice")); // 90`
        }
    ],
    keyPoints: [
        "자료구조를 직접 구현하지 않고 표준화된 API를 사용합니다.",
        "데이터의 특성(중복, 순서)에 맞는 컬렉션을 선택하는 것이 중요합니다."
    ],
    interviewQuestions: [
        {
            difficulty: 'Easy',
            question: "ArrayList와 LinkedList의 차이는?",
            answer: "ArrayList는 조회가 빠르지만 삽입/삭제 시 데이터 이동이 있고, LinkedList는 삽입/삭제는 빠르지만 조회 시 처음달부터 찾아야 해서 느립니다."
        }
    ]
};
