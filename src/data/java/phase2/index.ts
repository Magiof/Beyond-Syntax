import type { Phase } from '../../types';
import { exceptionHandling } from './exception-handling';
import { genericsAndEnums } from './generics-and-enums';
import { collectionsFramework } from './collections-framework';
import { javaIoAndNio } from './java-io-and-nio';

export const javaPhase2: Phase = {
    id: "java-phase2",
    title: "Phase 2: 자바 마스터리 - 타입 시스템과 컬렉션",
    goal: "자바의 견고함을 지탱하는 예외 처리 전략과 타입 안전한 제네릭, 그리고 핵심 자료구조인 컬렉션 프레임워크를 완벽히 이해합니다.",
    modules: [
        exceptionHandling,
        genericsAndEnums,
        collectionsFramework,
        javaIoAndNio
    ]
};
