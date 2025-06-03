/*
  Warnings:

  - Added the required column `websiteId` to the `PageViews` table without a default value. This is not possible if the table is not empty.
  - Added the required column `websiteId` to the `Visits` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "PageViews" DROP CONSTRAINT "PageViews_id_fkey";

-- DropForeignKey
ALTER TABLE "Visits" DROP CONSTRAINT "Visits_id_fkey";

-- AlterTable
ALTER TABLE "PageViews" ADD COLUMN     "websiteId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Visits" ADD COLUMN     "websiteId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Visits" ADD CONSTRAINT "Visits_websiteId_fkey" FOREIGN KEY ("websiteId") REFERENCES "Websites"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PageViews" ADD CONSTRAINT "PageViews_websiteId_fkey" FOREIGN KEY ("websiteId") REFERENCES "Websites"("id") ON DELETE CASCADE ON UPDATE CASCADE;
