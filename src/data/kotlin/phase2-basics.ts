import type { Phase } from '../curriculumData';

export const kotlinBasicsPhase: Phase = {
  id: "phase2",
  title: "Phase 2: Kotlin 기초",
  goal: "Kotlin의 기본 문법과 특징을 학습합니다. Java와의 차이점, Null Safety, 함수형 프로그래밍 기초를 다룹니다.",
  modules: [
    {
      id: "k0-m1",
      title: "Chapter 1: Kotlin 시작하기",
      topic: "Kotlin이란, Java와의 비교, 기본 문법, Hello World",
      content: `
## 1. Kotlin이란?

**Kotlin**은 JetBrains가 2011년에 개발한 **현대적인 정적 타입 언어**입니다. 2019년 Google이 **Android의 공식 언어**로 채택했습니다.

### Kotlin의 특징

1. **JVM에서 실행**: 기존 Java 코드와 **100% 호환**
2. **간결한 문법**: 보일러플레이트 코드 대폭 감소
3. **Null Safety**: 컴파일 시점에 NullPointerException 방지
4. **함수형 프로그래밍**: 람다, 고차 함수 내장 지원
5. **멀티플랫폼**: JVM, Android, JavaScript, Native 지원

---

## 2. Java vs Kotlin 비교

### 2.1 Hello World

\`\`\`java
// Java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
\`\`\`

\`\`\`kotlin
// Kotlin
fun main() {
    println("Hello, World!")
}
\`\`\`

### 2.2 변수 선언

\`\`\`java
// Java
String name = "홍길동";
final int age = 25;  // 불변
\`\`\`

\`\`\`kotlin
// Kotlin
var name = "홍길동"  // 가변
val age = 25         // 불변 (final과 동일)
\`\`\`

### 2.3 클래스 정의

\`\`\`java
// Java - 25줄 이상
public class Person {
    private String name;
    private int age;
    
    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }
    
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public int getAge() { return age; }
    public void setAge(int age) { this.age = age; }
    
    @Override
    public String toString() {
        return "Person{name='" + name + "', age=" + age + "}";
    }
}
\`\`\`

\`\`\`kotlin
// Kotlin - 1줄!
data class Person(var name: String, var age: Int)
\`\`\`

---

## 3. Kotlin 기본 문법

### 3.1 세미콜론 생략

Kotlin은 줄 끝에 **세미콜론이 필요 없습니다**.

\`\`\`kotlin
val message = "Hello"  // ; 없음
println(message)
\`\`\`

### 3.2 타입 추론

컴파일러가 타입을 자동으로 추론합니다.

\`\`\`kotlin
val name = "홍길동"     // String 추론
val age = 25           // Int 추론
val pi = 3.14          // Double 추론
val isActive = true    // Boolean 추론

// 명시적 타입 선언도 가능
val score: Int = 100
\`\`\`

### 3.3 함수 정의

\`\`\`kotlin
// 기본 함수
fun greet(name: String): String {
    return "안녕, $name!"
}

// 단일 표현식 함수 (return 생략)
fun add(a: Int, b: Int) = a + b

// Unit (void와 유사)
fun printMessage(msg: String) {
    println(msg)
}
\`\`\`

### 3.4 문자열 템플릿

\`\`\`kotlin
val name = "홍길동"
val age = 25

// $ 변수
println("이름: $name")

// \${} 표현식
println("내년 나이: \${age + 1}")
println("이름 길이: \${name.length}")
\`\`\`

---

## 4. 실행 환경 설정

### 4.1 온라인 플레이그라운드

- [Kotlin Playground](https://play.kotlinlang.org/) - 설치 없이 바로 실행

### 4.2 IntelliJ IDEA

1. IntelliJ IDEA 설치 (Community Edition 무료)
2. New Project → Kotlin → JVM 선택
3. \`src/main/kotlin\`에 .kt 파일 생성

### 4.3 명령줄

\`\`\`bash
# Kotlin 컴파일러 설치 (macOS)
brew install kotlin

# 컴파일 및 실행
kotlinc hello.kt -include-runtime -d hello.jar
java -jar hello.jar
\`\`\`
`,
      codeExamples: [
        {
          title: "Kotlin 첫 프로그램",
          language: "kotlin",
          code: `// main 함수: 프로그램 시작점
fun main() {
    // 변수 선언
    val name = "Kotlin"  // 불변
    var count = 0        // 가변
    
    // 문자열 템플릿
    println("Hello, $name!")
    
    // 반복문
    for (i in 1..3) {
        count++
        println("Count: $count")
    }
    
    // 조건식
    val message = if (count > 0) "양수" else "0 이하"
    println("결과: $message")
}`
        },
        {
          title: "Java와 Kotlin 비교 - 데이터 클래스",
          language: "kotlin",
          code: `// Kotlin data class - 한 줄로 완성!
data class User(
    val id: Long,
    val name: String,
    val email: String
)

fun main() {
    // 객체 생성
    val user1 = User(1, "홍길동", "hong@example.com")
    val user2 = User(1, "홍길동", "hong@example.com")
    
    // toString() 자동 생성
    println(user1)  // User(id=1, name=홍길동, email=hong@example.com)
    
    // equals() 자동 생성
    println(user1 == user2)  // true (내용 비교)
    
    // copy() 자동 생성
    val user3 = user1.copy(name = "김철수")
    println(user3)  // User(id=1, name=김철수, email=hong@example.com)
    
    // 구조 분해
    val (id, name, email) = user1
    println("ID: $id, 이름: $name")
}`
        }
      ],
      keyPoints: [
        "Kotlin은 JVM에서 동작하며 Java와 100% 상호 운용됩니다.",
        "val은 불변(Java의 final), var는 가변 변수입니다.",
        "세미콜론이 필요 없고, 타입 추론으로 타입 선언을 생략할 수 있습니다.",
        "문자열 템플릿($변수, \${표현식})으로 문자열을 간결하게 조합합니다.",
        "data class는 toString, equals, hashCode, copy를 자동 생성합니다."
      ]
    },
    {
      id: "k0-m2",
      title: "Chapter 2: 변수와 타입",
      topic: "val/var, 기본 타입, Any/Unit/Nothing, 타입 변환",
      content: `
## 1. 변수 선언

### 1.1 val vs var

\`\`\`kotlin
val name = "홍길동"   // val = value, 불변 (Java의 final)
var age = 25          // var = variable, 가변

// val은 재할당 불가
// name = "김철수"    // 컴파일 에러!

// var는 재할당 가능
age = 26              // OK
\`\`\`

### 1.2 권장사항

> **기본적으로 val 사용**, 필요할 때만 var 사용

불변 변수는:
- 버그 예방
- 스레드 안전
- 코드 추론이 쉬움

---

## 2. 기본 타입

Kotlin은 **모든 것이 객체**입니다. 기본형(primitive)이 별도로 없습니다.

### 2.1 숫자 타입

| 타입 | 크기 | 범위 |
|------|------|------|
| Byte | 8bit | -128 ~ 127 |
| Short | 16bit | -32768 ~ 32767 |
| Int | 32bit | 약 ±21억 |
| Long | 64bit | 약 ±922경 |
| Float | 32bit | 단정밀도 |
| Double | 64bit | 배정밀도 |

\`\`\`kotlin
val intNum = 100          // Int
val longNum = 100L        // Long (L 접미사)
val floatNum = 3.14f      // Float (f 접미사)
val doubleNum = 3.14      // Double (기본)

// 언더스코어로 가독성 향상
val million = 1_000_000
val creditCard = 1234_5678_9012_3456L
\`\`\`

### 2.2 문자와 문자열

\`\`\`kotlin
val char: Char = 'A'          // 문자 (작은따옴표)
val string: String = "Hello"  // 문자열 (큰따옴표)

// 여러 줄 문자열
val multiline = """
    |첫 번째 줄
    |두 번째 줄
    |세 번째 줄
""".trimMargin()
\`\`\`

### 2.3 Boolean

\`\`\`kotlin
val isActive = true
val isComplete = false

// 논리 연산
val result = isActive && !isComplete  // true
\`\`\`

---

## 3. 특별한 타입

### 3.1 Any

모든 클래스의 **최상위 타입** (Java의 Object와 유사)

\`\`\`kotlin
val anything: Any = "Hello"
val number: Any = 42

fun printAnything(value: Any) {
    println(value)
}
\`\`\`

### 3.2 Unit

**반환값이 없음**을 나타냄 (Java의 void와 유사, 하지만 실제 객체)

\`\`\`kotlin
fun printMessage(msg: String): Unit {
    println(msg)
}

// Unit은 생략 가능
fun printMessage2(msg: String) {
    println(msg)
}
\`\`\`

### 3.3 Nothing

**절대 반환하지 않음**을 나타냄 (함수가 종료되지 않거나 예외를 던질 때)

\`\`\`kotlin
fun fail(message: String): Nothing {
    throw IllegalArgumentException(message)
}

// Nothing은 모든 타입의 하위 타입
val result: String = if (condition) "OK" else fail("Error")
\`\`\`

---

## 4. 타입 변환

Kotlin은 **암시적 타입 변환이 없습니다**. 명시적으로 변환해야 합니다.

\`\`\`kotlin
val intNum = 100
// val longNum: Long = intNum  // 컴파일 에러!

// 명시적 변환 필요
val longNum: Long = intNum.toLong()
\`\`\`

### 변환 메서드

\`\`\`kotlin
val num = 100

num.toByte()
num.toShort()
num.toInt()
num.toLong()
num.toFloat()
num.toDouble()
num.toChar()
num.toString()
\`\`\`

### 문자열 → 숫자

\`\`\`kotlin
val str = "123"
val num = str.toInt()             // 123
val numOrNull = str.toIntOrNull() // null if 변환 실패
\`\`\`

---

## 5. 타입 확인과 캐스팅

### 5.1 is 연산자 (타입 확인)

\`\`\`kotlin
val obj: Any = "Hello"

if (obj is String) {
    // 스마트 캐스트: 자동으로 String 타입으로 인식
    println(obj.length)  // String 메서드 사용 가능
}
\`\`\`

### 5.2 as 연산자 (명시적 캐스팅)

\`\`\`kotlin
val obj: Any = "Hello"

// 안전하지 않은 캐스팅 (실패 시 예외)
val str: String = obj as String

// 안전한 캐스팅 (실패 시 null)
val str2: String? = obj as? String
\`\`\`

### 5.3 스마트 캐스트

\`\`\`kotlin
fun process(value: Any) {
    when (value) {
        is String -> println("문자열 길이: \${value.length}")
        is Int -> println("정수의 제곱: \${value * value}")
        is List<*> -> println("리스트 크기: \${value.size}")
        else -> println("알 수 없는 타입")
    }
}
\`\`\`
`,
      codeExamples: [
        {
          title: "변수와 타입 기본",
          language: "kotlin",
          code: `fun main() {
    // 1. val vs var
    val name = "홍길동"    // 불변
    var age = 25           // 가변
    
    age = 26  // OK
    // name = "김철수"  // 컴파일 에러!
    
    // 2. 타입 추론 vs 명시적 선언
    val score = 100                // Int 추론
    val grade: String = "A"        // 명시적
    
    // 3. 숫자 타입
    val byte: Byte = 127
    val short: Short = 32000
    val int = 2_000_000_000        // 언더스코어 가능
    val long = 9_000_000_000L      // L 접미사
    val float = 3.14f              // f 접미사
    val double = 3.141592653589793
    
    // 4. 타입 변환 (명시적!)
    val intNum = 100
    val longNum = intNum.toLong()
    val strNum = intNum.toString()
    
    println("int: $intNum, long: $longNum, string: $strNum")
}`
        },
        {
          title: "스마트 캐스트와 타입 확인",
          language: "kotlin",
          code: `fun describe(obj: Any): String {
    return when (obj) {
        is String -> "문자열: '$obj' (길이: \${obj.length})"
        is Int -> "정수: $obj (제곱: \${obj * obj})"
        is Double -> "실수: \${"%.2f".format(obj)}"
        is Boolean -> if (obj) "참" else "거짓"
        is List<*> -> "리스트: \${obj.size}개 요소"
        else -> "알 수 없는 타입: \${obj::class.simpleName}"
    }
}

fun main() {
    println(describe("Hello"))      // 문자열: 'Hello' (길이: 5)
    println(describe(42))           // 정수: 42 (제곱: 1764)
    println(describe(3.14159))      // 실수: 3.14
    println(describe(true))         // 참
    println(describe(listOf(1,2,3))) // 리스트: 3개 요소
    
    // 안전한 캐스팅
    val any: Any = "Kotlin"
    val str: String? = any as? String
    val num: Int? = any as? Int
    
    println("str: $str, num: $num")  // str: Kotlin, num: null
}`
        }
      ],
      keyPoints: [
        "val은 불변(재할당 불가), var는 가변입니다. 기본적으로 val 사용을 권장합니다.",
        "Kotlin은 모든 것이 객체입니다. Int, Boolean 등도 클래스입니다.",
        "암시적 타입 변환이 없습니다. toInt(), toLong() 등으로 명시적 변환이 필요합니다.",
        "Any는 최상위 타입, Unit은 반환값 없음, Nothing은 절대 반환 안 함을 의미합니다.",
        "is로 타입 확인 시 스마트 캐스트가 적용되어 별도 캐스팅 없이 해당 타입으로 사용 가능합니다."
      ]
    },
    {
      id: "k0-m3",
      title: "Chapter 3: Null Safety",
      topic: "Nullable 타입, ?. ?:, !!, let, lateinit",
      content: `
## 1. Null이 문제인 이유

Java에서 가장 흔한 에러: **NullPointerException (NPE)**

\`\`\`java
// Java
String name = null;
int length = name.length();  // 💥 NullPointerException!
\`\`\`

Kotlin은 **컴파일 시점**에 NPE를 방지합니다.

---

## 2. Nullable 타입

### 2.1 기본은 Non-null

\`\`\`kotlin
var name: String = "홍길동"
name = null  // 컴파일 에러!
\`\`\`

### 2.2 ?로 Nullable 선언

\`\`\`kotlin
var name: String? = "홍길동"  // ? 추가
name = null  // OK
\`\`\`

### 2.3 Non-null vs Nullable

\`\`\`kotlin
fun process(nonNull: String, nullable: String?) {
    println(nonNull.length)   // OK
    // println(nullable.length)  // 컴파일 에러!
}
\`\`\`

---

## 3. 안전 호출 연산자 (?.)

null이면 호출하지 않고 **null 반환**

\`\`\`kotlin
val name: String? = null
val length: Int? = name?.length  // null
\`\`\`

### 체이닝

\`\`\`kotlin
data class Person(val name: String, val address: Address?)
data class Address(val city: String?)

val person: Person? = getPerson()
val city = person?.address?.city  // 어디서든 null이면 null
\`\`\`

---

## 4. 엘비스 연산자 (?:)

null일 때 **기본값 제공**

\`\`\`kotlin
val name: String? = null
val displayName = name ?: "이름 없음"  // "이름 없음"
\`\`\`

### 조합 사용

\`\`\`kotlin
val length = name?.length ?: 0
val city = person?.address?.city ?: "서울"
\`\`\`

### 예외 던지기

\`\`\`kotlin
val name = person?.name ?: throw IllegalStateException("이름 필수")
\`\`\`

---

## 5. Non-null 단언 (!!)

**"나는 null이 아님을 보장한다"** - 위험!

\`\`\`kotlin
val name: String? = "홍길동"
val length = name!!.length  // null이면 NPE 발생!
\`\`\`

> ⚠️ **가능하면 !! 사용을 피하세요!** 
> ?. 또는 ?: 를 대신 사용하세요.

---

## 6. let 함수

null이 아닐 때만 블록 실행

\`\`\`kotlin
val name: String? = "홍길동"

name?.let {
    println("이름: $it")   // it은 null이 아닌 name
    println("길이: \${it.length}")
}

// null이면 let 블록 실행 안 함
val nullName: String? = null
nullName?.let {
    println("실행 안 됨")
}
\`\`\`

### 조합

\`\`\`kotlin
val result = name?.let {
    it.uppercase()
} ?: "기본값"
\`\`\`

---

## 7. 늦은 초기화 (lateinit)

**나중에 반드시 초기화**할 변수

\`\`\`kotlin
class MyClass {
    // var만 가능, Nullable 아님
    lateinit var name: String
    
    fun init() {
        name = "홍길동"
    }
    
    fun printName() {
        if (::name.isInitialized) {  // 초기화 여부 확인
            println(name)
        }
    }
}
\`\`\`

### 사용 조건
- **var**만 가능 (val 불가)
- **Non-null** 타입만 가능
- **기본형** 불가 (Int, Boolean 등)
- 클래스 **프로퍼티**로만 사용

---

## 8. lazy 초기화

처음 접근할 때 **한 번만** 초기화

\`\`\`kotlin
val expensiveValue: String by lazy {
    println("계산 중...")
    "계산된 값"
}

fun main() {
    println("프로그램 시작")
    println(expensiveValue)  // 여기서 "계산 중..." 출력
    println(expensiveValue)  // 캐시된 값 사용
}
\`\`\`

### lateinit vs lazy

| 특성 | lateinit | lazy |
|------|----------|------|
| 적용 대상 | var | val |
| 초기화 시점 | 수동 | 첫 접근 시 자동 |
| 사용 시나리오 | DI, 테스트 | 비용 큰 연산 지연 |
`,
      codeExamples: [
        {
          title: "Null Safety 기본 연산자",
          language: "kotlin",
          code: `data class User(val name: String, val email: String?)

fun main() {
    val user1: User? = User("홍길동", "hong@example.com")
    val user2: User? = User("김철수", null)
    val user3: User? = null
    
    // 1. 안전 호출 (?.)
    println(user1?.name)  // 홍길동
    println(user3?.name)  // null
    
    // 2. 엘비스 연산자 (?:)
    println(user2?.email ?: "이메일 없음")  // 이메일 없음
    
    // 3. let과 조합
    user1?.let { u ->
        println("\${u.name}의 이메일: \${u.email}")
    }
    
    // 4. 안전한 체이닝
    val emailLength = user1?.email?.length ?: 0
    println("이메일 길이: $emailLength")
    
    // 5. null 체크 후 스마트 캐스트
    if (user1 != null) {
        // 여기서 user1은 자동으로 non-null
        println("확인된 이름: \${user1.name}")
    }
}`
        },
        {
          title: "let, also, run 활용",
          language: "kotlin",
          code: `fun processUser(userId: String?): String {
    // let: null이 아닐 때만 실행, 결과 반환
    val result = userId?.let { id ->
        fetchUser(id)?.let { user ->
            "사용자: \${user.name}"
        }
    } ?: "사용자를 찾을 수 없습니다"
    
    return result
}

// 실제 사용 예
data class User(val id: String, val name: String)

fun fetchUser(id: String): User? {
    return if (id == "1") User("1", "홍길동") else null
}

fun main() {
    println(processUser("1"))     // 사용자: 홍길동
    println(processUser("999"))   // 사용자를 찾을 수 없습니다
    println(processUser(null))    // 사용자를 찾을 수 없습니다
    
    // also: 부수 효과 (로깅 등)
    val user = fetchUser("1")?.also {
        println("사용자 조회됨: \${it.name}")
    }
    
    // run: 객체의 메서드 여러 개 호출
    val length = "Hello"?.run {
        println("처리 중: $this")
        this.length
    }
    println("길이: $length")
}`
        }
      ],
      keyPoints: [
        "Kotlin은 타입 시스템에서 Nullable(String?)과 Non-null(String)을 구분합니다.",
        "안전 호출(?.)은 null이면 null 반환, 엘비스 연산자(?:)는 null일 때 기본값을 제공합니다.",
        "!!는 NPE를 발생시킬 수 있으므로 가능하면 피하고, ?.이나 ?:를 사용하세요.",
        "let은 null이 아닐 때만 블록을 실행하며, 안전 호출과 함께 자주 사용됩니다.",
        "lateinit은 나중에 초기화할 var, lazy는 첫 접근 시 초기화되는 val에 사용합니다."
      ]
    },
    {
      id: "k0-m4",
      title: "Chapter 4: 조건문과 반복문",
      topic: "if 표현식, when, for, while, 범위 연산자",
      content: `
## 1. if 표현식

Kotlin의 if는 **표현식**입니다. 값을 반환할 수 있습니다.

### 1.1 기본 if문

\`\`\`kotlin
val score = 85

if (score >= 90) {
    println("A")
} else if (score >= 80) {
    println("B")
} else {
    println("C")
}
\`\`\`

### 1.2 if 표현식 (값 반환)

\`\`\`kotlin
val grade = if (score >= 90) "A" 
            else if (score >= 80) "B" 
            else "C"

// Java의 삼항 연산자(? :) 대체
val max = if (a > b) a else b
\`\`\`

> Kotlin에는 **삼항 연산자가 없습니다**. if 표현식으로 대체합니다.

---

## 2. when 표현식

Java의 switch보다 **훨씬 강력**합니다.

### 2.1 기본 when

\`\`\`kotlin
val grade = 'B'

when (grade) {
    'A' -> println("훌륭합니다!")
    'B' -> println("좋습니다!")
    'C' -> println("보통입니다.")
    'D', 'F' -> println("더 노력하세요.")  // 여러 값
    else -> println("알 수 없는 학점")
}
\`\`\`

### 2.2 when 표현식 (값 반환)

\`\`\`kotlin
val message = when (grade) {
    'A' -> "훌륭합니다!"
    'B' -> "좋습니다!"
    else -> "계속 노력하세요."
}
\`\`\`

### 2.3 범위와 조건

\`\`\`kotlin
val score = 85

val grade = when (score) {
    in 90..100 -> "A"
    in 80 until 90 -> "B"
    in 70 until 80 -> "C"
    else -> "F"
}
\`\`\`

### 2.4 타입 검사

\`\`\`kotlin
fun describe(obj: Any): String = when (obj) {
    is String -> "문자열 길이: \${obj.length}"
    is Int -> "숫자의 2배: \${obj * 2}"
    is List<*> -> "리스트 크기: \${obj.size}"
    null -> "null입니다"
    else -> "알 수 없음"
}
\`\`\`

### 2.5 조건식 when (인자 없이)

\`\`\`kotlin
val temperature = 25

val weather = when {
    temperature <= 0 -> "영하"
    temperature < 10 -> "추움"
    temperature < 20 -> "선선함"
    temperature < 30 -> "따뜻함"
    else -> "더움"
}
\`\`\`

---

## 3. for 반복문

### 3.1 범위 순회

\`\`\`kotlin
// 1부터 5까지 (5 포함)
for (i in 1..5) {
    print("$i ")  // 1 2 3 4 5
}

// 1부터 4까지 (5 미포함)
for (i in 1 until 5) {
    print("$i ")  // 1 2 3 4
}

// 역순
for (i in 5 downTo 1) {
    print("$i ")  // 5 4 3 2 1
}

// 증가폭
for (i in 0..10 step 2) {
    print("$i ")  // 0 2 4 6 8 10
}
\`\`\`

### 3.2 컬렉션 순회

\`\`\`kotlin
val fruits = listOf("사과", "바나나", "오렌지")

// 요소만
for (fruit in fruits) {
    println(fruit)
}

// 인덱스와 함께
for ((index, fruit) in fruits.withIndex()) {
    println("$index: $fruit")
}
\`\`\`

### 3.3 repeat

\`\`\`kotlin
repeat(3) {
    println("반복: $it")  // it은 0, 1, 2
}
\`\`\`

---

## 4. while / do-while

Java와 동일합니다.

\`\`\`kotlin
// while
var count = 0
while (count < 5) {
    println(count++)
}

// do-while (최소 1회 실행)
do {
    val input = readLine()
} while (input != "quit")
\`\`\`

---

## 5. break와 continue

### 5.1 기본 사용

\`\`\`kotlin
for (i in 1..10) {
    if (i == 5) break     // 루프 종료
    if (i % 2 == 0) continue  // 다음 반복으로
    println(i)  // 1, 3
}
\`\`\`

### 5.2 레이블 (중첩 루프 탈출)

\`\`\`kotlin
outer@ for (i in 1..3) {
    for (j in 1..3) {
        if (i == 2 && j == 2) break@outer  // 바깥 루프 탈출
        println("$i, $j")
    }
}
\`\`\`

---

## 6. 범위 (Range)

\`\`\`kotlin
val range1 = 1..10      // 1 ~ 10 (10 포함)
val range2 = 1 until 10 // 1 ~ 9 (10 미포함)
val range3 = 10 downTo 1 // 10 ~ 1 (역순)

// 포함 여부 확인
println(5 in range1)     // true
println(0 !in range1)    // true

// 문자 범위
val letters = 'a'..'z'
println('m' in letters)  // true
\`\`\`
`,
      codeExamples: [
        {
          title: "if와 when 표현식",
          language: "kotlin",
          code: `fun main() {
    val score = 85
    
    // 1. if 표현식 (삼항 연산자 대체)
    val passed = if (score >= 60) "합격" else "불합격"
    println("결과: $passed")
    
    // 2. when 표현식
    val grade = when (score) {
        in 90..100 -> 'A'
        in 80 until 90 -> 'B'
        in 70 until 80 -> 'C'
        in 60 until 70 -> 'D'
        else -> 'F'
    }
    println("학점: $grade")
    
    // 3. when 타입 검사
    val items: List<Any> = listOf("Hello", 42, 3.14, true)
    for (item in items) {
        val description = when (item) {
            is String -> "문자열: $item"
            is Int -> "정수: $item"
            is Double -> "실수: $item"
            is Boolean -> "불린: $item"
            else -> "기타: $item"
        }
        println(description)
    }
    
    // 4. 조건식 when
    val time = 14
    val greeting = when {
        time < 12 -> "좋은 아침입니다"
        time < 18 -> "좋은 오후입니다"
        else -> "좋은 저녁입니다"
    }
    println(greeting)
}`
        },
        {
          title: "for 반복문과 범위",
          language: "kotlin",
          code: `fun main() {
    // 1. 다양한 범위
    println("1..5:")
    for (i in 1..5) print("$i ")  // 1 2 3 4 5
    println()
    
    println("1 until 5:")
    for (i in 1 until 5) print("$i ")  // 1 2 3 4
    println()
    
    println("5 downTo 1:")
    for (i in 5 downTo 1) print("$i ")  // 5 4 3 2 1
    println()
    
    println("0..10 step 2:")
    for (i in 0..10 step 2) print("$i ")  // 0 2 4 6 8 10
    println()
    
    // 2. 컬렉션 순회
    val languages = listOf("Kotlin", "Java", "Swift")
    
    println("\n언어 목록:")
    for ((index, lang) in languages.withIndex()) {
        println("  $index: $lang")
    }
    
    // 3. forEach (람다)
    println("\nforEach 사용:")
    languages.forEach { println("  - $it") }
    
    // 4. 중첩 루프와 레이블
    println("\n구구단 일부:")
    outer@ for (i in 2..9) {
        for (j in 1..9) {
            if (j > 3) break  // 내부 루프만 탈출
            print("$i×$j=\${i*j} ")
        }
        println()
        if (i >= 4) break@outer  // 외부 루프 탈출
    }
}`
        }
      ],
      keyPoints: [
        "Kotlin의 if는 표현식으로 값을 반환할 수 있어 삼항 연산자가 필요하지 않습니다.",
        "when은 Java의 switch보다 강력하며, 범위(in), 타입(is), 조건식을 사용할 수 있습니다.",
        "for 루프는 in 키워드로 범위나 컬렉션을 순회합니다. (.., until, downTo, step)",
        "withIndex()로 인덱스와 요소를 함께 가져올 수 있습니다.",
        "레이블(@label)로 중첩 루프에서 특정 루프를 break/continue 할 수 있습니다."
      ]
    },
    {
      id: "k0-m5",
      title: "Chapter 5: 함수",
      topic: "함수 정의, 기본 인자, 이름 있는 인자, 확장 함수, 중위 함수",
      content: `
## 1. 함수 정의

### 1.1 기본 형식

\`\`\`kotlin
fun 함수명(매개변수: 타입): 반환타입 {
    return 결과
}
\`\`\`

\`\`\`kotlin
fun add(a: Int, b: Int): Int {
    return a + b
}
\`\`\`

### 1.2 단일 표현식 함수

본문이 표현식 하나면 **중괄호와 return 생략** 가능

\`\`\`kotlin
fun add(a: Int, b: Int): Int = a + b

// 반환 타입도 추론 가능
fun add(a: Int, b: Int) = a + b
\`\`\`

### 1.3 Unit (반환값 없음)

\`\`\`kotlin
fun printMessage(msg: String): Unit {
    println(msg)
}

// Unit 생략 가능
fun printMessage(msg: String) {
    println(msg)
}
\`\`\`

---

## 2. 기본 인자 (Default Arguments)

매개변수에 **기본값**을 지정할 수 있습니다.

\`\`\`kotlin
fun greet(name: String, greeting: String = "안녕하세요") {
    println("$greeting, $name!")
}

greet("홍길동")               // 안녕하세요, 홍길동!
greet("홍길동", "반갑습니다")  // 반갑습니다, 홍길동!
\`\`\`

### Java 오버로딩과 비교

\`\`\`java
// Java - 여러 오버로딩 필요
void greet(String name) { greet(name, "안녕하세요"); }
void greet(String name, String greeting) { ... }
\`\`\`

\`\`\`kotlin
// Kotlin - 하나로 해결
fun greet(name: String, greeting: String = "안녕하세요") { ... }
\`\`\`

---

## 3. 이름 있는 인자 (Named Arguments)

매개변수 이름을 지정하여 호출

\`\`\`kotlin
fun createUser(
    name: String,
    age: Int = 0,
    email: String = "",
    isActive: Boolean = true
): String {
    return "User($name, $age, $email, $isActive)"
}

// 이름 있는 인자 사용
val user = createUser(
    name = "홍길동",
    email = "hong@example.com"
    // age와 isActive는 기본값 사용
)
\`\`\`

### 장점
- 코드 **가독성** 향상
- 매개변수 **순서와 무관**하게 호출 가능
- 어떤 값이 어떤 매개변수인지 명확

---

## 4. 가변 인자 (vararg)

\`\`\`kotlin
fun printAll(vararg messages: String) {
    for (msg in messages) {
        println(msg)
    }
}

printAll("A", "B", "C")
\`\`\`

### 배열 전달 시 스프레드 연산자 (*)

\`\`\`kotlin
val items = arrayOf("X", "Y", "Z")
printAll(*items)  // 배열을 펼쳐서 전달
\`\`\`

---

## 5. 확장 함수 (Extension Functions)

**기존 클래스에 함수 추가** (상속 없이!)

\`\`\`kotlin
// String 클래스에 함수 추가
fun String.addExclamation(): String {
    return this + "!"
}

val text = "Hello"
println(text.addExclamation())  // Hello!
\`\`\`

### 실용적인 예시

\`\`\`kotlin
// Int에 팩토리얼 함수 추가
fun Int.factorial(): Long {
    return if (this <= 1) 1 else this * (this - 1).factorial()
}

println(5.factorial())  // 120

// String에 유효성 검사 추가
fun String.isValidEmail(): Boolean {
    return this.contains("@") && this.contains(".")
}

println("test@example.com".isValidEmail())  // true
\`\`\`

### 확장 프로퍼티

\`\`\`kotlin
val String.lastChar: Char
    get() = this[this.length - 1]

println("Hello".lastChar)  // o
\`\`\`

---

## 6. 중위 함수 (Infix Functions)

\`.\`과 \`()\` 없이 호출 가능

### 조건
1. 멤버 함수 또는 확장 함수
2. 매개변수가 **정확히 1개**
3. \`infix\` 키워드 사용

\`\`\`kotlin
infix fun Int.times(str: String) = str.repeat(this)

// 호출
val result = 3 times "Hello "  // "Hello Hello Hello "
\`\`\`

### 내장 중위 함수

\`\`\`kotlin
val range = 1 to 10      // Pair(1, 10)
val check = 5 in 1..10   // true
\`\`\`

---

## 7. 지역 함수 (Local Functions)

함수 안에 함수 정의

\`\`\`kotlin
fun processUser(name: String, email: String) {
    // 지역 함수: 외부에서 접근 불가
    fun validate(value: String, fieldName: String) {
        if (value.isBlank()) {
            throw IllegalArgumentException("$fieldName is empty")
        }
    }
    
    validate(name, "Name")
    validate(email, "Email")
    
    println("Processing $name ($email)")
}
\`\`\`
`,
      codeExamples: [
        {
          title: "함수 정의와 기본/이름 인자",
          language: "kotlin",
          code: `// 1. 다양한 함수 정의 방식
fun add(a: Int, b: Int): Int {
    return a + b
}

fun multiply(a: Int, b: Int) = a * b  // 단일 표현식

fun greet(name: String) {  // Unit 반환
    println("Hello, $name!")
}

// 2. 기본 인자
fun createTag(
    name: String,
    className: String = "",
    id: String = ""
): String {
    val classAttr = if (className.isNotEmpty()) " class=\"$className\"" else ""
    val idAttr = if (id.isNotEmpty()) " id=\"$id\"" else ""
    return "<$name$classAttr$idAttr>"
}

// 3. 이름 있는 인자
fun main() {
    println(add(5, 3))
    println(multiply(4, 2))
    greet("Kotlin")
    
    // 기본 인자 활용
    println(createTag("div"))                           // <div>
    println(createTag("div", className = "container"))  // <div class="container">
    println(createTag("div", id = "main"))              // <div id="main">
    println(createTag(
        name = "button",
        className = "btn",
        id = "submit"
    ))  // <button class="btn" id="submit">
}`
        },
        {
          title: "확장 함수와 중위 함수",
          language: "kotlin",
          code: `// 1. String 확장 함수
fun String.toTitleCase(): String {
    return this.split(" ")
        .joinToString(" ") { 
            it.lowercase().replaceFirstChar { c -> c.uppercase() }
        }
}

fun String.truncate(maxLength: Int, suffix: String = "..."): String {
    return if (this.length > maxLength) {
        this.take(maxLength - suffix.length) + suffix
    } else {
        this
    }
}

// 2. 확장 프로퍼티
val String.wordCount: Int
    get() = this.split("\\s+".toRegex()).size

// 3. 중위 함수
infix fun Int.pow(exponent: Int): Long {
    var result = 1L
    repeat(exponent) { result *= this }
    return result
}

infix fun String.concat(other: String) = this + other

fun main() {
    // 확장 함수 사용
    println("hello world kotlin".toTitleCase())  // Hello World Kotlin
    
    val longText = "이것은 매우 긴 문자열입니다"
    println(longText.truncate(10))  // 이것은 매우 ...
    
    // 확장 프로퍼티
    println("Hello World Kotlin".wordCount)  // 3
    
    // 중위 함수
    println(2 pow 10)  // 1024
    println("Hello" concat " World")  // Hello World
}`
        }
      ],
      keyPoints: [
        "단일 표현식 함수는 = 로 정의하며 return과 중괄호를 생략할 수 있습니다.",
        "기본 인자로 Java의 오버로딩을 대체할 수 있습니다.",
        "이름 있는 인자를 사용하면 가독성이 높아지고 순서와 무관하게 호출 가능합니다.",
        "확장 함수는 기존 클래스를 수정하지 않고 새 함수를 추가합니다. (fun 수신타입.함수명())",
        "중위 함수는 infix 키워드로 정의하며, 매개변수가 1개일 때 . 과 () 없이 호출 가능합니다."
      ]
    },
    {
      id: "k0-m6",
      title: "Chapter 6: 클래스와 객체",
      topic: "생성자, 프로퍼티, data class, object, companion object",
      content: `
## 1. 클래스 정의

### 1.1 기본 클래스

\`\`\`kotlin
class Person {
    var name: String = ""
    var age: Int = 0
}

val person = Person()
person.name = "홍길동"
person.age = 25
\`\`\`

### 1.2 주 생성자 (Primary Constructor)

\`\`\`kotlin
class Person(val name: String, var age: Int)

val person = Person("홍길동", 25)
println(person.name)  // 홍길동
\`\`\`

### 1.3 init 블록

\`\`\`kotlin
class Person(val name: String, var age: Int) {
    init {
        println("객체 생성: $name")
        require(age >= 0) { "나이는 음수일 수 없습니다" }
    }
}
\`\`\`

---

## 2. 프로퍼티

### 2.1 기본 프로퍼티

\`\`\`kotlin
class Person {
    var name: String = ""      // 가변 (getter + setter)
    val birthYear: Int = 1999  // 불변 (getter만)
}
\`\`\`

### 2.2 커스텀 getter/setter

\`\`\`kotlin
class Person(val birthYear: Int) {
    val age: Int
        get() = java.time.Year.now().value - birthYear
    
    var name: String = ""
        set(value) {
            field = value.trim().uppercase()  // field = 백킹 필드
        }
}
\`\`\`

---

## 3. data class

자동으로 **equals, hashCode, toString, copy, componentN** 생성

\`\`\`kotlin
data class User(
    val id: Long,
    val name: String,
    val email: String
)

val user1 = User(1, "홍길동", "hong@example.com")
val user2 = user1.copy(name = "김철수")  // id, email 유지

// 구조 분해
val (id, name, email) = user1
\`\`\`

---

## 4. object (싱글톤)

\`\`\`kotlin
object DatabaseManager {
    fun connect() = println("연결됨")
}

DatabaseManager.connect()  // 싱글톤 인스턴스 사용
\`\`\`

---

## 5. companion object

클래스 내부에 **정적 멤버** 정의

\`\`\`kotlin
class User private constructor(val name: String) {
    companion object {
        fun create(name: String): User {
            return User(name)
        }
        
        const val MAX_NAME_LENGTH = 50
    }
}

val user = User.create("홍길동")
println(User.MAX_NAME_LENGTH)
\`\`\`
`,
      codeExamples: [
        {
          title: "클래스와 생성자",
          language: "kotlin",
          code: `// 주 생성자 + 기본값
class Person(
    val name: String,
    var age: Int = 0,
    val email: String = ""
) {
    // init 블록
    init {
        println("Person 생성: $name")
    }
    
    // 커스텀 프로퍼티
    val isAdult: Boolean
        get() = age >= 18
    
    // 메서드
    fun introduce() = "안녕하세요, $name입니다. (\${age}세)"
}

fun main() {
    val p1 = Person("홍길동", 25, "hong@example.com")
    val p2 = Person("김철수")  // 기본값 사용
    
    println(p1.introduce())
    println("성인: \${p1.isAdult}")
}`
        },
        {
          title: "data class와 object",
          language: "kotlin",
          code: `// data class: 데이터 저장 목적
data class Point(val x: Int, val y: Int)

// object: 싱글톤
object Logger {
    fun log(message: String) {
        println("[LOG] $message")
    }
}

// companion object: 정적 멤버
class User private constructor(val id: Int, val name: String) {
    companion object Factory {
        private var nextId = 1
        
        fun create(name: String): User {
            return User(nextId++, name)
        }
    }
}

fun main() {
    // data class
    val p1 = Point(1, 2)
    val p2 = Point(1, 2)
    println(p1 == p2)  // true (값 비교)
    println(p1.copy(x = 10))  // Point(x=10, y=2)
    
    // 구조 분해
    val (x, y) = p1
    println("x=$x, y=$y")
    
    // object
    Logger.log("프로그램 시작")
    
    // companion object
    val user1 = User.create("홍길동")
    val user2 = User.create("김철수")
    println("\${user1.id}: \${user1.name}")  // 1: 홍길동
    println("\${user2.id}: \${user2.name}")  // 2: 김철수
}`
        }
      ],
      keyPoints: [
        "주 생성자는 클래스 헤더에 선언하며, val/var로 프로퍼티를 바로 정의할 수 있습니다.",
        "init 블록은 주 생성자 실행 직후 호출됩니다.",
        "data class는 equals, hashCode, toString, copy, componentN을 자동 생성합니다.",
        "object는 싱글톤 객체를, companion object는 클래스 내부 정적 멤버를 정의합니다.",
        "프로퍼티는 커스텀 getter/setter를 가질 수 있으며, field 키워드로 백킹 필드에 접근합니다."
      ]
    },
    {
      id: "k0-m7",
      title: "Chapter 7: 상속과 인터페이스",
      topic: "open/final, 상속, override, 인터페이스, sealed class",
      content: `
## 1. 상속

### 1.1 기본: 모든 클래스는 final

\`\`\`kotlin
class Parent  // 기본적으로 final, 상속 불가

open class OpenParent  // open으로 상속 허용

class Child : OpenParent()
\`\`\`

### 1.2 메서드 오버라이드

\`\`\`kotlin
open class Animal {
    open fun sound() = println("...")
}

class Dog : Animal() {
    override fun sound() = println("멍멍!")
}
\`\`\`

### 1.3 생성자 전달

\`\`\`kotlin
open class Person(val name: String)

class Student(name: String, val grade: Int) : Person(name)
\`\`\`

---

## 2. 인터페이스

\`\`\`kotlin
interface Flyable {
    fun fly()  // 추상 메서드
    
    fun description() = "날 수 있음"  // 기본 구현
}

class Bird : Flyable {
    override fun fly() = println("새가 날아갑니다")
}
\`\`\`

### 다중 구현

\`\`\`kotlin
interface A { fun greet() = "A" }
interface B { fun greet() = "B" }

class C : A, B {
    override fun greet() = super<A>.greet() + super<B>.greet()
}
\`\`\`

---

## 3. 추상 클래스

\`\`\`kotlin
abstract class Shape {
    abstract fun area(): Double
    
    fun describe() = "도형입니다"
}

class Circle(val radius: Double) : Shape() {
    override fun area() = Math.PI * radius * radius
}
\`\`\`

---

## 4. sealed class

**제한된 상속 계층** - 같은 파일 내에서만 상속 가능

\`\`\`kotlin
sealed class Result<out T> {
    data class Success<T>(val data: T) : Result<T>()
    data class Error(val message: String) : Result<Nothing>()
    object Loading : Result<Nothing>()
}

fun handle(result: Result<String>) = when (result) {
    is Result.Success -> println("성공: \${result.data}")
    is Result.Error -> println("에러: \${result.message}")
    Result.Loading -> println("로딩 중...")
    // else 필요 없음 - 모든 경우 처리됨
}
\`\`\`
`,
      codeExamples: [
        {
          title: "상속과 오버라이드",
          language: "kotlin",
          code: `open class Vehicle(val brand: String) {
    open fun start() = println("$brand 시동")
    open fun stop() = println("$brand 정지")
}

class Car(brand: String, val model: String) : Vehicle(brand) {
    override fun start() {
        super.start()  // 부모 호출
        println("$model 출발 준비")
    }
}

class ElectricCar(brand: String, model: String) : Car(brand, model) {
    override fun start() {
        println("배터리 체크...")
        super.start()
    }
}

fun main() {
    val car = Car("현대", "소나타")
    car.start()
    // 현대 시동
    // 소나타 출발 준비
    
    val eCar = ElectricCar("테슬라", "모델3")
    eCar.start()
    // 배터리 체크...
    // 테슬라 시동
    // 모델3 출발 준비
}`
        },
        {
          title: "sealed class 활용",
          language: "kotlin",
          code: `// API 응답 모델링
sealed class ApiResult<out T> {
    data class Success<T>(val data: T) : ApiResult<T>()
    data class Error(val code: Int, val message: String) : ApiResult<Nothing>()
    object Loading : ApiResult<Nothing>()
}

// 사용자 데이터
data class User(val id: Int, val name: String)

// API 호출 시뮬레이션
fun fetchUser(id: Int): ApiResult<User> {
    return when (id) {
        1 -> ApiResult.Success(User(1, "홍길동"))
        -1 -> ApiResult.Error(404, "사용자 없음")
        else -> ApiResult.Loading
    }
}

// 결과 처리 (exhaustive when)
fun handleResult(result: ApiResult<User>) {
    when (result) {
        is ApiResult.Success -> {
            println("사용자: \${result.data.name}")
        }
        is ApiResult.Error -> {
            println("에러 \${result.code}: \${result.message}")
        }
        ApiResult.Loading -> {
            println("로딩 중...")
        }
        // else 필요 없음!
    }
}

fun main() {
    handleResult(fetchUser(1))   // 사용자: 홍길동
    handleResult(fetchUser(-1))  // 에러 404: 사용자 없음
}`
        }
      ],
      keyPoints: [
        "Kotlin 클래스는 기본적으로 final입니다. 상속을 허용하려면 open 키워드가 필요합니다.",
        "메서드 오버라이드에도 open과 override 키워드가 필요합니다.",
        "인터페이스는 추상 메서드와 기본 구현을 모두 가질 수 있습니다.",
        "sealed class는 제한된 상속 계층을 정의하며, when에서 else 없이 완전한 분기가 가능합니다.",
        "상속 시 부모 생성자 호출은 : ParentClass(args) 형태로 합니다."
      ]
    },
    {
      id: "k0-m8",
      title: "Chapter 8: 컬렉션",
      topic: "List, Set, Map, 불변/가변, 컬렉션 함수",
      content: `
## 1. 컬렉션 종류

### 불변 (Immutable) vs 가변 (Mutable)

| 불변 | 가변 |
|------|------|
| listOf() | mutableListOf() |
| setOf() | mutableSetOf() |
| mapOf() | mutableMapOf() |

---

## 2. List

\`\`\`kotlin
// 불변 리스트
val immutableList = listOf("a", "b", "c")
// immutableList.add("d")  // 컴파일 에러!

// 가변 리스트
val mutableList = mutableListOf("a", "b", "c")
mutableList.add("d")
mutableList.remove("a")
\`\`\`

---

## 3. Set

\`\`\`kotlin
val set = setOf(1, 2, 3, 3, 3)  // 중복 제거
println(set)  // [1, 2, 3]

val mutableSet = mutableSetOf<String>()
mutableSet.add("A")
mutableSet.add("A")  // 무시됨
\`\`\`

---

## 4. Map

\`\`\`kotlin
val map = mapOf("a" to 1, "b" to 2)
println(map["a"])  // 1

val mutableMap = mutableMapOf<String, Int>()
mutableMap["x"] = 10
mutableMap["y"] = 20
\`\`\`

---

## 5. 컬렉션 함수

### 5.1 filter / map

\`\`\`kotlin
val numbers = listOf(1, 2, 3, 4, 5)

val evens = numbers.filter { it % 2 == 0 }  // [2, 4]
val doubled = numbers.map { it * 2 }  // [2, 4, 6, 8, 10]
\`\`\`

### 5.2 기타 유용한 함수

\`\`\`kotlin
numbers.first()           // 1
numbers.last()            // 5
numbers.take(3)           // [1, 2, 3]
numbers.drop(2)           // [3, 4, 5]
numbers.sorted()          // 정렬
numbers.reversed()        // 역순
numbers.sum()             // 15
numbers.average()         // 3.0
numbers.any { it > 3 }    // true
numbers.all { it > 0 }    // true
numbers.none { it < 0 }   // true
numbers.count { it > 2 }  // 3
\`\`\`

### 5.3 groupBy / associateBy

\`\`\`kotlin
data class Person(val name: String, val age: Int)

val people = listOf(
    Person("홍길동", 25),
    Person("김철수", 30),
    Person("이영희", 25)
)

val byAge = people.groupBy { it.age }
// {25=[Person(홍길동,25), Person(이영희,25)], 30=[Person(김철수,30)]}

val byName = people.associateBy { it.name }
// {홍길동=Person(...), 김철수=Person(...), ...}
\`\`\`
`,
      codeExamples: [
        {
          title: "컬렉션 기본 사용",
          language: "kotlin",
          code: `fun main() {
    // List
    val fruits = listOf("사과", "바나나", "오렌지")
    val mutableFruits = fruits.toMutableList()
    mutableFruits.add("포도")
    
    // Set  
    val uniqueNumbers = setOf(1, 2, 2, 3, 3, 3)
    println("Set: $uniqueNumbers")  // [1, 2, 3]
    
    // Map
    val scores = mapOf(
        "홍길동" to 85,
        "김철수" to 90,
        "이영희" to 78
    )
    println("홍길동 점수: \${scores["홍길동"]}")
    
    // 기본 연산
    println("첫 과일: \${fruits.first()}")
    println("마지막 과일: \${fruits.last()}")
    println("과일 수: \${fruits.size}")
    println("바나나 포함? \${"바나나" in fruits}")
}`
        },
        {
          title: "컬렉션 함수 체이닝",
          language: "kotlin",
          code: `data class Product(
    val name: String,
    val category: String,
    val price: Int
)

fun main() {
    val products = listOf(
        Product("노트북", "전자", 1500000),
        Product("마우스", "전자", 50000),
        Product("책상", "가구", 200000),
        Product("의자", "가구", 150000),
        Product("키보드", "전자", 80000)
    )
    
    // 1. 필터링 + 변환
    val expensiveElectronics = products
        .filter { it.category == "전자" }
        .filter { it.price > 70000 }
        .map { it.name }
    println("비싼 전자제품: $expensiveElectronics")
    
    // 2. 정렬
    val sortedByPrice = products.sortedBy { it.price }
    println("가격순: \${sortedByPrice.map { it.name }}")
    
    // 3. 그룹핑
    val byCategory = products.groupBy { it.category }
    byCategory.forEach { (category, items) ->
        println("$category: \${items.map { it.name }}")
    }
    
    // 4. 집계
    val totalPrice = products.sumOf { it.price }
    val avgPrice = products.map { it.price }.average()
    println("총액: $totalPrice, 평균: $avgPrice")
    
    // 5. 조건 검사
    println("10만원 이하 있음? \${products.any { it.price <= 100000 }}")
}`
        }
      ],
      keyPoints: [
        "Kotlin 컬렉션은 불변(listOf, setOf, mapOf)과 가변(mutableListOf 등)으로 구분됩니다.",
        "기본적으로 불변 컬렉션 사용을 권장합니다. 필요시 toMutableList()로 변환합니다.",
        "filter, map, sorted 등 함수형 연산을 체이닝하여 간결하게 데이터를 처리합니다.",
        "groupBy는 키별 리스트로, associateBy는 키별 단일 값으로 Map을 생성합니다.",
        "any, all, none으로 조건을 검사하고, first, last, find로 요소를 찾습니다."
      ]
    },
    {
      id: "k0-m9",
      title: "Chapter 9: 고차 함수와 람다",
      topic: "람다 표현식, 고차 함수, it, 함수 참조",
      content: `
## 1. 람다 표현식

### 1.1 기본 문법

\`\`\`kotlin
// { 매개변수 -> 본문 }
val sum = { a: Int, b: Int -> a + b }
println(sum(3, 5))  // 8
\`\`\`

### 1.2 타입 추론

\`\`\`kotlin
// 변수 타입 명시 시 람다 매개변수 타입 추론
val double: (Int) -> Int = { x -> x * 2 }

// 매개변수가 하나면 it 사용
val triple: (Int) -> Int = { it * 3 }
\`\`\`

---

## 2. 고차 함수

**함수를 매개변수로 받거나 반환하는 함수**

\`\`\`kotlin
fun calculate(a: Int, b: Int, operation: (Int, Int) -> Int): Int {
    return operation(a, b)
}

val result = calculate(10, 5) { x, y -> x + y }  // 15
\`\`\`

### 2.2 마지막 람다는 괄호 밖으로

\`\`\`kotlin
// 일반적인 호출
list.filter({ it > 0 })

// 마지막 인자가 람다면 밖으로
list.filter { it > 0 }

// 람다만 있으면 괄호 생략
run { println("Hello") }
\`\`\`

---

## 3. 함수 참조

### 3.1 메서드 참조

\`\`\`kotlin
fun isEven(n: Int) = n % 2 == 0

val numbers = listOf(1, 2, 3, 4, 5)
numbers.filter(::isEven)  // [2, 4]
\`\`\`

### 3.2 클래스 멤버 참조

\`\`\`kotlin
data class Person(val name: String, val age: Int)

val people = listOf(Person("A", 20), Person("B", 30))
people.map(Person::name)  // ["A", "B"]
people.sortedBy(Person::age)
\`\`\`

---

## 4. 인라인 함수

성능 최적화를 위해 **람다 코드를 호출 지점에 삽입**

\`\`\`kotlin
inline fun measure(block: () -> Unit) {
    val start = System.currentTimeMillis()
    block()
    println("소요 시간: \${System.currentTimeMillis() - start}ms")
}

measure {
    // 이 코드는 inline됨
    Thread.sleep(100)
}
\`\`\`

---

## 5. 람다와 return

\`\`\`kotlin
fun findFirst(): Int? {
    listOf(1, 2, 3).forEach {
        if (it == 2) return it  // 비지역 반환 (함수 종료)
    }
    return null
}

// 람다만 종료하려면 레이블 사용
listOf(1, 2, 3).forEach loop@{
    if (it == 2) return@loop  // 람다만 종료
    println(it)
}
\`\`\`
`,
      codeExamples: [
        {
          title: "람다와 고차 함수",
          language: "kotlin",
          code: `// 고차 함수 정의
fun <T> List<T>.customFilter(predicate: (T) -> Boolean): List<T> {
    val result = mutableListOf<T>()
    for (item in this) {
        if (predicate(item)) {
            result.add(item)
        }
    }
    return result
}

fun <T, R> List<T>.customMap(transform: (T) -> R): List<R> {
    val result = mutableListOf<R>()
    for (item in this) {
        result.add(transform(item))
    }
    return result
}

fun main() {
    val numbers = listOf(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)
    
    // 람다 사용
    val evens = numbers.customFilter { it % 2 == 0 }
    val doubled = numbers.customMap { it * 2 }
    
    println("짝수: $evens")      // [2, 4, 6, 8, 10]
    println("2배: $doubled")    // [2, 4, 6, ...]
    
    // 함수 참조
    fun isOdd(n: Int) = n % 2 == 1
    println("홀수: \${numbers.customFilter(::isOdd)}")
}`
        },
        {
          title: "실용적인 고차 함수",
          language: "kotlin",
          code: `// 재시도 로직
inline fun <T> retry(times: Int, block: () -> T): T {
    var lastException: Exception? = null
    repeat(times) { attempt ->
        try {
            return block()
        } catch (e: Exception) {
            lastException = e
            println("시도 \${attempt + 1} 실패: \${e.message}")
        }
    }
    throw lastException!!
}

// 시간 측정
inline fun <T> measureTime(block: () -> T): Pair<T, Long> {
    val start = System.currentTimeMillis()
    val result = block()
    val time = System.currentTimeMillis() - start
    return result to time
}

fun main() {
    // retry 사용
    var count = 0
    val result = retry(3) {
        count++
        if (count < 3) throw Exception("아직...")
        "성공!"
    }
    println(result)
    
    // measureTime 사용
    val (data, time) = measureTime {
        Thread.sleep(100)
        "완료"
    }
    println("$data (\${time}ms)")
}`
        }
      ],
      keyPoints: [
        "람다는 { 매개변수 -> 본문 } 형태이며, 매개변수가 하나면 it으로 대체 가능합니다.",
        "고차 함수는 함수를 매개변수로 받거나 반환합니다.",
        "마지막 매개변수가 람다면 괄호 밖으로 뺄 수 있습니다. list.filter { ... }",
        "함수 참조(::함수명)로 기존 함수를 람다 대신 전달할 수 있습니다.",
        "inline 키워드는 람다의 오버헤드를 제거하여 성능을 최적화합니다."
      ]
    },
    {
      id: "k0-m10",
      title: "Chapter 10: 스코프 함수",
      topic: "let, run, with, apply, also",
      content: `
## 1. 스코프 함수란?

객체의 **컨텍스트 내에서 코드 블록을 실행**하는 함수

| 함수 | 객체 참조 | 반환 값 | 사용 시점 |
|------|----------|---------|----------|
| let | it | 람다 결과 | null 체크, 변환 |
| run | this | 람다 결과 | 객체 초기화 + 결과 계산 |
| with | this | 람다 결과 | 객체의 여러 메서드 호출 |
| apply | this | 객체 자체 | 객체 설정 (빌더 패턴) |
| also | it | 객체 자체 | 부수 효과 (로깅) |

---

## 2. let

**null 체크** 또는 **변환**에 사용

\`\`\`kotlin
val name: String? = "홍길동"

name?.let {
    println("이름: $it")
}

// 변환
val length = name?.let { it.length } ?: 0
\`\`\`

---

## 3. run

**객체 초기화와 결과 계산**을 함께

\`\`\`kotlin
val result = service.run {
    port = 8080
    query(prepareRequest())
}
\`\`\`

---

## 4. with

**객체의 여러 메서드 호출** (null이 아닐 때)

\`\`\`kotlin
val person = Person("홍길동", 25)

with(person) {
    println(name)
    println(age)
}
\`\`\`

---

## 5. apply

**객체 설정** 후 객체 반환 (빌더 패턴)

\`\`\`kotlin
val person = Person().apply {
    name = "홍길동"
    age = 25
}
\`\`\`

---

## 6. also

**부수 효과** (로깅, 검증) 후 객체 반환

\`\`\`kotlin
val numbers = mutableListOf(1, 2, 3)
    .also { println("초기: $it") }
    .apply { add(4) }
    .also { println("추가 후: $it") }
\`\`\`

---

## 7. 선택 가이드

| 상황 | 추천 함수 |
|------|----------|
| null 체크 후 처리 | let |
| 객체 설정 (빌더) | apply |
| 객체 설정 + 결과 계산 | run |
| 그룹 호출 (non-null) | with |
| 로깅, 검증 (부수 효과) | also |
`,
      codeExamples: [
        {
          title: "스코프 함수 비교",
          language: "kotlin",
          code: `data class Person(var name: String = "", var age: Int = 0)

fun main() {
    // 1. let: null 체크, 변환
    val name: String? = "Kotlin"
    val length = name?.let {
        println("처리 중: $it")
        it.length  // 반환
    } ?: 0
    println("길이: $length")
    
    // 2. apply: 객체 설정 (this 사용)
    val person = Person().apply {
        name = "홍길동"
        age = 25
    }
    println("apply: $person")
    
    // 3. also: 부수 효과 (it 사용)
    val numbers = mutableListOf(1, 2, 3)
        .also { println("초기 리스트: $it") }
        .apply { add(4); add(5) }
        .also { println("추가 후: $it") }
    
    // 4. run: 초기화 + 결과
    val greeting = person.run {
        "안녕하세요, $name님! (\${age}세)"
    }
    println(greeting)
    
    // 5. with: 그룹 호출
    with(person) {
        println("이름: $name")
        println("나이: $age")
    }
}`
        },
        {
          title: "실전 스코프 함수 활용",
          language: "kotlin",
          code: `// HTTP 요청 빌더 스타일
data class Request(
    var url: String = "",
    var method: String = "GET",
    var headers: MutableMap<String, String> = mutableMapOf(),
    var body: String = ""
)

fun buildRequest(): Request = Request().apply {
    url = "https://api.example.com/users"
    method = "POST"
    headers["Content-Type"] = "application/json"
    headers["Authorization"] = "Bearer token"
    body = """{"name": "홍길동"}"""
}

// 데이터 처리 파이프라인
data class User(val id: Int, val name: String, val email: String?)

fun processUser(user: User?): String {
    return user
        ?.also { println("처리 시작: \${it.name}") }
        ?.let { u ->
            val emailStatus = u.email?.let { "이메일: $it" } ?: "이메일 없음"
            "사용자 #\${u.id}: \${u.name} ($emailStatus)"
        }
        ?.also { println("처리 완료") }
        ?: "사용자 없음"
}

fun main() {
    val request = buildRequest()
    println(request)
    
    val user = User(1, "홍길동", "hong@example.com")
    println(processUser(user))
    
    println(processUser(null))
}`
        }
      ],
      keyPoints: [
        "let: it으로 참조, 람다 결과 반환. null 체크와 변환에 사용.",
        "apply: this로 참조, 객체 자체 반환. 객체 설정(빌더 패턴)에 사용.",
        "also: it으로 참조, 객체 자체 반환. 부수 효과(로깅)에 사용.",
        "run: this로 참조, 람다 결과 반환. 초기화 + 결과 계산에 사용.",
        "with: this로 참조, 람다 결과 반환. non-null 객체의 그룹 호출에 사용."
      ]
    }
  ]
};
