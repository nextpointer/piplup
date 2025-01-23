"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import React from "react";
import { X ,Trash2,CirclePlus} from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card } from "@/components/ui/card";

const formSchema = z.object({
  Title: z
    .string()
    .min(2, { message: "Title must be at least 2 characters." })
    .max(15, { message: "Title maximum length is 15 characters" }),
  About: z
    .string()
    .max(30, { message: "About maximum length 30 characters." }),
  Questions: z.array(
    z.object({
      QuestionName: z.string().min(1, { message: "Question Name is required." }),
      Options: z.array(
        z.object({
          label: z.string().min(1, { message: "Option label is required." }),
          isCorrect: z.boolean(),
        })
      ),
    })
  ),
});

const page = () => {
    
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Title: "",
      About: "",
      Questions: [
        {
          QuestionName: "",
          Options: [{ label: "", isCorrect: false }],
        },
      ],
    },
  });

  const { fields: questionFields, append: appendQuestion, remove: removeQuestion } =
    useFieldArray({
      control: form.control,
      name: "Questions",
    });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.table(values);
  };

  return (
    <>
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
                <Card key={question.id} className="p-4 mb-4 relative ">
                  <FormField
                    control={form.control}
                    name={`Questions.${questionIndex}.QuestionName`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Question No {questionIndex + 1} </FormLabel>
                        <FormControl>
                          <Input placeholder="Enter question Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <h3 className="font-bold mt-4">Options</h3>
                  <FormField
                    control={form.control}
                    name={`Questions.${questionIndex}.Options`}
                    render={() => (
                      <>
                        {form
                          .getValues(`Questions.${questionIndex}.Options`)
                          .map((_, optionIndex) => (
                            <div
                              key={optionIndex}
                              className="flex items-center gap-4 mt-2 ml-4"
                            >
                              <FormControl>
                                <Input
                                  {...form.register(
                                    `Questions.${questionIndex}.Options.${optionIndex}.label`
                                  )}
                                  placeholder="Option Label"
                                />
                              </FormControl>
                              <FormControl>
                                <label className="flex items-center gap-2">
                                  <input
                                    type="checkbox"
                                    {...form.register(
                                      `Questions.${questionIndex}.Options.${optionIndex}.isCorrect`
                                    )}
                                  />
                                </label>
                              </FormControl>
                              <Button
                                type="button"
                                variant="destructive"
                                onClick={() =>
                                  form.setValue(
                                    `Questions.${questionIndex}.Options`,
                                    form
                                      .getValues(
                                        `Questions.${questionIndex}.Options`
                                      )
                                      .filter((_, idx) => idx !== optionIndex)
                                  )
                                }
                              >
                                <X/>
                              </Button>
                            </div>
                          ))}
                        <Button
                          type="button"
                          className="mt-4 ml-4 mr-1 bg-secondary text-black"
                          onClick={() =>
                            form.setValue(
                              `Questions.${questionIndex}.Options`,
                              [
                                ...form.getValues(
                                  `Questions.${questionIndex}.Options`
                                ),
                                { label: "", isCorrect: false },
                              ]
                            )
                          }
                        >
                          <CirclePlus/>
                        </Button>
                      </>
                    )}
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    className="mt-4 ml-1 absolute right-0 mr-4"
                    onClick={() => removeQuestion(questionIndex)}
                  >
                    <Trash2/>
                  </Button>
                </Card>
              ))}
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
    </>
  );
};

export default page;
