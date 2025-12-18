import type { Module } from '../../curriculumData';

export const restApiDevelopment: Module = {
    id: "rest-api-development",
    title: "Chapter 5: REST API 개발",
    topic: "@RestController, ResponseEntity, DTO",
    content: `
## 1. @RestController
@Controller에 @ResponseBody가 추가된 형태로, JSON 데이터를 직접 반환합니다.

## 2. ResponseEntity
HTTP 상태 코드, 헤더, 본문을 직접 제어하여 응답을 보낼 수 있습니다.

## 3. DTO (Data Transfer Object)
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
