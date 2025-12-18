import type { Module } from '../../curriculumData';

export const controlFlow: Module = {
    id: "control-flow",
    title: "Chapter 4: 조건문",
    topic: "if-else, switch-case, switch expression (Java 14+)",
    content: `
## 1. 조건문이란?

**조건문**은 주어진 조건에 따라 **다른 코드를 실행**하게 하는 제어 구조입니다.

---

## 2. if 문

### 2.1 기본 if 문

\`\`\`java
if (조건식) {
    // 조건이 true일 때 실행되는 코드
}
\`\`\`

\`\`\`java
int score = 85;
if (score >= 60) {
    System.out.println("합격입니다!");
}
\`\`\`

### 2.2 if-else 문

\`\`\`java
if (조건식) {
    // true일 때
} else {
    // false일 때
}
\`\`\`

\`\`\`java
int age = 15;
if (age >= 18) {
    System.out.println("성인입니다.");
} else {
    System.out.println("미성년자입니다.");
}
\`\`\`

### 2.3 if-else if-else 문

여러 조건을 순차적으로 검사합니다.

\`\`\`java
int score = 85;

if (score >= 90) {
    System.out.println("A학점");
} else if (score >= 80) {
    System.out.println("B학점");
} else if (score >= 70) {
    System.out.println("C학점");
} else if (score >= 60) {
    System.out.println("D학점");
} else {
    System.out.println("F학점");
}
// 출력: B학점
\`\`\`

### 2.4 중첩 if 문

\`\`\`java
int age = 25;
boolean hasLicense = true;

if (age >= 18) {
    if (hasLicense) {
        System.out.println("운전 가능합니다.");
    } else {
        System.out.println("면허가 필요합니다.");
    }
} else {
    System.out.println("나이가 부족합니다.");
}
\`\`\`

---

## 3. switch 문

하나의 변수를 여러 값과 비교할 때 유용합니다.

### 3.1 기본 switch 문

\`\`\`java
int day = 3;
String dayName;

switch (day) {
    case 1:
        dayName = "월요일";
        break;
    case 2:
        dayName = "화요일";
        break;
    case 3:
        dayName = "수요일";
        break;
    case 4:
        dayName = "목요일";
        break;
    case 5:
        dayName = "금요일";
        break;
    case 6:
    case 7:
        dayName = "주말";
        break;
    default:
        dayName = "잘못된 입력";
}
System.out.println(dayName);  // 수요일
\`\`\`

### 3.2 break의 중요성

\`break\`가 없으면 다음 case도 실행됩니다 (fall-through).

\`\`\`java
int num = 1;
switch (num) {
    case 1:
        System.out.println("One");
        // break 없음!
    case 2:
        System.out.println("Two");
        break;
    case 3:
        System.out.println("Three");
}
// 출력: One
//       Two
\`\`\`

### 3.3 switch에서 사용 가능한 타입

- \`byte\`, \`short\`, \`int\`, \`char\`
- \`String\` (Java 7+)
- \`enum\`
- **불가**: \`long\`, \`float\`, \`double\`, \`boolean\`

---

## 4. switch 표현식 (Java 14+)

더 간결하고 안전한 새로운 switch 문법입니다.

### 4.1 화살표(->) 문법

\`\`\`java
int day = 3;
String dayName = switch (day) {
    case 1 -> "월요일";
    case 2 -> "화요일";
    case 3 -> "수요일";
    case 4 -> "목요일";
    case 5 -> "금요일";
    case 6, 7 -> "주말";
    default -> "잘못된 입력";
};
System.out.println(dayName);  // 수요일
\`\`\`

### 4.2 yield 키워드

블록 내에서 값을 반환할 때 사용합니다.

\`\`\`java
int month = 2;
int days = switch (month) {
    case 1, 3, 5, 7, 8, 10, 12 -> 31;
    case 4, 6, 9, 11 -> 30;
    case 2 -> {
        System.out.println("2월은 특별합니다.");
        yield 28;  // 블록 안에서 값 반환
    }
    default -> throw new IllegalArgumentException("잘못된 월: " + month);
};
System.out.println(month + "월은 " + days + "일");
\`\`\`

### 4.3 장점

1. **break 불필요**: fall-through 방지
2. **간결함**: 한 줄로 표현 가능
3. **표현식**: 값 반환 가능
4. **완전성 검사**: 모든 케이스를 다루지 않으면 컴파일 에러
`,
    codeExamples: [
        {
            title: "if-else if-else 학점 계산",
            language: "java",
            code: `public class GradeCalculator {
    public static void main(String[] args) {
        int score = 87;
        char grade;
        String message;
        
        if (score >= 90) {
            grade = 'A';
            message = "우수합니다!";
        } else if (score >= 80) {
            grade = 'B';
            message = "좋습니다.";
        } else if (score >= 70) {
            grade = 'C';
            message = "보통입니다.";
        } else if (score >= 60) {
            grade = 'D';
            message = "노력이 필요합니다.";
        } else {
            grade = 'F';
            message = "재수강 대상입니다.";
        }
        
        System.out.println("점수: " + score);
        System.out.println("학점: " + grade);
        System.out.println(message);
    }
}`
        },
        {
            title: "switch 표현식 (Java 14+)",
            language: "java",
            code: `public class SwitchExpressionDemo {
    public static void main(String[] args) {
        String day = "수";
        
        // 화살표 문법 switch 표현식
        String dayType = switch (day) {
            case "월", "화", "수", "목", "금" -> "평일";
            case "토", "일" -> "주말";
            default -> "잘못된 입력";
        };
        
        // 블록과 yield 사용
        int dayNumber = switch (day) {
            case "월" -> 1;
            case "화" -> 2;
            case "수" -> {
                System.out.println("주 중간입니다!");
                yield 3;  // 블록 안에서 값 반환
            }
            case "목" -> 4;
            case "금" -> 5;
            case "토" -> 6;
            case "일" -> 7;
            default -> -1;
        };
        
        System.out.println(day + "요일은 " + dayType);
        System.out.println("일주일 중 " + dayNumber + "번째 날");
    }
}`
        }
    ],
    keyPoints: [
        "if 문은 조건이 true일 때만 해당 블록을 실행합니다.",
        "else if를 사용하면 여러 조건을 순차적으로 검사할 수 있습니다.",
        "switch 문에서 break를 빠뜨리면 다음 case로 넘어갑니다 (fall-through).",
        "Java 14+의 switch 표현식은 -> 문법으로 더 간결하고 안전합니다.",
        "switch 표현식에서 블록을 사용할 때는 yield로 값을 반환합니다."
    ],
    interviewQuestions: [
        {
            difficulty: 'Easy',
            question: "switch 문에서 break를 생략하면 어떤 일이 발생하나요?",
            answer: "Fall-through 현상이 발생하여, 다음 case문의 코드까지 연속적으로 실행됩니다."
        },
        {
            difficulty: 'Medium',
            question: "Java 14의 switch 표현식(Expression)이 기존 switch 문과 다른 점은?",
            answer: "값을 반환할 수 있고, -> 화살표 문법을 사용하여 break 없이도 fall-through를 방지하며 더 간결합니다."
        }
    ]
};
