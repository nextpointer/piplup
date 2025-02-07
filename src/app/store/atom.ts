
import { QuizDetails } from "@/lib/types";
import { atom } from "jotai";
export const result = atom<boolean[]>([]);
// Create an atom to store user details (default: empty array)
export const FetchQuizDetails = atom<QuizDetails[] | undefined>(undefined);
