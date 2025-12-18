import type { Module } from '../../curriculumData';

export const exceptionHandling: Module = {
    id: "exception-handling",
    title: "Chapter 1: 견고한 코드의 시작 - 예외 처리 전략",
    topic: "Checked vs Unchecked, try-with-resources, API Mastery",
    content: `
## 1. 예외(Exception)란? 프로그램 세계의 구급함

프로그램을 만들다 보면 100% 예상치 못한 사고(네트워크 끊김, 파일 없음 등)가 발생합니다. 자바는 이런 사고가 났을 때 "악! 문제 터졌어!"라고 비명을 지르는 대신, **'예외라는 객체'** 를 던져서 우리가 수습할 기회를 줍니다.

---

## 2. Checked vs Unchecked Exception (어떻게 다를까?)

### (1) Checked Exception (컴파일러의 잔소리)
- **What**: 치명적일 수 있거나 외부 환경(DB, 파일) 때문에 발생하는 예외.
- **When**: \`IOException\`, \`SQLException\`. 
- **Rule**: 반드시 \`try-catch\`로 잡거나 \`throws\`로 떠넘겨야 합니다. 안 하면 컴파일조차 안 됩니다.

### (2) Unchecked (Runtime) Exception (개발자의 실수)
- **What**: 주로 코드를 잘못 짜서 생기는 문제. 
- **When**: \`NullPointerException\`, \`IndexOutOfBoundsException\`.
- **Rule**: 컴파일러가 잡아주지 않습니다. 실력으로(방어 코드로) 막아야 합니다.

---

## 3. 예외 관련 핵심 메서드 (What/How/When)

입문자들은 예외를 잡고 나서 무엇을 해야 할지 몰라 당황하곤 합니다.

- **getMessage()**
  - **What**: 에러의 간략한 이유를 문자열로 돌려줍니다.
  - **When**: 사용자에게 "ID가 중복되었습니다" 같은 메시지를 보여줄 때 씁니다.
- **printStackTrace()**
  - **What**: 에러가 발생한 지점까지의 모든 경로(소송 기록)를 콘솔에 찍습니다.
  - **When**: **개발 중 디버깅할 때만 쓰세요.** 실제 서비스에서 남발하면 보안과 성능에 좋지 않습니다.

---

## 4. 리소스 관리의 정석: try-with-resources

파일이나 네트워크를 열고 잊어버리면 메모리 누수가 생겨 서버가 죽습니다. 

\`\`\`java
// 괄호() 안에 자원을 넣으면, 작업 후 알아서 .close()를 호출해 줍니다!
try (Scanner sc = new Scanner(System.in)) {
    // 로직 수행
} catch (Exception e) {
    // 사고 수습
}
\`\`\`
`,
    codeExamples: [
        {
            title: "실전 예외 처리와 로깅",
            language: "java",
            code: `public class SafetyFirst {
    public void loadData(String path) {
        try {
            if (path == null) {
                // 실수를 방지하기 위해 런타임 예외를 직접 던짐
                throw new IllegalArgumentException("경로가 텅 비어있어요!");
            }
            // 파일 읽기 로직 (생략)
        } catch (IllegalArgumentException e) {
            System.out.println("경고: " + e.getMessage());
        } catch (Exception e) {
            System.out.println("알 수 없는 사고 발생!");
            e.printStackTrace();
        }
    }
}`
        }
    ],
    keyPoints: [
        "예외는 프로그램 폭주를 막고 안전하게 중단하기 위한 제동 장치입니다.",
        "Checked 예외는 외부 시스템(Resource)과 통신할 때 주로 발생합니다.",
        "try-with-resources는 자바 개발자의 필수 소양입니다."
    ],
    interviewQuestions: [
        {
            difficulty: 'Hard',
            question: "왜 최근 라이브러리들은 Checked Exception을 Unchecked로 바꿔서 던지는 추세인가요?",
            answer: "Checked 예외는 모든 중간 계층 메서드에 throws 선언을 강제하여 코드 사이의 결합도를 높이기 때문입니다. 또한 람다식 등 현대적 문법에서 Checked 예외는 처리가 매우 번거로우므로, 런타임 예외로 전환하여 전체적인 유연성을 확보하고자 합니다."
        }
    ]
};
