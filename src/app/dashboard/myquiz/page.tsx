"use client";

import { useAtom } from "jotai";
import { FetchQuizDetails } from "@/app/store/atom";
import { QuizDetails } from "@/lib/types";
import { HistoryCard } from "@/components/custom/HistoryCard";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, History } from "lucide-react";
import { useState, useEffect } from "react";
import { getAllDetailsOfUser } from "@/app/db/queries/select";
import Link from "next/link";

const MyQuizes = () => {
  const [FetchQuizDetail, setFetchQuizDetail] = useAtom<
    QuizDetails[] | undefined
  >(FetchQuizDetails);
  const [loading, setLoading] = useState(false);
  console.log(loading);

  useEffect(() => {
    (async () => {
      try {
        if (!FetchQuizDetail) {
          setLoading(true);
          const data = await getAllDetailsOfUser();
          if (data.success) {
            setFetchQuizDetail(data.quizzes);
          }
        }
      } catch (err) {
        console.error("Failed to fetch quizzes", err);
      } finally {
        setLoading(false);
      }
    })();
  }, [FetchQuizDetail, setFetchQuizDetail]);

  return (
    <main className="flex flex-col justify-start px-4 h-auto pt-20 ">
      <div className="flex flex-row gap-2 justify-center items-center mb-2 px-4 w-full relative">
        {/* Back arrow to Dashboard */}
        <Link href="/dashboard" className="flex items-center absolute left-4">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <History />
        <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          My Quizzes
        </h2>
      </div>

      {loading ? (
        <div className="flex flex-col gap-4 p-4 w-full">
          {Array.from({ length: 4 }, (_, index) => (
            <Skeleton key={index} className="h-[160px] w-full rounded-[24px]" />
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-4 p-4">
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
      )}
    </main>
  );
};

export default MyQuizes;
