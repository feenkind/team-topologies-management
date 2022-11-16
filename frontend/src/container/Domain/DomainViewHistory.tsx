import * as React from 'react';
import { IDomain } from '../../store/slices/domainSlice';
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
import DomainViewHistoryComplexityPriorityDiagram from './DomainViewHistoryComplexityPriorityDiagram';

interface IDomainViewHistoryProps {
  domain: IDomain;
}

const DomainViewHistory: React.FC<IDomainViewHistoryProps> = ({
  domain,
}: IDomainViewHistoryProps) => {
  const complexityHistory = useAppSelector(
    (state) => state.domain.historyComplexity[domain.id],
  );
  const priorityHistory = useAppSelector(
    (state) => state.domain.historyPriority[domain.id],
  );

  const [showComplexity, setShowComplexity] = useState<boolean>(true);
  const [showPrioritiy, setShowPriority] = useState<boolean>(true);
  const [showHistoryComplexityPriority, setShowHistoryComplexityPriority] =
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
            value={'complexityPriority'}
            label="Show history for"
            onChange={(event) => {
              if (event.target.value === 'complexityPriority') {
                setShowHistoryComplexityPriority(true);
              }
            }}
          >
            <MenuItem value={'complexityPriority'}>
              Complexity and priority
            </MenuItem>
            <MenuItem value={'teams'} disabled>
              Teams
            </MenuItem>
          </Select>
        </FormControl>

        <FormGroup row>
          <FormControlLabel
            control={
              <Checkbox
                checked={showComplexity}
                onChange={(event) => setShowComplexity(event.target.checked)}
                color="primary"
              />
            }
            label="Complexity"
            labelPlacement="end"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={showPrioritiy}
                onChange={(event) => setShowPriority(event.target.checked)}
                color="warning"
              />
            }
            label="Priority"
            labelPlacement="end"
          />
        </FormGroup>
      </VisualizationOptionsWrapper>

      <DomainViewHistoryComplexityPriorityDiagram
        complexityValues={
          complexityHistory && showComplexity ? complexityHistory : []
        }
        priorityValues={priorityHistory && showPrioritiy ? priorityHistory : []}
      />
    </>
  );
};

export default DomainViewHistory;
