import type { Phase } from '../curriculumData';

export const springAdvancedPhase: Phase = {
  id: "phase5",
  title: "Phase 5: Spring Boot 심화 & 내부 구조",
  goal: "Spring Boot의 마법을 걷어내고 AutoConfiguration, AOP 프록시, 트랜잭션 관리의 내부 동작 원리를 깊이 있게 이해합니다.",
  modules: [
    {
      id: "p5-m1",
      title: "Chapter 1: AutoConfiguration Internals",
      topic: "@AutoConfiguration, @Conditional, SpringFactoriesLoader, ImportSelector",
      content: `
## 1. Spring Boot의 "마법": AutoConfiguration

Spring Boot는 수많은 설정을 자동으로 처리해줍니다. 이 "마법"의 핵심은 **AutoConfiguration**입니다.
이 챕터에서는 스프링 부트가 어떻게 자동으로 빈을 등록하고 설정을 구성하는지 내부 원리를 파헤칩니다.

---

## 2. 자동 설정의 시작: @EnableAutoConfiguration

\`@SpringBootApplication\` 어노테이션을 열어보면 다음과 같습니다:

\`\`\`java
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Inherited
@SpringBootConfiguration
@EnableAutoConfiguration  // 핵심!
@ComponentScan(excludeFilters = { ... })
public @interface SpringBootApplication { ... }
\`\`\`

### 2.1 @EnableAutoConfiguration 동작 원리

이 어노테이션은 \`@Import(AutoConfigurationImportSelector.class)\`를 내포하고 있습니다.
\`AutoConfigurationImportSelector\`는 클래스패스에서 적절한 설정 클래스들을 찾아 스프링 컨테이너에 등록합니다.

**로드 과정:**
1. \`META-INF/spring/org.springframework.boot.autoconfigure.AutoConfiguration.imports\` 파일 확인 (Spring Boot 2.7+ 부터)
   * (이전 버전은 \`META-INF/spring.factories\` 사용)
2. 해당 파일에 나열된 수많은 \`...AutoConfiguration\` 클래스들의 이름을 로드
3. **조건(@Conditional)**에 맞지 않는 클래스 필터링
4. 남은 설정 클래스들을 빈으로 등록

---

## 3. 조건부 등록: @Conditional

모든 자동 설정 클래스가 다 등록되면 앱이 무거워지고 충돌이 발생할 것입니다.
그래서 **@Conditional** 어노테이션을 사용하여 **특정 조건이 만족될 때만** 빈을 등록합니다.

### 3.1 주요 Conditional 어노테이션

| 어노테이션 | 설명 |
|------------|------|
| \`@ConditionalOnClass\` | 특정 클래스가 클래스패스에 있을 때만 |
| \`@ConditionalOnMissingBean\` | 특정 빈이 이미 정의되어 있지 않을 때만 (사용자 정의 우선) |
| \`@ConditionalOnProperty\` | 특정 프로퍼티(application.properties)가 설정되어 있을 때만 |
| \`@ConditionalOnWebApplication\` | 웹 애플리케이션일 때만 |
| \`@ConditionalOnResource\` | 특정 리소스 파일이 존재할 때만 |

### 3.2 분석 예시: JdbcTemplateAutoConfiguration

\`\`\`java
@AutoConfiguration(after = DataSourceAutoConfiguration.class)
@ConditionalOnClass({ DataSource.class, JdbcTemplate.class }) // 1. 라이브러리가 있어야 함
@ConditionalOnSingleCandidate(DataSource.class) // 2. 데이터소스가 하나만 있어야 함
@EnableConfigurationProperties(JdbcProperties.class)
@Import({ DatabaseInitializationDependencyConfigurer.class, ... })
public class JdbcTemplateAutoConfiguration {

    @Configuration(proxyBeanMethods = false)
    @ConditionalOnMissingBean(JdbcOperations.class) // 3. 사용자가 직접 정의한 게 없으면 등록
    static class JdbcTemplateConfiguration {

        @Bean
        @Primary
        public JdbcTemplate jdbcTemplate(DataSource dataSource, JdbcProperties properties) {
            JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
            // 설정 적용...
            return jdbcTemplate;
        }
    }
}
\`\`\`

**해설:**
- \`spring-boot-starter-jdbc\`를 의존성에 추가하면 \`DataSource\`, \`JdbcTemplate\` 클래스가 로드됨
- \`@ConditionalOnClass\` 충족 -> 설정 활성화
- 개발자가 직접 \`JdbcTemplate\` 빈을 만들지 않았다면 (\`@ConditionalOnMissingBean\`), 스프링 부트가 자동으로 만들어줌
- 만약 개발자가 직접 빈을 등록하면? 자동 설정은 물러남 (Backing off)

---

## 4. 사용자 정의 AutoConfiguration 만들기

우리만의 스타터(Starter)를 만들 수도 있습니다.

### 4.1 스타터 구조
\`\`\`mermaid
graph TD
    Starter[my-library-spring-boot-starter]
    AutoConfig[my-library-autoconfigure<br/>Auto Configuration Module]
    Lib[my-library<br/>Core Logic Module]
    
    Starter --> AutoConfig
    Starter --> Lib
    
    AutoConfig -.->|Contains| Files[AutoConfiguration Class<br/>.imports File]
\`\`\`

### 4.2 설정 순서 제어
- \`@AutoConfiguration(before = ...)\`
- \`@AutoConfiguration(after = ...)\`

순서는 빈 생성 순서가 아니라 **설정 클래스 적용 순서**임에 유의해야 합니다.

---

## 5. SpringFactoriesLoader (Legacy but Important)

Spring 3.0부터 도입된 팩토리 로딩 메커니즘으로, SPI(Service Provider Interface)와 유사합니다.
스프링 내부적으로 확장 기능을 로드할 때 광범위하게 사용됩니다 (MessageConverter, TestContextBootstrapper 등).

\`\`\`java
List<MyService> services = SpringFactoriesLoader.loadFactories(
    MyService.class, 
    classLoader
);
\`\`\`
`,
      codeExamples: [
        {
          title: "Custom AutoConfiguration 구현",
          language: "java",
          code: `// 1. 핵심 기능을 담당하는 라이브러리 클래스
public class GreetingService {
    private final String message;

    public GreetingService(String message) {
        this.message = message;
    }

    public String greet() {
        return message;
    }
}

// 2. 프로퍼티 클래스 (application.properties 연동)
@ConfigurationProperties(prefix = "my.greeting")
public class GreetingProperties {
    private String message = "Hello, World"; // 기본값
    
    // getter, setter...
}

// 3. 자동 설정 클래스
@AutoConfiguration
@ConditionalOnClass(GreetingService.class)
@EnableConfigurationProperties(GreetingProperties.class)
public class GreetingAutoConfiguration {

    private final GreetingProperties properties;

    public GreetingAutoConfiguration(GreetingProperties properties) {
        this.properties = properties;
    }

    @Bean
    @ConditionalOnMissingBean // 사용자가 정의하면 이건 등록 안 함
    public GreetingService greetingService() {
        return new GreetingService(properties.getMessage());
    }
}

// 4. 등록 파일 (META-INF/spring/org.springframework.boot.autoconfigure.AutoConfiguration.imports)
// com.example.starter.GreetingAutoConfiguration`
        },
        {
          title: "ImportSelector 동작 이해",
          language: "java",
          code: `import org.springframework.context.annotation.ImportSelector;
import org.springframework.core.type.AnnotationMetadata;

// 동적으로 설정 클래스를 선택하는 Selector
public class MyFeatureImportSelector implements ImportSelector {

    @Override
    public String[] selectImports(AnnotationMetadata importingClassMetadata) {
        // 환경 변수나 조건에 따라 다른 설정 클래스 리턴 가능
        boolean isEnabled = Boolean.parseBoolean(
            System.getProperty("my.feature.enabled", "false")
        );

        if (isEnabled) {
            return new String[] { "com.example.MyFeatureConfig" };
        } else {
            return new String[0]; // 아무것도 등록 안 함
        }
    }
}

@Configuration
@Import(MyFeatureImportSelector.class) // Selector 사용
public class AppConfig {
    // ...
}`
        }
      ],
      keyPoints: [
        "@EnableAutoConfiguration은 ImportSelector를 통해 클래스패스의 자동 설정 클래스들을 스캔합니다.",
        "spring.factories (구버전) 또는 AutoConfiguration.imports (신버전) 파일에 설정 클래스 목록이 있습니다.",
        "@ConditionalOnClass, @ConditionalOnMissingBean 등의 조건부 어노테이션이 핵심적인 필터링 역할을 합니다.",
        "사용자가 빈을 직접 정의하면 @ConditionalOnMissingBean에 의해 자동 설정 빈 생성은 취소됩니다(Back-off).",
        "자신만의 스타터 패키지를 만들 때도 동일한 메커니즘을 사용하여 플러그앤플레이(Plug-and-Play) 모듈을 구현할 수 있습니다."
      ]
    },
    {
      id: "p5-m2",
      title: "Chapter 2: Proxy & AOP Internals",
      topic: "JDK Dynamic Proxy, CGLIB, ProxyFactory, Self-Invocation Issue",
      content: `
## 1. 스프링 AOP의 기반: 프록시(Proxy)

스프링 AOP는 **런타임 위빙(Runtime Weaving)** 방식을 사용하며, 이는 **프록시 객체**를 통해 구현됩니다.
프록시는 클라이언트와 실제 대상(Target) 객체 사이에 위치하여, 메서드 호출을 가로채고 부가 기능(Advice)을 수행합니다.

---

## 2. JDK Dynamic Proxy vs CGLIB

스프링은 두 가지 방식의 프록시를 상황에 따라 선택하여 사용합니다.

### 2.1 JDK Dynamic Proxy
- **Java 표준 API** (\`java.lang.reflect.Proxy\`) 사용
- **인터페이스가 필수**입니다. 인터페이스를 구현한 프록시 객체를 만듭니다.
- 리플렉션을 사용하여 호출하므로 약간의 성능 저하가 있을 수 있습니다 (최신 JVM에서는 많이 개선됨).

### 2.2 CGLIB (Code Generation Library)
- **바이트코드 조작**을 통해 프록시 생성
- **클래스 상속**을 통해 프록시를 만듭니다 (Target 클래스를 상속).
- 인터페이스가 없어도 됩니다.
- **제약 사항**:
  - \`final\` 클래스나 \`final\` 메서드는 오버라이딩 불가하므로 프록시 적용 불가
  - 기본 생성자가 필요할 수 있음 (Spring 4+ Objenesis 라이브러리로 해결됨)

> **Spring Boot의 기본값**:
> 과거에는 인터페이스가 있으면 JDK Proxy, 없으면 CGLIB이었으나,
> **Spring Boot 2.0부터는 CGLIB이 기본값(proxyTargetClass=true)**입니다.
> 이유: 인터페이스 없는 빈 주입 시 예외 방지 등 편의성 위함.

---

## 3. ProxyFactory & Advisor

스프링은 프록시 기술을 추상화한 \`ProxyFactory\`를 제공합니다.

\`\`\`mermaid
graph LR
    PF[ProxyFactory] --> Decision{JDK or CGLIB?}
    Decision -->|Has Interface| JDK[JDK Dynamic Proxy]
    Decision -->|No Interface| CGLIB[CGLIB Proxy]
    JDK --> Proxy[Actual Proxy Object]
    CGLIB --> Proxy
\`\`\`

- **Advice**: 부가 기능 로직 (예: 트랜잭션, 로깅)
- **Pointcut**: 부가 기능을 어디에 적용할지 판단 (필터링)
- **Advisor**: Pointcut + Advice (한 쌍)

프록시 객체는 여러 개의 Advisor를 가질 수 있습니다.

---

## 4. 프록시 내부 호출 문제 (Self-Invocation)

**가장 흔히 겪는 실수입니다.**
프록시를 거치지 않고 대상 객체 내부에서 자신의 메서드를 \`this.method()\`로 호출하면 AOP가 적용되지 않습니다.

\`\`\`java
@Service
public class MyService {

    public void externalCall() {
        // ...
        internalCall(); // this.internalCall() : AOP 적용 안 됨!
    }

    @Transactional // AOP 적용 대상
    public void internalCall() {
        // 트랜잭션 없이 실행됨
    }
}
\`\`\`

### 4.1 해결 방법
1. **자기 자신 주입 (Self Injection)**: \`@Autowired\` or \`@Lazy\`
2. **구조 변경 (권장)**: 내부 메서드를 별도 클래스(Service)로 분리하고 빈으로 주입받아 호출

---

## 5. 트랜잭션 프록시 구조

\`@Transactional\`도 AOP입니다.

\`\`\`mermaid
sequenceDiagram
    participant Client
    participant Proxy as Proxy (CGLIB/JDK)
    participant TM as TransactionManager
    participant Target as Target Service
    
    Client->>Proxy: call()
    activate Proxy
    Proxy->>TM: 1. Begin Transaction
    Proxy->>Target: delegation
    activate Target
    Target-->>Proxy: return result or throw
    deactivate Target
    
    alt Success
        Proxy->>TM: 2-a. Commit
    else Exception
        Proxy->>TM: 2-b. Rollback
    end
    
    Proxy-->>Client: return result
    deactivate Proxy
\`\`\`
`,
      codeExamples: [
        {
          title: "JDK Proxy vs CGLIB 생성 비교",
          language: "java",
          code: `import org.springframework.aop.framework.ProxyFactory;
import org.aopalliance.intercept.MethodInterceptor;
import org.aopalliance.intercept.MethodInvocation;

interface ServiceInterface {
    void doSomething();
}

class ServiceImpl implements ServiceInterface {
    public void doSomething() {
        System.out.println("Doing something...");
    }
}

class NoInterfaceService {
    public void doSomething() {
        System.out.println("Doing something (No Interface)...");
    }
}

// Advice (부가 기능)
class TimeLoggingAdvice implements MethodInterceptor {
    @Override
    public Object invoke(MethodInvocation invocation) throws Throwable {
        long start = System.currentTimeMillis();
        try {
            return invocation.proceed(); // Target 호출
        } finally {
            System.out.println("Time: " + (System.currentTimeMillis() - start) + "ms");
        }
    }
}

public class ProxyFactoryDemo {
    public static void main(String[] args) {
        // Case 1: 인터페이스가 있는 경우 (기본적으로 JDK Proxy 생성, 설정으로 CGLIB 가능)
        ServiceInterface target1 = new ServiceImpl();
        ProxyFactory factory1 = new ProxyFactory(target1);
        factory1.addAdvice(new TimeLoggingAdvice());
        
        ServiceInterface proxy1 = (ServiceInterface) factory1.getProxy();
        System.out.println("Proxy1 Class: " + proxy1.getClass()); 
        // 출력 예: com.sun.proxy.$Proxy... (JDK Dynamic Proxy)

        // Case 2: 클래스만 있는 경우 (무조건 CGLIB)
        NoInterfaceService target2 = new NoInterfaceService();
        ProxyFactory factory2 = new ProxyFactory(target2);
        factory2.addAdvice(new TimeLoggingAdvice());

        NoInterfaceService proxy2 = (NoInterfaceService) factory2.getProxy();
        System.out.println("Proxy2 Class: " + proxy2.getClass());
        // 출력 예: com.example.NoInterfaceService$$EnhancerBySpringCGLIB... (CGLIB)
    }
}`
        },
        {
          title: "Self-Invocation 문제 해결",
          language: "java",
          code: `// 문제 상황 해결책: 구조 분리 (권장)

// 1. 내부 로직을 담당할 별도 서비스
@Service
public class InternalService {
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void processInternal() {
        System.out.println("트랜잭션 적용됨 (Proxy를 통해 호출됨)");
    }
}

// 2. 메인 서비스
@Service
@RequiredArgsConstructor
public class MainService {
    
    // 외부 빈을 주입받음 (Proxy가 주입됨)
    private final InternalService internalService;

    public void doWork() {
        System.out.println("메인 로직 시작");
        
        // this.processInternal() 대신 주입받은 빈의 메서드 호출
        internalService.processInternal(); 
        
        System.out.println("메인 로직 종료");
    }
}`
        }
      ],
      keyPoints: [
        "Spring AOP는 Proxy 기반입니다. 클라이언트는 실제 객체가 아닌 프록시를 호출합니다.",
        "JDK Dynamic Proxy는 인터페이스 기반이며 Reflection을 사용합니다.",
        "CGLIB은 클래스 상속 기반이며 바이트코드를 조작합니다. Spring Boot의 기본값입니다.",
        "ProxyFactory는 이 두 기술을 추상화하여 일관된 AOP 적용을 돕습니다.",
        "Self-Invocation(내부 호출) 시에는 프록시를 거치지 않으므로 AOP(트랜잭션 등)가 적용되지 않습니다. 구조 분리로 해결하는 것이 좋습니다."
      ]
    },
    {
      id: "p5-m3",
      title: "Chapter 3: Transaction Management Internals",
      topic: "TransactionSynchronizationManager, Propagation, Isolation, Rollback Rules",
      content: `
## 1. 스프링 트랜잭션 추상화

데이터 접근 기술은 다양합니다(JDBC, JPA, Hibernate, Redis...). 이들의 트랜잭션 관리 방식도 제각각입니다.
스프링은 \`PlatformTransactionManager\` 인터페이스를 통해 이를 추상화했습니다.

\`\`\`java
public interface PlatformTransactionManager {
    TransactionStatus getTransaction(TransactionDefinition definition);
    void commit(TransactionStatus status);
    void rollback(TransactionStatus status);
}
\`\`\`

구현체: \`DataSourceTransactionManager\`(JDBC), \`JpaTransactionManager\`(JPA) 등.

---

## 2. 트랜잭션 동기화 매니저 (TransactionSynchronizationManager)

트랜잭션을 유지하려면 데이터베이스 커넥션을 트랜잭션 내내 유지해야 합니다.
스프링은 **ThreadLocal**을 사용하는 \`TransactionSynchronizationManager\`를 통해 커넥션을 보관하고 동기화합니다.

**동작 흐름:**
1. 트랜잭션 매니저가 커넥션을 생성/획득
2. 커넥션을 \`TransactionSynchronizationManager\ (ThreadLocal)에 저장
3. 서비스 로직 수행 (Repository는 동기화 매니저에서 커넥션을 꺼내 씀)
4. 트랜잭션 종료 시 커넥션 정리 및 반환

이 덕분에 파라미터로 Connection 객체를 계속 넘기지 않아도 트랜잭션이 유지됩니다.

---

## 3. 트랜잭션 전파 (Propagation)

트랜잭션이 수행 중인데 또 다른 트랜잭션을 호출하면 어떻게 될까요? 논리적 트랜잭션과 물리적 트랜잭션 개념이 등장합니다.

| 옵션 | 설명 | 비고 |
|------|------|------|
| **REQUIRED** | 기존 트랜잭션 있으면 참여, 없으면 생성 | 기본값. 대부분 이거 씀 |
| **REQUIRES_NEW** | 항상 새로운 트랜잭션 생성 | 기존 트랜잭션은 잠시 보류 |
| **SUPPORTS** | 있으면 참여, 없으면 트랜잭션 없이 실행 | |
| **NOT_SUPPORTED** | 있으면 보류하고 트랜잭션 없이 실행 | |
| **MANDATORY** | 반드시 기존 트랜잭션이 있어야 함 | 없으면 예외 발생 |
| **NEVER** | 트랜잭션이 있으면 안 됨 | 있으면 예외 발생 |
| **NESTED** | 중첩 트랜잭션 (Savepoint 사용) | JDBC 일부 드라이버만 지원 |

### 3.1 REQUIRED 동작 상세 (논리 vs 물리)
- 외부 트랜잭션 시작 (물리 트랜잭션 시작)
  - 내부 트랜잭션 시작 (논리 트랜잭션 시작 - 물리적으로는 기존 것 사용)
  - 내부 트랜잭션 커밋 (논리 트랜잭션 커밋 - 아무 일 안 함)
- 외부 트랜잭션 커밋 (물리 트랜잭션 커밋 - 실제 DB 커밋)

**중요**: 내부 트랜잭션에서 롤백 마크(\`setRollbackOnly\`)를 하면, 외부 트랜잭션 커밋 시점에 \`UnexpectedRollbackException\`이 발생하며 전체 롤백됩니다.

---

## 4. 예외와 롤백 (Rollback Rules)

스프링의 기본 롤백 정책을 정확히 알아야 합니다.

- **Unchecked Exception (RuntimeException, Error)**: **자동 롤백**
- **Checked Exception**: **롤백 안 함** (커밋됨)

왜 Check 예외는 롤백 안 할까요? 스프링은 체크 예외를 "비즈니스적으로 의미 있는 예외(복구 가능한 상황)"로 간주하기 때문입니다.
하지만 현대적인 관행이나 JPA 사용 시에는 대부분 RuntimeException을 사용하므로 큰 문제는 없으나, 레거시 코드나 체크 예외 사용 시 주의해야 합니다.

**설정으로 변경 가능:**
\`@Transactional(rollbackFor = Exception.class)\` -> 모든 예외 롤백

---

## 5. 격리 수준 (Isolation Level)

동시성 제어와 관련된 데이터 무결성 수준입니다.

- \`DEFAULT\`: DB 격리 수준 따름 (보통 READ_COMMITTED)
- \`READ_UNCOMMITTED\`: Dirty Read 발생 가능
- \`READ_COMMITTED\`: Dirty Read 방지, Non-Repeatable Read 발생 가능
- \`REPEATABLE_READ\`: Non-Repeatable Read 방지, Phantom Read 발생 가능 (MySQL InnoDB는 이것도 어느 정도 방지)
- \`SERIALIZABLE\`: 완벽한 일관성, 동시성 급격히 저하
`,
      codeExamples: [
        {
          title: "트랜잭션 전파와 롤백 테스트",
          language: "java",
          code: `// 서비스 구조
// OuterService -> InnerService

@Service
@RequiredArgsConstructor
public class OuterService {
    private final InnerService innerService;

    @Transactional
    public void execute() {
        // 내부에서 예외 발생 시 어떻게 될까?
        try {
            innerService.process();
        } catch (RuntimeException e) {
            // 예외를 잡았으니 정상 커밋될까? 
            // -> Inner가 REQUIRED라면 전체 롤백됨 (setRollbackOnly)
            System.out.println("예외 처리함");
        }
    }
}

@Service
public class InnerService {
    
    // Case 1: REQUIRED (기본값)
    @Transactional(propagation = Propagation.REQUIRED)
    public void process() {
        throw new RuntimeException("Error!");
    }
    
    // Case 2: REQUIRES_NEW
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void processNew() {
        // 이 트랜잭션만 롤백되고, Outer 트랜잭션은 영향 없음
        throw new RuntimeException("Error!");
    }
}

// 테스트 코드 개념
@Test
void propagationTest() {
    // REQUIRED 경우:
    // Inner에서 예외 터짐 -> 롤백 마크 찍힘 -> Outer에서 catch함 -> 
    // Outer 커밋 시도 -> 롤백 마크 확인 -> UnexpectedRollbackException 발생!
    
    // REQUIRES_NEW 경우:
    // Inner 트랜잭션 별도 생성 -> 예외 터짐 -> Inner만 롤백 -> Outer로 예외 전파 ->
    // Outer에서 catch함 -> Outer 트랜잭션은 깨끗함 -> 정상 커밋
}`
        },
        {
          title: "Programmatic Transaction Management",
          language: "java",
          code: `import org.springframework.transaction.support.TransactionTemplate;

@Service
@RequiredArgsConstructor
public class ProgrammaticService {

    private final TransactionTemplate transactionTemplate;
    // AOP 방식(@Transactional)이 아닌 명시적 코드 방식
    // 테스트 코드나 정밀한 제어가 필요할 때 유용

    public String doBusiness() {
        return transactionTemplate.execute(status -> {
            try {
                // 비즈니스 로직
                saveData();
                updateData();
                return "Success";
            } catch (Exception e) {
                status.setRollbackOnly(); // 명시적 롤백
                return "Fail";
            }
        });
    }
    
    private void saveData() { /* ... */ }
    private void updateData() { /* ... */ }
}`
        }
      ],
      keyPoints: [
        "PlatformTransactionManager는 데이터 접근 기술에 상관없이 일관된 트랜잭션 처리를 제공합니다.",
        "TransactionSynchronizationManager는 스레드 로컬(ThreadLocal)을 사용하여 커넥션을 트랜잭션 범위 내내 유지합니다.",
        "기본 전파 속성인 REQUIRED는 논리 트랜잭션 개념을 사용하여, 하나라도 실패하면 전체 물리 트랜잭션을 롤백합니다.",
        "내부 트랜잭션(REQUIRED)에서 예외 발생 시 setRollbackOnly가 마킹되어 외부에서 catch해도 커밋 시점에 UnexpectedRollbackException이 발생합니다.",
        "REQUIRES_NEW는 물리적으로 완전히 분리된 별도의 트랜잭션을 생성하여 상호 영향을 주지 않게 합니다."
      ]
    }
  ]
};
