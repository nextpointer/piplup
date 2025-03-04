"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useAtom } from "jotai";
import { QuizDetails } from "@/lib/types";
import { FetchedPublicQuizDetails } from "@/app/store/atom";
import { getPublicQuizzes } from "@/app/db/queries/select";
import QuizCard, { colorSelect } from "@/components/custom/QuizCard";

const Page = () => {
  const router = useRouter();
  const [publicQuizDetails, setPublicQuizDetails] = useAtom<QuizDetails[] | undefined>(FetchedPublicQuizDetails);
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

  const quizHeaderMap:{[key in QuizDetails['difficulty']]:string} = {
    Easy: "For Beginners",
    Medium: "Not for Beginners",
    Hard: "For Experts",
  }

  // Categorizing quizzes by difficulty
  const categorizedQuizzes = {
    Easy: publicQuizDetails?.filter((quiz) => quiz.difficulty === "Easy") || [],
    Medium: publicQuizDetails?.filter((quiz) => quiz.difficulty === "Medium") || [],
    Hard: publicQuizDetails?.filter((quiz) => quiz.difficulty === "Hard") || [],
  };

  return (
    <>
      {loading ? (
        <main className="flex-center">
          <span className="loader-main"></span>
        </main>
      ) : error ? (
        <main className="flex-center">
          <p className="text-red-500">{error}</p>
        </main>
      ) : (
        <main className="flex flex-col justify-start px-4 h-auto">
          <h1 className="text-3xl font-bold md:text-4xl mt-16">Explore Quizzes</h1>
          <p className="text-base xl:text-2xl mb-8 xl:mt-2 text-center">
            Explore quizzes. Embrace the opportunity to grow, learn, and test your knowledge.
          </p>

          {Object.entries(categorizedQuizzes).map(([difficulty, quizzes]) => 
            quizzes.length > 0 ? (
              <div key={difficulty} className="w-full h-auto p-4">
                <h2 className="text-[24px] xl:text-3xl font-bold flex flex-row items-center justify-between">
                  {quizHeaderMap[difficulty]}
                  <Link href={"/quizzes"}>
                    <Button onClick={()=>{
                      router.push(`/quiz/play/difficulty/${difficulty}`)
                    }} className={`bg-${colorSelect[difficulty]} ${difficulty=="Easy"?"text-black":"text-white"}`}>Explore more</Button>
                  </Link>
                </h2>
                <div className="w-full overflow-x-auto flex flex-row space-x-4 no-scrollbar">
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
            ) : null // Return null if there are no quizzes for this difficulty
          )}
        </main>
      )}
    </>
  );
};

export default Page;
