import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
} from '@nestjs/common';
import { DomainsService } from './domains.service';
import { CreateDomainDto } from './dto/create-domain.dto';
import { UpdateDomainDto } from './dto/update-domain.dto';
import { ProjectsService } from '../projects/projects.service';
import { Domain } from '@prisma/client';

@Controller('domains')
export class DomainsController {
  constructor(
    private readonly domainService: DomainsService,
    private readonly projectService: ProjectsService,
  ) {}

  @Post()
  create(@Body() createDomainDto: CreateDomainDto): Promise<Domain> {
    return this.projectService.findOne(createDomainDto.projectId).then(
      (project) => {
        return this.domainService.create({
          name: createDomainDto.name,
          description: createDomainDto.description,
          priority: createDomainDto.priority,
          complexity: createDomainDto.complexity,
          project: { connect: { id: project.id } },
          active: true,
          DomainHistory: {
            create: [
              {
                name: createDomainDto.name,
                description: createDomainDto.description,
                priority: createDomainDto.priority,
                complexity: createDomainDto.complexity,
                changeNote: 'Initial creation.',
              },
            ],
          },
        });
      },
      () => null,
    );
  }

  @Get()
  findAll(@Query() query: { includeHistory: boolean }): Promise<Domain[]> {
    return this.domainService.findAll(query.includeHistory);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.domainService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateDomainDto: UpdateDomainDto) {
    return this.domainService.update(+id, updateDomainDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.domainService.remove(+id);
  }
}
