import * as React from 'react';
import {
  Button,
  CardActions,
  CardContent,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';
import StarIcon from '@mui/icons-material/Star';
import CardLight from '../components/Card/CardLight';
import CardCategory from '../components/Card/CardCategory';

const Dashboard: React.FC = () => {
  // What is this application about
  // Short tutorial
  // What is a project? What is a domain? How big is a team ideally?
  // Highlights
  // More information links
  // view all hints (accordeon?) alphabetically?
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <CardLight>
            <CardContent>
              <CardCategory>Short tutorial</CardCategory>
              <Typography>Here will be a short tutorial</Typography>
            </CardContent>
          </CardLight>
        </Grid>

        <Grid item xs={12} md={6}>
          <CardLight>
            <CardContent>
              <CardCategory>About this application</CardCategory>
              <Typography>
                Hello, this is your dashboard. It is still very empty. Please
                start with the project list in the meantime.
              </Typography>
            </CardContent>
            <CardActions>
              <Button component={Link} to="/projects" variant="contained">
                Go to project list
              </Button>
            </CardActions>
          </CardLight>
        </Grid>

        <Grid item xs={12} md={6}>
          <CardLight>
            <CardContent>
              <CardCategory>References</CardCategory>
              <Typography>
                What was the inspiration for this application?
              </Typography>
              <List>
                <ListItem disablePadding>
                  <ListItemButton href="#">
                    <ListItemIcon>
                      <StarIcon />
                    </ListItemIcon>
                    <ListItemText primary="Team Topologies" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton href="#">
                    <ListItemIcon>
                      <StarIcon />
                    </ListItemIcon>
                    <ListItemText primary="Team Dependencies Tracking" />
                  </ListItemButton>
                </ListItem>
              </List>
            </CardContent>
          </CardLight>
        </Grid>
      </Grid>
    </>
  );
};

export default Dashboard;
