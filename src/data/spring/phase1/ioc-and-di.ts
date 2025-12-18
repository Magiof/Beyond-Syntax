import type { Module } from '../../curriculumData';

export const iocAndDi: Module = {
    id: "ioc-and-di",
    title: "Chapter 2: IoC와 DI",
    topic: "빈(Bean), @Component, @Autowired, 생성자 주입",
    content: `
## 1. IoC (Inversion of Control)
객체의 생명주기 관리를 개발자가 아닌 스프링 컨테이너가 담당합니다.

## 2. DI (Dependency Injection)
의존 관계를 코드 내부가 아닌 외부(스프링)에서 주입해주는 패턴입니다.

## 3. 주입 방법
- **생성자 주입 (권장)**: 불변성 확보, 테스트 용이
- 필드 주입 (비권장)
- 수정자 주입
`,
    codeExamples: [
        {
            title: "생성자 주입",
            language: "java",
            code: `@Service
public class MyService {
    private final MyRepo repo;
    public MyService(MyRepo repo) { this.repo = repo; }
}`
        }
    ],
    keyPoints: [
        "항상 생성자 주입을 사용할 것을 권장합니다.",
        "@Component로 빈을 등록하고 @Autowired로 주입합니다."
    ],
    interviewQuestions: [
        {
            difficulty: 'Medium',
            question: "왜 생성자 주입을 써야 하나요?",
            answer: "객체를 불변하게 유지할 수 있고, 생성 시점에 의존성이 누락되었는지 확인할 수 있기 때문입니다."
        }
    ]
};
