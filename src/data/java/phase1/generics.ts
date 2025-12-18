import type { Module } from '../../curriculumData';

export const generics: Module = {
    id: "generics",
    title: "Chapter 16: 제네릭 (Generics)",
    topic: "타입 안전성, 타입 파라미터 <T>, 와일드카드",
    content: `
## 1. 제네릭이란?
클래스나 메서드 내부에서 사용할 타입을 외부에서 지정하는 기법입니다.

### 장점
1. **타입 안전성**: 잘못된 타입 사용을 컴파일 시 방지
2. **형변환 생략**: 코드가 간결해짐

---

## 2. 사용법
\`\`\`java
class Box<T> {
    private T item;
    public void set(T item) { this.item = item; }
    public T get() { return item; }
}
\`\`\`

---

## 3. 와일드카드
- \`<? extends T>\`: T와 그 자식들 (읽기 전용)
- \`<? super T>\`: T와 그 부모들 (쓰기 전용)
`,
    codeExamples: [
        {
            title: "제네릭 메서드",
            language: "java",
            code: `public <T> void print(T item) {
    System.out.println(item);
}`
        }
    ],
    keyPoints: [
        "제네릭은 런타임 형변환 에러를 컴파일 에러로 바꿔줍니다.",
        "타입 소거에 의해 런타임에는 타입 정보가 사라집니다."
    ],
    interviewQuestions: [
        {
            difficulty: 'Medium',
            question: "제네릭을 사용하는 이유는?",
            answer: "타입 안정성을 확보하고, 불필요한 형변환 코드를 제거하여 가독성과 유지보수성을 높이기 위함입니다."
        }
    ]
};
