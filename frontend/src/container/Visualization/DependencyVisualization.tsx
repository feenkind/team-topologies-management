import * as React from 'react';
import { LinkObject, NodeObject } from 'react-force-graph-2d';
import { useAppSelector } from '../../hooks';
import ContentVisualization, {
  ILegend,
} from '../../components/Layout/ContentVisualization';
import {
  dependencyColor,
  dependencyType,
  teamType,
  teamTypeColor,
} from '../../constants/categories';
import { useNavigate } from 'react-router-dom';
import {
  Alert,
  Box,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Tooltip,
  Typography,
} from '@mui/material';
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import VisualizationGraph from './VisualizationGraph';
import VisualizationOptionsWrapper from '../../components/Layout/VisualizationOptionsWrapper';
import { useState } from 'react';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useDependencyHistory } from './useDependencyHistory';
import { grey } from '@mui/material/colors';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import { useTeamTypeHistory } from './useTeamTypeHistory';

interface INode extends NodeObject {
  name?: string;
  teamType?: teamType;
}

interface ILink extends LinkObject {
  dependencyType?: dependencyType;
  description?: string;
}

const getDependencyTypeSymbol = (dependencyType: dependencyType) => {
  return (
    <Box
      sx={{
        backgroundColor: dependencyColor[dependencyType],
        height: '3px',
        width: '100%',
      }}
    />
  );
};

const DependencyVisualization: React.FC = () => {
  const currentProject = useAppSelector(
    (state) => state.project.currentProject,
  );
  const teams = useAppSelector((state) => state.team.teams[currentProject.id]);
  const navigate = useNavigate();

  const dependencyHistory = useAppSelector(
    (state) => state.team.historyDependencies[currentProject.id],
  );
  const dependencyHistoryChangeDates =
    dependencyHistory &&
    dependencyHistory.map((dependencyHistory) => dependencyHistory.date);
  // remove duplicate dates and order desc
  const sortedDependencyHistoryChangeDates =
    dependencyHistoryChangeDates &&
    Array.from(new Set(dependencyHistoryChangeDates)).sort((a, b) =>
      new Date(a) > new Date(b) ? -1 : 1,
    );

  const [selectedDate, setSelectedDate] = useState<string>(
    sortedDependencyHistoryChangeDates
      ? sortedDependencyHistoryChangeDates[0]
      : '',
  );
  const [selectedDateIndex, setSelectedDateIndex] = useState<number>(0);

  const { dependencies } = useDependencyHistory({
    projectId: currentProject.id,
    date: selectedDate,
  });
  const { teamTypesByTeamId } = useTeamTypeHistory({
    projectId: currentProject.id,
    date: selectedDate,
  });

  if (!dependencyHistory) {
    return (
      <Alert severity="info">
        {currentProject.name} never had any dependencies.
      </Alert>
    );
  }

  const legend: ILegend[] = [
    {
      description: 'Blocking dependency',
      element: getDependencyTypeSymbol(dependencyType.BLOCKING),
    },
    {
      description: 'Slowing dependency',
      element: getDependencyTypeSymbol(dependencyType.SLOWING),
    },
    {
      description: 'OK dependency',
      element: getDependencyTypeSymbol(dependencyType.OK),
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
        teamType: teamTypesByTeamId[teamId] || teamType.UNDEFINED,
      };
    },
  );

  // needed for drawing the border around the nodes
  const nodeRelSize = 1;
  return (
    <ContentVisualization legend={legend}>
      <VisualizationOptionsWrapper>
        <Typography variant="button" marginRight={1}>
          Show dependency for
        </Typography>
        <Tooltip title="The select box shows all dates with changes to the team depenencies.">
          <HelpOutlineOutlinedIcon
            fontSize="small"
            sx={{ mr: 1, color: grey[400] }}
          />
        </Tooltip>
        <IconButton
          sx={{ mr: 1 }}
          disabled={
            selectedDateIndex ===
              sortedDependencyHistoryChangeDates.length - 1 ||
            selectedDateIndex === -1
          }
          onClick={() => {
            // click back sets the next value in the array, because we have
            // a desc order
            setSelectedDate(
              sortedDependencyHistoryChangeDates[selectedDateIndex + 1],
            );
            setSelectedDateIndex(selectedDateIndex + 1);
          }}
        >
          <ArrowBackIosNewIcon />
        </IconButton>
        <FormControl>
          <InputLabel id="dependency-date-select-label">Date</InputLabel>
          <Select
            size="small"
            labelId="dependency-date-select-label"
            id="dependency-date-select"
            value={selectedDate}
            label="Date"
            onChange={(selectedOption) => {
              setSelectedDate(selectedOption.target.value);
              const selectedDateIndex =
                sortedDependencyHistoryChangeDates.findIndex(
                  (date) => date === selectedOption.target.value,
                );
              setSelectedDateIndex(selectedDateIndex);
            }}
          >
            {sortedDependencyHistoryChangeDates.map((date) => (
              <MenuItem key={date} value={date}>
                {new Date(date).toLocaleDateString('en-GB')}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <IconButton
          sx={{ ml: 1 }}
          disabled={selectedDateIndex < 1}
          onClick={() => {
            // click forwards sets the previous value in the array, because we
            // have a desc order
            setSelectedDate(
              sortedDependencyHistoryChangeDates[selectedDateIndex - 1],
            );
            setSelectedDateIndex(selectedDateIndex - 1);
          }}
        >
          <ArrowForwardIosIcon />
        </IconButton>
      </VisualizationOptionsWrapper>

      {dependencies.length === 0 && (
        <Alert severity="info">
          Yay! {currentProject.name} has no team dependencies at this time.
        </Alert>
      )}

      {dependencies.length > 0 && (
        <VisualizationGraph
          links={links}
          linkColorCallback={(link: ILink) =>
            link.dependencyType ? dependencyColor[link.dependencyType] : 'grey'
          }
          linkWidthCallback={(link: ILink) =>
            link.dependencyType &&
            link.dependencyType === dependencyType.BLOCKING
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
            ctx.strokeStyle = node.teamType
              ? teamTypeColor[node.teamType].color
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
            node.teamType
              ? teamTypeColor[node.teamType].backgroundColor
              : 'grey'
          }
          onNodeClickCallback={(node: INode) => {
            // link nodes to the team
            navigate(`/project/${currentProject.id}/team/${node.id}`);
          }}
          showDirection={true}
          showNodeBubbles={true}
        />
      )}
    </ContentVisualization>
  );
};

export default DependencyVisualization;
