import * as React from 'react';
import Tabs from '../../components/Layout/Tabs';
import DependencyVisualization from './DependencyVisualization';
import TeamInteractionVisualization from './TeamInteractionVisualization';

const Visualization: React.FC = () => {
  return (
    <Tabs
      tabContent={[
        {
          tabName: 'Team Interactions',
          content: <TeamInteractionVisualization />,
        },
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
