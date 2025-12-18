import type { Module } from '../../curriculumData';

export const exceptionHandlingAndValidation: Module = {
    id: "exception-handling-and-validation",
    title: "Chapter 7: 예외 처리와 검증",
    topic: "@Valid, @ExceptionHandler, @ControllerAdvice",
    content: `
## 1. 유효성 검사 (@Valid)
DTO 필드에 @NotBlank, @Email 등을 붙여 요청 데이터의 정합성을 체크합니다.

## 2. 전역 예외 처리
@RestControllerAdvice를 사용해 애플리케이션 전체의 예외를 한 곳에서 관리합니다.

## 3. 커스텀 예외
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
