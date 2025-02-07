"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState, useRef } from "react";

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
import { UploadCloud, Trash2 } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const quizSchema = z.object({
  prompt: z.string().min(5, "Prompt must be at least 5 characters"),
  numQuestions: z.number().min(1).max(50),
  difficulty: z.enum(["Easy", "Medium", "Hard"]),
  file: z.instanceof(File).nullable().optional(),
});

type QuizFormType = z.infer<typeof quizSchema>;

const AIQuizForm = () => {
  const [fileName, setFileName] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<QuizFormType>({
    resolver: zodResolver(quizSchema),
    defaultValues: {
      numQuestions: 10,
      difficulty: "Medium",
      file: null,
      prompt: "",
    },
  });

  const onSubmit = (data: QuizFormType) => {
    console.log("Form Data:", data);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragActive(false);
    const file = event.dataTransfer.files?.[0];
    if (file) {
      form.setValue("file", file);
      setFileName(file.name);
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      form.setValue("file", file);
      setFileName(file.name);
    }
  };

  const handleRemoveFile = () => {
    form.setValue("file", null);
    setFileName(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
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
                      accept=".txt,.pdf,.doc,.docx"
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
              Generate Quiz
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
};

export default AIQuizForm;
