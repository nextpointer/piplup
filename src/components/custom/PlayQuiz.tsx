"use client";
import { useRouter } from "next/navigation";
import { useAtom } from "jotai";
import { Card } from "../ui/card";
import React from "react";
import { Button } from "../ui/button";
import { disableAtom, isCorrectAtom, questionNoAtom, result, selectedOptionAtom } from "@/app/store/atom";
import { IncomingQuizData, OptionData } from "@/lib/types";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle } from "lucide-react";

// Atoms for state management

const MotionButton = motion(Button);

interface PlayQuizProps {
  quiz: IncomingQuizData | undefined | null;
}

const PlayQuiz: React.FC<PlayQuizProps> = ({ quiz }) => {
  const [questionNo, setQuestionNo] = useAtom(questionNoAtom);
  const [selectedOption, setSelectedOption] = useAtom(selectedOptionAtom);
  const [, setIsCorrect] = useAtom(isCorrectAtom);
  const [buttonDisable, setButtonDisable] = useAtom(disableAtom);
  const [_, setUserResult] = useAtom(result);
  const router = useRouter();

  if (!quiz || !quiz.QuestionTable.length) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex-center h-[50vh]"
      >
        <p className="text-muted-foreground/80 text-lg font-medium">
          No questions available for this quiz
        </p>
      </motion.div>
    );
  }

  const currentQuestion = quiz.QuestionTable[questionNo];
  const progressValue = (questionNo / quiz.QuestionTable.length) * 100;

  const handleOptionSelect = (option: OptionData) => {
    setButtonDisable(true);
    setSelectedOption(option.label);
    setIsCorrect(option.isCorrect);
    setUserResult((prev) => [...prev, option.isCorrect]);

    setTimeout(() => {
      if (questionNo + 1 === quiz.QuestionTable.length) {
        router.push(`/quiz/result/${quiz.id}`);
      } else {
        setQuestionNo(questionNo + 1);
        setSelectedOption(null);
      }
      setButtonDisable(false);
    }, 1500);
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 md:px-8">
      <div className="relative mb-8">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progressValue}%` }}
          transition={{ duration: 0.5 }}
          className="h-2 bg-primary rounded-full"
        />
        <div className="absolute top-4 right-0 text-sm text-muted-foreground">
          {questionNo + 1}/{quiz.QuestionTable.length}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={questionNo}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="p-6 md:p-8 space-y-6 shadow-lg rounded-2xl">
            <motion.h1 
              className="text-2xl md:text-3xl font-bold text-center mb-8"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
            >
              {currentQuestion.title}
            </motion.h1>

            <div className="grid gap-4">
              {currentQuestion.OptionTable.map((option, index) => (
                <MotionButton
                  key={option.label}
                  disabled={buttonDisable}
                  onClick={() => handleOptionSelect(option)}
                  variant="outline"
                  className={`h-auto min-h-[60px] py-4 text-lg 
                    justify-start text-left whitespace-normal
                    ${selectedOption === option.label ? 
                      (option.isCorrect 
                        ? "border-green-500 bg-green-50" 
                        : "border-red-500 bg-red-50") : ""}
                  `}
                  initial={{ scale: 1 }}
                  whileHover={{ scale: selectedOption ? 1 : 1.02 }}
                  whileTap={{ scale: selectedOption ? 1 : 0.98 }}
                >
                  <div className="flex items-center w-full gap-4">
                    <div className={`w-6 h-6 rounded-full flex-center 
                      ${selectedOption === option.label ? 
                        (option.isCorrect ? "bg-green-500" : "bg-red-500") : 
                        "bg-muted"}`}>
                      {selectedOption === option.label && (
                        option.isCorrect ? (
                          <CheckCircle2 className="h-4 w-4 text-white" />
                        ) : (
                          <XCircle className="h-4 w-4 text-white" />
                        )
                      )}
                    </div>
                    <span className="flex-1">{option.label}</span>
                  </div>
                </MotionButton>
              ))}
            </div>
          </Card>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default PlayQuiz;