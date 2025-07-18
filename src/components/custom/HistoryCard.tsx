"use client";

import { HistoryBar } from "@/lib/types";
import React from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import {
  Earth,
  EarthLock,
  Pencil,
  Share2,
  Trash2,
  Calendar,
  AlignLeft,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Copy } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { deleteQuiz } from "@/app/db/queries/delete";

export const HistoryCard = (params: HistoryBar) => {
  const router = useRouter();
  // If there are no quizzes, show a fallback message
  if (!params || Object.keys(params).length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-xl text-gray-500">There is no quiz created 😪</p>
      </div>
    );
  }
  // implement the copy functionality
  const copyToClipboard = () => {
    navigator.clipboard.writeText(
      `https://piplup-quiz.vercel.app/quiz/play/${params.id}`
    );
    toast.success("Link copied to clipboard");
  };

  const deleteTheQuiz = () => {
    deleteQuiz(params.id).then((res) => {
      if (res.success) {
        router.refresh();
        toast.success("Quiz Deleted Successfully");
      } else {
        toast.error("Failed to delete the quiz");
      }
    });
  };
  return (
    <>
      <Card className="flex flex-col m-2 p-4 rounded-[24px] snap-center hover:border hover:border-zinc-500 group">
        <div className="flex flex-row gap-2 justify-start items-center text-zinc-500">
          <Calendar className="h-4 w-4" />
          <span className="text-base">{params.date}</span>
        </div>
        <div className="flex flex-col xl:flex-row gap-2 justify-between">
          <h2 className="text-3xl font-light">{params.title}</h2>
          <div className="flex gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Share2 />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>{params.title} Share Link</DialogTitle>
                  <DialogDescription>
                    Anyone who has this link will be able to play this quiz
                  </DialogDescription>
                </DialogHeader>
                <div className="flex items-center space-x-2">
                  <div className="grid flex-1 gap-2">
                    <Label htmlFor="link" className="sr-only">
                      Link
                    </Label>
                    <Input
                      id="link"
                      defaultValue={`https://piplup-quiz.vercel.app/quiz/play/${params.id}`}
                      readOnly
                    />
                  </div>
                  <Button
                    type="submit"
                    size="sm"
                    className="px-3"
                    onClick={copyToClipboard}
                  >
                    <span className="sr-only">Copy</span>
                    <Copy />
                  </Button>
                </div>
                <DialogFooter className="sm:justify-start">
                  <DialogClose asChild>
                    <Button type="button" variant="outline">
                      Close
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Button
              onClick={() => router.push(`/quiz/${params.id}`)}
              variant="outline"
              className="hover:bg-primary"
            >
              <Pencil />
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="hover:bg-destructive">
                  <Trash2 />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Are you sure to delete it</DialogTitle>
                  <DialogDescription>
                    If you delete this quiz, it will be permanently deleted
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter className="sm:justify-start">
                  <DialogClose asChild>
                    <div className="flex flex-row gap-2">
                      <Button type="button" variant="outline">
                        Close
                      </Button>
                      <Button variant="destructive" onClick={deleteTheQuiz}>
                        Delete
                      </Button>
                    </div>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <div className="flex flex-row justify-between mt-2 ">
          <div className="flex flex-row justify-start items-center gap-2 text-zinc-400">
            <AlignLeft className="h-4 w-4" />
            {params.about}
          </div>
          <span className="p-3 rounded-[24px] text-base">
            {params.visibility === "public" ? <Earth className="group-hover:text-accent opacity-20 group-hover:opacity-100 group-hover:scale-125 transition-transform duration-300 "/> : <EarthLock className="group-hover:text-accent opacity-0 group-hover:opacity-30 group-hover:scale-125 transition-transform duration-300" />}
          </span>
        </div>
      </Card>
    </>
  );
};
