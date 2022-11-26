import { Injectable } from '@nestjs/common';
import { UpdateTeamDto } from './dto/update-team.dto';
import { PrismaService } from '../prisma.service';
import { Prisma, Team } from '@prisma/client';
import { DependenciesService } from './dependencies.service';
import { InteractionsService } from './interactions.service';

@Injectable()
export class TeamsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly dependenciesService: DependenciesService,
    private readonly interactionsService: InteractionsService,
  ) {}

  create(createInput: Prisma.TeamCreateInput): Promise<Team> {
    return this.prisma.team.create({ data: createInput });
  }

  findAll(includeHistory: boolean): Promise<Team[]> {
    if (includeHistory) {
      return this.prisma.team.findMany({
        include: {
          TeamHistory: true,
          CommunicationChannel: true,
          Meeting: true,
          Service: true,
          WayOfWorking: true,
          Work: true,
          DomainsOnTeams: true,
          DomainsOnTeamsHistory: true,
        },
      });
    }
    return this.prisma.team.findMany();
  }

  findOneWithAllData(id: string): Promise<Team> {
    return this.prisma.team.findUnique({
      where: { id },
      include: {
        CommunicationChannel: true,
        Meeting: true,
        Service: true,
        WayOfWorking: true,
        Work: true,
        DomainsOnTeams: true,
        dependency: true,
        interactionTeamOne: true,
        interactionTeamTwo: true,
      },
    });
  }

  async update(id: string, updateTeamDto: UpdateTeamDto): Promise<Team> {
    // delete relations without history
    await this.prisma.communicationChannel.deleteMany({
      where: { teamId: id },
    });
    await this.prisma.meeting.deleteMany({
      where: { teamId: id },
    });
    await this.prisma.service.deleteMany({
      where: { teamId: id },
    });
    await this.prisma.wayOfWorking.deleteMany({
      where: { teamId: id },
    });
    await this.prisma.work.deleteMany({
      where: { teamId: id },
    });
    await this.prisma.domainsOnTeams.deleteMany({
      where: { teamId: id },
    });

    // create new, but also update history tables
    await this.prisma.team.update({
      where: { id: id },
      data: {
        name: updateTeamDto.name,
        cognitiveLoad: updateTeamDto.cognitiveLoad,
        fte: updateTeamDto.fte,
        focus: updateTeamDto.focus,
        type: updateTeamDto.type,
        platform: updateTeamDto.platform || null,
        wikiSearchTerms: updateTeamDto.wikiSearchTearms || [],
        CommunicationChannel: {
          create: updateTeamDto.communicationChannels
            ? updateTeamDto.communicationChannels.map((channel) => ({
                type: channel.type,
                name: channel.name,
              }))
            : [],
        },
        Meeting: {
          create: updateTeamDto.meetings
            ? updateTeamDto.meetings.map((meeting) => ({
                day: meeting.day,
                purpose: meeting.purpose,
                time: meeting.time,
                durationMinutes: meeting.durationMinutes,
              }))
            : [],
        },
        Service: {
          create: updateTeamDto.services
            ? updateTeamDto.services.map((service) => ({
                versioning: service.versioning,
                name: service.name,
                url: service.url || null,
                repository: service.repository || null,
              }))
            : [],
        },
        WayOfWorking: {
          create: updateTeamDto.waysOfWorking
            ? updateTeamDto.waysOfWorking.map((wayOfWorking) => ({
                name: wayOfWorking.name,
                url: wayOfWorking.url || null,
              }))
            : [],
        },
        Work: {
          create: updateTeamDto.work
            ? updateTeamDto.work.map((work) => ({
                summary: work.summary,
                repository: work.repository || null,
              }))
            : [],
        },
        DomainsOnTeams: {
          create: updateTeamDto.domainIds
            ? updateTeamDto.domainIds.map((domainId) => ({ domainId }))
            : [],
        },
        TeamHistory: {
          create: {
            cognitiveLoad: updateTeamDto.cognitiveLoad,
            fte: updateTeamDto.fte,
            type: updateTeamDto.type,
            changeNote: updateTeamDto.changeNote,
          },
        },
        DomainsOnTeamsHistory: {
          create: updateTeamDto.domainIds
            ? updateTeamDto.domainIds.map((domainId) => ({
                domainId,
                changeNote: updateTeamDto.changeNote,
              }))
            : [],
        },
      },
    });

    await this.dependenciesService.updateDependenciesForTeamFromId(
      id,
      updateTeamDto.changeNote,
      updateTeamDto.dependencies.map((dependency) => ({
        ...dependency,
        teamIdFrom: id,
        changeNote: updateTeamDto.changeNote,
      })),
    );

    await this.interactionsService.updateInteractionsForTeamId(
      id,
      updateTeamDto.changeNote,
      updateTeamDto.interactions.map((interaction) => ({
        ...interaction,
        teamIdOne: id,
        changeNote: updateTeamDto.changeNote,
      })),
    );

    // return all updated values
    return this.findOneWithAllData(id);
  }
}
