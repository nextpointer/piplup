"use client";
import { useRouter } from "next/navigation";
import { atom, useAtom } from "jotai";
import { Card } from "../ui/card";
import { Progress } from "../ui/progress";
import React from "react";
import { Button } from "../ui/button";
import { result } from "@/app/store/atom";
import { IncomingQuizData, OptionData} from "@/lib/types"; // Import types

// Atoms for state management
const questionNoAtom = atom(0);
const selectedOptionAtom = atom<string | null>(null);
const isCorrectAtom = atom<boolean | null>(null);
const disableAtom = atom<boolean>(false);

interface PlayQuizProps {
  quiz: IncomingQuizData |undefined |null
}

const PlayQuiz: React.FC<PlayQuizProps> = ({ quiz }) => {
  const [questionNo, setQuestionNo] = useAtom(questionNoAtom);
  const [selectedOption, setSelectedOption] = useAtom(selectedOptionAtom);
  const [_, setIsCorrect] = useAtom(isCorrectAtom);
  const [buttonDisable, setButtonDisable] = useAtom(disableAtom);
  const [__, setUserResult] = useAtom(result);
  const router = useRouter();

  if (!quiz || !quiz.QuestionTable.length) {
    return <p className="text-center text-lg mt-4">No quiz data available.</p>;
  }

  const currentQuestion = quiz.QuestionTable[questionNo];

  // Function to check if the selected option is correct
  const isOptionCorrect = (option: { label: string; isCorrect: boolean }) => {
    setButtonDisable(true);
    setSelectedOption(option.label);
    setIsCorrect(option.isCorrect);
    setUserResult((prevResult) => [...prevResult, option.isCorrect]);

    setTimeout(() => {
      if (questionNo + 1 === quiz.QuestionTable.length) {
        router.push(`/quiz/result/${quiz.id}`);
      } else {
        setQuestionNo(questionNo + 1);
      }
      setButtonDisable(false);
    }, 1200);
  };

  return (
    <>
      <Progress value={(questionNo / quiz.QuestionTable.length) * 100} className="absolute top-16 h-1" />
      <Card className="flex flex-col gap-4 p-8">
        <h1>{currentQuestion.title}</h1>
        {currentQuestion.OptionTable.map((option:OptionData, key:number) => (
          <Button
            key={key}
            disabled={buttonDisable}
            onClick={() => isOptionCorrect(option)}
            className={`${
              selectedOption === option.label
                ? option.isCorrect
                  ? "bg-green-500 hover:bg-green-500 disabled:opacity-100"
                  : "bg-red-500 hover:bg-red-500 disabled:opacity-100"
                : ""
            }`}
          >
            {option.label}
          </Button>
        ))}
      </Card>
    </>
  );
};

export default PlayQuiz;
