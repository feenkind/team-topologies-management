import * as React from 'react';
import {
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
import { default as MuiLink } from '@mui/material/Link';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import GitHubIcon from '@mui/icons-material/GitHub';
import CardLight from '../components/Card/CardLight';
import CardCategory from '../components/Card/CardCategory';
import { grey, orange } from '@mui/material/colors';
import QuestionBox from '../components/Card/QuestionBox';
import CardRegular from '../components/Card/CardRegular';

const Dashboard: React.FC = () => {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <CardLight>
            <CardContent>
              <CardCategory>More Information</CardCategory>
              <Typography>
                Main influence for this application are of course the concepts
                of Team Topologies and the existing tools that can be found on
                their github. But inspiration could also be drawn from concepts
                of the Domain-Driven Design. In the sidebars that are displayed
                in this application, e.g. next to the domain list, and beneath
                you can find interesting links that provide more information on
                Team Topologies and Domain-Driven Design.
              </Typography>
              <List
                sx={{
                  borderTop: `1px solid ${grey[300]}`,
                  mt: 3,
                }}
              >
                <ListItem disablePadding>
                  <ListItemButton
                    href="https://teamtopologies.com/book"
                    target="_blank"
                  >
                    <ListItemIcon sx={{ color: orange[600] }}>
                      <MenuBookIcon />
                    </ListItemIcon>
                    <ListItemText primary="Team Topologies: Organizing Business and Technology Teams for Fast Flow" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton
                    href="https://teamtopologies.com/workbook"
                    target="_blank"
                  >
                    <ListItemIcon sx={{ color: orange[600] }}>
                      <MenuBookIcon />
                    </ListItemIcon>
                    <ListItemText primary="Remote Team Interactions Workbook: Using Team Topologies Patterns for Remote Working" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton
                    href="https://github.com/TeamTopologies"
                    target="_blank"
                  >
                    <ListItemIcon sx={{ color: orange[600] }}>
                      <GitHubIcon />
                    </ListItemIcon>
                    <ListItemText primary="Team Topolgies Github Repository" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton
                    href="https://github.com/ddd-crew"
                    target="_blank"
                  >
                    <ListItemIcon sx={{ color: orange[600] }}>
                      <GitHubIcon />
                    </ListItemIcon>
                    <ListItemText primary="Domain-Driven Design Crew Github Repository" />
                  </ListItemButton>
                </ListItem>
              </List>
            </CardContent>
          </CardLight>
        </Grid>

        <Grid item xs={12} md={6}>
          <CardRegular>
            <CardContent>
              <CardCategory>About this application</CardCategory>
              <Typography>
                This application was created as a prototype and part of a
                bachelor thesis to provide team management with the help of team
                topologies. The idea behind is to enable self-organized and
                distributed teams to self-manage based on Team Topologies,
                lowering their cognitive load and increasing their
                effectiveness.
              </Typography>
            </CardContent>
            <CardActions>
              <Typography variant="caption">
                Creator: Veronika Kustermann, Matr.-Nr.: 899080
              </Typography>
            </CardActions>
          </CardRegular>
        </Grid>

        <Grid item xs={12} md={12}>
          <CardLight>
            <CardContent>
              <CardCategory>Short tutorial</CardCategory>
              <QuestionBox headline="How can I see a project specific details?">
                After selecting a project you can see a project specific menu on
                the sidebar.
                <br />
                The Project Overview displays a summary of the most important
                project data.
                <br />
                Visualization shows 3 different kind of visualizations for
                teams, dependencies and domains.
                <br />
                View all project teams displays all teams that are assigned to
                the selected project.
                <br />
                Add new team to project leads to a form for creating a new team
                and assigning it to the selected project.
                <br />
                View all project domains displays all domains that are assigned
                to the selected project.
                <br />
                Add new domain to a form for creating a new domain and assigning
                it to the selected project.
              </QuestionBox>

              <QuestionBox headline="How can I see all projects?">
                You can see all projects by clicking on &quot;Projects&quot; at
                the main navigation on the top or by
                <MuiLink component={Link} to="/projects" mx={0.5}>
                  going to the project list with this link
                </MuiLink>
                .
              </QuestionBox>

              <QuestionBox headline="How can I select an existing project?">
                A project can be selected by either choosing a project from the
                select box on the top left of the left sidebar or by going to
                the
                <MuiLink component={Link} to="/projects" mx={0.5}>
                  project list
                </MuiLink>
                and clicking on a project there.
              </QuestionBox>

              <QuestionBox headline="How can I see all teams?">
                You can see all teams by clicking on &quot;Teams&quot; at the
                main navigation on the top or by
                <MuiLink component={Link} to="/teams" mx={0.5}>
                  going to the teams list with this link
                </MuiLink>
                .
              </QuestionBox>

              <QuestionBox headline="How can I see all notifications?">
                You can see all notifications by clicking on the bell and then
                on &quot;View all notification details&quot; on the at the main
                navigation on the top or by
                <MuiLink component={Link} to="/notifications" mx={0.5}>
                  going to the notifications list with this link
                </MuiLink>
                .<br /> New notifications are visualized with a badge on the
                bell.
              </QuestionBox>

              <QuestionBox headline="How can I add a project?">
                You can either add a project by going to the
                <MuiLink component={Link} to="/projects" mx={0.5}>
                  project list
                </MuiLink>
                and clicking on &quot;Add new project&quot; or by
                <MuiLink component={Link} to="/projects/add" mx={0.5}>
                  clicking on this link
                </MuiLink>
                .
              </QuestionBox>

              <QuestionBox headline="Where can I find the logout button and what does it do?">
                The logout button can be found by clicking on the user icon on
                the top right. Clicking the button removes the data needed for
                basic authentication from your local browser storage
                <br /> After logging out you will see a login form and you need
                to provide the authentication credentials again in order to use
                the application.
              </QuestionBox>
            </CardContent>
          </CardLight>
        </Grid>
      </Grid>
    </>
  );
};

export default Dashboard;
