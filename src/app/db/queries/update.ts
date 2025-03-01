"use server";

import { QuizData } from "@/lib/types";
import { db } from "..";
import {
  UserTable,
  QuizTable,
  QuestionTable,
  OptionTable,
} from "../schema";
import { eq, and } from "drizzle-orm";
import { getSession } from "@auth0/nextjs-auth0";

export async function updateQuiz(quizId: string, quizData: QuizData) {
    console.log("yes coming");
    
  try {
    const session = await getSession();
    if (!session) {
      throw new Error(`Requires authentication`);
    }
    const { user } = session;

    // Fetch user ID
    const [User] = await db
      .select()
      .from(UserTable)
      .where(eq(UserTable.username, user.nickname))
      .limit(1);

    if (!User) {
      return { success: false, message: "User not found" };
    }
    const userId = User.id;

    // Ensure quiz belongs to the user before updating
    const [existingQuiz] = await db
      .select()
      .from(QuizTable)
      .where(and(eq(QuizTable.id, quizId), eq(QuizTable.userId, userId)))
      .limit(1);

    if (!existingQuiz) {
      return { success: false, message: "Quiz not found or unauthorized" };
    }

    // Update quiz data
    await db
      .update(QuizTable)
      .set({
        title: quizData.Title,
        about: quizData.About,
        visibility: quizData.publicQuiz ? "public" : "private",
        difficulty: quizData.difficulty,
      })
      .where(eq(QuizTable.id, quizId));

    // Update existing questions or insert new ones
    for (const q of quizData.Questions) {
      const [existingQuestion] = await db
        .select()
        .from(QuestionTable)
        .where(and(eq(QuestionTable.quizId, quizId), eq(QuestionTable.title, q.QuestionName)))
        .limit(1);

      let questionId = existingQuestion?.id;

      if (existingQuestion) {
        await db
          .update(QuestionTable)
          .set({ title: q.QuestionName })
          .where(eq(QuestionTable.id, questionId));
      } else {
        const [newQuestion] = await db
          .insert(QuestionTable)
          .values({ quizId, title: q.QuestionName })
          .returning({ id: QuestionTable.id });
        questionId = newQuestion.id;
      }

      // Update existing options or insert new ones
      for (const opt of q.Options) {
        const [existingOption] = await db
          .select()
          .from(OptionTable)
          .where(and(eq(OptionTable.questionId, questionId), eq(OptionTable.label, opt.label)))
          .limit(1);

        if (existingOption) {
          await db
            .update(OptionTable)
            .set({ label: opt.label, isCorrect: opt.isCorrect })
            .where(eq(OptionTable.id, existingOption.id));
        } else {
          await db
            .insert(OptionTable)
            .values({ questionId, label: opt.label, isCorrect: opt.isCorrect });
        }
      }
    }

    return { success: true, message: "Quiz updated successfully!", id: quizId };
  } catch (e) {
    console.error("Error updating quiz:", e);
    return { success: false, message: "Failed to update quiz" };
  }
}