import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Dependency, DependencyHistory, Prisma } from '@prisma/client';
import { UpdateDependencyDto } from './dto/update-dependency.dto';
import { changeType } from './dto/create-team.dto';

const dependencyDataIsTheSame = (
  current: Dependency,
  updated: UpdateDependencyDto,
): boolean =>
  current.dependencyType === updated.dependencyType &&
  current.description === updated.description;

const dependencyIsTheSame = (
  current: Dependency,
  updated: UpdateDependencyDto,
): boolean =>
  current.teamIdTo === updated.teamIdTo &&
  current.teamIdFrom === updated.teamIdFrom;

@Injectable()
export class DependenciesService {
  constructor(private prisma: PrismaService) {}

  findAll(): Promise<Dependency[]> {
    return this.prisma.dependency.findMany({
      include: { teamFrom: true, teamTo: true },
    });
  }

  findAllHistoric(): Promise<DependencyHistory[]> {
    return this.prisma.dependencyHistory.findMany({
      include: { teamFrom: true, teamTo: true },
    });
  }

  async updateDependenciesForTeamFromId(
    teamIdFrom: string,
    changeNote: string,
    newDependencies: UpdateDependencyDto[],
  ): Promise<Dependency[]> {
    // get current dependencies
    const currentDependencies = await this.prisma.dependency.findMany({
      where: { teamIdFrom: teamIdFrom },
    });

    // check for each update dependency, if it has to be removed, added or
    // changed in the history
    const dependencyHistoryCreateManyInput: Prisma.DependencyHistoryCreateManyInput[] =
      [];
    const dependenciesToKeep: { teamIdFrom: string; teamIdTo: string }[] = [];
    newDependencies.forEach((newDependency) => {
      // all these dependencies should not be deleted later
      dependenciesToKeep.push({
        teamIdFrom: newDependency.teamIdFrom,
        teamIdTo: newDependency.teamIdTo,
      });

      const oldDependencyData = currentDependencies.find((current) =>
        dependencyIsTheSame(current, newDependency),
      );

      // did not exist yet, we need to add
      if (!oldDependencyData) {
        dependencyHistoryCreateManyInput.push({
          teamIdFrom: newDependency.teamIdFrom,
          teamIdTo: newDependency.teamIdTo,
          dependencyType: newDependency.dependencyType,
          description: newDependency.description,
          changeNote: changeNote,
          changeType: changeType.ADDED,
        });
      }

      // did exist but changed
      if (
        oldDependencyData &&
        !dependencyDataIsTheSame(oldDependencyData, newDependency)
      ) {
        dependencyHistoryCreateManyInput.push({
          teamIdFrom: newDependency.teamIdFrom,
          teamIdTo: newDependency.teamIdTo,
          dependencyType: newDependency.dependencyType,
          description: newDependency.description,
          changeNote: changeNote,
          changeType: changeType.CHANGED,
        });
      }
    });

    // check for each existing dependency, if it still exists
    // add as removed to history, if not
    currentDependencies.forEach((current) => {
      if (
        !dependenciesToKeep.find(
          ({ teamIdTo, teamIdFrom }) =>
            teamIdFrom === current.teamIdFrom && teamIdTo === current.teamIdTo,
        )
      ) {
        dependencyHistoryCreateManyInput.push({
          teamIdFrom: current.teamIdFrom,
          teamIdTo: current.teamIdTo,
          dependencyType: current.dependencyType,
          description: current.description,
          changeNote: changeNote,
          changeType: changeType.REMOVED,
        });
      }
    });

    // create history
    await this.prisma.dependencyHistory.createMany({
      data: dependencyHistoryCreateManyInput,
    });

    // update current dependencies = delete and create new
    await this.prisma.dependency.deleteMany({
      where: { teamIdFrom: teamIdFrom },
    });
    await this.prisma.dependency.createMany({
      data: newDependencies.map((dependency) => ({
        teamIdFrom: dependency.teamIdFrom,
        teamIdTo: dependency.teamIdTo,
        dependencyType: dependency.dependencyType,
        description: dependency.description,
      })),
    });

    return this.prisma.dependency.findMany({
      where: { teamIdFrom: teamIdFrom },
    });
  }
}
