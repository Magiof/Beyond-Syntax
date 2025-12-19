import type { Module } from '../../types';

export const collectionsFramework: Module = {
    id: "collections-framework",
    title: "Chapter 3: 자료구조의 내부 - HashMap Deep Dive",
    topic: "Hash Algorithm, Bucket Structure, Treeify, Time Complexity",
    content: `
## 1. 단순히 "쓰는 법"이 아니라 "내부 구조"를 알아야 합니다

면접에서 "HashMap이 뭔가요?"라고 물었을 때, "키와 값으로 저장하는 거요"라고 답하면 신입입니다.
시니어는 "**해시 충돌(Hash Collision)을 어떻게 해결하는지**" 를 설명합니다.

---

## 2. HashMap의 작동 원리 (Deep Dive)

데이터를 저장(\`put\`)할 때 무슨 일이 벌어질까요?

\`\`\`mermaid
flowchart LR
    Key["Key: 'Apple'"] --> HashFunc["h = key.hashCode()"]
    HashFunc --> IndexFunc["index = h % size"]
    IndexFunc --> Array["Node[] table (Buckets)"]
    
    subgraph Bucket ["Bucket (Collision Handling)"]
        Node1["Node (Apple)"] --> Node2["Node (Banana)"]
        Node2 --> Node3["TreeNode (Red-Black Tree)"]
    end
    
    Array --> Bucket
\`\`\`

1.  **Hashing**: 키의 \`hashCode()\`를 호출하고, 상위 비트와 XOR 연산(보조 해시 함수)을 수행해 균일하게 분산시킵니다.
2.  **Addressing**: 테이블 크기(\`n\`)로 나눈 나머지(\`%\`) 인덱스에 저장합니다.
3.  **Collision Handling**:
    -   **LinkedList (Chaining)**: 같은 인덱스에 데이터가 쌓이면 링크드 리스트로 연결합니다.
    -   **Treeify (Java 8+)**: 하나의 버킷에 데이터가 8개 이상 쌓이면, **Red-Black Tree**로 변환하여 검색 성능을 O(n)에서 **O(log n)**으로 획기적으로 개선합니다.

---

## 3. 시간 복잡도 (Time Complexity)와 Trade-off

| 자료구조 | Access | Search | Insert | Delete | 특징 |
| :--- | :---: | :---: | :---: | :---: | :--- |
| **ArrayList** | **O(1)** | O(n) | O(n) | O(n) | 조회 빠름, 중간 삽입 느림(Shift 발생) |
| **LinkedList** | O(n) | O(n) | **O(1)** | **O(1)** | 조회 느림, 삽입/삭제 빠름(참조만 변경) |
| **HashMap** | N/A | **O(1)** | **O(1)** | **O(1)** | 해시 충돌 시 최악 O(n), 트리화 시 O(log n) |

> [!TIP]
> **실무 팁**: \`ArrayList\`의 초기 크기(Capacity)를 미리 지정하십시오(\`new ArrayList<>(1000)\`). 배열 크기가 꽉 차서 복사(Resizing)되는 비용을 아낄 수 있습니다.

---

## 4. equals()와 hashCode()의 관계

> **Effective Java Item 11: equals를 재정의하려거든 hashCode도 재정의하라**

HashMap은 키를 찾을 때 두 단계를 거칩니다.
1.  **HashCode 비교**: "같은 버킷에 있는가?" (빠른 필터링)
2.  **equals 비교**: "진짜 내용이 같은가?" (정밀 검사)

따라서 \`hashCode\`를 재정의하지 않으면, 영원히 데이터를 찾지 못하는 **메모리 누수(Memory Leak)** 같은 현상이 발생할 수 있습니다.
`,
    codeExamples: [
        {
            title: "올바른 Key 객체 구현 (Item 11)",
            language: "java",
            code: `class UserId {
    private final long id;

    public UserId(long id) { this.id = id; }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof UserId)) return false;
        UserId userId = (UserId) o;
        return id == userId.id;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id); // 필수! 없으면 Map에서 못 찾음
    }
}

// 사용
Map<UserId, String> userMap = new HashMap<>();
userMap.put(new UserId(1L), "Son");
// hashCode가 없으면, 아래 줄은 null을 반환합니다 (다른 객체로 인식됨)
System.out.println(userMap.get(new UserId(1L)));`
        }
    ],
    keyPoints: [
        "HashMap은 해시 충돌 시 LinkedList로 연결하다가, 데이터가 많아지면(8개) Red-Black Tree로 변환하여 성능을 최적화합니다.",
        "ArrayList는 조회가 빠르고(O(1)), LinkedList는 삽입/삭제가 빠릅니다(O(1)). 상황에 맞춰 골라 써야 합니다.",
        "Map의 Key로 쓸 객체는 반드시 equals와 hashCode를 동시에 재정의(Override)해야 합니다."
    ],
    interviewQuestions: [
        {
            difficulty: 'Hard',
            question: "왜 HashMap의 사이즈는 2의 거듭제곱(16, 32...)으로 늘어날까요?",
            answer: "컴퓨터에서 비트 연산이 나눗셈(%)보다 훨씬 빠르기 때문입니다. 사이즈가 2^n일 때 `hash % size`는 `hash & (size - 1)`이라는 비트마스킹 연산으로 대체 가능하여 성능 최적화가 일어납니다."
        },
        {
            difficulty: 'Hard',
            question: "해시 충돌(Hash Collision)이 계속 발생하면(DoS 공격 등) 어떤 문제가 생기나요?",
            answer: "모든 데이터가 하나의 버킷에 LinkedList로 연결되면 검색 성능이 O(1)에서 O(N)으로 떨어져 서버가 마비될 수 있습니다. 자바 8부터는 이를 방지하기 위해 Treeify(트리화)를 도입하여 O(log N) 성능을 보장합니다."
        }
    ]
};
