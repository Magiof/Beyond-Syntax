import type { Module } from '../../curriculumData';

export const arrays: Module = {
    id: "arrays",
    title: "Chapter 6: 배열",
    topic: "1차원 배열, 다차원 배열, 배열 복사, Arrays 유틸리티",
    content: `
## 1. 배열(Array)이란?

**배열**은 **같은 타입**의 데이터를 **연속된 메모리 공간**에 저장하는 자료구조입니다.

### 핵심 특징
- **고정 크기**: 한 번 생성하면 크기 변경 불가
- **0부터 시작하는 인덱스**: 첫 번째 요소는 index 0
- **빠른 접근**: 인덱스로 O(1) 시간에 접근 가능

---

## 2. 배열 선언과 생성

### 2.1 선언 방법

\`\`\`java
// 방법 1 (권장)
int[] numbers;

// 방법 2 (C 스타일, 권장하지 않음)
int numbers[];
\`\`\`

### 2.2 생성 (메모리 할당)

\`\`\`java
int[] numbers = new int[5];  // 크기 5인 int 배열 생성
// 기본값으로 초기화됨: [0, 0, 0, 0, 0]
\`\`\`

### 2.3 선언과 초기화 동시에

\`\`\`java
// 방법 1: new 키워드와 함께
int[] scores = new int[] {90, 85, 77, 92, 88};

// 방법 2: 간단한 방법 (변수 선언과 동시에만 가능)
int[] scores = {90, 85, 77, 92, 88};
\`\`\`

---

## 3. 배열 접근과 수정

### 3.1 요소 접근

\`\`\`java
int[] arr = {10, 20, 30, 40, 50};

System.out.println(arr[0]);  // 10 (첫 번째 요소)
System.out.println(arr[4]);  // 50 (마지막 요소)
System.out.println(arr[5]);  // ArrayIndexOutOfBoundsException!
\`\`\`

### 3.2 요소 수정

\`\`\`java
arr[2] = 300;  // 30 → 300으로 변경
System.out.println(arr[2]);  // 300
\`\`\`

### 3.3 배열 길이

\`\`\`java
int length = arr.length;  // 5 (length는 속성, 메서드 아님!)
\`\`\`

---

## 4. 배열 순회

\`\`\`java
int[] numbers = {1, 2, 3, 4, 5};

// 방법 1: 일반 for문
for (int i = 0; i < numbers.length; i++) {
    System.out.println("인덱스 " + i + ": " + numbers[i]);
}

// 방법 2: Enhanced for (인덱스 필요 없을 때)
for (int num : numbers) {
    System.out.println(num);
}
\`\`\`

---

## 5. 다차원 배열

### 5.1 2차원 배열

\`\`\`java
// 3행 4열 배열 생성
int[][] matrix = new int[3][4];

// 초기화와 동시에 생성
int[][] matrix = {
    {1, 2, 3, 4},
    {5, 6, 7, 8},
    {9, 10, 11, 12}
};

// 접근
System.out.println(matrix[1][2]);  // 7 (2행 3열)
\`\`\`

### 5.2 가변 배열 (Jagged Array)

각 행마다 열의 개수가 다를 수 있습니다.

\`\`\`java
int[][] jagged = new int[3][];
jagged[0] = new int[2];  // 첫 번째 행: 2열
jagged[1] = new int[4];  // 두 번째 행: 4열
jagged[2] = new int[3];  // 세 번째 행: 3열
\`\`\`

### 5.3 2차원 배열 순회

\`\`\`java
int[][] matrix = {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}};

for (int i = 0; i < matrix.length; i++) {
    for (int j = 0; j < matrix[i].length; j++) {
        System.out.print(matrix[i][j] + " ");
    }
    System.out.println();
}
\`\`\`

---

## 6. 배열 복사

### 6.1 얕은 복사 (Shallow Copy)

\`\`\`java
int[] original = {1, 2, 3};
int[] copy = original;  // 같은 배열을 참조!

copy[0] = 100;
System.out.println(original[0]);  // 100 (원본도 변경됨!)
\`\`\`

### 6.2 깊은 복사 (Deep Copy)

\`\`\`java
// 방법 1: for문
int[] original = {1, 2, 3};
int[] copy = new int[original.length];
for (int i = 0; i < original.length; i++) {
    copy[i] = original[i];
}

// 방법 2: Arrays.copyOf (권장)
int[] copy = Arrays.copyOf(original, original.length);

// 방법 3: System.arraycopy
int[] copy = new int[original.length];
System.arraycopy(original, 0, copy, 0, original.length);

// 방법 4: clone()
int[] copy = original.clone();
\`\`\`

---

## 7. Arrays 유틸리티 클래스

\`java.util.Arrays\` 클래스는 배열 관련 유용한 메서드를 제공합니다.

\`\`\`java
import java.util.Arrays;

int[] arr = {3, 1, 4, 1, 5, 9, 2, 6};

// 배열 출력
System.out.println(Arrays.toString(arr));  // [3, 1, 4, 1, 5, 9, 2, 6]

// 정렬
Arrays.sort(arr);
System.out.println(Arrays.toString(arr));  // [1, 1, 2, 3, 4, 5, 6, 9]

// 이진 검색 (정렬된 배열에서만 사용)
int index = Arrays.binarySearch(arr, 5);  // 5가 있는 인덱스 반환

// 배열 채우기
int[] fillArr = new int[5];
Arrays.fill(fillArr, 7);  // [7, 7, 7, 7, 7]

// 배열 비교
int[] arr1 = {1, 2, 3};
int[] arr2 = {1, 2, 3};
System.out.println(Arrays.equals(arr1, arr2));  // true
\`\`\`
`,
    codeExamples: [
        {
            title: "배열 기본 사용법",
            language: "java",
            code: `public class ArrayBasics {
    public static void main(String[] args) {
        // 1. 배열 생성과 초기화
        int[] scores = {85, 90, 77, 92, 88};
        
        // 2. 배열 순회 및 합계/평균
        int sum = 0;
        for (int score : scores) {
            sum += score;
        }
        double average = (double) sum / scores.length;
        System.out.println("합계: " + sum);
        System.out.println("평균: " + average);
        
        // 3. 최댓값/최솟값 찾기
        int max = scores[0];
        int min = scores[0];
        for (int i = 1; i < scores.length; i++) {
            if (scores[i] > max) max = scores[i];
            if (scores[i] < min) min = scores[i];
        }
        System.out.println("최고점: " + max);
        System.out.println("최저점: " + min);
    }
}`
        },
        {
            title: "2차원 배열과 Arrays 활용",
            language: "java",
            code: `import java.util.Arrays;

public class Array2DDemo {
    public static void main(String[] args) {
        // 2차원 배열: 3명의 학생, 각각 4과목 점수
        int[][] scores = {
            {85, 90, 77, 92},  // 학생 1
            {88, 75, 95, 80},  // 학생 2
            {90, 85, 88, 92}   // 학생 3
        };
        
        // 각 학생의 평균 점수 계산
        for (int i = 0; i < scores.length; i++) {
            int sum = 0;
            for (int j = 0; j < scores[i].length; j++) {
                sum += scores[i][j];
            }
            double avg = (double) sum / scores[i].length;
            System.out.println("학생 " + (i + 1) + " 평균: " + avg);
        }
        
        // Arrays 유틸리티 사용
        int[] numbers = {5, 2, 8, 1, 9};
        System.out.println("원본: " + Arrays.toString(numbers));
        
        Arrays.sort(numbers);
        System.out.println("정렬: " + Arrays.toString(numbers));
        
        int[] copy = Arrays.copyOf(numbers, numbers.length);
        System.out.println("복사: " + Arrays.toString(copy));
    }
}`
        }
    ],
    keyPoints: [
        "배열은 같은 타입의 데이터를 연속된 메모리에 저장하며, 크기는 생성 시 고정됩니다.",
        "배열 인덱스는 0부터 시작하며, 범위를 벗어나면 ArrayIndexOutOfBoundsException이 발생합니다.",
        "배열 참조를 복사하면 같은 배열을 공유합니다. 독립적인 복사본은 Arrays.copyOf() 등을 사용하세요.",
        "2차원 배열은 '배열의 배열'이며, 각 행의 길이가 다를 수 있습니다 (가변 배열).",
        "Arrays 클래스는 정렬(sort), 검색(binarySearch), 비교(equals), 출력(toString) 등을 제공합니다."
    ],
    interviewQuestions: [
        {
            difficulty: 'Easy',
            question: "배열의 가장 큰 단점은 무엇인가요?",
            answer: "생성 시 크기가 고정되어 변경할 수 없다는 점입니다. 데이터 추가/삭제가 불가능하고, 크기를 넘어가면 예외가 발생합니다."
        },
        {
            difficulty: 'Medium',
            question: "배열 복사 시 Shallow Copy와 Deep Copy의 차이는?",
            answer: "Shallow Copy는 주소값만 복사하여 원본과 같은 객체를 공유하지만, Deep Copy는 실제 데이터(객체)를 새로운 메모리에 복제하여 원본과 독립적입니다."
        }
    ]
};
