/*
  Warnings:

  - Added the required column `text` to the `Comments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Comments" ADD COLUMN     "text" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Videos" ADD COLUMN     "gameId" TEXT;

-- CreateTable
CREATE TABLE "Games" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,

    CONSTRAINT "Games_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Games_name_key" ON "Games"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Games_slug_key" ON "Games"("slug");

-- CreateIndex
CREATE INDEX "Videos_views_idx" ON "Videos"("views" DESC);

-- AddForeignKey
ALTER TABLE "Videos" ADD CONSTRAINT "Videos_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Games"("id") ON DELETE SET NULL ON UPDATE CASCADE;
