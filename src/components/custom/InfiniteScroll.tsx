"use client";
import { useAtom } from "jotai";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import AIQuizForm from "./AIForm";
import { TrendingTopicState } from "@/app/store/atom";
import { useState } from "react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

const leftScrollTopics = [
  "Tech Innovations",
  "AI Breakthroughs",
  "Space Exploration",
  "Scientific Discoveries",
  "Coding Tutorials",
  "Developer Tools",
  "Cybersecurity Alerts",
  "Blockchain News",
];

const rightScrollTopics = [
  "Celebrity Gossip",
  "Box Office Hits",
  "Music Charts",
  "TV Show Updates",
  "Travel Destinations",
  "Fashion Trends",
  "Sports Highlights",
  "Gaming News",
];

interface Ctype {
  type: "left" | "right";
}

const InfiniteScroll = (prop: Ctype) => {
  const [_, setTrendingTopic] = useAtom<string>(TrendingTopicState);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const clickToOpenAI = (value: string) => {
    setTrendingTopic(value);
    setIsDialogOpen(true);
  };
  const correctAnimation = {
    left: {
      animation: "animate-infinite-scroll-left",
      arrayName: leftScrollTopics,
    },
    right: {
      animation: "animate-infinite-scroll-right",
      arrayName: rightScrollTopics,
    },
  };

  return (
    <>
      <div className="relative h-12 w-full overflow-hidden group">
        {/* Gradient fade edges */}
        <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-background via-background to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-background via-background to-transparent z-10 pointer-events-none" />

        {/* Duplicated items for seamless looping */}
        <div
          className={`absolute h-full flex items-center ${
            correctAnimation[prop.type].animation
          } whitespace-nowrap animate-infinite-scroll`}
        >
          {[
            ...correctAnimation[prop.type].arrayName,
            ...correctAnimation[prop.type].arrayName,
          ].map((topic, index) => (
            <div key={`${topic}-${index}`} className="inline-flex mx-1">
              <button
                className="h-10 px-6 bg-foreground hover:bg-gray-400 text-background text-sm font-medium rounded-full transition-all duration-300 shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
                onClick={() => clickToOpenAI(topic)}
              >
                {topic}
              </button>
            </div>
          ))}
        </div>
      </div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <VisuallyHidden asChild>
              <DialogTitle>AI Quiz Generator</DialogTitle>
            </VisuallyHidden>
          </DialogHeader>
          <AIQuizForm />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default InfiniteScroll;
