/*
  Warnings:

  - You are about to drop the column `text` on the `messages` table. All the data in the column will be lost.
  - Added the required column `dat` to the `messages` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "messages" DROP COLUMN "text",
ADD COLUMN     "dat" TEXT NOT NULL;
