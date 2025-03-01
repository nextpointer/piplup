"use server"

import { eq } from "drizzle-orm";
import { db } from "..";
import { QuizTable } from "../schema";

export const deleteQuiz = async(quizId:string)=>{
    try {
        await db.delete(QuizTable).where(eq(QuizTable.id,quizId))
        return { success: true };
    } catch (error) {
        console.error("Error deleting quiz:", error);
        return { success: false, message: "Failed to delete quiz" };
    }
}