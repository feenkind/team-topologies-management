import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Interaction, Prisma } from '@prisma/client';
import { UpdateInteractionDto } from './dto/update-interaction.dto';
import { changeType } from './dto/create-team.dto';
import { InteractionDto } from './dto/interaction.dto';
import { interactionMode } from './dto/create-interaction.dto';
import { InteractionHistoryDto } from './dto/interaction-history.dto';

const interactionDataIsTheSame = (
  current: Interaction,
  updated: UpdateInteractionDto,
): boolean =>
  current.interactionMode === updated.interactionMode &&
  current.purpose === updated.purpose &&
  current.expectedDuration === updated.expectedDuration &&
  new Date(current.startDate).getTime() ===
    new Date(updated.startDate).getTime() &&
  current.additionalInformation === updated.additionalInformation;

const interactionIsTheSame = (
  current: Interaction,
  updated: UpdateInteractionDto,
): boolean =>
  (current.teamIdOne === updated.teamIdOne &&
    current.teamIdTwo === updated.teamIdTwo) ||
  (current.teamIdOne === updated.teamIdTwo &&
    current.teamIdTwo === updated.teamIdOne);

@Injectable()
export class InteractionsService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<InteractionDto[]> {
    const interactions = await this.prisma.interaction.findMany({
      include: { teamOne: true, teamTwo: true },
    });

    return interactions.map((interaction) => ({
      // right now interactions can only exist over one project, so we can
      // take the project id of any team
      projectId: interaction.teamOne.projectId,
      teamIdOne: interaction.teamIdOne,
      teamIdTwo: interaction.teamIdTwo,
      interactionMode: interaction.interactionMode as interactionMode,
      purpose: interaction.purpose,
      startDate: interaction.startDate.toUTCString(),
      expectedDuration: interaction.expectedDuration,
      additionalInformation: interaction.additionalInformation,
    }));
  }

  async findAllHistoric(): Promise<InteractionHistoryDto[]> {
    const histories = await this.prisma.interactionHistory.findMany({
      include: { teamOne: true, teamTwo: true },
    });

    return histories.map((history) => ({
      projectId: history.teamOne.projectId,
      teamIdOne: history.teamIdOne,
      teamIdTwo: history.teamIdTwo,
      interactionMode: history.interactionMode as interactionMode,
      purpose: history.purpose,
      startDate: history.startDate.toUTCString(),
      expectedDuration: history.expectedDuration,
      additionalInformation: history.additionalInformation,
      createdAt: history.createdAt.toUTCString(),
      changeNote: history.changeNote,
      changeType: history.changeType as changeType,
    }));
  }

  async updateInteractionsForTeamId(
    teamId: string,
    changeNote: string,
    newInteractions: UpdateInteractionDto[],
  ): Promise<Interaction[]> {
    // get current current
    const currentInteractions = await this.prisma.interaction.findMany({
      where: { OR: [{ teamIdOne: teamId }, { teamIdTwo: teamId }] },
    });

    // check for each update interaction, if it has to be removed, added or
    // changed in the history
    const interactionHistoryCreateManyInput: Prisma.InteractionHistoryCreateManyInput[] =
      [];
    const interactionsToKeep: { teamIdOne: string; teamIdTwo: string }[] = [];

    newInteractions.forEach((newInteraction) => {
      // keep these interactions
      interactionsToKeep.push({
        teamIdOne: newInteraction.teamIdOne,
        teamIdTwo: newInteraction.teamIdTwo,
      });

      const oldInteractionData = currentInteractions.find((current) =>
        interactionIsTheSame(current, newInteraction),
      );

      // did not exist yet, we need to add
      if (!oldInteractionData) {
        interactionHistoryCreateManyInput.push({
          teamIdOne: newInteraction.teamIdOne,
          teamIdTwo: newInteraction.teamIdTwo,
          interactionMode: newInteraction.interactionMode,
          purpose: newInteraction.purpose,
          startDate: newInteraction.startDate,
          expectedDuration: newInteraction.expectedDuration,
          additionalInformation: newInteraction.additionalInformation || null,
          changeNote: changeNote,
          changeType: changeType.ADDED,
        });
      }

      // existed already (and still exists), but data changed
      if (
        oldInteractionData &&
        !interactionDataIsTheSame(oldInteractionData, newInteraction)
      ) {
        interactionHistoryCreateManyInput.push({
          teamIdOne: oldInteractionData.teamIdOne,
          teamIdTwo: oldInteractionData.teamIdTwo,
          interactionMode: newInteraction.interactionMode,
          purpose: newInteraction.purpose,
          startDate: newInteraction.startDate,
          expectedDuration: newInteraction.expectedDuration,
          additionalInformation: newInteraction.additionalInformation || null,
          changeNote: changeNote,
          changeType: changeType.CHANGED,
        });
      }
    });

    // check for each existing interaction, if it still exists
    // add as removed to history, if not
    currentInteractions.forEach((current) => {
      if (
        !interactionsToKeep.find(
          ({ teamIdOne, teamIdTwo }) =>
            (teamIdOne === current.teamIdOne &&
              teamIdTwo === current.teamIdTwo) ||
            (teamIdOne === current.teamIdTwo &&
              teamIdTwo === current.teamIdOne),
        )
      ) {
        interactionHistoryCreateManyInput.push({
          teamIdOne: current.teamIdOne,
          teamIdTwo: current.teamIdTwo,
          interactionMode: current.interactionMode,
          purpose: current.purpose,
          startDate: current.startDate,
          expectedDuration: current.expectedDuration,
          additionalInformation: current.additionalInformation || null,
          changeNote: changeNote,
          changeType: changeType.REMOVED,
        });
      }
    });

    // create history
    await this.prisma.interactionHistory.createMany({
      data: interactionHistoryCreateManyInput,
    });

    // update current interactions = delete and create new
    await this.prisma.interaction.deleteMany({
      where: { OR: [{ teamIdOne: teamId }, { teamIdTwo: teamId }] },
    });
    await this.prisma.interaction.createMany({
      data: newInteractions.map((interaction) => ({
        teamIdOne: interaction.teamIdOne,
        teamIdTwo: interaction.teamIdTwo,
        interactionMode: interaction.interactionMode,
        purpose: interaction.purpose,
        startDate: interaction.startDate,
        expectedDuration: interaction.expectedDuration,
        additionalInformation: interaction.additionalInformation || null,
      })),
    });

    return this.prisma.interaction.findMany({
      where: { teamIdOne: teamId },
    });
  }
}
