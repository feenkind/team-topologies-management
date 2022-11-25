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

  if (data.channels.length > 0) {
    data.channels.forEach((channel, index) => {
      if (channel.channelType.length === 0) {
        invalidFieldNames.push(`channels.${index}.channelType`);
      }
      if (channel.channelName.length === 0) {
        invalidFieldNames.push(`channels.${index}.channelName`);
      }
    });
  }

  if (data.meetings.length > 0) {
    data.meetings.forEach((meeting, index) => {
      if (meeting.purpose.length === 0) {
        invalidFieldNames.push(`meetings.${index}.purpose`);
      }
      if (meeting.dayOfWeek.length === 0) {
        invalidFieldNames.push(`meetings.${index}.dayOfWeek`);
      }
      if (meeting.duration.length === 0) {
        invalidFieldNames.push(`meetings.${index}.duration`);
      }
      if (meeting.time.length === 0) {
        invalidFieldNames.push(`meetings.${index}.time`);
      }
    });
  }

  return invalidFieldNames;
};
