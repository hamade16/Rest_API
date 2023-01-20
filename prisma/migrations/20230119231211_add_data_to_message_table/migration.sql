/*
  Warnings:

  - You are about to drop the column `dat` on the `messages` table. All the data in the column will be lost.
  - Added the required column `data` to the `messages` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "messages" DROP COLUMN "dat",
ADD COLUMN     "data" TEXT NOT NULL;
