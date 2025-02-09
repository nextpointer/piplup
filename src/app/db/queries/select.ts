"use server";
import { db } from "..";
import { getSession } from "@auth0/nextjs-auth0";
import { QuizTable, UserTable } from "../schema";
// import { QuestionTable, QuizTable } from "../schema";
// import { eq } from "drizzle-orm";

export async function getAllDetailsOfUser() {
  try {
    const session = await getSession();

    if (!session) {
      throw new Error(`Requires authentication`);
    }
    const { user } = session;
    // Step 1: Get userId from username
    const User = await db.query.UserTable.findFirst({
      where: (User, { eq }) => eq(User.username, user.nickname),
      columns: { id: true }, // Fetch only the userId
    });

    if (!User) {
      return { success: false, message: "User not found" };
    }

    // Step 2: Fetch quizzes where userId matches
    const quizzes = await db.query.QuizTable.findMany({
      where: (quiz, { eq }) => eq(quiz.userId, User.id),
      with: {
        // ParticipationTable: {
        //   with: {
        //     UserTable: true, // Include the user who participated
        //   },
        // },
      },
    });

    return { success: true, quizzes };
  } catch (error) {
    console.log("Error fetching the data", error);
    return { success: false, message: "Failed to fetch quizzes" };
  }
}

// fetching the Quiz Question and Options
export async function getQuestionAndOption(quizId: string) {
  
  try {
    const quizDetails = await db.query.QuizTable.findFirst({
      where: (quizy,{eq})=>eq(quizy.id,quizId),
      with: {
        QuestionTable: {
          with: {
            OptionTable: true,
          },
        },
      },
    });

    // if quiz is not found
    if(!quizDetails){
      return {
        success:false,message :"Quiz not found",quiz:null
      }
    }
    return {
      success:true,quiz:quizDetails
    }
  } catch (error) {
    console.error("Error fetching quiz questions:", error);
    return { success: false, message: "Failed to fetch questions" };
  }
}


// fetching public quizes
export async function getPublicQuizzes() {
  try {
    const quizzesData = await db.query.QuizTable.findMany({
      where: (quizzy,{eq})=>eq(quizzy.visibility,"public"), 
      with: {
        UserTable: {
          columns: {
            username: true,
          },
        },
      },
    });

    if (!quizzesData.length) {
      return { success: true, data: [], message: "No public quizzes found." };
    }

    return { success: true, data: quizzesData };
  } catch (error) {
    console.error("Error fetching public quizzes:", error);
    return { success: false, error: "Failed to fetch public quizzes. Please try again later." };
  }
}
