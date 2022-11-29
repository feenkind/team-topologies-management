-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('information', 'reminder', 'warning');

-- CreateEnum
CREATE TYPE "NotificationArea" AS ENUM ('team_interactions', 'domain');

-- CreateTable
CREATE TABLE "Notification" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "type" "NotificationType" NOT NULL,
    "area" "NotificationArea" NOT NULL,
    "summary" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "read" BOOLEAN NOT NULL,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);
