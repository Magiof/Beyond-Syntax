import type { Phase } from '../curriculumData';

export const javaAdvancedPhase: Phase = {
  id: 'java-phase2',
  title: 'Phase 2: Java 심화 (Deep Dive)',
  goal: 'JVM의 내부 동작 원리와 메모리 모델, 동시성, 고성능 I/O까지 Java의 깊은 곳을 탐험합니다.',
  modules: [
    {
      id: 'jvm-architecture',
      title: 'Chapter 1: JVM 아키텍처와 바이트코드',
      topic: 'Class Loader, Runtime Data Areas, Execution Engine, Bytecode',
      content: `
## 1. JVM (Java Virtual Machine) 아키텍처

우리가 작성한 \`.java\` 코드가 실제로 어떻게 실행되는지, 그 마법의 과정을 들여다봅니다.

### 1.1 전체 구조도

\`\`\`mermaid
graph TD
    A[Source Code .java] -->|javac| B[Bytecode .class]
    B --> C[Class Loader Subsystem]
    C -->|Loading, Linking, Initialization| D[Runtime Data Areas]
    D --> E[Execution Engine]
    E -->|Interpreter, JIT| F[Native Method Interface]
    F --> G[Native Method Libraries]
\`\`\`

### 1.2 Class Loader Subsystem
클래스 파일을 로드하고 검증하며 초기화하는 역할을 합니다.

- **Loading**: \`.class\` 파일을 읽어 바이트 코드를 **Method Area**에 저장합니다.
- **Linking**:
  - *Verify*: 바이트코드가 유효한지 검증 (보안상 매우 중요)
  - *Prepare*: static 변수의 메모리를 할당하고 기본값으로 초기화
  - *Resolve*: 심볼릭 참조(클래스명 등)를 직접 참조(메모리 주소)로 변경
- **Initialization**: static 블록을 실행하고 static 변수에 초기값을 할당합니다.

### 1.3 Runtime Data Areas (메모리 영역)
JVM이 OS로부터 할당받은 메모리 공간입니다.

| 영역 | 설명 | 스레드 공유 여부 |
|------|------|------------------|
| **Method Area** | 클래스 메타데이터, 상수 풀, static 변수 저장 | ✅ 공유 |
| **Heap** | \`new\`로 생성된 모든 객체와 배열 저장 (GC 대상) | ✅ 공유 |
| **Stack** | 메서드 호출 시 생성되는 프레임(로컬 변수, 연산 스택) 저장 | ❌ 스레드별 생성 |
| **PC Register** | 현재 실행 중인 명령어의 주소 저장 | ❌ 스레드별 생성 |
| **Native Method Stack** | Java가 아닌 C/C++로 작성된 네이티브 코드 실행 스택 | ❌ 스레드별 생성 |

---

## 2. 바이트코드 (Bytecode) 해부하기

Java의 "Write Once, Run Anywhere"를 가능게 하는 핵심입니다. 1바이트 크기의 명령어(Opcode)로 구성됩니다.

### 2.1 간단한 덧셈 코드

\`\`\`java
public int add(int a, int b) {
    return a + b;
}
\`\`\`

### 2.2 바이트코드 분석 (\`javap -c\`)

\`\`\`
0: iload_1     // 지역 변수 1번(a)를 스택에 로드
1: iload_2     // 지역 변수 2번(b)를 스택에 로드
2: iadd        // 스택의 두 값을 꺼내 더한 후 다시 스택에 저장
3: ireturn     // 스택의 결과값을 반환
\`\`\`

이처럼 JVM은 **스택 기반 가상 머신(Stack-based VM)** 입니다. 레지스터가 아닌 스택을 사용해 피연산자를 관리합니다.

---

## 3. 실행 엔진 (Execution Engine)

### 3.1 인터프리터 (Interpreter)
바이트코드를 한 줄씩 읽어서 기계어로 변환해 실행합니다. 초기 실행 속도는 빠르지만 반복되는 코드는 느립니다.

### 3.2 JIT (Just-In-Time) 컴파일러
인터프리터의 단점을 보완합니다. 자주 실행되는 코드(**Hotspot**)를 식별하여 기계어로 한 번에 컴파일하고 캐싱합니다.

- **C1 컴파일러**: 빠르게 컴파일하며 가벼운 최적화 수행
- **C2 컴파일러**: 분석 시간이 걸리지만 매우 강력한 최적화 수행 (서버용)

> **팁**: \`-XX:+PrintCompilation\` 옵션으로 JIT 컴파일 로그를 확인할 수 있습니다.
`,
      keyPoints: [
        'Class Loading은 Loading -> Linking -> Initialization 3단계를 거칩니다.',
        'Runtime Data Area 중 Heap과 Method Area는 모든 스레드가 공유하며, Stack, PC Register, Native Method Stack은 스레드마다 독립적입니다.',
        'JVM은 스택 기반으로 동작하며, JIT 컴파일러를 통해 자주 실행되는 코드를 네이티브 코드로 최적화합니다.'
      ],
      interviewQuestions: [
        {
          difficulty: 'Medium',
          question: "JIT(Just-In-Time) 컴파일러의 역할은 무엇인가요?",
          answer: "인터프리터 방식으로 실행하다가 자주 실행되는 코드(Hotspot)를 발견하면, 이를 기계어로 컴파일하고 캐싱하여 실행 속도를 향상시킵니다."
        },
        {
          difficulty: 'Hard',
          question: "JVM 메모리 영역 중 Stack과 Heap의 차이점과 스레드 공유 여부는?",
          answer: "Heap은 객체가 저장되는 영역으로 모든 스레드가 공유하지만, Stack은 메서드 호출 시 지역 변수 등을 저장하며 각 스레드마다 독립적으로 생성됩니다."
        }
      ]
    },
    {
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
    },
    {
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
    },
    {
      id: 'reflection-and-dynamic-proxy',
      title: 'Chapter 4: 리플렉션과 동적 프록시',
      topic: 'Reflection API, Dynamic Proxy, CGLIB, Annotation Processor',
      content: `
## 1. 리플렉션 (Reflection)
구체적인 클래스 타입을 알지 못해도, 런타임에 클래스의 정보(메서드, 필드 등)를 조회하고 조작할 수 있는 API입니다.

### 1.1 사용 예시

\`\`\`java
Class<?> clazz = Class.forName("com.example.User");
Method method = clazz.getMethod("getName");
Object result = method.invoke(instance);
\`\`\`

스프링 프레임워크가 \`@Controller\`가 붙은 클래스를 찾아서 객체를 생성하고 매핑할 수 있는 원리가 바로 리플렉션입니다.

### 1.2 단점
- **성능 오버헤드**: 컴파일 타임 최적화를 받지 못합니다.
- **안전성 저하**: private 필드 접근 등 캡슐화를 깰 수 있습니다.

---

## 2. 동적 프록시 (Dynamic Proxy)
런타임에 인터페이스나 클래스의 프록시(대리자) 객체를 생성합니다. AOP(Aspect Oriented Programming)의 핵심 기술입니다.

### 2.1 JDK Dynamic Proxy
- **특징**: Java 표준 API. **인터페이스**가 반드시 있어야 함.
- **원리**: \`InnovationHandler\`를 통해 메서드 호출을 가로챕니다.

\`\`\`java
UserService proxy = (UserService) Proxy.newProxyInstance(
    loader,
    new Class[]{UserService.class},
    new MyInvocationHandler(realService)
);
\`\`\`

### 2.2 CGLIB (Code Generation Library)
- **특징**: 오픈소스 라이브러리(스프링에 내장). **클래스 상속** 기반.
- **원리**: 바이트코드를 조작하여 타겟 클래스를 상속받는 프록시 클래스를 생성합니다. 인터페이스가 없어도 됩니다.

> **참고**: Spring Boot는 기본적으로 CGLIB를 사용하여 프록시를 생성합니다.

---

## 3. Annotation Processor (컴파일 타임 코드 생성)
Lombok(\`@Getter\`, \`@Setter\`)은 어떻게 동작할까요? 
컴파일 시점에 어노테이션을 스캔하고, **AST(Abstract Syntax Tree)** 를 조작하여 코드를 동적으로 생성해 끼워 넣습니다.
`,
      keyPoints: [
        'Reflection은 런타임에 객체의 구조를 분석하고 조작하는 강력하지만 비용이 비싼 기능입니다.',
        'JDK Dynamic Proxy는 인터페이스 기반, CGLIB는 상속(바이트코드 조작) 기반으로 프록시를 생성합니다.',
        'Lombok은 Annotation Processor를 사용하여 컴파일 타임에 AST를 수정, 보일러플레이트 코드를 자동 생성합니다.'
      ],
      interviewQuestions: [
        {
          difficulty: 'Medium',
          question: "Reflection API 사용 시 주의할 점은?",
          answer: "컴파일 타임 타입 체크가 불가능해 런타임 오류 위험이 있고, 접근 제어를 무시하여 캡슐화를 깰 수 있으며, 일반 호출보다 성능 오버헤드가 큽니다."
        },
        {
          difficulty: 'Hard',
          question: "JDK Dynamic Proxy와 CGLIB의 차이는?",
          answer: "JDK Dynamic Proxy는 인터페이스가 반드시 필요하며 리플렉션을 사용하지만, CGLIB는 바이트코드를 조작하여 클래스를 상속받는 방식이라 인터페이스 없이도 가능합니다."
        }
      ]
    },
    {
      id: 'java-nio',
      title: 'Chapter 5: Java NIO와 고성능 I/O',
      topic: 'Blocking vs Non-Blocking, Buffer, Channel, Selector, Netty',
      content: `
## 1. Java IO vs NIO

### 1.1 전통적인 IO (java.io)
- **Stream** 기반: 데이터가 흐르는 파이프. 단방향.
- **Blocking**: \`read()\` 호출 시 데이터가 올 때까지 스레드가 멈춤.
- 클라이언트 1명당 1개의 스레드가 필요함 (1:1 모델). 접속자가 많으면 스레드 폭증으로 성능 저하.

### 1.2 NIO (New IO, java.nio)
- **Buffer** & **Channel** 기반: 양방향 입출력 가능.
- **Non-Blocking**: 데이터가 없으면 즉시 리턴, 다른 작업 수행 가능.

---

## 2. NIO의 핵심: Selector (Multiplexing)
하나의 스레드로 여러 채널(연결)을 관리할 수 있게 해주는 컴포넌트입니다.

\`\`\`mermaid
graph TD
    Client1 --> Channel1
    Client2 --> Channel2
    Channel1 --> Selector
    Channel2 --> Selector
    Selector --> SingleThread[Single Thread]
\`\`\`

1. 여러 Channel을 Selector에 등록합니다.
2. Selector는 이벤트(읽기 가능, 쓰기 가능 등)가 발생한 Channel만 감지합니다.
3. 스레드는 이벤트가 발생한 Channel만 처리하므로 효율적입니다.

---

## 3. Netty 프레임워크
NIO는 로우 레벨이고 복잡해서 직접 사용하기 어렵습니다. 보통 **Netty**라는 강력한 프레임워크를 사용합니다.

- **Event Loop**: 무한 루프를 돌며 이벤트를 처리하는 스레드
- **Pipeline**: 들어온 데이터를 처리하는 핸들러의 체인 (필터 체인 패턴)
- **Zero-Copy**: 데이터를 커널 영역에서 사용자 영역으로 복사하지 않고 전송하여 성능 최적화

스프링 웹플럭스(Spring WebFlux)도 내부적으로 Netty를 사용합니다.
`,
      keyPoints: [
        '전통적인 IO는 Blocking 방식으로, 스레드를 많이 소모하여 대규모 동시 접속 처리에 불리합니다.',
        'NIO는 Channel, Buffer, Selector를 사용하여 Non-Blocking 및 Multiplexing I/O를 지원합니다.',
        'Selector를 사용하면 하나의 스레드로 수천 개의 연결을 효율적으로 관리할 수 있습니다.'
      ],
      interviewQuestions: [
        {
          difficulty: 'Medium',
          question: "Blocking I/O와 Non-Blocking I/O의 차이는?",
          answer: "Blocking은 데이터가 준비될 때까지 스레드가 대기하지만, Non-Blocking은 즉시 리턴하여 스레드가 다른 작업을 할 수 있게 합니다."
        },
        {
          difficulty: 'Hard',
          question: "Java NIO에서 Selector의 역할은?",
          answer: "단일 스레드로 여러 채널(소켓 연결)의 이벤트를 감시하고 처리하는 멀티플렉싱(Multiplexing) 역할을 수행하여 효율적인 리소스 사용을 가능하게 합니다."
        }
      ]
    },
    {
      id: 'modern-java-evolution',
      title: "Chapter 6: Modern Java Evolution",
      topic: "Java 21, Virtual Threads, Record, Pattern Matching",
      content: `
## 1. Project Loom과 Virtual Threads (Java 21)

Java의 동시성 모델을 송두리째 바꿀 혁명입니다.

### 1.1 Platform Thread vs Virtual Thread
- **Platform Thread**: OS 스레드와 1:1 매핑. 생성 비용이 비싸고 개수 제한이 있음 (보통 수천 개).
- **Virtual Thread**: OS 스레드와 N:1 매핑. JVM이 관리하는 경량 스레드. 수백만 개 생성 가능.

\`\`\`java
// 기존 스레드 (OS 스레드 사용)
Thread.ofPlatform().start(() -> System.out.println("Heavy"));

// 가상 스레드 (매우 가볍다!)
Thread.ofVirtual().start(() -> System.out.println("Light"));
\`\`\`

### 1.2 Blocking의 변화
기존에는 I/O Blocking 시 OS 스레드도 함께 멈췄지만, 가상 스레드는 Blocking 시 **Unmount**되어 다른 가상 스레드가 실행될 수 있게 합니다. 즉, **Non-blocking I/O 코드 없이도 Non-blocking의 효율**을 낼 수 있습니다.

---

## 2. Data Oriented Programming

### 2.1 Record Class (Java 14+)
불변 데이터 객체(DTO)를 위한 간결한 문법입니다. \`equals\`, \`hashCode\`, \`toString\`이 자동 생성됩니다.

\`\`\`java
public record User(String name, int age) {}
\`\`\`

### 2.2 Sealed Class (Java 15+)
상속 가능한 자식 클래스를 제한하여 계층 구조를 명확히 합니다.

\`\`\`java
public sealed interface Shape permits Circle, Rectangle {}
public final class Circle implements Shape {}
public final class Rectangle implements Shape {}
\`\`\`

---

## 3. Pattern Matching (Java 17~)

\`switch\` 문과 \`instanceof\`가 강력해졌습니다.

\`\`\`java
Object obj = 10;

String result = switch (obj) {
    case Integer i -> "It is an integer: " + i;
    case String s -> "It is a string: " + s;
    case null -> "It is null";
    default -> "Unknown";
};
\`\`\`
`,
      keyPoints: [
        "Virtual Threads는 OS 스레드 모델의 한계를 극복하고 수백만 개의 동시 작업을 가능하게 합니다.",
        "Record와 Sealed Class를 통해 데이터를 더 안전하고 간결하게 표현할 수 있습니다.",
        "Pattern Matching은 조건부 로직을 더 선언적이고 읽기 쉽게 만듭니다."
      ],
      interviewQuestions: [
        {
          difficulty: 'Medium',
          question: "Virtual Thread와 기존 Thread(Platform Thread)의 차이점은?",
          answer: "기존 스레드는 OS 스레드와 1:1 매핑되어 비용이 비싸지만, Virtual Thread는 JVM이 관리하는 경량 스레드로 OS 스레드와 N:1 매핑되어 수백만 개 생성이 가능합니다."
        },
        {
          difficulty: 'Easy',
          question: "Java Record 클래스를 사용하는 이점은?",
          answer: "데이터 보관용 불변(Immutable) 객체를 생성할 때 생성자, getter, equals, hashCode, toString을 자동으로 만들어주어 코드가 매우 간결해집니다."
        }
      ],
      codeExamples: [
        {
          title: "Virtual Threads 성능 테스트",
          language: "java",
          code: `import java.time.Duration;
import java.util.concurrent.Executors;
import java.util.stream.IntStream;

public class VirtualThreadDemo {
    public static void main(String[] args) {
        long start = System.currentTimeMillis();
        
        // 10만 개의 스레드 실행! (플랫폼 스레드라면 OOM 발생 가능)
        try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {
            IntStream.range(0, 100_000).forEach(i -> {
                executor.submit(() -> {
                    try {
                        Thread.sleep(Duration.ofMillis(100)); // 블로킹 연산
                    } catch (InterruptedException e) {
                        // ignore
                    }
                });
            });
        } // try-with-resources가 모든 작업 완료를 기다림
        
        long end = System.currentTimeMillis();
        System.out.println("Processing took: " + (end - start) + "ms");
        // 예상: 약 100~200ms (10만 개가 거의 동시에 처리됨)
    }
}`
        }
      ]
    }
  ]
};
