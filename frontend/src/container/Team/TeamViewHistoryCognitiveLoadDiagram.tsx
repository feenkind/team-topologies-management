import * as React from 'react';
import { useTheme } from '@mui/material';
import {
  VictoryAxis,
  VictoryChart,
  VictoryLine,
  VictoryTooltip,
  VictoryScatter,
} from 'victory';
import {
  IHistoricCognitiveLoadValue,
  IHistoricFTEValue,
} from '../../store/slices/teamSlice';

interface ITeamViewHistoryCognitiveLoadDiagramProps {
  fteValues: IHistoricFTEValue[];
  cognitiveLoadValues: IHistoricCognitiveLoadValue[];
}

const TeamViewHistoryCognitiveLoadDiagram: React.FC<
  ITeamViewHistoryCognitiveLoadDiagramProps
> = ({
  fteValues,
  cognitiveLoadValues,
}: ITeamViewHistoryCognitiveLoadDiagramProps) => {
  const theme = useTheme();

  // sort by date ascending, copy first because array directly from store is
  // immutable
  const sortedFteValues = fteValues
    .slice()
    .sort((a, b) => (new Date(a.date) > new Date(b.date) ? 1 : -1));
  const sortedCognitiveLoadValues = cognitiveLoadValues
    .slice()
    .sort((a, b) => (new Date(a.date) > new Date(b.date) ? 1 : -1));

  // value of today is the last value and should also be displayed
  const today = new Date();
  sortedFteValues.length > 0 &&
    sortedFteValues.push({
      ...sortedFteValues[sortedFteValues.length - 1],
      date: today.toDateString(),
    });
  sortedCognitiveLoadValues.length > 0 &&
    sortedCognitiveLoadValues.push({
      ...sortedCognitiveLoadValues[sortedCognitiveLoadValues.length - 1],
      date: today.toDateString(),
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

  return (
    <VictoryChart scale={{ x: 'time', y: 'linear' }}>
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
    </VictoryChart>
  );
};

export default TeamViewHistoryCognitiveLoadDiagram;
