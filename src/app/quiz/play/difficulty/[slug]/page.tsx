"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAtom } from "jotai";
import { useParams } from "next/navigation";
import { QuizDetails } from "@/lib/types";
import { FetchedPublicQuizDetails } from "@/app/store/atom";
import QuizCard from "@/components/custom/QuizCard";

const DifficultyQuizzesPage = () => {
  const router = useRouter();
    const params = useParams<{ slug: string }>();
  const [publicQuizDetails] = useAtom<QuizDetails[] | undefined>(FetchedPublicQuizDetails);
  const [filteredQuizzes, setFilteredQuizzes] = useState<QuizDetails[]>([]);

  useEffect(() => {
    if (publicQuizDetails) {
      setFilteredQuizzes(publicQuizDetails.filter((quiz) => quiz.difficulty === params.slug));
    }
  }, [publicQuizDetails, params.slug]);

  const handleQuizClick = (quizId: string) => {
    router.push(`/quiz/play/${quizId}`);
  };

  return (
    <main className="flex flex-col justify-center px-4 h-auto">
      <h1 className="text-3xl font-bold md:text-4xl mt-16 capitalize">{params.slug} Quizzes</h1>
      <p className="text-base xl:text-2xl mb-8 xl:mt-2 text-center">
        Browse through quizzes categorized under {params.slug} difficulty.
      </p>
      {filteredQuizzes.length > 0 ? (
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
          {filteredQuizzes.map((quiz) => (
            <div key={quiz.id} onClick={() => handleQuizClick(quiz.id)} className="cursor-pointer">
              <QuizCard quiz={quiz} />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-lg">No quizzes available for this difficulty.</p>
      )}
    </main>
  );
};

export default DifficultyQuizzesPage;