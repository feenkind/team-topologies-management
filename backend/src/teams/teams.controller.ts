import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { Dependency, Interaction, InteractionHistory } from '@prisma/client';
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
  create(@Body() createTeamDto: CreateTeamDto): Promise<TeamDto> {
    return this.teamsService.create(createTeamDto);
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
