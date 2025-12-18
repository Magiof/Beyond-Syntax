import type { Module } from '../../curriculumData';

export const springSecurityArchitecture: Module = {
    id: "spring-security-architecture",
    title: "Chapter 4: Spring Security Architecture",
    topic: "FilterChainProxy, SecurityContext, Authentication vs Authorization",
    content: `
## 1. 보안 필터 체인
서블릿 컨테이너 앞단에서 요청을 필터링하여 인증과 인가를 처리합니다.

## 2. 인증 (Authentication)
사용자가 누구인지 확인하는 과정입니다. (ID/PW, OAuth2 등)

## 3. 인가 (Authorization)
인증된 사용자가 특정 리소스에 접근할 권한이 있는지 확인합니다.
`,
    codeExamples: [
        {
            title: "보안 설정",
            language: "java",
            code: `@Bean\npublic SecurityFilterChain filterChain(HttpSecurity http) { ... }`
        }
    ],
    keyPoints: [
        "스레드 로컬을 이용해 인증 정보를 전역적으로 공유합니다.",
        "인증 정보는 SecurityContext에 저장됩니다."
    ],
    interviewQuestions: [
        {
            difficulty: 'Medium',
            question: "인가 처리는 어디서 발생하나요?",
            answer: "FilterSecurityInterceptor 또는 MethodSecurityInterceptor에서 처리합니다."
        }
    ]
};
