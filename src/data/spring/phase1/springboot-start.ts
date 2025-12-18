import type { Module } from '../../curriculumData';

export const springbootStart: Module = {
    id: "springboot-start",
    title: "Chapter 3: Spring Boot 시작하기",
    topic: "application.yml, 프로파일, 자동 설정, 로깅",
    content: `
## 1. 설정 관리
\`application.yml\` 또는 \`application.properties\`를 통해 전체 설정을 관리합니다.

## 2. 프로파일 (Profiles)
dev, prod 등 환경별로 설정을 분리하여 실행할 수 있습니다.

## 3. 자동 설정 (Auto Configuration)
클래스패스에 있는 jar 라이브러리를 감지하여 스프링 빈을 자동으로 설정해줍니다.
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
