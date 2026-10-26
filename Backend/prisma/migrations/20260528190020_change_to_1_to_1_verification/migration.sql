/*
  Warnings:

  - You are about to drop the column `is_verified` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_id]` on the table `VerificationTokens` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "is_verified";

-- CreateIndex
CREATE UNIQUE INDEX "VerificationTokens_user_id_key" ON "VerificationTokens"("user_id");
