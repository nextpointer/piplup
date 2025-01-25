"use client";
import { redirect } from "next/navigation";
import { atom, useAtom } from "jotai";
import { Card } from "../ui/card";
import { Progress } from "../ui/progress";
import React from "react";
import { PlayQuizData } from "@/lib/content";
import { Button } from "../ui/button";
import { result } from "@/app/store/atom";

interface Option {
  label: string;
  isCorrect: boolean;
}
const No = atom(0);
const selectedOptionAtom = atom<string | null>(null);
const isCorrectAtom = atom<boolean | null>(null);
const disable  = atom<boolean>(false);

const PlayQuiz = () => {
  const [questionNo, setQuestionNo] = useAtom(No);
  const [selectedOption, setSelectedOption] = useAtom(selectedOptionAtom);
  const [_, setIsCorrect] = useAtom(isCorrectAtom);
  const [buttonDisable,setButtonDisable] = useAtom(disable);
  const [userResult,setUserResult] = useAtom(result)

  //   implement the function option correction
  const isOptionCorrect = (option: Option) => {
    setButtonDisable(true);
    setSelectedOption(option.label);
    setIsCorrect(option.isCorrect);
    setUserResult((prevResult)=>[...prevResult,option.isCorrect]);

    setTimeout(() => {
      questionNo+1 === PlayQuizData.Questions.length
        ? redirect("/")
        : setQuestionNo(questionNo + 1);
        setButtonDisable(false);
    }, 1200);
  };
  console.log(userResult);
  return (
    <>
      <Progress value={questionNo * 10} className="absolute top-16 h-1" />
      <Card className="flex flex-col gap-4 p-8">
        <h1>{PlayQuizData.Questions[questionNo].QuestionName}</h1>
        {PlayQuizData.Questions[questionNo].Options.map((option, key) => (
          <Button
            disabled={buttonDisable}
            key={key}
            onClick={() => isOptionCorrect(option)}
            className={`${
              selectedOption === option.label
                ? option.isCorrect
                  ? "bg-green-500 hover:bg-green-500 disabled:opacity-100"
                  : "bg-red-500 hover:bg-red-500 disabled:opacity-100"
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
