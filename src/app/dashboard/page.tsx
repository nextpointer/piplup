"use client";

import { HistoryCard } from "@/components/custom/HistoryCard";
import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Box, Sparkles, Gamepad2, Info } from "lucide-react";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getAllDetailsOfUser } from "../db/queries/select";
import { useAtom } from "jotai";
import { FetchQuizDetails } from "../store/atom";
import { QuizDetails } from "@/lib/types";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import AIForm from "@/components/custom/AIForm";
import { useUser } from "@auth0/nextjs-auth0/client";
import InfiniteScroll from "@/components/custom/InfiniteScroll";
import QuizAccuracyChart from "@/components/custom/QuizAccuracyChart";
import { yourQuizDataArray } from "@/lib/content";

const page = () => {
  const [FetchQuizDetail, setFetchQuizDetail] = useAtom<
    QuizDetails[] | undefined
  >(FetchQuizDetails);

  const [loading, setloading] = useState<boolean>(false);
  const { user } = useUser();

  useEffect(() => {
    (async () => {
      try {
        setloading(true);
        if (!FetchQuizDetail) {
          const data = await getAllDetailsOfUser();
          if (data.success) {
            setFetchQuizDetail(data.quizzes); // Store fetched quizzes in the atom
            setloading(false);
          } else {
            console.error("Error fetching quizzes");
            setloading(false);
          }
        }
      } catch (error) {
        console.log("Failed to fetch the data", error);
        setloading(false);
      } finally {
        setloading(false);
      }
    })();
  }, []);

  return (
    <>
      {loading ? (
        <main className="flex-center">
          <span className="loader-main"></span>
        </main>
      ) : (
        <main>
          <div className="grid h-screen xl:h-screen w-full grid-cols-1 xl:grid-cols-2 grid-rows-4 xl:grid-rows-3 pt-20 pb-4 gap-2">
            <div className="col-span-1 row-start-1 row-span-2 xl:row-span-1 md:row-span-1 sm:row-span-1">
              <h3 className="text-3xl font-bold">Hello {user?.nickname}👋🏻</h3>
              <div className="flex flex-row gap-4 flex-wrap p-4 items-center justify-center sm:h-full">
                <Link href="/quiz/create" className="flex-1">
                  <Card className="p-2 xl:p-8 flex-center ">
                    <div className="flex gap-2 items-center">
                      <Box size={48} />
                      <span className="text-2xl font-bold">Create a Quiz</span>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <Info />
                          </TooltipTrigger>
                          <TooltipContent className="bg-black text-white rounded-[24px]">
                            <p>Design your own quiz with custom questions</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </Card>
                </Link>

                <Dialog>
                  <DialogTrigger asChild>
                    <Link href="#" className="flex-1">
                      <Card className="p-2 xl:p-8  flex-center">
                        <div className="flex gap-2 items-center">
                          <Sparkles size={48} />
                          <span className="text-2xl font-bold">
                            Create quiz with AI{" "}
                          </span>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                <Info />
                              </TooltipTrigger>
                              <TooltipContent className="bg-black text-white rounded-[24px]">
                                <p>
                                  Participate in exciting public quizzes now!
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </Card>
                    </Link>
                  </DialogTrigger>
                  <AIForm />
                </Dialog>

                <Link href="/quiz/play" className="flex-1">
                  <Card className="p-2 xl:p-8 flex-center">
                    <div className="flex gap-2 items-center">
                      <Gamepad2 size={48} />
                      <span className="text-2xl font-bold">Play Quiz</span>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <Info />
                          </TooltipTrigger>
                          <TooltipContent className="bg-black text-white rounded-[24px]">
                            <p>Design your own quiz with custom questions</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </Card>
                </Link>
              </div>
            </div>
            <div className="col-span-1 row-start-3 xl:row-start-2 row-span-1 xl:col-span-1 p-2 mt-2 h-full w-full place-self-center">
              <h2 className="text-2xl font-bold sticky block">
                Trending topics
              </h2>
              <div className="m-2 mt-8 w-full flex items-start justify-center flex-col">
                <InfiniteScroll type="left" />
                <InfiniteScroll type="right" />
              </div>
            </div>
            <div className="row-start-4 xl:row-start-3 row-span-1 col-span-2 xl:col-span-1 p-2 mt-2 h-full w-full relative overflow-hidden">
              <h2 className="text-2xl font-bold sticky block">
                Stat of last participation
              </h2>
              <QuizAccuracyChart quizData={yourQuizDataArray} />
            </div>
            <div className=" row-start-1 row-span-6 col-start-2 flex-col hidden xl:flex overflow-y-scroll no-scrollbar snap-y relative mt-2">
              <h2 className="text-2xl font-bold sticky block">History</h2>
              {FetchQuizDetail?.slice(0)
                .reverse()
                .map((data, key) => (
                  <HistoryCard
                    key={key}
                    id={data.id}
                    date={data.created_At.toLocaleDateString()}
                    about={data.about}
                    title={data.title}
                    visibility={data.visibility}
                  />
                ))}
            </div>
          </div>
        </main>
      )}
    </>
  );
};

export default page;
