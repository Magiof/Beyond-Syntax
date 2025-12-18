import type { Module } from '../../curriculumData';

export const springMvcBasics: Module = {
    id: "spring-mvc-basics",
    title: "Chapter 4: Spring MVC 기초",
    topic: "@Controller, @RequestMapping, Model, View",
    content: `
## 1. MVC 패턴
Model(데이터), View(화면), Controller(제어)로 역할을 나눕니다.

## 2. 매핑 어노테이션
- @GetMapping, @PostMapping, @PutMapping, @DeleteMapping

## 3. 파라미터 전달
- @PathVariable: URL 경로 변수
- @RequestParam: 쿼리 파라미터
`,
    codeExamples: [
        {
            title: "컨트롤러 예시",
            language: "java",
            code: `@Controller
public class MyController {
    @GetMapping("/hi")
    public String hi(Model model) {
        model.addAttribute("msg", "안녕");
        return "hi-view";
    }
}`
        }
    ],
    keyPoints: [
        "전통적인 MVC는 뷰 템플릿(Thymeleaf 등)을 반환합니다.",
        "요청 파라미터를 유연하게 바인딩할 수 있습니다."
    ],
    interviewQuestions: [
        {
            difficulty: 'Easy',
            question: "@PathVariable과 @RequestParam의 차이는?",
            answer: "경로 자체에 포함된 변수냐, ? 뒤에 붙는 파라미터냐의 차이입니다."
        }
    ]
};
