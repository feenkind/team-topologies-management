import * as React from 'react';
import { useAppSelector } from '../../hooks';
import ContentVisualization from '../../components/Layout/ContentVisualization';
import { Alert } from '@mui/material';
import VisualizationGraph from './VisualizationGraph';
import { LinkObject, NodeObject } from 'react-force-graph-2d';
import {
  interactionMode,
  interactionModeColor,
  teamTopology as teamTopologyEnum,
  teamTopologyColor,
} from '../../constants/categories';
import { useNavigate } from 'react-router-dom';

interface INode extends NodeObject {
  name?: string;
  teamTopology?: teamTopologyEnum;
}

interface ILink extends LinkObject {
  interactionMode?: interactionMode;
}

const TeamInteractionVisualization: React.FC = () => {
  const currentProject = useAppSelector(
    (state) => state.project.currentProject,
  );
  const teams = useAppSelector((state) => state.team.teams[currentProject.id]);
  const interactions = useAppSelector(
    (state) => state.team.interactions[currentProject.id],
  );
  const navigate = useNavigate();

  if (!teams || teams.length === 0) {
    return (
      <ContentVisualization>
        <Alert severity="info"> {currentProject.name} has no teams yet.</Alert>
      </ContentVisualization>
    );
  }

  const nodes: INode[] = teams.map((team) => ({
    name: team.name,
    id: team.id,
    teamTopology: team.topology,
  }));

  const links: ILink[] =
    interactions && interactions.length > 0
      ? interactions.map((interaction) => ({
          interactionMode: interaction.interactionMode,
          source: interaction.teamIdOne,
          target: interaction.teamIdTwo,
        }))
      : [];

  const nodeRelSize = 5;
  return (
    <ContentVisualization>
      <VisualizationGraph
        links={links}
        linkColorCallback={(link: ILink) =>
          link.interactionMode
            ? interactionModeColor[link.interactionMode].color
            : 'grey'
        }
        linkWidthCallback={() => 2}
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
        showDashedLinks={true}
      />
    </ContentVisualization>
  );
};

export default TeamInteractionVisualization;
