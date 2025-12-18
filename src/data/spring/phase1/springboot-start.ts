import type { Module } from '../../curriculumData';

export const springbootStart: Module = {
    id: "springboot-start",
    title: "Chapter 3: Spring Boot와 생산성 혁명",
    topic: "설정 최적화, Starter, Auto-configuration, 내장 WAS",
    content: `
## 1. 설정의 지옥 (Configuration Hell)에서 탈출하기

레거시 스프링(v2.x, v3.x)은 강력했지만, 개발을 시작하기 위해 방대한 양의 XML이나 Java Config 설정을 직접 작성해야 했습니다. **Spring Boot**는 "설정보다 관례(Convention over Configuration)"라는 원칙 하에 이를 자동화했습니다.

---

## 2. 스프링 부트의 3대 핵심 마법

### 2.1 Starter (의존성 관리 자동화)
\`spring-boot-starter-web\` 하나만 추가하면, 웹 개발에 필요한 모든 라이브러리(Spring MVC, Jackson, Tomcat 등)의 버전을 알아서 맞춰서 가져옵니다. "버전 호환성" 문제로 고통받던 시대가 끝났습니다.

### 2.2 Auto-configuration (자동 설정)
애플리케이션 클래스 패스에 특정 라이브러리가 있는지, 혹은 특정 빈이 정의되어 있는지 확인하여 자동으로 설정을 구성합니다.
- 예: \`mysql-connector-java.jar\`가 있으면 자동으로 \`DataSource\` 빈을 생성할 준비를 합니다.

### 2.3 내장 서버 (Embedded Server)
WAS(Tomcat, Jetty 등)를 설치하고 WAR 파일을 배포하는 복잡한 과정 없이, 애플리케이션 자체를 단독으로 실행 가능한 JAR 파일로 만듭니다. 이는 MSA 환경에서 배포를 획기적으로 단순화했습니다.

---

## 3. 핵심 어노테이션: @SpringBootApplication

이 어노테이션 하나에 세 가지 중요한 설정이 들어있습니다.
1. **@SpringBootConfiguration**: 부트 전용 설정임을 명시.
2. **@EnableAutoConfiguration**: 위에 언급한 자동 설정을 활성화.
3. **@ComponentScan**: 현재 패키지부터 하위 패키지까지 빈(\`@Component\`)을 찾아 등록.

> **Tip**: 실무에서는 자동 설정이 편리하지만, 가끔 의도치 않은 설정이 적용될 수 있습니다. \`@SpringBootApplication(exclude = { ... })\`를 통해 특정 자동 설정을 제외할 수 있다는 점을 기억하세요.
`,
    codeExamples: [
        {
            title: "YAML 설정 예시",
            language: "yaml",
            code: "spring:\n  profiles:\n    active: dev"
        }
    ],
    keyPoints: [
        "YAML 형식이 가독성이 좋아 실무에서 선호됩니다.",
        "환경별 프로파일 분리는 필수적입니다."
    ],
    interviewQuestions: [
        {
            difficulty: 'Medium',
            question: "자동 설정의 원리는?",
            answer: "@EnableAutoConfiguration이 spring.factories 파일을 읽어 조건에 맞는 빈을 로딩합니다."
        }
    ]
};
