import type { Phase } from '../curriculumData';

export const kotlinAdvancedPhase: Phase = {
  id: "kotlin-phase2",
  title: "Phase 2: Kotlin 심화 & 코루틴",
  goal: "코틀린의 '마법'을 바이트코드 레벨에서 해부하고, 코루틴의 내부 상태 머신을 이해하며, 실전 패턴을 익힙니다.",
  modules: [
    {
      id: "kotlin-bytecode-internals",
      title: "Chapter 1: Kotlin Bytecode Magic",
      topic: "Inline Functions, Reified, Value Class, Null Safety Internals",
      content: `
## 1. Kotlin의 "마법"을 해부하다

Kotlin은 개발자 친화적인 문법을 제공하지만, 결국 JVM 바이트코드로 컴파일됩니다.
이 챕터에서는 Kotlin의 주요 기능들이 **어떤 바이트코드로 변환**되는지 분석하여 성능 최적화 포인트를 찾습니다.

---

## 2. Inline Functions (인라인 함수)

### 2.1 고차함수의 오버헤드
Kotlin의 람다(Lambda)는 컴파일 시 **익명 클래스(Anonymous Class)** 로 변환되어 객체가 생성됩니다. 이는 메모리 할당과 GC 부담을 줍니다.

### 2.2 inline 키워드 적용
\`inline\` 키워드를 붙이면, 컴파일러가 **함수 본문과 람다 코드를 호출 지점에 직접 붙여넣습니다 (Inlining)**.

\`\`\`kotlin
inline fun perform(action: () -> Unit) {
    println("Start")
    action()
}
\`\`\`

**컴파일 결과 (개념적):**
\`\`\`java
// perform { println("Hello") } 호출 시:
System.out.println("Start");
System.out.println("Hello"); // 객체 생성 없이 코드 자체가 삽입됨
\`\`\`

### 2.3 noinline & crossinline
- **noinline**: 특정 람다 파라미터를 인라인하지 않고 객체로 전달하고 싶을 때 사용.
- **crossinline**: 람다가 다른 스레드나 컨텍스트에서 실행되어 **비지역 반환(Non-local return)** 을 막아야 할 때 사용.

---

## 3. Reified Type Parameters

### 3.1 Type Erasure (타입 소거)
JVM 제네릭은 런타임에 타입 정보가 지워집니다 (\`List<String>\` -> \`List\`). 그래서 \`T::class\` 같은 코드는 불가능했습니다.

### 3.2 reified의 원리
\`inline\` 함수는 코드가 호출 지점에 복사된다는 점을 이용합니다. 호출 시점에는 구체적인 타입을 알 수 있으므로, 바이트코드 레벨에서 **실제 타입으로 대체**해버립니다.

\`\`\`kotlin
inline fun <reified T> isType(value: Any): Boolean {
    return value is T // T가 실제 클래스로 대체됨 (예: value instanceof String)
}
\`\`\`

---

## 4. Value Class (Inline Class)

### 4.1 래퍼 클래스의 비용
ID나 패스워드 등을 \`String\` 대신 \`UserId(val id: String)\` 처럼 래핑하면 타입 안전성은 높아지지만, 객체 생성 비용이 발생합니다.

### 4.2 value class 키워드
\`value class\`는 런타임에 래퍼 객체를 생성하지 않고, **내부 프로퍼티 타입으로 최적화**됩니다.

\`\`\`kotlin
@JvmInline
value class UserId(val id: String)

fun login(uid: UserId) { ... }
\`\`\`

**컴파일 결과:**
\`\`\`java
// UserId 객체는 사라지고 String으로 대체됨
public static void login(String uid) { ... }
\`\`\`

---

## 5. Null Safety 바이트코드

Kotlin의 \`Non-null\` 타입은 어떻게 보장될까요? 컴파일러가 모든 함수 시작 부분에 검사를 삽입합니다.

\`\`\`java
public static void greet(String name) {
    Intrinsics.checkNotNullParameter(name, "name"); // null이면 예외 발생
    ...
}
\`\`\`

이 체크는 매우 빠르지만, 수백만 번 호출되는 루프에서는 오버헤드가 될 수도 있습니다. (? 타입 사용 시 체크 생략 가능)
`,
      keyPoints: [
        "inline 함수는 람다 생성 오버헤드를 줄이기 위해 코드 자체를 호출부에 복사합니다.",
        "reified는 인라인의 특성을 이용해 런타임에도 제네릭 타입 정보를 유지합니다.",
        "value class는 런타임에 객체 할당 없이 기본 타입으로 동작하여 성능을 최적화합니다."
      ],
      interviewQuestions: [
        {
          difficulty: 'Medium',
          question: "inline 키워드를 사용하면 성능상 어떤 이점이 있나요?",
          answer: "고차 함수 사용 시 람다 객체를 생성하는 오버헤드를 줄이기 위해, 컴파일러가 함수의 본문을 호출 지점에 직접 코드를 붙여넣습니다."
        },
        {
          difficulty: 'Hard',
          question: "reified 키워드는 언제, 왜 사용하나요?",
          answer: "제네릭 타입 소거(Type Erasure)를 우회하여, inline 함수 내에서 런타임에 제네릭 타입 정보(T::class 등)에 접근하기 위해 사용합니다."
        }
      ],
      codeExamples: [
        {
          title: "inline 성능 비교",
          language: "kotlin",
          code: `// 일반 고차함수 vs inline 함수
fun regular(action: () -> Unit) { action() }
inline fun inlined(action: () -> Unit) { action() }

fun main() {
    val start1 = System.nanoTime()
    for(i in 0..1_000_000) regular { }
    println("Regular: \${System.nanoTime() - start1}")

    val start2 = System.nanoTime()
    for(i in 0..1_000_000) inlined { }
    println("Inline:  \${System.nanoTime() - start2}")
    
    // Inline이 보통 3~5배 빠름 (객체 생성 비용 제거 + JIT 최적화)
}`
        }
      ]
    },
    {
      id: "advanced-generics-and-delegation",
      title: "Chapter 2: Advanced Generics & Delegation",
      topic: "Variance (in/out), Star Projection, Delegation Pattern (by)",
      content: `
## 1. 변성 (Variance) 완전 정복

Java의 \`? extends T\`와 \`? super T\`가 Kotlin에서는 \`out\`과 \`in\`으로 더 직관적으로 바뀌었습니다.

### 1.1 불변성 (Invariance)
기본적으로 제네릭은 불변입니다. \`Apple\`이 \`Fruit\`의 자식이어도, \`List<Apple>\`은 \`List<Fruit>\`의 자식이 아닙니다.

### 1.2 공변성 (Covariance) - out
**"생산자(Producer)는 꺼낼(OUT) 수만 있다" (Read-only)**
\`T\`를 반환값 타입으로만 사용하는 경우, 상속 관계가 유지됩니다.

\`\`\`kotlin
// List<String>은 List<Any>의 자식이 됨
interface List<out E> {
    fun get(index: Int): E // 꺼내기만 가능
    // fun add(e: E) // 컴파일 에러! (쓰기 불가능)
}
\`\`\`

### 1.3 반공변성 (Contravariance) - in
**"소비자(Consumer)는 넣을(IN) 수만 있다" (Write-only)**
\`T\`를 매개변수 타입으로만 사용하는 경우, 역방향 상속 관계가 성립합니다.

\`\`\`kotlin
// Comparable<Any>는 Comparable<String>의 부모가 아니라 자식처럼 동작
interface Comparable<in T> {
    fun compareTo(other: T): Int // 입력만 받음
}
\`\`\`

---

## 2. 위임 패턴 (Delegation Pattern)

상속보다는 합성(Composition)이 좋다는 것은 알지만, 코드가 길어지는 문제가 있었습니다. Kotlin은 \`by\` 키워드로 이를 우아하게 해결합니다.

### 2.1 클래스 위임 (Class Delegation)

\`\`\`kotlin
interface Base {
    fun print()
}

class BaseImpl(val x: Int) : Base {
    override fun print() { print(x) }
}

// Derived는 Base 인터페이스의 구현을 b에게 전적으로 위임
class Derived(b: Base) : Base by b

fun main() {
    val b = BaseImpl(10)
    Derived(b).print() // 10 출력
}
\`\`\`

컴파일러가 \`print()\` 메서드를 자동으로 생성하여 \`b.print()\`를 호출하도록 만듭니다.

### 2.2 속성 위임 (Property Delegation)
프로퍼티의 \`get/set\` 동작을 다른 객체에 위임합니다.

- \`lazy\`: 처음 접근할 때 초기화
- \`observable\`: 값이 변경될 때 콜백 호출

\`\`\`kotlin
var observedProp: String by Delegates.observable("<no name>") {
    prop, old, new ->
    println("$old -> $new")
}
\`\`\`

### 2.3 커스텀 Delegate 만들기
\`operator fun getValue\` (및 \`setValue\`)를 구현하면 됩니다.

\`\`\`kotlin
class StringDelegate {
    operator fun getValue(thisRef: Any?, property: KProperty<*>): String {
        return "Delegated Value"
    }
}
\`\`\`
`,
      keyPoints: [
        "out(공변)은 읽기 전용으로, 하위 타입의 컨테이너를 상위 타입 컨테이너로 할당할 수 있게 합니다.",
        "in(반공변)은 쓰기 전용으로, 상위 타입의 컨슈머를 하위 타입 컨슈머로 사용할 수 있게 합니다.",
        "by 키워드를 통해 보일러플레이트 코드 없이 Composition(합성)을 상속처럼 간편하게 구현할 수 있습니다."
      ],
      interviewQuestions: [
        {
          difficulty: 'Hard',
          question: "Kotlin 제네릭에서 in과 out의 차이는? (공변성/반공변성)",
          answer: "out(공변)은 값을 꺼내기만 할 때(Producer) 사용하며 상위 타입으로 대입 가능하고, in(반공변)은 값을 넣기만 할 때(Consumer) 사용하며 하위 타입으로 대입 가능합니다."
        },
        {
          difficulty: 'Medium',
          question: "by lazy { ... } 의 동작 원리는?",
          answer: "위임(Delegation) 패턴을 활용하여 프로퍼티에 처음 접근하는 시점에 람다를 실행하고 그 값을 캐싱하여 반환합니다."
        }
      ],
      codeExamples: [
        {
          title: "커스텀 Lazy Delegate 구현",
          language: "kotlin",
          code: `import kotlin.reflect.KProperty

// 직접 만들어보는 lazy
class MyLazy<T>(val initializer: () -> T) {
    private var cached: T? = null
    
    operator fun getValue(thisRef: Any?, property: KProperty<*>): T {
        if (cached == null) {
            println("Initializing '\${property.name}'")
            cached = initializer()
        }
        return cached!!
    }
}

class User {
    // 사용
    val name: String by MyLazy { 
        println("Computing name...")
        "Kotlin User"
    }
}

fun main() {
    val user = User()
    println("Created user")
    println(user.name) // 초기화 실행
    println(user.name) // 캐시된 값 사용
}

/* 출력:
Created user
Initializing 'name'
Computing name...
Kotlin User
Kotlin User
*/`
        }
      ]
    },
    {
      id: "coroutine-internals",
      title: "Chapter 3: Coroutine Internals",
      topic: "CPS (Continuation-Passing Style), State Machine, Suspend Functions",
      content: `
## 1. Suspend 함수의 비밀

\`suspend\` 키워드가 붙은 함수는 컴파일러에 의해 **CPS (Continuation-Passing Style)** 로 변환됩니다.

### 1.1 함수 시그니처 변환

\`\`\`kotlin
suspend fun getUser(id: Int): User
\`\`\`

▼ **컴파일 후 (예상 파라미터)**

\`\`\`java
Object getUser(int id, Continuation<User> cont)
\`\`\`

마지막 인자로 \`Continuation\` 객체가 추가되며, 반환 타입이 \`Object\`로 바뀝니다 (결과값 또는 중단 표식 \`COROUTINE_SUSPENDED\`).

---

## 2. 상태 머신 (State Machine) 동작 원리

코루틴은 스레드처럼 컨텍스트 스위칭을 하지 않고도 멈췄다 재개할 수 있습니다. 이는 코드가 **Switch-Case 문 기반의 상태 머신**으로 변환되기 때문입니다.

### 2.1 코드 변환 예시

\`\`\`kotlin
suspend fun flow() {
    print("Start")
    delay(1000) // 중단점 1
    print("Mid")
    delay(1000) // 중단점 2
    print("End")
}
\`\`\`

▼ **컴파일된 바이트코드 로직 (개념)**

\`\`\`java
void flow(Continuation cont) {
    switch(cont.label) {
        case 0:
            print("Start");
            cont.label = 1; // 다음 상태 저장
            if (delay(1000, cont) == SUSPENDED) return;
            // fall-through
        case 1:
            print("Mid");
            cont.label = 2; // 다음 상태 저장
            if (delay(1000, cont) == SUSPENDED) return;
            // fall-through
        case 2:
            print("End");
            return;
    }
}
\`\`\`

1. 함수가 호출될 때 \`label\`에 따라 실행 지점으로 점프합니다.
2. \`suspend\` 함수(예: \`delay\`)를 만나면 \`label\`을 업데이트하고 현재 상태를 저장한 뒤 리턴합니다.
3. 작업이 끝나고 \`resume()\`이 호출되면, 다시 이 함수가 호출되면서 다음 \`case\`문으로 이어집니다.

---

## 3. ContinuationInterceptor

코루틴이 어느 스레드에서 실행될지 결정하고(Dispatcher), 스케줄링하는 핵심 컴포넌트입니다. \`resume()\` 될 때 적절한 스레드로 작업을 보내는 역할을 합니다.

\`\`\`mermaid
sequenceDiagram
    participant Coroutine
    participant Dispatcher
    participant Thread
    
    Coroutine->>Dispatcher: suspend (작업 요청)
    Dispatcher->>Thread: 작업 스케줄링
    Thread-->>Dispatcher: 작업 완료
    Dispatcher->>Coroutine: resumeWith(결과)
\`\`\`
`,
      keyPoints: [
        "suspend 함수는 컴파일 시 Continuation 파라미터가 추가되며 상태 머신으로 변환됩니다.",
        "상태 머신은 label 변수를 사용하여 중단된 지점부터 코드를 다시 실행합니다.",
        "스레드는 블로킹되지 않고, 함수가 단순히 리턴되었다가 나중에 다시 호출되는 방식입니다."
      ],
      interviewQuestions: [
        {
          difficulty: 'Hard',
          question: "suspend 함수는 내부적으로 어떻게 동작하나요? (CPS)",
          answer: "컴파일러에 의해 Continuation 파라미터가 추가된 메서드로 변환되며, 상태 머신(State Machine)을 통해 중단 지점과 재개 지점을 관리합니다."
        },
        {
          difficulty: 'Medium',
          question: "코루틴(Coroutine)과 스레드(Thread)의 결정적 차이는?",
          answer: "스레드는 OS가 관리하는 무거운 자원이며 문맥 교환 비용이 크지만, 코루틴은 사용자 수준에서 관리되는 경량 스레드로 하나의 스레드 위에서 여러 코루틴이 중단/재개를 반복할 수 있습니다."
        }
      ]
    },
    {
      id: "structured-concurrency",
      title: "Chapter 4: Structured Concurrency & Patterns",
      topic: "Job Hierarchy, Cancellation Propagation, Exception Handling, SupervisorJob",
      content: `
## 1. 구조화된 동시성 (Structured Concurrency)

코루틴은 부모-자식 관계를 형성하여 생명주기를 관리합니다.
**"부모는 자식이 끝날 때까지 기다리며, 부모가 취소되면 자식도 취소된다."** 이 원칙이 핵심입니다.

### 1.1 Job 계층 구조 트리

\`\`\`mermaid
graph TD
    Scope[CoroutineScope] --> ParentJob
    ParentJob --> Child1[Job 1]
    ParentJob --> Child2[Job 2]
    Child1 --> GrandChild[Job 1-1]
\`\`\`

---

## 2. 취소 전파 (Cancellation)

- **Default**: 부모 취소 -> 자식 취소. 자식 에러 발생 -> 부모 취소 (그리고 다른 형제들도 취소).
- **SupervisorJob**: 자식의 에러가 부모나 다른 형제에게 전파되지 않게 막는 방화벽 역할을 합니다.

### 2.1 coroutineScope vs supervisorScope

| 빌더 | 자식 실패 시 동작 | 용도 |
|------|-------------------|------|
| \`coroutineScope\` | 전체 취소 | 트랜잭션처럼 하나라도 실패하면 롤백해야 할 때 |
| \`supervisorScope\` | 해당 자식만 실패 | UI 작업 등 각자 독립적으로 실행되어야 할 때 |

---

## 3. 에러 핸들링 패턴

### 3.1 try-catch
코루틴 내부에서 발생하는 예외는 일반 \`try-catch\`로 잡을 수 있습니다.

### 3.2 CoroutineExceptionHandler (CEH)
**Root Coroutine** (맨 상위 코루틴)의 컨텍스트에만 적용됩니다. 자식 코루틴에 달아도 무시됩니다. 전역 에러 로깅용으로 적합합니다.

\`\`\`kotlin
val handler = CoroutineExceptionHandler { _, exception ->
    println("Caught $exception")
}
val scope = CoroutineScope(Job() + handler)
\`\`\`

### 3.3 async의 함정
\`async\` 블록 내부의 예외는 \`await()\`를 호출할 때 던져집니다. 하지만 **부모 코루틴에게 즉시 전파**되므로, \`supervisorScope\` 없이는 \`try-catch(await())\`로도 막을 수 없는 경우가 있습니다.

> **Tip**: 결과가 필요한 독립작업 여러 개를 수행할 땐 \`supervisorScope\` 안에서 \`async\`를 사용하세요.
`,
      keyPoints: [
        "Structured Concurrency는 비동기 작업의 누수(Leak)를 방지하고 관리를 단순화합니다.",
        "SupervisorJob은 자식의 실패가 전파되는 것을 막아 독립적인 실행을 보장합니다.",
        "async 사용 시 예외 전파 규칙에 주의해야 하며, 안전한 병렬 처리를 위해 supervisorScope를 활용해야 합니다."
      ],
      interviewQuestions: [
        {
          difficulty: 'Medium',
          question: "Structured Concurrency(구조적 동시성)란 무엇인가요?",
          answer: "비동기 작업을 부모-자식 관계로 구조화하여, 부모가 취소되면 자식도 취소되고, 자식의 예외가 부모로 전파되는 등 생명주기를 자동으로 관리하는 개념입니다."
        },
        {
          difficulty: 'Medium',
          question: "SupervisorJob이나 supervisorScope는 언제 사용하나요?",
          answer: "자식 코루틴 중 하나가 실패해도 다른 형제 코루틴이나 부모 코루틴에게 취소를 전파하지 않고 독립적으로 실행되게 하고 싶을 때 사용합니다."
        }
      ],
      codeExamples: [
        {
          title: "안전한 병렬 처리 패턴",
          language: "kotlin",
          code: `import kotlinx.coroutines.*

suspend fun safeParallel() = supervisorScope {
    val deferred1 = async { 
        delay(100)
        throw RuntimeException("Task 1 Failed") // 여기서 터져도..
    }
    val deferred2 = async {
        delay(200)
        "Task 2 Success" // 얘는 살아남는다!
    }
    
    try {
        deferred1.await()
    } catch (e: Exception) {
        println("Handled Task 1: \${e.message}")
    }
    
    println("Task 2 result: \${deferred2.await()}")
}`
        }
      ]
    },
    {
      id: "kotlin-flow",
      title: "Chapter 5: Reactive Programming with Flow",
      topic: "Cold/Hot Streams, Backpressure, StateFlow vs SharedFlow",
      content: `
## 1. Flow의 내부: Cold Stream

\`Flow\`는 **Cold Stream**입니다. 즉, \`collect()\`가 호출되기 전까지는 아무런 동작도 하지 않습니다(코루틴도 생성되지 않음).

### 1.1 동작 방식
\`emit()\`은 사실 \`collect()\`를 호출한 하류(Downstream)의 \`emit\` 함수를 직접 호출하는 것입니다. 즉, 기본적으로 **동기적 호출 체인**입니다.

\`\`\`kotlin
flow { emit(1) } // Upstream
    .map { it * 2 }
    .collect { println(it) } // Downstream
\`\`\`

---

## 2. Hot Stream: StateFlow & SharedFlow

데이터가 생성되는 곳과 소비되는 곳이 분리되어 독자적으로 동작합니다. 구독자가 없어도 데이터는 흐릅니다.

### 2.1 StateFlow
- **상태(State)** 를 보유합니다. (초기값 필수)
- 항상 **최신 값 하나**만 유지합니다. (Replay = 1)
- 데이터가 같으면 방출하지 않습니다 (\`distinctUntilChanged\` 기본 적용).
- UI 상태 홀딩(ViewModel)에 최적입니다.

### 2.2 SharedFlow
- **이벤트(Event)** 를 브로드캐스팅합니다.
- 초기값이 없으며, Replay 버퍼 크기를 설정할 수 있습니다.
- 한 번 발생한 이벤트(토스트 메시지 등) 처리에 적합합니다.

---

## 3. Backpressure (배압) 처리

생산 속도가 소비 속도보다 빠를 때 어떻게 할까요?

- **buffer()**: 버퍼에 쌓아두고 생산자는 계속 진행.
- **conflate()**: 처리 못 한 중간 값은 버리고 최신 값만 취함.
- **collectLatest()**: 새 값이 오면 이전 처리를 취소하고 새 값 처리.

\`\`\`mermaid
graph LR
    P[Producer Fast] -->|Buffer| B((Buffer))
    B --> C[Consumer Slow]
\`\`\`
`,
      keyPoints: [
        "Flow는 기본적으로 Cold Stream이며 collect 호출 시마다 처음부터 실행됩니다.",
        "StateFlow는 최신 상태 유지에, SharedFlow는 일회성 이벤트 전파에 사용됩니다.",
        "conflate나 collectLatest를 사용하여 배압(Backpressure)을 효율적으로 관리할 수 있습니다."
      ],
      interviewQuestions: [
        {
          difficulty: 'Medium',
          question: "Flow와 Sequence의 차이점은?",
          answer: "Sequence는 동기적으로(Synchronous) 데이터를 처리하지만, Flow는 코루틴 기반으로 비동기적(Asynchronous)으로 데이터를 스트리밍할 수 있습니다."
        },
        {
          difficulty: 'Medium',
          question: "StateFlow와 SharedFlow의 차이는?",
          answer: "StateFlow는 항상 최신 상태 값 하나를 유지하며(초기값 필수) UI 상태 관리에 적합하고, SharedFlow는 이벤트를 여러 구독자에게 브로드캐스트하는 데 적합합니다."
        }
      ]
    },
    {
      id: "kotlin-dsl",
      title: "Chapter 6: Kotlin DSL & Meta-programming",
      topic: "Type-Safe Builders, Lambda with Receiver, KSP",
      content: `
## 1. Kotlin DSL (Domain Specific Language)

Kotlin 코드를 마치 설정 파일이나 자연어처럼 보이게 만드는 기술입니다. 핵심은 **수신 객체 지정 람다 (Lambda with Receiver)** 입니다.

### 1.1 수신 객체 지정 람다란?

\`\`\`kotlin
val action: StringBuilder.() -> Unit
\`\`\`

- 이 람다 내부에서는 \`this\`가 \`StringBuilder\`가 됩니다.
- 따라서 \`this.append()\` 대신 그냥 \`append()\`를 호출할 수 있습니다.

### 1.2 HTML 빌더 만들기 (예시)

\`\`\`kotlin
fun html(block: HTML.() -> Unit): HTML {
    val html = HTML()
    html.block() // html 객체가 this가 됨
    return html
}

// 사용
html {
    head {
        title("My Page")
    }
    body {
        div { +"Content" }
    }
}
\`\`\`

---

## 2. invoke 연산자 오버로딩

객체를 함수처럼 호출(\`obj()\`)하게 만듭니다. Gradle 스크립트나 설정 객체에서 유용합니다.

\`\`\`kotlin
class DependencyHandler {
    operator fun invoke(block: DependencyHandler.() -> Unit) {
        block()
    }
}

dependencies {
    implementation("...")
}
\`\`\`

---

## 3. KSP (Kotlin Symbol Processing)

Annotation Processing을 위한 차세대 도구입니다. (Java의 \`kapt\` 대체)
- 컴파일러 플러그인으로 동작하여 속도가 훨씬 빠릅니다.
- 바이트코드 생성은 하지 않고, 코드 분석 및 새 파일 생성만 담당합니다. (Room, Moshi 등이 사용)
`,
      keyPoints: [
        "수신 객체 지정 람다(Type.() -> Unit)를 통해 this를 생략하고 직관적인 DSL을 만들 수 있습니다.",
        "invoke 연산자를 오버로딩하면 객체를 함수처럼 호출할 수 있어 설정 블록 구성에 유용합니다.",
        "KSP는 kapt보다 빠르고 강력한 코틀린 전용 어노테이션 처리 도구입니다."
      ],
      interviewQuestions: [
        {
          difficulty: 'Hard',
          question: "수신 객체 지정 람다(Lambda with Receiver)란?",
          answer: "람다 내부에서 특정 객체(Receiver)를 this로 접근할 수 있게 하는 기능으로, Kotlin DSL을 만들 때 핵심적으로 사용됩니다. (예: HTML { body { ... } })"
        }
      ],
      codeExamples: [
        {
          title: "간단한 HTTP Request DSL",
          language: "kotlin",
          code: `class RequestBuilder {
    var method: String = "GET"
    var url: String = ""
    private val headers = mutableMapOf<String, String>()

    fun header(key: String, value: String) {
        headers[key] = value
    }
    
    // 내부적으로 사용될 build
    fun build(): Request = Request(method, url, headers)
}

data class Request(val method: String, val url: String, val headers: Map<String, String>)

// DSL 진입점
fun request(block: RequestBuilder.() -> Unit): Request {
    val builder = RequestBuilder()
    builder.block()
    return builder.build()
}

fun main() {
    val req = request {
        url = "https://api.example.com/users"
        method = "POST"
        header("Authorization", "Bearer token")
        header("Content-Type", "application/json")
    }
    
    println(req)
}`
        }
      ]
    }
  ]
};
