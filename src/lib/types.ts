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

// Fetched QuizDetails
export type QuizDetails = {
  id: string;
  userId: string;
  title: string;
  about: string;
  visibility: string;
  shareLink: string;
  created_At: Date; 
  updatedAt: Date; 
};
