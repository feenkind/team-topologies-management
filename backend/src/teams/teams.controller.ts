import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
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
import { AuthGuard } from '@nestjs/passport';

@Controller('teams')
export class TeamsController {
  constructor(
    private readonly teamsService: TeamsService,
    private readonly depdendencyService: DependenciesService,
    private readonly interactionsService: InteractionsService,
  ) {}

  @UseGuards(AuthGuard('basic'))
  @Post()
  create(@Body() createTeamDto: CreateTeamDto): Promise<TeamDto> {
    return this.teamsService.create(createTeamDto);
  }

  @UseGuards(AuthGuard('basic'))
  @Get()
  findAll(): Promise<TeamDto[]> {
    return this.teamsService.findAll();
  }

  @UseGuards(AuthGuard('basic'))
  @Get('dependencies')
  findAllDependencies(): Promise<DependencyDto[]> {
    return this.depdendencyService.findAll();
  }

  @UseGuards(AuthGuard('basic'))
  @Get('dependencies/history')
  findAllDependenciesHistoric(): Promise<DependencyHistoryDto[]> {
    return this.depdendencyService.findAllHistoric();
  }

  @UseGuards(AuthGuard('basic'))
  @Get('interactions')
  findAllInteractions(): Promise<InteractionDto[]> {
    return this.interactionsService.findAll();
  }

  @UseGuards(AuthGuard('basic'))
  @Get('interactions/history')
  findAllInteractionsHistoric(): Promise<InteractionHistoryDto[]> {
    return this.interactionsService.findAllHistoric();
  }

  @UseGuards(AuthGuard('basic'))
  @Get(':id')
  findOne(@Param('id') id: string): Promise<TeamDto> {
    return this.teamsService.findOneWithAllData(id);
  }

  @UseGuards(AuthGuard('basic'))
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateTeamDto: UpdateTeamDto,
  ): Promise<TeamDto> {
    return this.teamsService.update(id, updateTeamDto);
  }
}
