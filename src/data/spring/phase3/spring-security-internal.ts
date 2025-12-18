import type { Module } from '../../curriculumData';

export const springSecurityInternal: Module = {
    id: "spring-security-internal",
    title: "Chapter 3: Spring Security Internals",
    topic: "DelegatingFilterProxy, SecurityFilterChain, Authentication vs Authorization, OAuth2 Flow",
    content: `
## 1. 스프링 시큐리티의 핵심: 서블릿 필터 체인

스프링 시큐리티는 스프링 컨테이너의 빈이 아닌 **'서블릿 필터'** 기반으로 동작합니다. 이를 스프링 빈과 연결하기 위해 \`DelegatingFilterProxy\`를 사용합니다.

- **DelegatingFilterProxy**: 서블릿 컨테이너(Tomcat)와 스프링 컨테이너 사이의 가교 역할.
- **FilterChainProxy**: 실제 시큐리티 관련 필터들을 관리하는 스프링 빈.
- **SecurityFilterChain**: 특정 요청 패턴에 적용될 필터들의 목록.

---

## 2. 인증(Authentication) 흐름

1. **사용자 요청**: \`UsernamePasswordAuthenticationFilter\`가 요청을 가로챔.
2. **Token 생성**: 아이디/비번 기반으로 \`UsernamePasswordAuthenticationToken\` 생성.
3. **Manager 전달**: \`AuthenticationManager\`(구현체: ProviderManager)에게 인증 위임.
4. **Provider 탐색**: \`AuthenticationProvider\`들 중 적절한 공급자를 찾아 실제 인증 수행 (DB 조회 등).
5. **Session/SecurityContext 저장**: 인증 성공 시 \`SecurityContextHolder\`에 정보를 저장.

---

## 3. 권한 부여(Authorization) 흐름

인증된 사용자라도 특정 자원에 접근 가능한지 확인하는 과정입니다.
- **FilterSecurityInterceptor**: HTTP 요청의 권한 검사를 담당하는 필터.
- **AccessDecisionManager**: (이전 방식) 투표 기반 권한 결정.
- **AuthorizationManager**: (Java 17+, 스프링 시큐리티 6.x 방식) 더 단순화된 권한 결정 구조.

---

## 4. OAuth2 및 JWT 연동

현대적인 백엔드 아키텍처에서 필수적인 요소입니다.
- **OAuth2**: 구글, 카카오 등 제3자 인증을 통한 권한 획득.
  - \`Authorization Code Grant\`: 가장 안전한 방식.
- **JWT (JSON Web Token)**: 상태를 서버에 저장하지 않는(Stateless) 토큰 방식.
  - 시큐리티 필터 중간에 JWT 검증 필터를 직접 구현해서 끼워 넣는 형식을 많이 사용합니다.

---

## 5. 실전 가이드: 시큐리티 6.x 변경 사항

최근 스프링 시큐리티는 메서드 체이닝 방식 대신 **람다 형식 설정**으로 변경되었습니다.
\`\`\`java
@Bean
public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    http
        .authorizeHttpRequests(auth -> auth
            .requestMatchers("/admin/**").hasRole("ADMIN")
            .anyRequest().authenticated()
        )
        .oauth2Login(Customizer.withDefaults()); // OAuth2 활성화
    return http.build();
}
\`\`\`
`,
    codeExamples: [
        {
            title: "커스텀 AuthenticationProvider 구현",
            language: "java",
            code: `@Component
public class CustomAuthProvider implements AuthenticationProvider {
    @Override
    public Authentication authenticate(Authentication auth) {
        String name = auth.getName();
        String password = auth.getCredentials().toString();
        // 실제 DB 조회 및 패스워드 검증 로직
        return new UsernamePasswordAuthenticationToken(name, password, authorities);
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return UsernamePasswordAuthenticationToken.class.isAssignableFrom(authentication);
    }
}`
        }
    ],
    keyPoints: [
        "스프링 시큐리티는 필터 체인을 기반으로 동작하며, 스프링 빈과의 연동을 위해 proxy 필터를 사용합니다.",
        "인증(Authentication)은 '누구인지', 인가(Authorization)는 '무엇을 할 수 있는지'를 뜻합니다.",
        "SecurityContextHolder의 기본 모드는 ThreadLocal이므로, 스레드가 바뀌면 정보가 공유되지 않습니다."
    ],
    interviewQuestions: [
        {
            difficulty: 'Hard',
            question: "DelegatingFilterProxy의 역할은 무엇인가요?",
            answer: "서블릿 표준 필터 기술을 사용하여 필터로 등록하고, 실제 처리는 스프링 빈으로 등록된 FilterChainProxy에게 위임하여 스프링 기술을 활용할 수 있게 해줍니다."
        },
        {
            difficulty: 'Hell',
            question: "JWT를 사용할 때 SecurityContext를 매번 생성하는 이유는 무엇인가요?",
            answer: "JWT는 세션을 유지하지 않는 무상태(Stateless) 방식이므로, 각 요청마다 토큰을 검증하고 일시적으로 SecurityContext에 사용자 정보를 채워주어야 시큐리티 기능을 사용할 수 있습니다."
        }
    ]
};
