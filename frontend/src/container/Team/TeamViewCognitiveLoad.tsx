import * as React from 'react';
import { ITeam } from '../../store/slices/team/teamSlice';
import InformationGrid from '../../components/Layout/InformationGrid';
import { Alert, Box, Paper, Tooltip, Typography } from '@mui/material';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import { grey } from '@mui/material/colors';
import Table from '../../components/Table/Table';
import ComplexityCategory from '../../components/Categories/ComplexityCategory';
import { complexity } from '../../constants/categories';
import { useAppSelector } from '../../hooks';
import ButtonLink from '../../components/Buttons/ButtonLink';
import { useCognitiveLoad } from './useCognitiveLoadHook';

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
  const { isComplexityLoadToHigh, isSubjectiveLoadTooHigh } = useCognitiveLoad({
    team,
    projectId: currentProject.id,
  });

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

  const domainLinksSimple = buildDomainLinks(complexity.SIMPLE);
  const domainLinksComplicated = buildDomainLinks(complexity.COMPLICATED);
  const domainLinksComplex = buildDomainLinks(complexity.COMPLEX);

  // only display complexity categories of domains the team is working on
  const contentItems = [];
  if (domainLinksSimple.length > 0) {
    contentItems.push([
      <ComplexityCategory
        key={complexity.SIMPLE}
        complexity={complexity.SIMPLE}
      />,
      domainLinksSimple,
    ]);
  }
  if (domainLinksComplicated.length > 0) {
    contentItems.push([
      <ComplexityCategory
        key={complexity.COMPLICATED}
        complexity={complexity.COMPLICATED}
      />,
      domainLinksComplicated,
    ]);
  }
  if (domainLinksComplex.length > 0) {
    contentItems.push([
      <ComplexityCategory
        key={complexity.COMPLEX}
        complexity={complexity.COMPLEX}
      />,
      domainLinksComplex,
    ]);
  }

  let loadTooHighText = '';
  if (isSubjectiveLoadTooHigh && isComplexityLoadToHigh) {
    loadTooHighText = `Team ${team.name} has a high cognitive load. The reasons are a very high subjective cognitive load and the responsibility for too
          many or too complex domains.`;
  }
  if (isSubjectiveLoadTooHigh && !isComplexityLoadToHigh) {
    loadTooHighText = `Team ${team.name} has a high cognitive load. The reason is a very high subjective cognitive load. Please check the team size, interaction modes and domain responsibilites and complexities.`;
  }
  if (!isSubjectiveLoadTooHigh && isComplexityLoadToHigh) {
    loadTooHighText = `Team ${team.name} might have a high cognitive load because of its responsibility for too many or too complex domains. Please check the subjective cognitive load of this team.`;
  }

  return (
    <>
      {(isSubjectiveLoadTooHigh || isComplexityLoadToHigh) && (
        <Alert
          severity={isSubjectiveLoadTooHigh ? 'error' : 'warning'}
          sx={{ mb: 3 }}
        >
          {loadTooHighText}
        </Alert>
      )}
      <InformationGrid
        informationItems={[
          {
            label: 'FTE',
            content: team.fte,
          },
          {
            label: 'Subjective cognitive load',
            content: (
              <Box display="flex" alignItems="center">
                {team.cognitiveLoad}
                <Tooltip title="Subjective estimation according to the cognitive load assessment. 25 is a very high cognitive load, 0 is a very low cognitive load.">
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
        Domains this team is responsible for
      </Typography>
      <Paper variant="outlined">
        {team.domains && team.domains.length > 0 ? (
          <Table
            headerItems={['Complexity', 'Domains']}
            headerItemWidthsInPercentage={[30, 70]}
            contentItems={contentItems}
          />
        ) : (
          <Alert severity="info">
            This team does not work on any domains right now.
          </Alert>
        )}
      </Paper>
    </>
  );
};

export default TeamViewCognitiveLoad;
