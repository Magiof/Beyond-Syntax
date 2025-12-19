import type { Module } from '../../types';

export const exceptionHandlingAndValidation: Module = {
    id: "exception-handling-and-validation",
    title: "Chapter 7: 견고한 애플리케이션을 위한 예외 처리 전략",
    topic: "DataAccessException, Checked/Unchecked Exception, Bean Validation",
    content: `
## 1. 예외 처리의 나쁜 습관 (Bad Practices)

토비의 스프링 4장에서 강조하는 '예외에 관한 독'입니다.
- **예외 블랙홀**: \`catch(Exception e) { }\` 처럼 아무 일도 하지 않고 넘기기.
- **무의미한 throws**: 모든 메서드에 \`throws Exception\`을 붙여 예외의 상세함을 무시하기.

---

## 2. 체크 예외(Checked) vs 언체크 예외(Unchecked)

스프링의 철학은 **불필요한 체크 예외를 언체크 예외(Runtime)로 기술적 전환**하는 것입니다.
- 복구가 불가능한 시스템 예외(SQLException 등)는 억지로 붙들고 있지 말고, 런타임 예외로 감싸서 서비스 레이어까지 오염시키지 않도록 합니다.

---

## 3. DataAccessException: 기술 독립적인 예외 계층

스프링은 특정 DB 라이브러리에 종속되지 않도록 **일관된 예외 계층 구조**를 제공합니다. 이것이 바로 PSA(Service Abstraction)의 훌륭한 예입니다.
- JDBC의 \`SQLException\`, 하이버네이트의 \`HibernateException\` 등을 모두 스프링이 정의한 \`DataAccessException\` 하위 예외(예: \`DuplicateKeyException\`)로 변환해줍니다.
- 덕분에 DB 접근 기술이 바뀌어도 비즈니스 로직의 예외 처리 코드는 고칠 필요가 없습니다.

---

## 4. 데이터 검증 (Bean Validation)

사용자의 입력값은 절대 믿어선 안 됩니다. Spring Boot에서는 하이버네이트 벨리데이터를 활용하여 선언적으로 검증할 수 있습니다.
- **@NotBlank, @Email, @Size** 등을 DTO 필드에 선언하고, 컨트롤러에서 **@Valid**를 붙여 활성화합니다.

\`\`\`java
public class UserRegistrationDto {
    @NotBlank(message = "이메일은 필수입니다.")
    @Email(message = "올바른 이메일 형식이 아닙니다.")
    private String email;
}
\`\`\`

## 5. 전역 예외 처리 (@RestControllerAdvice)
@RestControllerAdvice를 사용해 애플리케이션 전체의 예외를 한 곳에서 관리합니다.

## 6. 커스텀 예외
비즈니스 상황에 맞는 예외 클래스를 만들어 사용자에게 친숙한 에러 메시지를 보냅니다.
`,
    codeExamples: [
        {
            title: "예외 처리기",
            language: "java",
            code: `@ExceptionHandler(MyEx.class)
public ResponseEntity<Error> handle(MyEx e) {
    return ResponseEntity.badRequest().body(new Error(e.getMsg()));
}`
        }
    ],
    keyPoints: [
        "입력값 검증은 서버 보안의 첫걸음입니다.",
        "일관된 에러 응답 포맷을 유지하는 것이 좋습니다."
    ],
    interviewQuestions: [
        {
            difficulty: 'Medium',
            question: "@ControllerAdvice의 장점은?",
            answer: "모든 컨트롤러의 예외 처리를 한 곳으로 집중시켜 코드 중복을 제거합니다."
        }
    ]
};
