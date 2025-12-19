import type { Module } from '../../types';

export const streamApi: Module = {
    id: "stream-api",
    title: "Chapter 2: 선언적 데이터 처리 - Stream Internals",
    topic: "Functional Programming, Lazy Evaluation, Spliterator, FlatMap",
    content: `
## 1. Stream은 '반복문'이 아닙니다

> **Modern Java in Action**: 스트림은 "**데이터 처리 질의(Query)**" 를 기술하는 선언형 API입니다. 우리가 "어떻게(How)"가 아닌 "무엇을(What)" 하려는지 명시하면, 최적화는 내부 엔진이 담당합니다.

---

## 2. 지연 평가(Lazy Evaluation)와 루프 퓨전(Loop Fusion)

스트림의 가장 큰 오해는 "메서드를 호출할 때마다 매번 루프가 돈다"라고 생각하는 것입니다.
실제로는 **최종 연산(Terminal Operation)이 호출될 때까지 아무 작업도 수행하지 않습니다.**

\`\`\`mermaid
flowchart TD
    Source["List Data"] --> Op1["filter(item -> item > 10)"]
    Op1 --> Op2["map(item -> item * 2)"]
    Op2 --> Op3["limit(3)"]
    Op3 --> Term["collect(toList)"]
    
    subgraph Optimization ["Loop Fusion & Short Circuiting"]
        direction TB
        Process["하나의 Pass 안에서 'Filter + Map' 동시 수행"]
    end
    
    Term -.->|"Trigger!"| Optimization
\`\`\`

- **Loop Fusion**: 여러 개의 중간 연산(\`filter\`, \`map\`)을 하나의 과정으로 합칩니다. 마치 뷔페 접시를 들고 이동하며 한 번에 음식을 담는 것과 같습니다.
- **Short Circuiting**: \`limit(3)\`을 만나면, 나머지 100만 개의 데이터는 **아예 쳐다보지도 않고** 즉시 종료합니다.

---

## 3. flatMap: 차원을 붕괴시키다

\`map\`이 "사과를 껍질 깐 사과"로 1:1 변환한다면, \`flatMap\`은 "사과 박스를 뜯어서 낱개 사과들"로 1:N 펼치는(Flatten) 연산입니다.

\`\`\`java
// [[A, B], [C, D]] -> [A, B, C, D]
List<String> words = List.of("Hello", "World");
List<String> uniqueChars = words.stream()
    .map(w -> w.split("")) // Stream<String[]> (박스 채로 나옴)
    .flatMap(Arrays::stream) // Stream<String> (박스를 뜯어서 내용물만 합침)
    .distinct()
    .collect(Collectors.toList());
\`\`\`

---

## 4. 병렬 처리(Parallel)와 Spliterator

> **Warning**: 무조건 빠르지 않습니다.

병렬 스트림(\`parallelStream\`)은 내부적으로 **ForkJoinPool**을 사용하며, 데이터를 쪼개는 역할은 \`Spliterator\`가 담당합니다.
- 데이터가 적거나, 박싱/언박싱 비용이 크면 오히려 느려집니다.
- **NQ 모델**: $N(\\text{데이터 수}) \\times Q(\\text{처리 비용})$ 값이 클 때만 병렬 처리가 유리합니다.
`,
    codeExamples: [
        {
            title: "Loop Fusion 최적화 증명",
            language: "java",
            code: `List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8);

// 아래 코드는 루프를 몇 번 돌까요? 
// 정답: 단 한 번만 돕니다 (Loop Fusion).
List<Integer> result = numbers.stream()
    .filter(n -> {
        System.out.println("Filtering " + n); // 로그 확인
        return n % 2 == 0;
    })
    .map(n -> {
        System.out.println("Mapping " + n); // 로그 확인
        return n * n;
    })
    .limit(2) // 2개를 찾으면 즉시 종료 (Short Circuiting)
    .collect(Collectors.toList());

/* 출력 결과:
Filtering 1
Filtering 2
Mapping 2  <-- 2는 통과하자마자 바로 Map으로 이동 (Fusion)
Filtering 3
Filtering 4
Mapping 4  <-- 4도 즉시 Map 수행
(종료)     <-- limit(2) 달성으로 나머지 5,6,7,8은 검사도 안 함
*/`
        }
    ],
    keyPoints: [
        "지연 평가(Lazy Evaluation) 덕분에 무한 스트림(Infinite Stream)도 처리가 가능합니다.",
        "flatMap은 중첩된 구조(List<List<T>>, Optional<Optional<T>>)를 납작하게 펼칠 때 필수적입니다.",
        "병렬 스트림은 만능이 아닙니다. ForkJoinPool의 컨텍스트 스위칭 비용을 고려해야 합니다."
    ],
    interviewQuestions: [
        {
            difficulty: 'Hard',
            question: "Stream의 forEach와 Collection의 forEach는 무엇이 다른가요?",
            answer: "Stream의 forEach는 스트림 파이프라인의 '최종 연산'으로서, 병렬 스트림일 경우 실행 순서가 보장되지 않습니다. 반면 Collection(List)의 forEach는 단순히 반복문(Iterator)을 수행하므로 삽입 순서대로 실행됩니다. 로직의 순서가 중요하다면 forEachOrdered를 쓰거나 Collection 루프를 써야 합니다."
        },
        {
            difficulty: 'Hard',
            question: "Spliterator가 무엇인가요?",
            answer: "Iterator가 '순차적 탐색'을 위한 도구라면, Spliterator는 '병렬 분할(Split)'을 위한 도구입니다. 병렬 스트림이 데이터를 여러 스레드에 나눠줄 때, 이 Spliterator가 데이터를 효율적으로 찢어서(TrySplit) 분배하는 역할을 담당합니다."
        }
    ]
};
