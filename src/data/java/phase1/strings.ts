import type { Module } from '../../curriculumData';

export const strings: Module = {
    id: "strings",
    title: "Chapter 7: 문자열 (String)",
    topic: "String 클래스, 불변성, StringBuilder, 주요 메서드, 문자열 비교",
    content: `
## 1. String 클래스란?

**String**은 Java에서 문자열을 다루는 **클래스**입니다. 기본형(primitive)이 아닌 **참조형(reference type)** 입니다.

### 1.1 String 생성 방법

\`\`\`java
// 방법 1: 리터럴 (권장) - String Pool 사용
String str1 = "Hello";

// 방법 2: new 키워드 - 새 객체 생성
String str2 = new String("Hello");
\`\`\`

### 1.2 String Pool

문자열 리터럴은 **String Pool**(String Constant Pool)이라는 특별한 메모리 영역에 저장됩니다.

\`\`\`java
String a = "Java";
String b = "Java";
String c = new String("Java");

System.out.println(a == b);  // true (같은 Pool 객체)
System.out.println(a == c);  // false (c는 새 객체)
System.out.println(a.equals(c));  // true (내용은 같음)
\`\`\`

---

## 2. String의 불변성 (Immutability)

**String 객체는 한 번 생성되면 변경할 수 없습니다.**

\`\`\`java
String str = "Hello";
str = str + " World";  // 새로운 String 객체 생성!
\`\`\`

기존 "Hello" 객체는 그대로 있고, "Hello World"라는 새 객체가 생성되어 str이 이를 참조합니다.

### 불변성의 이유
1. **보안**: 네트워크, 파일 경로 등에 사용 시 변조 방지
2. **스레드 안전**: 여러 스레드에서 공유해도 안전
3. **해시코드 캐싱**: HashMap 등에서 키로 사용 시 효율적

---

## 3. 주요 String 메서드

### 3.1 길이와 접근

\`\`\`java
String str = "Hello, Java!";

str.length()          // 12 (문자열 길이)
str.charAt(0)         // 'H' (첫 번째 문자)
str.charAt(7)         // 'J' (8번째 문자)
str.isEmpty()         // false
str.isBlank()         // false (Java 11+, 공백문자만 있어도 true)
\`\`\`

### 3.2 검색

\`\`\`java
String str = "Hello, Java!";

str.indexOf("Java")      // 7 (처음 등장 위치)
str.indexOf("Python")    // -1 (없으면)
str.lastIndexOf("l")     // 3 (마지막 등장 위치)
str.contains("Java")     // true (포함 여부)
str.startsWith("Hello")  // true
str.endsWith("!")        // true
\`\`\`

### 3.3 추출

\`\`\`java
String str = "Hello, Java!";

str.substring(7)         // "Java!" (7번부터 끝까지)
str.substring(0, 5)      // "Hello" (0~4번까지)
\`\`\`

### 3.4 변환

\`\`\`java
String str = "  Hello, Java!  ";

str.toUpperCase()        // "  HELLO, JAVA!  "
str.toLowerCase()        // "  hello, java!  "
str.trim()               // "Hello, Java!" (앞뒤 공백 제거)
str.strip()              // "Hello, Java!" (Java 11+, 유니코드 공백 포함)
str.replace("Java", "World")  // "  Hello, World!  "
\`\`\`

### 3.5 분할과 결합

\`\`\`java
// 분할
String csv = "apple,banana,orange";
String[] parts = csv.split(",");  // ["apple", "banana", "orange"]

// 결합
String joined = String.join("-", parts);  // "apple-banana-orange"
\`\`\`

---

## 4. 문자열 비교

### 4.1 equals vs ==

\`\`\`java
String a = "Hello";
String b = "Hello";
String c = new String("Hello");

// == : 참조(주소) 비교
System.out.println(a == b);  // true (String Pool)
System.out.println(a == c);  // false (다른 객체)

// equals : 내용 비교 (항상 이것을 사용!)
System.out.println(a.equals(c));  // true
\`\`\`

### 4.2 대소문자 무시 비교

\`\`\`java
String a = "Hello";
String b = "HELLO";
System.out.println(a.equalsIgnoreCase(b));  // true
\`\`\`

### 4.3 사전순 비교

\`\`\`java
String a = "apple";
String b = "banana";
a.compareTo(b);  // 음수 (a < b)
b.compareTo(a);  // 양수 (b > a)
\`\`\`

---

## 5. StringBuilder와 StringBuffer

**많은 문자열을 연결할 때**는 String 대신 StringBuilder를 사용하세요.

### 5.1 왜 필요한가?

\`\`\`java
// 나쁜 예: 매번 새 String 객체 생성 (성능 저하)
String result = "";
for (int i = 0; i < 1000; i++) {
    result += i;  // 1000개의 String 객체 생성!
}

// 좋은 예: StringBuilder 사용
StringBuilder sb = new StringBuilder();
for (int i = 0; i < 1000; i++) {
    sb.append(i);
}
String result = sb.toString();
\`\`\`

### 5.2 주요 메서드

\`\`\`java
StringBuilder sb = new StringBuilder("Hello");
sb.append(" World");    // "Hello World"
sb.insert(5, ",");      // "Hello, World"
sb.delete(5, 6);        // "Hello World"
sb.reverse();           // "dlroW olleH"
sb.toString();          // String으로 변환
\`\`\`

### 5.3 StringBuilder vs StringBuffer

| 특성 | StringBuilder | StringBuffer |
|------|---------------|--------------|
| 스레드 안전성 | X (동기화 없음) | O (동기화됨) |
| 성능 | 빠름 | 느림 |
| 사용 상황 | 단일 스레드 | 멀티스레드 |
`,
    codeExamples: [
        {
            title: "String 주요 메서드 활용",
            language: "java",
            code: `public class StringDemo {
    public static void main(String[] args) {
        String email = "user@example.com";
        
        // 이메일 유효성 검사
        boolean hasAt = email.contains("@");
        boolean hasDot = email.contains(".");
        System.out.println("유효한 이메일: " + (hasAt && hasDot));
        
        // 사용자명과 도메인 추출
        int atIndex = email.indexOf("@");
        String username = email.substring(0, atIndex);
        String domain = email.substring(atIndex + 1);
        System.out.println("사용자: " + username);
        System.out.println("도메인: " + domain);
        
        // 문자열 포맷팅
        String formatted = String.format("안녕하세요, %s님!", username);
        System.out.println(formatted);
        
        // CSV 파싱
        String data = "홍길동,25,서울";
        String[] parts = data.split(",");
        System.out.println("이름: " + parts[0]);
        System.out.println("나이: " + parts[1]);
        System.out.println("도시: " + parts[2]);
    }
}`
        },
        {
            title: "StringBuilder 성능 비교",
            language: "java",
            code: `public class StringBuilderDemo {
    public static void main(String[] args) {
        int n = 10000;
        
        // String 연결 (느림)
        long start1 = System.currentTimeMillis();
        String s = "";
        for (int i = 0; i < n; i++) {
            s += "a";
        }
        long time1 = System.currentTimeMillis() - start1;
        
        // StringBuilder (빠름)
        long start2 = System.currentTimeMillis();
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < n; i++) {
            sb.append("a");
        }
        String result = sb.toString();
        long time2 = System.currentTimeMillis() - start2;
        
        System.out.println("String 연결: " + time1 + "ms");
        System.out.println("StringBuilder: " + time2 + "ms");
        
        // StringBuilder 활용 예시
        StringBuilder html = new StringBuilder();
        html.append("<ul>\\n");
        String[] items = {"사과", "바나나", "오렌지"};
        for (String item : items) {
            html.append("  <li>").append(item).append("</li>\\n");
        }
        html.append("</ul>");
        System.out.println(html);
    }
}`
        }
    ],
    keyPoints: [
        "String은 불변(immutable)입니다. 수정하면 새 객체가 생성됩니다.",
        "문자열 비교는 반드시 == 대신 .equals() 메서드를 사용하세요.",
        "문자열 리터럴은 String Pool에 저장되어 같은 값은 재사용됩니다.",
        "많은 문자열 연결 작업에는 StringBuilder를 사용하여 성능을 향상시키세요.",
        "String의 주요 메서드: length(), charAt(), substring(), split(), contains(), replace(), trim() 등이 있습니다."
    ],
    interviewQuestions: [
        {
            difficulty: 'Medium',
            question: "String 객체가 불변(Immutable)인 이유는 무엇인가요?",
            answer: "보안(네트워크/DB 연결 문자열 변조 방지), 스레드 안전성(동기화 불필요), String Pool을 통한 메모리 절약(캐싱) 등을 위해서입니다."
        },
        {
            difficulty: 'Easy',
            question: "많은 문자열을 연결할 때 String + 연산 대신 StringBuilder를 써야 하는 이유는?",
            answer: "String은 불변이라 + 연산 시 매번 새로운 객체를 생성하여 메모리 낭비가 심하지만, StringBuilder는 내부 버퍼를 변경하므로 훨씬 효율적입니다."
        }
    ]
};
