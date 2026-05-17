/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Videos` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `Videos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `thumbnailUrl` to the `Videos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `videoFileName` to the `Videos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Videos" ADD COLUMN     "isPublic" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "slug" TEXT NOT NULL,
ADD COLUMN     "thumbnailUrl" TEXT NOT NULL,
ADD COLUMN     "videoFileName" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Videos_slug_key" ON "Videos"("slug");
