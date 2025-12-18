import type { Module } from '../../curriculumData';

export const scopeFunctions: Module = {
    id: "scope-functions",
    title: "Chapter 10: 스코프 함수 - 코드의 문맥을 우아하게",
    topic: "let, run, with, apply, also, Decision Matrix",
    content: `
## 1. 스코프 함수 (Scope Functions)란?

특정 객체의 컨텍스트 내에서 코드 블록을 실행할 수 있게 해주는 함수들입니다. 이를 적절히 사용하면 임시 변수를 줄이고 메서드 체이닝을 통해 가독성을 높일 수 있습니다.

---

## 2. 선택을 위한 2축 가이드

스코프 함수 5가지는 딱 두 가지 차이점으로 구분됩니다.

### (1) 객체를 참조하는 방식
- **this (수신 객체 지정 람다)**: \`apply\`, \`run\`, \`with\`. 마치 클래스 내부 메서드처럼 멤버에 직접 접근 가능합니다.
- **it (일반 람다)**: \`let\`, \`also\`. 파라미터 이름을 직접 지정할 수도 있어 문맥이 명확합니다.

### (2) 반환 값
- **객체 자신 (Context Object)**: \`apply\`, \`also\`. 빌더 패턴처럼 설정을 마친 객체를 다시 돌려줍니다.
- **람다 결과 (Lambda Result)**: \`let\`, \`run\`, \`with\`. 블록의 마지막 줄 결과를 반환합니다.

---

## 3. 언제 무엇을 쓰는가?

- **apply**: 객체 생성 직후 설정을 몰아서 할 때. (가장 많이 쓰임)
- **let**: null 체크 후 작업을 수행하거나, 결과를 변환(Mapping)할 때.
- **also**: 객체를 수정하지 않고 로깅이나 유효성 검사 등 부수 효과(Side Effect)를 일으킬 때.
- **with**: 이미 생성된 객체에 대해 여러 작업을 한꺼번에 지시할 때.
- **run**: 객체 초기화와 결과 계산을 동시에 수행할 때.
`,
    codeExamples: [
        {
            title: "스코프 함수 실전 비교",
            language: "kotlin",
            code: `// 1. apply: 설정 후 객체 반환
val textView = TextView(context).apply {
    text = "Hello"
    textSize = 20.0f
}

// 2. let: null 체크와 변환
val length = textView.text?.let {
    println("Original text: $it")
    it.length // Int 반환
} ?: 0

// 3. also: 중간 로깅
val numbers = mutableListOf(1, 2, 3).also {
    println("List initialized with size: \${it.size}")
}`
        }
    ],
    keyPoints: [
        "this를 사용하는 함수(apply, run)는 객체의 속성을 변경할 때 유리합니다.",
        "it을 사용하는 함수(let, also)는 외부 스코프의 변수와 이름이 겹칠 때 혼동을 줄여줍니다.",
        "스코프 함수를 너무 중첩해서 쓰면 오히려 가독성을 해치므로 최대 1~2단계 배치를 권장합니다."
    ],
    interviewQuestions: [
        {
            difficulty: 'Medium',
            question: "let과 run은 둘 다 람다의 결과를 반환하는데, 어떤 기준으로 선택하나요?",
            answer: "객체의 멤버 메서드나 프로퍼티에 많이 접근해야 한다면 this를 사용하는 run이 유리하고, 객체가 null일 수 있어 안전 호출(?.)과 함께 사용하거나 외부 변수와 명확히 구분해야 한다면 it을 사용하는 let이 적절합니다."
        }
    ]
};
