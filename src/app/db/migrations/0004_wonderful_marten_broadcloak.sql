ALTER TABLE "options" DROP CONSTRAINT "options_questionId_questions_id_fk";
--> statement-breakpoint
ALTER TABLE "participations" DROP CONSTRAINT "participations_userId_users_id_fk";
--> statement-breakpoint
ALTER TABLE "participations" DROP CONSTRAINT "participations_quizId_quizes_id_fk";
--> statement-breakpoint
ALTER TABLE "questions" DROP CONSTRAINT "questions_quizId_quizes_id_fk";
--> statement-breakpoint
ALTER TABLE "quizes" DROP CONSTRAINT "quizes_userId_users_id_fk";
--> statement-breakpoint
ALTER TABLE "options" ADD CONSTRAINT "options_questionId_questions_id_fk" FOREIGN KEY ("questionId") REFERENCES "public"."questions"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "participations" ADD CONSTRAINT "participations_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "participations" ADD CONSTRAINT "participations_quizId_quizes_id_fk" FOREIGN KEY ("quizId") REFERENCES "public"."quizes"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "questions" ADD CONSTRAINT "questions_quizId_quizes_id_fk" FOREIGN KEY ("quizId") REFERENCES "public"."quizes"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "quizes" ADD CONSTRAINT "quizes_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE cascade;