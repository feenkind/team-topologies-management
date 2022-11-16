import * as React from 'react';
import { useAppSelector } from '../../hooks';
import VisualizationOptionsWrapper from '../../components/Layout/VisualizationOptionsWrapper';
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import { useState } from 'react';
import { ITeam } from '../../store/slices/teamSlice';
import TeamViewHistoryCognitiveLoadDiagram from './TeamViewHistoryCognitiveLoadDiagram';
import TeamViewHistoryDependencyTable from './TeamViewHistoryDependencyTable';

interface ITeamViewHistoryProps {
  team: ITeam;
}

const TeamViewHistory: React.FC<ITeamViewHistoryProps> = ({
  team,
}: ITeamViewHistoryProps) => {
  const fteHistory = useAppSelector((state) => state.team.historyFte[team.id]);
  const cognitiveLoadHistory = useAppSelector(
    (state) => state.team.historyCognitiveLoad[team.id],
  );
  const domainResponsibilityHistory = useAppSelector(
    (state) => state.team.historyDomains[team.id],
  );

  const [historyDisplay, setHistoryDisplay] = useState<string>('cognitiveLoad');

  const [showFte, setShowFte] = useState<boolean>(true);
  const [showCognitiveLoad, setShowCognitiveLoad] = useState<boolean>(true);
  const [showDomainResponsibility, setShowDomainResponsibility] =
    useState<boolean>(true);

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
      </VisualizationOptionsWrapper>

      {historyDisplay === 'cognitiveLoad' && (
        <TeamViewHistoryCognitiveLoadDiagram
          fteValues={fteHistory && showFte ? fteHistory : []}
          cognitiveLoadValues={
            cognitiveLoadHistory && showCognitiveLoad
              ? cognitiveLoadHistory
              : []
          }
          domainResponsibilities={
            domainResponsibilityHistory && showDomainResponsibility
              ? domainResponsibilityHistory
              : []
          }
        />
      )}

      {historyDisplay === 'dependencies' && <TeamViewHistoryDependencyTable />}
    </>
  );
};

export default TeamViewHistory;
