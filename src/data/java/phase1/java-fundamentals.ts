import type { Module } from '../../curriculumData';

export const javaFundamentals: Module = {
    id: "java-fundamentals",
    title: "Chapter 1: 자바 탄생의 철학과 구동 원리",
    topic: "Why Java?, JVM, 변수와 타입, 제어문의 본질",
    content: `
## 1. Why Java? 실용주의 언어의 정수

> [!IMPORTANT]
> **입문자 필수 (Beginner Essential)**: 자바는 매우 안전하고 튼튼한 언어입니다. 한 번 배우면 웹, 앱, 서버 등 어디서든 쓸 수 있습니다.

자바는 1995년 "Write Once, Run Anywhere (WORA)"라는 슬로건과 함께 등장했습니다. 단순히 새로운 언어를 만드는 것이 아니라, 하드웨어 독립적인 소프트웨어 실행 환경을 구축하는 것이 목표였습니다.

### 자바의 핵심 철학
- **객체지향(OOP)**: 현실 세계를 모델링하며 복잡한 문제를 해결합니다.
- **안전성(Security)**: 포인터(C언어 등)를 직접 다루지 않게 하여 실수를 줄이고, 가비지 컬렉터가 메모리를 대신 치워줍니다.

---

## 2. JVM과 자바의 구동 원리

> [!NOTE]
> **심화 학습 (Deep Dive)**: 당장 코딩하는 데 몰라도 되지만, 나중에 '고수'가 되기 위해 꼭 알아야 할 내용입니다.

자바 코드는 곧바로 기계어가 되지 않습니다.

1. **Source Code (.java)**: 우리가 작성한 소설 같은 코드.
2. **Compiler (javac)**: 소스 코드를 컴퓨터가 읽기 편한 **Bytecode (.class)**라는 암호로 변환합니다.
3. **JVM (java)**: 이 암호를 읽어 실제 운영체제(Windows, Mac)가 이해하는 언어로 즉석에서 통역해 줍니다. 

---

## 3. 변수와 타입 마스터하기 (What/How/When)

자바는 매우 깐깐한 언어라 상자에 무엇을 담을지 미리 말해줘야 합니다.

### (1) 숫자 상자: 인트(int)와 롱(long)
- **What**: 숫자를 담습니다.
- **How**: \`int score = 100;\`, \`long population = 8000000000L;\` (long은 뒤에 L을 붙여요!)
- **When**: 21억 이하의 숫자는 \`int\`, 그보다 큰 숫자나 돈 계산 등에는 \`long\`을 씁니다.

### (2) 글자 상자: 스트링(String)
- **What**: 문장의 나열을 담습니다.
- **How**: \`String msg = "Hello";\`
- **When**: 이름, 주소, 설명 등 텍스트가 필요할 때 씁니다.

### (3) 진위 상자: 불리언(boolean)
- **What**: 맞다(true) / 틀리다(false)만 담습니다.
- **How**: \`boolean isMember = true;\`
- **When**: "로그인했는가?", "성인인가?" 같은 예/아니오 조건에 씁니다.

---

## 4. 제어문: 프로그램의 '지능'

### if vs switch: 어떤 상황에 쓸까요?
- **if**: "내 나이가 20살 이상이면 성인, 아니면 미성년자" 처럼 '**범위**' 나 복잡한 조건을 따질 때 씁니다.
- **switch**: "1번 누르면 한글, 2번 누르면 영어" 처럼 '**딱 떨어지는 값**' 에 따라 동작을 나눌 때 훨씬 깔끔합니다.
`,
    codeExamples: [
        {
            title: "조건문 실제 활용 예시",
            language: "java",
            code: `public class LogicControl {
    public static void main(String[] args) {
        int age = 18;
        
        // 1. 범위 조건 (if)
        if (age >= 19) {
            System.out.println("성인입니다.");
        } else {
            System.out.println("조금 더 기다리세요!");
        }
        
        // 2. 고정 값 조건 (switch) 
        // Java 14+ 최신 문법
        String rank = "Gold";
        int discount = switch(rank) {
            case "Gold" -> 20;
            case "Silver" -> 10;
            default -> 0;
        };
        System.out.println("할인율: " + discount + "%");
    }
}`
        }
    ],
    keyPoints: [
        "변수 타입(int, String 등)은 데이터의 성격에 맞게 선택해야 메모리를 아끼고 에러를 막습니다.",
        "JVM은 통역사 역할을 하여 자바 앱이 어디서든 돌아가게 해줍니다.",
        "switch-case는 고정된 선택지가 많을 때 if-else보다 보기가 훨씬 편합니다."
    ],
    interviewQuestions: [
        {
            difficulty: 'Medium',
            question: "왜 20억이 넘는 숫자를 int에 담으면 수치가 이상하게 나오나요?",
            answer: "int는 32비트 공간만 사용하므로 표현할 수 있는 최대 범위가 약 21억입니다. 이 범위를 넘어가면 '오버플로우' 현상이 발생해 숫자가 음수로 바뀌거나 전혀 다른 값으로 변합니다. 이럴 때는 더 넓은 64비트 공간을 쓰는 long 타입을 사용해야 합니다."
        }
    ]
};
