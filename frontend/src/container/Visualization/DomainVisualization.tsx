import * as React from 'react';
import ContentVisualization, {
  ILegend,
} from '../../components/Layout/ContentVisualization';
import { VictoryAxis, VictoryChart, VictoryScatter } from 'victory';
import { useAppSelector } from '../../hooks';
import { complexity, priority } from '../../constants/categories';
import theme from '../../theme';
import CircleIcon from '@mui/icons-material/Circle';
import { Alert } from '@mui/material';

const getNodeColorFromFte = (fteAmount: number): string => {
  if (fteAmount < 5) {
    return theme.palette.primary.light;
  }
  if (fteAmount < 10) {
    return theme.palette.primary.main;
  }
  return theme.palette.primary.dark;
};

const DomainVisualization: React.FC = () => {
  const currentProject = useAppSelector(
    (state) => state.project.currentProject,
  );
  const domains = useAppSelector(
    (state) => state.domain.domains[currentProject.id],
  );
  const teams = useAppSelector((state) => state.team.teams[currentProject.id]);

  const legend: ILegend[] = [
    {
      description: 'Domain has less than 5 FTE',
      element: (
        <CircleIcon
          fontSize="small"
          sx={{ color: theme.palette.primary.light }}
        />
      ),
    },
    {
      description: 'Domain has between 5 and 9 FTE',
      element: (
        <CircleIcon
          fontSize="medium"
          sx={{ color: theme.palette.primary.main }}
        />
      ),
    },
    {
      description: 'Domain has more than 9 FTE',
      element: (
        <CircleIcon
          fontSize="large"
          sx={{ color: theme.palette.primary.dark }}
        />
      ),
    },
  ];

  const data = domains
    ? domains.map((domain) => {
        const domainTeams = teams
          ? teams.filter((team) => team.domains?.includes(domain.id))
          : [];
        const fte = domainTeams.reduce((fteSum, team) => fteSum + team.fte, 0);
        return {
          x: domain.priority,
          y: domain.complexity,
          fte: fte,
          name: domain.name,
        };
      })
    : [];

  return (
    <>
      {data.length == 0 && (
        <Alert severity="info">{currentProject.name} has no domains.</Alert>
      )}

      {data.length > 0 && (
        <ContentVisualization legend={legend}>
          <VictoryChart>
            <VictoryAxis
              dependentAxis
              tickFormat={[
                complexity.SIMPLE,
                complexity.COMPLICATED,
                complexity.COMPLEX,
              ]}
              tickValues={[
                complexity.SIMPLE,
                complexity.COMPLICATED,
                complexity.COMPLEX,
              ]}
              style={{
                axisLabel: { fontSize: 10, padding: 35 },
                tickLabels: { fontSize: 6 },
              }}
            />
            <VictoryAxis
              tickFormat={[
                priority.GENERIC,
                priority.SUPPORTING,
                priority.CORE,
              ]}
              tickValues={[
                priority.GENERIC,
                priority.SUPPORTING,
                priority.CORE,
              ]}
              style={{
                axisLabel: { fontSize: 10, padding: 35 },
                tickLabels: { fontSize: 6 },
              }}
            />
            <VictoryScatter
              data={data}
              style={{
                data: {
                  fill: ({ datum }) => getNodeColorFromFte(datum.fte),
                },
                labels: { fontSize: 6, fill: theme.palette.secondary.dark },
              }}
              labels={({ datum }) => datum.name}
              size={({ datum }) => datum.fte}
            />
          </VictoryChart>
        </ContentVisualization>
      )}
    </>
  );
};

export default DomainVisualization;
