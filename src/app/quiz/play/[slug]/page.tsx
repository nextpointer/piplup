"use client";

import { Card } from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { atom, useAtom } from "jotai";
import { useParams } from "next/navigation";
import PlayQuiz from "@/components/custom/PlayQuiz";
import { getQuestionAndOption } from "@/app/db/queries/select"; // Function to fetch quiz details
import { IncomingQuizData } from "@/lib/types"; // Define QuizData type
import {
  disableAtom,
  isCorrectAtom,
  PlayWithQuestionOption,
  questionNoAtom,
  result,
  selectedOptionAtom,
} from "@/app/store/atom";

// Atom to manage quiz start state
const quizStartAtom = atom(false);
// Atom to store quiz details (questions and options)

const Page = () => {
  const [startQuiz, setStartQuiz] = useAtom(quizStartAtom);
  const [quizDetails, setQuizDetails] = useAtom<
    IncomingQuizData | undefined | null
  >(PlayWithQuestionOption);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [, setIndex] = useAtom(questionNoAtom);
  const [, selectedOption] = useAtom(selectedOptionAtom);
  const [, setCorrectAtom] = useAtom(isCorrectAtom);
  const [, setDisableButton] = useAtom(disableAtom);
  const [, setResult] = useAtom(result);

  const params = useParams<{ slug: string }>();

  useEffect(() => {
    if (!params.slug) return;
    const fetchQuizDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getQuestionAndOption(params.slug);

        if (data.success) {
          setQuizDetails(data.quiz as IncomingQuizData);
        } else {
          setError("Failed to fetch quiz details.");
        }
      } catch (err) {
        console.error("Error fetching quiz:", err);
        setError("Something went wrong. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuizDetails();
  }, [params.slug, setQuizDetails]);

  useEffect(() => {
    // reset the result
    setResult([]);
    // set the state to false
    setStartQuiz(false);
    return () => {
      // reset all when this compo is unmounted
      setIndex(0);
      selectedOption(null);
      setCorrectAtom(null);
      setDisableButton(false);
    };
  }, []);

  return (
    <main className="flex-col xl:flex-row gap-4 relative">
      {!startQuiz ? (
        <>
          <Image
            src={"/readyQuiz.webp"}
            height={500}
            width={500}
            alt="Welcome"
            className="rounded-[24px] border"
          />
          <Card className="p-4 flex-center flex-col gap-1">
            <h2 className="text-2xl xl:text-3xl">Ready for the Quiz?</h2>
            <p className="text-base">
              Test yourself on this topic and learn infinitely.
            </p>
            <strong>
              {quizDetails?.title || "Loading..."} -{" "}
              {quizDetails?.QuestionTable.length || 0} Questions
            </strong>
            <Button
              className="mt-2 w-full"
              onClick={() => setStartQuiz(true)}
              disabled={loading || !!error}
            >
              {loading ? "Loading..." : "Start Quiz"}
            </Button>
            {error && <p className="text-red-500 mt-2">{error}</p>}
          </Card>
        </>
      ) : (
        <PlayQuiz quiz={quizDetails} />
      )}
    </main>
  );
};

export default Page;
