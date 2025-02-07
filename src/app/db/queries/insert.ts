"use server";

import { QuizData } from "@/lib/types";
import { db } from "..";
import {
  UserTable,
  InsertUser,
  QuizTable,
  QuestionTable,
  OptionTable,
} from "../schema";
import { eq } from "drizzle-orm";
import { getSession } from "@auth0/nextjs-auth0";

// insert user
export async function insertUser(username: InsertUser) {
  await db.insert(UserTable).values({ username });
}

// insert quiz data
export async function inserQuiz(quizData: QuizData) {
  try {
    const session = await getSession();

    if (!session) {
      throw new Error(`Requires authentication`);
    }
    const { user } = session;
    // fetch the userID
    const [User] = await db
      .select()
      .from(UserTable)
      .where(eq(UserTable.username, user.nickname))
      .limit(1);
    // if the user is not found
    if (!User) {
      return { success: false, message: "User not found" };
    }
    const userId = User.id;
    // inserting quiz data and getting the quizId
    const [quiz] = await db
      .insert(QuizTable)
      .values({
        userId,
        title: quizData.Title,
        about: quizData.About,
        visibility: quizData.publicQuiz ? "public" : "private",
        shareLink: "",
      })
      .returning({
        id: QuizTable.id,
      });
    if (!quiz) {
      throw new Error("Failed to insert quiz");
    }
    //if the quiz is not found
    const quizId = quiz.id;
    // update quizId

    // inserting questions and getting questionId
    const questionValues = quizData.Questions.map((q) => ({
      quizId,
      title: q.QuestionName,
    }));

    const insertedQuestions = await db
      .insert(QuestionTable)
      .values(questionValues)
      .returning({ id: QuestionTable.id });

    //   mapping the options with the questionId

    const optionValues = quizData.Questions.flatMap((q, index) =>
      q.Options.map((opt) => ({
        questionId: insertedQuestions[index].id, // Assign corresponding question ID
        label: opt.label,
        isCorrect: opt.isCorrect,
      }))
    );

    // inserting options
    if (optionValues.length > 0) {
      await db.insert(OptionTable).values(optionValues);
    }

    return { success: true, message: "Quiz inserted successfully!" };
  } catch (e) {
    console.error("Error inserting quiz:", e);
    return { success: false, message: "Failed to insert quiz" };
  }
}
