import type { Module } from '../../curriculumData';

export const springDataJpa: Module = {
    id: "spring-data-jpa",
    title: "Chapter 6: 데이터 접근 기술의 진보 (JDBC에서 JPA까지)",
    topic: "EntityManager, 영속성 컨텍스트, Spring Data JPA 인터페이스 매커니즘",
    content: `
## 1. 지루한 반복 작업에서 해방되다: JDBC의 한계

토비의 스프링 초반부에서 JDBC 코드가 얼마나 반복적이고 지저분해지기 쉬운지 다룹니다. 커넥션 열기, PreparedStatement 생성, 결과 처리, 자원 반납 등 비즈니스 로직보다 부가적인 코드가 훨씬 많습니다.

---

## 2. JPA (Java Persistence API): 객체와 DB의 가교

JPA는 자바 객체와 관계형 데이터베이스의 레코드를 매핑해주는 **ORM(Object-Relational Mapping)** 표준입니다.
- **SQL 중심 개발에서 객체 중심 개발로**: 직접 쿼리를 짜는 대신, 객체의 상태를 변경하여 DB에 반영합니다.
- **패러다임 불일치 해결**: 상속, 연관관계 등 자바 객체 구조를 DB에 자연스럽게 녹일 수 있습니다.

---

## 3. Spring Data JPA의 마법: 프록시 기반의 동적 구현

우리는 보통 인터페이스만 정의하고 메서드 이름만 규칙에 맞춰 지으면, 스프링이 알아서 구현체를 만들어줍니다.
- **동적 프록시(Dynamic Proxy)**: 스프링은 런타임에 인터페이스를 구현한 클래스를 동적으로 생성하여 빈으로 등록합니다.
- **쿼리 메서드**: \`findByUsername\`이라는 이름만 보고 \`SELECT u FROM User u WHERE u.username = :username\`이라는 쿼리를 자동으로 생성합니다.

---

## 4. 영속성 컨텍스트 (Persistence Context)의 이해

JPA의 핵심은 엔티티를 관리하는 논리적 공간인 영속성 컨텍스트입니다.
- **1차 캐시**: 반복적인 DB 조회를 줄여 성능을 최적화합니다.
- **변경 감지 (Dirty Checking)**: 엔티티의 수정사항을 알아서 감지하여 트랜잭션 종료 시 \`UPDATE\` 쿼리를 전송합니다.

> **Tip**: JPA는 양날의 검입니다. 편리하지만 **N+1 문제** 등 성능 저하의 원인을 정확히 이해하고 사용해야 합니다. (Phase 2에서 심화 학습)
`,
    codeExamples: [
        {
            title: "JPA 사용 예시",
            language: "java",
            code: "public interface UserRepo extends JpaRepository<User, Long> {\n  Optional<User> findByEmail(String email);\n}"
        }
    ],
    keyPoints: [
        "SQL이 아닌 객체 관점에서 데이터를 다룹니다.",
        "비즈니스 로직에 집중할 수 있게 해줍니다."
    ],
    interviewQuestions: [
        {
            difficulty: 'Medium',
            question: "지연 로딩(Lazy Loading)이란?",
            answer: "실제로 데이터가 필요한 시점에 쿼리를 날려 조회하는 최적화 방식입니다."
        }
    ]
};
