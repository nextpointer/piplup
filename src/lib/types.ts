export interface HistoryBar {
  id:string;
  date: string;
  title: string;
  about: string;
  visibility: string;
}

export interface ParticipationBar {
  date: string;
  title: string;
  noOfQuestion: number;
  noOfGiveAnswer: number;
}

// Inserted Quiz and Option with Quiz --------------------------------------------------------------------

export type QuizData = {
  Title: string;
  About: string;
  difficulty:"Easy" | "Medium" | "Hard";
  publicQuiz: boolean;
  Questions: QuestionData[];
};

export type QuestionData = {
  QuestionName: string;
  Options: OptionData[];
};

export type OptionData = {
  label: string;
  isCorrect: boolean;
};

// Incoming (fetched) Quiz and Option with Quiz --------------------------------------------------------------------

export type IncomingQuizData = {
  title: string;
  id: string;
  about: string;
  created_At: Date;
  updatedAt: Date;
  userId: string;
  difficulty: string;
  visibility: string;
  QuestionTable: QuestionTableType[];
};
type QuestionTableType = {
  id: string;
  quizId: string;
  title: string;
  created_At: Date;
  updatedAt: Date;
  OptionTable: OptionTableType[];
};
type OptionTableType = {
  id: string;
  questionId: string;
  label: string;
  isCorrect: boolean;
  created_At: Date;
  updatedAt: Date;
};

// ------------------------------------------------------------------------------------------------------>>

// Fetched QuizDetails for dashboad
export type QuizDetails = {
  id: string;
  userId: string;
  title: string;
  about: string;
  visibility: string;
  difficulty: string;
  created_At: Date;
  updatedAt?: Date;
  UserTable?: { username: string }; 
};

