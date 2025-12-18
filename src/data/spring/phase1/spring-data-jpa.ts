import type { Module } from '../../curriculumData';

export const springDataJpa: Module = {
    id: "spring-data-jpa",
    title: "Chapter 6: Spring Data JPA",
    topic: "@Entity, Repository, JPQL, 연관관계",
    content: `
## 1. 객체-DB 매칭 (ORM)
엔티티 클래스에 @Entity를 붙여 DB 테이블과 연결합니다.

## 2. Repository 인터페이스
JpaRepository를 상속받으면 기본적인 CRUD가 자동으로 구현됩니다.

## 3. 메서드 쿼리
findByXxx 형태의 메서드 이름만으로 복잡한 조회 쿼리를 생성할 수 있습니다.
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
