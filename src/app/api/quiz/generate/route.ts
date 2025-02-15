import { NextRequest, NextResponse } from "next/server";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { HumanMessage } from "@langchain/core/messages";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { z } from "zod";

const formSchema = z.object({
  Title: z
    .string()
    .min(2, { message: "Title must be at least 2 characters." })
    .max(15, { message: "Title maximum length is 15 characters" }),
  About: z.string().max(80, { message: "About maximum length 80 characters." }),
  publicQuiz: z.boolean(),
  difficulty: z.enum(["Easy", "Medium", "Hard"], {
    required_error: "Difficulty is required.",
  }),
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

export async function POST(req: NextRequest) {
    
  try {
    const formData = await req.formData();

    // Extract individual fields
    const prompt = formData.get("prompt") as string;
    const numQuestions = formData.get("numQuestions") as string;
    const difficulty = formData.get("difficulty") as string;
    
    const file = formData.get("file") as File | null;

    // if (!file || file.type !== "application/pdf") {
    //   return NextResponse.json(
    //     { error: "Invalid file format" },
    //     { status: 400 }
    //   );
    // }
    let actualText: string[] = [];
    if (file) {
      // parse the PDF
      const loader = new PDFLoader(file as Blob, {
        parsedItemSeparator: " ",
      });

      const docs = await loader.load();
      const selectedDocument = docs.filter(
        (doc) => doc.pageContent !== undefined
      );
      actualText = selectedDocument.map((doc) => doc.pageContent);
    }
    
    const MAX_TEXT_LENGTH = 10000;

    if (actualText.length > MAX_TEXT_LENGTH) {
      return NextResponse.json(
        {
          error:
            `PDF content too large (${actualText.length} characters). ` +
            `Maximum allowed: ${MAX_TEXT_LENGTH} characters`,
        },
        {
          status: 400,
        }
      );
    }

    // Handle empty PDF content
    if (file && actualText.length === 0) {
      return NextResponse.json(
        { error: "PDF contains no readable text" },
        { status: 400 }
      );
    }


    const QUIZ_GENERATION_PROMPT = `
  Generate a quiz in strict
  Requirements:
  - Topic: ${prompt}
  - Difficulty: ${difficulty}
  - Number of Questions: ${numQuestions}
  - Source Material: "${actualText.join(" ")}"
  
  Question Guidelines:
  ${
    difficulty === "Easy"
      ? `- Direct factual questions
  - Simple true/false or multiple choice`
      : ""
  }
  ${
    difficulty === "Medium"
      ? `- Apply concepts from text
  - Include partial quotes`
      : ""
  } 
  ${
    difficulty === "Hard"
      ? `- Complex scenario-based
  - Require critical analysis`
      : ""
  }
  
  Format Rules:
  - Exactly ${numQuestions} questions
  - 4 options per question
  - Only one correct answer
  - Title length: 15 characters max
  - About section: 40 characters minimum and 80 characters max
  
  Example Structure:
  {
    "Title": "ML Basics",
    "About": "Intro to machine learning about how machine learning works",
    "publicQuiz": true,
    "Questions": [
      {
        "QuestionName": "What is supervised learning?",
        "Options": [
          {"label": "Learning without data", "isCorrect": false},
          {"label": "Learning with labeled datasets", "isCorrect": true},
          ...
        ]
      }
    ]
  }
  
  Return ONLY valid JSON with no additional formatting or text.
  `;

    const model = new ChatGoogleGenerativeAI({
      modelName: "gemini-2.0-flash",
      maxOutputTokens: 2048,
    });
    const input = [
      new HumanMessage({
        content: [
          {
            type: "text",
            text: QUIZ_GENERATION_PROMPT + "\n" + actualText.join(" "),
          },
        ],
      }),
    ];

    const structure = model.withStructuredOutput(formSchema);

    const response = await structure.invoke(input);

    return NextResponse.json(response);
  } catch (error) {
    console.log("Error", error);

    // Handle different error types
    const isClientError =
      error instanceof z.ZodError ||
      (error instanceof Error && error.message.includes("PDF"));
    return NextResponse.json(
      {
        error: "Failed to generate quiz",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      {
        status: isClientError ? 400 : 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
