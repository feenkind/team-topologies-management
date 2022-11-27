import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { DependenciesService } from './dependencies.service';
import { InteractionsService } from './interactions.service';
import { TeamDto } from './dto/team.dto';
import { DependencyDto } from './dto/dependency.dto';
import { DependencyHistoryDto } from './dto/dependency-history.dto';
import { InteractionDto } from './dto/interaction.dto';
import { InteractionHistoryDto } from './dto/interaction-history.dto';

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
  findAllDependencies(): Promise<DependencyDto[]> {
    return this.depdendencyService.findAll();
  }

  @Get('dependencies/history')
  findAllDependenciesHistoric(): Promise<DependencyHistoryDto[]> {
    return this.depdendencyService.findAllHistoric();
  }

  @Get('interactions')
  findAllInteractions(): Promise<InteractionDto[]> {
    return this.interactionsService.findAll();
  }

  @Get('interactions/history')
  findAllInteractionsHistoric(): Promise<InteractionHistoryDto[]> {
    return this.interactionsService.findAllHistoric();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<TeamDto> {
    return this.teamsService.findOneWithAllData(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateTeamDto: UpdateTeamDto,
  ): Promise<TeamDto> {
    return this.teamsService.update(id, updateTeamDto);
  }
}
