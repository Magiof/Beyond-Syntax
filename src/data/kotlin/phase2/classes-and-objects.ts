import type { Module } from '../../curriculumData';

export const classesAndObjects: Module = {
    id: "classes-and-objects",
    title: "Chapter 6: 클래스와 객체 - 코틀린의 마법 해부",
    topic: "Properties vs Fields, Backing Properties, Decompile Analysis",
    content: `
## 1. 프로퍼티(Property)는 필드(Field)가 아닙니다

> **면접 단골 질문**: "코틀린의 \`val\`은 자바의 \`final\` 변수와 같나요?"

겉으로는 비슷해 보이지만, **컴파일된 바이트코드(Bytecode)**를 보면 전혀 다릅니다.

\`\`\`kotlin
class User {
    val name: String = "Alice"
}
\`\`\`

위 코드는 실제로 아래의 **Java 코드**로 변환됩니다.

\`\`\`java
public final class User {
    // 1. 실제 데이터는 감춰짐 (Encapsulation)
    @NotNull
    private final String name = "Alice";

    // 2. 접근자(Getter)가 자동 생성됨
    @NotNull
    public final String getName() {
        return this.name;
    }
}
\`\`\`

코틀린은 우리가 필드에 직접 접근한다고 착각하게 만들지만, 실제로는 항상 **Getter/Setter 메서드를 거쳐서 접근**합니다. 이것이 코틀린이 "**프로퍼티 오버라이딩**" 을 지원할 수 있는 비밀입니다.

---

## 2. 뒷받침하는 필드 (Backing Field)

커스텀 Getter를 만들 때 \`field\` 식별자를 보신 적이 있나요?
이걸 쓰지 않고 이름(\`name\`)을 그대로 부르면, 다시 Getter(\`getName\`)를 호출하게 되어 **무한 재귀(StackOverflowError)**에 빠집니다.

\`\`\`kotlin
var count = 0
    set(value) {
        if (value >= 0) field = value // OK: 실제 메모리 공간(field)에 씀
        // this.count = value         // BAD: set()을 다시 호출함 (무한 루프)
    }
\`\`\`

---

## 3. 강력한 캡슐화: 뒷받침하는 프로퍼티 (Backing Property)

> **Effective Kotlin Item 1**: 불변성을 제한해라

리스트 같은 컬렉션을 다룰 때, "**내부에서는 수정 가능하지만, 외부에서는 읽기 전용**" 으로 만들고 싶을 때가 많습니다. 이때 \`Backing Property\` 패턴을 씁니다.

\`\`\`kotlin
class Order {
    // 1. 내부용: 마음대로 수정 가능한 Private 리스트
    private val _items = mutableListOf<String>()

    // 2. 외부용: 읽기만 가능한 불변(Immutable) 리스트 뷰
    val items: List<String>
        get() = _items 
}
\`\`\`
이렇게 하면 외부(\`Order\`)에서 \`items.add()\`를 호출할 수 없어 완벽하게 안전해집니다.

---

## 4. object: 단순한 싱글톤 그 이상

코틀린의 \`object\`는 "**클래스 정의와 동시에 객체 생성**" 을 수행합니다.
특히 \`Companion Object\`는 단순 \`static\`이 아니기 때문에, 인터페이스를 구현하여 **팩토리 패턴**을 우아하게 만들 수 있습니다.

`,
    codeExamples: [
        {
            title: "Backing Property를 활용한 완벽한 캡슐화",
            language: "kotlin",
            code: `class ViewModel {
    // 내부에서는 데이터를 변경해야 함 (Mutable)
    private val _uiState = MutableLiveData<String>()

    // 외부(Activity/Fragment)에는 변경 불가능한 상태만 노출 (Immutable)
    // 이렇게 하지 않으면, UI가 데이터를 마음대로 조작할 위험이 생김
    val uiState: LiveData<String>
        get() = _uiState
    
    fun updateData(newData: String) {
        _uiState.value = newData // 내부에서는 OK
    }
}`
        }
    ],
    keyPoints: [
        "코틀린의 프로퍼티는 '필드 + 접근자(Getter/Setter)'의 묶음입니다.",
        "커스텀 접근자 작성 시 무한 루프를 방지하기 위해 반드시 'field' 식별자를 사용해야 합니다.",
        "외부의 변경으로부터 내부 상태를 보호하려면 'Backing Property' 패턴(_private + public)을 적극 활용하십시오."
    ],
    interviewQuestions: [
        {
            difficulty: 'Hard',
            question: "const val (상수)와 val (읽기 전용)의 차이는 무엇인가요?",
            answer: "const val은 '컴파일 타임 상수'로, 컴파일 시점에 값이 결정되어 바이트코드에 숫자가 그대로 박힙니다(Inlining). 반면 val은 '런타임 불변'으로, 실제로는 getter를 통해 값을 가져오므로 실행 시점마다 다른 값을 반환하도록 로직을 짤 수도 있습니다(예: val random get() = Random.nextInt())."
        },
        {
            difficulty: 'Hard',
            question: "Companion Object와 Java static의 결정적 차이는?",
            answer: "Java의 static은 클래스에 붙은 단순한 멤버이지만, Companion Object는 그 자체로 실제 런타임에 존재하는 '객체(Object)'입니다. 따라서 변수에 할당할 수도 있고, 인터페이스를 구현할 수도 있으며, 메서드의 파라미터로도 전달될 수 있습니다."
        }
    ]
};
