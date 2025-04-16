import { QuizData, QuizDetails, IncomingQuizData } from "@/lib/types";
import { atom } from "jotai";
export const result = atom<boolean[]>([]);
// Create an atom to store user details (default: empty array)
export const FetchQuizDetails = atom<QuizDetails[] | undefined>(undefined);

// create a atom storing fetched Quiz Details with Question and Option
export const QuizWithQuestionOption = atom<IncomingQuizData | null | undefined>(
  undefined
);

// fetching public quiz
export const FetchedPublicQuizDetails = atom<QuizDetails[] | undefined>(
  undefined
);

// Playing Quiz Data Fetching
export const PlayWithQuestionOption = atom<IncomingQuizData | null | undefined>(
  undefined
);

// state for trending topic quiz making
export const TrendingTopicState = atom<string>("");

// for quiz question index
export const questionNoAtom = atom(0);
// state for quiz playing selected item
export const selectedOptionAtom = atom<string | null>(null);
// state for quiz playing correct option
export const isCorrectAtom = atom<boolean | null>(null);
// state for quiz disable button
export const disableAtom = atom<boolean>(false);

