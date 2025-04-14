"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { UploadCloud, Trash2, Info } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { inserQuiz } from "@/app/db/queries/insert";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAtom } from "jotai";
import { TrendingTopicState } from "@/app/store/atom";

const quizSchema = z.object({
  prompt: z.string().min(5, "Prompt must be at least 5 characters"),
  numQuestions: z.number().min(1).max(50),
  difficulty: z.enum(["Easy", "Medium", "Hard"]),
  file: z
    .instanceof(File)
    .nullable()
    .optional()
    .refine((file) => {
      if (!file) return true; // Optional field
      return file.type === "application/pdf";
    }, "Only PDF files are allowed")
    .refine((file) => {
      if (!file) return true; // Optional field
      return file.size <= 5 * 1024 * 
      1024; // 5MB limit
    }, "File size must be less than 5MB"),
});

type QuizFormType = z.infer<typeof quizSchema>;

const AIQuizForm = () => {
  const [fileName, setFileName] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [isloading, setLoading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [quizId, setQuizId] = useState<string | undefined | null>(null);
  const [trendingTopic, setTrendingTopic] = useAtom<string>(TrendingTopicState);

  const form = useForm<QuizFormType>({
    resolver: zodResolver(quizSchema),
    defaultValues: {
      numQuestions: 10,
      difficulty: "Medium",
      file: null,
      prompt: trendingTopic,
    },
  });

  // Add this effect to update when trendingTopic changes
  useEffect(() => {
    if (trendingTopic) {
      form.setValue("prompt", trendingTopic);
    }
  }, [trendingTopic, form]);

  const router = useRouter();

  const onSubmit = async (data: QuizFormType) => {
    setLoading(true);
    console.log("Form Data:", data);
    try {
      const formData = new FormData();

      // Append all fields to FormData
      formData.append("prompt", data.prompt);
      formData.append("numQuestions", data.numQuestions.toString());
      formData.append("difficulty", data.difficulty);
      if (data.file) {
        formData.append("file", data.file); // Append the file if it exists
      }

      const response = await fetch("/api/quiz/generate", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        toast.warning("Network response was not ok");
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      if (result.error) {
        toast.warning(result.error);
      } else {
        const insertResponse = await inserQuiz(result);
        toast.success("Quiz Created Successfully");
        // redirecting the quiz edit section
        // router.push(`/quiz/${insertResponse.id}`);
        setQuizId(insertResponse?.id);
        setShowPopup(true);
      }
    } catch (e) {
      console.error("Error submitting form:", e);
      toast.error("Failed to create quiz");
    } finally {
      setLoading(false);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragActive(false);
    const file = event.dataTransfer.files?.[0];
    if (file) {
      if (file.type !== "application/pdf") {
        form.setError("file", { message: "Only PDF files are allowed" });
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        form.setError("file", { message: "File size must be less than 5MB" });
        return;
      }
      form.setValue("file", file);
      setFileName(file.name);
      form.clearErrors("file");
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type !== "application/pdf") {
        form.setError("file", { message: "Only PDF files are allowed" });
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        form.setError("file", { message: "File size must be less than 5MB" });
        return;
      }
      form.setValue("file", file);
      setFileName(file.name);
      form.clearErrors("file");
    }
  };

  const handleRemoveFile = () => {
    form.setValue("file", null);
    setFileName(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleEditQuiz = () => {
    if (quizId) {
      router.push(`/quiz/${quizId}`);
    }
  };

  const handleGoToDashboard = () => {
    router.push("/dashboard");
    window.location.reload();
  };

  return (
    <DialogContent className="sm:max-w-[525px]">
      <DialogHeader>
        <DialogTitle>Create Quiz with AI</DialogTitle>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="prompt"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Prompt</FormLabel>
                <FormControl>
                  <Input placeholder="Enter quiz topic..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="numQuestions"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Number of Questions</FormLabel>
                <FormControl>
                  <Slider
                    min={1}
                    max={20}
                    value={[field.value]}
                    onValueChange={(value) => field.onChange(value[0])}
                  />
                </FormControl>
                <FormDescription>
                  Selected: {form.watch("numQuestions")} questions
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="difficulty"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Difficulty Level</FormLabel>
                <RadioGroup
                  value={field.value}
                  onValueChange={field.onChange}
                  className="flex gap-4"
                >
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="Easy" id="easy" />
                    <FormLabel htmlFor="easy" className="font-normal">
                      Easy
                    </FormLabel>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="Medium" id="medium" />
                    <FormLabel htmlFor="medium" className="font-normal">
                      Medium
                    </FormLabel>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="Hard" id="hard" />
                    <FormLabel htmlFor="hard" className="font-normal">
                      Hard
                    </FormLabel>
                  </div>
                </RadioGroup>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Drag and Drop File Upload */}
          <FormField
            control={form.control}
            name="file"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Upload File (optional)</FormLabel>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger type="button" className="cursor-help ">
                      <Info className="h-4 w-4 text-gray-500 translate-y-1 translate-x-2" />
                    </TooltipTrigger>
                    <TooltipContent
                      className="max-w-[260px] p-4 bg-white border border-gray-200 shadow-lg rounded-[24px]"
                      side="right"
                    >
                      <span className="text-sm text-gray-700">
                        For best results:
                        <ul className="list-disc pl-4 mt-2 space-y-1">
                          <li>Use text-heavy PDFs</li>
                          <li>Under 10 pages</li>
                          <li>Avoid image-based content</li>
                        </ul>
                      </span>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <FormControl>
                  <div
                    className={`border-2 border-dashed p-6 rounded-lg text-center cursor-pointer ${
                      dragActive
                        ? "border-blue-500 bg-blue-100"
                        : "border-gray-300"
                    }`}
                    onDragOver={(e) => {
                      e.preventDefault();
                      setDragActive(true);
                    }}
                    onDragLeave={() => setDragActive(false)}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      className="hidden"
                      accept="application/pdf"
                      onChange={handleFileSelect}
                    />
                    <UploadCloud className="mx-auto text-gray-500" />
                    <p className="text-sm text-gray-500">
                      Drag & drop a file here or click to select
                    </p>
                    {fileName && (
                      <div className="mt-2 flex items-center justify-center gap-2">
                        <p className="text-gray-700 font-medium">{fileName}</p>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={handleRemoveFile}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <DialogFooter>
            <Button
              type="submit"
              className="bg-gradient-to-r from-primary to-accent text-white w-full"
            >
              {!isloading ?<><div className="loader mr-2"></div> Generating....</> : "Generate Quiz"}
            </Button>
          </DialogFooter>
        </form>
      </Form>
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-[24px] shadow-lg">
            <h2 className="text-lg font-semibold mb-4">
              Quiz Created Successfully!
            </h2>
            <p className="mb-4">Do you want to edit the quiz now?</p>
            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={handleGoToDashboard}
              >
                No
              </Button>
              <Button
                type="button"
                className="bg-gradient-to-r from-primary to-accent text-white"
                onClick={handleEditQuiz}
              >
                Yes,Go
              </Button>
            </div>
          </div>
        </div>
      )}
    </DialogContent>
  );
};

export default AIQuizForm;
