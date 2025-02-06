"use server"
import { db } from "..";

export async function getAllDetailsofUser() {
    try {
        const quizzes = await db.query.QuizTable.findMany({
            with: {
              UserTable: true, // Fetch quiz creator details
              QuestionTable: {
                with: {
                  OptionTable: true, // Fetch options for each question
                },
              },
              ParticipationTable: {
                with: {
                  UserTable: true, // Include the user who participated
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