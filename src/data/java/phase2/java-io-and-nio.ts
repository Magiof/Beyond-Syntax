import type { Module } from '../../curriculumData';

export const javaIoAndNio: Module = {
    id: "java-io-and-nio",
    title: "Chapter 4: 입출력의 진화 - IO와 NIO",
    topic: "Stream, Reader/Writer, Path/Files, Serialization",
    content: `
## 1. 데이터 입출력: 통로(Stream) 연결하기

파일을 읽거나 네트워크로 채팅을 보낼 때, 자바는 **'스트림(Stream)'**이라는 일방통행 빨대를 꽂습니다.

- **InputStream/OutputStream**: 이미지, 음악 같은 바이트(0, 1) 데이터를 다룰 때.
- **Reader/Writer**: 텍스트, 문서 같이 글자 데이터를 다룰 때.

---

## 2. 현대적인 파일 관리: Files와 Path (Java 7+)

옛날 방식의 \`File\` 클래스는 기능이 빈약했습니다. 이제는 더 세련된 도구를 씁니다.

### 핵심 API (What/How/When)
- **Path**
  - **What**: 파일이 어디 있는지 표시하는 '주소록'입니다.
  - **How**: \`Path path = Paths.get("data.txt");\`
- **Files.readAllLines(path)**
  - **What**: 한 번에 텍스트 파일 전체를 읽어 리스트로 만듭니다.
  - **When**: 설정 파일이나 작은 문서를 빠르게 읽고 싶을 때 최고입니다.
- **Files.write(path, bytes)**
  - **What**: 파일에 데이터를 씁니다.
  - **When**: 로그를 기록하거나 데이터를 저장할 때 씁니다.

---

## 3. 메모리 낭비 없는 대량 읽기: BufferedReader

파일이 엄청나게 크면(1GB 등) 한꺼번에 읽다가 서버가 터질 수 있습니다. 이때는 한 줄씩 조심스럽게 읽어야 합니다.

\`\`\`java
try (BufferedReader reader = Files.newBufferedReader(path)) {
    String line;
    while ((line = reader.readLine()) != null) {
        // 한 줄씩 처리 (메모리 안전!)
        System.out.println(line);
    }
}
\`\`\`

---

## 4. 객체 통째로 보내기: 직렬화(Serialization)

> [!NOTE]
> **심화 학습**: 메모리에 있는 자바 객체를 "이름:홍길동, 나이:25" 같은 바이트 뭉치로 만들어 파일에 저장하거나 네트워크로 보내는 기술입니다. 나중에 '레디스(Redis)' 같은 캐시 시스템을 배울 때 다시 만날 중요한 개념입니다.
`,
    codeExamples: [
        {
            title: "한 줄로 파일 읽고 쓰기",
            language: "java",
            code: `import java.nio.file.*;
import java.util.List;

public class FileMaster {
    public static void main(String[] args) throws Exception {
        Path p = Paths.get("hello.txt");
        
        // 1. 쓰기
        Files.writeString(p, "반가워 자바!"); 
        
        // 2. 읽기
        String content = Files.readString(p);
        System.out.println("파일 내용: " + content);
        
        // 3. 존재 확인
        if (Files.exists(p)) {
            System.out.println("파일이 잘 존재합니다.");
        }
    }
}`
        }
    ],
    keyPoints: [
        "IO는 빨대(Stream)이고, NIO는 양동이(Buffer)와 통로(Channel) 시스템입니다.",
        "파일 조작 시에는 구식 File 클래스보다 현대적인 Files와 Path를 우선 사용하세요.",
        "큰 대용량 파일을 다룰 때는 반드시 Buffer 계열 도구를 사용하여 메모리를 아끼세요."
    ],
    interviewQuestions: [
        {
            difficulty: 'Medium',
            question: "왜 직렬화할 때 serialVersionUID를 직접 적어주는 것이 좋은가요?",
            answer: "객체를 저장한 뒤 나중에 클래스 내용을 조금이라도 수정하면(예: 필드 추가), 자바는 다른 클래스로 오해하고 읽기를 거부합니다. 이때 버전 번호가 같으면 '같은 종류니까 무시하고 읽어!'라고 자바를 안심시킬 수 있어 버전 호환성에 유리합니다."
        }
    ]
};
