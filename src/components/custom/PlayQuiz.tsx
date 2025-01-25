"use client";
import { redirect } from "next/navigation";
import { atom, useAtom } from "jotai";
import { Card } from "../ui/card";
import { Progress } from "../ui/progress";
import React from "react";
import { PlayQuizData } from "@/lib/content";
import { Button } from "../ui/button";

interface Option {
  label: string;
  isCorrect: boolean;
}
const No = atom(0);
const selectedOptionAtom = atom<string | null>(null);
const isCorrectAtom = atom<boolean | null>(null);

const PlayQuiz = () => {
  const [questionNo, setQuestionNo] = useAtom(No);
  const [selectedOption, setSelectedOption] = useAtom(selectedOptionAtom);
  const [_, setIsCorrect] = useAtom(isCorrectAtom);

  //   implement the function option correction
  const isOptionCorrect = (option: Option) => {
    setSelectedOption(option.label);
    setIsCorrect(option.isCorrect);

    setTimeout(() => {
      questionNo+1 === PlayQuizData.Questions.length
        ? redirect("/")
        : setQuestionNo(questionNo + 1);
    }, 1200);
  };
  return (
    <>
      <Progress value={questionNo * 10} className="absolute top-16 h-1" />
      <Card className="flex flex-col gap-4 p-8">
        <h1>{PlayQuizData.Questions[questionNo].QuestionName}</h1>
        {PlayQuizData.Questions[questionNo].Options.map((option, key) => (
          <Button
            key={key}
            onClick={() => isOptionCorrect(option)}
            className={`${
              selectedOption === option.label
                ? option.isCorrect
                  ? "bg-green-500 hover:bg-green-500"
                  : "bg-red-500 hover:bg-red-500"
                : ""
            } disabled`}
          >
            {option.label}
          </Button>
        ))}
      </Card>
    </>
  );
};

export default PlayQuiz;
