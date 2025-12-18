import type { Module } from '../../curriculumData';

export const jpaInternalsAndTuning: Module = {
    id: "jpa-internals-and-tuning",
    title: "Chapter 3: JPA 내부 동작 - 성능 영속성의 기술",
    topic: "Persistence Context, Dirty Checking Snapshot, N+1 Mechanism, OSIV Anti-pattern",
    content: `
## 1. 영속성 컨텍스트: 객체와 DB 사이의 완충지대

JPA는 DB에 직접 접근하지 않습니다. 모든 엔티티는 **영속성 컨텍스트**라는 1차 캐시를 거칩니다.

\`\`\`mermaid
flowchart TD
    App["Application"] -->|find| PC["**Persistence Context**<br>1차 캐시"]
    PC -->|Cache Hit| App
    PC -->|Cache Miss| SQL["SELECT Query"]
    SQL --> DB[(Database)]
    DB --> PC
\`\`\`

- **생명주기**: 트랜잭션과 생명주기를 같이 합니다. (OSIV가 꺼져있을 때)
- **동일성 보장**: 같은 트랜잭션 내에서 \`find(1)\`을 두 번 호출하면, 실제 객체 인스턴스 주소(==)가 완벽히 동일합니다.

---

## 2. **변경 감지(Dirty Checking)** 의 비밀: 스냅샷

JPA는 어떻게 \`update()\` 메서드 없이 데이터를 고칠까요?

1. **Snapshot**: 엔티티를 영속성 컨텍스트에 처음 담을 때, 그 상태를 복사해서 **스냅샷**으로 저장해둡니다.
2. **Comparison**: 트랜잭션이 끝나는 시점(Flush)에 **현재 객체 vs 스냅샷**을 비교합니다.
3. **Dirty**: 값이 바뀌었다면(Dirty), 자동으로 UPDATE 쿼리를 생성하여 쓰기 지연 SQL 저장소에 넣습니다.

---

## 3. 재앙: N+1 문제의 기술적 원인

JPA가 객체 그래프를 탐색하려 할 때 발생하는 현상입니다.
- **원인**: JPQL은 SQL로 번역될 때 엔티티의 연관관계를 고려하지 않고 오직 해당 엔티티(\`SELECT * FROM Member\`)만 조회합니다. 이후 결과를 돌면서 연관된 객체(\`Team\`)가 비어있으면 그때마다 추가 쿼리를 날리게 됩니다.
- **해결**: \`fetch join\`을 통해 애초에 SQL 레벨에서 \`JOIN\`으로 긁어오는 것이 유일한 원천 봉쇄 방법입니다.

---

## 4. OSIV(Open Session In View)와 커넥션 고갈

- **OSIV=true**: 컨트롤러나 뷰에서도 지연 로딩이 가능하지만, DB 커넥션을 API 응답이 나갈 때까지 붙들고 있습니다.
- **위험**: 외부 API 호출이 늦어지면 커넥션 풀이 마르고 전체 서버가 다운됩니다.
- **권장**: 실시간 트래픽이 높은 서비스라면 **OSIV를 끄고**, 별도의 DTO 조회용 서비스를 만들어 필요한 데이터를 미리 채워 넣으십시오.
`,
    codeExamples: [
        {
            title: "Dirty Checking: 명시적 저장이 필요 없는 이유",
            language: "java",
            code: `@Transactional
public void updateMember(Long id, String newName) {
    // 1. 조회 (이때 스냅샷 생성)
    Member member = repository.findById(id).orElseThrow();
    
    // 2. 값 변경 (객체 상태만 바꿈)
    member.setName(newName);
    
    // 3. 트랜잭션 종료 시 Flush가 일어나며 스냅샷과 비교
    // -> UPDATE 쿼리 자동 발생!
}`
        }
    ],
    keyPoints: [
        "JPA는 '객체와 DB의 패러다임 불일치'를 해결하기 위한 영속성 관리 기술입니다.",
        "N+1 문제는 지연 로딩이 아닌, SQL 중심의 JPQL 실행 방식 때문에 발생합니다.",
        "영속성 컨텍스트의 '쓰기 지연'은 네트워크 왕복 횟수를 획기적으로 줄여줍니다."
    ],
    interviewQuestions: [
        {
            difficulty: 'Hell',
            question: "왜 JPA 연관관계에서 Eager Loading을 지양해야 하나요?",
            answer: "Eager Loading은 예측 불가능한 SQL을 생성합니다. 특히 JPQL에서 N+1 문제를 일으키는 주범이며, 실무의 복잡한 연관관계에서 수십 개의 테이블이 한꺼번에 조인되어 성능을 심각하게 저하시킬 수 있기 때문입니다. 모든 연관관계는 Lazy로 설정하고 Fetch Join으로 해결하는 것이 정석입니다."
        }
    ]
};
