import * as React from 'react';
import Table from '../../components/Table/Table';
import { Paper, Typography } from '@mui/material';
import { useAppSelector } from '../../hooks';
import { ITeam } from '../../store/slices/teamSlice';
import TeamLink from '../../components/Buttons/TeamLink';
import TeamInteractionModeCategory from '../../components/Categories/TeamInteractionModeCategory';

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
  const interactions =
    projectInteractions &&
    projectInteractions.filter(
      (interaction) =>
        interaction.teamIdOne === team.id || interaction.teamIdTwo === team.id,
    );

  return (
    <>
      <Typography variant="button" component="h3" marginBottom={4}>
        Team {team.name} is interacting with
      </Typography>
      <Paper variant="outlined">
        {interactions ? (
          <Table
            headerItems={[
              'Team name',
              'Interaction mode',
              'Purpose',
              'Duration',
              'Additional notes',
            ]}
            headerItemWidthsInPercentage={[20, 15, 25, 15, 25]}
            contentItems={interactions.map((interaction) => {
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
                    interaction.expectedDuration + ' weeks',
                    interaction.additionalInformation || '',
                  ]
                : [];
            })}
          />
        ) : (
          <Typography p={2}>
            This team does not interact with any other teams right now.
          </Typography>
        )}
      </Paper>
    </>
  );
};

export default TeamViewInteractions;
