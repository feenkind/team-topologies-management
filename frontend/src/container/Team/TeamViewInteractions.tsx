import * as React from 'react';
import Table from '../../components/Table/Table';
import { Box, Paper, Tooltip, Typography } from '@mui/material';
import { useAppSelector } from '../../hooks';
import { IInteraction, ITeam } from '../../store/slices/teamSlice';
import TeamLink from '../../components/Buttons/TeamLink';
import TeamInteractionModeCategory from '../../components/Categories/TeamInteractionModeCategory';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

interface ITeamViewInteractionsProps {
  team: ITeam;
}

const TeamViewInteractions: React.FC<ITeamViewInteractionsProps> = ({
  team,
}: ITeamViewInteractionsProps) => {
  const currentProject = useAppSelector(
    (state) => state.project.currentProject,
  );
  const teams = useAppSelector((state) => state.team.teams[currentProject.id]);
  const projectInteractions = useAppSelector(
    (state) => state.team.interactions[currentProject.id],
  );

  const currentDate = new Date();
  const currentInteractions =
    projectInteractions &&
    projectInteractions.filter(
      (interaction) =>
        (interaction.teamIdOne === team.id ||
          interaction.teamIdTwo === team.id) &&
        interaction.startDate <= currentDate,
    );
  const plannedInteractions =
    projectInteractions &&
    projectInteractions.filter(
      (interaction) =>
        (interaction.teamIdOne === team.id ||
          interaction.teamIdTwo === team.id) &&
        interaction.startDate > currentDate,
    );

  const headerItems = [
    'Team name',
    'Interaction mode',
    'Purpose',
    'Start date',
    'Duration',
    'Additional notes',
  ];
  const headerWidths = [20, 15, 23, 10, 10, 22];

  const isInteractionLongerThanPlanned = (
    startDate: Date,
    durationInWeeks: number,
  ) => {
    // clone to not overwrite the start date
    const expectedDate = new Date(startDate.getTime());
    // set expected date to date + expected time
    expectedDate.setDate(expectedDate.getDate() + durationInWeeks * 7);
    return expectedDate < currentDate;
  };

  const generateInteractionsContent = (interactions: IInteraction[]) =>
    interactions.map((interaction) => {
      const otherTeamId =
        interaction.teamIdOne === team.id
          ? interaction.teamIdTwo
          : interaction.teamIdOne;
      const otherTeam = teams.find((team) => team.id === otherTeamId);

      return otherTeam
        ? [
            <TeamLink
              key={otherTeamId}
              label={otherTeam.name}
              url={`/project/${currentProject.id}/team/${otherTeamId}`}
              teamType={otherTeam.type}
            />,
            <TeamInteractionModeCategory
              key={`interactionModeTo${otherTeamId}`}
              interactionMode={interaction.interactionMode}
            />,
            interaction.purpose,
            interaction.startDate
              ? interaction.startDate.toLocaleDateString('en-GB')
              : '',
            <Box display="flex" alignItems="center" key={otherTeamId}>
              {interaction.expectedDuration + ' weeks'}
              {isInteractionLongerThanPlanned(
                interaction.startDate,
                interaction.expectedDuration,
              ) && (
                <Tooltip title="Please check, as this interaction already takes longer than expected">
                  <WarningAmberIcon
                    fontSize="small"
                    color="warning"
                    sx={{ ml: 1 }}
                  />
                </Tooltip>
              )}
            </Box>,

            interaction.additionalInformation || '',
          ]
        : [];
    });

  return (
    <>
      <Typography variant="button" component="h3" marginBottom={4}>
        Team {team.name} is currently interacting with
      </Typography>
      <Paper variant="outlined">
        {currentInteractions && currentInteractions.length > 0 ? (
          <Table
            headerItems={headerItems}
            headerItemWidthsInPercentage={headerWidths}
            contentItems={generateInteractionsContent(currentInteractions)}
          />
        ) : (
          <Typography p={2}>
            This team does not interact with any other teams right now.
          </Typography>
        )}
      </Paper>

      <Typography
        variant="button"
        component="h3"
        marginBottom={4}
        marginTop={9}
      >
        Team {team.name} expects to interact soon with
      </Typography>
      <Paper variant="outlined">
        {plannedInteractions && plannedInteractions.length > 0 ? (
          <Table
            headerItems={headerItems}
            headerItemWidthsInPercentage={headerWidths}
            contentItems={generateInteractionsContent(plannedInteractions)}
          />
        ) : (
          <Typography p={2}>
            This team does not expect any interactions so far.
          </Typography>
        )}
      </Paper>
    </>
  );
};

export default TeamViewInteractions;
