/*
  Warnings:

  - You are about to drop the column `slug` on the `Videos` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[public_id]` on the table `Videos` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `public_id` to the `Videos` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Videos_slug_key";

-- AlterTable
ALTER TABLE "Videos" DROP COLUMN "slug",
ADD COLUMN     "public_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Videos_public_id_key" ON "Videos"("public_id");
