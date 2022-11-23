-- CreateEnum
CREATE TYPE "DependencyType" AS ENUM ('ok', 'slowing', 'blocking');

-- CreateEnum
CREATE TYPE "ChangeType" AS ENUM ('added', 'removed', 'changed');

-- CreateTable
CREATE TABLE "Dependency" (
    "teamIdFrom" TEXT NOT NULL,
    "teamIdTo" TEXT NOT NULL,
    "dependencyType" "DependencyType" NOT NULL,
    "description" TEXT,

    CONSTRAINT "Dependency_pkey" PRIMARY KEY ("teamIdFrom","teamIdTo")
);

-- CreateTable
CREATE TABLE "DependencyHistory" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "changeNote" TEXT NOT NULL,
    "changeType" "ChangeType" NOT NULL,
    "teamIdFrom" TEXT NOT NULL,
    "teamIdTo" TEXT NOT NULL,
    "dependencyType" "DependencyType" NOT NULL,
    "description" TEXT,

    CONSTRAINT "DependencyHistory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Dependency" ADD CONSTRAINT "Dependency_teamIdFrom_fkey" FOREIGN KEY ("teamIdFrom") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dependency" ADD CONSTRAINT "Dependency_teamIdTo_fkey" FOREIGN KEY ("teamIdTo") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DependencyHistory" ADD CONSTRAINT "DependencyHistory_teamIdFrom_fkey" FOREIGN KEY ("teamIdFrom") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DependencyHistory" ADD CONSTRAINT "DependencyHistory_teamIdTo_fkey" FOREIGN KEY ("teamIdTo") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;
