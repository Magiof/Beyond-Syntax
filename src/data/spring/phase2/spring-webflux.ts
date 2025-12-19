import type { Module } from '../../types';

export const springWebflux: Module = {
    id: "spring-webflux",
    title: "Chapter 5: 리액티브 프로그래밍과 Spring WebFlux",
    topic: "Non-blocking I/O, Event Loop, Mono & Flux, R2DBC",
    content: `
## 1. 패러다임의 전환: Blocking vs Non-blocking

전통적인 MVC는 **Thread-per-request** 모델입니다. 요청이 오면 쓰레드를 하나 할당하고, DB 응답을 기다리는 동안 쓰레드는 '차단(Blocking)'된 상태로 대기합니다.
- **WebFlux의 해결책**: 적은 수의 쓰레드로 **Event Loop** 기반의 Non-blocking I/O를 수행하여 대규모 동시 요청을 효율적으로 처리합니다.

---

## 2. 리액티브 스트림의 두 주인공: Mono와 Flux

비동기 데이터를 다루기 위해 프로젝트 리액터(Project Reactor) 라이브러리를 사용합니다.
- **Mono**: 0개 또는 1개의 결과 데이터만을 다루는 퍼블리셔입니다. (단건 조회 등에 사용)
- **Flux**: 0개에서 N개의 결과 데이터 흐름을 다루는 퍼블리셔입니다. (목록 조회, 스트리밍 등에 사용)

---

## 3. 언제 WebFlux를 써야 하는가?

WebFlux가 항상 빠른 것은 아닙니다. 오히려 일반적인 환경에서는 MVC가 더 빠를 수 있습니다.
- **WebFlux 권장**: 수많은 커넥션을 유지해야 하는 게이트웨이(Gateway), 채팅 서버, 외부 API 호출이 매우 많은 서비스.
- **MVC 권장**: 비즈니스 로직이 매우 복잡하여 가독성이 중요하거나, 리액티브 DB 드라이버(R2DBC)를 지원하지 않는 라이브러리를 많이 써야 하는 경우.

---

## 4. 리액티브 스택의 동반자: R2DBC와 Netty

- **Netty**: WebFlux의 기본 내장 서버로, 비동기 네트워크 엔진입니다.
- **R2DBC**: 관계형 DB에 접근할 때도 Non-blocking을 실현하기 위한 표준 스펙입니다. 기존 JDBC는 Blocking 방식이라 WebFlux에서 사용 시 성능 저하의 주범이 될 수 있으므로 주의해야 합니다.
`,
    codeExamples: [
        {
            title: "WebFlux 컨트롤러",
            language: "java",
            code: `@GetMapping("/{id}")\npublic Mono<User> get(@PathVariable String id) { ... }`
        }
    ],
    keyPoints: [
        "WebFlux 내부에서는 절대 블로킹 코드를 작성하면 안 됩니다.",
        "대규모 데이터 스트리밍에 적합합니다."
    ],
    interviewQuestions: [
        {
            difficulty: 'Hard',
            question: "MVC와 WebFlux의 가장 큰 차이는?",
            answer: "요청당 스레드 방식(Blocking)이냐, 이벤트 기반 비동기 방식(Non-blocking)이냐의 차이입니다."
        }
    ]
};
