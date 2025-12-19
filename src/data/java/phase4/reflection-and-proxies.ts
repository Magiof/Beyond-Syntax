import type { Module } from '../../types';

export const reflectionAndProxies: Module = {
    id: "reflection-and-proxies",
    title: "Chapter 3: 리플렉션과 프록시 - 프레임워크의 마법을 풀다",
    topic: "Reflection API, JDK Dynamic Proxy vs CGLIB, Annotation processing",
    content: `
## 1. 런타임의 초능력: 리플렉션 (Reflection)

> "**코드가 자기 자신을 들여다보고 조작할 수 있다면?**"

리플렉션은 구체적인 클래스 타입을 몰라도 런타임에 클래스, 메서드, 필드에 접근할 수 있게 해주는 API입니다. 스프링의 DI, 하이퍼네이트의 엔티티 매핑이 바로 이 기술 위에 세워져 있습니다.

- **비용 (The Cost)**: 컴파일 타임 최적화가 불가능하고, 시그니처 체크 비용이 발생하여 일반 호출보다 **느립니다.** 또한 캡슐화를 강제로 해제(\`setAccessible(true)\`)하므로 보안상 주의가 필요합니다.

---

## 2. 프록시(Proxy) 기둥: JDK vs CGLIB

스프링이 빈을 감싸 부가 기능을 넣을 때 사용하는 두 가지 방식입니다.

\`\`\`mermaid
flowchart TD
    subgraph JDK ["JDK Dynamic Proxy"]
        Interface1[Interface] --- Proxy1[Java Proxy]
        Proxy1 --- Target1[Real Object]
    end
    
    subgraph CGLIB ["CGLIB Proxy"]
        Target2[Real Class] -->|Inheritance| SubclassProxy[Generated Subclass]
    end

    JDK -.->|"인터페이스 필수"| Use1[Spring AOP]
    CGLIB -.->|"구체 클래스 가능"| Use2[Spring Boot Default]
\`\`\`

- **JDK Dynamic Proxy**: 자바 순수 기능. 인터페이스를 상속받아 프록시를 만듭니다. 타겟의 실제 타입을 알 수 없습니다.
- **CGLIB**: 바이트코드를 조작하여 타겟을 상속받은 서브클래스를 만듭니다. \`final\` 클래스나 메서드는 프록시를 만들 수 없다는 제약이 있습니다.

---

## 3. 애노테이션 프로세싱 (Annotation Processing)

\`@Component\`, \`@Service\` 같은 애노테이션은 그 자체로 로직을 가지지 않습니다. 
리플렉션을 통해 "이 클래스에 \`@Service\`가 붙어 있나?"를 확인한 후, 프록시로 감싸거나 컨테이너에 등록하는 **분석(Scan)** 과정이 핵심입니다.

---

## 4. 왜 시니어는 리플렉션을 경계하나?

1. **타입 안정성**: 컴파일러가 오류를 잡아줄 수 없습니다. (오타 하나에 런타임 폭발)
2. **성능**: 반복적으로 호출되는 핵심 로직에 리플렉션을 쓰면 전체 throughput이 급감합니다.
3. **디버깅**: 스택 트레이스가 복잡해져서 문제 추적이 힘듭니다.
`,
    codeExamples: [
        {
            title: "리플렉션으로 private 필드 강제 접근",
            language: "java",
            code: `public class Secretive {
    private String password = "1234";
}

// 런타임에 담을 넘기
Field field = Secretive.class.getDeclaredField("password");
field.setAccessible(true); // 캡슐화 해제!
String value = (String) field.get(new Secretive());
System.out.println("해킹된 비밀번호: " + value);`
        }
    ],
    keyPoints: [
        "리플렉션은 유연함을 제공하지만, 성능과 안정성을 담보로 합니다.",
        "JDK 프록시는 인터페이스 기반, CGLIB은 상속 기반임을 명확히 구분해야 합니다.",
        "최신 스프링 부트는 성능과 편의성을 위해 CGLIB를 기본으로 채택하고 있습니다."
    ],
    interviewQuestions: [
        {
            difficulty: 'Hard',
            question: "왜 CGLIB 프록시는 상속 불가능한(final) 클래스에 사용할 수 없나요?",
            answer: "CGLIB은 타겟 클래스를 상속받아 자식 클래스를 만들고 메서드를 오버라이딩하여 부가 기능을 끼워 넣는 방식이기 때문입니다. final 클래스나 final 메서드는 문법적으로 상속과 오버라이딩이 금지되어 있어 바이트코드 조작이 불가능합니다."
        }
    ]
};
