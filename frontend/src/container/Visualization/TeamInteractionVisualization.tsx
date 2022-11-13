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
          if (!node.name || !node.x || !node.y || !node.teamTopology) {
            return;
          }

          const drawRectangleWithRoundedCorners = ({
            width,
            height,
            x,
            y,
            isBorderDashed,
          }: {
            width: number;
            height: number;
            x: number;
            y: number;
            isBorderDashed?: boolean;
          }) => {
            const radius = 2;

            ctx.beginPath();
            // top left (without corner)
            ctx.moveTo(x + radius, y);
            // line to the right (without corner)
            ctx.lineTo(x + width - radius, y);
            // corner top right
            ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
            // line down (without the corner)
            ctx.lineTo(x + width, y + height - radius);
            // corner bottom right
            ctx.quadraticCurveTo(
              x + width,
              y + height,
              x + width - radius,
              y + height,
            );
            // // line to the left
            ctx.lineTo(x + radius, y + height);
            // // corner bottom left
            ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
            // // line to the top
            ctx.lineTo(x, y + radius);
            // corner top left
            ctx.quadraticCurveTo(x, y, x + radius, y);

            if (isBorderDashed) {
              ctx.setLineDash([1, 1]);
            }

            ctx.fill();
            ctx.stroke();

            // reset border dash
            ctx.setLineDash([0, 0]);
          };

          const drawOctagon = ({
            width,
            height,
            x,
            y,
          }: {
            width: number;
            height: number;
            x: number;
            y: number;
          }) => {
            const edgeLength = 2;

            ctx.beginPath();
            // top left (without corner)
            ctx.moveTo(x + edgeLength, y);
            // line to the right (without corner)
            ctx.lineTo(x + width - edgeLength, y);
            // corner top right
            ctx.lineTo(x + width, y + edgeLength);
            // line down (without the corner)
            ctx.lineTo(x + width, y + height - edgeLength);
            // corner bottom right
            ctx.lineTo(x + width - edgeLength, y + height);
            // // line to the left
            ctx.lineTo(x + edgeLength, y + height);
            // // corner bottom left
            ctx.lineTo(x, y + height - edgeLength);
            // // line to the top
            ctx.lineTo(x, y + edgeLength);
            // corner top left
            ctx.lineTo(x + edgeLength, y);

            ctx.fill();
            ctx.stroke();
          };

          // team names
          const fontSize = 10 / globalScale;
          ctx.font = `${fontSize}px sans-serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillStyle = 'black';
          ctx.fillText(
            node.name,
            node.x,
            node.y + nodeRelSize + 15 / globalScale,
          );

          const teamNameWidth = ctx.measureText(node.name).width;
          // background for shapes
          ctx.fillStyle = teamTopologyColor[node.teamTopology].backgroundColor;
          // color and width for shape borders
          ctx.lineWidth = 2 / globalScale;
          ctx.strokeStyle = teamTopologyColor[node.teamTopology].color;

          if (
            node.teamTopology === teamTopologyEnum.STREAM_ALIGNED ||
            node.teamTopology === teamTopologyEnum.UNDEFINED
          ) {
            drawRectangleWithRoundedCorners({
              width: teamNameWidth,
              height: fontSize * 2,
              x: node.x - teamNameWidth / 2,
              y: node.y - fontSize,
              isBorderDashed: node.teamTopology === teamTopologyEnum.UNDEFINED,
            });
          }

          if (node.teamTopology === teamTopologyEnum.ENABLING) {
            drawRectangleWithRoundedCorners({
              width: teamNameWidth,
              height: fontSize * 4,
              x: node.x - teamNameWidth / 2,
              y: node.y - fontSize * 2,
            });
          }

          if (node.teamTopology === teamTopologyEnum.PLATFORM) {
            ctx.fillRect(
              node.x - teamNameWidth / 2,
              node.y - fontSize * 1.5,
              teamNameWidth,
              fontSize * 3,
            );

            ctx.strokeRect(
              node.x - teamNameWidth / 2,
              node.y - fontSize * 1.5,
              teamNameWidth,
              fontSize * 3,
            );
          }

          if (node.teamTopology === teamTopologyEnum.COMPLICATED_SUBSYSTEM) {
            drawOctagon({
              width: teamNameWidth,
              height: fontSize * 4,
              x: node.x - teamNameWidth / 2,
              y: node.y - fontSize * 2,
            });
          }
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
