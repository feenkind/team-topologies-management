import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { changeType, CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import {
  Dependency,
  Interaction,
  InteractionHistory,
  Team,
} from '@prisma/client';
import { DependenciesService } from './dependencies.service';
import { InteractionsService } from './interactions.service';
import { TeamDto } from './dto/team.dto';

@Controller('teams')
export class TeamsController {
  constructor(
    private readonly teamsService: TeamsService,
    private readonly depdendencyService: DependenciesService,
    private readonly interactionsService: InteractionsService,
  ) {}

  @Post()
  create(@Body() createTeamDto: CreateTeamDto): Promise<Team> {
    return this.teamsService.create({
      project: { connect: { id: createTeamDto.projectId } },
      name: createTeamDto.name,
      cognitiveLoad: createTeamDto.cognitiveLoad,
      fte: createTeamDto.fte,
      focus: createTeamDto.focus,
      type: createTeamDto.type,
      platform: createTeamDto.platform || null,
      wikiSearchTerms: createTeamDto.wikiSearchTearms || [],
      communicationChannel: {
        create: createTeamDto.communicationChannels
          ? createTeamDto.communicationChannels.map((channel) => ({
              type: channel.type,
              name: channel.name,
            }))
          : [],
      },
      meeting: {
        create: createTeamDto.meetings
          ? createTeamDto.meetings.map((meeting) => ({
              day: meeting.day,
              purpose: meeting.purpose,
              time: meeting.time,
              durationMinutes: meeting.durationMinutes,
            }))
          : [],
      },
      service: {
        create: createTeamDto.services
          ? createTeamDto.services.map((service) => ({
              versioning: service.versioning,
              name: service.name,
              url: service.url || null,
              repository: service.repository || null,
            }))
          : [],
      },
      wayOfWorking: {
        create: createTeamDto.waysOfWorking
          ? createTeamDto.waysOfWorking.map((wayOfWorking) => ({
              name: wayOfWorking.name,
              url: wayOfWorking.url || null,
            }))
          : [],
      },
      work: {
        create: createTeamDto.work
          ? createTeamDto.work.map((work) => ({
              summary: work.summary,
              repository: work.repository || null,
            }))
          : [],
      },
      domainsOnTeams: {
        create: createTeamDto.domainIds
          ? createTeamDto.domainIds.map((domainId) => ({ domainId }))
          : [],
      },
      teamHistory: {
        create: {
          cognitiveLoad: createTeamDto.cognitiveLoad,
          fte: createTeamDto.fte,
          type: createTeamDto.type,
          changeNote: 'Initial creation.',
        },
      },
      domainsOnTeamsHistory: {
        create: createTeamDto.domainIds
          ? createTeamDto.domainIds.map((domainId) => ({
              domainId,
              changeNote: 'Initial creation.',
            }))
          : [],
      },
      dependency: {
        create: createTeamDto.dependencies
          ? createTeamDto.dependencies.map((dependeny) => ({
              dependencyType: dependeny.dependencyType,
              teamIdTo: dependeny.teamIdTo,
              description: dependeny.description || null,
            }))
          : [],
      },

      dependencyHistory: {
        create: createTeamDto.dependencies
          ? createTeamDto.dependencies.map((dependeny) => ({
              dependencyType: dependeny.dependencyType,
              teamIdTo: dependeny.teamIdTo,
              description: dependeny.description || null,
              changeNote: 'Initial creation.',
              changeType: changeType.ADDED,
            }))
          : [],
      },
      interactionTeamTwo: {
        create: createTeamDto.interactions
          ? createTeamDto.interactions.map((interaction) => ({
              teamIdTwo: interaction.teamIdTwo,
              interactionMode: interaction.interactionMode,
              purpose: interaction.purpose,
              startDate: interaction.startDate,
              expectedDuration: interaction.expectedDuration,
              additionalInformation: interaction.additionalInformation || null,
            }))
          : [],
      },
      interactionHistoryTeamTwo: {
        create: createTeamDto.interactions
          ? createTeamDto.interactions.map((interaction) => ({
              teamIdTwo: interaction.teamIdTwo,
              interactionMode: interaction.interactionMode,
              purpose: interaction.purpose,
              startDate: interaction.startDate,
              expectedDuration: interaction.expectedDuration,
              additionalInformation: interaction.additionalInformation || null,
              changeNote: 'Initial creation.',
              changeType: changeType.ADDED,
            }))
          : [],
      },
    });
  }

  @Get()
  findAll(): Promise<TeamDto[]> {
    return this.teamsService.findAll();
  }

  @Get('dependencies')
  findAllDependencies(): Promise<Dependency[]> {
    return this.depdendencyService.findAll();
  }

  @Get('dependencies/history')
  findAllDependenciesHistoric(): Promise<Dependency[]> {
    return this.depdendencyService.findAllHistoric();
  }

  @Get('interactions')
  findAllInteractions(): Promise<Interaction[]> {
    return this.interactionsService.findAll();
  }

  @Get('interactions/history')
  findAllInteractionsHistoric(): Promise<InteractionHistory[]> {
    return this.interactionsService.findAllHistoric();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<TeamDto> {
    return this.teamsService.findOneWithAllData(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateTeamDto: UpdateTeamDto) {
    return this.teamsService.update(id, updateTeamDto);
  }
}
