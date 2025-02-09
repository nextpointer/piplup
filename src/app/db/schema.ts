import { relations } from 'drizzle-orm'
import { pgTable, uuid ,text, timestamp, boolean} from 'drizzle-orm/pg-core'

// create the table of Users
export const UserTable = pgTable('users',{
    id:uuid().primaryKey().defaultRandom(),
    username : text('username').unique().notNull(),
    created_At:timestamp('created_At').notNull().defaultNow(),
    updatedAt: timestamp('updated_at')
    .notNull()
    .$onUpdate(() => new Date()),
})

// relation of user and quiz
export const UserToQuizRelation = relations(UserTable,({many})=>({
    QuizTable:many(QuizTable)
}))

// create the table of Quizes
export const QuizTable = pgTable('quizes',{
    id:uuid().primaryKey().defaultRandom(),
    userId: uuid().notNull().references(()=>UserTable.id),
    title : text('title').notNull(),
    about : text('description').notNull(),
    visibility: text('visibility').notNull(),
    difficulty:text('difficulty').notNull().default("Medium"),
    created_At:timestamp('created_At').notNull().defaultNow(),
    updatedAt: timestamp('updated_at')
    .notNull()
    .$onUpdate(() => new Date()),
})

// relation of quiz and user
export const QuizToUserRelation = relations(QuizTable, ({ one }) => ({
    UserTable: one(UserTable, {
      fields: [QuizTable.userId],
      references: [UserTable.id],
    }),
  }));

// relation of quiz and question
export const QuizToQuestionRelation = relations(QuizTable,({many})=>({
    QuestionTable:many(QuestionTable)
}))

// create the table of Questions
export const QuestionTable = pgTable('questions',{
    id:uuid().primaryKey().defaultRandom(),
    quizId: uuid().notNull().references(()=>QuizTable.id),
    title : text('title').notNull(),
    created_At:timestamp('created_At').notNull().defaultNow(),
    updatedAt: timestamp('updated_at')
    .notNull()
    .$onUpdate(() => new Date()),
})

// relation of question and quiz
export const QuestionToQuizRelation = relations(QuestionTable,({one})=>({
    QuizTable:one(QuizTable,{
        fields:[QuestionTable.quizId],
        references:[QuizTable.id]
    })
}))

// relation of question and option
export const QuestionToOptionRelation = relations(QuestionTable,({many})=>({
    OptionTable:many(OptionTable)
}))

// create the table of Option
export const OptionTable = pgTable('options',{
    id:uuid().primaryKey().defaultRandom(),
    questionId: uuid().notNull().references(()=>QuestionTable.id),
    label : text('title').notNull(),
    isCorrect : boolean('isCorrect').notNull(),
    created_At:timestamp('created_At').notNull().defaultNow(),
    updatedAt: timestamp('updated_at')
    .notNull()
    .$onUpdate(() => new Date()),
})

// relation of option and question
export const OptionToQuestionRelation = relations(OptionTable, ({ one }) => ({
    QuestionTable: one(QuestionTable, {
      fields: [OptionTable.questionId],
      references: [QuestionTable.id],
    }),
  }));

// relation of user and partcipation
export const UserToParticipationRelation = relations(UserTable,({many})=>({
    ParticipationTable:many(PartcipationTable)
}))

// create the participation table 
export const PartcipationTable = pgTable('participations',{
    id:uuid().primaryKey().defaultRandom(),
    userId: uuid().notNull().references(()=>UserTable.id),
    quizId: uuid().notNull().references(()=>QuizTable.id),
    score : text('score').notNull(),
    noOfQuestion: text('noOfQuestion').notNull(),
    created_At:timestamp('created_At').notNull().defaultNow(),  
    updatedAt: timestamp('updated_at')
    .notNull()
    .$onUpdate(() => new Date()),
})

// relation of participation and user
export const ParticipationToUserRelation = relations(PartcipationTable,({one})=>({
    UserTable:one(UserTable,{
        fields:[PartcipationTable.userId],
        references:[UserTable.id]
    })
}))

// type declaration
export type InsertUser = typeof UserTable.$inferInsert.username;