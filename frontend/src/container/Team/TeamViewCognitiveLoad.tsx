import * as React from 'react';
import { ITeam } from '../../store/slices/teamSlice';
import InformationGrid from '../../components/Layout/InformationGrid';
import { Box, Paper, Tooltip, Typography } from '@mui/material';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import { grey } from '@mui/material/colors';
import Table from '../../components/Table/Table';
import ComplexityCategory from '../../components/Categories/ComplexityCategory';
import { complexity } from '../../constants/categories';
import { useAppSelector } from '../../hooks';
import ButtonLink from '../../components/Buttons/ButtonLink';

interface ITeamViewCognitiveLoadProps {
  team: ITeam;
}

const TeamViewCognitiveLoad: React.FC<ITeamViewCognitiveLoadProps> = ({
  team,
}: ITeamViewCognitiveLoadProps) => {
  const currentProject = useAppSelector(
    (state) => state.project.currentProject,
  );
  const domains = useAppSelector(
    (state) => state.domain.domains[currentProject.id] || [],
  );

  const buildDomainLinks = (complexity: complexity) =>
    domains
      .filter(
        (domain) =>
          team.domains?.includes(domain.id) && domain.complexity === complexity,
      )
      .map((simpleDomain) => (
        <ButtonLink
          key={simpleDomain.id}
          label={simpleDomain.name}
          url={`/project/${currentProject.id}/domain/${simpleDomain.id}`}
        />
      ));

  return (
    <>
      <InformationGrid
        informationItems={[
          {
            label: 'FTE',
            content: team.fte,
          },
          {
            label: 'Cognitive load',
            content: (
              <Box display="flex" alignItems="center">
                {team.cognitiveLoad}
                <Tooltip title="Subjective estimation according to the cognitive load assessment">
                  <HelpOutlineOutlinedIcon
                    fontSize="small"
                    sx={{ ml: 1, color: grey[400] }}
                  />
                </Tooltip>
              </Box>
            ),
          },
        ]}
      />

      <Typography
        variant="button"
        component="h3"
        marginBottom={4}
        marginTop={9}
      >
        This team is responsible for
      </Typography>
      <Paper variant="outlined">
        {team.domains && team.domains.length > 0 ? (
          <Table
            headerItems={['Complexity', 'Domains']}
            headerItemWidthsInPercentage={[30, 70]}
            contentItems={[
              [
                <ComplexityCategory
                  key={complexity.SIMPLE}
                  complexity={complexity.SIMPLE}
                />,
                buildDomainLinks(complexity.SIMPLE),
              ],
              [
                <ComplexityCategory
                  key={complexity.COMPLICATED}
                  complexity={complexity.COMPLICATED}
                />,
                buildDomainLinks(complexity.COMPLICATED),
              ],
              [
                <ComplexityCategory
                  key={complexity.COMPLEX}
                  complexity={complexity.COMPLEX}
                />,
                buildDomainLinks(complexity.COMPLEX),
              ],
            ]}
          />
        ) : (
          <Typography p={2}>
            This team does not work on any domains right now.
          </Typography>
        )}
      </Paper>
    </>
  );
};

export default TeamViewCognitiveLoad;
