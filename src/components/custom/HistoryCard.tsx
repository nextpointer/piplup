import { HistoryBar } from "@/lib/types";
import React from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Earth, EarthLock, Pencil, Share2, Trash2 } from "lucide-react";

export const HistoryCard = (params: HistoryBar) => {
  return (
    <>
      <Card className="flex flex-col m-4 p-4 rounded-[24px] snap-center bg-transparent backdrop-blur-md">
        <span className="text-base">{params.date}</span>
        <div className="flex flex-col xl:flex-row gap-2 justify-between">
          <h2 className="text-3xl">{params.title}</h2>
          <div className="flex gap-2">
            <Button variant={"secondary"} className="text-black">
              <Share2 />
            </Button>
            <Button>
              <Pencil />
            </Button>
            <Button  variant={'destructive'}>
              <Trash2 />
            </Button>
          </div>
        </div>
        <div className="flex flex-row justify-between mt-2">
          {params.about}
          <span className="p-3 rounded-[24px] text-base">
            {params.visibility === "public" ? <Earth /> : <EarthLock />}
          </span>
        </div>
      </Card>
    </>
  );
};
