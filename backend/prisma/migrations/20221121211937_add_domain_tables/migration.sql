-- CreateEnum
CREATE TYPE "Priority" AS ENUM ('GENERIC', 'SUPPORTING', 'CORE');

-- CreateEnum
CREATE TYPE "Complexity" AS ENUM ('SIMPLE', 'COMPLICATED', 'COMPLEX');

-- CreateTable
CREATE TABLE "Domain" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "priority" "Priority" NOT NULL,
    "complexity" "Complexity" NOT NULL,
    "active" BOOLEAN NOT NULL,

    CONSTRAINT "Domain_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DomainHistory" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "domainId" TEXT NOT NULL,
    "changeNote" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "priority" "Priority" NOT NULL,
    "complexity" "Complexity" NOT NULL,

    CONSTRAINT "DomainHistory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Domain_projectId_key" ON "Domain"("projectId");

-- AddForeignKey
ALTER TABLE "Domain" ADD CONSTRAINT "Domain_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DomainHistory" ADD CONSTRAINT "DomainHistory_domainId_fkey" FOREIGN KEY ("domainId") REFERENCES "Domain"("id") ON DELETE CASCADE ON UPDATE CASCADE;
