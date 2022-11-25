import * as React from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Divider,
  Grid,
  Link,
  Paper,
  Toolbar,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { IHint } from '../../constants/hints';

interface IContentWithHintsProps {
  children: React.ReactNode | React.ReactNode[];
  hints?: IHint[];
  isForm?: boolean;
}

const ContentWithHints: React.FC<IContentWithHintsProps> = ({
  children,
  hints,
  isForm,
}: IContentWithHintsProps) => {
  const hintBox = (
    <Paper sx={{ backgroundColor: 'secondary.main', py: 3, px: 2, my: 3 }}>
      <Typography
        variant="subtitle1"
        component="h2"
        align="center"
        sx={{ textTransform: 'uppercase' }}
      >
        More information
      </Typography>
      <Divider variant="middle" sx={{ my: 2 }} />
      {!hints && (
        <Typography align="center" variant="body2" paragraph>
          There is no information to display :(
        </Typography>
      )}
      {hints &&
        hints.map((hint, index) => (
          <Accordion key={`hint${index}`} sx={{ my: 1 }} elevation={1}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              {hint.summary}
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" paragraph>
                {hint.description}
              </Typography>
              {hint.linkUrl && (
                <Button
                  component={Link}
                  href={hint.linkUrl}
                  target="_blank"
                  fullWidth
                  variant="contained"
                  color="secondary"
                >
                  {hint.linkLabel || hint.linkUrl}
                </Button>
              )}
            </AccordionDetails>
          </Accordion>
        ))}
    </Paper>
  );

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} md={9}>
        {children}
      </Grid>
      <Grid item xs={12} md={3}>
        {hintBox}
      </Grid>
      {
        // forms have an action bar at the bottom and need more space
        isForm && <Toolbar />
      }
    </Grid>
  );
};

export default ContentWithHints;
