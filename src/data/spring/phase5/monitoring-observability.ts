import type { Module } from '../../types';

export const monitoringObservability: Module = {
    id: "monitoring-observability",
    title: "Chapter 2: 모니터링과 관측성 (Observability)",
    topic: "Spring Actuator, Prometheus, Grafana, Micrometer Tracing",
    content: `
## 1. 관측성 (Observability)이란?

복잡한 분산 시스템에서 시스템의 내부 상태를 외부 출력을 통해 얼마나 잘 이해할 수 있는지를 뜻합니다.
단순한 모니터링(장애 여부)을 넘어, '**왜 장애가 났는가**' 에 대한 답을 찾는 것이 목적입니다.

### 3요소 (Three Pillars)
1. **Metrics**: 수치 데이터 (CPU, 메모리, 요청 수).
2. **Logging**: 텍스트 기록 (로그 파일).
3. **Tracing**: 요청의 분산 시스템 전체 여정(Trace/Span).

---

## 2. Spring Boot Actuator

애플리케이션의 상태 정보를 HTTP 엔드포인트로 노출합니다.
- \`/actuator/health\`: 상태 체크.
- \`/actuator/metrics\`: 각종 지표.
- \`/actuator/prometheus\`: 프로메테우스가 수집하기 좋은 포맷으로 지표 출력.

---

## 3. Prometheus & Grafana

- **Prometheus**: 시계열 DB 및 지표 수집기. 애플리케이션으로부터 지표를 **Pull** 방식으로 가져옴.
- **Grafana**: 지표 데이터를 시각적으로 대시보드화함.

---

## 4. 분산 추적 (Micrometer Tracing)

여러 마이크로서비스를 거치는 하나의 요청에 공통 ID를 부여하여 전체 흐름을 추적합니다. (기존 Spring Cloud Sleuth가 Micrometer로 통합됨)
- **Trace ID**: 전체 여정의 고유 ID.
- **Span ID**: 각 서비스에서의 단계별 ID.

---

## 5. 실전 가이드: 로그 관리 전략

로그는 너무 많아도, 너무 적어도 문제입니다.
- **ELK Stack (Elasticsearch, Logstash, Kibana)**: 로그를 수집하고 검색하기 위한 표준 스택.
- **Logback 최적화**: 운영 환경에서는 \`info\` 레벨 이상만 로그를 남기고, 비동기(\`AsyncAppender\`) 설정을 통해 성능 저하를 방지해야 합니다.
`,
    codeExamples: [
        {
            title: "Prometheus 수집 허용 설정 (application.yml)",
            language: "yaml",
            code: `management:
  endpoints:
    web:
      exposure:
        include: "health,prometheus"
  metrics:
    tags:
      application: \${spring.application.name}`
        }
    ],
    keyPoints: [
        "지표(Metrics) 수집은 0.1초 미만의 빠른 주기보다 추세를 보는 방향으로 설정하세요.",
        "로그에 개인정보(Pii)가 기록되지 않도록 마스킹 처리가 필수입니다.",
        "장애 알람(Alerting)은 개발자가 즉시 조치해야 하는 중요한 항목에 대해서만 발생시켜야 '알람 피로'를 방지할 수 있습니다."
    ],
    interviewQuestions: [
        {
            difficulty: 'Medium',
            question: "Pull 방식과 Push 방식 모니터링의 차이는 무엇인가요?",
            answer: "Pull 방식(Prometheus)은 수집 서버가 대상 서버로 접속하여 데이터를 가져오므로 애플리케이션 부하가 적고 대상 서버 관리가 유연합니다. Push 방식은 대상 서버가 직접 지표를 쏘는 방식으로, 설정이 간편하지만 대규모 트래픽 시 수집 서버에 부하가 몰릴 수 있습니다."
        },
        {
            difficulty: 'Hard',
            question: "분산 시스템에서 특정 에러가 어느 서비스에서 시작되었는지 어떻게 찾나요?",
            answer: "Micrometer Tracing(구 Sleuth)과 같은 분산 추적 도구를 사용하여 Trace ID를 공유하고, 이를 통해 Zipkin이나 Jaeger 같은 대시보드에서 전체 호출 단계를 시각화하여 지연이나 에러 발생 지점을 특정할 수 있습니다."
        }
    ]
};
