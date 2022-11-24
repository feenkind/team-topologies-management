import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { TeamsService } from './teams.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { Dependency, Team } from '@prisma/client';
import { DependenciesService } from './dependencies.service';

@Controller('teams')
export class TeamsController {
  constructor(
    private readonly teamsService: TeamsService,
    private readonly depdendencyService: DependenciesService,
  ) {}

  @Post()
  create(@Body() createTeamDto: CreateTeamDto) {
    return this.teamsService.create(createTeamDto);
  }

  @Get()
  findAll(@Query() query: { includeHistory: boolean }): Promise<Team[]> {
    return this.teamsService.findAll(query.includeHistory);
  }

  @Get('dependencies')
  findAllDependencies(): Promise<Dependency[]> {
    return this.depdendencyService.findAll();
  }

  @Get('dependencies/history')
  findAllDependenciesHistoric(): Promise<Dependency[]> {
    return this.depdendencyService.findAllHistoric();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Team> {
    return this.teamsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTeamDto: UpdateTeamDto) {
    return this.teamsService.update(+id, updateTeamDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.teamsService.remove(+id);
  }
}
