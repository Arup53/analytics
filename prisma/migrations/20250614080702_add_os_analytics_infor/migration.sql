-- CreateTable
CREATE TABLE "OsAnalyticsInfo" (
    "id" SERIAL NOT NULL,
    "website_name" TEXT NOT NULL,
    "os" TEXT NOT NULL,
    "visitor" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OsAnalyticsInfo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "OsAnalyticsInfo_website_name_key" ON "OsAnalyticsInfo"("website_name");

-- CreateIndex
CREATE UNIQUE INDEX "OsAnalyticsInfo_os_key" ON "OsAnalyticsInfo"("os");

-- AddForeignKey
ALTER TABLE "OsAnalyticsInfo" ADD CONSTRAINT "OsAnalyticsInfo_website_name_fkey" FOREIGN KEY ("website_name") REFERENCES "Websites"("website_name") ON DELETE CASCADE ON UPDATE CASCADE;
