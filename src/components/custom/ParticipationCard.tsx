import React from "react";
import { Card } from "../ui/card";
import { ParticipationBar } from "@/lib/types";
import Link from "next/link";
import { MoveUpRight } from "lucide-react";

export const ParticipationCard = (props: ParticipationBar) => {
  return (
    <>
      <Card className="grid grid-cols-5 grid-rows-2 m-2 p-4 rounded-[24px] justify-center items-center bg-transparent backdrop-blur-md">
        <p className="text-2xl col-span-3">{props.title}</p>
        <span className="text-base col-span-3">{props.date}</span>
        <span className="text-2xl row-span-2 row-start-1 col-start-4 col-span-1 items-center ">
          {props.noOfGiveAnswer}/{props.noOfQuestion} 
        </span>
        <Link href={"#"} className="col-span-1 row-span-2 row-start-1 col-start-5 bg-accent rounded-[24px] w-1/2 p-2 font-thin text-white">
        <MoveUpRight/>
        </Link>
      </Card>
    </>
  );
};
