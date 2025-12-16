import type { Phase } from '../curriculumData';

export const javaAdvancedPhase: Phase = {
  id: "phase1",
  title: "Phase 1: Java 심화 (Deep Dive)",
  goal: "JVM의 내부 동작 원리와 메모리 모델을 바이트코드 레벨까지 파헤칩니다. 동시성 프로그래밍의 근본 원리를 이해합니다.",
  modules: [
    {
      id: "p1-m1",
      title: "Chapter 1: JVM Architecture & Memory Model",
      topic: "Class Loader Subsystem, Runtime Data Areas, TLAB & Allocation, JIT Compiler",
      content: `
## 1. JVM 아키텍처 개요

**JVM(Java Virtual Machine)**은 Java 바이트코드를 실행하는 가상 머신입니다. JVM은 크게 세 가지 주요 컴포넌트로 구성됩니다.

\`\`\`mermaid
graph TD
    subgraph "JVM (Java Virtual Machine)"
        CLS[Class Loader Subsystem<br/>Loading → Linking → Initialization]
        
        subgraph "Runtime Data Areas"
            MA[Method Area<br/>(Shared)]
            Heap[Heap<br/>(Shared)]
            Stack[Stack<br/>(Per Thread)]
            PC[PC Register<br/>(Per Thread)]
        end
        
        EE[Execution Engine<br/>Interpreter + JIT Compiler + GC]
        
        CLS --> Runtime Data Areas
        Runtime Data Areas --> EE
    end
\`\`\`

---

## 2. Class Loader Subsystem

클래스 로더는 **.class 파일**을 읽어 JVM 메모리에 로드하는 역할을 합니다.

### 2.1 Class Loading의 3단계

#### 1) Loading (로딩)
바이트코드 파일(.class)을 읽어 Method Area에 저장합니다.

\`\`\`java
// 클래스가 처음 사용될 때 로딩됨
MyClass obj = new MyClass();  // MyClass.class 로딩
Class<?> clazz = Class.forName("com.example.MyClass");  // 명시적 로딩
\`\`\`

#### 2) Linking (링킹)
링킹은 다시 3단계로 나뉩니다:

| 단계 | 설명 |
|------|------|
| **Verification** | 바이트코드가 JVM 명세에 맞는지 검증 (보안) |
| **Preparation** | static 변수에 메모리 할당 및 기본값 초기화 |
| **Resolution** | 심볼릭 레퍼런스를 실제 메모리 주소로 변환 |

\`\`\`java
public class Example {
    static int count;        // Preparation: 0으로 초기화
    static String name;      // Preparation: null로 초기화
    static final int MAX = 100;  // 컴파일 타임 상수는 바로 할당
}
\`\`\`

#### 3) Initialization (초기화)
static 변수에 실제 값을 할당하고 static 블록을 실행합니다.

\`\`\`java
public class Example {
    static int count = 10;  // Initialization에서 10 할당
    
    static {
        System.out.println("Static block executed!");
        count = 20;  // static 블록에서 값 변경
    }
}
\`\`\`

### 2.2 클래스 로더의 계층 구조 (Delegation Model)

\`\`\`mermaid
graph TD
    Bootstrap[Bootstrap ClassLoader<br/>rt.jar / java.base]
    Extension[Platform/Extension ClassLoader<br/>lib/ext / java.*]
    App[Application/System ClassLoader<br/>classpath]
    Custom[Custom ClassLoader]

    Bootstrap -->|Parent| Extension
    Extension -->|Parent| App
    App -->|Parent| Custom
\`\`\`

### 2.3 Parent Delegation Model

클래스 로딩 요청이 오면 먼저 부모에게 위임합니다.

\`\`\`java
// 클래스 로딩 순서
1. Application ClassLoader가 "java.lang.String" 로딩 요청 받음
2. 부모인 Extension ClassLoader에게 위임
3. 부모인 Bootstrap ClassLoader에게 위임
4. Bootstrap이 java.lang.String을 찾아서 로딩
5. 찾으면 반환, 없으면 자식에게 다시 위임
\`\`\`

**왜 이렇게 할까요?**
- **보안**: 악성 코드가 java.lang.String을 위조해도, 항상 Bootstrap이 먼저 진짜를 로딩
- **중복 방지**: 같은 클래스가 여러 번 로딩되는 것을 방지

---

## 3. Runtime Data Areas (메모리 구조)

JVM이 프로그램 실행 시 사용하는 메모리 영역입니다.

### 3.1 Method Area (메서드 영역)

**모든 스레드가 공유**하는 영역으로, 다음 정보를 저장합니다:

- 클래스 메타데이터 (클래스 이름, 부모 클래스, 인터페이스)
- 메서드 코드 (바이트코드)
- static 변수
- Runtime Constant Pool (상수 풀)

\`\`\`java
public class Person {
    // static 변수 → Method Area
    private static int population = 0;
    
    // 인스턴스 변수 → Heap
    private String name;
    
    // 메서드 바이트코드 → Method Area
    public void sayHello() {
        System.out.println("Hello, " + name);
    }
}
\`\`\`

> **Java 8 변화**: PermGen → Metaspace로 변경
> - PermGen: 고정 크기, OutOfMemoryError 발생 가능
> - Metaspace: Native Memory 사용, 동적 확장

### 3.2 Heap (힙)

**모든 스레드가 공유**하며, **객체와 배열**이 저장되는 곳입니다.
Garbage Collector가 관리합니다.

\`\`\`mermaid
graph TD
    subgraph "Heap Memory"
        subgraph "Young Generation"
            Eden[Eden Space<br/>New Objects]
            S0[Survivor 0]
            S1[Survivor 1]
        end
        
        subgraph "Old Generation"
            Old[Tenured Space<br/>Long-lived Objects]
        end
        
        Eden -->|Minor GC| S0
        S0 <-->|Swap| S1
        S0 -->|Promotion| Old
        S1 -->|Promotion| Old
    end
\`\`\`

**객체의 생명주기:**
1. 새 객체 → **Eden** 영역에 할당
2. Eden이 가득 차면 → **Minor GC** 발생
3. 살아남은 객체 → **Survivor** 영역으로 이동 (S0 ↔ S1)
4. 여러 번 GC 생존 → **Old Generation**으로 승격 (Promotion)
5. Old가 가득 차면 → **Major GC (Full GC)** 발생

### 3.3 Stack (스택)

**스레드마다 별도로** 생성됩니다. 메서드 호출 시 **Stack Frame**이 push됩니다.

\`\`\`mermaid
block-beta
    columns 1
    block:Stack
        methodC["Top: methodC()"]
        methodB["methodB()"]
        methodA["Bottom: methodA()"]
    end
\`\`\`

**Stack Frame의 구성:**
- **Local Variables**: 지역 변수, 메서드 파라미터
- **Operand Stack**: 연산을 위한 임시 저장소
- **Frame Data**: 메서드 반환 주소, Exception 정보

\`\`\`java
public int calculate(int a, int b) {
    int sum = a + b;      // a, b, sum → Local Variables
    int result = sum * 2;  // 연산 중간 값 → Operand Stack
    return result;
}
\`\`\`

### 3.4 PC Register

**스레드마다 별도**로 존재하며, 현재 실행 중인 JVM 명령어 주소를 저장합니다.

### 3.5 Native Method Stack

**스레드마다 별도**로 존재하며, Native 메서드(C/C++) 실행 시 사용됩니다.

---

## 4. TLAB (Thread Local Allocation Buffer)

### 4.1 왜 TLAB이 필요한가?

Heap은 모든 스레드가 공유합니다. 객체를 할당할 때마다 동기화하면 성능이 떨어집니다.

**해결책**: 각 스레드에게 Eden의 일부를 **전용 버퍼**로 할당!

\`\`\`mermaid
graph LR
    subgraph "Eden Space"
        T1[Thread 1 TLAB]
        T2[Thread 2 TLAB]
        Shared[Shared Space]
    end
    
    T1 -->|No Sync| Allocation1[Object A]
    T2 -->|No Sync| Allocation2[Object B]
    Shared -->|Sync Required| Allocation3[Large Object]
\`\`\`

### 4.2 TLAB 동작 원리

1. 각 스레드는 Eden 내에 자신만의 TLAB을 받음
2. 객체 할당 시 **자신의 TLAB 내에서 포인터만 이동** (Bump Pointer)
3. TLAB이 가득 차면 새 TLAB 요청 (이때만 동기화)
4. 큰 객체는 TLAB을 우회하여 직접 Heap에 할당

\`\`\`java
// TLAB 관련 JVM 옵션
-XX:+UseTLAB              // TLAB 활성화 (기본값: true)
-XX:TLABSize=512k         // TLAB 크기 지정
-XX:+PrintTLAB            // TLAB 정보 출력 (디버깅용)
\`\`\`

---

## 5. JIT Compiler (Just-In-Time Compiler)

### 5.1 인터프리터 vs JIT 컴파일러

| 방식 | 장점 | 단점 |
|------|------|------|
| **인터프리터** | 빠른 시작, 적은 메모리 | 반복 실행 시 느림 |
| **JIT 컴파일러** | 반복 실행 시 빠름 | 컴파일 오버헤드, 메모리 사용 |

### 5.2 HotSpot JVM의 전략

**핫스팟(HotSpot)**: 자주 실행되는 코드를 감지하여 네이티브 코드로 컴파일

\`\`\`mermaid
graph TD
    Bytecode[Bytecode Execution] --> Interpreter
    Interpreter -->|Counter Checking| HotSpot{HotSpot Detected?}
    HotSpot -->|No| Interpreter
    HotSpot -->|Yes| C1[C1 Compiler<br/>Client: Fast Compile]
    C1 -->|More Hot| C2[C2 Compiler<br/>Server: Aggressive Optimization]
\`\`\`

### 5.3 JIT 최적화 기법들

#### 1) Method Inlining (메서드 인라이닝)
\`\`\`java
// 원본 코드
public int calculate(int x) {
    return square(x) + 1;
}
private int square(int n) {
    return n * n;
}

// JIT 최적화 후 (개념적)
public int calculate(int x) {
    return x * x + 1;  // 메서드 호출 오버헤드 제거
}
\`\`\`

#### 2) Loop Unrolling (루프 풀기)
\`\`\`java
// 원본
for (int i = 0; i < 4; i++) {
    sum += arr[i];
}

// 최적화 후 (개념적)
sum += arr[0];
sum += arr[1];
sum += arr[2];
sum += arr[3];
\`\`\`

#### 3) Escape Analysis (탈출 분석)
객체가 메서드 외부로 탈출하지 않으면 스택에 할당하거나 아예 제거

\`\`\`java
public int sum(int a, int b) {
    Point p = new Point(a, b);  // 이 객체는 메서드 밖으로 안 나감
    return p.x + p.y;
}

// 최적화 후: Point 객체 생성 자체를 제거
public int sum(int a, int b) {
    return a + b;
}
\`\`\`
`,
      codeExamples: [
        {
          title: "클래스 로딩 순서 확인",
          language: "java",
          code: `public class ClassLoadingDemo {
    public static void main(String[] args) {
        // 클래스 로더 계층 확인
        ClassLoader appLoader = ClassLoadingDemo.class.getClassLoader();
        System.out.println("Application ClassLoader: " + appLoader);
        
        ClassLoader platformLoader = appLoader.getParent();
        System.out.println("Platform ClassLoader: " + platformLoader);
        
        ClassLoader bootstrapLoader = platformLoader.getParent();
        System.out.println("Bootstrap ClassLoader: " + bootstrapLoader);  // null
        
        // 핵심 클래스의 로더 확인
        System.out.println("\\nString의 ClassLoader: " + String.class.getClassLoader());  // null (Bootstrap)
        System.out.println("ArrayList의 ClassLoader: " + java.util.ArrayList.class.getClassLoader());  // null
    }
}

/* 출력 예시:
Application ClassLoader: jdk.internal.loader.ClassLoaders$AppClassLoader@...
Platform ClassLoader: jdk.internal.loader.ClassLoaders$PlatformClassLoader@...
Bootstrap ClassLoader: null

String의 ClassLoader: null
ArrayList의 ClassLoader: null
*/`
        },
        {
          title: "클래스 초기화 시점 확인",
          language: "java",
          code: `class Parent {
    static {
        System.out.println("Parent static block");
    }
}

class Child extends Parent {
    static int value = initValue();
    
    static int initValue() {
        System.out.println("Child static field initialization");
        return 100;
    }
    
    static {
        System.out.println("Child static block");
    }
}

public class InitializationDemo {
    public static void main(String[] args) {
        System.out.println("=== 클래스 참조만 ===");
        Class<?> clazz = Child.class;  // 클래스 로딩만, 초기화 X
        
        System.out.println("\\n=== 실제 사용 ===");
        int v = Child.value;  // 이때 초기화 발생
        
        System.out.println("\\n=== 상수 접근 ===");
        // final static 상수는 컴파일 타임에 인라인되어 클래스 초기화 불필요
    }
}

/* 출력:
=== 클래스 참조만 ===

=== 실제 사용 ===
Parent static block
Child static field initialization
Child static block
*/`
        },
        {
          title: "메모리 영역 확인 (VisualVM 또는 JConsole)",
          language: "java",
          code: `public class MemoryAreasDemo {
    // Method Area: static 변수
    private static int staticCounter = 0;
    private static final String CONSTANT = "Hello";
    
    // Heap: 인스턴스 변수 (객체 내부)
    private String instanceName;
    private int[] data;
    
    public MemoryAreasDemo(String name) {
        this.instanceName = name;
        this.data = new int[1000];  // Heap에 배열 할당
    }
    
    public void process() {
        // Stack: 지역 변수
        int localVar = 10;
        String localStr = "Local";
        
        // Heap: 새 객체 생성
        StringBuilder sb = new StringBuilder();
        
        for (int i = 0; i < 100; i++) {  // i는 Stack
            sb.append(i);
        }
    }
    
    public static void main(String[] args) throws InterruptedException {
        // JVM 메모리 정보 출력
        Runtime runtime = Runtime.getRuntime();
        
        System.out.println("=== Before creating objects ===");
        printMemory(runtime);
        
        // Heap에 객체들 생성
        MemoryAreasDemo[] objects = new MemoryAreasDemo[10000];
        for (int i = 0; i < objects.length; i++) {
            objects[i] = new MemoryAreasDemo("Object-" + i);
        }
        
        System.out.println("\\n=== After creating 10000 objects ===");
        printMemory(runtime);
        
        // GC 힌트 (실제 실행은 JVM이 결정)
        objects = null;
        System.gc();
        Thread.sleep(100);
        
        System.out.println("\\n=== After GC ===");
        printMemory(runtime);
    }
    
    private static void printMemory(Runtime runtime) {
        long total = runtime.totalMemory() / 1024 / 1024;
        long free = runtime.freeMemory() / 1024 / 1024;
        long used = total - free;
        long max = runtime.maxMemory() / 1024 / 1024;
        
        System.out.println("Heap Used: " + used + " MB");
        System.out.println("Heap Free: " + free + " MB");
        System.out.println("Heap Total: " + total + " MB");
        System.out.println("Heap Max: " + max + " MB");
    }
}`
        },
        {
          title: "JIT 컴파일 확인",
          language: "java",
          code: `// 실행 옵션: java -XX:+PrintCompilation JITDemo
public class JITDemo {
    
    public static void main(String[] args) {
        long start = System.nanoTime();
        
        long sum = 0;
        for (int i = 0; i < 100_000_000; i++) {
            sum += calculate(i);  // 수백만 번 호출 → JIT 컴파일 대상
        }
        
        long end = System.nanoTime();
        System.out.println("Sum: " + sum);
        System.out.println("Time: " + (end - start) / 1_000_000 + " ms");
    }
    
    // 이 메서드는 핫스팟으로 감지되어 네이티브 코드로 컴파일됨
    private static int calculate(int x) {
        return x * 2 + 1;
    }
}

/* -XX:+PrintCompilation 출력 예시:
    76    1       3       java.lang.String::hashCode (55 bytes)
   142   17       3       JITDemo::calculate (6 bytes)  ← 컴파일됨!
   145   18       4       JITDemo::calculate (6 bytes)  ← C2로 재컴파일
*/

// JIT 관련 유용한 옵션들
// -XX:+PrintCompilation       컴파일 로그 출력
// -XX:CompileThreshold=10000  컴파일 임계값 (기본: 1만회)
// -XX:+UnlockDiagnosticVMOptions -XX:+PrintInlining  인라이닝 로그`
        }
      ],
      keyPoints: [
        "클래스 로딩은 Loading → Linking(Verify, Prepare, Resolve) → Initialization 순서로 진행됩니다.",
        "클래스 로더는 Parent Delegation Model을 사용하여 보안과 중복 로딩 방지를 달성합니다.",
        "JVM 메모리는 Method Area(공유), Heap(공유), Stack(스레드별), PC Register(스레드별), Native Method Stack(스레드별)으로 구성됩니다.",
        "Heap은 Young Generation(Eden + Survivor)과 Old Generation으로 나뉘며, GC는 이를 기반으로 동작합니다.",
        "TLAB은 멀티스레드 환경에서 객체 할당 성능을 최적화하기 위해 각 스레드에게 전용 버퍼를 제공합니다.",
        "JIT 컴파일러는 핫스팟 코드를 감지하여 네이티브 코드로 컴파일하고, 인라이닝/루프 풀기/탈출 분석 등의 최적화를 수행합니다."
      ]
    },
    {
      id: "p1-m2",
      title: "Chapter 2: Concurrency Deep Dive",
      topic: "Java Monitor Internals, Lock Escalation, AQS, CAS & Atomic, False Sharing",
      content: `
## 1. Java 동시성의 기초

### 1.1 왜 동시성이 어려운가?

멀티스레드 환경에서는 다음 문제들이 발생할 수 있습니다:

- **Race Condition**: 두 스레드가 동시에 같은 데이터 수정
- **Visibility 문제**: 한 스레드의 변경을 다른 스레드가 못 봄
- **Reordering**: 컴파일러/CPU가 명령어 순서를 바꿈

\`\`\`java
// Race Condition 예시
public class Counter {
    private int count = 0;
    
    public void increment() {
        count++;  // 이 연산은 원자적이지 않음!
        // 실제로는: 1) 읽기 2) 증가 3) 쓰기 (3단계)
    }
}

// 두 스레드가 동시에 increment() 호출하면?
// 기대 결과: 2, 실제 결과: 1 (가능)
\`\`\`

---

## 2. synchronized와 Java Monitor

### 2.1 synchronized 키워드

\`\`\`java
public class SynchronizedDemo {
    private int count = 0;
    private final Object lock = new Object();
    
    // 방법 1: 인스턴스 메서드 동기화 (this를 락으로 사용)
    public synchronized void increment() {
        count++;
    }
    
    // 방법 2: 블록 동기화 (특정 객체를 락으로 사용)
    public void incrementWithBlock() {
        synchronized (lock) {
            count++;
        }
    }
    
    // 방법 3: static 메서드 동기화 (Class 객체를 락으로 사용)
    public static synchronized void staticMethod() {
        // SynchronizedDemo.class를 락으로 사용
    }
}
\`\`\`

### 2.2 Java Monitor의 내부 구조

모든 Java 객체는 **모니터(Monitor)**를 가집니다.

\`\`\`mermaid
classDiagram
    class Object {
        +Header (Mark Word, Klass Pointer)
        +Instance Fields
        +Monitor
    }
    class Monitor {
        +Owner (Thread)
        +Entry Set (Waiting for Lock)
        +Wait Set (Waiting for notify)
    }
    Object *-- Monitor
\`\`\`

**Monitor 동작:**
1. 스레드가 synchronized 진입 시도
2. Monitor의 Owner가 없으면 → 락 획득, Owner가 됨
3. Owner가 있으면 → Entry Set에서 대기
4. Owner가 synchronized 빠져나가면 → Entry Set의 스레드 중 하나가 Owner가 됨

### 2.3 wait(), notify(), notifyAll()

\`\`\`java
public class ProducerConsumer {
    private final Queue<Integer> queue = new LinkedList<>();
    private final int MAX_SIZE = 10;
    
    public synchronized void produce(int item) throws InterruptedException {
        while (queue.size() == MAX_SIZE) {
            wait();  // Wait Set으로 이동, 락 해제
        }
        queue.add(item);
        notifyAll();  // Wait Set의 모든 스레드를 Entry Set으로
    }
    
    public synchronized int consume() throws InterruptedException {
        while (queue.isEmpty()) {
            wait();
        }
        int item = queue.poll();
        notifyAll();
        return item;
    }
}
\`\`\`

---

## 3. Lock Escalation (락 승격)

### 3.1 왜 Lock Escalation이 필요한가?

synchronized는 편리하지만 무겁습니다. HotSpot JVM은 상황에 따라 **가벼운 락**을 사용합니다.

\`\`\`mermaid
stateDiagram-v2
    [*] --> Unlocked
    Unlocked --> BiasedLock : First Access
    BiasedLock --> LightweightLock : Competition (No Collision)
    LightweightLock --> HeavyweightLock : Collision Detected
\`\`\`

### 3.2 각 락 단계 설명

#### 1) Biased Lock (편향 락)
- **상황**: 한 스레드만 반복적으로 락 사용
- **동작**: 첫 스레드의 ID를 Mark Word에 기록, 이후 CAS 없이 바로 진입
- **비용**: 거의 없음

\`\`\`java
// 편향 락이 유리한 상황
public class SingleThreadedAccess {
    private synchronized void process() {
        // 항상 같은 스레드만 호출
    }
}
\`\`\`

#### 2) Lightweight Lock (경량 락)
- **상황**: 복수 스레드가 락을 사용하지만, **동시 경쟁은 없음**
- **동작**: CAS로 락 획득 시도

\`\`\`java
// 경량 락 상황
// Thread A: lock → work → unlock
// Thread B:                        lock → work → unlock
// (겹치지 않음)
\`\`\`

#### 3) Heavyweight Lock (중량 락)
- **상황**: 실제 경쟁 발생
- **동작**: OS의 Mutex 사용, 스레드는 블로킹됨
- **비용**: 컨텍스트 스위칭 발생, 가장 비쌈

\`\`\`java
// -XX:+PrintSynchronizationStatistics 로 확인 가능 (디버그 빌드)
// -XX:+UseBiasedLocking (Java 15+에서 deprecated)
\`\`\`

---

## 4. CAS와 Atomic 클래스

### 4.1 CAS (Compare-And-Swap)

락 없이 원자적 연산을 수행하는 하드웨어 명령어입니다.

\`\`\`
CAS(메모리 주소, 기대값, 새 값):
    if (메모리[주소] == 기대값) {
        메모리[주소] = 새 값
        return true  // 성공
    } else {
        return false  // 실패. 다시 시도 필요
    }
\`\`\`

### 4.2 AtomicInteger 내부 구조

\`\`\`java
public class AtomicInteger {
    private volatile int value;
    
    public int incrementAndGet() {
        // 의사 코드
        while (true) {
            int current = value;
            int next = current + 1;
            if (CAS(value, current, next)) {
                return next;
            }
            // 실패하면 재시도 (spin)
        }
    }
}
\`\`\`

### 4.3 Atomic 클래스들

| 클래스 | 설명 |
|--------|------|
| \`AtomicInteger\`, \`AtomicLong\` | 원자적 정수 연산 |
| \`AtomicBoolean\` | 원자적 불리언 |
| \`AtomicReference\` | 원자적 참조 |
| \`AtomicIntegerArray\` | 원자적 정수 배열 |
| \`LongAdder\`, \`DoubleAdder\` | 고성능 합계 (Java 8+) |

\`\`\`java
// LongAdder: 경쟁이 심한 경우 AtomicLong보다 훨씬 빠름
LongAdder adder = new LongAdder();
adder.increment();  // 내부적으로 여러 셀에 분산
long sum = adder.sum();  // 모든 셀 합산
\`\`\`

---

## 5. AQS (AbstractQueuedSynchronizer)

### 5.1 AQS란?

**AQS**는 \`java.util.concurrent\` 패키지의 동기화 도구들의 **기반 프레임워크**입니다.

\`\`\`
AQS 기반 클래스들:
├── ReentrantLock
├── ReentrantReadWriteLock  
├── Semaphore
├── CountDownLatch
└── FutureTask
\`\`\`

### 5.2 AQS 내부 구조

\`\`\`mermaid
graph LR
    subgraph AQS
        State[State (volatile int)]
        
        subgraph "CLH Queue"
            Head --> Node1[Thread 1]
            Node1 --> Node2[Thread 2]
            Node2 --> End[null]
        end
    end
\`\`\`

### 5.3 ReentrantLock vs synchronized

| 특성 | synchronized | ReentrantLock |
|------|-------------|---------------|
| 문법 | 키워드 | 명시적 lock()/unlock() |
| 공정성 | 비공정 | 공정/비공정 선택 가능 |
| 인터럽트 | 불가 | lockInterruptibly() 가능 |
| 타임아웃 | 불가 | tryLock(timeout) 가능 |
| 조건 변수 | 1개 (wait) | 여러 개 (newCondition) |

\`\`\`java
ReentrantLock lock = new ReentrantLock(true);  // 공정 락

lock.lock();
try {
    // 임계 영역
} finally {
    lock.unlock();  // 반드시 finally에서!
}

// 고급 기능
if (lock.tryLock(1, TimeUnit.SECONDS)) {
    try {
        // 1초 안에 락 획득 성공
    } finally {
        lock.unlock();
    }
} else {
    // 타임아웃
}
\`\`\`

---

## 6. False Sharing

### 6.1 False Sharing이란?

CPU 캐시는 **캐시 라인(Cache Line)** 단위로 데이터를 관리합니다 (보통 64 bytes).
서로 다른 변수가 같은 캐시 라인에 있으면, 한 스레드의 쓰기가 다른 스레드의 캐시를 무효화합니다.

\`\`\`mermaid
graph TD
    subgraph "Cache Line (64 bytes)"
        Var1[Variable 1]
        Var2[Variable 2]
    end
    
    Core1 -->|Write| Var1
    Core2 -->|Read| Var2
    
    Core1 -.->|Invalidates| Core2
\`\`\`

### 6.2 성능 영향

\`\`\`java
// False Sharing 발생 케이스
public class FalseSharingDemo {
    public volatile long value1;  // 8 bytes
    public volatile long value2;  // 8 bytes  (같은 캐시 라인!)
}

// Thread1: value1++ 반복
// Thread2: value2++ 반복
// → 서로 독립적인데 성능이 떨어짐!
\`\`\`

### 6.3 해결 방법: @Contended

\`\`\`java
// JVM 옵션 필요: -XX:-RestrictContended
import sun.misc.Contended;

public class NoPadding {
    public volatile long value1;
    public volatile long value2;
}

public class WithPadding {
    @Contended
    public volatile long value1;  // 독립적인 캐시 라인
    
    @Contended  
    public volatile long value2;  // 독립적인 캐시 라인
}

// 수동 패딩
public class ManualPadding {
    public volatile long value1;
    public long p1, p2, p3, p4, p5, p6, p7;  // 56 bytes 패딩
    public volatile long value2;
}
\`\`\`

### 6.4 LongAdder와 False Sharing

\`LongAdder\`가 빠른 이유 중 하나가 **@Contended**를 사용한 Cell 분산입니다:

\`\`\`java
// 간략화된 LongAdder 내부
@Contended
static final class Cell {
    volatile long value;
}

Cell[] cells;  // 각 Cell이 독립적인 캐시 라인
\`\`\`
`,
      codeExamples: [
        {
          title: "Race Condition과 synchronized",
          language: "java",
          code: `import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;

public class RaceConditionDemo {
    
    static class UnsafeCounter {
        private int count = 0;
        public void increment() { count++; }
        public int getCount() { return count; }
    }
    
    static class SafeCounter {
        private int count = 0;
        public synchronized void increment() { count++; }
        public synchronized int getCount() { return count; }
    }
    
    public static void main(String[] args) throws InterruptedException {
        testCounter(new UnsafeCounter(), "Unsafe");
        testCounter(new SafeCounter(), "Safe");
    }
    
    static void testCounter(Object counter, String name) throws InterruptedException {
        ExecutorService executor = Executors.newFixedThreadPool(10);
        
        Runnable task = () -> {
            for (int i = 0; i < 10000; i++) {
                if (counter instanceof UnsafeCounter) {
                    ((UnsafeCounter) counter).increment();
                } else {
                    ((SafeCounter) counter).increment();
                }
            }
        };
        
        // 10개 스레드가 각각 10000번 증가 → 기대 결과: 100000
        for (int i = 0; i < 10; i++) {
            executor.submit(task);
        }
        
        executor.shutdown();
        executor.awaitTermination(5, TimeUnit.SECONDS);
        
        int result = counter instanceof UnsafeCounter 
            ? ((UnsafeCounter) counter).getCount()
            : ((SafeCounter) counter).getCount();
            
        System.out.println(name + " Counter: " + result + 
            (result == 100000 ? " ✓" : " ✗ (expected 100000)"));
    }
}

/* 출력 예시:
Unsafe Counter: 87342 ✗ (expected 100000)
Safe Counter: 100000 ✓
*/`
        },
        {
          title: "CAS와 Atomic 클래스",
          language: "java",
          code: `import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.atomic.AtomicReference;
import java.util.concurrent.atomic.LongAdder;

public class AtomicDemo {
    
    public static void main(String[] args) {
        // 1. AtomicInteger 기본 사용
        AtomicInteger atomicInt = new AtomicInteger(0);
        
        System.out.println("Initial: " + atomicInt.get());
        System.out.println("incrementAndGet: " + atomicInt.incrementAndGet());  // 1
        System.out.println("getAndAdd(5): " + atomicInt.getAndAdd(5));  // 1 (반환 후 +5)
        System.out.println("Current: " + atomicInt.get());  // 6
        
        // 2. CAS 직접 사용
        boolean success = atomicInt.compareAndSet(6, 10);  // 6이면 10으로 변경
        System.out.println("CAS success: " + success + ", value: " + atomicInt.get());
        
        success = atomicInt.compareAndSet(6, 20);  // 이미 10이므로 실패
        System.out.println("CAS success: " + success + ", value: " + atomicInt.get());
        
        // 3. AtomicReference
        AtomicReference<String> atomicRef = new AtomicReference<>("Hello");
        atomicRef.compareAndSet("Hello", "World");
        System.out.println("AtomicReference: " + atomicRef.get());
        
        // 4. LongAdder (고성능 카운터)
        LongAdder adder = new LongAdder();
        // 여러 스레드에서 호출해도 효율적
        adder.increment();
        adder.increment();
        adder.add(10);
        System.out.println("LongAdder sum: " + adder.sum());
    }
}

/* 출력:
Initial: 0
incrementAndGet: 1
getAndAdd(5): 1
Current: 6
CAS success: true, value: 10
CAS success: false, value: 10
AtomicReference: World
LongAdder sum: 12
*/`
        },
        {
          title: "ReentrantLock 고급 기능",
          language: "java",
          code: `import java.util.concurrent.locks.ReentrantLock;
import java.util.concurrent.locks.Condition;
import java.util.concurrent.TimeUnit;

public class ReentrantLockDemo {
    private final ReentrantLock lock = new ReentrantLock(true);  // 공정 락
    private final Condition notEmpty = lock.newCondition();
    private final Condition notFull = lock.newCondition();
    
    private final Object[] items = new Object[10];
    private int count, putIndex, takeIndex;
    
    // 생산자
    public void put(Object item) throws InterruptedException {
        lock.lock();
        try {
            while (count == items.length) {
                notFull.await();  // 가득 차면 대기
            }
            items[putIndex] = item;
            if (++putIndex == items.length) putIndex = 0;
            count++;
            notEmpty.signal();  // 소비자 깨우기
        } finally {
            lock.unlock();
        }
    }
    
    // 소비자
    public Object take() throws InterruptedException {
        lock.lock();
        try {
            while (count == 0) {
                notEmpty.await();  // 비어있으면 대기
            }
            Object item = items[takeIndex];
            items[takeIndex] = null;
            if (++takeIndex == items.length) takeIndex = 0;
            count--;
            notFull.signal();  // 생산자 깨우기
            return item;
        } finally {
            lock.unlock();
        }
    }
    
    // tryLock 예시
    public boolean tryProcess(long timeout) throws InterruptedException {
        if (lock.tryLock(timeout, TimeUnit.MILLISECONDS)) {
            try {
                System.out.println("락 획득 성공!");
                return true;
            } finally {
                lock.unlock();
            }
        } else {
            System.out.println("락 획득 실패 (타임아웃)");
            return false;
        }
    }
    
    public static void main(String[] args) throws InterruptedException {
        ReentrantLockDemo demo = new ReentrantLockDemo();
        
        // 생산자 스레드
        new Thread(() -> {
            try {
                for (int i = 0; i < 5; i++) {
                    demo.put("Item-" + i);
                    System.out.println("Produced: Item-" + i);
                }
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        }).start();
        
        // 소비자 스레드
        new Thread(() -> {
            try {
                for (int i = 0; i < 5; i++) {
                    Object item = demo.take();
                    System.out.println("Consumed: " + item);
                }
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        }).start();
    }
}`
        },
        {
          title: "False Sharing 성능 테스트",
          language: "java",
          code: `// 실행: java -XX:-RestrictContended FalseSharingTest
// @Contended 사용 시 위 옵션 필요

import sun.misc.Contended;

public class FalseSharingTest {
    
    // False Sharing 발생
    static class SharedData {
        volatile long value1;
        volatile long value2;
    }
    
    // 수동 패딩으로 해결
    static class PaddedData {
        volatile long value1;
        long p1, p2, p3, p4, p5, p6, p7;  // 56 bytes padding
        volatile long value2;
    }
    
    // @Contended로 해결 (권장)
    static class ContendedData {
        @Contended
        volatile long value1;
        @Contended
        volatile long value2;
    }
    
    static final long ITERATIONS = 500_000_000L;
    
    public static void main(String[] args) throws Exception {
        System.out.println("=== False Sharing Performance Test ===\\n");
        
        // 1. False Sharing 발생 케이스
        SharedData shared = new SharedData();
        test("With False Sharing", 
            () -> incValue1(shared), 
            () -> incValue2(shared));
        
        // 2. 수동 패딩
        PaddedData padded = new PaddedData();
        test("With Manual Padding",
            () -> incValue1Padded(padded),
            () -> incValue2Padded(padded));
        
        // 3. 단일 스레드 비교
        singleThreadTest();
    }
    
    static void incValue1(SharedData d) {
        for (long i = 0; i < ITERATIONS; i++) d.value1++;
    }
    static void incValue2(SharedData d) {
        for (long i = 0; i < ITERATIONS; i++) d.value2++;
    }
    static void incValue1Padded(PaddedData d) {
        for (long i = 0; i < ITERATIONS; i++) d.value1++;
    }
    static void incValue2Padded(PaddedData d) {
        for (long i = 0; i < ITERATIONS; i++) d.value2++;
    }
    
    static void test(String name, Runnable r1, Runnable r2) throws Exception {
        Thread t1 = new Thread(r1);
        Thread t2 = new Thread(r2);
        
        long start = System.currentTimeMillis();
        t1.start();
        t2.start();
        t1.join();
        t2.join();
        long end = System.currentTimeMillis();
        
        System.out.println(name + ": " + (end - start) + " ms");
    }
    
    static void singleThreadTest() {
        SharedData d = new SharedData();
        long start = System.currentTimeMillis();
        for (long i = 0; i < ITERATIONS; i++) d.value1++;
        for (long i = 0; i < ITERATIONS; i++) d.value2++;
        long end = System.currentTimeMillis();
        System.out.println("Single Thread (baseline): " + (end - start) + " ms");
    }
}

/* 예상 출력 (시스템에 따라 다름):
=== False Sharing Performance Test ===

With False Sharing: 4500 ms
With Manual Padding: 1200 ms
Single Thread (baseline): 2000 ms

False Sharing이 있으면 2 스레드가 1 스레드보다 느릴 수 있음!
*/`
        }
      ],
      keyPoints: [
        "synchronized는 Java Monitor를 사용하며, 모든 객체는 암묵적으로 Monitor를 가집니다.",
        "Lock Escalation: Biased Lock → Lightweight Lock → Heavyweight Lock 순으로 락이 무거워집니다.",
        "CAS(Compare-And-Swap)는 락 없이 원자적 연산을 수행하는 하드웨어 명령어입니다.",
        "Atomic 클래스들은 내부적으로 CAS를 사용하여 스레드 안전한 연산을 제공합니다.",
        "AQS는 ReentrantLock, Semaphore 등의 기반이 되는 동기화 프레임워크이며 CLH Queue를 사용합니다.",
        "False Sharing은 서로 다른 변수가 같은 캐시 라인을 공유할 때 발생하며, @Contended나 패딩으로 해결합니다.",
        "경쟁이 심한 카운터 상황에서는 AtomicLong보다 LongAdder가 훨씬 효율적입니다."
      ]
    }
  ]
};
