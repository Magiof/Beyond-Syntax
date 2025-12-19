import type { Module } from '../../types';

export const springIntroduction: Module = {
    id: "spring-introduction",
    title: "Chapter 1: Spring의 철학 - 겨울은 가고 봄이 오다",
    topic: "History of EJB, POJO Philosophy, The Spring Triangle (IoC, AOP, PSA)",
    content: `
## 1. 2002년, 로드 존슨의 혁명

> "항상 그래왔으니까"라는 말에 의문을 던지십시오.
시작은 간단했습니다. 2000년대 초반 자바 엔터프라이즈 세상은 **EJB(Enterprise JavaBeans)** 라는 거대한 겨울(Winter)에 갇혀 있었습니다. 스프링은 그 겨울을 끝내고 찾아온 "봄"이었습니다.
- **EJB의 독재**: 비즈니스 로직을 짜려면 \`EJBObject\` 같은 복잡한 인터페이스를 상속받아야 했습니다.
- **테스트 불가능**: 코드가 프레임워크에 강하게 결합되어, WAS(WebSphere, WebLogic 등) 없이는 단순한 단위 테스트조차 돌릴 수 없었습니다.

로드 존슨은 그의 저서 *J2EE Development without EJB*에서 이를 정면으로 비판하며, "**순수 자바 객체(POJO)로 돌아가자**"고 외쳤습니다. 이것이 Spring(봄)의 시작입니다.

---

## 2. 핵심 철학: POJO (Plain Old Java Object)

스프링의 존재 이유는 단 하나입니다.
"**엔터프라이즈 레벨의 복잡한 기술을 사용하면서도, 코드는 평범한 자바 객체(POJO)로 유지하는 것**" 입니다.

이를 가능하게 하는 것이 **스프링의 3대 기술(Triangle)**입니다.

\`\`\`mermaid
flowchart TD
    POJO((**POJO**))
    IoC[**IoC/DI**<br>제어의 역전] --> POJO
    AOP[**AOP**<br>관점 지향] --> POJO
    PSA[**PSA**<br>서비스 추상화] --> POJO

    subgraph Why ["왜 필요한가?"]
        IoC -.->|"객체 결합도 감소"| Clean[유연한 설계]
        AOP -.->|"핵심 로직 보존"| Clean
        PSA -.->|"기술 종속 제거"| Clean
    end
\`\`\`

---

## 3. 스프링 트라이앵글 (Spring Triangle)

### (1) IoC / DI (Inversion of Control)
- **Problem**: 코드 안에서 \`new OracleConnection()\`을 직접 하면 DB를 바꿀 때마다 코드를 뜯어고쳐야 합니다.
- **Solution**: "누가 내 파트너인가요?"를 코드가 결정하지 않고, **외부(스프링 컨테이너)**가 결정해서 알려줍니다.

### (2) AOP (Aspect Oriented Programming)
- **Problem**: 트랜잭션, 로깅, 보안 검사 코드가 비즈니스 로직과 뒤섞여 있습니다.
- **Solution**: 부가 기능을 따로 떼어내어, **컴파일이나 런타임 시점에 마법처럼 끼워 넣습니다.**

### (3) PSA (Portable Service Abstraction)
- **Problem**: JDBC 쓰다가 JPA로 바꾸려면 코드를 다 다시 짜야 하나요?
- **Solution**: 기술의 뒷단(Implementation)이 바뀌어도, 앞단(Interface)은 그대로 유지되도록 **추상화 계층**을 제공합니다. (\`@Transactional\`이 대표적인 예입니다.)

---

## 4. 결론: 스프링은 '도구'가 아니라 '접착제'다

스프링은 여러분의 비즈니스 로직이 특정 기술(Web, DB, Cloud)에 오염되지 않도록 막아주는 거대한 **보호막(Conainer)**이자, 객체들을 올바르게 연결해주는 **접착제(Glue)**입니다.
`,
    codeExamples: [
        {
            title: "EJB 스타일 vs Spring POJO 스타일",
            language: "java",
            code: `// [Old: EJB Style]
// 비즈니스 로직 하나 짜는데 'SessionBean'을 상속받아야 함. 
// 이 클래스는 WebLogic 같은 무거운 서버 없이는 실행조차 안 됨.
public class TransferBean extends SessionBean {
    public void ejbActivate() { ... }
    public void ejbPassivate() { ... }
    public void transfer() {
        // 복잡한 트랜잭션 코드들...
    }
}

// [New: Spring POJO Style]
// 그냥 평범한 자바 클래스. 
// 트랜잭션은 @Transactional 어노테이션이 알아서 처리(AOP).
// DB 연결은 생성자로 주입받음(DI).
@Service
public class TransferService {
    private final AccountRepository repo;

    public TransferService(AccountRepository repo) {
        this.repo = repo;
    }

    @Transactional
    public void transfer() {
        // 오직 순수한 비즈니스 로직만 존재!
    }
}`
        }
    ],
    keyPoints: [
        "스프링의 목표는 엔터프라이즈 기술의 복잡함을 제거하고 POJO 프로그래밍을 가능하게 하는 것입니다.",
        "IoC, AOP, PSA는 모두 POJO를 지키기 위한 수단입니다.",
        "로드 존슨의 혁명 덕분에 우리는 비즈니스 로직에만 집중할 수 있게 되었습니다."
    ],
    interviewQuestions: [
        {
            difficulty: 'Medium',
            question: "PSA(Portable Service Abstraction)의 예시를 들어보세요.",
            answer: "가장 대표적인 예시는 @Transactional입니다. JDBC를 쓰든, JPA를 쓰든, Hibernate를 쓰든 개발자는 동일하게 @Transactional 어노테이션만 붙이면 됩니다. 스프링이 내부적으로 사용되는 기술(PlatformTransactionManager 구현체)에 맞춰서 트랜잭션을 제어해주기 때문입니다. 캐시(@Cacheable)나 메시징 시스템도 마찬가지입니다."
        }
    ]
};
