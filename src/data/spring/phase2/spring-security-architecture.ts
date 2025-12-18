import type { Module } from '../../curriculumData';

export const springSecurityArchitecture: Module = {
    id: "spring-security-architecture",
    title: "Chapter 4: Spring Security의 거대한 장벽: 필터 체인 분석",
    topic: "DelegatingFilterProxy, SecurityFilterChain, 인증(Authentication) vs 인가(Authorization)",
    content: `
## 1. 스프링 시큐리티는 '필터(Filter)'다

많은 개발자가 스프링 시큐리티를 어렵게 느끼는 이유는 동작 방식이 서블릿 필터 체인에 기반하기 때문입니다.
- **DelegatingFilterProxy**: 서블릿 컨테이너와 스프링 컨테이너 사이의 가교 역할을 합니다.
- **FilterChainProxy**: 실제 스프링 시큐리티의 핵심 로직이 담긴 필터 리스트를 관리합니다.

---

## 2. 보안의 두 기둥: 인증과 인가

1. **인증 (Authentication)**: "당신은 누구입니까?"에 대한 확인 과정입니다. (ID/PW, 소셜 로그인 등)
   - \`AuthenticationManager\`가 이 과정을 주도하며, \`AuthenticationProvider\`를 통해 실제 사용자 정보를 대조합니다.
2. **인가 (Authorization)**: "당신은 이 자원에 권한이 있습니까?"에 대한 확인 과정입니다. (Role-based, Permission-based)
   - \`AccessDecisionManager\`가 접근 허용 여부를 최종 결정합니다.

---

## 3. JWT (JSON Web Token)와 무상태 아키텍처

최근의 웹 서비스는 서버의 세션을 사용하지 않는 **Stateless** 방식을 선호합니다.
- **동작 방식**: 사용자가 로그인하면 서버는 암호화된 토큰을 발행합니다. 이후 클라이언트는 모든 요청 헤더에 이 토큰을 실어 보냅니다.
- **필터 구현**: \`OncePerRequestFilter\`를 상속받아 직접 JWT 유효성을 검증하는 커스텀 필터를 필터 체인 앞단에 배치합니다.

---

## 4. 인증 객체의 보관소: SecurityContextHolder

인증이 성공하면 사용자 정보는 \`SecurityContextHolder\` 안에 저장됩니다.
- **ThreadLocal**: 기본적으로 쓰레드 로컬에 저장되므로, 같은 쓰레드 내 어디서든 \`SecurityContextHolder.getContext().getAuthentication()\`을 통해 로그인 정보를 가져올 수 있습니다.
- **주의**: 비동기 처리나 가상 스레드 사용 시 쓰레드 로컬 데이터 유실에 주의해야 합니다. (Phase 3에서 심화 학습)
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
