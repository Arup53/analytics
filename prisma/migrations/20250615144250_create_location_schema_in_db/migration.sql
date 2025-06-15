-- CreateTable
CREATE TABLE "Location" (
    "id" SERIAL NOT NULL,
    "website_name" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "visitor" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Location_website_name_key" ON "Location"("website_name");

-- CreateIndex
CREATE UNIQUE INDEX "Location_country_key" ON "Location"("country");

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_website_name_fkey" FOREIGN KEY ("website_name") REFERENCES "Websites"("website_name") ON DELETE CASCADE ON UPDATE CASCADE;
