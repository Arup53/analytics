/*
  Warnings:

  - You are about to drop the column `user_id` on the `Websites` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Websites" DROP COLUMN "user_id",
ADD COLUMN     "userId" TEXT;

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "image" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Websites" ADD CONSTRAINT "Websites_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
