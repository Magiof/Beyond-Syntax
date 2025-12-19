import type { Module } from '../../types';

export const iocAndDi: Module = {
    id: "ioc-and-di",
    title: "Chapter 2: IoC와 DI - 객체 설계의 제 3원칙",
    topic: "Dependency Inversion, Strategy Pattern, Bean Scope, Circular Dependency",
    content: `
## 1. 오브젝트와 의존관계 (Objects & Dependencies)

> **Toby's Spring Vol.1**: "스프링이 없던 시절에도 좋은 객체지향 설계는 존재했습니다. 스프링은 단지 그것을 더 쉽게 도와줄 뿐입니다."

모든 객체는 혼자 살 수 없습니다. \`UserDao\`는 DB 연결을 위해 \`ConnectionMaker\`가 필요합니다. 이것을 **의존(Dependency)** 한다고 합니다.

### (1) 나쁜 설계: 컴파일 타임 의존성
UserDao가 \`NConnectionMaker\`라는 구체적인 클래스를 직접 생성(\`new\`)하면, DB 연결 방식이 바뀔 때마다 UserDao 코드를 뜯어고쳐야 합니다. **강한 결합(Tight Coupling)**입니다.

### (2) 좋은 설계: 런타임 의존성 (DIP)
UserDao는 오직 인터페이스(\`ConnectionMaker\`)만 바라봅니다. 실제 어떤 놈이 들어올지는 실행 시점에 누군가가(스프링이) 찔러 넣어줍니다. 이것이 **의존관계 주입(DI)**입니다.

---

## 2. 애플리케이션 컨텍스트의 동작 원리

\`@Bean\`이 붙은 메서드들을 스프링은 어떻게 관리할까요?

\`\`\`mermaid
flowchart LR
    Config["Configuration Metadata"] -->|Read| Context["ApplicationContext"]
    Context -->|Create & Manage| Bean1((Service Bean))
    Context -->|Inject| Bean2((Repository Bean))
    Bean2 -.->|Dependency| Bean1
\`\`\`

- **Bean Factory**: 빈을 생성하고 의존관계를 설정하는 핵심 엔진.
- **Singleton Registry**: 스프링 빈은 기본적으로 **싱글톤**입니다. 무상태(Stateless)로 설계해야 하는 이유입니다.

---

## 3. 빈 스코프 (Bean Scope)

왜 스프링 빈은 싱글톤일까요?
- **성능**: 초당 1000개의 요청이 올 때마다 \`new Service()\`를 하면 GC(가비지 컬렉터)가 폭발합니다.
- **공유**: 하나의 인스턴스를 여러 스레드가 공유하므로, **Thread-Safety**에 목숨을 걸어야 합니다. (인스턴스 변수 금지!)

| Scope | 설명 |
| :--- | :--- |
| **singleton** | (기본값) 컨테이너 당 딱 하나. 앱이 죽을 때까지 살아있음. |
| **prototype** | 요청할 때마다 새로 생성. 생성 후엔 스프링이 관리 안 함(버림). |
| **request** | HTTP 요청 하나당 하나 생성되고 요청 끝나면 파기. |

---

## 4. 순환 참조 (Circular Dependency)의 경고

A가 B를 원하고, B가 A를 원하면 어떻게 됩니까?
- **생성자 주입**: 앱 구동 시점에 \`BeanCurrentlyInCreationException\`을 뱉으며 **즉시 사망**합니다. (가장 안전함)
- **필드/Setter 주입**: 구동은 되지만, 나중에 해당 메서드를 호출할 때(\`StackOverFlow\`) 터집니다. (시한폭탄)

> **Best Practice**: 무조건 **생성자 주입(Constructor Injection)**을 쓰십시오. 순환 참조를 막고, 불변성(final)을 보장하며, 테스트하기 가장 좋습니다.
`,
    codeExamples: [
        {
            title: "전략 패턴(Strategy Pattern)의 구현체로서의 DI",
            language: "java",
            code: `// [Interface]: 전략 (변하는 것)
public interface SortStrategy {
    List<String> sort(List<String> list);
}

// [Client]: 컨텍스트 (변하지 않는 것)
@Service
public class UserService {
    private final SortStrategy sorter; // 구체적인 클래스 몰라요!

    // [DI]: 생성자를 통해 전략을 주입받음
    public UserService(SortStrategy sorter) {
        this.sorter = sorter;
    }

    public void doLogic() {
        // ...
        sorter.sort(data);
    }
}`
        }
    ],
    keyPoints: [
        "DI는 단순히 값을 넣어주는 게 아니라, '전략 패턴'을 프레임워크 레벨로 확장한 것입니다.",
        "스프링 빈은 기본적으로 싱글톤이므로, 상태를 가지면(Stateful) 심각한 동시성 버그가 발생합니다.",
        "생성자 주입을 사용하면 순환 참조 문제를 컴파일/구동 시점에 잡아낼 수 있습니다."
    ],
    interviewQuestions: [
        {
            difficulty: 'Hell',
            question: "ApplicationContext와 BeanFactory의 차이는?",
            answer: "BeanFactory는 빈의 생성과 제어(DI)를 담당하는 최상위 인터페이스이고, ApplicationContext는 여기에 국제화(i18n), 이벤트 발행(ApplicationEventPublisher), 환경 변수 관리(Environment) 등 엔터프라이즈 기능을 추가한 확장 인터페이스입니다. 실무에서는 대부분 ApplicationContext를 사용합니다."
        }
    ]
};
