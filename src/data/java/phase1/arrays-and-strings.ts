import type { Module } from '../../curriculumData';

export const arraysAndStrings: Module = {
    id: "arrays-and-strings",
    title: "Chapter 2: 데이터 묶음의 기초 - 배열과 문자열",
    topic: "Array, String Pool, StringBuilder, Methods",
    content: `
## 1. 배열 (Array): 서랍장 만들기

> [!IMPORTANT]
> **입문자 필수**: 같은 종류의 물건이 여러 개 있을 때 각각 상자를 만들면 너무 힘들겠죠? 배열은 "숫자 상자 10개짜리 서랍장"을 한 번에 만드는 문법입니다.

### 핵심 메서드와 속성 (What/How/When)
- **length (속성)**
  - **What**: 배열이 총 몇 칸인지 알려줍니다.
  - **How**: \`int size = numbers.length;\`
  - **When**: 반복문(for)을 돌면서 내용을 모두 확인할 때 필수입니다.
- **인덱스 접근 (numbers[i])**
  - **What**: 특정 위치의 값을 꺼내거나 넣습니다. (0번부터 시작함에 주의!)

---

## 2. 문자열 (String)과 단골 메서드

자바에서 가장 많이 쓰이는 도구는 단연 '글자(String)'입니다. 하지만 많은 분이 유용한 기능을 몰라서 못 쓰시곤 하죠.

### 꼭 알아야 할 String 메서드 (What/How/When)
1. **equals(...)**
   - **What**: 두 글자가 내용이 같은지 비교합니다. (**매우 중요! ==을 쓰면 안 됩니다.**)
   - **When**: 로그인 비밀번호가 맞는지, 입력받은 명령어가 "시작"인지 확인할 때 씁니다.
2. **contains(...)**
   - **What**: 특정 글자가 포함되어 있는지 확인합니다.
   - **When**: 검색 기능 구현 시 제목에 '자바'라는 단어가 있는지 찾을 때 씁니다.
3. **split(...)**
   - **What**: 구분자로 문장을 쪼개서 배열로 만듭니다.
   - **When**: "사과,바나나,포도"라는 글자에서 과일 이름만 따로 추출하고 싶을 때 씁니다.
4. **substring(...)**
   - **What**: 글자의 일부분만 떼어냅니다.
   - **When**: 주민번호 앞자리에서 생년월일만 가져오고 싶을 때 씁니다.

---

## 3. 효율적인 문자열 합치기: StringBuilder

글자를 계속 더할 때(\`msg = msg + "!"\`) 자바는 매번 새로운 객체를 만드는 낭비를 합니다. 이때 전용 도구인 \`StringBuilder\`를 쓰면 매우 빠릅니다.

### 핵심 메서드
- **append(...)**: 뒤에 내용을 덧붙입니다.
- **toString()**: 조립이 끝난 내용을 최종적인 String으로 바꿉니다.
`,
    codeExamples: [
        {
            title: "실전 문자열 요리하기",
            language: "java",
            code: `public class StringChef {
    public static void main(String[] args) {
        String data = "아이폰,갤럭시,픽셀";
        
        // 1. 나누기 (split)
        String[] phones = data.split(",");
        for (String phone : phones) {
            System.out.println("기종: " + phone);
        }
        
        // 2. 포함 여부 (contains)
        if (data.contains("갤럭시")) {
            System.out.println("삼성 폰이 목록에 있습니다.");
        }
        
        // 3. 효율적 조립 (StringBuilder)
        StringBuilder sb = new StringBuilder();
        sb.append("총 기종 수: ").append(phones.length).append("개");
        System.out.println(sb.toString());
    }
}`
        }
    ],
    keyPoints: [
        "배열은 0번부터 순서가 시작된다는 점을 꼭 기억하세요.",
        "문자열 '내용'을 비교할 때는 반드시 s1.equals(s2)를 써야 합니다. (==은 주소 비교입니다.)",
        "자주 변하는 긴 문장을 만들 때는 StringBuilder가 성능상 압도적으로 좋습니다."
    ],
    interviewQuestions: [
        {
            difficulty: 'Medium',
            question: "왜 String 비교에 ==을 쓰면 안 되나요?",
            answer: "== 연산자는 메모리 상의 '위치(주소)'가 같은지를 봅니다. 반면 equals() 메서드는 그 안에 담긴 '글자 내용'이 같은지를 봅니다. 자바는 똑같은 글자라도 힙 메모리의 다른 곳에 저장될 수 있으므로, 내용이 같은지 보려면 반드시 equals()를 써야 합니다."
        }
    ]
};
