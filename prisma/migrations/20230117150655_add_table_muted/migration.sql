-- AlterTable
ALTER TABLE "room" ADD COLUMN     "type" TEXT NOT NULL DEFAULT 'private';

-- CreateTable
CREATE TABLE "muted" (
    "id" SERIAL NOT NULL,
    "roomId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "time" TEXT NOT NULL,

    CONSTRAINT "muted_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "muted" ADD CONSTRAINT "muted_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
