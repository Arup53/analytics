-- DropIndex
DROP INDEX "Visits_website_domain_key";

-- CreateTable
CREATE TABLE "PageViews" (
    "id" SERIAL NOT NULL,
    "domain" TEXT NOT NULL,
    "page" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PageViews_pkey" PRIMARY KEY ("id")
);
