import type { Module } from '../../curriculumData';

export const loops: Module = {
    id: "loops",
    title: "Chapter 5: 반복문",
    topic: "for, while, do-while, enhanced for, break/continue, 중첩 반복문",
    content: `
## 1. 반복문이란?

**반복문**은 특정 코드 블록을 **조건이 만족하는 동안 반복** 실행하는 제어 구조입니다.

---

## 2. for 문

가장 많이 사용되는 반복문입니다. 반복 횟수가 **정해져 있을 때** 적합합니다.

### 2.1 기본 문법

\`\`\`java
for (초기화; 조건식; 증감식) {
    // 반복할 코드
}
\`\`\`

\`\`\`java
// 1부터 5까지 출력
for (int i = 1; i <= 5; i++) {
    System.out.println(i);
}
// 출력: 1, 2, 3, 4, 5
\`\`\`

### 2.2 실행 순서

1. **초기화** (한 번만 실행)
2. **조건 검사** (false면 종료)
3. **코드 블록 실행**
4. **증감식 실행**
5. 2번으로 돌아감

### 2.3 다양한 예시

\`\`\`java
// 역순 출력
for (int i = 10; i >= 1; i--) {
    System.out.println(i);
}

// 2씩 증가
for (int i = 0; i <= 10; i += 2) {
    System.out.println(i);  // 0, 2, 4, 6, 8, 10
}

// 무한 루프 (조건 생략)
for (;;) {
    // 영원히 실행 (break로 탈출 필요)
}
\`\`\`

---

## 3. while 문

조건이 true인 동안 반복합니다. 반복 횟수가 **정해지지 않았을 때** 적합합니다.

\`\`\`java
while (조건식) {
    // 조건이 true인 동안 반복
}
\`\`\`

\`\`\`java
int count = 0;
while (count < 5) {
    System.out.println("Count: " + count);
    count++;
}
\`\`\`

---

## 4. do-while 문

**최소 1번은 반드시 실행**됩니다. 조건 검사가 코드 실행 후에 이루어집니다.

\`\`\`java
do {
    // 최소 1번 실행
} while (조건식);
\`\`\`

\`\`\`java
int num = 10;
do {
    System.out.println(num);  // 10 출력
    num++;
} while (num < 5);  // 조건 false지만 이미 1번 실행됨
\`\`\`

### while vs do-while

\`\`\`java
int x = 10;

// while: 한 번도 실행 안 됨
while (x < 5) {
    System.out.println("while: " + x);
}

// do-while: 1번 실행됨
do {
    System.out.println("do-while: " + x);  // 출력됨!
} while (x < 5);
\`\`\`

---

## 5. Enhanced for 문 (for-each)

배열이나 컬렉션을 순회할 때 가장 간결한 방법입니다.

\`\`\`java
for (타입 변수명 : 배열/컬렉션) {
    // 각 요소에 대해 실행
}
\`\`\`

\`\`\`java
int[] numbers = {10, 20, 30, 40, 50};

for (int num : numbers) {
    System.out.println(num);
}
// 출력: 10, 20, 30, 40, 50
\`\`\`

### 주의사항

\`\`\`java
// Enhanced for에서는 인덱스 접근 불가
// 인덱스가 필요하면 일반 for 사용
for (int i = 0; i < numbers.length; i++) {
    System.out.println("인덱스 " + i + ": " + numbers[i]);
}
\`\`\`

---

## 6. break와 continue

### 6.1 break

반복문을 **즉시 종료**합니다.

\`\`\`java
for (int i = 1; i <= 10; i++) {
    if (i == 5) {
        break;  // 5에서 반복 종료
    }
    System.out.println(i);
}
// 출력: 1, 2, 3, 4
\`\`\`

### 6.2 continue

현재 반복을 **건너뛰고** 다음 반복으로 넘어갑니다.

\`\`\`java
for (int i = 1; i <= 5; i++) {
    if (i == 3) {
        continue;  // 3은 건너뜀
    }
    System.out.println(i);
}
// 출력: 1, 2, 4, 5
\`\`\`

### 6.3 레이블(Label)을 이용한 중첩 루프 탈출

\`\`\`java
outer:  // 레이블 정의
for (int i = 0; i < 3; i++) {
    for (int j = 0; j < 3; j++) {
        if (i == 1 && j == 1) {
            break outer;  // 바깥 루프까지 탈출
        }
        System.out.println(i + ", " + j);
    }
}
// (1, 1)에서 전체 루프 종료
\`\`\`

---

## 7. 중첩 반복문

\`\`\`java
// 구구단 2~9단
for (int dan = 2; dan <= 9; dan++) {
    System.out.println("--- " + dan + "단 ---");
    for (int i = 1; i <= 9; i++) {
        System.out.println(dan + " x " + i + " = " + (dan * i));
    }
}
\`\`\`
`,
    codeExamples: [
        {
            title: "다양한 for 문 활용",
            language: "java",
            code: `public class ForLoopDemo {
    public static void main(String[] args) {
        // 1. 기본 for문: 1부터 10까지 합계
        int sum = 0;
        for (int i = 1; i <= 10; i++) {
            sum += i;
        }
        System.out.println("1~10 합계: " + sum);  // 55
        
        // 2. 역순 카운트다운
        System.out.print("발사 카운트다운: ");
        for (int i = 5; i >= 1; i--) {
            System.out.print(i + " ");
        }
        System.out.println("발사!");
        
        // 3. Enhanced for (배열 순회)
        String[] fruits = {"사과", "바나나", "오렌지"};
        for (String fruit : fruits) {
            System.out.println("과일: " + fruit);
        }
    }
}`
        },
        {
            title: "별 찍기 (중첩 반복문)",
            language: "java",
            code: `public class StarPattern {
    public static void main(String[] args) {
        int n = 5;
        
        // 1. 직각삼각형
        // *
        // **
        // ***
        // ****
        // *****
        System.out.println("=== 직각삼각형 ===");
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= i; j++) {
                System.out.print("*");
            }
            System.out.println();
        }
        
        // 2. 역삼각형
        // *****
        // ****
        // ***
        // **
        // *
        System.out.println("=== 역삼각형 ===");
        for (int i = n; i >= 1; i--) {
            for (int j = 1; j <= i; j++) {
                System.out.print("*");
            }
            System.out.println();
        }
    }
}`
        }
    ],
    keyPoints: [
        "for 문은 반복 횟수가 정해져 있을 때, while 문은 조건 기반 반복에 적합합니다.",
        "do-while은 조건과 관계없이 최소 1번은 실행됩니다.",
        "Enhanced for(for-each)는 배열/컬렉션 순회에 가장 간결하지만 인덱스 접근이 불가합니다.",
        "break는 반복문을 즉시 종료하고, continue는 현재 반복만 건너뜁니다.",
        "중첩 반복문에서 바깥 루프를 탈출하려면 레이블(label)과 함께 break를 사용합니다."
    ],
    interviewQuestions: [
        {
            difficulty: 'Easy',
            question: "for 문과 while 문은 각각 언제 사용하는 것이 좋은가요?",
            answer: "반복 횟수가 명확할 때는 for 문, 특정 조건이 만족될 때까지 반복해야 할 때는 while 문이 적합합니다."
        },
        {
            difficulty: 'Easy',
            question: "break와 continue의 차이점은?",
            answer: "break는 반복문을 완전히 종료하고 탈출하지만, continue는 현재 반복만 건너뛰고 다음 반복 조건 검사로 넘어갑니다."
        }
    ]
};
