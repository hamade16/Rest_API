-- CreateTable
CREATE TABLE "room" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "admins" INTEGER[],
    "members" INTEGER[],

    CONSTRAINT "room_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "room_name_key" ON "room"("name");
