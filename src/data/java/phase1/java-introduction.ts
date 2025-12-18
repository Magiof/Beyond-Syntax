import type { Module } from '../../curriculumData';

export const javaIntroduction: Module = {
    id: "java-introduction",
    title: "Chapter 1: Java란 무엇인가",
    topic: "Java의 역사, 특징, JDK/JRE/JVM의 차이, 첫 프로그램 작성",
    content: `
## 1. Java란 무엇인가? 

**Java**는 1995년 Sun Microsystems(현재 Oracle)의 제임스 고슬링(James Gosling)이 개발한 **객체지향 프로그래밍 언어**입니다.

### 1.1 Java의 탄생 배경

Java는 원래 가전제품에 들어가는 소프트웨어를 만들기 위해 개발되었습니다. 당시 C++은 플랫폼마다 다시 컴파일해야 했고, 메모리 관리가 어려웠습니다. Java는 이 문제를 해결하기 위해 **"Write Once, Run Anywhere"**(한 번 작성하면 어디서든 실행)를 목표로 설계되었습니다.

### 1.2 Java의 핵심 특징

#### 1) 플랫폼 독립성 (Platform Independence)
Java 코드는 **바이트코드(.class)** 로 컴파일되고, 이 바이트코드는 **JVM(Java Virtual Machine)** 위에서 실행됩니다. JVM만 설치되어 있다면 Windows, Mac, Linux 어디서든 동일하게 동작합니다.

\`\`\`
[소스코드 .java] → javac 컴파일러 → [바이트코드 .class] → JVM → 실행
\`\`\`

#### 2) 객체지향 프로그래밍 (OOP)
Java는 **완전한 객체지향 언어**입니다. 모든 코드는 **클래스(Class)** 안에 작성되어야 하며, **캡슐화**, **상속**, **다형성**, **추상화**의 4대 원칙을 지원합니다.

#### 3) 자동 메모리 관리 (Garbage Collection)
C/C++에서는 개발자가 직접 메모리를 할당(malloc)하고 해제(free)해야 합니다. Java는 **가비지 컬렉터(GC)** 가 사용하지 않는 객체를 자동으로 정리해줍니다.

#### 4) 강력한 타입 체크 (Strongly Typed)
Java는 **정적 타입(Static Typing)** 언어입니다. 변수를 선언할 때 반드시 타입을 명시해야 하며, 컴파일 시점에 타입 오류를 검사합니다.

#### 5) 멀티스레딩 지원
Java는 언어 차원에서 **멀티스레딩**을 지원합니다. \`Thread\` 클래스와 \`Runnable\` 인터페이스를 통해 동시에 여러 작업을 처리할 수 있습니다.

---

## 2. JDK, JRE, JVM의 차이

Java를 처음 배울 때 가장 혼란스러운 개념입니다. 정확히 구분해봅시다.

### 2.1 JVM (Java Virtual Machine)
- **정의**: 바이트코드(.class)를 실행하는 가상 머신
- **역할**: 바이트코드를 해당 OS가 이해할 수 있는 기계어로 변환하여 실행
- **특징**: 플랫폼마다 다른 JVM이 존재 (Windows용 JVM, Mac용 JVM 등)

### 2.2 JRE (Java Runtime Environment)
- **정의**: Java 프로그램을 **실행**하기 위한 환경
- **구성**: JVM + 핵심 라이브러리(java.lang, java.util 등)
- **용도**: Java 프로그램을 실행만 하는 사용자에게 필요

### 2.3 JDK (Java Development Kit)
- **정의**: Java 프로그램을 **개발**하기 위한 도구 모음
- **구성**: JRE + 컴파일러(javac) + 디버거 + 개발 도구
- **용도**: Java 개발자에게 필요

\`\`\`
JDK (개발 도구)
 ├── JRE (실행 환경)
 │    ├── JVM (가상 머신)
 │    └── 핵심 라이브러리
 ├── javac (컴파일러)
 ├── java (실행기)
 ├── javadoc (문서 생성)
 ├── jar (압축 도구)
\`\`\`

---

## 3. 개발 환경 설정

### 3.1 JDK 설치
1. [Oracle JDK](https://www.oracle.com/java/technologies/downloads/) 또는 [OpenJDK](https://adoptium.net/) 다운로드
2. 운영체제에 맞는 버전 설치
3. 환경 변수 설정 (JAVA_HOME, PATH)

### 3.2 설치 확인
터미널(명령 프롬프트)에서 다음 명령어로 확인:

\`\`\`bash
java -version    # JRE/JVM 버전 확인
javac -version   # 컴파일러 버전 확인
\`\`\`

---

## 4. 첫 번째 프로그램: Hello World

모든 프로그래밍 언어 학습의 시작, Hello World를 작성해봅시다.

### 4.1 코드 작성

\`\`\`java
// 파일명: HelloWorld.java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
\`\`\`

### 4.2 코드 분석 (한 줄씩 이해하기)

| 코드 | 설명 |
|------|------|
| \`public class HelloWorld\` | HelloWorld라는 이름의 공개(public) 클래스 선언. 파일명과 클래스명이 **반드시 일치**해야 함 |
| \`public static void main(String[] args)\` | 프로그램의 **시작점(Entry Point)**. JVM은 이 메서드부터 실행 시작 |
| \`System.out.println(...)\` | 콘솔에 텍스트를 출력하고 줄바꿈 |

### 4.3 컴파일과 실행

\`\`\`bash
# 1. 컴파일 (소스코드 → 바이트코드)
javac HelloWorld.java

# 2. 실행 (바이트코드 실행)
java HelloWorld

# 출력: Hello, World!
\`\`\`

### 4.4 main 메서드의 구성 요소

\`\`\`java
public static void main(String[] args)
\`\`\`

| 키워드 | 의미 |
|--------|------|
| \`public\` | 접근 제어자. 어디서든 접근 가능 |
| \`static\` | 정적 메서드. 객체 생성 없이 호출 가능 |
| \`void\` | 반환 타입. 아무것도 반환하지 않음 |
| \`main\` | 메서드 이름. JVM이 찾는 고정된 이름 |
| \`String[] args\` | 매개변수. 명령줄 인자를 배열로 받음 |
`,
    codeExamples: [
        {
            title: "Hello World 기본",
            language: "java",
            code: `public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`
        },
        {
            title: "명령줄 인자 사용하기",
            language: "java",
            code: `public class Greeting {
    public static void main(String[] args) {
        // args 배열에 명령줄 인자가 들어옴
        if (args.length > 0) {
            System.out.println("안녕하세요, " + args[0] + "님!");
        } else {
            System.out.println("안녕하세요!");
        }
    }
}

// 실행: java Greeting 홍길동
// 출력: 안녕하세요, 홍길동님!`
        }
    ],
    keyPoints: [
        "Java는 '한 번 작성하면 어디서든 실행(Write Once, Run Anywhere)'을 목표로 설계된 객체지향 언어입니다.",
        "JDK는 개발 도구, JRE는 실행 환경, JVM은 바이트코드를 실행하는 가상 머신입니다.",
        "모든 Java 코드는 클래스 안에 작성되어야 합니다.",
        "main 메서드는 프로그램의 시작점이며, public static void main(String[] args) 형식이어야 합니다.",
        "소스 파일(.java)은 javac로 컴파일하여 바이트코드(.class)를 생성하고, java 명령으로 실행합니다."
    ],
    interviewQuestions: [
        {
            difficulty: 'Easy',
            question: "JDK, JRE, JVM의 차이점을 설명해주세요.",
            answer: "JDK는 개발 도구(javac 등)를 포함하고, JRE는 실행 환경(라이브러리)을 포함하며, JVM은 실제로 바이트코드를 실행하는 가상 머신입니다. (JDK ⊃ JRE ⊃ JVM)"
        },
        {
            difficulty: 'Medium',
            question: "main 메서드가 public static void인 이유는 무엇인가요?",
            answer: "JVM이 외부에서 접근해야 하므로 public, 객체 생성 없이 실행해야 하므로 static, 반환값이 없으므로 void이어야 합니다."
        }
    ]
};
