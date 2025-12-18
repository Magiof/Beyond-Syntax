import type { Module } from '../../curriculumData';

export const aopAndTransactional: Module = {
    id: "aop-and-transactional",
    title: "Chapter 2: AOP와 Transactional의 비밀",
    topic: "Proxy Pattern, CGLIB, Transaction Propagation, Isolation",
    content: `
## 1. 프록시 기반 AOP
스프링은 대상 빈을 감싸는 프록시 객체를 만들어 트랜잭션 등의 부가 기능을 수행합니다.

## 2. 트랜잭션 전파 (Propagation)
- **REQUIRED**: 기본값, 부모 트랜잭션이 있으면 합류
- **REQUIRES_NEW**: 부모와 무관하게 새 트랜잭션 시작

## 3. 격리 수준 (Isolation)
동시성 제어를 위해 데이터 일관성 유지 수준을 정의합니다.
`,
    codeExamples: [
        {
            title: "트랜잭션 설정",
            language: "java",
            code: `@Transactional(propagation = Propagation.REQUIRES_NEW)\npublic void save() { ... }`
        }
    ],
    keyPoints: [
        "내부 호출(Self-invocation) 시에는 프록시가 동작하지 않아 AOP가 적용되지 않습니다.",
        "트랜잭션 격리 수준을 높이면 성능이 저하될 수 있습니다."
    ],
    interviewQuestions: [
        {
            difficulty: 'Hard',
            question: "@Transactional이 동작하지 않는 상황은?",
            answer: "private 메서드 호출, 내부 메서드 호출, 트랜잭션이 없는 외부 클래스에서의 호출 등입니다."
        }
    ]
};
