"use client";

import { HistoryBar } from "@/lib/types";
import React from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Earth, EarthLock, Pencil, Share2, Trash2 } from "lucide-react";
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

export const HistoryCard = (params: HistoryBar) => {
  const router = useRouter();
  // implement the copy functionality
  const copyToClipboard = () => {
    navigator.clipboard.writeText(
      `http://localhost:3000/quiz/play/${params.id}`
    );
    toast.success("Link copied to clipboard");
  };
  return (
    <>
      <Card className="flex flex-col m-4 p-4 rounded-[24px] snap-center bg-transparent backdrop-blur-md">
        <span className="text-base">{params.date}</span>
        <div className="flex flex-col xl:flex-row gap-2 justify-between">
          <h2 className="text-3xl">{params.title}</h2>
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
                      defaultValue={`http://localhost:3000/quiz/play/${params.id}`}
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
                      <Button
                        variant="destructive"
                        onClick={() =>
                          toast.success("Quiz deleted successfully")
                        }
                      >
                        Delete
                      </Button>
                    </div>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
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
