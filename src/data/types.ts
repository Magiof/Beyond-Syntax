export interface CodeExample {
  title: string;
  language: string;
  code: string;
}

export interface InterviewQuestion {
  question: string;
  answer: string;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Hell';
}

export interface Module {
  id: string;
  title: string;
  topic: string;
  content?: string;
  codeExamples?: CodeExample[];
  keyPoints?: string[];
  interviewQuestions?: InterviewQuestion[];
}

export interface Phase {
  id: string;
  title: string;
  goal: string;
  modules: Module[];
}

export interface Track {
  id: string;
  title: string;
  description: string;
  icon: string;  // Material Icon name
  color: string; // Tailwind color class (e.g., 'blue', 'purple', 'green')
  phases: Phase[];
}
