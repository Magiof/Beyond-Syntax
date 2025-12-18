import type { Module } from '../../curriculumData';

export const advancedPatternsAndArchitecture: Module = {
    id: "advanced-patterns-and-architecture",
    title: "Chapter 4: 시니어 엔지니어를 위한 설계와 아키텍처",
    topic: "TDD, Clean Architecture, DDD, Modern Pattern Implementation",
    content: `
## 1. 기술을 넘어 '제품'을 짓는 설계

단순히 동작하는 코드를 넘어, 10년 뒤에도 고칠 수 있는 코드를 만드는 것이 시니어의 숙명입니다.

---

## 2. 클린 아키텍처 (Clean Architecture)

데이터베이스나 웹 프레임워크가 바뀌어도 내 소중한 '**핵심 비즈니스 로직**' 은 변하지 않게 보호하는 설계입니다.

- **DIP (의존성 역전 원칙)**
  - **What**: 고수준(비즈니스)은 저수준(DB)에게 머리를 숙이지 않습니다. 인터페이스라는 계약서를 내밀고 DB가 그것을 따르게 합니다.
  - **When**: JPA에서 MyBatis로 바꾸거나, 오라클에서 MySQL로 바꿔도 서비스 코드를 한 줄도 안 고치고 싶을 때 씁니다.

---

## 3. TDD (Test Driven Development)의 3박자

- **Red**: 실패하는 테스트를 먼저 작성합니다 (요구사항 정의).
- **Green**: 일단 돌아가게만 짭니다 (빠른 구현).
- **Refactor**: 깔끔하게 코드를 다듬습니다 (디자인 개선).

---

## 4. 도메인 주도 설계 (DDD) 기초 (What/How/When)

- **Ubiquitous Language (보편 언어)**
  - **What**: 개발자와 기획자가 똑같은 단어를 쓰는 것입니다.
- **Bounded Context**: "상품"이 쇼핑몰에서는 판매품이지만, 창고 앱에서는 재고일 뿐입니다. 맥락에 따라 경계를 나누는 고수준 설계입니다.
`,
    codeExamples: [
        {
            title: "의존성 역전(DIP)의 실제",
            language: "java",
            code: `// 1. 규격 (Domain)
interface MessageSender {
    void push(String msg);
}

// 2. 구체적 구현 (Infra)
class SmsSender implements MessageSender { ... }

// 3. 비즈니스 로직 (Core)
class OrderService {
    private final MessageSender sender; // 인터페이스에만 의존!
    
    public void order() {
        // ... 주문 처리
        sender.push("주문 완료!");
    }
}`
        }
    ],
    keyPoints: [
        "아키텍처는 변경의 고통을 줄이기 위해 존재합니다.",
        "테스트 코드는 가장 완벽한 요구사항 명세서입니다.",
        "기술적인 화려함보다 도메인(비즈니스)을 얼마나 정교하게 모델링했는지가 더 중요합니다."
    ],
    interviewQuestions: [
        {
            difficulty: 'Hard',
            question: "왜 객체지향 5원칙(SOLID) 중에서 DIP가 아키텍처적으로 가장 핵심인가요?",
            answer: "DIP는 '의존성의 방향'을 제어할 수 있게 해주기 때문입니다. DIP를 통해 상위 모듈이 하위 모듈의 변화로부터 독립될 수 있으며, 이것이 가능해야 플러그인처럼 기술을 꼈다 뺐다 할 수 있는 유연한 아키텍처가 완성됩니다."
        }
    ]
};
