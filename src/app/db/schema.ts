import { pgTable, uuid ,text, timestamp, boolean} from 'drizzle-orm/pg-core'

// create the table of Users
export const UserTable = pgTable('users',{
    id:uuid().primaryKey(),
    username : text('username').unique().notNull(),
    created_At:timestamp('created_At').notNull().defaultNow(),
    updatedAt: timestamp('updated_at')
    .notNull()
    .$onUpdate(() => new Date()),
})

// create the table of Quizes
export const QuizTable = pgTable('quizes',{
    id:uuid().primaryKey(),
    userId: uuid().notNull().references(()=>UserTable.id),
    title : text('title').notNull(),
    about : text('description').notNull(),
    created_At:timestamp('created_At').notNull().defaultNow(),
    updatedAt: timestamp('updated_at')
    .notNull()
    .$onUpdate(() => new Date()),
})

// create the table of Questions
export const QuestionTable = pgTable('questions',{
    id:uuid().primaryKey(),
    quizId: uuid().notNull().references(()=>QuizTable.id),
    title : text('title').notNull(),
    created_At:timestamp('created_At').notNull().defaultNow(),
    updatedAt: timestamp('updated_at')
    .notNull()
    .$onUpdate(() => new Date()),
})

// create the table of Option
export const OptionTable = pgTable('options',{
    id:uuid().primaryKey(),
    questionId: uuid().notNull().references(()=>QuestionTable.id),
    label : text('title').notNull(),
    isCorrect : boolean('isCorrect').notNull(),
    created_At:timestamp('created_At').notNull().defaultNow(),
    updatedAt: timestamp('updated_at')
    .notNull()
    .$onUpdate(() => new Date()),
})