-- CreateTable
CREATE TABLE "Visits" (
    "id" SERIAL NOT NULL,
    "website_domain" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Visits_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Visits_website_domain_key" ON "Visits"("website_domain");
