import * as React from 'react';
import { useState } from 'react';
import { useAppSelector } from '../../hooks';
import ContentVisualization, {
  ILegend,
} from '../../components/Layout/ContentVisualization';
import {
  Alert,
  Box,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import VisualizationGraph from './VisualizationGraph';
import { LinkObject, NodeObject } from 'react-force-graph-2d';
import {
  interactionMode,
  interactionModeColor,
  teamType,
  teamTypeColor,
} from '../../constants/categories';
import { useNavigate } from 'react-router-dom';
import TeamShape from '../../components/TeamShape';
import VisualizationOptionsWrapper from '../../components/Layout/VisualizationOptionsWrapper';

interface INode extends NodeObject {
  name?: string;
  teamType?: teamType;
}

interface ILink extends LinkObject {
  interactionMode?: interactionMode;
}

const getTeamTypeSymbol = (teamTopology: teamType, label: string) => {
  return (
    <Box fontSize={10}>
      <TeamShape label={label} teamType={teamTopology} />
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
  const [showExpectedInteractions, setShowExpectedInteractions] =
    useState<boolean>(false);

  if (!teams || teams.length === 0) {
    return (
      <ContentVisualization>
        <Alert severity="info"> {currentProject.name} has no teams yet.</Alert>
      </ContentVisualization>
    );
  }

  const legend: ILegend[] = [
    {
      description: 'Stream-Aligned Team',
      element: getTeamTypeSymbol(teamType.STREAM_ALIGNED, 'Team A'),
    },
    {
      description: 'Platform Team',
      element: getTeamTypeSymbol(teamType.PLATFORM, 'Team B'),
    },
    {
      description: 'Enabling Team',
      element: getTeamTypeSymbol(teamType.ENABLING, 'Team C'),
    },
    {
      description: 'Complicated Subsystem Team',
      element: getTeamTypeSymbol(teamType.COMPLICATED_SUBSYSTEM, 'Team D'),
    },
    {
      description: 'Undefined Team',
      element: getTeamTypeSymbol(teamType.UNDEFINED, 'Team E'),
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
    teamType: team.type,
  }));

  const currentDate = new Date();
  const interactionsToDisplay = interactions
    ? interactions.filter((interaction) => {
        const startDate = new Date(interaction.startDate);
        return showExpectedInteractions
          ? startDate > currentDate
          : startDate < currentDate;
      })
    : [];

  const links: ILink[] = interactionsToDisplay.map((interaction) => ({
    interactionMode: interaction.interactionMode,
    source: interaction.teamIdOne,
    target: interaction.teamIdTwo,
  }));

  const nodeRelSize = 5;
  return (
    <ContentVisualization legend={legend}>
      <VisualizationOptionsWrapper>
        <ToggleButtonGroup
          exclusive
          value={showExpectedInteractions ? 'expected' : 'current'}
          onChange={(event, value: string | null) => {
            value === 'expected'
              ? setShowExpectedInteractions(true)
              : setShowExpectedInteractions(false);
          }}
          size="small"
          color="primary"
        >
          <ToggleButton value="current">
            <Typography variant="button">Current</Typography>
          </ToggleButton>
          <ToggleButton value="expected">
            <Typography variant="button">Expected</Typography>
          </ToggleButton>
        </ToggleButtonGroup>
      </VisualizationOptionsWrapper>

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
          ctx.beginPath();
          ctx.moveTo(start.x, start.y);
          ctx.lineTo(end.x, end.y);
          ctx.stroke();
        }}
        nodeSize={nodeRelSize}
        nodes={nodes}
        nodeCanvasObjectCallback={(node: INode, ctx, globalScale) => {
          if (!node.name || !node.x || !node.y || !node.teamType) {
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
          ctx.fillStyle = teamTypeColor[node.teamType].backgroundColor;
          // color and width for shape borders
          ctx.lineWidth = 2 / globalScale;
          ctx.strokeStyle = teamTypeColor[node.teamType].color;

          if (
            node.teamType === teamType.STREAM_ALIGNED ||
            node.teamType === teamType.UNDEFINED
          ) {
            const width = teamNameWidth + 30 / globalScale;
            const height = fontSize * 2.5;
            drawRectangleWithRoundedCorners({
              width: width,
              height: height,
              x: node.x - width / 2,
              y: node.y - height / 2,
              isBorderDashed: node.teamType === teamType.UNDEFINED,
            });
          }

          if (node.teamType === teamType.ENABLING) {
            const width = teamNameWidth + 30 / globalScale;
            const height = fontSize * 5;

            drawRectangleWithRoundedCorners({
              width: width,
              height: height,
              x: node.x - width / 2,
              y: node.y - height / 2,
            });
          }

          if (node.teamType === teamType.PLATFORM) {
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

          if (node.teamType === teamType.COMPLICATED_SUBSYSTEM) {
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
          node.teamType ? teamTypeColor[node.teamType].backgroundColor : 'grey'
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
