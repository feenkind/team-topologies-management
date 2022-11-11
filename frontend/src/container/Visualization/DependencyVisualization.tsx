import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import ForceGraph2D, {
  ForceGraphMethods,
  LinkObject,
  NodeObject,
} from 'react-force-graph-2d';
import { useAppSelector } from '../../hooks';
import ContentVisualization, {
  ILegend,
} from '../../components/Layout/ContentVisualization';
import {
  dependencyColors,
  dependencyType as dependencyTypEnum,
  teamTopology,
  teamTopology as teamTopologyEnum,
  teamTopologyColors,
} from '../../constants/categories';
import { useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import {
  contentPadding,
  tabsHeight,
  toolbarHeight,
} from '../../constants/sizes';

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

  const forceGraphRef = useRef<ForceGraphMethods>();
  const graphWrapper = useRef<HTMLElement>();
  const [graphWidth, setGraphWidth] = useState<number>(0);
  const [graphHeight, setGraphHeight] = useState<number>(0);

  useEffect(() => {
    const handleResize = () => {
      if (graphWrapper.current?.offsetWidth) {
        setGraphWidth(graphWrapper.current?.offsetWidth);
        setGraphHeight(
          window.innerHeight - toolbarHeight - tabsHeight - 3 * contentPadding,
        );
      }
    };
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [graphWrapper]);

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
            backgroundColor: dependencyColors[dependencyTypEnum.BLOCKING],
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
            backgroundColor: dependencyColors[dependencyTypEnum.SLOWING],
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
            backgroundColor: dependencyColors[dependencyTypEnum.OK],
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
    <ContentVisualization legend={legend}>
      <Box ref={graphWrapper}>
        <ForceGraph2D
          ref={forceGraphRef}
          graphData={{ nodes, links }}
          nodeRelSize={nodeRelSize}
          enableNodeDrag={false}
          enablePanInteraction={false}
          enableZoomInteraction={false}
          width={graphWidth}
          height={graphHeight}
          linkDirectionalArrowLength={1}
          linkDirectionalArrowRelPos={1}
          nodeColor={(node: INode) =>
            node.teamTopology
              ? teamTopologyColors[node.teamTopology].backgroundColor
              : 'grey'
          }
          nodeLabel={''}
          nodeCanvasObjectMode={() => 'before'}
          nodeCanvasObject={(node: INode, ctx, globalScale) => {
            if (!node.name || !node.x || !node.y) {
              return;
            }
            // border for nodes
            ctx.beginPath();
            ctx.arc(node.x, node.y, nodeRelSize, 0, 2 * Math.PI, false);
            ctx.lineWidth = 2 / globalScale;
            ctx.strokeStyle = node.teamTopology
              ? teamTopologyColors[node.teamTopology].color
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
          linkColor={(link: ILink) =>
            link.dependencyType ? dependencyColors[link.dependencyType] : 'grey'
          }
          linkWidth={(link: ILink) =>
            link.dependencyType &&
            link.dependencyType === dependencyTypEnum.BLOCKING
              ? 3
              : 0.5
          }
          linkHoverPrecision={1}
          onNodeClick={(node: INode) => {
            // link nodes to the team
            navigate(`/project/${currentProject.id}/team/${node.id}`);
          }}
          onRenderFramePost={() => {
            forceGraphRef.current?.zoomToFit(0, 100);
          }}
        />
      </Box>
    </ContentVisualization>
  );
};

export default DependencyVisualization;
