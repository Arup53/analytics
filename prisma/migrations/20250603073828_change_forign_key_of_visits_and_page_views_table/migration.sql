/*
  Warnings:

  - You are about to drop the column `websiteId` on the `PageViews` table. All the data in the column will be lost.
  - You are about to drop the column `websiteId` on the `Visits` table. All the data in the column will be lost.
  - Added the required column `website_name` to the `PageViews` table without a default value. This is not possible if the table is not empty.
  - Added the required column `website_name` to the `Visits` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "PageViews" DROP CONSTRAINT "PageViews_websiteId_fkey";

-- DropForeignKey
ALTER TABLE "Visits" DROP CONSTRAINT "Visits_websiteId_fkey";

-- AlterTable
ALTER TABLE "PageViews" DROP COLUMN "websiteId",
ADD COLUMN     "website_name" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Visits" DROP COLUMN "websiteId",
ADD COLUMN     "website_name" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Visits" ADD CONSTRAINT "Visits_website_name_fkey" FOREIGN KEY ("website_name") REFERENCES "Websites"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PageViews" ADD CONSTRAINT "PageViews_website_name_fkey" FOREIGN KEY ("website_name") REFERENCES "Websites"("id") ON DELETE CASCADE ON UPDATE CASCADE;
