import type { Module } from '../../curriculumData';

export const springWebflux: Module = {
    id: "spring-webflux",
    title: "Chapter 6: Spring WebFlux & Reactor",
    topic: "Non-blocking I/O, Netty, Mono, Flux, Backpressure",
    content: `
## 1. 리액티브 프로그래밍
Non-blocking I/O를 활용해 적은 스레드로 높은 동시성을 처리합니다.

## 2. Project Reactor
Mono(0..1)와 Flux(0..N)라는 리액티브 타입을 기본으로 합니다.

## 3. Netty
비동기 이벤트 기반 네트워크 애플리케이션 프레임워크입니다.
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
