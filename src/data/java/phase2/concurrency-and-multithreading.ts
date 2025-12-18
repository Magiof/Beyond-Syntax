import type { Module } from '../../curriculumData';

export const concurrencyAndMultithreading: Module = {
    id: 'concurrency-and-multithreading',
    title: 'Chapter 3: 동시성 프로그래밍의 깊은 곳',
    topic: 'CPU Cache, JMM, Volatile, CAS, AQS',
    content: `
## 1. 하드웨어 수준의 동시성 문제

### 1.1 CPU Cache와 가시성(Visibility) 문제
현대 CPU는 성능을 위해 L1, L2, L3 캐시를 사용합니다. 각 코어는 메인 메모리 값을 캐시에 복사해 사용하므로, 한 코어가 값을 바꿔도 다른 코어는 모를 수 있습니다. 이를 **가시성 문제**라고 합니다.

### 1.2 Java Memory Model (JMM)
JMM은 JVM이 메모리에 접근하는 규칙을 정의하여 하드웨어 차이를 추상화합니다.
- **Happens-Before**: A 작업이 B 작업보다 먼저 일어났음을 보장하는 규칙입니다.

---

## 2. Volatile 키워드
\`volatile\`은 변수를 CPU 캐시가 아닌 **메인 메모리(Main Memory)** 에 직접 읽고 쓰도록 강제합니다.

\`\`\`java
private volatile boolean running = true;
\`\`\`

- **보장하는 것**: 변수의 **가시성** (모든 스레드가 최신 값을 봄)
- **보장하지 않는 것**: 원자성 (여러 스레드가 동시에 수정하면 값 덮어쓰기 발생 가능)

---

## 3. CAS (Compare-And-Swap) & Atomic
**Lock-Free** 알고리즘의 핵심입니다. 락을 걸지 않고도 안전하게 값을 업데이트합니다.

### 3.1 동작 원리
"내가 알고 있는 값(Expect)이 현재 메모리 값(Value)과 같다면, 새로운 값(Update)으로 바꿔라. 아니라면 다시 시도해라."

\`\`\`java
AtomicInteger atomicInt = new AtomicInteger(0);
atomicInt.incrementAndGet(); // 내부적으로 CAS 루프 사용
\`\`\`

이는 CPU 레벨의 원자적 명령어(\`cmpxchg\`)를 사용하므로 매우 빠릅니다.

---

## 4. AQS (AbstractQueuedSynchronizer)
Java의 \`ReentrantLock\`, \`CountDownLatch\`, \`Semaphore\` 등의 기반이 되는 동기화 프레임워크입니다.

- **State**: 공유 자원의 상태를 나타내는 \`volatile int\` 변수
- **CLH Queue**: 락을 획득하지 못한 스레드들이 대기하는 큐
- AQS를 상속받아 \`tryAcquire\`, \`tryRelease\` 등만 구현하면 고성능 동기화 클래스를 만들 수 있습니다.
`,
    keyPoints: [
        'CPU 캐시로 인한 가시성 문제를 해결하기 위해 volatile이나 동기화가 필요합니다.',
        'CAS(Compare-And-Swap)는 락 없이 원자적 연산을 수행하는 하드웨어 지원 기술입니다.',
        'AQS는 int 상태 변수와 대기 큐(CLH)를 기반으로 하는 자바 동기화 라이브러리의 핵심 프레임워크입니다.'
    ],
    interviewQuestions: [
        {
            difficulty: 'Medium',
            question: "volatile 키워드의 역할과 한계는?",
            answer: "변수 값을 메인 메모리에 직접 읽고 쓰게 하여 가시성을 보장하지만, 여러 스레드가 동시에 쓸 때의 원자성(Atomicity)은 보장하지 않습니다."
        },
        {
            difficulty: 'Hard',
            question: "CAS (Compare-And-Swap) 알고리즘이란?",
            answer: "현재 값과 기대하는 값이 같을 때만 새로운 값으로 업데이트하는 원자적 연산으로, 락(Lock) 없이 동기화를 구현할 때(Lock-Free) 사용됩니다."
        }
    ]
};
