-- CreateTable
CREATE TABLE "Websites" (
    "id" SERIAL NOT NULL,
    "website_name" TEXT NOT NULL,
    "user_id" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Websites_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Websites_website_name_key" ON "Websites"("website_name");
