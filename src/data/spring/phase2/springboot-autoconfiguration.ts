import type { Module } from '../../types';

export const springbootAutoconfiguration: Module = {
    id: "springboot-autoconfiguration",
    title: "Chapter 1: 자동 설정의 원리와 @Conditional의 마법",
    topic: "@EnableAutoConfiguration, @Conditional, 커스텀 스타터 제작",
    content: `
## 1. 마법은 없다: 스프링 부트 자동 설정의 진실

많은 개발자가 스프링 부트가 "알아서 다 해준다"고 생각하지만, 그 이면에는 정교하게 설계된 조건부 빈 등록 메커니즘이 있습니다. 핵심은 **@Conditional** 어노테이션입니다.

---

## 2. @Conditional: 조건부 빈 등록의 정수

스프링 4.0부터 도입된 이 어노테이션은 특정 조건이 만족될 때만 빈을 생성하도록 돕습니다.
- **@ConditionalOnClass**: 클래스패스에 특정 클래스가 있을 때만 작동 합니다. (예: H2 라이브러리가 있으면 H2용 데이터 소스 자동 설정)
- **@ConditionalOnMissingBean**: 개발자가 직접 등록한 동일한 타입의 빈이 없을 때만 시스템 기본 빈을 등록합니다. (개발자의 자유도 보장)
- **@ConditionalOnProperty**: 설정 파일(\`application.yml\`)에 특정 속성이 설정되어 있을 때만 작동합니다.

---

## 3. 자동 설정의 입구: spring.factories

스프링 부트가 시작될 때, 클래스패스에 있는 모든 라이브러리의 \`META-INF/spring.factories\` (혹은 최신 버전의 \`org.springframework.boot.autoconfigure.AutoConfiguration.imports\`) 파일을 읽어 들입니다. 여기에 정의된 수많은 자동 설정 클래스들이 위에 언급한 \`@Conditional\`을 체크하며 실행됩니다.

---

## 4. 커스텀 스타터(Custom Starter) 제작하기

실무에서 공통 라이브러리를 만들 때 매우 유용합니다.
1. **Autoconfigure 모듈**: 자동 설정 로직(\`@Configuration\`)을 담습니다.
2. **Starter 모듈**: 의존성만 모아둔 껍데기 프로젝트입니다.
- 이를 통해 사내 공통 보안 로직이나 로깅 설정을 모든 프로젝트에 손쉽게 배포할 수 있습니다.

> **Deep Dive**: 자동 설정의 순서도 중요합니다. \`@AutoConfigureAfter\` 등을 사용하여 특정 설정이 다른 설정보다 먼저 혹은 나중에 실행되도록 세밀하게 제어할 수 있습니다.
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
