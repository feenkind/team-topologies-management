import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Interaction, InteractionHistory } from '@prisma/client';

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
}
