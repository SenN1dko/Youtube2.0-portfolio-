/*
  Warnings:

  - You are about to drop the column `name` on the `Channels` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Channels_name_key";

-- AlterTable
ALTER TABLE "Channels" DROP COLUMN "name";
