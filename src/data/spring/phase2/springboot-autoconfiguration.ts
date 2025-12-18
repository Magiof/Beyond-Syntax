import type { Module } from '../../curriculumData';

export const springbootAutoconfiguration: Module = {
    id: "springboot-autoconfiguration",
    title: "Chapter 1: Spring Boot AutoConfiguration 원리",
    topic: "EnableAutoConfiguration, Condition, Starter",
    content: `
## 1. 자동 설정 원리
@EnableAutoConfiguration은 클래스패스를 스캔하여 필요한 설정을 자동으로 적용합니다.

## 2. @Conditional
특정 조건(클래스 존재 여부, 프로퍼티 설정 등)이 충족될 때만 빈을 등록합니다.

## 3. Starter
의존성 조합을 미리 정의하여 필요한 라이브러리들을 한꺼번에 가져올 수 있게 합니다.
`,
    codeExamples: [
        {
            title: "조건부 빈 등록",
            language: "java",
            code: `@ConditionalOnMissingBean(MyBean.class)\n@Bean\npublic MyBean myBean() { return new MyBean(); }`
        }
    ],
    keyPoints: [
        "자동 설정은 개발 생산성을 획기적으로 높여줍니다.",
        "@Conditional 어노테이션을 이해하는 것이 중요합니다."
    ],
    interviewQuestions: [
        {
            difficulty: 'Hard',
            question: "Spring Boot Starter의 내부 구조는?",
            answer: "실제 라이브러리들을 모은 프로젝트와, 그 라이브러리들을 빈으로 자동 등록해주는 AutoConfigure 프로젝트로 구성됩니다."
        }
    ]
};
