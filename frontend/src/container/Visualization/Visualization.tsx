import * as React from 'react';
import Tabs from '../../components/Layout/Tabs';
import DependencyVisualization from './DependencyVisualization';

const Visualization: React.FC = () => {
  return (
    <Tabs
      tabContent={[
        { tabName: 'Team Interactions', content: 'Not' + ' implemented yet' },
        {
          tabName: 'Dependencies',
          content: <DependencyVisualization />,
        },
        { tabName: 'Core Domain Chart', content: 'Not' + ' implemented yet' },
      ]}
    />
  );
};

export default Visualization;
