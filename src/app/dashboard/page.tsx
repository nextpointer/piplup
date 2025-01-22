import { HistoryCard } from "@/components/custom/HistoryCard";
import React from "react";
import { participationData, quizData } from "@/lib/content";
import { Progress } from "@/components/ui/progress";
import { ParticipationCard } from "@/components/custom/ParticipationCard";

const page = () => {
  return (
    <>
      <main>
        <div className="grid h-screen w-full grid-cols-3 grid-rows-3 pt-24">
          <div className=" col-span-2">
            <h3 className="text-3xl font-bold ">Hello Surajit👋🏻</h3>
          </div>
          <div className=" row-span-2 col-span-2 p-2 overflow-y-scroll">
            <h2 className="text-2xl font-bold ">History</h2>
            {quizData.map((data, key) => (
              <HistoryCard
                key={key}
                date={data.date}
                about={data.about}
                title={data.title}
                visibility={data.visibility}
              />
            ))}
          </div>
          <div className=" row-start-1 row-span-3 col-start-3 flex flex-col">
            <h2 className="text-2xl font-bold">Participation</h2>
            <div className="m-4">
            <h3 className="text-base font-bold">Accuracy</h3>
            <span className="text-3xl font-thin">63.4</span>
            <Progress value={63.4} />
            </div>
            <div className="overflow-y-scroll">
              {participationData.map((data, key) => (
                <ParticipationCard
                  key={key}
                  date={data.date}
                  noOfGiveAnswer={data.noOfGiveAnswer}
                  noOfQuestion={data.noOfQuestion}
                  title={data.title}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default page;
