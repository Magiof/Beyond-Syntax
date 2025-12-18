import type { Module } from '../../curriculumData';

export const inheritanceAndInterfaces: Module = {
    id: "inheritance-and-interfaces",
    title: "Chapter 7: 클래스 계층 설계 - 상속보다는 합성을 위하여",
    topic: "open/final, 인터페이스 기본 구현, Sealed Class, 추상화 계층",
    content: `
## 1. 기본은 '닫혀있음': final by default

자바와 달리 코틀린의 모든 클래스와 메서드는 기본적으로 \`final\`입니다. 상속을 허용하려면 명시적으로 **open** 키워드를 붙여야 합니다.

- **이유**: 실수를 방지하고 하위 클래스에서 예상치 못하게 부모의 동작을 변경(Overriding)하여 발생하는 버그를 원천 차단하기 위해서입니다. (Effective Java의 "상속을 위한 설계가 아니면 상속을 금지하라"는 원칙을 언어 레벨에서 강제)

---

## 2. 인터페이스: 자바 8 그 이상의 강력함

코틀린의 인터페이스는 추상 메서드뿐만 아니라 **상태를 가지지 않는 프로퍼티**와 **기본 구현이 있는 메서드**를 포함할 수 있습니다.

- **장점**: 다중 상속의 이점을 누리면서도 다중 상속의 복잡한 문제(다이아몬드 문제)를 안전하게 회피합니다.

---

## 3. 봉인된 클래스: sealed class

상속받는 자식 클래스의 종류를 컴파일 시점에 제한합니다. 이는 열거형(Enum)의 확장판과 같으며, 각 하위 타입이 서로 다른 상태를 가질 수 있습니다.

- **when과의 조화**: \`when\` 식에서 \`sealed class\`의 모든 하위 타입을 처리하면, \`else\` 문을 작성하지 않아도 됩니다. 만약 새로운 하위 타입이 추가되면 컴파일러가 바로 에러를 내주어 누락을 방지합니다.

---

## 4. 가시성 제어: internal의 등장

- **public, private, protected**: 자바와 유사하지만 의미가 약간 다릅니다. (예: 코틀린의 protected는 같은 패키지라고 해서 접근할 수 없습니다.)
- **internal**: **같은 모듈** 안에서만 접근 가능하도록 제한합니다. 이는 프로젝트를 모듈 단위로 나눌 때 캡슐화를 유지하는 데 매우 유익합니다.
`,
    codeExamples: [
        {
            title: "Sealed Class와 exhaustive when",
            language: "kotlin",
            code: `sealed class UIState {
    object Loading : UIState()
    data class Success(val data: String) : UIState()
    data class Error(val message: String) : UIState()
}

fun render(state: UIState) = when (state) {
    is UIState.Loading -> println("Loading...")
    is UIState.Success -> println("Data: \${state.data}")
    is UIState.Error -> println("Error: \${state.message}")
    // else가 필요 없음! 모든 케이스를 처리했음을 컴파일러가 보장함
}`
        }
    ],
    keyPoints: [
        "final by default는 상속으로 인한 취약한 기반 클래스 문제를 예방합니다.",
        "sealed class는 상태를 가지는 계층 구조를 안전하게 표현하는 최적의 도구입니다.",
        "internal 가시성을 통해 모듈 간의 의존성을 더 세밀하게 제어할 수 있습니다."
    ],
    interviewQuestions: [
        {
            difficulty: 'Hard',
            question: "sealed class와 enum의 결정적인 차이는 무엇인가요?",
            answer: "enum은 각 상수가 단 하나의 인스턴스만 가지며 상태를 공유하기 어렵지만, sealed class는 하위 클래스를 일반적인 클래스처럼 정의할 수 있어 각 인스턴스가 생성 시점에 서로 다른 고유한 상태를 가질 수 있습니다."
        }
    ]
};
