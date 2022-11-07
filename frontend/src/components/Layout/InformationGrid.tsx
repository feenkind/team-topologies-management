import * as React from 'react';
import { Grid, Typography } from '@mui/material';

interface IInformationGridProps {
  informationItems: { label: string; content: string | React.ReactNode }[];
}

const InformationGrid: React.FC<IInformationGridProps> = ({
  informationItems,
}: IInformationGridProps) => {
  return (
    <Grid container spacing={2}>
      {informationItems.map((item, index) => (
        <React.Fragment key={`informationGrid${item.label}${index}`}>
          <Grid
            key={`informationGridLabel${item.label}${index}`}
            item
            xs={12}
            md={3}
          >
            <Typography
              key={`informationGridLabelTypo${item.label}${index}`}
              component="span"
              variant="button"
            >
              {item.label}
            </Typography>
          </Grid>
          <Grid
            key={`informationGridContent${item.label}${index}`}
            item
            xs={12}
            md={9}
          >
            {item.content}
          </Grid>
        </React.Fragment>
      ))}
    </Grid>
  );
};

export default InformationGrid;
