import type { Module } from '../../curriculumData';

export const reflectionAndDynamicProxy: Module = {
    id: 'reflection-and-dynamic-proxy',
    title: 'Chapter 4: 리플렉션과 동적 프록시',
    topic: 'Reflection API, Dynamic Proxy, CGLIB, Annotation Processor',
    content: `
## 1. 리플렉션 (Reflection)
구체적인 클래스 타입을 알지 못해도, 런타임에 클래스의 정보(메서드, 필드 등)를 조회하고 조작할 수 있는 API입니다.

### 1.1 사용 예시

\`\`\`java
Class<?> clazz = Class.forName("com.example.User");
Method method = clazz.getMethod("getName");
Object result = method.invoke(instance);
\`\`\`

스프링 프레임워크가 \`@Controller\`가 붙은 클래스를 찾아서 객체를 생성하고 매핑할 수 있는 원리가 바로 리플렉션입니다.

### 1.2 단점
- **성능 오버헤드**: 컴파일 타임 최적화를 받지 못합니다.
- **안전성 저하**: private 필드 접근 등 캡슐화를 깰 수 있습니다.

---

## 2. 동적 프록시 (Dynamic Proxy)
런타임에 인터페이스나 클래스의 프록시(대리자) 객체를 생성합니다. AOP(Aspect Oriented Programming)의 핵심 기술입니다.

### 2.1 JDK Dynamic Proxy
- **특징**: Java 표준 API. **인터페이스**가 반드시 있어야 함.
- **원리**: \`InvocationHandler\`를 통해 메서드 호출을 가로챕니다.

\`\`\`java
UserService proxy = (UserService) Proxy.newProxyInstance(
    loader,
    new Class[]{UserService.class},
    new MyInvocationHandler(realService)
);
\`\`\`

### 2.2 CGLIB (Code Generation Library)
- **특징**: 오픈소스 라이브러리(스프링에 내장). **클래스 상속** 기반.
- **원리**: 바이트코드를 조작하여 타겟 클래스를 상속받는 프록시 클래스를 생성합니다. 인터페이스가 없어도 됩니다.

> **참고**: Spring Boot는 기본적으로 CGLIB를 사용하여 프록시를 생성합니다.

---

## 3. Annotation Processor (컴파일 타임 코드 생성)
Lombok(\`@Getter\`, \`@Setter\`)은 어떻게 동작할까요? 
컴파일 시점에 어노테이션을 스캔하고, **AST(Abstract Syntax Tree)** 를 조작하여 코드를 동적으로 생성해 끼워 넣습니다.
`,
    keyPoints: [
        'Reflection은 런타임에 객체의 구조를 분석하고 조작하는 강력하지만 비용이 비싼 기능입니다.',
        'JDK Dynamic Proxy는 인터페이스 기반, CGLIB는 상속(바이트코드 조작) 기반으로 프록시를 생성합니다.',
        'Lombok은 Annotation Processor를 사용하여 컴파일 타임에 AST를 수정, 보일러플레이트 코드를 자동 생성합니다.'
    ],
    interviewQuestions: [
        {
            difficulty: 'Medium',
            question: "Reflection API 사용 시 주의할 점은?",
            answer: "컴파일 타임 타입 체크가 불가능해 런타임 오류 위험이 있고, 접근 제어를 무시하여 캡슐화를 깰 수 있으며, 일반 호출보다 성능 오버헤드가 큽니다."
        },
        {
            difficulty: 'Hard',
            question: "JDK Dynamic Proxy와 CGLIB의 차이는?",
            answer: "JDK Dynamic Proxy는 인터페이스가 반드시 필요하며 리플렉션을 사용하지만, CGLIB는 바이트코드를 조작하여 클래스를 상속받는 방식이라 인터페이스 없이도 가능합니다."
        }
    ]
};
