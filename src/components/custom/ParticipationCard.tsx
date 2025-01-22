import React from "react";
import { Card } from "../ui/card";
import { ParticipationBar } from "@/lib/types";

export const ParticipationCard = (props: ParticipationBar) => {
  return (
    <>
      <Card className="grid grid-cols-3 grid-rows-2 m-2 p-4 rounded-[24px]">
        <p className="text-2xl col-span-2">{props.title}</p>
        <span className="text-base col-span-2">{props.date}</span>
        <span className="text-2xl row-span-2 row-start-1 col-start-3 items-center">
          {props.noOfGiveAnswer}/{props.noOfQuestion}
        </span>
      </Card>
    </>
  );
};
