import type { Module } from '../../types';

export const dockerKubernetes: Module = {
    id: "docker-kubernetes",
    title: "Chapter 1: 컨테이너와 오케스트레이션 (Docker/K8s)",
    topic: "Dockerfile 최적화, Pod, Service, Deployment, HPA",
    content: `
## 1. 개발자에게 Docker란?

애플리케이션을 실행하는 데 필요한 모든 구성 요소(코드, 런타임, 라이브러리)를 패키징하여 어떤 환경에서도 동일하게 실행되도록 돕는 기술입니다.

### 1.1 Dockerfile 작성 및 최적화
Java 애플리케이션의 경우 레이어 크기를 줄이고 빌드 속도를 높이는 것이 중요합니다.
- **Multi-stage Build**: 빌드 시에만 필요한 툴과 실행 시 필요한 JRE를 분리하여 최종 이미지 크기 최소화.

\`\`\`dockerfile
# 빌드 단계
FROM eclipse-temurin:21-jdk-jammy AS build
COPY . .
RUN ./gradlew bootJar

# 실행 단계 (최종 이미지)
FROM eclipse-temurin:21-jre-jammy
COPY --from=build /build/libs/*.jar app.jar
ENTRYPOINT ["java", "-jar", "/app.jar"]
\`\`\`

---

## 2. Kubernetes (K8s) 기초

수많은 컨테이너를 관리하는 '지휘자' 역할을 합니다.

- **Pod**: 가장 작은 배포 단위. 하나 이상의 컨테이너를 포함.
- **Deployment**: 애플리케이션의 원하는 상태(예: 3개의 카피 유지)를 정의함.
- **Service**: 파드 집합에 대한 단일 진입점(로드 밸런서) 역할.
- **ConfigMap/Secret**: 설정값과 보안 정보를 관리.

---

## 3. HPA (Horizontal Pod Autoscaler)

트래픽 변화에 따라 파드의 개수를 자동으로 조절합니다.
- 예: CPU 사용량이 60%를 넘으면 파드를 최대 10개까지 늘림.

---

## 4. 실전 가이드: Spring Boot와 K8s의 조화

- **Liveness Probe**: 애플리케이션이 살아있는지 확인. 실패 시 K8s가 파드 재시작.
- **Readiness Probe**: 트래픽을 받을 준비가 되었는지 확인. 로딩 중에는 서비스 목록에서 제외.
- **Graceful Shutdown**: 종료 신호를 받았을 때 진행 중인 요청을 안전하게 마무리하고 종료하는 설정.

\`\`\`yaml
server:
  shutdown: graceful
spring:
  lifecycle:
    timeout-per-shutdown-phase: 20s
\`\`\`
`,
    codeExamples: [
        {
            title: "Spring Boot K8s Liveness/Readiness 설정",
            language: "yaml",
            code: `livenessProbe:
  httpGet:
    path: /actuator/health/liveness
    port: 8080
readinessProbe:
  httpGet:
    path: /actuator/health/readiness
    port: 8080`
        }
    ],
    keyPoints: [
        "Docker 이미지는 가급적 경량화된 베이스 이미지(Alpine, Slim)를 사용하세요.",
        "K8s 리소스 제한(Limits/Requests)을 설정하지 않으면 하나의 파드가 노드 전체 자원을 고갈시킬 수 있습니다.",
        "CI/CD 파이프라인(Jenkins, GitHub Actions)을 통해 빌드부터 배포까지 자동화하는 것이 필수입니다."
    ],
    interviewQuestions: [
        {
            difficulty: 'Medium',
            question: "Pod와 Container의 차이점은 무엇인가요?",
            answer: "Container는 격리된 실행 환경이고, Pod는 K8s에서 컨테이너를 관리하는 최소 단위입니다. 하나의 Pod 안에는 여러 컨테이너가 있을 수 있으며 이들은 네트워크와 스토리지를 공유합니다."
        },
        {
            difficulty: 'Hard',
            question: "Multi-stage build를 사용하는 이유는 무엇인가요?",
            answer: "최종 배포 이미지에는 소스 코드나 빌드 도구(Gradle, Maven)를 포함할 필요가 없습니다. 멀티 스테이지 빌드를 통해 보안 위협을 줄이고 이미지 용량을 획기적으로 줄여 배포 속도를 높일 수 있습니다."
        }
    ]
};
