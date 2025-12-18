import type { Module } from '../../curriculumData';

export const jpaInternalsAndTuning: Module = {
    id: "jpa-internals-and-tuning",
    title: "Chapter 3: JPA Internals & Query Tuning",
    topic: "Persistence Context, Dirty Checking, N+1 Problem, Fetch Join, OSIV",
    content: `
## 1. 영속성 컨텍스트
엔티티의 생명주기를 관리하고 1차 캐시, 쓰기 지연 등을 지원합니다.

## 2. N+1 문제
1번의 쿼리로 목록을 조회했을 때, 연관 엔티티 조회를 위해 N번의 추가 쿼리가 나가는 문제입니다.

## 3. 해결책: Fetch Join
JPQL의 \`join fetch\`를 사용하여 한 번에 모든 데이터를 가져옵니다.
`,
    codeExamples: [
        {
            title: "Fetch Join 쿼리",
            language: "java",
            code: `@Query("select m from Member m join fetch m.team")\nList<Member> findAllWithTeam();`
        }
    ],
    keyPoints: [
        "지연 로딩은 성능 최적화의 기본입니다.",
        "수정 시에는 변경 감지(Dirty Checking)를 활용합니다."
    ],
    interviewQuestions: [
        {
            difficulty: 'Hard',
            question: "N+1 문제를 해결하는 방법 3가지는?",
            answer: "Fetch Join, EntityGraph, Batch Size 설정입니다."
        }
    ]
};
