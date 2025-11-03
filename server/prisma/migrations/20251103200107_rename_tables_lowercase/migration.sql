/*
  Warnings:

  - You are about to drop the `Scan` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Site` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Scan" DROP CONSTRAINT "Scan_siteId_fkey";

-- DropTable
DROP TABLE "public"."Scan";

-- DropTable
DROP TABLE "public"."Site";

-- CreateTable
CREATE TABLE "site" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "site_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "scan" (
    "id" TEXT NOT NULL,
    "siteId" TEXT NOT NULL,
    "privacyTrackers" INTEGER NOT NULL,
    "thirdPartyCookies" INTEGER NOT NULL,
    "privacyGrade" TEXT NOT NULL,
    "accessibilityIssues" INTEGER NOT NULL,
    "accessibilityCritical" INTEGER NOT NULL,
    "accessibilityGrade" TEXT NOT NULL,
    "https" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "scan_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "site_url_key" ON "site"("url");

-- AddForeignKey
ALTER TABLE "scan" ADD CONSTRAINT "scan_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "site"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
