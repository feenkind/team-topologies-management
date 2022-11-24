-- CreateEnum
CREATE TYPE "InteractionMode" AS ENUM ('collaboration', 'x_as_a_service', 'facilitating', 'undefined');

-- CreateTable
CREATE TABLE "Interaction" (
    "teamIdOne" TEXT NOT NULL,
    "teamIdTwo" TEXT NOT NULL,
    "interactionMode" "InteractionMode" NOT NULL,
    "purpose" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "expectedDuration" SMALLINT NOT NULL,
    "additionalInformation" TEXT,

    CONSTRAINT "Interaction_pkey" PRIMARY KEY ("teamIdOne","teamIdTwo")
);

-- CreateTable
CREATE TABLE "InteractionHistory" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "changeNote" TEXT NOT NULL,
    "changeType" "ChangeType" NOT NULL,
    "teamIdOne" TEXT NOT NULL,
    "teamIdTwo" TEXT NOT NULL,
    "interactionMode" "InteractionMode" NOT NULL,
    "purpose" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "expectedDuration" SMALLINT NOT NULL,
    "additionalInformation" TEXT,

    CONSTRAINT "InteractionHistory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Interaction" ADD CONSTRAINT "Interaction_teamIdOne_fkey" FOREIGN KEY ("teamIdOne") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Interaction" ADD CONSTRAINT "Interaction_teamIdTwo_fkey" FOREIGN KEY ("teamIdTwo") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InteractionHistory" ADD CONSTRAINT "InteractionHistory_teamIdOne_fkey" FOREIGN KEY ("teamIdOne") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InteractionHistory" ADD CONSTRAINT "InteractionHistory_teamIdTwo_fkey" FOREIGN KEY ("teamIdTwo") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;
