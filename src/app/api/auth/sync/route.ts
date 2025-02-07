import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/app/db";
import {UserTable } from "@/app/db/schema";
import { insertUser } from "@/app/db/queries/insert";



export async function POST(req: Request) {
  try {
    // Ensure it's a POST request
    if (req.method !== "POST") {
      return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
    }

    // Parse request body
    const body = await req.json();
    const { nickname } = body;

    // Validate required fields
    if (nickname === undefined) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Check if the user exists
    const existingUser = await db.select().from(UserTable).where(eq(UserTable.username, nickname)).limit(1);
    console.log("existing user:",existingUser);
    

    if (existingUser.length === 0) {
      // Insert new user
      await insertUser(nickname);
      
    }

    return NextResponse.json({ message: "User synced successfully" }, { status: 200 });
  } catch (error) {
    console.error("Sync Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
