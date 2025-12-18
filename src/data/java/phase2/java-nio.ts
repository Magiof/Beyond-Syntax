import type { Module } from '../../curriculumData';

export const javaNio: Module = {
    id: 'java-nio',
    title: 'Chapter 5: Java NIO와 고성능 I/O',
    topic: 'Blocking vs Non-Blocking, Buffer, Channel, Selector, Netty',
    content: `
## 1. Java IO vs NIO

### 1.1 전통적인 IO (java.io)
- **Stream** 기반: 데이터가 흐르는 파이프. 단방향.
- **Blocking**: \`read()\` 호출 시 데이터가 올 때까지 스레드가 멈춤.
- 클라이언트 1명당 1개의 스레드가 필요함 (1:1 모델). 접속자가 많으면 스레드 폭증으로 성능 저하.

### 1.2 NIO (New IO, java.nio)
- **Buffer** & **Channel** 기반: 양방향 입출력 가능.
- **Non-Blocking**: 데이터가 없으면 즉시 리턴, 다른 작업 수행 가능.

---

## 2. NIO의 핵심: Selector (Multiplexing)
하나의 스레드로 여러 채널(연결)을 관리할 수 있게 해주는 컴포넌트입니다.

\`\`\`mermaid
graph TD
    Client1 --> Channel1
    Client2 --> Channel2
    Channel1 --> Selector
    Channel2 --> Selector
    Selector --> SingleThread[Single Thread]
\`\`\`

1. 여러 Channel을 Selector에 등록합니다.
2. Selector는 이벤트(읽기 가능, 쓰기 가능 등)가 발생한 Channel만 감지합니다.
3. 스레드는 이벤트가 발생한 Channel만 처리하므로 효율적입니다.

---

## 3. Netty 프레임워크
NIO는 로우 레벨이고 복잡해서 직접 사용하기 어렵습니다. 보통 **Netty**라는 강력한 프레임워크를 사용합니다.

- **Event Loop**: 무한 루프를 돌며 이벤트를 처리하는 스레드
- **Pipeline**: 들어온 데이터를 처리하는 핸들러의 체인 (필터 체인 패턴)
- **Zero-Copy**: 데이터를 커널 영역에서 사용자 영역으로 복사하지 않고 전송하여 성능 최적화

스프링 웹플럭스(Spring WebFlux)도 내부적으로 Netty를 사용합니다.
`,
    keyPoints: [
        '전통적인 IO는 Blocking 방식으로, 스레드를 많이 소모하여 대규모 동시 접속 처리에 불리합니다.',
        'NIO는 Channel, Buffer, Selector를 사용하여 Non-Blocking 및 Multiplexing I/O를 지원합니다.',
        'Selector를 사용하면 하나의 스레드로 수천 개의 연결을 효율적으로 관리할 수 있습니다.'
    ],
    interviewQuestions: [
        {
            difficulty: 'Medium',
            question: "Blocking I/O와 Non-Blocking I/O의 차이는?",
            answer: "Blocking은 데이터가 준비될 때까지 스레드가 대기하지만, Non-Blocking은 즉시 리턴하여 스레드가 다른 작업을 할 수 있게 합니다."
        },
        {
            difficulty: 'Hard',
            question: "Java NIO에서 Selector의 역할은?",
            answer: "단일 스레드로 여러 채널(소켓 연결)의 이벤트를 감시하고 처리하는 멀티플렉싱(Multiplexing) 역할을 수행하여 효율적인 리소스 사용을 가능하게 합니다."
        }
    ]
};
