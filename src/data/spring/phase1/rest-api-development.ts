import type { Module } from '../../curriculumData';

export const restApiDevelopment: Module = {
    id: "rest-api-development",
    title: "Chapter 5: 현대적인 REST API 설계",
    topic: "@RestController, HttpMessageConverter, JSON 직렬화, API 설계 원칙",
    content: `
## 1. RESTful한 설계를 향하여

REST(Representational State Transfer)는 자원(Resource)을 이름으로 구분하여 해당 자원의 상태를 주고받는 아키텍처 스타일입니다.
- **URI**: 자원 자체를 식별함 (예: \`/users/1\`)
- **HTTP Method**: 행위를 정의함 (\`GET\`, \`POST\`, \`PUT\`, \`DELETE\`)

---

## 2. @Controller vs @RestController

가장 결정적인 차이는 **데이터를 어떻게 응답하느냐**에 있습니다.

- **@Controller**: 주로 View를 반환합니다. (\`String\` 반환 시 뷰 리졸버 작동)
- **@RestController**: \`@Controller\` + \`@ResponseBody\`의 조합입니다. 객체를 반환하면 **HttpMessageConverter**가 작동하여 JSON이나 XML로 자동 변환합니다.

---

## 3. HttpMessageConverter의 마법

사용자가 객체를 반환했을 때, 스프링은 등록된 컨버터들을 순회하며 적절한 형식을 찾습니다.
- **MappingJackson2HttpMessageConverter**: 자바 객체를 JSON으로 바꿀 때 가장 많이 쓰입니다. (Jackson 라이브러리 기반)
- **StringHttpMessageConverter**: 문자열 데이터를 그대로 전달할 때 쓰입니다.

---

## 4. API 예외 처리 전략

REST API에서는 에러 상황에서도 일관된 JSON 형식을 반환해야 합니다.
- **@RestControllerAdvice**: 전역적으로 예외를 가로채서 공통된 에러 객체(ErrorResponse)로 응답할 수 있게 돕습니다.

\`\`\`java
@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleNotFound(UserNotFoundException e) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                             .body(new ErrorResponse("USER_NOT_FOUND", e.getMessage()));
    }
}
\`\`\`

## 5. DTO (Data Transfer Object)
엔티티를 직접 노출하지 않고, API 요청/응답을 위한 전용 객체를 사용합니다.
`,
    codeExamples: [
        {
            title: "REST 응답 예시",
            language: "java",
            code: `@GetMapping("/{id}")
public ResponseEntity<UserDto> get(@PathVariable Long id) {
    return ResponseEntity.ok(new UserDto(id, "A"));
}`
        }
    ],
    keyPoints: [
        "엔티티 보호를 위해 항상 DTO를 사용해야 합니다.",
        "RESTful한 API 설계를 위해 적절한 상태 코드를 반환합니다."
    ],
    interviewQuestions: [
        {
            difficulty: 'Medium',
            question: "왜 엔티티를 직접 반환하면 안 되나요?",
            answer: "내부 스키마 노출 방지, 순환 참조 해결, 필요한 데이터만 전송하기 위해서입니다."
        }
    ]
};
