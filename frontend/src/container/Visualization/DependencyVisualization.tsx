import * as React from 'react';
import ContentVisualization from '../../components/Layout/ContentVisualization';
import { useAppSelector } from '../../hooks';

const DependencyVisualization: React.FC = () => {
  const currentProject = useAppSelector(
    (state) => state.project.currentProject,
  );
  const dependencies = useAppSelector(
    (state) => state.team.dependencies[currentProject.id],
  );
  const teams = useAppSelector((state) => state.team.teams);

  if (!dependencies || dependencies.length === 0) {
    return (
      <ContentVisualization>
        Yay! {currentProject.name} has no team dependencies.
      </ContentVisualization>
    );
  }

  return <ContentVisualization>Will be implemented soon</ContentVisualization>;
};

export default DependencyVisualization;
