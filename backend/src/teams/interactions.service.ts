import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Interaction, InteractionHistory } from '@prisma/client';
import { UpdateInteractionDto } from './dto/update-interaction.dto';

@Injectable()
export class InteractionsService {
  constructor(private prisma: PrismaService) {}

  findAll(): Promise<Interaction[]> {
    return this.prisma.interaction.findMany({
      include: { teamOne: true, teamTwo: true },
    });
  }

  findAllHistoric(): Promise<InteractionHistory[]> {
    return this.prisma.interactionHistory.findMany({
      include: { teamOne: true, teamTwo: true },
    });
  }

  async updateInteractionsForTeamId(
    teamId: string,
    changeNote: string,
    updateInteractions: UpdateInteractionDto[],
  ): Promise<Interaction[]> {
    return null;
  }
}
