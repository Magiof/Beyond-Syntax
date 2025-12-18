import type { Module } from '../../curriculumData';

export const javaQuickStart: Module = {
    id: "java-quick-start",
    title: "Chapter 0: 자바와 함께 떠나는 편의점 관리 시스템 만들기",
    topic: "실전 시나리오, 변수, 조건문, 출력",
    content: `
## 1. 우리의 목표: '자바 편의점' 운영하기

여러분은 오늘부터 편의점 사장님이 되었습니다. 복잡한 이론은 잠시 잊으셔도 좋습니다. 우리가 가장 먼저 할 일은 '**손님에게 인사를 하고, 물건 가격을 계산하는 것**' 입니다.

---

## 2. 손님 맞이하기 (출력과 변수)

편의점에 손님이 들어왔습니다. 이름을 물어보고 환영 인사를 건네볼까요?

> [!TIP]
> **변수(Variable)**는 정보를 담아두는 '상자'라고 생각하세요. 상자마다 이름표를 붙여두면 나중에 꺼내 쓰기 편합니다.

\`\`\`java
public class ConvenienceStore {
    public static void main(String[] args) {
        // '손님 이름'이라는 상자에 "홍길동"을 넣습니다.
        String customerName = "홍길동"; 
        
        // 화면에 인사를 찍어줍니다.
        System.out.println(customerName + " 손님, 어서오세요! 자바 편의점입니다.");
    }
}
\`\`\`

- **String**: 글자(문자열)를 담는 상자 타입입니다.
- **System.out.println(...)**: 일종의 '확성기'입니다. 상자 안의 내용을 세상에 알릴 때 사용하죠.

---

## 3. 가격 계산하기 (정수와 실수)

손님이 삼각김밥 1,200원짜리를 골랐습니다. 여기에 10% 할인을 적용해 볼까요?

\`\`\`java
int price = 1200;           // 정수(꽉 찬 숫자) 상자
double discount = 0.9;      // 실수(소수점이 있는 숫자) 상자

// 계산된 최종 가격
double finalPrice = price * discount;

System.out.println("원래 가격: " + price + "원");
System.out.println("10% 할인된 가격: " + (int)finalPrice + "원"); // (int)를 붙여 소수점을 버립니다.
\`\`\`

- **int**: 삼각김밥 가격처럼 딱 떨어지는 숫자에 씁니다.
- **double**: 할인율이나 시력처럼 소수점이 필요한 정밀한 숫자에 씁니다.

---

## 4. 미션: 직접 사장님이 되어 보세요!
사과(500원) 5개와 바나나(1,000원) 2개를 샀을 때, 총금액이 얼마인지 계산하는 프로그램을 만들어 보세요. 
직접 코드를 짜보며 '자바'라는 직원이 어떻게 일하는지 느껴보는 것이 중요합니다.
`,
    codeExamples: [
        {
            title: "편의점 매출 계산기",
            language: "java",
            code: `public class SalesCalculator {
    public static void main(String[] args) {
        String item = "아메리카노";
        int unitPrice = 2500;
        int quantity = 3;
        
        int totalPrice = unitPrice * quantity;
        
        System.out.println("주문 상품: " + item);
        System.out.println("주문 수량: " + quantity + "잔");
        System.out.println("---------------------");
        System.out.println("총 결제 금액: " + totalPrice + "원");
    }
}`
        }
    ],
    keyPoints: [
        "프로그래밍은 실생활의 문제(계산, 관리 등)를 해결하는 도구입니다.",
        "변수는 이름표가 붙은 데이터 상자이며, 상황에 맞는 타입(String, int 등)을 골라 써야 합니다.",
        "System.out.println()은 단순히 결과를 보는 것을 넘어, 현재 프로그램이 잘 돌아가는지 확인하는 사장님의 눈이 되어줍니다."
    ],
    interviewQuestions: [
        {
            difficulty: 'Easy',
            question: "왜 가격 계산할 때 int(정수)만 쓰지 않고 double(실수)이 필요한가요?",
            answer: "만약 편의점 포인트가 0.1%씩 쌓인다고 하면 0.001이라는 소수점을 다뤄야 합니다. 정수 상자(int)는 소수점을 담지 못하고 버리기 때문에, 정확한 돈 계산을 위해서는 실수 상자(double)가 필수적입니다."
        }
    ]
};
