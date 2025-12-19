import type { Module } from '../../types';

export const concurrencyMastery: Module = {
    id: "concurrency-mastery",
    title: "Chapter 3: 동시성 마스터리 (Deep Dive)",
    topic: "Java Memory Model, Visibility, Atomic Operations, ForkJoinPool",
    content: `
## 1. 동시성(Concurrency)의 두 얼굴

고성능 애플리케이션을 위해서는 동시성이 필수적이지만, 올바르게 다루지 못하면 재앙(Race Condition, Deadlock)이 됩니다.

- **표면적 이해**: "여러 스레드가 동시에 일한다."
- **엔지니어링 관점**: "Shared Mutable State(공유되는 변경 가능한 상태)를 어떻게 안전하게 관리할 것인가?"

---

## 2. Deep Dive: Java Memory Model (JMM)

> [!WARNING]
> **면접 전 필독**: 단순히 스레드를 만드는 게 중요한 게 아닙니다. CPU 캐시와 메인 메모리 사이의 불일치 문제를 이해해야 합니다.

### 2.1 가시성(Visibility) 문제
현대의 CPU는 성능을 위해 메인 메모리에서 값을 읽어와 **L1/L2 캐시**에 저장하고 작업합니다.

\`\`\`mermaid
flowchart TD
    subgraph CPU_Core_1 ["CPU Core 1"]
        ThreadA["Thread A"]
        CacheA["L1 Cache (x=1)"]
    end
    subgraph CPU_Core_2 ["CPU Core 2"]
        ThreadB["Thread B"]
        CacheB["L1 Cache (x=0)"]
    end
    MainMemory["Main Memory (x=1)"]

    ThreadA -->|"Write x=1"| CacheA
    CacheA -.->|"Flush (Delayed)"| MainMemory
    ThreadB -->|"Read x"| CacheB
    MainMemory -.->|"Load (Delayed)"| CacheB

    style CacheA fill:#f9f,stroke:#333
    style CacheB fill:#bbf,stroke:#333
    style MainMemory fill:#ffe,stroke:#333
\`\`\`

- **문제 상황**: 스레드 A가 값을 바꿨는데, 스레드 B의 캐시에는 아직 반영되지 않아 옛날 값을 읽는 현상.
- **해결책 (volatile)**: "작업할 때 캐시 쓰지 말고, 무조건 메인 메모리에서 읽고 써라"고 강제하는 키워드입니다.

### 2.2 원자성(Atomicity) 문제
\`count++\` 같은 코드는 한 줄처럼 보이지만, 기계어로는 3단계(Read -> Modify -> Write)로 나뉩니다.
- **문제 상황**: 스레드 A가 Read하고 Modify하는 도중에, 스레드 B가 끼어들어 값을 바꿔버리면(Context Switching) 연산 결과가 유실됩니다.
- **해결책 (Atomic Classes)**: CAS(Compare-And-Swap) 알고리즘을 이용해, 하드웨어 레벨에서 원자성을 보장합니다. \`synchronized\`보다 훨씬 가볍고 빠릅니다.

\`\`\`java
// Thread-Unsafe
int count = 0;
void increment() { count++; } // 동시 접근 시 값 유실됨

// Thread-Safe (Recommended)
AtomicInteger atomicCount = new AtomicInteger(0);
void incrementSafe() { atomicCount.incrementAndGet(); } // 안전함
\`\`\`

---

## 3. 스레드 풀의 내부 동작 (ThreadPoolExecutor)

\`new Thread()\`를 직접 쓰면 안 되는 이유는 단순히 생성 비용 때문이 아닙니다. **OS 리소스 고갈**과 **Context Switching 오버헤드** 때문입니다.

\`\`\`mermaid
sequenceDiagram
    participant User as Client
    participant Queue as BlockingQueue
    participant Worker as Thread Worker
    
    User->>Queue: 1. submit(Task)
    Note over Queue: 대기열에 작업 적재
    
    loop Infinite Loop
        Worker->>Queue: "2. take() (Block if empty)"
        Queue-->>Worker: "3. Return Task"
        Worker->>Worker: "4. Run Task"
    end
\`\`\`

### 3.1 주요 파라미터 분석
\`\`\`java
new ThreadPoolExecutor(
    corePoolSize,    // 평소에 유지할 직원 수
    maximumPoolSize, // 바쁠 때 임시로 늘릴 최대 직원 수
    keepAliveTime,   // 임시 직원이 할 일 없을 때 해고 대기 시간
    new LinkedBlockingQueue<>(capacity) // 대기줄 (중요!)
);
\`\`\`

> [!CAUTION]
> **실무 주의사항**: \`Executors.newFixedThreadPool()\`은 편해 보이지만, 내부적으로 **Unbounded Queue(무제한 대기열)**를 씁니다. 요청이 폭주하면 대기열이 무한정 늘어나다가 \`OutOfMemoryError\`로 서버가 죽습니다. 실무에선 반드시 대기열 크기가 제한된 Custom ThreadPool을 써야 합니다.

---

## 4. CompletableFuture와 ForkJoinPool

비동기 프로그래밍은 I/O Blocking으로 인한 스레드 낭비를 막는 핵심 기술입니다.

### 4.1 ForkJoinPool (Work Stealing)
\`CompletableFuture\`는 기본적으로 \`ForkJoinPool.commonPool()\`을 사용합니다.

\`\`\`mermaid
flowchart TD
    subgraph Thread_A ["Thread A"]
        DequeA["Deque A: Task 1, Task 2"]
    end
    subgraph Thread_B ["Thread B"]
        DequeB["Deque B: (Empty)"]
    end
    
    DequeA -->|Pop| Processing["Thread A Processing Task 1"]
    DequeB -.->|"Steal from Tail"| DequeA
    
    style DequeB stroke-dasharray: 5 5
\`\`\`

- **Work Stealing**: 할 일이 끝난 스레드가 노는 게 아니라, 바쁜 다른 스레드의 큐(Deque) 뒤에서 작업을 훔쳐와서 도와줍니다. CPU 활용률을 극대화하는 기법입니다.
- **주의점**: CommonPool은 전역적으로 공유되므로, 여기서 오래 걸리는 작업(Blocking I/O)을 하면 애플리케이션 전체 성능이 저하됩니다. I/O 작업은 별도의 스레드 풀로 분리해야 합니다.

\`\`\`java
// I/O 작업은 별도 풀에서 실행 (권장)
ExecutorService ioPool = Executors.newFixedThreadPool(10);

CompletableFuture.supplyAsync(() -> dbQuery(), ioPool) // ioPool 지정
    .thenApply(result -> process(result));
\`\`\`

---

## 5. Reference & Further Reading
기초를 넘어 깊이 있는 학습을 위해 아래 문서를 정독할 것을 권장합니다.

- [Oracle: Java Memory Model Logic](https://docs.oracle.com/javase/specs/jls/se8/html/jls-17.html)
- [Baeldung: Guide to java.util.concurrent](https://www.baeldung.com/java-util-concurrent)
- [Jenkov: Java Concurrency and Multithreading](https://jenkov.com/tutorials/java-concurrency/index.html)
`,
    codeExamples: [
        {
            title: "Visibility 문제와 Volatile 해결",
            language: "java",
            code: `public class VisibilityDemo {
    // volatile이 없으면 running 플래그의 변경사항이 
    // 다른 스레드에게 영원히 보이지 않을 수 있음 (무한 루프)
    private static volatile boolean running = true;

    public static void main(String[] args) throws InterruptedException {
        new Thread(() -> {
            System.out.println("Worker started.");
            while (running) {
                // busy-waiting
            }
            System.out.println("Worker stopped.");
        }).start();

        Thread.sleep(100);
        running = false; // 메인 메모리에 즉시 쓰기 (Flush)
        System.out.println("Main thread signaled stop.");
    }
}`
        },
        {
            title: "AtomicInteger를 이용한 Lock-Free 연산",
            language: "java",
            code: `import java.util.concurrent.atomic.AtomicInteger;

public class AtomicCounter {
    private AtomicInteger count = new AtomicInteger(0);

    public void increment() {
        // 내부적으로 CAS(Compare-And-Swap) 루프를 돕니다.
        // synchronized보다 훨씬 빠릅니다.
        count.incrementAndGet();
    }

    public int get() {
        return count.get();
    }
}`
        }
    ],
    keyPoints: [
        "가시성(Visibility) 문제는 CPU 캐시 때문에 발생하며, volatile로 해결합니다.",
        "원자성(Atomicity) 문제는 연산의 쪼개짐 때문에 발생하며, Atomic 클래스나 Lock으로 해결합니다.",
        "Executors.new... 메서드는 편리하지만 OOM 위험이 있으므로, 실무에선 ThreadPoolExecutor를 직접 안전하게 설정해서 써야 합니다."
    ],
    interviewQuestions: [
        {
            difficulty: 'Hard',
            question: "Volatile 키워드는 원자성을 보장하나요?",
            answer: "아니요, 보장하지 않습니다. Volatile은 오직 '가시성(최신 값 읽기)'만 보장합니다. 여러 스레드가 동시에 값을 쓰고 읽는 상황(예: count++)에서는 여전히 Race Condition이 발생하므로 synchronized나 Atomic 변수가 필요합니다."
        },
        {
            difficulty: 'Hell',
            question: "ForkJoinPool의 Work Stealing 알고리즘에 대해 설명해보세요.",
            answer: "각 스레드가 자신의 Deque(양방향 큐)를 가집니다. 본인의 큐가 비면, 다른 스레드 큐의 '꼬리(Tail)' 부분에서 작업을 훔쳐옵니다(Steal). 이를 통해 스레드 간의 락 경합(Coontention)을 줄이고 CPU 캐시 지역성(Locality)을 높여 성능을 극대화합니다."
        }
    ]
};
