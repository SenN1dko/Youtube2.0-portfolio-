/*
  Warnings:

  - You are about to drop the `PlaylistVideo` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PlaylistVideo" DROP CONSTRAINT "PlaylistVideo_playlistId_fkey";

-- DropForeignKey
ALTER TABLE "PlaylistVideo" DROP CONSTRAINT "PlaylistVideo_videoId_fkey";

-- AlterTable
ALTER TABLE "Videos" ADD COLUMN     "playlistId" TEXT;

-- DropTable
DROP TABLE "PlaylistVideo";

-- AddForeignKey
ALTER TABLE "Videos" ADD CONSTRAINT "Videos_playlistId_fkey" FOREIGN KEY ("playlistId") REFERENCES "Playlist"("id") ON DELETE SET NULL ON UPDATE CASCADE;
