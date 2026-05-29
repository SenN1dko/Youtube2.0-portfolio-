/*
  Warnings:

  - You are about to drop the `VerificationTokens` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[verification_token]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "VerificationTokens" DROP CONSTRAINT "VerificationTokens_user_id_fkey";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "verification_token" TEXT;

-- DropTable
DROP TABLE "VerificationTokens";

-- CreateIndex
CREATE UNIQUE INDEX "users_verification_token_key" ON "users"("verification_token");
