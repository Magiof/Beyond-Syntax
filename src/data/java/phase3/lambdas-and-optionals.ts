import type { Module } from '../../types';

export const lambdasAndOptionals: Module = {
    id: "lambdas-and-optionals",
    title: "Chapter 1: 함수형 사고의 시작 - 람다와 옵셔널",
    topic: "Functional Interface, Lambda, Method Reference, Optional",
    content: `
## 1. 자바의 대변신: 왜 람다가 필요할까?

옛날 자바는 아주 간단한 일(예: 이름순 정렬)을 시키려 해도 거대한 '익명 클래스'라는 서류 뭉치를 작성해야 했습니다. 람다는 이 모든 절차를 생략하고 '**알맹이 로직**' 만 전달하는 마법입니다.

- **Before**: "나 익명 클래스인데, Comparator를 구현했고, compare 메서드 내용은..."
- **After (Lambda)**: \`(a, b) -> a.compareTo(b)\` (간결!)

---

## 2. 표준 함수형 친구들 (What/How/When)

자바가 미리 만들어둔 "딱 정해진 역할"의 인터페이스들입니다.

1. **Predicate(판별사)**
   - **What**: 데이터를 보고 참/거짓을 판별합니다. (\`test\`)
   - **When**: "나이가 20살 이상인가?", "아이디가 비어 있는가?" 같은 조건 검사에 씁니다.
2. **Function(변환사)**
   - **What**: A를 받아서 B로 바꿔줍니다. (\`apply\`)
   - **When**: "사용자 객체에서 이름만 뽑아내기", "String을 숫자로 바꾸기" 등에 씁니다.
3. **Consumer(소비자)**
   - **What**: 데이터를 받기만 하고 아무것도 안 돌려줍니다. (\`accept\`)
   - **When**: 리스트를 돌면서 하나씩 출력하거나 로깅할 때 씁니다.

---

## 3. Optional: Null과의 전쟁을 선포하다

> [!IMPORTANT]
> **입문자 필수**: 자바 개발자의 최대의 적은 \`NullPointerException\`입니다. \`Optional\`은 "여기에 값이 없을 수도 있으니 주의해!"라고 경고 표시를 붙인 특수 포장지입니다.

### 핵심 메서드 (What/How/When)
- **filter(...)**
  - **What**: 포장지 안의 내용물이 조건을 만족하지 않으면 빈 포장지로 만듭니다.
- **map(...)**
  - **What**: 포장지 안의 내용을 가공해서 다시 포장합니다.
- **orElseThrow(...)**
  - **What**: 내용물이 있으면 꺼내고, 없으면 내가 정한 에러를 터뜨립니다.
  - **When**: 백엔드에서 "ID가 없으면 404 에러를 내보낼 때" 가장 많이 씁니다.
`,
    codeExamples: [
        {
            title: "백엔드 개발의 정석: Optional 체이닝",
            language: "java",
            code: `public String getOwnerName(Room room) {
    return Optional.ofNullable(room)
        .map(Room::getOwner)     // 방에서 주인을 찾고
        .map(Owner::getName)    // 주인의 이름을 찾고
        .filter(name -> !name.isEmpty()) // 이름이 비어있지 않다면
        .orElse("주인 없음");    // 하나라도 실패하면 폴백!
}`
        }
    ],
    keyPoints: [
        "람다는 함수형 인터페이스를 가장 짧고 우아하게 구현하는 방법입니다.",
        "자바 표준 함수형 인터페이스(Predicate, Function 등)의 이름을 외우면 API 문서 읽기가 즐거워집니다.",
        "Optional은 NPE 방지를 위해 탄생했으며, 반환값으로만 사용하는 것이 정석입니다."
    ],
    interviewQuestions: [
        {
            difficulty: 'Medium',
            question: "왜 람다 안에서 외부 지역 변수를 쓰려 할 때 'final'이어야 한다고 하나요?",
            answer: "람다가 실행되는 시점에 외부 변수가 이미 사라졌을 수도(스택에서 제거) 있기 때문입니다. 자바는 그 시점의 변수 값을 복사해서 람다 주머니에 넣어두는데, 나중에 외부 값이 바뀌어버리면 람다가 들고 있는 가짜 값과 실제 값이 불일치하게 됩니다. 이를 막기 위해 '절대 안 변함'을 보장해야 합니다."
        }
    ]
};
