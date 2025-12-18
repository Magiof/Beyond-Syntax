import type { Module } from '../../curriculumData';

export const springIntroduction: Module = {
    id: "spring-introduction",
    title: "Chapter 1: Spring 프레임워크 소개",
    topic: "Spring이란, 핵심 모듈, Spring vs Spring Boot",
    content: `
## 1. Spring이란?
Java 엔터프라이즈 애플리케이션 개발을 위한 오픈소스 프레임워크입니다.

## 2. 핵심 철학
- **IoC**: 제어의 역전
- **DI**: 의존성 주입
- **AOP**: 관점 지향 프로그래밍

## 3. Spring Boot
설정을 자동화하고 내장 서버를 포함하여 빠른 개발을 지원합니다.
`,
    codeExamples: [
        {
            title: "Spring Boot 시작",
            language: "java",
            code: `@SpringBootApplication
public class MyApp {
    public static void main(String[] args) {
        SpringApplication.run(MyApp.class, args);
    }
}`
        }
    ],
    keyPoints: [
        "Spring은 전 세계적으로 가장 많이 사용하는 Java 프레임워크입니다.",
        "Spring Boot는 복잡한 설정을 자동화해줍니다."
    ],
    interviewQuestions: [
        {
            difficulty: 'Easy',
            question: "Spring과 Spring Boot의 차이는?",
            answer: "Spring은 프레임워크 자체이고, Boot는 설정을 자동화하여 편리하게 쓸 수 있게 해주는 도구입니다."
        }
    ]
};
