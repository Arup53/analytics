-- DropForeignKey
ALTER TABLE "PageViews" DROP CONSTRAINT "PageViews_website_name_fkey";

-- DropForeignKey
ALTER TABLE "Visits" DROP CONSTRAINT "Visits_website_name_fkey";

-- AlterTable
ALTER TABLE "PageViews" ALTER COLUMN "website_name" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Visits" ALTER COLUMN "website_name" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "Visits" ADD CONSTRAINT "Visits_website_name_fkey" FOREIGN KEY ("website_name") REFERENCES "Websites"("website_name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PageViews" ADD CONSTRAINT "PageViews_website_name_fkey" FOREIGN KEY ("website_name") REFERENCES "Websites"("website_name") ON DELETE CASCADE ON UPDATE CASCADE;
