import { ITeamFormInput } from './TeamForm';

export const getInvalidFieldNames = (data: ITeamFormInput): string[] => {
  const invalidFieldNames: string[] = [];

  if (data.name.length === 0) {
    invalidFieldNames.push('name');
  }
  if (data.teamType.length === 0) {
    invalidFieldNames.push('teamType');
  }
  if (data.focus.length === 0) {
    invalidFieldNames.push('focus');
  }
  if (isNaN(parseInt(data.fte))) {
    invalidFieldNames.push('fte');
  }
  if (isNaN(parseInt(data.cognitiveLoad))) {
    invalidFieldNames.push('cognitiveLoad');
  }

  if (data.channels && data.channels.length > 0) {
    data.channels.forEach((channel, index) => {
      if (channel.channelType.length === 0) {
        invalidFieldNames.push(`channels.${index}.channelType`);
      }
      if (channel.channelName.length === 0) {
        invalidFieldNames.push(`channels.${index}.channelName`);
      }
    });
  }

  if (data.meetings && data.meetings.length > 0) {
    data.meetings.forEach((meeting, index) => {
      if (meeting.purpose.length === 0) {
        invalidFieldNames.push(`meetings.${index}.purpose`);
      }
      if (meeting.dayOfWeek.length === 0) {
        invalidFieldNames.push(`meetings.${index}.dayOfWeek`);
      }
      if (isNaN(parseInt(meeting.duration))) {
        invalidFieldNames.push(`meetings.${index}.duration`);
      }
      if (meeting.time.length === 0) {
        invalidFieldNames.push(`meetings.${index}.time`);
      }
    });

    if (data.services && data.services.length > 0) {
      data.services.forEach((service, index) => {
        if (service.serviceName.length === 0) {
          invalidFieldNames.push(`services.${index}.serviceName`);
        }
        if (service.versioningType.length === 0) {
          invalidFieldNames.push(`services.${index}.versioningType`);
        }
      });
    }
  }

  if (data.wayOfWorking && data.wayOfWorking.length > 0) {
    data.wayOfWorking.forEach((way, index) => {
      if (way.wayOfWorkingName.length === 0) {
        invalidFieldNames.push(`wayOfWorking.${index}.wayOfWorkingName`);
      }
    });
  }

  if (data.workInProgress && data.workInProgress.length > 0) {
    data.workInProgress.forEach((work, index) => {
      if (work.summary.length === 0) {
        invalidFieldNames.push(`workInProgress.${index}.summary`);
      }
    });
  }

  if (data.dependencies && data.dependencies.length > 0) {
    data.dependencies.forEach((dependency, index) => {
      if (dependency.otherTeamId.length === 0) {
        invalidFieldNames.push(`dependencies.${index}.otherTeamId`);
      }

      if (dependency.dependencyType.length === 0) {
        invalidFieldNames.push(`dependencies.${index}.dependencyType`);
      }

      if (dependency.dependencyDescription.length === 0) {
        invalidFieldNames.push(`dependencies.${index}.dependencyDescription`);
      }
    });
  }

  if (data.interactions && data.interactions.length > 0) {
    data.interactions.forEach((interaction, index) => {
      if (interaction.otherTeamId.length === 0) {
        invalidFieldNames.push(`interactions.${index}.otherTeamId`);
      }

      if (interaction.interactionMode.length === 0) {
        invalidFieldNames.push(`interactions.${index}.interactionMode`);
      }

      if (interaction.interactionPurpose.length === 0) {
        invalidFieldNames.push(`interactions.${index}.interactionPurpose`);
      }

      if (interaction.startDate.length === 0) {
        invalidFieldNames.push(`interactions.${index}.startDate`);
      }

      if (interaction.expectedDuration.length === 0) {
        invalidFieldNames.push(`interactions.${index}.expectedDuration`);
      }
    });
  }

  return invalidFieldNames;
};
