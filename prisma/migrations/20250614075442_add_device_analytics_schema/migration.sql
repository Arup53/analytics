-- CreateEnum
CREATE TYPE "DeviceType" AS ENUM ('DESKTOP', 'MOBILE', 'TABLET');

-- CreateTable
CREATE TABLE "DeviceAnalytics" (
    "id" SERIAL NOT NULL,
    "website_name" TEXT NOT NULL,
    "deviceType" "DeviceType" NOT NULL,
    "visitor" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DeviceAnalytics_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DeviceAnalytics_website_name_key" ON "DeviceAnalytics"("website_name");

-- CreateIndex
CREATE UNIQUE INDEX "DeviceAnalytics_deviceType_key" ON "DeviceAnalytics"("deviceType");

-- AddForeignKey
ALTER TABLE "DeviceAnalytics" ADD CONSTRAINT "DeviceAnalytics_website_name_fkey" FOREIGN KEY ("website_name") REFERENCES "Websites"("website_name") ON DELETE CASCADE ON UPDATE CASCADE;
