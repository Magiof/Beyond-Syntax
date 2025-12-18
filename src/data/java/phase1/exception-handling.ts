import type { Module } from '../../curriculumData';

export const exceptionHandling: Module = {
    id: "exception-handling",
    title: "Chapter 14: 예외 처리",
    topic: "try-catch-finally, throw/throws, 체크/언체크 예외",
    content: `
## 1. 예외(Exception) 계층

- **Error**: 시스템 오류 (복구 불가, 예: OOM)
- **Checked Exception**: 컴파일 시 처리 강제 (예: IOException)
- **Unchecked Exception**: 런타임 예외 (예: NPE, ArithmeticException)

---

## 2. 예외 처리 문법

### 2.1 try-catch-finally
\`\`\`java
try {
    // 위험한 코드
} catch (Exception e) {
    // 예외 처리
} finally {
    // 항상 실행 (자원 해제 등)
}
\`\`\`

### 2.2 try-with-resources (Java 7+)
\`\`\`java
try (FileReader fr = new FileReader("file.txt")) {
    // 자동으로 fr.close() 호출됨
} catch (IOException e) { ... }
\`\`\`

---

## 3. throws와 throw

- **throw**: 예외를 직접 **발생**시킴 (\`throw new Exception();\`)
- **throws**: 예외를 호출자에게 **전달** (\`void method() throws IOException\`)

---

## 4. 사용자 정의 예외
\`\`\`java
class MyException extends RuntimeException {
    public MyException(String msg) { super(msg); }
}
\`\`\`
`,
    codeExamples: [
        {
            title: "예외 처리 기초",
            language: "java",
            code: `public class Main {
    public static void main(String[] args) {
        try {
            int res = 10 / 0;
        } catch (ArithmeticException e) {
            System.out.println("0으로 나눌 수 없음: " + e.getMessage());
        } finally {
            System.out.println("무조건 실행");
        }
    }
}`
        }
    ],
    keyPoints: [
        "비정상 종료를 막기 위해 예외 처리가 필요합니다.",
        "체크 예외는 처리가 필수이며, 언체크 예외는 개발자의 실수로 발생하는 경우가 많습니다.",
        "try-with-resources를 사용하면 리소스 관리가 편해집니다."
    ],
    interviewQuestions: [
        {
            difficulty: 'Medium',
            question: "Checked와 Unchecked 예외의 차이는?",
            answer: "Checked는 컴파일 타임에 체크되어 반드시 처리가 필요하고, Unchecked는 런타임에 발생하며 처리가 선택적입니다."
        }
    ]
};
