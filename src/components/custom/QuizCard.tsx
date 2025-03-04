import React from "react";
import { Card } from "@/components/ui/card";
import { QuizDetails } from "@/lib/types";

interface QuizCardProps {
  quiz: QuizDetails;
}

export const colorSelect: { [key in QuizDetails['difficulty']]: string } = {
  Easy: "secondary",
  Medium: "primary",
  Hard: "accent"
};

export const shadowSelect: { [key in QuizDetails['difficulty']]: string } = {
  Easy: "hover:shadow-secondary ",
  Medium: "hover:shadow-primary",
  Hard: " hover:shadow-accent"
};

const QuizCard: React.FC<QuizCardProps> = ({ quiz }) => {
  return (
    <Card className={`h-56 w-[270px] md:w-[330px] m-4 min-w-[320px] p-4 flex flex-col gap-2 bg-transparent backdrop-blur-md ${shadowSelect[quiz.difficulty]} cursor-pointer`}>
      <h1 className="text-[1.5rem] font-semibold">{quiz.title}</h1>
      <h4 className={`p-1 bg-${colorSelect[quiz.difficulty]} rounded-[24px] w-20 flex-center text-center ${quiz.difficulty === "Easy" ? "text-black" : "text-white"}`}>
        {quiz.difficulty}
      </h4>
      <div className="flex flex-row justify-start gap-5 mt-6">
        <span className="text-base font-semibold">@{quiz.UserTable?.username}</span>
        <span className="font-thin text-base">
          {new Date(quiz.created_At).toLocaleDateString()}
        </span>
      </div>
      <p className="line-clamp-2">{quiz.about}</p>
    </Card>
  );
};

export default QuizCard;
