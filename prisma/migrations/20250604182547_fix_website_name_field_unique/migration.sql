/*
  Warnings:

  - A unique constraint covering the columns `[website_name]` on the table `PageViews` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[website_name]` on the table `Visits` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "PageViews_website_name_key" ON "PageViews"("website_name");

-- CreateIndex
CREATE UNIQUE INDEX "Visits_website_name_key" ON "Visits"("website_name");
