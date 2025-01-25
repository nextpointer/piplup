"use client";
import { Card } from "@/components/ui/card";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { atom, useAtom } from "jotai";
import PlayQuiz from "@/components/custom/PlayQuiz";

// create a atom for start a quiz
const quizStartAtom = atom(false);


const page = () => {

    const [startQuiz, setStartQuiz] = useAtom<boolean>(quizStartAtom);

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
            <h2 className="text-2xl xl:text-3xl ">Ready for the Quiz?</h2>
            <p className="text-base">
              Test yourself on this topic and learn infinite
            </p>
            <strong>Web Development - 10 Questions</strong>
            <Button className="mt-2 w-full" onClick={() => setStartQuiz(true)}>
              Start Quiz
            </Button>
          </Card>
        </>
      ) : (
        <>
          <PlayQuiz/>
        </>
      )}
    </main>
  );
};

export default page;
