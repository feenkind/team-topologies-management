import * as React from 'react';
import { LinkObject, NodeObject } from 'react-force-graph-2d';
import { useAppSelector } from '../../hooks';
import ContentVisualization, {
  ILegend,
} from '../../components/Layout/ContentVisualization';
import {
  dependencyColor,
  dependencyType as dependencyTypEnum,
  teamTopology,
  teamTopology as teamTopologyEnum,
  teamTopologyColor,
} from '../../constants/categories';
import { useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import VisualizationGraph from './VisualizationGraph';

interface INode extends NodeObject {
  name?: string;
  teamTopology?: teamTopologyEnum;
}

interface ILink extends LinkObject {
  dependencyType?: dependencyTypEnum;
  description?: string;
}
const DependencyVisualization: React.FC = () => {
  const currentProject = useAppSelector(
    (state) => state.project.currentProject,
  );
  const dependencies = useAppSelector(
    (state) => state.team.dependencies[currentProject.id],
  );
  const teams = useAppSelector((state) => state.team.teams[currentProject.id]);
  const navigate = useNavigate();

  if (!dependencies || dependencies.length === 0) {
    return (
      <ContentVisualization>
        Yay! {currentProject.name} has no team dependencies.
      </ContentVisualization>
    );
  }

  const legend: ILegend[] = [
    {
      description: 'Blocking dependency',
      element: (
        <Box
          sx={{
            backgroundColor: dependencyColor[dependencyTypEnum.BLOCKING],
            height: '3px',
            width: '100%',
          }}
        />
      ),
    },
    {
      description: 'Slowing dependency',
      element: (
        <Box
          sx={{
            backgroundColor: dependencyColor[dependencyTypEnum.SLOWING],
            height: '3px',
            width: '100%',
          }}
        />
      ),
    },
    {
      description: 'OK dependency',
      element: (
        <Box
          sx={{
            backgroundColor: dependencyColor[dependencyTypEnum.OK],
            height: '3px',
            width: '100%',
          }}
        />
      ),
    },
    {
      description: 'A depends on B',
      element: (
        <Box display="flex" alignItems="center">
          <Typography marginRight={1}>A</Typography>
          <TrendingFlatIcon fontSize="large" />
          <Typography marginLeft={1}>B</Typography>
        </Box>
      ),
    },
  ];

  const teamIdsWithDependencies: string[] = [];
  const links: ILink[] = [];
  dependencies.forEach((dependency) => {
    teamIdsWithDependencies.push(dependency.fromTeamId);
    teamIdsWithDependencies.push(dependency.toTeamId);
    links.push({
      source: dependency.fromTeamId,
      target: dependency.toTeamId,
      dependencyType: dependency.dependencyType,
      description: dependency.description,
    });
  });
  // remove duplicates from nodes and add more data
  const nodes: INode[] = Array.from(new Set(teamIdsWithDependencies)).map(
    (teamId) => {
      const teamData = teams.find((team) => team.id === teamId);
      return {
        id: teamId,
        name: teamData ? teamData.name : '',
        teamTopology: teamData ? teamData.topology : teamTopology.UNDEFINED,
      };
    },
  );

  // needed for drawing the border around the nodes
  const nodeRelSize = 2;
  return (
    <VisualizationGraph
      legend={legend}
      links={links}
      linkColorCallback={(link: ILink) =>
        link.dependencyType ? dependencyColor[link.dependencyType] : 'grey'
      }
      linkWidthCallback={(link: ILink) =>
        link.dependencyType &&
        link.dependencyType === dependencyTypEnum.BLOCKING
          ? 3
          : 0.5
      }
      nodeSize={nodeRelSize}
      nodes={nodes}
      nodeCanvasObjectCallback={(node: INode, ctx, globalScale) => {
        if (!node.name || !node.x || !node.y) {
          return;
        }
        // border for nodes
        ctx.beginPath();
        ctx.arc(node.x, node.y, nodeRelSize, 0, 2 * Math.PI, false);
        ctx.lineWidth = 2 / globalScale;
        ctx.strokeStyle = node.teamTopology
          ? teamTopologyColor[node.teamTopology].color
          : 'grey';
        ctx.stroke();

        // team names
        ctx.font = `${10 / globalScale}px sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = 'black';
        ctx.fillText(
          node.name,
          node.x,
          node.y + nodeRelSize + 15 / globalScale,
        );
      }}
      nodeColorCallback={(node: INode) =>
        node.teamTopology
          ? teamTopologyColor[node.teamTopology].backgroundColor
          : 'grey'
      }
      onNodeClickCallback={(node: INode) => {
        // link nodes to the team
        navigate(`/project/${currentProject.id}/team/${node.id}`);
      }}
    />
  );
};

export default DependencyVisualization;
