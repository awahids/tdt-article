/*
  Warnings:

  - You are about to drop the `UserRole` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userId]` on the table `ArticleComment` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `roleId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "UserRole" DROP CONSTRAINT "UserRole_roleId_fkey";

-- DropForeignKey
ALTER TABLE "UserRole" DROP CONSTRAINT "UserRole_userId_fkey";

-- DropIndex
DROP INDEX "ArticleComment_articleId_idx";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "roleId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "UserRole";

-- CreateIndex
CREATE UNIQUE INDEX "ArticleComment_userId_key" ON "ArticleComment"("userId");

-- CreateIndex
CREATE INDEX "Role_value_idx" ON "Role"("value");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
