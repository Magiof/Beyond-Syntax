import type { Module } from '../../types';

export const springBeanLifecycle: Module = {
    id: "spring-bean-lifecycle",
    title: "Chapter 1: Spring Bean Lifecycle & Scope",
    topic: "BeanPostProcessor, BeanFactoryPostProcessor, Proxy 생성 시점, 커스텀 스코프",
    content: `
## 1. Bean 생명주기 전체 흐름

스프링 컨테이너가 시작되어 종료될 때까지 빈은 정해진 생명주기를 따릅니다. 이 과정을 정확히 알아야 복잡한 설정을 유연하게 제어할 수 있습니다.

1. **스프링 컨테이너 생성**
2. **스프링 빈 생성** (Constructor Injection 시점)
3. **의존관계 주입** (Setter/Field Injection 시점)
4. **초기화 콜백**: \`@PostConstruct\`, \`InitializingBean\`
5. **사용**
6. **소멸 전 콜백**: \`@PreDestroy\`, \`DisposableBean\`
7. **스프링 종료**

---

## 2. 핵심 확장 포인트: PostProcessors

스프링의 강력함은 '빈 생성 과정'에 끼어들 수 있는 인터페이스들에서 나옵니다.

### 2.1 BeanFactoryPostProcessor
빈 설정 메타데이터(\`BeanDefinition\`)가 로드된 후, 빈이 실제 생성되기 전에 호출됩니다.
- 예: \`PropertySourcesPlaceholderConfigurer\` (\`@Value\` 치환용)

### 2.2 BeanPostProcessor (BPP)
빈이 생성되고 초기화되기 직전과 직후에 호출됩니다. **스프링의 가장 핵심적인 확장 포인트**입니다.
- **AOP 기반 Proxy 생성**: BPP가 빈의 초기화 직후에 원본 빈 대신 프록시 객체를 컨테이너에 등록합니다.

\`\`\`java
@Component
public class MyBeanPostProcessor implements BeanPostProcessor {
    @Override
    public Object postProcessAfterInitialization(Object bean, String beanName) {
        // 특정 빈에 대해 프록시를 씌우거나 조작 가능
        return bean;
    }
}
\`\`\`

---

## 3. Bean Scope의 깊은 이해

기본인 Singleton 외에도 다양한 스코프가 존재하며, 라이프사이클이 다른 빈 간의 주입(Singleton -> Request) 시 주의가 필요합니다.

- **Singleton**: 컨테이너당 하나. (Default)
- **Prototype**: 요청할 때마다 새로 생성. (의존성 주입만 하고 관리는 안 함)
- **Web Scopes**: \`request\`, \`session\`, \`application\`, \`websocket\`

> **주의: Scoped Proxy**: 싱글톤 빈이 요청 스코프 빈을 주입받으려면 \`proxyMode\`를 사용해야 합니다. 그렇지 않으면 싱글톤 생성 시점에만 주입이 일어나 런타임에 올바른 스코프를 유지하지 못합니다.

---

## 4. 실전 가이드: 순환 참조와 생성자 주입

스프링 부트 2.6부터는 **순환 참조(Circular Dependency)**가 기본적으로 금지됩니다.
- **필드/Setter 주입**: 빈 생성은 가능하지만 사용 시점에 에러 발생.
- **생성자 주입**: 빈 생성 시점에 순환 참조를 감지하여 애플리케이션 구동이 차단됨. (가장 권장되는 방식)
`,
    codeExamples: [
        {
            title: "커스텀 BeanPostProcessor로 로깅 프록시 만들기",
            language: "java",
            code: `public class LoggingPostProcessor implements BeanPostProcessor {
    @Override
    public Object postProcessAfterInitialization(Object bean, String beanName) {
        if (beanName.contains("Service")) {
            return Proxy.newProxyInstance(...); // 로직 수행 전 로깅하는 프록시 리턴
        }
        return bean;
    }
}`
        }
    ],
    keyPoints: [
        "BeanFactoryPostProcessor는 설정 정보 조작, BeanPostProcessor는 객체 자체 조작에 쓰입니다.",
        "AOP는 BeanPostProcessor를 통해 원본 객체 대신 프록시를 빈으로 등록하는 원리입니다.",
        "가능한 한 생성자 주입을 사용하여 컴파일 타임에 순환 참조와 의존성 누락을 발견하세요."
    ],
    interviewQuestions: [
        {
            difficulty: 'Hard',
            question: "BeanPostProcessor와 BeanFactoryPostProcessor의 결정적인 차이는?",
            answer: "BeanFactoryPostProcessor는 빈 객체가 생기기 전 '설계도(Definition)'를 만질 수 있고, BeanPostProcessor는 이미 생성된 '객체 인스턴스'가 초기화되는 과정에서 이를 가공하거나 프록시로 대체할 수 있습니다."
        },
        {
            difficulty: 'Hell',
            question: "싱글톤 빈 내부에 프로토타입 빈을 사용하면 어떤 문제가 발생하며 어떻게 해결하나요?",
            answer: "싱글톤 빈은 한 번만 생성되므로 내부에 주입된 프로토타입 빈도 고정되어 매번 새로운 인스턴스를 얻지 못합니다. 이를 해결하려면 ObjectProvider를 사용하거나 프록시 모드를 설정해야 합니다."
        }
    ]
};
