import type { Module } from '../../curriculumData';

export const modernJavaEvolution: Module = {
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
        
        try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {
            IntStream.range(0, 100_000).forEach(i -> {
                executor.submit(() -> {
                    try {
                        Thread.sleep(Duration.ofMillis(100));
                    } catch (InterruptedException e) { }
                });
            });
        }
        
        long end = System.currentTimeMillis();
        System.out.println("Processing took: " + (end - start) + "ms");
    }
}`
        }
    ],
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
    ]
};
