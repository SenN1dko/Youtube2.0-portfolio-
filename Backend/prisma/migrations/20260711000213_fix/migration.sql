/*
  Warnings:

  - You are about to drop the column `playlistId` on the `Videos` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Videos" DROP CONSTRAINT "Videos_playlistId_fkey";

-- AlterTable
ALTER TABLE "Videos" DROP COLUMN "playlistId";

-- CreateTable
CREATE TABLE "_PlaylistToVideo" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_PlaylistToVideo_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_PlaylistToVideo_B_index" ON "_PlaylistToVideo"("B");

-- AddForeignKey
ALTER TABLE "_PlaylistToVideo" ADD CONSTRAINT "_PlaylistToVideo_A_fkey" FOREIGN KEY ("A") REFERENCES "Playlist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PlaylistToVideo" ADD CONSTRAINT "_PlaylistToVideo_B_fkey" FOREIGN KEY ("B") REFERENCES "Videos"("id") ON DELETE CASCADE ON UPDATE CASCADE;
