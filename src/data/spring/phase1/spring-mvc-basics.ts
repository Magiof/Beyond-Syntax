import type { Module } from '../../curriculumData';

export const springMvcBasics: Module = {
    id: "spring-mvc-basics",
    title: "Chapter 4: Spring MVC와 웹 요청의 여정",
    topic: "DispatcherServlet, 프론트 컨트롤러 패턴, MVC 아키텍처",
    content: `
## 1. 모든 길은 DispatcherServlet으로 통한다

Spring MVC는 **프론트 컨트롤러(Front Controller) 패턴**을 기반으로 동작합니다. 모든 HTTP 요청을 하나의 서블릿(\`DispatcherServlet\`)이 받아 적절한 핸들러(컨트롤러)로 배분합니다.

---

## 2. 웹 요청 처리의 전체 흐름 (Step-by-Step)

1. **HTTP 요청 수신**: 클라이언트의 요청이 \`DispatcherServlet\`에 도착합니다.
2. **핸들러 매핑(HandlerMapping)**: "이 URL은 누가 처리하나?"를 확인하여 담당 컨트롤러 정보를 찾아옵니다.
3. **핸들러 어댑터(HandlerAdapter)**: 결정된 컨트롤러를 실제로 실행해 줄 수 있는 어댑터를 찾습니다. (어노테이션 기반인지, 예전 방식인지에 따라 다름)
4. **컨트롤러 실행**: 비즈니스 로직을 수행하고 결과 데이터(Model)와 이동할 화면 이름(View Name)을 반환합니다.
5. **뷰 리졸버(ViewResolver)**: 논리적인 이름(예: "user-profile")을 실제 물리적인 경로(예: "/WEB-INF/views/user-profile.jsp")로 변환합니다.
6. **뷰 렌더링**: 데이터를 화면에 입혀 사용자에게 응답합니다.

---

## 3. 왜 이런 복잡한 구조를 사용하는가?

단순히 서블릿 하나로 처리해도 될 것 같지만, 공통적인 전처리(한글 인코딩, 보안 체크 등)를 프론트 컨트롤러에서 한 번에 해결하고, 각 컨트롤러는 **비즈니스 로직에만 집중**할 수 있게 하기 위해서입니다.

> **Note**: 최근의 REST API 중심 개발에서는 5, 6단계 대신 \`@ResponseBody\`를 통해 데이터를 JSON 형태로 바로 반환하는 방식이 주를 이룹니다.
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
