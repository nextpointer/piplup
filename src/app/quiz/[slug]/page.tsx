"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import React from "react";
import { X, Trash2, CirclePlus } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card } from "@/components/ui/card";
import { inserQuiz } from "@/app/db/queries/insert";
import { useUser } from "@auth0/nextjs-auth0/client";

const formSchema = z.object({
  Title: z
    .string()
    .min(2, { message: "Title must be at least 2 characters." })
    .max(15, { message: "Title maximum length is 15 characters" }),
  About: z.string().max(30, { message: "About maximum length 40 characters." }),
  publicQuiz: z.boolean(),
  Questions: z.array(
    z.object({
      QuestionName: z
        .string()
        .min(1, { message: "Question Name is required." }),
      Options: z.array(
        z.object({
          label: z.string().min(1, { message: "Option label is required." }),
          isCorrect: z.boolean(),
        })
      ),
    })
  ).min(1, { message: "At least one question is required." }),
});

const QuestionItem = ({ control, index, remove }: { control: any; index: number; remove: () => void }) => {
  const { fields: optionFields, append: appendOption, remove: removeOption } = useFieldArray({
    control,
    name: `Questions.${index}.Options`,
  });

  return (
    <Card className="p-4 mb-4 relative">
      <FormField
        control={control}
        name={`Questions.${index}.QuestionName`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Question No {index + 1}</FormLabel>
            <FormControl>
              <Input
                placeholder="Enter question Name"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <h3 className="font-bold mt-4">Options</h3>
      {optionFields.map((option, optionIndex) => (
        <div
          key={option.id}
          className="flex items-center gap-4 mt-2 ml-4"
        >
          <FormControl>
            <Input
              {...control.register(
                `Questions.${index}.Options.${optionIndex}.label`
              )}
              placeholder="Option Label"
            />
          </FormControl>
          <FormControl>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                {...control.register(
                  `Questions.${index}.Options.${optionIndex}.isCorrect`
                )}
              />
              Correct
            </label>
          </FormControl>
          <Button
            type="button"
            variant="destructive"
            onClick={() => removeOption(optionIndex)}
          >
            <X />
          </Button>
        </div>
      ))}
      <Button
        type="button"
        className="mt-4 ml-4 mr-1 bg-secondary text-black"
        onClick={() => appendOption({ label: "", isCorrect: false })}
      >
        <CirclePlus />
      </Button>
      <Button
        type="button"
        variant="destructive"
        className="mt-4 ml-1 absolute right-0 mr-4"
        onClick={remove}
      >
        <Trash2 />
      </Button>
    </Card>
  );
};

const Page = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Title: "",
      About: "",
      publicQuiz: false,
      Questions: [
        {
          QuestionName: "",
          Options: [{ label: "", isCorrect: false }],
        },
      ],
    },
  });

  const {
    fields: questionFields,
    append: appendQuestion,
    remove: removeQuestion,
  } = useFieldArray({
    control: form.control,
    name: "Questions",
  });

  // fetching nickname from user
  const { user } = useUser();
  const nickname = user?.nickname;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    if (nickname) {
      await inserQuiz(values);
      alert("Quiz created successfully");
    } else {
      console.error("Nickname is undefined");
      alert("Failed to create quiz");
    }
  };

  return (
    <main className="pt-12">
      <Card className="p-4 w-full xl:w-[50%] overflow-y-scroll max-h-[85vh] relative no-scrollbar">
        <h2 className="text-2xl font-bold ">About Quiz Topic</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <Card className="p-4 mt-4">
              <FormField
                control={form.control}
                name="Title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Current Affairs" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="About"
                render={({ field }) => (
                  <FormItem className="mt-2">
                    <FormLabel>About</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="This is all about current affairs"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </Card>

            <h2 className="text-2xl font-bold ">Questions</h2>
            {questionFields.map((question, questionIndex) => (
              <QuestionItem
                key={question.id}
                control={form.control}
                index={questionIndex}
                remove={() => removeQuestion(questionIndex)}
              />
            ))}
            
            <FormField
              control={form.control}
              name="publicQuiz"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-[24px] border p-4 shadow">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Add it as a public quiz</FormLabel>
                  </div>
                </FormItem>
              )}
            />

            <Button
              type="button"
              className="mt-4 bg-secondary text-black"
              onClick={() =>
                appendQuestion({
                  QuestionName: "",
                  Options: [{ label: "", isCorrect: false }],
                })
              }
            >
              Add Question
            </Button>
            <Button type="submit" className="mt-8 mr-4 absolute right-0 ">
              Submit
            </Button>
          </form>
        </Form>
      </Card>
    </main>
  );
};

export default Page;