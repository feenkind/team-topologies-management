import * as React from 'react';
import ForceGraph2D, {
  ForceGraphMethods,
  NodeObject,
  LinkObject,
} from 'react-force-graph-2d';
import { useAppSelector } from '../../hooks';
import ContentVisualization from '../../components/Layout/ContentVisualization';
import { useRef } from 'react';
import {
  dependencyColors,
  dependencyType as dependencyTypEnum,
} from '../../constants/categories';

interface INode extends NodeObject {
  name?: string;
}

interface ILink extends LinkObject {
  dependencyType?: dependencyTypEnum;
}

const DependencyVisualization: React.FC = () => {
  const currentProject = useAppSelector(
    (state) => state.project.currentProject,
  );
  const dependencies = useAppSelector(
    (state) => state.team.dependencies[currentProject.id],
  );
  const teams = useAppSelector((state) => state.team.teams[currentProject.id]);
  const forceGraphRef = useRef<ForceGraphMethods>();

  if (!dependencies || dependencies.length === 0) {
    return (
      <ContentVisualization>
        Yay! {currentProject.name} has no team dependencies.
      </ContentVisualization>
    );
  }

  const teamIdsWithDependencies: string[] = [];
  const links: ILink[] = [];
  dependencies.forEach((dependency) => {
    teamIdsWithDependencies.push(dependency.fromTeamId);
    teamIdsWithDependencies.push(dependency.toTeamId);
    links.push({
      source: dependency.fromTeamId,
      target: dependency.toTeamId,
      dependencyType: dependency.dependencyType,
    });
  });
  // remove duplicates from nodes and add more data
  const nodes: INode[] = Array.from(new Set(teamIdsWithDependencies)).map(
    (teamId) => {
      const teamData = teams.find((team) => team.id === teamId);
      return {
        id: teamId,
        name: teamData ? teamData.name : '',
      };
    },
  );

  return (
    <ContentVisualization>
      <ForceGraph2D
        ref={forceGraphRef}
        graphData={{ nodes, links }}
        enableNodeDrag={false}
        enablePanInteraction={false}
        enableZoomInteraction={false}
        width={500}
        height={500}
        nodeLabel={''}
        nodeCanvasObjectMode={() => 'after'}
        nodeCanvasObject={(node: INode, context, globalScale) => {
          context.font = '5px Roboto';
          context.textAlign = 'center';
          context.textBaseline = 'middle';
          context.fillStyle = 'black';
          if (node.name && node.x && node.y) {
            context.fillText(node.name, node.x, node.y + 10);
          }
        }}
        linkColor={(link: ILink) =>
          link.dependencyType ? dependencyColors[link.dependencyType] : 'grey'
        }
      />
    </ContentVisualization>
  );
};

export default DependencyVisualization;
