ALTER TABLE "participations" DROP CONSTRAINT "participations_quizId_quizes_id_fk";
--> statement-breakpoint
ALTER TABLE "participations" ADD COLUMN "accuracy" text NOT NULL;--> statement-breakpoint
ALTER TABLE "participations" DROP COLUMN "quizId";--> statement-breakpoint
ALTER TABLE "participations" DROP COLUMN "score";--> statement-breakpoint
ALTER TABLE "participations" DROP COLUMN "noOfQuestion";