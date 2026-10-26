-- AlterTable
ALTER TABLE "Videos" ADD COLUMN "slug" TEXT;

-- Backfill existing rows (public_id is unique, so this is safe)
UPDATE "Videos" SET "slug" = "public_id" WHERE "slug" IS NULL;

-- Make the column required
ALTER TABLE "Videos" ALTER COLUMN "slug" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Videos_slug_key" ON "Videos"("slug");
