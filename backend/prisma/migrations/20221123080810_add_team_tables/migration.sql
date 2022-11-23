-- CreateEnum
CREATE TYPE "TeamType" AS ENUM ('stream_aligned', 'platform', 'enabling', 'complicated_subsystem', 'undefined');

-- CreateEnum
CREATE TYPE "ChannelType" AS ENUM ('slack');

-- CreateEnum
CREATE TYPE "MeetingDay" AS ENUM ('daily', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday');

-- CreateEnum
CREATE TYPE "VersioningType" AS ENUM ('semantic', 'sequential');

-- CreateTable
CREATE TABLE "Team" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cognitiveLoad" SMALLINT NOT NULL,
    "fte" SMALLINT NOT NULL,
    "focus" TEXT NOT NULL,
    "type" "TeamType" NOT NULL,
    "wikiSearchTerms" TEXT[],
    "domainId" TEXT,

    CONSTRAINT "Team_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TeamHistory" (
    "id" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "changeNote" TEXT NOT NULL,
    "cognitiveLoad" SMALLINT NOT NULL,
    "fte" SMALLINT NOT NULL,
    "type" "TeamType" NOT NULL,

    CONSTRAINT "TeamHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DomainsOnTeams" (
    "domainId" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,

    CONSTRAINT "DomainsOnTeams_pkey" PRIMARY KEY ("domainId","teamId")
);

-- CreateTable
CREATE TABLE "DomainsOnTeamsHistory" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "changeNote" TEXT NOT NULL,
    "domainId" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,

    CONSTRAINT "DomainsOnTeamsHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CommunicationChannel" (
    "id" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,
    "type" "ChannelType" NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "CommunicationChannel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Meeting" (
    "id" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,
    "day" "MeetingDay" NOT NULL,
    "purpose" TEXT NOT NULL,
    "time" VARCHAR(255) NOT NULL,
    "durationMinutes" SMALLINT NOT NULL,

    CONSTRAINT "Meeting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Service" (
    "id" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,
    "versioning" "VersioningType" NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "url" TEXT NOT NULL,
    "repository" TEXT NOT NULL,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WayOfWorking" (
    "id" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "WayOfWorking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkInProgress" (
    "id" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "repository" TEXT NOT NULL,

    CONSTRAINT "WorkInProgress_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_domainId_fkey" FOREIGN KEY ("domainId") REFERENCES "Domain"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamHistory" ADD CONSTRAINT "TeamHistory_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DomainsOnTeams" ADD CONSTRAINT "DomainsOnTeams_domainId_fkey" FOREIGN KEY ("domainId") REFERENCES "Domain"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DomainsOnTeams" ADD CONSTRAINT "DomainsOnTeams_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DomainsOnTeamsHistory" ADD CONSTRAINT "DomainsOnTeamsHistory_domainId_fkey" FOREIGN KEY ("domainId") REFERENCES "Domain"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DomainsOnTeamsHistory" ADD CONSTRAINT "DomainsOnTeamsHistory_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommunicationChannel" ADD CONSTRAINT "CommunicationChannel_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Meeting" ADD CONSTRAINT "Meeting_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WayOfWorking" ADD CONSTRAINT "WayOfWorking_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkInProgress" ADD CONSTRAINT "WorkInProgress_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;
