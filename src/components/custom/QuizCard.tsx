import React from "react";
import { Card } from "@/components/ui/card";
import { QuizDetails } from "@/lib/types";

interface QuizCardProps {
  quiz: QuizDetails;
}

const QuizCard: React.FC<QuizCardProps> = ({ quiz }) => {
  return (
    <Card className="h-56 w-[350px] m-2 min-w-[320px] p-4 flex flex-col gap-2">
      <h1 className="text-[1.5rem] font-semibold">{quiz.title}</h1>
      <h4 className="p-1 bg-secondary rounded-[24px] w-16 text-center">
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
