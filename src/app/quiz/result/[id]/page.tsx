"use client";
import React from "react";
import { useAtom } from "jotai";
import { result } from "@/app/store/atom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const ResultPage = () => {
  const [userResult] = useAtom(result);
  const correctAnswers = userResult.filter((value) => value === true).length;
  const totalQuestions = userResult.length;
  const scorePercentage = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0;
  const router = useRouter();

  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4">
      <Card className="p-6 w-full max-w-lg text-center shadow-lg rounded-[24px]">
        <h1 className="text-4xl font-bold">Quiz Results</h1>

        {totalQuestions > 0 ? (
          <>
            <p className="text-2xl mt-4 font-semibold">
              Score: <span className="text-blue-600">{correctAnswers}</span> / {totalQuestions}
            </p>
            <p className="text-xl text-gray-600 mt-2">
              Accuracy: <span className="font-bold">{scorePercentage}%</span>
            </p>
          </>
        ) : (
          <p className="text-lg text-gray-500 mt-4">No quiz results available.</p>
        )}

        <div className="mt-6 flex flex-col gap-3">
          <Button onClick={() => router.push("/quiz/play")} className="w-full">
            Take Another Quiz
          </Button>
          <Button variant="outline" onClick={() => router.push("/")}>
            Go to Home
          </Button>
        </div>
      </Card>
    </main>
  );
};

export default ResultPage;
