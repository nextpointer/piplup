"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useAtom } from "jotai";
import { QuizDetails } from "@/lib/types";
import { FetchedPublicQuizDetails } from "@/app/store/atom";
import { getPublicQuizzes } from "@/app/db/queries/select";
import QuizCard from "@/components/custom/QuizCard";

const Page = () => {
  const router = useRouter();
  const [publicQuizDetails, setPublicQuizDetails] = useAtom<
    QuizDetails[] | undefined
  >(FetchedPublicQuizDetails);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        setLoading(true);
        setError(null);
        const quizzes = await getPublicQuizzes();

        if (quizzes.success) {
          setPublicQuizDetails(quizzes.data);
        } else {
          setError("Failed to load quizzes. Please try again.");
        }
      } catch (error) {
        console.error("Error fetching quizzes:", error);
        setError("Something went wrong. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, [setPublicQuizDetails]);

  const handleQuizClick = (quizId: string) => {
    router.push(`/quiz/play/${quizId}`);
  };

  // Categorizing quizzes by difficulty
  const categorizedQuizzes = {
    Easy: publicQuizDetails?.filter((quiz) => quiz.difficulty === "Easy") || [],
    Medium:
      publicQuizDetails?.filter((quiz) => quiz.difficulty === "Medium") || [],
    Hard: publicQuizDetails?.filter((quiz) => quiz.difficulty === "Hard") || [],
  };

  return (
    <main className="flex flex-col justify-start mt-16 px-4">
      <h1 className="text-3xl font-bold md:text-4xl">Explore Quizzes</h1>
      <p className="text-2xl mt-2">
        Explore quizzes. Embrace the opportunity to grow, learn, and test your
        knowledge.
      </p>

      {loading ? (
        <main className="flex-center">
          <span className="loader-main"></span>
        </main>
      ) : (
        Object.entries(categorizedQuizzes).map(([difficulty, quizzes]) =>
          quizzes.length > 0 ? (
            <div key={difficulty} className="w-full h-[45vh] p-4">
              <h2 className="text-3xl font-bold flex flex-row items-center justify-between">
                {difficulty} Quizzes
                <Link href={"/quizzes"}>
                  <Button>Explore more</Button>
                </Link>
              </h2>
              <div className="w-full overflow-x-auto flex flex-row space-x-4">
                {quizzes.map((quiz) => (
                  <div
                    key={quiz.id}
                    onClick={() => handleQuizClick(quiz.id)}
                    className="cursor-pointer"
                  >
                    <QuizCard quiz={quiz} />
                  </div>
                ))}
              </div>
            </div>
          ) : null
        )
      )}
    </main>
  );
};

export default Page;
