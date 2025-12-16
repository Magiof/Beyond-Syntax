import type { Phase } from '../curriculumData';

export const springBasicsPhase: Phase = {
  id: "phase4",
  title: "Phase 4: Spring 기초",
  goal: "Spring 프레임워크의 핵심 개념과 Spring Boot를 학습합니다. IoC/DI, MVC, REST API, JPA를 다룹니다.",
  modules: [
    {
      id: "sp-m1",
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
      ]
    },
    {
      id: "sp-m2",
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
      ]
    },
    {
      id: "sp-m3",
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
      ]
    },
    {
      id: "sp-m4",
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
      ]
    },
    {
      id: "sp-m5",
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
      ]
    },
    {
      id: "sp-m6",
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
      ]
    },
    {
      id: "sp-m7",
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
      ]
    },
    {
      id: "sp-m8",
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
        "@DataJpaTest는 JPA 관련 컴포넌트만 테스트합니다.",
        "@MockBean으로 의존성을 Mock 객체로 대체합니다."
      ]
    }
  ]
};
