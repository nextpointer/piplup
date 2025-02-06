export interface HistoryBar {
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

export type QuizData = {
  Title: string;
  About: string;
  publicQuiz: boolean;
  Questions: QuestionData[];
};

type QuestionData = {
  QuestionName: string;
  Options: OptionData[];
};

type OptionData = {
  label: string;
  isCorrect: boolean;
};

// ------------------------------------------------------------------------------------------------------>>

// fetching data details from the database
type OptionDataforUser = {
  id: string;
  questionId: string;
  label: string;
  isCorrect: boolean;
  created_At: string;
  updatedAt: string;
};

type QuestionDataforUser = {
  id: string;
  quizId: string;
  title: string;
  created_At: string;
  updatedAt: string;
  OptionTable: OptionDataforUser[];
};

type UserTableData = {
  id: string;
  username: string;
  created_At: string;
  updatedAt: string;
};

export type QuizDatawithUserAndPartcipant = {
  id: string;
  userId: string;
  title: string;
  about: string;
  visibility: string;
  shareLink: string;
  created_At: string;
  updatedAt: string;
  UserTable: UserTableData;
  QuestionTable: QuestionDataforUser[];
};
