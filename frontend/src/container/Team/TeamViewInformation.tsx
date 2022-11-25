import * as React from 'react';
import TeamTypeCategory from '../../components/Categories/TeamTypeCategory';
import InformationGrid from '../../components/Layout/InformationGrid';
import { ITeam } from '../../store/slices/team/teamSlice';
import { Box, Typography } from '@mui/material';

interface ITeamViewInformationProps {
  team: ITeam;
}

const TeamViewInformation: React.FC<ITeamViewInformationProps> = ({
  team,
}: ITeamViewInformationProps) => {
  return (
    <InformationGrid
      informationItems={[
        {
          label: 'Name',
          content: team.name,
        },
        {
          label: 'Focus',
          content: team.focus,
        },
        {
          label: 'Team type',
          content: <TeamTypeCategory teamType={team.type} />,
        },
        {
          label: 'Part of a platform',
          content: team.platform ? `Yes, part of ${team.platform}` : 'No',
        },
        {
          label: 'Meetings',
          content: team.meetings
            ? team.meetings.map((meeting, index) => (
                <Box key={`meeting${index}`} pb={1}>
                  {meeting.purpose}
                  <Typography variant="body2" color="text.secondary">{`${
                    meeting.day.charAt(0).toUpperCase() + meeting.day.slice(1)
                  } at ${meeting.time} for ${
                    meeting.durationMinutes
                  } minutes`}</Typography>
                </Box>
              ))
            : 'No meetings',
        },
        {
          label: 'Communication channels',
          content: team.channels
            ? team.channels.map((channel, index) => (
                <Box key={`channel${index}`}>
                  {`${channel.name} (${channel.type})`}
                </Box>
              ))
            : 'No communication channels defined',
        },
        {
          label: 'Wiki search terms',
          content: team.wikiSearchTerms
            ? team.wikiSearchTerms.map(
                (term, index) =>
                  `${term}${
                    team.wikiSearchTerms &&
                    index < team.wikiSearchTerms?.length - 1
                      ? ', '
                      : ''
                  }`,
              )
            : 'No search terms defined',
        },
        {
          label: 'Team creation date',
          content: new Date(team.teamCreationDate).toLocaleDateString('en-GB'),
        },
      ]}
    />
  );
};

export default TeamViewInformation;
