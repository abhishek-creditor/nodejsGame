-- DropForeignKey
ALTER TABLE "user_answer" DROP CONSTRAINT "user_answer_userId_fkey";

-- DropForeignKey
ALTER TABLE "user_section_progress" DROP CONSTRAINT "user_section_progress_userId_fkey";

-- AddForeignKey
ALTER TABLE "user_answer" ADD CONSTRAINT "user_answer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_section_progress" ADD CONSTRAINT "user_section_progress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
