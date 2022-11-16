import * as React from 'react';
import { IDomain } from '../../store/slices/domainSlice';
import { useAppSelector } from '../../hooks';
import VisualizationOptionsWrapper from '../../components/Layout/VisualizationOptionsWrapper';
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
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

  const [showComplexity, setShowComplexity] = useState<boolean>(false);
  const [showPrioritiy, setShowPriority] = useState<boolean>(false);

  return (
    <>
      <VisualizationOptionsWrapper>
        <Typography variant="button" marginRight={3}>
          (Selected priority & complexity) Show history for
        </Typography>
        <FormGroup row>
          <FormControlLabel
            control={
              <Checkbox
                checked={showComplexity}
                onChange={(event) => setShowComplexity(event.target.checked)}
                disabled={!complexityHistory || complexityHistory.length === 0}
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
                disabled={!priorityHistory || priorityHistory.length === 0}
                color="secondary"
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
