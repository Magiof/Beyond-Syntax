import type { Module } from '../../curriculumData';

export const jvmArchitecture: Module = {
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
        'Runtime Data Area 중 Heap and Method Area는 모든 스레드가 공유하며, Stack, PC Register, Native Method Stack은 스레드마다 독립적입니다.',
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
};
