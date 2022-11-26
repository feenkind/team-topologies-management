import { Injectable } from '@nestjs/common';
import { UpdateTeamDto } from './dto/update-team.dto';
import { PrismaService } from '../prisma.service';
import { Prisma, Team } from '@prisma/client';
import { DependenciesService } from './dependencies.service';
import { InteractionsService } from './interactions.service';
import { TeamDto } from './dto/team.dto';
import {
  channelTypes,
  meetingsDay,
  teamType,
  versioningType,
} from './dto/create-team.dto';
import { interactionMode } from './dto/create-interaction.dto';
import { dependencyType } from './dto/create-dependency.dto';

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

  async findAll(): Promise<TeamDto[]> {
    const teams = await this.prisma.team.findMany({
      include: {
        teamHistory: true,
        communicationChannel: true,
        meeting: true,
        service: true,
        wayOfWorking: true,
        work: true,
        domainsOnTeams: true,
        domainsOnTeamsHistory: true,
      },
    });

    return teams.map((team) => ({
      id: team.id,
      projectId: team.projectId,
      name: team.name,
      cognitiveLoad: team.cognitiveLoad,
      fte: team.fte,
      focus: team.focus,
      type: team.type as teamType,
      platform: team.platform,
      wikiSearchTerms: team.wikiSearchTerms,
      communicationChannels: team.communicationChannel.map((channel) => ({
        type: channel.type as channelTypes,
        name: channel.name,
      })),
      meetings: team.meeting.map((meeting) => ({
        purpose: meeting.purpose,
        day: meeting.day as meetingsDay,
        time: meeting.time,
        durationMinutes: meeting.durationMinutes,
      })),
      services: team.service.map((service) => ({
        name: service.name,
        url: service.url,
        repository: service.repository,
        versioning: service.versioning as versioningType,
      })),
      waysOfWorking: team.wayOfWorking.map((way) => ({
        name: way.name,
        url: way.url,
      })),
      works: team.work.map((work) => ({
        summary: work.summary,
        repository: work.repository,
      })),
      domains: team.domainsOnTeams.map((domain) => domain.domainId),
      teamHistory: team.teamHistory.map((history) => ({
        createdAt: history.createdAt.toDateString(),
        changeNote: history.changeNote,
        fte: history.fte,
        type: history.type as teamType,
        cognitiveLoad: history.cognitiveLoad,
      })),
      domainHistory: team.domainsOnTeamsHistory.map((history) => ({
        createdAt: history.createdAt.toDateString(),
        changeNote: history.changeNote,
        domainId: history.domainId,
      })),
    }));
  }

  async findOneWithAllData(id: string): Promise<TeamDto> {
    const team = await this.prisma.team.findUnique({
      where: { id },
      include: {
        communicationChannel: true,
        meeting: true,
        service: true,
        wayOfWorking: true,
        work: true,
        domainsOnTeams: true,
        dependency: true,
        interactionTeamOne: true,
        interactionTeamTwo: true,
      },
    });

    return {
      id: team.id,
      projectId: team.projectId,
      name: team.name,
      cognitiveLoad: team.cognitiveLoad,
      fte: team.fte,
      focus: team.focus,
      type: team.type as teamType,
      platform: team.platform,
      wikiSearchTerms: team.wikiSearchTerms,
      communicationChannels: team.communicationChannel.map((channel) => ({
        type: channel.type as channelTypes,
        name: channel.name,
      })),
      meetings: team.meeting.map((meeting) => ({
        purpose: meeting.purpose,
        day: meeting.day as meetingsDay,
        time: meeting.time,
        durationMinutes: meeting.durationMinutes,
      })),
      services: team.service.map((service) => ({
        name: service.name,
        url: service.url,
        repository: service.repository,
        versioning: service.versioning as versioningType,
      })),
      waysOfWorking: team.wayOfWorking.map((way) => ({
        name: way.name,
        url: way.url,
      })),
      works: team.work.map((work) => ({
        summary: work.summary,
        repository: work.repository,
      })),
      domains: team.domainsOnTeams.map((domain) => domain.domainId),
      interactionsAsTeamOne: team.interactionTeamOne.map((interaction) => ({
        teamIdOne: interaction.teamIdOne,
        teamIdTwo: interaction.teamIdTwo,
        interactionMode: interaction.interactionMode as interactionMode,
        purpose: interaction.purpose,
        startDate: interaction.startDate.toDateString(),
        expectedDuration: interaction.expectedDuration,
        additionalInformation: interaction.additionalInformation,
      })),
      interactionsAsTeamTwo: team.interactionTeamTwo.map((interaction) => ({
        teamIdOne: interaction.teamIdOne,
        teamIdTwo: interaction.teamIdTwo,
        interactionMode: interaction.interactionMode as interactionMode,
        purpose: interaction.purpose,
        startDate: interaction.startDate.toDateString(),
        expectedDuration: interaction.expectedDuration,
        additionalInformation: interaction.additionalInformation,
      })),
      dependencies: team.dependency.map((dependency) => ({
        teamIdFrom: dependency.teamIdFrom,
        teamIdTo: dependency.teamIdTo,
        dependencyType: dependency.dependencyType as dependencyType,
        description: dependency.description,
      })),
    };
  }

  async update(id: string, updateTeamDto: UpdateTeamDto): Promise<TeamDto> {
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
        communicationChannel: {
          create: updateTeamDto.communicationChannels
            ? updateTeamDto.communicationChannels.map((channel) => ({
                type: channel.type,
                name: channel.name,
              }))
            : [],
        },
        meeting: {
          create: updateTeamDto.meetings
            ? updateTeamDto.meetings.map((meeting) => ({
                day: meeting.day,
                purpose: meeting.purpose,
                time: meeting.time,
                durationMinutes: meeting.durationMinutes,
              }))
            : [],
        },
        service: {
          create: updateTeamDto.services
            ? updateTeamDto.services.map((service) => ({
                versioning: service.versioning,
                name: service.name,
                url: service.url || null,
                repository: service.repository || null,
              }))
            : [],
        },
        wayOfWorking: {
          create: updateTeamDto.waysOfWorking
            ? updateTeamDto.waysOfWorking.map((wayOfWorking) => ({
                name: wayOfWorking.name,
                url: wayOfWorking.url || null,
              }))
            : [],
        },
        work: {
          create: updateTeamDto.work
            ? updateTeamDto.work.map((work) => ({
                summary: work.summary,
                repository: work.repository || null,
              }))
            : [],
        },
        domainsOnTeams: {
          create: updateTeamDto.domainIds
            ? updateTeamDto.domainIds.map((domainId) => ({ domainId }))
            : [],
        },
        teamHistory: {
          create: {
            cognitiveLoad: updateTeamDto.cognitiveLoad,
            fte: updateTeamDto.fte,
            type: updateTeamDto.type,
            changeNote: updateTeamDto.changeNote,
          },
        },
        domainsOnTeamsHistory: {
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
