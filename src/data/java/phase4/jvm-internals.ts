import type { Module } from '../../types';

export const jvmInternals: Module = {
    id: "jvm-internals",
    title: "Chapter 1: JVM 메모리 모델 - 런타임의 기술적 실체",
    topic: "Runtime Data Areas, Class Loader Delegation, Memory Layout, JMM Happens-Before",
    content: `
## 1. JVM: 단순한 가상 머신이 아닌 OS 위의 추상화

시니어 엔지니어링의 문턱은 "코드가 어떻게 실행되는가"를 넘어 "**데이터가 어디에 배치되는가**"를 이해하는 데 있습니다. JVM은 하드웨어와 자바 코드 사이에서 메모리 관리의 규칙을 정의합니다.

---

## 2. 런타임 데이터 영역 (Runtime Data Areas) 시각화

JVM이 OS로부터 할당받은 메모리를 어떻게 나누어 쓰는지 이해하는 것이 튜닝의 시작입니다.

\`\`\`mermaid
flowchart TD
    subgraph Shared ["Thread 공유 구역 (Shared)"]
        Heap["**Heap**<br>(객체 인스턴스, GC 영역)"]
        Method["**Method Area / Metaspace**<br>(클래스 설계도, 상수 풀)"]
    end
    
    subgraph Private ["Thread 전용 구역 (Private)"]
        Stack["**JVM Stack**<br>(지역변수, 프레임)"]
        PC["**PC Register**<br>(현재 명령 주소)"]
        Native["**Native Method Stack**<br>(C/C++ 코드용)"]
    end

    Shared --- Private
\`\`\`

- **Metaspace (Java 8+)**: 과거 \`PermGen\`과 달리 **Native Memory**를 사용합니다. 즉, 클래스 로딩이 무한히 늘어나도 OS 메모리가 허용하는 한 OOM이 발생하지 않도록 설계되었습니다.
- **TLAB (Thread Local Allocation Buffer)**: 힙(Heap)은 전역 공유 구역이지만, 성능을 위해 스레드마다 작은 '예약석'을 가집니다. 이를 통해 경합 없이 초고속 객체 생성이 가능합니다.

---

## 3. 클래스 로더 계층 구조 (Delegation Model)

클래스 파일이 메모리에 올라올 때는 "**계층적 위임 구조**"를 따릅니다.

1. **Bootstrap**: 핵심 자바 라이브러리 (\`java.lang.*\`) 로드. (C/C++로 구현)
2. **Platform (Extension)**: 확장 라이브러리 로드.
3. **Application (System)**: 개발자가 짠 클래스와 외부 라이브러리 로드.

> **Delegation Principle**: 상위 로더가 먼저 확인하고, 없으면 하위로 넘깁니다. 이는 \`java.lang.String\` 같은 핵심 클래스를 외부 악성 코드가 덮어씌우는 것을 방지하는 보안 장치이기도 합니다.

---

## 4. Java Memory Model (JMM)과 Happens-Before

단순하게 "메인 메모리에서 읽는다"를 넘어, JMM은 명령어 **재배치(Reordering)** 를 방지하는 약속을 정의합니다.

- **Happens-Before Relationship**: A 작업의 결과가 반드시 B 작업에 보여야 한다는 보장입니다.
- **volatile**: "이 변수에 대한 쓰기는 이후의 모든 읽기에 대해 Happens-Before 관계를 형성한다"는 의미입니다. 가시성뿐만 아니라 **장벽(Memory Barrier)** 역할을 하여 Reordering을 막습니다.
`,
    codeExamples: [
        {
            title: "Stack vs Heap: 데이터의 생존 범위",
            language: "java",
            code: `public class MemoryLayout {
    public static void main(String[] args) {
        int primitive = 10;      // Stack: 메서드 종료 시 즉시 소멸
        User user = new User();  // Heap: GC가 치울 때까지 생존 (Stack에는 참조 주소만 저장)
        
        process(user);
    }
    
    static void process(User u) {
        // user 객체의 주소값이 Stack 프레임에 복사되어 들어옴
        u.updateName("Antigravity"); 
    }
}`
        }
    ],
    keyPoints: [
        "Metaspace는 Native Memory를 사용하여 PermGen의 OOM 문제를 해결했습니다.",
        "ClassLoader 위임 모델은 자바 시스템의 안정성과 보안의 핵심입니다.",
        "JMM은 하위 레벨의 복합적인 하드웨어 아키텍처 위에서 자바가 일관된 동작을 하도록 보장하는 명세입니다."
    ],
    interviewQuestions: [
        {
            difficulty: 'Hell',
            question: "왜 스택 메모리는 메모리 누수가 발생하지 않을까요?",
            answer: "스택은 LIFO(Last-In-First-Out) 구조로, 메서드 호출 시 프레임이 푸시되고 종료 시 팝되는 과정에서 자동으로 모든 지역 변수가 정리되기 때문입니다. 소유권이 명확하고 생명주기가 스코프에 갇혀 있어 GC의 도움이 필요 없습니다."
        }
    ]
};
