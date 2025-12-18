import type { Phase } from '../curriculumData';

export const springBasicsPhase: Phase = {
  id: "spring-phase1",
  title: "Phase 1: Spring 기초",
  goal: "Spring 프레임워크의 핵심 개념과 Spring Boot를 학습합니다. IoC/DI, MVC, REST API, JPA를 다룹니다.",
  modules: [
    {
      id: "spring-introduction",
      title: "Chapter 1: Spring 프레임워크 소개",
      topic: "Spring이란, 핵심 모듈, Spring vs Spring Boot",
      content: `
## 1. Spring이란?

**Spring**은 Java 엔터프라이즈 애플리케이션 개발을 위한 **오픈소스 프레임워크**입니다.

### 핵심 철학
- **IoC (Inversion of Control)**: 객체 생성과 관리를 프레임워크에 위임
- **DI (Dependency Injection)**: 의존성을 외부에서 주입
- **AOP (Aspect Oriented Programming)**: 횡단 관심사 분리

---

## 2. Spring Boot

**Spring Boot**는 Spring 설정을 **자동화**하여 빠르게 시작할 수 있게 합니다.

\`\`\`java
@SpringBootApplication
public class MyApp {
    public static void main(String[] args) {
        SpringApplication.run(MyApp.class, args);
    }
}
\`\`\`

### Spring Boot 특징
- **Auto Configuration**: 자동 설정
- **Starter Dependencies**: 의존성 묶음
- **Embedded Server**: 내장 Tomcat
- **Actuator**: 모니터링

---

## 3. 프로젝트 생성

### Spring Initializr
[start.spring.io](https://start.spring.io)에서 프로젝트 생성

\`\`\`
Project: Gradle - Kotlin (또는 Maven)
Language: Java
Spring Boot: 3.x
Dependencies: Spring Web, Spring Data JPA, H2 Database
\`\`\`
`,
      codeExamples: [
        {
          title: "첫 Spring Boot 애플리케이션",
          language: "java",
          code: `@SpringBootApplication
public class HelloApplication {
    public static void main(String[] args) {
        SpringApplication.run(HelloApplication.class, args);
    }
}

@RestController
class HelloController {
    @GetMapping("/hello")
    public String hello() {
        return "Hello, Spring!";
    }
}`
        }
      ],
      keyPoints: [
        "Spring은 IoC, DI, AOP를 핵심으로 하는 Java 프레임워크입니다.",
        "Spring Boot는 자동 설정과 내장 서버로 빠른 개발을 지원합니다.",
        "start.spring.io에서 프로젝트를 쉽게 생성할 수 있습니다."
      ],
      interviewQuestions: [
        {
          difficulty: 'Easy',
          question: "Spring Framework와 Spring Boot의 차이점은 무엇인가요?",
          answer: "Spring은 DI, AOP 등을 제공하는 프레임워크이고, Spring Boot는 Spring을 더 쉽게 사용할 수 있도록 자동 설정(Auto Configuration)과 내장 서버(Embedded Server) 등을 제공하는 도구입니다."
        },
        {
          difficulty: 'Medium',
          question: "Spring Boot Starter란 무엇인가요?",
          answer: "프로젝트에 필요한 의존성(라이브러리)들을 묶어서 제공하는 것으로, 호환되는 버전들을 자동으로 관리해줍니다. (예: spring-boot-starter-web)"
        }
      ]
    },
    {
      id: "ioc-and-di",
      title: "Chapter 2: IoC와 DI",
      topic: "빈(Bean), @Component, @Autowired, 생성자 주입",
      content: `
## 1. IoC (Inversion of Control)

**제어의 역전**: 객체 생성과 생명주기 관리를 **컨테이너**에 위임

### Before (직접 생성)
\`\`\`java
class OrderService {
    private OrderRepository repo = new OrderRepository(); // 직접 생성
}
\`\`\`

### After (IoC)
\`\`\`java
@Service
class OrderService {
    private final OrderRepository repo; // 주입받음
    
    public OrderService(OrderRepository repo) {
        this.repo = repo;
    }
}
\`\`\`

---

## 2. Bean 등록

### @Component 계열
\`\`\`java
@Component     // 일반 빈
@Service       // 서비스 계층
@Repository    // 데이터 접근 계층
@Controller    // 웹 컨트롤러
@RestController // REST API 컨트롤러
\`\`\`

### @Bean (수동 등록)
\`\`\`java
@Configuration
class AppConfig {
    @Bean
    public ObjectMapper objectMapper() {
        return new ObjectMapper();
    }
}
\`\`\`

---

## 3. 의존성 주입 방법

### 생성자 주입 (권장)
\`\`\`java
@Service
public class UserService {
    private final UserRepository userRepo;
    
    @Autowired  // 생성자 1개면 생략 가능
    public UserService(UserRepository userRepo) {
        this.userRepo = userRepo;
    }
}
\`\`\`

### 필드 주입 (비권장)
\`\`\`java
@Service
public class UserService {
    @Autowired
    private UserRepository userRepo;  // 테스트 어려움
}
\`\`\`
`,
      codeExamples: [
        {
          title: "생성자 주입 예제",
          language: "java",
          code: `@Repository
public class UserRepository {
    public User findById(Long id) {
        // DB 조회 로직
        return new User(id, "홍길동");
    }
}

@Service
public class UserService {
    private final UserRepository userRepository;
    
    // 생성자 주입 (Spring이 자동으로 주입)
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    
    public User getUser(Long id) {
        return userRepository.findById(id);
    }
}

@RestController
@RequestMapping("/users")
public class UserController {
    private final UserService userService;
    
    public UserController(UserService userService) {
        this.userService = userService;
    }
    
    @GetMapping("/{id}")
    public User getUser(@PathVariable Long id) {
        return userService.getUser(id);
    }
}`
        }
      ],
      keyPoints: [
        "IoC는 객체 생성/관리를 프레임워크에 위임하는 것입니다.",
        "DI는 의존 객체를 외부에서 주입받는 패턴입니다.",
        "생성자 주입을 사용하면 불변성과 테스트 용이성이 보장됩니다.",
        "@Component, @Service, @Repository로 빈을 등록합니다."
      ],
      interviewQuestions: [
        {
          difficulty: 'Easy',
          question: "DI(Dependency Injection)를 사용하는 이유는 무엇인가요?",
          answer: "객체 간의 결합도를 낮추어 코드의 재사용성을 높이고, 테스트하기 쉬운 코드를 만들기 위해서입니다."
        },
        {
          difficulty: 'Medium',
          question: "필드 주입보다 생성자 주입을 권장하는 이유는?",
          answer: "생성자 주입은 불변성(final)을 보장할 수 있고, 순환 참조를 컴파일 시점에 방지할 수 있으며, 테스트 시 의존성을 명확하게 전달할 수 있기 때문입니다."
        }
      ]
    },
    {
      id: "springboot-start",
      title: "Chapter 3: Spring Boot 시작하기",
      topic: "application.yml, 프로파일, 자동 설정, 로깅",
      content: `
## 1. 설정 파일

### application.yml
\`\`\`yaml
server:
  port: 8080

spring:
  datasource:
    url: jdbc:h2:mem:testdb
    driver-class-name: org.h2.Driver
  jpa:
    hibernate:
      ddl-auto: create
    show-sql: true
\`\`\`

---

## 2. 프로파일

### 환경별 설정
\`\`\`yaml
# application-dev.yml
spring:
  datasource:
    url: jdbc:h2:mem:devdb

# application-prod.yml  
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/proddb
\`\`\`

### 활성화
\`\`\`bash
java -jar app.jar --spring.profiles.active=prod
\`\`\`

---

## 3. 자동 설정 원리

\`@SpringBootApplication\`은 다음을 포함:
- \`@ComponentScan\`: 빈 스캔
- \`@EnableAutoConfiguration\`: 자동 설정

Spring Boot는 classpath의 라이브러리를 감지하여 자동 설정합니다.
`,
      codeExamples: [
        {
          title: "설정값 주입",
          language: "java",
          code: `// application.yml
// app:
//   name: MyApp
//   version: 1.0

@Component
@ConfigurationProperties(prefix = "app")
public class AppProperties {
    private String name;
    private String version;
    // getters, setters
}

@Service
public class AppService {
    private final AppProperties props;
    
    public AppService(AppProperties props) {
        this.props = props;
    }
    
    public String getInfo() {
        return props.getName() + " v" + props.getVersion();
    }
}`
        }
      ],
      keyPoints: [
        "application.yml로 설정을 관리합니다.",
        "프로파일(dev, prod)로 환경별 설정을 분리합니다.",
        "@ConfigurationProperties로 설정값을 객체에 바인딩합니다."
      ],
      interviewQuestions: [
        {
          difficulty: 'Medium',
          question: "Spring Boot의 Auto Configuration(자동 설정)은 어떻게 동작하나요?",
          answer: "@EnableAutoConfiguration 어노테이션이 classpath에 있는 jar 파일들을 감지하여(예: H2가 있으면 DB 설정), 적절한 빈들을 자동으로 등록해줍니다."
        },
        {
          difficulty: 'Easy',
          question: "Profile(프로파일) 기능은 언제 사용하나요?",
          answer: "개발(dev), 운영(prod), 테스트(test) 등 환경에 따라 서로 다른 설정(DB 연결 정보 등)을 적용해야 할 때 사용합니다."
        }
      ]
    },
    {
      id: "spring-mvc-basics",
      title: "Chapter 4: Spring MVC 기초",
      topic: "@Controller, @RequestMapping, Model, View",
      content: `
## 1. MVC 패턴

- **Model**: 데이터
- **View**: 화면 (Thymeleaf, JSP)
- **Controller**: 요청 처리

---

## 2. Controller

\`\`\`java
@Controller
public class HomeController {
    @GetMapping("/")
    public String home(Model model) {
        model.addAttribute("message", "Hello");
        return "home";  // templates/home.html
    }
}
\`\`\`

---

## 3. 요청 매핑

\`\`\`java
@GetMapping("/users")           // GET
@PostMapping("/users")          // POST
@PutMapping("/users/{id}")      // PUT
@DeleteMapping("/users/{id}")   // DELETE
\`\`\`

### 파라미터 바인딩
\`\`\`java
@GetMapping("/users/{id}")
public User getUser(
    @PathVariable Long id,          // URL 경로
    @RequestParam String name,      // 쿼리 파라미터
    @RequestBody UserDto dto        // 요청 본문
) { ... }
\`\`\`
`,
      codeExamples: [
        {
          title: "MVC 컨트롤러 예제",
          language: "java",
          code: `@Controller
@RequestMapping("/products")
public class ProductController {
    private final ProductService productService;
    
    public ProductController(ProductService productService) {
        this.productService = productService;
    }
    
    // 목록 조회
    @GetMapping
    public String list(Model model) {
        model.addAttribute("products", productService.findAll());
        return "products/list";
    }
    
    // 상세 조회
    @GetMapping("/{id}")
    public String detail(@PathVariable Long id, Model model) {
        model.addAttribute("product", productService.findById(id));
        return "products/detail";
    }
    
    // 등록 폼
    @GetMapping("/new")
    public String createForm(Model model) {
        model.addAttribute("product", new Product());
        return "products/form";
    }
    
    // 등록 처리
    @PostMapping
    public String create(@ModelAttribute Product product) {
        productService.save(product);
        return "redirect:/products";
    }
}`
        }
      ],
      keyPoints: [
        "@Controller는 View를 반환하고, @RestController는 JSON을 반환합니다.",
        "@PathVariable, @RequestParam, @RequestBody로 파라미터를 바인딩합니다.",
        "Model 객체로 View에 데이터를 전달합니다."
      ],
      interviewQuestions: [
        {
          difficulty: 'Easy',
          question: "@Controller와 @RestController의 차이는?",
          answer: "@Controller는 주로 View(HTML)를 반환하는 데 사용되고, @RestController는 데이터(JSON 등)를 HTTP 본문에 직접 반환하는 데 사용됩니다."
        },
        {
          difficulty: 'Medium',
          question: "@RequestBody와 @RequestParam의 차이는?",
          answer: "@RequestBody는 HTTP 요청 본문(Body)의 데이터(주로 JSON)를 자바 객체로 매핑하고, @RequestParam은 URL 쿼리 파라미터(?key=value)를 매핑합니다."
        }
      ]
    },
    {
      id: "rest-api-development",
      title: "Chapter 5: REST API 개발",
      topic: "@RestController, ResponseEntity, DTO",
      content: `
## 1. REST API 기본

\`\`\`java
@RestController
@RequestMapping("/api/users")
public class UserController {
    
    @GetMapping
    public List<UserDto> getAll() { ... }
    
    @GetMapping("/{id}")
    public UserDto getById(@PathVariable Long id) { ... }
    
    @PostMapping
    public UserDto create(@RequestBody CreateUserDto dto) { ... }
    
    @PutMapping("/{id}")
    public UserDto update(@PathVariable Long id, @RequestBody UpdateUserDto dto) { ... }
    
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) { ... }
}
\`\`\`

---

## 2. ResponseEntity

HTTP 상태 코드와 헤더를 제어합니다.

\`\`\`java
@GetMapping("/{id}")
public ResponseEntity<UserDto> getById(@PathVariable Long id) {
    return userService.findById(id)
        .map(ResponseEntity::ok)
        .orElse(ResponseEntity.notFound().build());
}

@PostMapping
public ResponseEntity<UserDto> create(@RequestBody CreateUserDto dto) {
    UserDto created = userService.create(dto);
    URI location = URI.create("/api/users/" + created.getId());
    return ResponseEntity.created(location).body(created);
}
\`\`\`

---

## 3. DTO 패턴

Entity를 직접 노출하지 않고 DTO를 사용합니다.

\`\`\`java
public record UserDto(Long id, String name, String email) {
    public static UserDto from(User user) {
        return new UserDto(user.getId(), user.getName(), user.getEmail());
    }
}
\`\`\`
`,
      codeExamples: [
        {
          title: "REST API 예제",
          language: "java",
          code: `@RestController
@RequestMapping("/api/posts")
public class PostController {
    private final PostService postService;
    
    public PostController(PostService postService) {
        this.postService = postService;
    }
    
    @GetMapping
    public List<PostDto> getAll() {
        return postService.findAll().stream()
            .map(PostDto::from)
            .toList();
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<PostDto> getById(@PathVariable Long id) {
        return postService.findById(id)
            .map(PostDto::from)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public ResponseEntity<PostDto> create(@Valid @RequestBody CreatePostDto dto) {
        Post post = postService.create(dto);
        return ResponseEntity
            .status(HttpStatus.CREATED)
            .body(PostDto.from(post));
    }
}`
        }
      ],
      keyPoints: [
        "@RestController는 JSON 응답을 반환합니다.",
        "ResponseEntity로 HTTP 상태 코드를 제어합니다.",
        "DTO를 사용하여 Entity를 직접 노출하지 않습니다."
      ],
      interviewQuestions: [
        {
          difficulty: 'Medium',
          question: "Entity 대신 DTO(Data Transfer Object)를 사용하는 이유는?",
          answer: "Entity는 데이터베이스 테이블과 매핑되는 핵심 모델이므로, 이를 직접 노출하면 내부 구조가 API에 의존하게 되고 보안 문제나 순환 참조 문제가 발생할 수 있기 때문입니다."
        },
        {
          difficulty: 'Medium',
          question: "ResponseEntity 클래스의 역할은?",
          answer: "HTTP 상태 코드(200, 404 등), 헤더, 본문(Body)을 포함한 전체 HTTP 응답을 유연하게 구성하여 반환하는 데 사용됩니다."
        }
      ]
    },
    {
      id: "spring-data-jpa",
      title: "Chapter 6: Spring Data JPA",
      topic: "@Entity, Repository, JPQL, 연관관계",
      content: `
## 1. Entity 정의

\`\`\`java
@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String name;
    
    private String email;
    
    // getters, setters
}
\`\`\`

---

## 2. Repository

\`\`\`java
public interface UserRepository extends JpaRepository<User, Long> {
    List<User> findByName(String name);
    Optional<User> findByEmail(String email);
    
    @Query("SELECT u FROM User u WHERE u.name LIKE %:keyword%")
    List<User> searchByName(@Param("keyword") String keyword);
}
\`\`\`

---

## 3. 기본 CRUD

\`\`\`java
userRepo.save(user);           // 저장/수정
userRepo.findById(id);         // 조회
userRepo.findAll();            // 전체 조회
userRepo.delete(user);         // 삭제
userRepo.existsById(id);       // 존재 확인
\`\`\`

---

## 4. 연관관계

\`\`\`java
@Entity
public class Post {
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User author;
    
    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL)
    private List<Comment> comments = new ArrayList<>();
}
\`\`\`
`,
      codeExamples: [
        {
          title: "JPA Entity와 Repository",
          language: "java",
          code: `@Entity
@Table(name = "posts")
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String title;
    
    @Column(columnDefinition = "TEXT")
    private String content;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "author_id")
    private User author;
    
    private LocalDateTime createdAt;
    
    @PrePersist
    void onCreate() {
        this.createdAt = LocalDateTime.now();
    }
}

public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findByAuthorId(Long authorId);
    
    @Query("SELECT p FROM Post p WHERE p.title LIKE %:keyword% OR p.content LIKE %:keyword%")
    List<Post> search(@Param("keyword") String keyword);
    
    Page<Post> findAllByOrderByCreatedAtDesc(Pageable pageable);
}`
        }
      ],
      keyPoints: [
        "@Entity로 JPA 엔티티를 정의하고, @Id로 기본키를 지정합니다.",
        "JpaRepository를 상속하면 기본 CRUD 메서드가 제공됩니다.",
        "메서드 이름으로 쿼리가 자동 생성됩니다 (findByXxx).",
        "연관관계는 @ManyToOne, @OneToMany 등으로 매핑합니다."
      ],
      interviewQuestions: [
        {
          difficulty: 'Easy',
          question: "JPA와 Spring Data JPA의 관계는?",
          answer: "JPA는 자바 표준 ORM 스펙이고, Spring Data JPA는 JPA를 추상화하여 Repository 인터페이스만으로 쉽게 DB 접근 코드를 짤 수 있게 해주는 라이브러리입니다."
        },
        {
          difficulty: 'Hard',
          question: "JPA에서 Lazy Loading(지연 로딩)이란?",
          answer: "연관된 엔티티(예: 작성자)를 즉시 조회하지 않고, 실제로 사용할 때(getTitle() 등) 쿼리를 날려 조회하는 방식으로 성능 최적화에 사용됩니다."
        }
      ]
    },
    {
      id: "exception-handling-and-validation",
      title: "Chapter 7: 예외 처리와 검증",
      topic: "@Valid, @ExceptionHandler, @ControllerAdvice",
      content: `
## 1. 입력값 검증

### DTO에 검증 어노테이션
\`\`\`java
public record CreateUserDto(
    @NotBlank(message = "이름은 필수입니다")
    String name,
    
    @Email(message = "올바른 이메일 형식이 아닙니다")
    String email,
    
    @Min(value = 0, message = "나이는 0 이상이어야 합니다")
    Integer age
) {}
\`\`\`

### 컨트롤러에서 검증
\`\`\`java
@PostMapping
public UserDto create(@Valid @RequestBody CreateUserDto dto) {
    return userService.create(dto);
}
\`\`\`

---

## 2. 전역 예외 처리

\`\`\`java
@RestControllerAdvice
public class GlobalExceptionHandler {
    
    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleNotFound(EntityNotFoundException e) {
        return ResponseEntity
            .status(HttpStatus.NOT_FOUND)
            .body(new ErrorResponse("NOT_FOUND", e.getMessage()));
    }
    
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleValidation(MethodArgumentNotValidException e) {
        String message = e.getBindingResult().getFieldErrors().stream()
            .map(FieldError::getDefaultMessage)
            .collect(Collectors.joining(", "));
        return ResponseEntity
            .badRequest()
            .body(new ErrorResponse("VALIDATION_ERROR", message));
    }
}
\`\`\`
`,
      codeExamples: [
        {
          title: "검증과 예외 처리",
          language: "java",
          code: `// 커스텀 예외
public class ResourceNotFoundException extends RuntimeException {
    public ResourceNotFoundException(String message) {
        super(message);
    }
}

// 에러 응답 DTO
public record ErrorResponse(
    String code,
    String message,
    LocalDateTime timestamp
) {
    public ErrorResponse(String code, String message) {
        this(code, message, LocalDateTime.now());
    }
}

// 전역 예외 핸들러
@RestControllerAdvice
public class GlobalExceptionHandler {
    
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleNotFound(ResourceNotFoundException e) {
        return ResponseEntity
            .status(HttpStatus.NOT_FOUND)
            .body(new ErrorResponse("NOT_FOUND", e.getMessage()));
    }
    
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleAll(Exception e) {
        return ResponseEntity
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .body(new ErrorResponse("SERVER_ERROR", "서버 오류가 발생했습니다"));
    }
}`
        }
      ],
      keyPoints: [
        "@Valid와 검증 어노테이션으로 입력값을 검증합니다.",
        "@RestControllerAdvice로 전역 예외 처리기를 만듭니다.",
        "커스텀 예외를 정의하여 비즈니스 로직의 예외를 처리합니다."
      ],
      interviewQuestions: [
        {
          difficulty: 'Medium',
          question: "@ControllerAdvice (또는 @RestControllerAdvice)의 역할은?",
          answer: "여러 컨트롤러에서 발생하는 예외를 한 곳에서 전역적으로 처리(Global Exception Handling)할 수 있게 해줍니다."
        },
        {
          difficulty: 'Easy',
          question: "@Valid 어노테이션은 언제 검증을 수행하나요?",
          answer: "컨트롤러 메서드의 파라미터 바인딩 시점에 객체의 필드에 붙은 제약 조건(@NotNull 등)을 검사합니다."
        }
      ]
    },
    {
      id: "spring-testing",
      title: "Chapter 8: 테스트",
      topic: "@SpringBootTest, @WebMvcTest, MockMvc, @DataJpaTest",
      content: `
## 1. 통합 테스트

\`\`\`java
@SpringBootTest
class UserServiceTest {
    @Autowired
    private UserService userService;
    
    @Test
    void createUser() {
        CreateUserDto dto = new CreateUserDto("홍길동", "hong@example.com", 25);
        UserDto result = userService.create(dto);
        
        assertThat(result.name()).isEqualTo("홍길동");
    }
}
\`\`\`

---

## 2. 컨트롤러 테스트

\`\`\`java
@WebMvcTest(UserController.class)
class UserControllerTest {
    @Autowired
    private MockMvc mockMvc;
    
    @MockBean
    private UserService userService;
    
    @Test
    void getUser() throws Exception {
        when(userService.findById(1L))
            .thenReturn(Optional.of(new UserDto(1L, "홍길동", "hong@example.com")));
        
        mockMvc.perform(get("/api/users/1"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.name").value("홍길동"));
    }
}
\`\`\`

---

## 3. Repository 테스트

\`\`\`java
@DataJpaTest
class UserRepositoryTest {
    @Autowired
    private UserRepository userRepository;
    
    @Test
    void findByEmail() {
        User user = new User("홍길동", "hong@example.com");
        userRepository.save(user);
        
        Optional<User> found = userRepository.findByEmail("hong@example.com");
        assertThat(found).isPresent();
    }
}
\`\`\`
`,
      codeExamples: [
        {
          title: "테스트 예제",
          language: "java",
          code: `// 단위 테스트
@ExtendWith(MockitoExtension.class)
class UserServiceTest {
    @Mock
    private UserRepository userRepository;
    
    @InjectMocks
    private UserService userService;
    
    @Test
    void getUser_Success() {
        // given
        User user = new User(1L, "홍길동", "hong@example.com");
        when(userRepository.findById(1L)).thenReturn(Optional.of(user));
        
        // when
        UserDto result = userService.getUser(1L);
        
        // then
        assertThat(result.name()).isEqualTo("홍길동");
    }
    
    @Test
    void getUser_NotFound() {
        when(userRepository.findById(999L)).thenReturn(Optional.empty());
        
        assertThatThrownBy(() -> userService.getUser(999L))
            .isInstanceOf(ResourceNotFoundException.class);
    }
}`
        }
      ],
      keyPoints: [
        "@SpringBootTest는 전체 애플리케이션 컨텍스트를 로드합니다.",
        "@WebMvcTest는 컨트롤러 계층만 테스트합니다.",
        "@DataJpaTest는 JPA 관련 컴포넌트만 로드하여 Repository를 테스트합니다.",
        "@MockBean으로 의존성을 Mock 객체로 대체합니다."
      ],
      interviewQuestions: [
        {
          difficulty: 'Medium',
          question: "@SpringBootTest와 @WebMvcTest의 차이는?",
          answer: "@SpringBootTest는 전체 애플리케이션 컨텍스트를 로드하여 통합 테스트를 수행하고, @WebMvcTest는 Web Layer(Controller 등)만 로드하여 빠르고 가볍게 테스트합니다."
        },
        {
          difficulty: 'Medium',
          question: "테스트에서 Mocking을 사용하는 이유는?",
          answer: "실제 의존 객체(DB, 외부 API 등) 대신 가짜 객체(Mock)를 사용하여, 테스트 대상 코드를 격리시키고 원하는 동작을 제어하기 위함입니다."
        }
      ]
    }
  ]
};

