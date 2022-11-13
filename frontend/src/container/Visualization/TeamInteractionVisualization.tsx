import * as React from 'react';
import { useAppSelector } from '../../hooks';
import ContentVisualization, {
  ILegend,
} from '../../components/Layout/ContentVisualization';
import { Alert, Box } from '@mui/material';
import VisualizationGraph from './VisualizationGraph';
import { LinkObject, NodeObject } from 'react-force-graph-2d';
import {
  interactionMode,
  interactionModeColor,
  teamTopology,
  teamTopologyColor,
} from '../../constants/categories';
import { useNavigate } from 'react-router-dom';
import TeamShape from '../../components/TeamShape';

interface INode extends NodeObject {
  name?: string;
  teamTopology?: teamTopology;
}

interface ILink extends LinkObject {
  interactionMode?: interactionMode;
}

const getTeamTypeSymbol = (teamTopology: teamTopology, label: string) => {
  return (
    <Box fontSize={10}>
      <TeamShape label={label} teamTopology={teamTopology} />
    </Box>
  );
};

const getInteractionModeSymbol = (interactionMode: interactionMode) => {
  return (
    <Box
      position="relative"
      borderTop={`6px dashed ${interactionModeColor[interactionMode].backgroundColor}`}
      width="100%"
    >
      <Box
        position="absolute"
        top={-3}
        left={0}
        borderTop={`1px solid ${interactionModeColor[interactionMode].color}`}
        width="100%"
      />
    </Box>
  );
};

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

  const legend: ILegend[] = [
    {
      description: 'Stream Aligned Team',
      element: getTeamTypeSymbol(teamTopology.STREAM_ALIGNED, 'Team A'),
    },
    {
      description: 'Platform Team',
      element: getTeamTypeSymbol(teamTopology.PLATFORM, 'Team B'),
    },
    {
      description: 'Enabling Team',
      element: getTeamTypeSymbol(teamTopology.ENABLING, 'Team C'),
    },
    {
      description: 'Complicated Subsystem Team',
      element: getTeamTypeSymbol(teamTopology.COMPLICATED_SUBSYSTEM, 'Team D'),
    },
    {
      description: 'Undefined Team',
      element: getTeamTypeSymbol(teamTopology.UNDEFINED, 'Team E'),
    },
    {
      description: 'Collaboration Interaction',
      element: getInteractionModeSymbol(interactionMode.COLLABORATION),
    },
    {
      description: 'X-as-a-Service Interaction',
      element: getInteractionModeSymbol(interactionMode.X_AS_A_SERVICE),
    },
    {
      description: 'Facilitating Interaction',
      element: getInteractionModeSymbol(interactionMode.FACILITATING),
    },
    {
      description: 'Undefined Interaction',
      element: getInteractionModeSymbol(interactionMode.UNDEFINED),
    },
  ];

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
    <ContentVisualization legend={legend}>
      <VisualizationGraph
        links={links}
        linkColorCallback={(link: ILink) =>
          link.interactionMode
            ? interactionModeColor[link.interactionMode].backgroundColor
            : 'grey'
        }
        linkWidthCallback={() => 10}
        linkCanvasObjectCallback={(link: ILink, ctx, globalScale) => {
          const start = link.source;
          const end = link.target;

          if (
            !link.interactionMode ||
            typeof start !== 'object' ||
            typeof end !== 'object' ||
            !start.x ||
            !start.y ||
            !end.x ||
            !end.y
          ) {
            return;
          }

          ctx.lineWidth = 2 / globalScale;
          ctx.strokeStyle = interactionModeColor[link.interactionMode].color;
          ctx.moveTo(start.x, start.y);
          ctx.lineTo(end.x, end.y);
          ctx.stroke();
        }}
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
            const radius = 6 / globalScale;

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
            ctx.setLineDash([]);
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
            const edgeLength = height / 4;

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
          const fontSize = 12 / globalScale;
          ctx.font = `${fontSize}px sans-serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';

          const teamNameWidth = ctx.measureText(node.name).width;
          // background for shapes
          ctx.fillStyle = teamTopologyColor[node.teamTopology].backgroundColor;
          // color and width for shape borders
          ctx.lineWidth = 2 / globalScale;
          ctx.strokeStyle = teamTopologyColor[node.teamTopology].color;

          if (
            node.teamTopology === teamTopology.STREAM_ALIGNED ||
            node.teamTopology === teamTopology.UNDEFINED
          ) {
            const width = teamNameWidth + 30 / globalScale;
            const height = fontSize * 2.5;
            drawRectangleWithRoundedCorners({
              width: width,
              height: height,
              x: node.x - width / 2,
              y: node.y - height / 2,
              isBorderDashed: node.teamTopology === teamTopology.UNDEFINED,
            });
          }

          if (node.teamTopology === teamTopology.ENABLING) {
            const width = teamNameWidth + 30 / globalScale;
            const height = fontSize * 5;

            drawRectangleWithRoundedCorners({
              width: width,
              height: height,
              x: node.x - width / 2,
              y: node.y - height / 2,
            });
          }

          if (node.teamTopology === teamTopology.PLATFORM) {
            const width = teamNameWidth + 30 / globalScale;
            const height = fontSize * 3.5;

            ctx.fillRect(
              node.x - width / 2,
              node.y - height / 2,
              width,
              height,
            );

            ctx.strokeRect(
              node.x - width / 2,
              node.y - height / 2,
              width,
              height,
            );
          }

          if (node.teamTopology === teamTopology.COMPLICATED_SUBSYSTEM) {
            const width = teamNameWidth + 40 / globalScale;
            const height = fontSize * 3.5;

            drawOctagon({
              width: width,
              height: height,
              x: node.x - width / 2,
              y: node.y - height / 2,
            });
          }

          // draw team names on top
          ctx.fillStyle = 'black';
          ctx.fillText(node.name, node.x, node.y);
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
