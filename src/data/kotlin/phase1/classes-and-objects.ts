import type { Module } from '../../curriculumData';

export const classesAndObjects: Module = {
    id: "classes-and-objects",
    title: "Chapter 6: 클래스와 객체",
    topic: "생성자, 프로퍼티, data class, object, companion object",
    content: `
## 1. 클래스 정의
주 생성자는 클래스 헤더에 선언하며, 프로퍼티를 바로 정의할 수 있습니다.

## 2. 프로퍼티
getter와 setter를 자동으로 생성하며, 커스텀 구현도 가능합니다.

## 3. data class
데이터 저장에 최적화된 클래스로, equals, hashCode, toString, copy 등을 자동 생성합니다.

## 4. object & companion object
- **object**: 싱글톤 객체 생성
- **companion object**: 클래스 내 정적 멤버 정의
`,
    codeExamples: [
        {
            title: "data class 활용",
            language: "kotlin",
            code: `data class User(val name: String, val age: Int)
val user = User("홍길동", 25)
println(user.copy(age = 26))`
        }
    ],
    keyPoints: [
        "data class는 보일러플레이트 코드를 획기적으로 줄여줍니다.",
        "companion object는 Java의 static 키워드를 대체합니다."
    ],
    interviewQuestions: [
        {
            difficulty: 'Easy',
            question: "data class의 주요 기능은?",
            answer: "데이터를 다루는 데 필요한 핵심 메서드들을 컴파일러가 자동으로 생성해줍니다."
        }
    ]
};
