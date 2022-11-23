import * as React from 'react';
import { useTheme } from '@mui/material';
import {
  VictoryAxis,
  VictoryChart,
  VictoryLine,
  VictoryTooltip,
  VictoryScatter,
} from 'victory';
import { ITeam } from '../../store/slices/teamSlice';
import { useAppSelector } from '../../hooks';

interface ITeamViewHistoryCognitiveLoadDiagramProps {
  team: ITeam;
  showFte: boolean;
  showCognitiveLoad: boolean;
  showDomainResponsibilities: boolean;
}

const TeamViewHistoryCognitiveLoadDiagram: React.FC<
  ITeamViewHistoryCognitiveLoadDiagramProps
> = ({
  team,
  showFte,
  showCognitiveLoad,
  showDomainResponsibilities,
}: ITeamViewHistoryCognitiveLoadDiagramProps) => {
  const theme = useTheme();
  const currentProject = useAppSelector(
    (state) => state.project.currentProject,
  );
  const domains = useAppSelector(
    (state) => state.domain.domains[currentProject.id] || [],
  );

  const fteHistory = useAppSelector(
    (state) => state.team.historyFte[team.id] || [],
  );
  const cognitiveLoadHistory = useAppSelector(
    (state) => state.team.historyCognitiveLoad[team.id] || [],
  );
  const domainResponsibilityHistory = useAppSelector(
    (state) => state.team.historyDomains[team.id] || [],
  );

  const fteValues = showFte ? fteHistory : [];
  const cognitiveLoadValues = showCognitiveLoad ? cognitiveLoadHistory : [];
  const domainResponsibilities = showDomainResponsibilities
    ? domainResponsibilityHistory
    : [];

  // sort by date ascending, copy first because array directly from store is
  // immutable
  const sortedFteValues = fteValues
    .slice()
    .sort((a, b) => (new Date(a.date) > new Date(b.date) ? 1 : -1));
  const sortedCognitiveLoadValues = cognitiveLoadValues
    .slice()
    .sort((a, b) => (new Date(a.date) > new Date(b.date) ? 1 : -1));
  const sortedDomainResponsibilities = domainResponsibilities
    .slice()
    .sort((a, b) => (new Date(a.date) > new Date(b.date) ? 1 : -1));

  // value of today is the last value and should also be displayed
  const today = new Date();
  sortedFteValues.length > 0 &&
    sortedFteValues.push({
      ...sortedFteValues[sortedFteValues.length - 1],
      date: today.toString(),
    });
  sortedCognitiveLoadValues.length > 0 &&
    sortedCognitiveLoadValues.push({
      ...sortedCognitiveLoadValues[sortedCognitiveLoadValues.length - 1],
      date: today.toString(),
    });
  sortedDomainResponsibilities.length > 0 &&
    sortedDomainResponsibilities.push({
      ...sortedDomainResponsibilities[sortedDomainResponsibilities.length - 1],
      date: today.toString(),
    });

  const dataFte = sortedFteValues.map((fteValue) => ({
    x: new Date(fteValue.date),
    y: fteValue.value,
  }));
  const dataCognitiveLoad = sortedCognitiveLoadValues.map(
    (cognitiveLoadValue) => ({
      x: new Date(cognitiveLoadValue.date),
      y: cognitiveLoadValue.value,
    }),
  );
  const dataDomainResponsibilities = sortedDomainResponsibilities.map(
    (domainResponsibility) => ({
      x: new Date(domainResponsibility.date),
      y: domainResponsibility.domains.length,
    }),
  );

  const createFteTooltip = (index: number): string => {
    return `${new Date(sortedFteValues[index].date).toLocaleDateString(
      'en-GB',
    )}: ${sortedFteValues[index].value} FTE\n Notes: ${
      sortedFteValues[index].changeReason || 'No notes'
    }`;
  };
  const createCognitiveLoadTooltip = (index: number): string => {
    return `${new Date(
      sortedCognitiveLoadValues[index].date,
    ).toLocaleDateString('en-GB')}: ${
      sortedCognitiveLoadValues[index].value
    }\n Notes: ${sortedCognitiveLoadValues[index].changeReason || 'No notes'}`;
  };
  const createdDomainResponsibilityTooltip = (index: number): string => {
    let domainDetails = '';
    sortedDomainResponsibilities[index].domains.forEach((domainId) => {
      const domainData = domains.find((domain) => domain.id === domainId);
      if (domainData) {
        domainDetails += `${domainData.name} (${domainData.complexity})\n`;
      } else {
        domainDetails += 'Unkown domain\n';
      }
    });
    return `${new Date(
      sortedDomainResponsibilities[index].date,
    ).toLocaleDateString('en-GB')}: ${
      sortedDomainResponsibilities[index].domains.length
    } Domain(s)\n \n${domainDetails}\n \nNotes: ${
      sortedDomainResponsibilities[index].changeReason || 'No notes'
    }`;
  };

  return (
    <VictoryChart scale={{ x: 'time', y: 'linear' }} domain={{ y: [0, 25] }}>
      <VictoryAxis
        dependentAxis
        label="Value"
        style={{
          axisLabel: { fontSize: 10, padding: 35 },
          tickLabels: { fontSize: 6 },
        }}
      />
      <VictoryAxis
        label="Date"
        style={{
          axisLabel: { fontSize: 10, padding: 30 },
          tickLabels: { fontSize: 6 },
        }}
      />
      {
        // show transparent line for one year, so the diagram axes shows nice
        // values when no data is rendered
        dataFte.length === 0 && dataCognitiveLoad.length === 0 && (
          <VictoryScatter
            data={[
              {
                y: 0,
                x: new Date(
                  new Date(today).setFullYear(today.getFullYear() - 1),
                ),
              },
              { y: 10, x: new Date(today) },
            ]}
            style={{
              data: { opacity: 0 },
            }}
          />
        )
      }

      <VictoryLine
        // display line for seeing the evolution
        data={dataFte}
        interpolation="stepAfter"
        style={{
          data: { stroke: theme.palette.primary.main, opacity: 0.5 },
        }}
      />
      <VictoryScatter
        // display bubbles for better tooltips
        data={dataFte}
        style={{
          data: { fill: theme.palette.primary.main },
          labels: { fontSize: 6, color: theme.palette.primary.main },
        }}
        labels={({ index }) =>
          // do not show last value, since it is not a real change
          index < sortedFteValues.length - 1 ? createFteTooltip(index) : ''
        }
        labelComponent={
          <VictoryTooltip
            flyoutStyle={{ stroke: theme.palette.primary.main }}
          />
        }
      />

      <VictoryLine
        // display line for seeing the evolution
        data={dataCognitiveLoad}
        interpolation="linear"
        style={{
          data: { stroke: theme.palette.warning.main, opacity: 0.5 },
        }}
      />
      <VictoryScatter
        // display bubbles for better tooltips
        data={dataCognitiveLoad}
        style={{
          data: { fill: theme.palette.warning.main },
          labels: { fontSize: 6, color: theme.palette.warning.main },
        }}
        labels={({ index }) =>
          // do not show last value, since it is not a real change
          index < sortedCognitiveLoadValues.length - 1
            ? createCognitiveLoadTooltip(index)
            : ''
        }
        labelComponent={
          <VictoryTooltip
            flyoutStyle={{ stroke: theme.palette.warning.main }}
            orientation="bottom"
          />
        }
      />

      <VictoryLine
        // display line for seeing the evolution
        data={dataDomainResponsibilities}
        interpolation="stepAfter"
        style={{
          data: { stroke: theme.palette.success.main, opacity: 0.5 },
        }}
      />
      <VictoryScatter
        // display bubbles for better tooltips
        data={dataDomainResponsibilities}
        style={{
          data: { fill: theme.palette.success.main },
          labels: { fontSize: 6, color: theme.palette.success.main },
        }}
        labels={({ index }) =>
          // do not show last value, since it is not a real change
          index < dataDomainResponsibilities.length - 1
            ? createdDomainResponsibilityTooltip(index)
            : ''
        }
        labelComponent={
          <VictoryTooltip
            flyoutStyle={{ stroke: theme.palette.success.main }}
            orientation="top"
          />
        }
      />
    </VictoryChart>
  );
};

export default TeamViewHistoryCognitiveLoadDiagram;
