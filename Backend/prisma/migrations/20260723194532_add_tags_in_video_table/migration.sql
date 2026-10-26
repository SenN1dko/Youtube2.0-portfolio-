-- AlterTable
ALTER TABLE "Videos" ADD COLUMN     "tags" TEXT[] DEFAULT ARRAY[]::TEXT[];
