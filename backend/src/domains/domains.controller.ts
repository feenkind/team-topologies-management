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
import { Domain } from '@prisma/client';

@Controller('domains')
export class DomainsController {
  constructor(private readonly domainService: DomainsService) {}

  @Post()
  create(@Body() createDomainDto: CreateDomainDto): Promise<Domain> {
    return this.domainService.create({
      name: createDomainDto.name,
      description: createDomainDto.description,
      priority: createDomainDto.priority,
      complexity: createDomainDto.complexity,
      project: { connect: { id: createDomainDto.projectId } },
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
    return this.domainService.update({
      data: {
        name: updateDomainDto.name,
        description: updateDomainDto.description,
        priority: updateDomainDto.priority,
        complexity: updateDomainDto.complexity,
        DomainHistory: {
          create: [
            {
              name: updateDomainDto.name,
              description: updateDomainDto.description,
              priority: updateDomainDto.priority,
              complexity: updateDomainDto.complexity,
              changeNote: updateDomainDto.changeNote,
            },
          ],
        },
      },
      where: { id: id },
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.domainService.remove(+id);
  }
}
