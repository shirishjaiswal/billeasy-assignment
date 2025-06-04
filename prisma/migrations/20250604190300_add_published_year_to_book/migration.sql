/*
  Warnings:

  - You are about to drop the column `publishedAt` on the `Book` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Book" DROP COLUMN "publishedAt",
ADD COLUMN     "publishedYear" INTEGER;
