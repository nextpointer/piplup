"use server"
import { db } from "..";

export async function getAllQuizzes() {
    try {
      // Fetch all quizzes with related questions & options in one query
      const quizzes = await db.query.QuizTable.findMany({
        with: {
          UserTable: true, // Include user details (quiz creator)
          QuestionTable: {
            with: {
              OptionTable: true, // Include options for each question
            },
          },
        },
      });
  
      return { success: true, quizzes };
    } catch (error) {
      console.error("Error fetching quizzes:", error);
      return { success: false, message: "Failed to fetch quizzes" };
    }
  }