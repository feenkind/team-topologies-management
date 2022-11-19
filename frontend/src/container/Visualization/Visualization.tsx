import * as React from 'react';
import Tabs from '../../components/Layout/Tabs';
import DependencyVisualization from './DependencyVisualization';
import TeamInteractionVisualization from './TeamInteractionVisualization';
import DomainVisualization from './DomainVisualization';

const Visualization: React.FC = () => {
  return (
    <Tabs
      tabContent={[
        {
          tabName: 'Teams',
          content: <TeamInteractionVisualization />,
        },
        {
          tabName: 'Dependencies',
          content: <DependencyVisualization />,
        },
        { tabName: 'Domains', content: <DomainVisualization /> },
      ]}
    />
  );
};

export default Visualization;
