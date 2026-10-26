/*
  Warnings:

  - A unique constraint covering the columns `[owner_id]` on the table `Channels` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Channels_owner_id_key" ON "Channels"("owner_id");
