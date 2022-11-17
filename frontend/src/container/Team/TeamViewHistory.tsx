import * as React from 'react';
import VisualizationOptionsWrapper from '../../components/Layout/VisualizationOptionsWrapper';
import {
  Alert,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { ITeam } from '../../store/slices/teamSlice';
import TeamViewHistoryCognitiveLoadDiagram from './TeamViewHistoryCognitiveLoadDiagram';
import TeamViewHistoryDependencyTable from './TeamViewHistoryDependencyTable';
import { useAppSelector } from '../../hooks';

interface ITeamViewHistoryProps {
  team: ITeam;
}

const TeamViewHistory: React.FC<ITeamViewHistoryProps> = ({
  team,
}: ITeamViewHistoryProps) => {
  const [historyDisplay, setHistoryDisplay] = useState<string>('cognitiveLoad');
  const [showFte, setShowFte] = useState<boolean>(true);
  const [showCognitiveLoad, setShowCognitiveLoad] = useState<boolean>(true);
  const [showDomainResponsibility, setShowDomainResponsibility] =
    useState<boolean>(true);

  const currentProject = useAppSelector(
    (state) => state.project.currentProject,
  );
  const otherTeams = useAppSelector((state) =>
    state.team.teams[currentProject.id].filter(
      (teamValue) => teamValue.id !== team.id,
    ),
  );
  const [selectedTeamId, setSelectedTeamId] = useState<string>(
    otherTeams.length > 0 ? otherTeams[0].id : '',
  );

  const selectedOtherTeam = otherTeams.find(
    (team) => team.id === selectedTeamId,
  );

  return (
    <>
      <VisualizationOptionsWrapper>
        <FormControl sx={{ mr: 3 }}>
          <InputLabel id="history-select-label">Show history for</InputLabel>
          <Select
            size="small"
            labelId="history-select-label"
            id="history-select"
            value={historyDisplay}
            label="Show history for"
            onChange={(selectedOption) =>
              setHistoryDisplay(selectedOption.target.value)
            }
          >
            <MenuItem value={'cognitiveLoad'}>Cognitive Load</MenuItem>
            <MenuItem value={'dependencies'}>Dependencies</MenuItem>
            <MenuItem value={'interactions'} disabled>
              Interactions
            </MenuItem>
          </Select>
        </FormControl>

        {historyDisplay === 'cognitiveLoad' && (
          <FormGroup row>
            <FormControlLabel
              control={
                <Checkbox
                  checked={showFte}
                  onChange={(event) => setShowFte(event.target.checked)}
                  color="primary"
                />
              }
              label="FTE"
              labelPlacement="end"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={showCognitiveLoad}
                  onChange={(event) =>
                    setShowCognitiveLoad(event.target.checked)
                  }
                  color="warning"
                />
              }
              label="Cognitive load"
              labelPlacement="end"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={showDomainResponsibility}
                  onChange={(event) =>
                    setShowDomainResponsibility(event.target.checked)
                  }
                  color="success"
                />
              }
              label="Domain responsibility"
              labelPlacement="end"
            />
          </FormGroup>
        )}

        {historyDisplay === 'dependencies' && otherTeams.length > 0 && (
          <>
            <Typography mr={3}>with team</Typography>
            <FormControl>
              <InputLabel id="dependency-team-select-label">
                Team name
              </InputLabel>
              <Select
                size="small"
                labelId="dependency-team-select-label"
                id="dependency-team-select"
                value={selectedTeamId}
                label="Team name"
                onChange={(selectedOption) =>
                  setSelectedTeamId(selectedOption.target.value)
                }
              >
                {otherTeams.map((team) => (
                  <MenuItem key={team.id} value={team.id}>
                    {team.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </>
        )}
      </VisualizationOptionsWrapper>

      {historyDisplay === 'cognitiveLoad' && (
        <TeamViewHistoryCognitiveLoadDiagram
          team={team}
          showFte={showFte}
          showCognitiveLoad={showCognitiveLoad}
          showDomainResponsibilities={showDomainResponsibility}
        />
      )}

      {historyDisplay === 'dependencies' && selectedOtherTeam && (
        <TeamViewHistoryDependencyTable
          team={team}
          otherTeam={selectedOtherTeam}
        />
      )}
      {historyDisplay === 'dependencies' && !selectedOtherTeam && (
        <Alert severity="info" sx={{ mt: 3 }}>
          This project has no other teams and therefore {team.name} had no
          dependencies within the project.
        </Alert>
      )}
    </>
  );
};

export default TeamViewHistory;
