"use server";
import { db } from "..";
import { getSession } from "@auth0/nextjs-auth0";

export async function getAllDetailsOfUser() {
  const session = await getSession();

  if (!session) {
    throw new Error(`Requires authentication`);
  }
  const { user } = session;

  try {
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
