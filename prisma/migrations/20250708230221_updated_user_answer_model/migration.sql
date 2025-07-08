/*
  Warnings:

  - A unique constraint covering the columns `[userId,questionId]` on the table `user_answer` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "user_answer_userId_questionId_key" ON "user_answer"("userId", "questionId");
