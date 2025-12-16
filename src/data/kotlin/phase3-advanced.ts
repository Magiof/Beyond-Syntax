import type { Phase } from '../curriculumData';

export const kotlinAdvancedPhase: Phase = {
  id: "phase3",
  title: "Phase 3: Kotlin 심화 & 코루틴",
  goal: "코틀린의 '마법'을 바이트코드 레벨에서 해부하고, 코루틴의 내부 상태 머신을 이해합니다.",
  modules: [
    {
      id: "p3-m1",
      title: "Chapter 1: Inline Functions & Bytecode Analysis",
      topic: "Inline Functions, Lambda Overhead, reified, Null Safety 바이트코드",
      content: `
## 1. Kotlin의 "마법"을 해부하다

Kotlin은 개발자 친화적인 문법을 제공하지만, 결국 JVM 바이트코드로 컴파일됩니다.
이 챕터에서는 Kotlin의 주요 기능들이 **어떤 바이트코드로 변환**되는지 분석합니다.

---

## 2. Inline Functions (인라인 함수)

### 2.1 왜 inline이 필요한가?

Kotlin의 고차함수(Higher-Order Function)는 **람다를 객체로 생성**합니다.

\`\`\`kotlin
// 일반 고차함수
fun performAction(action: () -> Unit) {
    action()
}

// 호출
performAction { println("Hello") }
\`\`\`

**컴파일 시 발생하는 일:**
\`\`\`java
// 바이트코드 개념적 표현
performAction(new Function0<Unit>() {
    @Override
    public Unit invoke() {
        System.out.println("Hello");
        return Unit.INSTANCE;
    }
});
\`\`\`

**문제점:**
- 람다마다 **익명 클래스 생성**
- **객체 할당 오버헤드**
- 반복 호출 시 GC 부담

### 2.2 inline 키워드의 마법

\`\`\`kotlin
inline fun performAction(action: () -> Unit) {
    println("Before")
    action()
    println("After")
}

fun main() {
    performAction { println("Hello") }
}
\`\`\`

**inline 적용 시 컴파일 결과:**
\`\`\`java
// 람다 객체 없이 코드가 인라인됨!
public static void main(String[] args) {
    System.out.println("Before");
    System.out.println("Hello");  // 람다 내용이 직접 삽입
    System.out.println("After");
}
\`\`\`

### 2.3 noinline과 crossinline

#### noinline
람다를 인라인하지 않고 객체로 유지

\`\`\`kotlin
inline fun example(
    inlined: () -> Unit,
    noinline notInlined: () -> Unit  // 이 람다는 인라인 안 됨
) {
    inlined()
    // notInlined를 변수에 저장하거나 다른 함수에 전달 가능
    someOtherFunction(notInlined)
}
\`\`\`

#### crossinline
인라인되지만 **비지역 반환 금지**

\`\`\`kotlin
inline fun runOnThread(crossinline action: () -> Unit) {
    Thread {
        action()  // 다른 컨텍스트에서 실행될 수 있음
    }.start()
}

fun main() {
    runOnThread {
        println("Running")
        // return  // 컴파일 에러! crossinline에서는 비지역 반환 불가
    }
}
\`\`\`

---

## 3. reified Type Parameters

### 3.1 제네릭의 한계: Type Erasure

Java/Kotlin의 제네릭은 컴파일 시 **타입 정보가 지워집니다**.

\`\`\`kotlin
// 이렇게 하고 싶지만...
fun <T> isType(value: Any): Boolean {
    return value is T  // 컴파일 에러! T의 타입을 런타임에 알 수 없음
}
\`\`\`

### 3.2 reified로 타입 정보 유지하기

\`inline\` + \`reified\` 조합으로 해결!

\`\`\`kotlin
inline fun <reified T> isType(value: Any): Boolean {
    return value is T  // OK! 인라인되면서 T가 실제 타입으로 대체됨
}

fun main() {
    println(isType<String>("Hello"))  // true
    println(isType<Int>("Hello"))     // false
}
\`\`\`

**바이트코드 개념:**
\`\`\`java
// isType<String>("Hello") 호출 시 인라인 결과
boolean result = "Hello" instanceof String;  // T가 String으로 대체됨
\`\`\`

### 3.3 reified 활용 예시

\`\`\`kotlin
// Activity 시작 (Android)
inline fun <reified T : Activity> Context.startActivity() {
    val intent = Intent(this, T::class.java)  // reified로 클래스 참조 가능
    startActivity(intent)
}

// 사용
startActivity<MainActivity>()

// JSON 파싱
inline fun <reified T> parseJson(json: String): T {
    return Gson().fromJson(json, T::class.java)
}

val user = parseJson<User>("""{"name": "Kim"}""")
\`\`\`

---

## 4. Null Safety 바이트코드

### 4.1 Non-null 타입의 런타임 검사

\`\`\`kotlin
fun greet(name: String) {  // Non-null 타입
    println("Hello, $name")
}
\`\`\`

**컴파일된 바이트코드:**
\`\`\`java
public static void greet(String name) {
    Intrinsics.checkNotNullParameter(name, "name");  // null 체크 삽입!
    System.out.println("Hello, " + name);
}
\`\`\`

### 4.2 Safe Call (?.) 연산자

\`\`\`kotlin
val length = name?.length
\`\`\`

**컴파일 결과 개념:**
\`\`\`java
Integer length = (name != null) ? name.length() : null;
\`\`\`

### 4.3 Elvis 연산자 (?:)

\`\`\`kotlin
val length = name?.length ?: 0
\`\`\`

**컴파일 결과:**
\`\`\`java
int length;
if (name != null) {
    length = name.length();
} else {
    length = 0;
}
\`\`\`

### 4.4 Not-null Assertion (!!)

\`\`\`kotlin
val length = name!!.length  // null이면 NPE
\`\`\`

**주의:** !!는 \`Intrinsics.checkNotNull()\`을 삽입하여 **KotlinNullPointerException** 발생

---

## 5. 바이트코드 확인 방법

### IntelliJ IDEA에서 확인

1. **Tools → Kotlin → Show Kotlin Bytecode** 메뉴
2. **Decompile** 버튼으로 Java 코드 확인

### 커맨드라인에서 확인

\`\`\`bash
# 컴파일
kotlinc MyFile.kt -include-runtime -d MyFile.jar

# 바이트코드 확인
javap -c -p MyFileKt.class
\`\`\`
`,
      codeExamples: [
        {
          title: "inline 함수 성능 비교",
          language: "kotlin",
          code: `// 일반 고차함수 vs inline 함수 비교

// 일반 고차함수 (람다 객체 생성됨)
fun regularHigherOrder(times: Int, action: () -> Unit) {
    for (i in 0 until times) {
        action()
    }
}

// inline 함수 (람다 코드가 직접 삽입됨)
inline fun inlinedHigherOrder(times: Int, action: () -> Unit) {
    for (i in 0 until times) {
        action()
    }
}

fun main() {
    var sum = 0
    
    // 성능 비교
    val iterations = 10_000_000
    
    // Regular
    val regularStart = System.nanoTime()
    regularHigherOrder(iterations) { sum++ }
    val regularEnd = System.nanoTime()
    
    sum = 0  // 리셋
    
    // Inline
    val inlineStart = System.nanoTime()
    inlinedHigherOrder(iterations) { sum++ }
    val inlineEnd = System.nanoTime()
    
    println("Regular: \${(regularEnd - regularStart) / 1_000_000} ms")
    println("Inline:  \${(inlineEnd - inlineStart) / 1_000_000} ms")
}

/* 예상 출력:
Regular: 45 ms
Inline:  12 ms
*/`
        },
        {
          title: "reified를 활용한 타입 안전 캐스팅",
          language: "kotlin",
          code: `import kotlin.reflect.KClass

// reified가 없으면 불가능한 작업들
inline fun <reified T> Any.isInstanceOf(): Boolean {
    return this is T
}

inline fun <reified T> Any.safeCast(): T? {
    return this as? T
}

inline fun <reified T : Any> getTypeName(): String {
    return T::class.simpleName ?: "Unknown"
}

// 컬렉션에서 특정 타입만 필터링
inline fun <reified T> List<*>.filterIsInstanceTyped(): List<T> {
    return this.filterIsInstance<T>()
}

fun main() {
    val value: Any = "Hello, Kotlin"
    
    // 타입 체크
    println("Is String? \${value.isInstanceOf<String>()}")  // true
    println("Is Int? \${value.isInstanceOf<Int>()}")        // false
    
    // 안전한 캐스팅
    val str: String? = value.safeCast<String>()
    val num: Int? = value.safeCast<Int>()
    println("As String: $str")  // Hello, Kotlin
    println("As Int: $num")     // null
    
    // 타입 이름 가져오기
    println("Type name: \${getTypeName<String>()}")  // String
    
    // 혼합 리스트에서 필터링
    val mixedList: List<Any> = listOf(1, "two", 3, "four", 5.0)
    val strings: List<String> = mixedList.filterIsInstanceTyped<String>()
    val ints: List<Int> = mixedList.filterIsInstanceTyped<Int>()
    
    println("Strings: $strings")  // [two, four]
    println("Ints: $ints")        // [1, 3]
}`
        },
        {
          title: "crossinline과 비지역 반환",
          language: "kotlin",
          code: `// inline 함수에서의 반환 동작 이해

// 일반 inline: 비지역 반환 가능
inline fun forEach(items: List<Int>, action: (Int) -> Unit) {
    for (item in items) {
        action(item)
    }
}

// crossinline: 비지역 반환 금지
inline fun runAsync(crossinline action: () -> Unit) {
    Thread { action() }.start()
}

fun processWithReturn() {
    forEach(listOf(1, 2, 3, 4, 5)) { num ->
        if (num == 3) {
            return  // processWithReturn() 함수 전체를 빠져나감!
        }
        println(num)
    }
    println("이 줄은 실행 안 됨")
}

fun processWithLabel() {
    forEach(listOf(1, 2, 3, 4, 5)) { num ->
        if (num == 3) {
            return@forEach  // 이 람다만 빠져나감
        }
        println(num)
    }
    println("이 줄은 실행됨")
}

fun main() {
    println("=== With non-local return ===")
    processWithReturn()
    
    println("\\n=== With labeled return ===")
    processWithLabel()
    
    // crossinline 사용
    runAsync {
        println("Running in thread")
        // return  // 컴파일 에러! crossinline에서는 비지역 반환 불가
    }
    Thread.sleep(100)
}

/* 출력:
=== With non-local return ===
1
2

=== With labeled return ===
1
2
4
5
이 줄은 실행됨
Running in thread
*/`
        },
        {
          title: "Null Safety 바이트코드 분석",
          language: "kotlin",
          code: `// Null Safety 기능들이 어떻게 동작하는지 이해

// 1. Non-null 파라미터 체크
fun greet(name: String) {
    // 컴파일러가 Intrinsics.checkNotNullParameter(name, "name") 삽입
    println("Hello, $name!")
}

// 2. Safe call과 Elvis 연산자
fun getLength(text: String?): Int {
    // Safe call: text가 null이면 null 반환
    val len1 = text?.length
    
    // Elvis: null 대신 기본값
    val len2 = text?.length ?: 0
    
    return len2
}

// 3. let과 조합
fun processIfNotNull(value: String?) {
    value?.let {
        // it은 non-null String
        println("Processing: $it")
    }
}

// 4. also, apply, run, with 스코프 함수들
data class User(var name: String, var age: Int)

fun scopeFunctions() {
    // let: 결과 반환, it 사용
    val length = "Kotlin".let { it.length }
    
    // run: 결과 반환, this 사용
    val intro = User("Kim", 25).run { "I'm $name, $age years old" }
    
    // also: 자기 자신 반환, it 사용 (주로 부수 효과)
    val user = User("Lee", 30).also { println("Created: \${it.name}") }
    
    // apply: 자기 자신 반환, this 사용 (주로 초기화)
    val configuredUser = User("Park", 35).apply {
        name = name.uppercase()
        age += 1
    }
    
    println("length: $length")
    println("intro: $intro")
    println("user: \${user.name}")
    println("configured: \${configuredUser.name}, \${configuredUser.age}")
}

fun main() {
    greet("Kotlin")
    
    println("\\n=== Null safety ===")
    println("Length of 'Hello': \${getLength("Hello")}")
    println("Length of null: \${getLength(null)}")
    
    println("\\n=== let with null ===")
    processIfNotNull("Data")
    processIfNotNull(null)
    
    println("\\n=== Scope functions ===")
    scopeFunctions()
}

/* 출력:
Hello, Kotlin!

=== Null safety ===
Length of 'Hello': 5
Length of null: 0

=== let with null ===
Processing: Data

=== Scope functions ===
Created: Lee
length: 6
intro: I'm Kim, 25 years old
user: Lee
configured: PARK, 36
*/`
        }
      ],
      keyPoints: [
        "inline 함수는 호출 지점에 함수 본문과 람다 코드를 직접 삽입하여 객체 생성 오버헤드를 제거합니다.",
        "noinline은 특정 람다를 인라인에서 제외하고, crossinline은 인라인하되 비지역 반환을 금지합니다.",
        "reified 타입 파라미터는 inline 함수에서만 사용 가능하며, 런타임에 타입 정보를 유지합니다.",
        "Kotlin의 Non-null 타입은 컴파일 시 null 체크 코드(Intrinsics.checkNotNullParameter)가 삽입됩니다.",
        "Safe call(?.), Elvis(?:), Not-null(!!) 연산자는 각각 다른 바이트코드 패턴으로 변환됩니다.",
        "IntelliJ의 'Show Kotlin Bytecode' 기능으로 실제 컴파일 결과를 확인할 수 있습니다."
      ]
    },
    {
      id: "p3-m2",
      title: "Chapter 2: Coroutines Deep Dive",
      topic: "suspend 함수의 상태 머신, CoroutineContext, Dispatchers, Flow, Structured Concurrency",
      content: `
## 1. 코루틴이란?

**코루틴(Coroutine)**은 **일시 중단 가능한 계산(suspendable computation)** 입니다.
스레드를 블로킹하지 않고 비동기 작업을 수행할 수 있습니다.

\`\`\`kotlin
// 스레드 방식 (비효율)
fun fetchData() {
    Thread.sleep(1000)  // 스레드 블로킹! 1000ms 동안 아무것도 못 함
}

// 코루틴 방식 (효율적)
suspend fun fetchData() {
    delay(1000)  // 일시 중단! 스레드는 다른 작업 가능
}
\`\`\`

---

## 2. suspend 함수의 내부 동작

### 2.1 CPS (Continuation-Passing Style) 변환

suspend 함수는 컴파일 시 **Continuation** 파라미터가 추가됩니다.

\`\`\`kotlin
// 원본 코드
suspend fun fetchUser(id: Int): User {
    val data = fetchFromNetwork(id)  // 일시 중단 지점 1
    val user = parseUser(data)       // 일시 중단 지점 2
    return user
}
\`\`\`

**컴파일 후 (개념적):**
\`\`\`java
Object fetchUser(int id, Continuation<User> cont) {
    // 상태 머신으로 변환됨
    switch (cont.label) {
        case 0:
            cont.label = 1;
            Object result = fetchFromNetwork(id, cont);
            if (result == COROUTINE_SUSPENDED) return COROUTINE_SUSPENDED;
            // fall through
        case 1:
            String data = (String) cont.result;
            cont.label = 2;
            result = parseUser(data, cont);
            if (result == COROUTINE_SUSPENDED) return COROUTINE_SUSPENDED;
            // fall through
        case 2:
            return (User) cont.result;
    }
}
\`\`\`

### 2.2 Continuation 인터페이스

\`\`\`kotlin
interface Continuation<in T> {
    val context: CoroutineContext
    fun resumeWith(result: Result<T>)
}
\`\`\`

**핵심 개념:**
- suspend 함수가 중단되면 \`COROUTINE_SUSPENDED\` 반환
- 재개될 때 \`resumeWith()\` 호출
- \`context\`는 코루틴의 실행 환경 정보

---

## 3. CoroutineContext

### 3.1 Context 구성 요소

CoroutineContext는 여러 **Element**들의 집합입니다.

\`\`\`mermaid
graph TD
    Context[CoroutineContext]
    Context --> Job[Job<br/>Lifecycle Management]
    Context --> Dispatcher[CoroutineDispatcher<br/>Thread Decision]
    Context --> Name[CoroutineName<br/>Debugging]
    Context --> Handler[CoroutineExceptionHandler<br/>Exception Handling]
\`\`\`

\`\`\`kotlin
val context = Job() + Dispatchers.IO + CoroutineName("MyCoroutine")

launch(context) {
    // 이 코루틴은 IO 스레드에서 실행되고, "MyCoroutine" 이름을 가짐
}
\`\`\`

### 3.2 Dispatchers (디스패처)

| Dispatcher | 용도 | 스레드 풀 |
|------------|------|----------|
| \`Dispatchers.Main\` | UI 작업 | 메인 스레드 |
| \`Dispatchers.IO\` | I/O 작업 (네트워크, 파일) | 64개+ 스레드 |
| \`Dispatchers.Default\` | CPU 집약적 작업 | CPU 코어 수 |
| \`Dispatchers.Unconfined\` | 제한 없음 (권장 안 함) | 호출 스레드 |

\`\`\`kotlin
launch(Dispatchers.IO) {
    val data = fetchFromNetwork()  // IO 스레드
    
    withContext(Dispatchers.Main) {
        updateUI(data)  // 메인 스레드로 전환
    }
}
\`\`\`

---

## 4. 코루틴 빌더

### 4.1 launch vs async

| 빌더 | 반환값 | 용도 |
|------|--------|------|
| \`launch\` | \`Job\` | 결과가 필요 없는 작업 (fire-and-forget) |
| \`async\` | \`Deferred<T>\` | 결과가 필요한 작업 |

\`\`\`kotlin
// launch: 결과 필요 없음
val job = launch {
    doSomething()
}
job.join()  // 완료 대기

// async: 결과 필요
val deferred = async {
    fetchUser(1)
}
val user = deferred.await()  // 결과 받기
\`\`\`

### 4.2 runBlocking

\`\`\`kotlin
// 현재 스레드를 블로킹하고 코루틴 실행
// 주로 main() 함수나 테스트에서 사용
fun main() = runBlocking {
    launch {
        delay(1000)
        println("World!")
    }
    println("Hello,")
}
\`\`\`

### 4.3 coroutineScope vs supervisorScope

\`\`\`kotlin
// coroutineScope: 자식 중 하나가 실패하면 전체 취소
suspend fun riskyOperation() = coroutineScope {
    launch { task1() }  // task1 실패 시 task2도 취소
    launch { task2() }
}

// supervisorScope: 자식 실패가 다른 자식에 영향 안 줌
suspend fun independentTasks() = supervisorScope {
    launch { task1() }  // task1 실패해도 task2는 계속
    launch { task2() }
}
\`\`\`

---

## 5. Structured Concurrency (구조화된 동시성)

### 5.1 원칙

1. **모든 코루틴은 CoroutineScope에 속한다**
2. **부모 코루틴은 자식이 완료될 때까지 기다린다**
3. **부모가 취소되면 자식도 취소된다**
4. **자식이 예외로 실패하면 부모도 영향받는다** (supervisorScope 제외)

\`\`\`kotlin
suspend fun processData() = coroutineScope {
    val data1 = async { fetchFromApi1() }
    val data2 = async { fetchFromApi2() }
    
    // 두 작업이 모두 완료될 때까지 대기
    // 하나라도 실패하면 다른 것도 취소됨
    combine(data1.await(), data2.await())
}  // 이 스코프를 빠져나가면 모든 자식이 완료된 상태
\`\`\`

### 5.2 Job 계층 구조

\`\`\`mermaid
graph TD
    Parent[parentJob] --> Child1[childJob1]
    Parent --> Child2[childJob2]
    Child1 --> GC1[grandchildJob1]
    Child1 --> GC2[grandchildJob2]
\`\`\`

\`\`\`kotlin
val parentJob = launch {
    launch { /* childJob1 */ }
    launch { /* childJob2 */ }
}

parentJob.cancel()  // 모든 자식도 취소됨
\`\`\`

---

## 6. Flow

### 6.1 Cold Flow vs Hot Flow

| 특성 | Cold Flow | Hot Flow (SharedFlow, StateFlow) |
|------|-----------|----------------------------------|
| 시작 시점 | collect 할 때 | 생성 즉시 |
| 수집자 | 각각 독립적 | 여러 수집자가 공유 |
| 예시 | \`flow { }\` | \`MutableSharedFlow\` |

### 6.2 Flow 기본 사용

\`\`\`kotlin
// Flow 생성
fun numberFlow(): Flow<Int> = flow {
    for (i in 1..3) {
        delay(100)
        emit(i)  // 값 방출
    }
}

// Flow 수집
suspend fun main() {
    numberFlow()
        .map { it * 2 }
        .filter { it > 2 }
        .collect { println(it) }
}
\`\`\`

### 6.3 Flow 연산자

\`\`\`kotlin
flow
    .map { transform(it) }        // 변환
    .filter { condition(it) }     // 필터링
    .take(5)                      // 처음 5개만
    .drop(2)                      // 처음 2개 건너뛰기
    .onEach { log(it) }          // 부수 효과
    .catch { e -> handleError(e) }  // 에러 처리
    .flowOn(Dispatchers.IO)       // 업스트림 디스패처 변경
    .collect { use(it) }          // 터미널 연산
\`\`\`

### 6.4 StateFlow와 SharedFlow

\`\`\`kotlin
// StateFlow: 상태 관리 (항상 최신 값 보유)
private val _uiState = MutableStateFlow(UiState.Loading)
val uiState: StateFlow<UiState> = _uiState.asStateFlow()

// 값 업데이트
_uiState.value = UiState.Success(data)

// SharedFlow: 이벤트 전달
private val _events = MutableSharedFlow<Event>()
val events: SharedFlow<Event> = _events.asSharedFlow()

// 이벤트 발생
_events.emit(Event.ShowToast("Hello"))
\`\`\`

---

## 7. 취소와 예외 처리

### 7.1 취소 협조적 처리

\`\`\`kotlin
suspend fun cancellableWork() {
    while (isActive) {  // 취소 상태 확인
        // 작업 수행
        yield()  // 취소 체크 포인트
    }
}

// 또는
suspend fun ensureCancellation() {
    ensureActive()  // 취소 시 CancellationException 발생
}
\`\`\`

### 7.2 예외 처리

\`\`\`kotlin
val handler = CoroutineExceptionHandler { _, exception ->
    println("Caught: $exception")
}

val scope = CoroutineScope(SupervisorJob() + handler)

scope.launch {
    throw RuntimeException("Oops!")  // handler가 처리
}

// 또는 try-catch 사용
launch {
    try {
        riskyOperation()
    } catch (e: Exception) {
        handleError(e)
    }
}
\`\`\`
`,
      codeExamples: [
        {
          title: "suspend 함수와 Continuation 이해",
          language: "kotlin",
          code: `import kotlin.coroutines.*
import kotlinx.coroutines.*

// suspend 함수의 동작 원리 이해
suspend fun fetchData(): String {
    delay(1000)  // 일시 중단
    return "Data loaded"
}

// 저수준 Continuation API 사용 예시
fun main() = runBlocking {
    // 1. 일반적인 suspend 함수 호출
    val result = fetchData()
    println("Result: $result")
    
    // 2. suspendCoroutine으로 콜백을 suspend로 변환
    val data = suspendCoroutine<String> { continuation ->
        // 비동기 작업 시뮬레이션
        thread {
            Thread.sleep(500)
            continuation.resume("Async data")  // 결과와 함께 재개
        }
    }
    println("Async: $data")
    
    // 3. suspendCancellableCoroutine (취소 지원)
    val cancellableData = withTimeoutOrNull(200) {
        suspendCancellableCoroutine<String> { cont ->
            val thread = thread {
                Thread.sleep(1000)  // 오래 걸리는 작업
                cont.resume("Done")
            }
            cont.invokeOnCancellation {
                thread.interrupt()  // 취소 시 정리
                println("Cancelled!")
            }
        }
    }
    println("Cancellable: \${cancellableData ?: "Timed out"}")
}

fun thread(block: () -> Unit) = Thread(block).also { it.start() }

/* 출력:
Result: Data loaded
Async: Async data
Cancelled!
Cancellable: Timed out
*/`
        },
        {
          title: "Dispatchers와 컨텍스트 전환",
          language: "kotlin",
          code: `import kotlinx.coroutines.*

fun main() = runBlocking {
    println("Main: \${Thread.currentThread().name}")
    
    // Default 디스패처 (CPU 작업용)
    launch(Dispatchers.Default) {
        println("Default: \${Thread.currentThread().name}")
        val result = heavyComputation()
        println("Computation result: $result")
    }
    
    // IO 디스패처 (I/O 작업용)
    launch(Dispatchers.IO) {
        println("IO: \${Thread.currentThread().name}")
        val data = fetchFromNetwork()
        
        // 컨텍스트 전환
        withContext(Dispatchers.Main.immediate) {
            // UI 업데이트 (Android에서)
            // updateUI(data)
        }
    }
    
    // Unconfined (권장하지 않음 - 디버깅용)
    launch(Dispatchers.Unconfined) {
        println("Unconfined before: \${Thread.currentThread().name}")
        delay(100)
        println("Unconfined after: \${Thread.currentThread().name}")  // 다른 스레드!
    }
    
    // 커스텀 디스패처
    val customDispatcher = Executors.newFixedThreadPool(4).asCoroutineDispatcher()
    launch(customDispatcher) {
        println("Custom: \${Thread.currentThread().name}")
    }
    
    delay(500)
    customDispatcher.close()  // 리소스 정리
}

suspend fun heavyComputation(): Long {
    var sum = 0L
    repeat(1_000_000) { sum += it }
    return sum
}

suspend fun fetchFromNetwork(): String {
    delay(100)
    return "Network data"
}

/* 예상 출력:
Main: main
Unconfined before: main
Default: DefaultDispatcher-worker-1
IO: DefaultDispatcher-worker-2
Custom: pool-1-thread-1
Unconfined after: kotlinx.coroutines.DefaultExecutor
Computation result: 499999500000
*/`
        },
        {
          title: "Structured Concurrency와 취소",
          language: "kotlin",
          code: `import kotlinx.coroutines.*

suspend fun main() = coroutineScope {
    println("=== Structured Concurrency Demo ===\\n")
    
    // 1. 부모-자식 관계
    val parentJob = launch {
        println("Parent started")
        
        launch {
            println("Child 1 started")
            delay(1000)
            println("Child 1 completed")  // 취소되면 출력 안 됨
        }
        
        launch {
            println("Child 2 started")
            delay(500)
            println("Child 2 completed")  // 취소되면 출력 안 됨
        }
    }
    
    delay(300)
    println("Cancelling parent...")
    parentJob.cancel()  // 자식들도 모두 취소됨
    parentJob.join()
    println("Parent and all children cancelled\\n")
    
    // 2. coroutineScope vs supervisorScope
    println("=== Error Handling ===")
    
    try {
        coroutineScope {
            launch {
                delay(100)
                throw RuntimeException("Task 1 failed!")
            }
            launch {
                delay(200)
                println("Task 2 completed")  // 실행 안 됨
            }
        }
    } catch (e: Exception) {
        println("Caught in coroutineScope: \${e.message}")
    }
    
    println()
    
    supervisorScope {
        launch {
            delay(100)
            throw RuntimeException("Task 3 failed!")
        }
        launch {
            delay(200)
            println("Task 4 completed (independent)")  // 실행됨!
        }
    }
    
    delay(300)
    println("\\n=== Cancellation Cooperation ===")
    
    // 3. 취소 협조
    val job = launch {
        repeat(1000) { i ->
            if (!isActive) {
                println("Cancellation detected at $i")
                return@launch  // 또는 throw CancellationException()
            }
            println("Working... $i")
            // 주의: Thread.sleep() 대신 delay() 사용해야 취소됨
            delay(50)
        }
    }
    
    delay(150)
    job.cancel()
    job.join()
    println("Job cancelled properly")
}

/* 출력:
=== Structured Concurrency Demo ===

Parent started
Child 1 started
Child 2 started
Cancelling parent...
Parent and all children cancelled

=== Error Handling ===
Caught in coroutineScope: Task 1 failed!

Task 4 completed (independent)

=== Cancellation Cooperation ===
Working... 0
Working... 1
Working... 2
Job cancelled properly
*/`
        },
        {
          title: "Flow 활용 예제",
          language: "kotlin",
          code: `import kotlinx.coroutines.*
import kotlinx.coroutines.flow.*

fun main() = runBlocking {
    println("=== Basic Flow ===")
    
    // 1. 기본 Flow 생성과 수집
    fun numbersFlow(): Flow<Int> = flow {
        println("Flow started")
        for (i in 1..3) {
            delay(100)
            emit(i)
            println("Emitted $i")
        }
    }
    
    numbersFlow()
        .map { it * it }
        .collect { println("Collected: $it") }
    
    println("\\n=== Flow Operators ===")
    
    // 2. 다양한 연산자
    (1..10).asFlow()
        .filter { it % 2 == 0 }
        .take(3)
        .onEach { println("Processing $it") }
        .map { "Number: $it" }
        .collect { println(it) }
    
    println("\\n=== Error Handling ===")
    
    // 3. 예외 처리
    flow {
        emit(1)
        emit(2)
        throw RuntimeException("Error!")
    }
    .catch { e -> emit(-1) }  // 에러 시 기본값
    .collect { println("Value: $it") }
    
    println("\\n=== StateFlow ===")
    
    // 4. StateFlow (상태 관리)
    val stateFlow = MutableStateFlow(0)
    
    // 수집자
    val job = launch {
        stateFlow.collect { println("State: $it") }
    }
    
    delay(50)
    stateFlow.value = 1
    delay(50)
    stateFlow.value = 2
    delay(50)
    job.cancel()
    
    println("\\n=== SharedFlow (이벤트) ===")
    
    // 5. SharedFlow (이벤트 전달)
    val sharedFlow = MutableSharedFlow<String>()
    
    // 여러 수집자
    val collector1 = launch {
        sharedFlow.collect { println("Collector 1: $it") }
    }
    val collector2 = launch {
        sharedFlow.collect { println("Collector 2: $it") }
    }
    
    delay(50)
    sharedFlow.emit("Event 1")
    delay(50)
    sharedFlow.emit("Event 2")
    delay(50)
    
    collector1.cancel()
    collector2.cancel()
    
    println("\\n=== Flow Context ===")
    
    // 6. flowOn으로 디스패처 변경
    flow {
        println("Emit on: \${Thread.currentThread().name}")
        emit(1)
    }
    .flowOn(Dispatchers.IO)  // 업스트림은 IO에서
    .collect {
        println("Collect on: \${Thread.currentThread().name}")
    }
}

/* 출력:
=== Basic Flow ===
Flow started
Emitted 1
Collected: 1
Emitted 2
Collected: 4
Emitted 3
Collected: 9

=== Flow Operators ===
Processing 2
Number: 2
Processing 4
Number: 4
Processing 6
Number: 6

=== Error Handling ===
Value: 1
Value: 2
Value: -1

=== StateFlow ===
State: 0
State: 1
State: 2

=== SharedFlow (이벤트) ===
Collector 1: Event 1
Collector 2: Event 1
Collector 1: Event 2
Collector 2: Event 2

=== Flow Context ===
Emit on: DefaultDispatcher-worker-1
Collect on: main
*/`
        }
      ],
      keyPoints: [
        "suspend 함수는 컴파일 시 Continuation 파라미터가 추가되고 상태 머신으로 변환됩니다.",
        "CoroutineContext는 Job, Dispatcher, CoroutineName, ExceptionHandler 등의 Element로 구성됩니다.",
        "Dispatchers.Main(UI), Dispatchers.IO(I/O), Dispatchers.Default(CPU)를 용도에 맞게 사용합니다.",
        "launch는 결과 없는 작업에, async는 결과가 필요한 작업에 사용합니다.",
        "Structured Concurrency: 부모가 취소되면 자식도 취소, 자식이 모두 완료되어야 부모가 완료됩니다.",
        "supervisorScope는 자식의 실패가 다른 자식에게 영향을 주지 않게 합니다.",
        "Flow는 Cold Stream이고, StateFlow/SharedFlow는 Hot Stream입니다.",
        "취소는 협조적입니다. isActive 체크, delay, yield 등으로 취소 지점을 제공해야 합니다."
      ]
    }
  ]
};
