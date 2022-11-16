import * as React from 'react';
import { IHistoricValue } from '../../store/slices/domainSlice';
import { useTheme } from '@mui/material';
import {
  VictoryAxis,
  VictoryChart,
  VictoryLine,
  VictoryTooltip,
  VictoryScatter,
} from 'victory';
import { complexity, priority } from '../../constants/categories';

interface IDomainViewHistoryComplexityPriorityDiagramProps {
  complexityValues: IHistoricValue[];
  priorityValues: IHistoricValue[];
}

const mapValueToLevel = (value: complexity | priority): string => {
  if (value === complexity.SIMPLE || value === priority.GENERIC) {
    return 'low';
  }
  if (value === complexity.COMPLICATED || value === priority.SUPPORTING) {
    return 'medium';
  }

  return 'high';
};

const DomainViewHistoryComplexityPriorityDiagram: React.FC<
  IDomainViewHistoryComplexityPriorityDiagramProps
> = ({
  complexityValues,
  priorityValues,
}: IDomainViewHistoryComplexityPriorityDiagramProps) => {
  const theme = useTheme();

  // sort by date ascending, copy first because array directly from store is
  // immutable
  const sortedComplexityHistoryValues = complexityValues
    .slice()
    .sort((a, b) => (new Date(a.date) > new Date(b.date) ? 1 : -1));
  const sortedPriorityHistoryValues = priorityValues
    .slice()
    .sort((a, b) => (new Date(a.date) > new Date(b.date) ? 1 : -1));

  // value of today is the last value and should also be displayed
  const today = new Date();
  sortedComplexityHistoryValues.length > 0 &&
    sortedComplexityHistoryValues.push({
      ...sortedComplexityHistoryValues[
        sortedComplexityHistoryValues.length - 1
      ],
      date: today.toDateString(),
    });
  sortedPriorityHistoryValues.length > 0 &&
    sortedPriorityHistoryValues.push({
      ...sortedPriorityHistoryValues[sortedPriorityHistoryValues.length - 1],
      date: today.toDateString(),
    });

  const dataComplexity = sortedComplexityHistoryValues.map((historyValue) => ({
    x: new Date(historyValue.date),
    y: mapValueToLevel(historyValue.value),
  }));
  const dataPriority = sortedPriorityHistoryValues.map((historyValue) => ({
    x: new Date(historyValue.date),
    y: mapValueToLevel(historyValue.value),
  }));

  const createComplexityTooltip = (index: number): string => {
    return `${sortedComplexityHistoryValues[index].date}: ${
      sortedComplexityHistoryValues[index].value
    }\n Notes: ${
      sortedComplexityHistoryValues[index].changeReason || 'No notes'
    }`;
  };
  const createPriorityTooltip = (index: number): string => {
    return `${sortedPriorityHistoryValues[index].date}: ${
      sortedPriorityHistoryValues[index].value
    }\n Notes: ${
      sortedPriorityHistoryValues[index].changeReason || 'No notes'
    }`;
  };

  return (
    <VictoryChart scale={{ x: 'time', y: 'linear' }}>
      <VictoryAxis
        dependentAxis
        tickFormat={['low', 'medium', 'high']}
        tickValues={['low', 'medium', 'high']}
        label="Level"
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
      <VictoryLine
        // display line for seeing the evolution
        data={dataComplexity}
        interpolation="stepAfter"
        style={{
          data: { stroke: theme.palette.primary.main, opacity: 0.5 },
        }}
      />
      <VictoryScatter
        // display bubbles for better tooltips
        data={dataComplexity}
        style={{
          data: { fill: theme.palette.primary.main },
          labels: { fontSize: 6, color: theme.palette.primary.main },
        }}
        labels={({ index }) =>
          // do not show last value, since it is not a real change
          index < sortedComplexityHistoryValues.length - 1
            ? createComplexityTooltip(index)
            : ''
        }
        labelComponent={
          <VictoryTooltip
            flyoutStyle={{ stroke: theme.palette.primary.main }}
          />
        }
      />

      <VictoryLine
        data={dataPriority}
        interpolation="stepAfter"
        style={{
          data: { stroke: theme.palette.warning.main, opacity: 0.5 },
        }}
      />
      <VictoryScatter
        // display bubbles for better tooltips
        data={dataPriority}
        style={{
          data: { fill: theme.palette.warning.main },
          labels: { fontSize: 6, color: theme.palette.warning.main },
        }}
        labels={({ index }) =>
          // do not show last value, since it is not a real change
          index < sortedPriorityHistoryValues.length - 1
            ? createPriorityTooltip(index)
            : ''
        }
        labelComponent={
          <VictoryTooltip
            orientation="bottom"
            flyoutStyle={{ stroke: theme.palette.warning.main }}
          />
        }
      />
    </VictoryChart>
  );
};

export default DomainViewHistoryComplexityPriorityDiagram;
