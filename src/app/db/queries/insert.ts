import { db } from "..";
import { UserTable,InsertUser } from "../schema";


// insert user
export async function insertUser(username:InsertUser) {
    await db.insert(UserTable).values({username});
}