-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "createdAt" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATE NOT NULL,
    "deletedAt" DATE,
    "email" TEXT NOT NULL,
    "birthday" DATE NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
