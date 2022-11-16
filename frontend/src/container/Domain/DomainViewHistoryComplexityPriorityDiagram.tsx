import * as React from 'react';
import { IHistoricValue } from '../../store/slices/domainSlice';
import { useTheme } from '@mui/material';
import {
  VictoryAxis,
  VictoryChart,
  VictoryLine,
  VictoryZoomContainer,
} from 'victory';
import { complexity, priority } from '../../constants/categories';

interface IDomainViewHistoryComplexityPriorityDiagramProps {
  complexityValues: IHistoricValue[];
  priorityValues: IHistoricValue[];
}

const mapValueToLevel = (value: complexity | priority): number => {
  if (value === complexity.SIMPLE || value === priority.GENERIC) {
    return 1;
  }
  if (value === complexity.COMPLICATED || value === priority.SUPPORTING) {
    return 2;
  }

  return 3;
};

const DomainViewHistoryComplexityPriorityDiagram: React.FC<
  IDomainViewHistoryComplexityPriorityDiagramProps
> = ({
  complexityValues,
  priorityValues,
}: IDomainViewHistoryComplexityPriorityDiagramProps) => {
  const theme = useTheme();

  // sort by date, copy first because array directly from store is immutable
  const sortedComplexityHistoryValues = complexityValues
    .slice()
    .sort((a, b) => (new Date(a.date) > new Date(b.date) ? -1 : 1));
  const sortedPriorityHistoryValues = priorityValues
    .slice()
    .sort((a, b) => (new Date(a.date) > new Date(b.date) ? -1 : 1));

  const dataComplexity = sortedComplexityHistoryValues.map((historyValue) => ({
    x: new Date(historyValue.date),
    y: mapValueToLevel(historyValue.value),
  }));
  const dataPriority = sortedPriorityHistoryValues.map((historyValue) => ({
    x: new Date(historyValue.date),
    y: mapValueToLevel(historyValue.value),
  }));

  return (
    <VictoryChart
      scale={{ x: 'time', y: 'linear' }}
      containerComponent={
        <VictoryZoomContainer allowPan={false} allowZoom={false} />
      }
    >
      <VictoryAxis
        dependentAxis
        tickFormat={['low', 'medium', 'high']}
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
        data={dataComplexity}
        style={{ data: { stroke: theme.palette.primary.main } }}
      />
      <VictoryLine
        data={dataPriority}
        style={{ data: { stroke: theme.palette.secondary.main } }}
      />
    </VictoryChart>
  );
};

export default DomainViewHistoryComplexityPriorityDiagram;
