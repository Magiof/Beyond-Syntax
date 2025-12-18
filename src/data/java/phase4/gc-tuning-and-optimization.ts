import type { Module } from '../../curriculumData';

export const gcTuningAndOptimization: Module = {
    id: "gc-tuning-and-optimization",
    title: "Chapter 2: 가비지 컬렉션(GC) - 멈추지 않는 서버를 위한 사투",
    topic: "Weak Generational Hypothesis, G1 GC vs ZGC, STW, SafePoints",
    content: `
## 1. 전제 조건: 약한 세대 가설 (Weak Generational Hypothesis)

GC 설계의 근간이 되는 두 가지 대전제입니다.
1. 대부분의 객체는 금방 불능(Unreachable) 상태가 된다.
2. 오래된 객체에서 젊은 객체로의 참조는 아주 적다.

이 가설 덕분에 JVM은 힙을 **Young / Old** 영역으로 나누어 "금방 죽을 놈들만 모인 곳"을 아주 빠르게 청소(Minor GC)할 수 있습니다.

---

## 2. 힙 메모리 구조 시각화 (Generational GC)

\`\`\`mermaid
flowchart LR
    Eden["Eden"] --> S0["Survivor 0"]
    S0 --> S1["Survivor 1"]
    S1 --> Old["Old Generation"]
    
    subgraph Young ["Young (Minor GC)"]
        Eden
        S0
        S1
    end
    
    subgraph Aging ["Tenuring Threshold"]
        Old
    end

    style Eden fill:#e1f5fe
    style Old fill:#fff9c4
\`\`\`

- **Eden**: 새로 태어난 객체들이 머무는 곳.
- **Survivor**: 죽지 않고 살아남은 객체들이 번갈아 가며 머무는 곳. (둘 중 하나는 반드시 비어있어야 함)
- **Tenuring**: 여러 번의 GC에서 살아남은 객체는 'Old' 영역으로 승급(Promotion)합니다.

---

## 3. 현대적 GC: G1 vs ZGC

| 특징 | G1 GC (Java 9+ Default) | ZGC (Next-Gen) |
| :--- | :--- | :--- |
| **철학** | 힙을 '리전'으로 쪼개 쓰레기 많은 곳 우선 청소 | 힙 크기에 상관없이 10ms 이하 정지 보장 |
| **STW** | 최대 수백 ms 발생 가능 | 극도로 짧음 (병렬 마킹/재배치) |
| **장점** | 처리량(Throughput)이 우수함 | 지연 시간(Latency)이 극도로 낮음 |
| **단점** | 힙이 커질수록 멈춤 시간 증가 | CPU 사용률이 상대적으로 높음 |

---

## 4. 시니어의 팁: SafePoint와 STW

모든 GC의 시작은 **SafePoint**입니다.
- **SafePoint**: GC를 하기 위해 모든 스레드가 잠시 멈춰도 안전한 지점입니다. 
- **문제**: 간혹 어떤 스레드가 SafePoint에 도달하지 못하면(긴 루프 등), 다른 모든 스레드가 그 스레드를 기다리느라 **STW(Stop-The-World)** 시간이 비정상적으로 길어질 수 있습니다. 이를 'SafePoint Check' 지연이라고 합니다.
`,
    codeExamples: [
        {
            title: "GC 튜닝의 시작: 로그 분석 (Unified Logging)",
            language: "bash",
            code: `# GC 상세 내역과 정지 시간, 원인을 기록합니다.
java -Xlog:gc*,safepoint:file=gc.log:time,uptime,level,tags \\
     -Xms4g -Xmx4g \\
     -XX:+UseG1GC \\
     -XX:MaxGCPauseMillis=100 \\
     -jar app.jar`
        }
    ],
    keyPoints: [
        "Major GC는 Old 영역이 꽉 찼을 때 발생하며, 훨씬 긴 STW를 동반하므로 피해야 합니다.",
        "힙 크기를 너무 크게 잡으면 GC 한 번에 걸리는 시간이 늘어나Latency에 악영향을 줄 수 있습니다.",
        "ZGC는 Colored Pointers와 Load Barriers 기술을 통해 대규모 힙에서도 10ms 이하의 정지를 달성합니다."
    ],
    interviewQuestions: [
        {
            difficulty: 'Hell',
            question: "G1 GC에서 'Humongous objects'란 무엇이며 어떤 문제를 일으키나요?",
            answer: "리전(Region) 크기의 50%를 넘는 거대한 객체를 뜻합니다. 이들은 Old 영역으로 바로 할당되며, 연속된 리전을 차지해야 하므로 메모리 파편화를 유발하고 자주 Full GC를 일으키는 주범이 됩니다. 리전 크기를 키우거나 객체 크기를 줄여야 합니다."
        }
    ]
};
