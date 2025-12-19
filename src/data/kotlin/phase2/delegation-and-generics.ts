import type { Module } from '../../types';

export const delegationAndGenerics: Module = {
    id: "delegation-and-generics",
    title: "Chapter 11: 위임과 제네릭 - 유연한 코드의 재사용",
    topic: "클래스 위임(by), 프로퍼티 위임, 공변성(out)과 반공변성(in)",
    content: `
## 1. 상속의 대안: 클래스 위임 (Class Delegation)

"상속보다는 합성을 사용하라"는 격언을 코틀린은 \`by\` 키워드로 가장 우아하게 지원합니다. 인터페이스의 모든 메서드를 직접 구현하지 않고도 다른 객체에게 위임할 수 있습니다.

- **장점**: 기존 클래스의 구현을 유지하면서 일부 기능만 오버라이딩하거나 확장할 때 매우 강력합니다.

---

## 2. 프로퍼티 위임 (Property Delegation)

필드의 접근 로직을 별도의 객체에 맡깁니다.

- **lazy**: 지연 초기화.
- **Delegates.observable**: 값이 바뀔 때마다 실행되는 리스너 등록.
- **Delegates.vetoable**: 값이 바뀌기 전 조건 검사를 통해 변경을 거부(Veto)할 수 있음.

---

## 3. 선언 지점 변성 (Declaration-site Variance)

자바는 사용 지점 변성(\`? extends T\`)만 지원하여 코드가 복잡해졌지만, 코틀린은 클래스 선언 시점에 변성을 지정할 수 있습니다.

- **out (공변성)**: T를 생산(Produce)만 하는 경우. \`Producer<Any>\`에 \`Producer<String>\`을 대입할 수 있습니다.
- **in (반공변성)**: T를 소비(Consume)만 하는 경우. \`Consumer<String>\`에 \`Consumer<Any>\`를 대입할 수 있습니다.

---

## 4. 스타 투영 (Star Projection)

제네릭 타입을 정확히 알 수 없거나 중요하지 않을 때 \`*\`을 사용합니다. 자바의 \`Raw Type\`보다 안전한 대안입니다.
`,
    codeExamples: [
        {
            title: "클래스 위임과 in/out의 조화",
            language: "kotlin",
            code: `// 1. 클래스 위임 예시
class CountingSet<T>(
    private val innerSet: MutableSet<T> = mutableSetOf()
) : MutableSet<T> by innerSet { // 모든 메서드를 innerSet에 위임!
    var objectsAdded = 0
    override fun add(element: T): Boolean {
        objectsAdded++
        return innerSet.add(element)
    }
}

// 2. 제네릭 변성 예시
interface Producer<out T> { fun produce(): T }
interface Consumer<in T> { fun consume(item: T) }`
        }
    ],
    keyPoints: [
        "by 키워드를 통한 위임은 상속의 단점을 피하면서 코드 재사용성을 극대화합니다.",
        "out은 생산자(Java의 ? extends), in은 소비자(Java의 ? super)와 대응됩니다.",
        "선언 지점 변성을 통해 사용하는 쪽에서는 훨씬 단순한 문법을 누릴 수 있습니다."
    ],
    interviewQuestions: [
        {
            difficulty: 'Hell',
            question: "왜 코틀린은 자바와 달리 선언 지점 변성(out/in)을 도입했을까요?",
            answer: "자바의 와일드카드 문법은 너무 복잡하여 실수가 잦았습니다. 코틀린은 대다수의 제네릭 클래스가 생산자 혹은 소비자로만 쓰인다는 사실에 착안하여, 선언 시점에 변성을 결정함으로써 사용하는 쪽에서 매번 와일드카드를 명시할 필요 없이 타입 안전성을 누리게 설계했습니다."
        }
    ]
};
