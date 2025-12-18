import type { Module } from '../../curriculumData';

export const memoryModelAndGc: Module = {
    id: 'memory-model-and-gc',
    title: 'Chapter 2: 메모리 모델과 GC 튜닝',
    topic: 'Heap Structure, GC Algorithms (G1, ZGC), Reference Objects',
    content: `
## 1. Heap 메모리 구조와 객체의 생애주기

Java Heap은 효율적인 GC를 위해 세대별(Generational)로 구분됩니다.

### 1.1 Young Generation & Old Generation
- **Eden**: 객체가 처음 생성되는 곳. 가득 차면 **Minor GC** 발생.
- **Survivor (S0, S1)**: 살아남은 객체가 잠시 머무는 곳.
- **Old**: Young 영역에서 오랫동안 살아남은 객체가 이동(**Promotion**)하는 곳. 가득 차면 **Major GC (Full GC)** 발생.

\`\`\`mermaid
graph LR
    subgraph Young Generation
    A[Eden] -->|Minor GC| B[Survivor 0]
    B -->|Minor GC| C[Survivor 1]
    end
    C -->|Promotion| D[Old Generation]
\`\`\`

### 1.2 TLAB (Thread Local Allocation Buffer)
멀티스레드 환경에서 객체 할당 시 락(Lock) 경합을 줄이기 위해, 각 스레드마다 Eden 영역의 작은 조각을 전용으로 할당해줍니다. 이를 통해 **Lock-Free**한 객체 할당이 가능합니다.

---

## 2. 가비지 컬렉션 (Garbage Collection) 알고리즘

### 2.1 Stop-The-World (STW)
GC를 실행하기 위해 애플리케이션의 모든 스레드를 일시 정지시키는 현상입니다. GC 튜닝의 핵심 목표는 이 **STW 시간을 줄이는 것**입니다.

### 2.2 주요 GC 알고리즘 비교

| 알고리즘 | 특징 | 사용 시점 |
|----------|------|-----------|
| **Serial GC** | 싱글 스레드, 매우 단순 | CPU 코어가 1개일 때 |
| **Parallel GC** | 멀티 스레드로 Young 영역 GC | 처리량(Throughput) 중심 |
| **G1 GC** (Default) | 힙을 Region 단위로 쪼개서 관리 | 대용량 힙, 예측 가능한 지연 시간 |
| **ZGC** | TB 단위 힙에서도 <10ms 지연 보장 | 초저지연 시스템 |

### 2.3 G1 GC (Garbage First) 동작 원리
전체 힙을 일정한 크기의 **Region**으로 나눕니다. 가비지가 가장 많은 Region(Garbage First)을 우선적으로 청소하여 효율을 극대화합니다.

---

## 3. 참조 유형 (Reference Types)
Strong Reference 외에도 메모리 관리를 유연하게 할 수 있는 참조 유형들이 있습니다.

- **Strong Reference**: 일반적인 참조 (\`Object o = new Object()\`). 없어지지 않는 한 GC 수거 안 됨.
- **Soft Reference**: 메모리가 부족할 때만 GC 수거. (캐싱에 적합)
- **Weak Reference**: 다음 GC 때 무조건 수거. (\`WeakHashMap\` 등)
- **Phantom Reference**: 객체가 메모리에서 해제된 직후를 추적. (리소스 정리용)
`,
    keyPoints: [
        'Heap은 Young(Eden, Survivor)과 Old 영역으로 나뉘며, 대부분의 객체는 금방 사라진다는 가설(Weak Generational Hypothesis)에 기반합니다.',
        'STW(Stop-The-World)는 GC 수행 중 애플리케이션이 멈추는 시간이며, 튜닝의 주된 목표입니다.',
        'G1 GC는 Region 단위로 메모리를 관리하여 대용량 힙에서도 예측 가능한 성능을 제공하며, Java 9+부터 기본 GC입니다.'
    ],
    interviewQuestions: [
        {
            difficulty: 'Medium',
            question: "Stop-The-World (STW) 현상이란 무엇인가요?",
            answer: "GC를 실행하기 위해 JVM이 애플리케이션 실행을 멈추는 현상입니다. GC 튜닝은 이 시간을 줄이는 것이 핵심입니다."
        },
        {
            difficulty: 'Hard',
            question: "Strong Reference와 Weak Reference의 차이는?",
            answer: "Strong Reference는 참조가 존재하는 한 절대 GC되지 않지만, Weak Reference는 참조가 있어도 다음 GC 때 무조건 수거됩니다."
        }
    ]
};
