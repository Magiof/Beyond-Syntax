import type { Phase } from '../../curriculumData';
import { jvmArchitecture } from './jvm-architecture';
import { memoryModelAndGc } from './memory-model-and-gc';
import { concurrencyAndMultithreading } from './concurrency-and-multithreading';
import { reflectionAndDynamicProxy } from './reflection-and-dynamic-proxy';
import { javaNio } from './java-nio';
import { modernJavaEvolution } from './modern-java-evolution';

export const javaPhase2: Phase = {
    id: "java-phase2",
    title: "Phase 2: Java 심화 (Deep Dive)",
    goal: "JVM의 내부 동작 원리와 메모리 모델, 동시성, 고성능 I/O까지 Java의 깊은 곳을 탐험합니다.",
    modules: [
        jvmArchitecture,
        memoryModelAndGc,
        concurrencyAndMultithreading,
        reflectionAndDynamicProxy,
        javaNio,
        modernJavaEvolution
    ]
};
