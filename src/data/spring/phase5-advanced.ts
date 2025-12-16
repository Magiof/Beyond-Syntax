import type { Phase } from '../curriculumData';

export const springAdvancedPhase: Phase = {
  id: "phase5",
  title: "Phase 5: Spring Boot 심화 & 성능 튜닝",
  goal: "애플리케이션의 시동 원리부터 대용량 트래픽 처리를 위한 아키텍처와 성능 튜닝 기법을 마스터합니다.",
  modules: [
    {
      id: "p5-m1",
      title: "Chapter 1: Spring Boot AutoConfiguration 원리",
      topic: "EnableAutoConfiguration, Condition, Starter",
      content: `
## 1. Spring Boot의 마법: AutoConfiguration

"설정 없이 바로 실행(Convention over Configuration)"은 어떻게 가능할까요?

### 1.1 @SpringBootApplication 해부
이 어노테이션은 사실 3가지 어노테이션의 조합입니다.
1. \`@Configuration\`: 설정 파일임
2. \`@ComponentScan\`: 빈 스캔
3. **\`@EnableAutoConfiguration\`**: 여기가 핵심!

### 1.2 자동 설정 메커니즘
스프링 부트가 시작될 때 \`META-INF/spring.factories\` (Spring Boot 2.7 이전) 또는 \`META-INF/spring/org.springframework.boot.autoconfigure.AutoConfiguration.imports\` (3.0 이후) 파일을 읽어 자동 설정 클래스 후보들을 로딩합니다.

### 1.3 조건부 설정 (@Conditional)
후보 군에 있는 설정들이 무조건 실행되는 것이 아닙니다. **조건**이 맞아야 빈으로 등록됩니다.

- \`@ConditionalOnClass(ObjectMapper::class)\`: 클래스패스에 Jackson 라이브러리가 있을 때만 동작
- \`@ConditionalOnMissingBean\`: 사용자가 직접 빈을 등록하지 않았을 때만 동작 (사용자 설정 우선)
- \`@ConditionalOnProperty\`: 특정 프로퍼티 값이 있을 때만 동작

\`\`\`mermaid
graph TD
    Start[App Start] --> Scan[Load AutoConfig Candidates]
    Scan --> Cond[Check @Conditional]
    Cond -- Pass --> Reg[Register Bean]
    Cond -- Fail --> Skip[Skip Config]
\`\`\`

---

## 2. Starter 의존성 관리
\`spring-boot-starter-web\` 하나만 추가해도 Tomcat, Jackson, Hibernate Validator 등이 딸려오는 원리는 Maven/Gradle의 **Transitive Dependencies (전이 의존성)** 덕분입니다.
`,
      keyPoints: [
        "@SpringBootApplication은 @EnableAutoConfiguration을 포함하며, 이것이 자동 설정의 진입점입니다.",
        "자동 설정 클래스들은 @Conditional 어노테이션을 사용하여 특정 조건(라이브러리 존재 여부 등) 하에서만 빈을 등록합니다.",
        "사용자가 직접 빈을 정의하면 @ConditionalOnMissingBean에 의해 자동 설정이 물러나며 유연성을 제공합니다."
      ]
    },
    {
      id: "p5-m2",
      title: "Chapter 2: AOP와 Transactional의 비밀",
      topic: "Proxy Pattern, CGLIB, Transaction Propagation, Isolation",
      content: `
## 1. 프록시(Proxy) 기반 AOP

\`@Transactional\`, \`@Cacheable\`, \`@Async\`는 모두 **AOP(Aspect Oriented Programming)** 로 동작합니다. 

### 1.1 프록시 객체 생성
스프링은 빈을 생성한 뒤, AOP 적용 대상이라면 그 빈을 감싸는 **프록시 객체**를 만들어 컨테이너에 등록합니다. 우리가 \`@Autowired\`로 주입받는 객체는 사실 원본이 아니라 프록시입니다.

\`\`\`mermaid
graph LR
    Client -->|call| Proxy[Proxy Object]
    Proxy -->|Transaction Begin| Logic[AOP Logic]
    Logic -->|call| Target[Real Service]
    Target -->|return| Logic
    Logic -->|Transaction Commit| Proxy
    Proxy -->|return| Client
\`\`\`

### 1.2 Self-Invocation 문제
프록시 내부에서 자신의 다른 메서드를 호출(\`this.method()\`)하면 AOP가 적용되지 않습니다. \`this\`는 프록시가 아닌 원본 객체이기 때문입니다.

\`\`\`java
public void outer() {
    inner(); // @Transactional 안 먹힘!
}

@Transactional
public void inner() { ... }
\`\`\`

**해결책**: 자기 자신을 주입받거나, 별도 서비스로 분리해야 합니다.

---

## 2. 트랜잭션 전파와 격리

### 2.1 Propagation (전파)
트랜잭션이 진행 중일 때 또 다른 트랜잭션을 시작하면 어떻게 될까요?

- **REQUIRED (Default)**: 기존 트랜잭션에 합류. 없으면 새로 생성.
- **REQUIRES_NEW**: 기존 것은 잠시 미루고(suspend), 무조건 새로운 트랜잭션 생성.
- **SUPPORTS**: 있으면 합류, 없으면 트랜잭션 없이 실행.

### 2.2 Isolation (격리 수준)
동시에 여러 트랜잭션이 수행될 때의 간섭 정도를 제어합니다.

- **READ_COMMITTED**: 커밋된 데이터만 읽음 (Oracle, SQL Server, PostgreSQL 기본)
- **REPEATABLE_READ**: 트랜잭션 내내 동일한 결과 조회 (MySQL InnoDB 기본 - MVCC 활용)

---

## 3. ReadOnly 최적화
\`@Transactional(readOnly = true)\`는 단순한 명시적 표시가 아닙니다.
- Hibernate의 **Dirty Checking** (변경 감지)을 생략하여 성능 향상
- DB 리플리카(Slave)로 쿼리를 라우팅할 수 있는 힌트 제공
`,
      keyPoints: [
        "스프링 AOP는 프록시 패턴으로 동작하므로 내부 호출(Self-Invocation) 시에는 적용되지 않습니다.",
        "REQUIRES_NEW는 물리적으로 다른 DB 커넥션을 사용하므로 데드락이나 리소스 고갈에 주의해야 합니다.",
        "readOnly=true 옵션은 더티 체킹 생략 등을 통해 조회 성능을 최적화합니다."
      ]
    },
    {
      id: "p5-m3",
      title: "Chapter 3: JPA Internals & Query Tuning",
      topic: "Persistence Context, Dirty Checking, N+1 Problem, Fetch Join, OSIV",
      content: `
## 1. 영속성 컨텍스트 (Persistence Context)

엔티티를 영구 저장하는 환경으로, 논리적 개념입니다. \`EntityManager\`가 이를 관리합니다.

### 1.1 핵심 기능
1. **1차 캐시**: DB 조회 전 메모리에서 먼저 찾음.
2. **쓰기 지연 (Transactional Write-behind)**: 커밋 시점까지 쿼리를 모았다가 한 번에 전송.
3. **변경 감지 (Dirty Checking)**: \`update()\` 호출 없이, 객체 값만 바꾸면 커밋 시점에 자동으로 UPDATE 쿼리 발생.

### 1.2 주의점
영속성 컨텍스트는 **트랜잭션 단위**로 생성되고 소멸됩니다 (OSIV Off 기준).

---

## 2. N+1 문제와 해결책

JPA의 가장 흔하고 치명적인 성능 이슈입니다. 1개의 쿼리로 목록을 조회했는데, 연관된 엔티티를 조회하기 위해 N개의 추가 쿼리가 발생하는 현상입니다.

### 2.1 원인
\`@ManyToOne(fetch = FetchType.LAZY)\`라도 루프를 돌며 연관 객체에 접근하면 쿼리가 나갑니다.

### 2.2 해결책 1: Fetch Join (가장 확실)
JPQL에서 \`join fetch\`를 사용하여 한 번의 쿼리로 연관 데이터를 다 가져옵니다.

\`\`\`java
@Query("SELECT p FROM Post p JOIN FETCH p.author")
List<Post> findAllWithAuthor();
\`\`\`

### 2.3 해결책 2: EntityGraph
어노테이션으로 Fetch Join 효과를 냅니다.

\`\`\`java
@EntityGraph(attributePaths = {"author"})
List<Post> findAll();
\`\`\`

### 2.4 해결책 3: Batch Size
\`in\` 쿼리로 묶어서 가져옵니다. (\`hibernate.default_batch_fetch_size\` 설정)
1000개의 N+1이 발생할 것을 1개의 \`in\` 쿼리로 줄여줍니다.

---

## 3. OSIV (Open Session In View)

트랜잭션이 끝나도 뷰 렌더링 시점까지 영속성 컨텍스트를 살려두는 설정입니다.

- **장점**: Controller/View에서도 Lazy Loading 가능.
- **단점**: DB 커넥션을 뷰 렌더링 끝날 때까지 물고 있어서, 트래픽이 몰리면 커넥션 고갈로 장애 발생 가능.

**권장**: 실무에서는 \`spring.jpa.open-in-view: false\`로 끄고, 필요한 데이터는 Service 계층에서 다 로딩해서 DTO로 반환하는 것이 안전합니다.
`,
      keyPoints: [
        "변경 감지(Dirty Checking) 덕분에 update 쿼리를 직접 짤 필요가 없습니다.",
        "N+1 문제는 지연 로딩에서도 발생하며, 주로 Fetch Join으로 해결합니다.",
        "OSIV는 편의성을 주지만, 대용량 트래픽 환경에서는 치명적인 장애 원인이 될 수 있어 끄는 것을 권장합니다."
      ],
      codeExamples: [
        {
          title: "N+1 문제 재현과 해결",
          language: "java",
          code: `// Repository
public interface PostRepository extends JpaRepository<Post, Long> {
    
    // N+1 발생!
    @Query("SELECT p FROM Post p")
    List<Post> findAllBasic();
    
    // 해결: Fetch Join
    @Query("SELECT p FROM Post p JOIN FETCH p.author")
    List<Post> findAllWithAuthor();
}

// Service
@Transactional
public List<PostDto> getPosts() {
    // 1. findAllBasic() 호출 시: SELECT * FROM post (1건)
    List<Post> posts = postRepository.findAllBasic();
    
    // 2. DTO 변환 과정에서 author 접근
    return posts.stream().map(p -> {
        // 여기서 author 쿼리가 N번 발생! (N+1)
        return new PostDto(p.getTitle(), p.getAuthor().getName());
    }).toList();
}

// 해결된 버전
@Transactional
public List<PostDto> getPostsOptimized() {
    // 한 번의 쿼리로 author까지 다 가져옴 (Inner Join)
    List<Post> posts = postRepository.findAllWithAuthor();
    
    // 추가 쿼리 없이 변환 가능
    return posts.stream()
        .map(p -> new PostDto(p.getTitle(), p.getAuthor().getName()))
        .toList();
}`
        }
      ]
    },
    {
      id: "p5-m4",
      title: "Chapter 4: Spring Security Architecture",
      topic: "FilterChainProxy, SecurityContext, Authentication vs Authorization",
      content: `
## 1. Security Architecture 개요

Spring Security는 **Servlet Filter** 기반으로 동작합니다. DispatcherServlet이 실행되기 **전**에 요청을 가로채 인증/인가를 수행합니다.

### 1.1 FilterChainProxy
서블릿 컨테이너(Tomcat)와 스프링 컨텍스트 사이의 다리 역할을 하는 특수 필터입니다. \`DelegatingFilterProxy\`를 통해 스프링 빈으로 등록된 필터 체인을 실행합니다.

\`\`\`mermaid
graph LR
    Req[Request] --> Tomcat[Tomcat Filters]
    Tomcat --> DF[DelegatingFilterProxy]
    DF --> FCP[FilterChainProxy]
    FCP --> Sec1[SecurityFilter 1]
    FCP --> Sec2[SecurityFilter 2]
    Sec2 --> DS[DispatcherServlet]
\`\`\`

---

## 2. 핵심 컴포넌트

### 2.1 SecurityContextHolder
현재 스레드의 보안 컨텍스트(누가 로그인했는지)를 저장합니다. 기본적으로 **ThreadLocal**을 사용합니다.
(비동기 처리 시에는 \`MODE_INHERITABLETHREADLOCAL\` 등을 설정해야 전파됨)

### 2.2 Authentication (인증)
"당신은 누구인가?"
- \`AuthenticationManager\`가 처리를 담당
- 성공 시 \`Authentication\` 객체 생성 (Principal, Credentials, Authorities 포함)

### 2.3 Authorization (인가)
"당신은 이것을 할 권한이 있는가?"
- \`FilterSecurityInterceptor\` (URL 기반) 또는 AOP (메서드 기반)
- \`AccessDecisionManager\`가 판단

---

## 3. 인증 흐름 (UsernamePasswordAuthenticationFilter)

1. 로그인 요청 (POST /login)
2. \`UsernamePasswordAuthenticationToken\` (미인증) 생성
3. \`AuthenticationManager\`에게 전달
4. \`UserDetailsService\`가 DB에서 유저 정보 로드
5. 패스워드 검증
6. 인증 성공 시 \`Authentication\` 객체(인증됨)를 \`SecurityContext\`에 저장
`,
      keyPoints: [
        "Spring Security는 서블릿 필터 체인을 통해 DispatcherServlet 진입 전에 보안 로직을 수행합니다.",
        "SecurityContextHolder는 ThreadLocal을 사용하여 애플리케이션 전역에서 인증 정보에 접근할 수 있게 합니다.",
        "인증(Authentication)은 신원 확인, 인가(Authorization)는 권한 부여 프로세스입니다."
      ]
    },
    {
      id: "p5-m5",
      title: "Chapter 5: 대용량 트래픽 처리 & 성능 튜닝",
      topic: "Thread Pool, Connection Pool, Caching, Bulkhead",
      content: `
## 1. Thread Pool & Connection Pool 튜닝

### 1.1 HikariCP (DB Connection Pool)
적절한 커넥션 풀 사이즈는?
**공식:** \`Pool Size = Tn x (Cm - 1) + 1\`
(Tn: 전체 스레드 수, Cm: 하나의 Task가 동시에 필요한 커넥션 수)

하지만 일반적으로는:
\`Pool Size = Core Count * 2 + Effective Spindle Count(디스크 수)\`
DB가 병목이므로 너무 늘려도 성능은 오르지 않고 컨텍스트 스위칭 비용만 듭니다. 보통 10~20 정도로 시작합니다.

### 1.2 Tomcat Thread Pool
기본 200개입니다. 너무 많으면 CPU 오버헤드, 너무 적으면 요청 대기(Queue)가 발생합니다. I/O 작업 비중이 높을수록 많이 필요합니다.

---

## 2. 캐싱 전략 (Caching Strategy)

DB 부하를 줄이는 가장 효과적인 방법입니다.

### 2.1 Local Cache (Caffeine, Ehcache)
- **장점**: 네트워크 비용 0 (가장 빠름)
- **단점**: 서버 간 데이터 불일치 가능성, JVM 메모리 점유
- **용도**: 자주 변하지 않는 글로벌 설정 데이터 (코드 정보, 카테고리 등)

### 2.2 Global Cache (Redis, Memcached)
- **장점**: 모든 서버가 데이터 공유
- **단점**: 네트워크 I/O 발생
- **용도**: **세션 저장소**, 빈번하게 변경되지만 조회도 많은 데이터

### 2.3 트래픽 처리를 위한 패턴
**Look Aside (Lazy Loading)** 패턴:
1. 캐시 조회 -> 있으면 리턴 (Cache Hit)
2. 없으면 DB 조회 -> 캐시에 저장 -> 리턴 (Cache Miss)

---

## 3. 격리 (Bulkhead) 패턴

선박의 격벽처럼, 한 서비스의 장애가 전체로 전파되는 것을 막습니다.
외부 API A 호출과 B 호출이 있을 때, A가 느려져서 스레드가 다 잠기면 B도 호출 못 하게 됩니다.

이를 방지하기 위해 **스레드 풀을 분리**합니다.
- A 서비스용 스레드 풀: 10개
- B 서비스용 스레드 풀: 10개
이렇게 하면 A가 죽어도 B는 정상 동작합니다. Resilience4j 같은 라이브러리를 사용합니다.
`,
      keyPoints: [
        "HikariCP의 풀 사이즈는 무작정 늘리는 것이 아니라 CPU 코어 수와 디스크 I/O 성능에 맞춰 튜닝해야 합니다.",
        "로컬 캐시는 속도가 빠르지만 정합성 맞추기가 어렵고, 글로벌 캐시는 공유가 쉽지만 네트워크 비용이 듭니다.",
        "Bulkhead 패턴을 통해 특정 외부 의존성의 장애가 전체 시스템 장애로 확산되는 것을 방지할 수 있습니다."
      ]
    },
    {
      id: "p5-m6",
      title: "Chapter 6: Spring WebFlux & Reactor",
      topic: "Non-blocking I/O, Netty, Mono, Flux, Backpressure",
      content: `
## 1. Spring MVC vs WebFlux

### 1.1 Spring MVC (Thread-per-Request)
- 요청마다 스레드를 할당합니다 (Tomcat 기본 200개).
- I/O 작업(DB, 외부 API) 중에는 스레드가 **블로킹(Blocking)** 되어 대기합니다.
- 동시 접속자가 많으면 스레드 풀 고갈(Thread Pool Hell)이 발생합니다.

### 1.2 Spring WebFlux (Event Loop)
- Node.js처럼 적은 수의 스레드(Event Loop)로 동작합니다 (CPU 코어 수 * 2).
- I/O가 발생하면 비동기로 처리하고 스레드는 다른 요청을 처리합니다 (**Non-Blocking**).
- 적은 리소스로 엄청난 동시성 처리가 가능합니다. (단, CPU 연산이 많은 작업엔 부적합)

---

## 2. Project Reactor: Mono & Flux

### 2.1 리액티브 타입
- **Mono<T>**: 0 또는 1개의 데이터 방출 (Optional과 유사)
- **Flux<T>**: 0 ~ N개의 데이터 방출 (Collection과 유사)

### 2.2 동작 원리
WebFlux에서는 데이터를 리턴한다고 바로 전송되는 것이 아닙니다. 스트림을 정의(Assembly)한 것이고, 실제 요청이 들어와 구독(Subscribe)이 일어나야 데이터가 흐릅니다.

\`\`\`java
public Mono<User> getUser(String id) {
    return userRepository.findById(id)
        .map(user -> enhance(user))
        .defaultIfEmpty(User.EMPTY);
}
\`\`\`

---

## 3. Netty와 Event Loop

WebFlux의 기본 내장 서버는 **Netty**입니다.

\`\`\`mermaid
graph TD
    Req1 --> Loop[Event Loop Thread]
    Req2 --> Loop
    Loop -->|Non-blocking| DB[Database]
    Loop -->|Non-blocking| API[External API]
    DB -->|Callback| Loop
    API -->|Callback| Loop
\`\`\`

이벤트 루프 스레드는 절대 블로킹되면 안 됩니다. (\`Thread.sleep\`, 블로킹 DB 드라이버 사용 금지)
`,
      keyPoints: [
        "WebFlux는 Event Loop와 Non-blocking I/O를 사용하여 스레드 효율성을 극대화합니다.",
        "Mono는 0~1개, Flux는 0~N개의 데이터를 다루는 리액티브 스트림 구현체입니다.",
        "WebFlux 애플리케이션에서는 블로킹 호출을 절대적으로 피해야 전체 성능이 붕괴되지 않습니다."
      ]
    }
  ]
};
