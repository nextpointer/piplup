"use server"
import { db } from "..";
import { QuizDatawithUserAndPartcipant } from "@/lib/types";

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
            //   ParticipationTable: {
            //     with: {
            //       UserTable: true, // Include the user who participated
            //     },
            //   },
            },
          });
      
          return { success: true,  quizzes };
    } catch (error) {
        console.log("Error fetching the data",error);
        
    //   console.error("Error fetching quizzes:", error);
      return { success: false, message: "Failed to fetch quizzes" };
    }
  }