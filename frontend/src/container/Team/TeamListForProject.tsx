import * as React from 'react';
import PageHeadline from '../../components/Layout/PageHeadline';
import Table from '../../components/Table/Table';
import { useAppSelector } from '../../hooks';
import ContentWithHints from '../../components/Layout/ContentWithHints';
import TableLinkText from '../../components/Table/TableLinkText';
import TeamTopologyCategory from '../../components/Categories/TeamTopologyCategory';
import ButtonLink from '../../components/Buttons/ButtonLink';
import { Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const TeamListForProject: React.FC = () => {
  const currentProject = useAppSelector(
    (state) => state.project.currentProject,
  );
  const teams = useAppSelector((state) => state.team.teams);
  const projectDomains = useAppSelector(
    (state) => state.domain.domains[currentProject.id],
  );
  const projectTeams = teams.filter((team) =>
    team.projects?.includes(currentProject.id),
  );

  if (projectTeams.length === 0) {
    return (
      <>
        <PageHeadline text={`No teams in ${currentProject.name}`} />
        <Typography variant="body1">
          No teams are working on this project so far.
        </Typography>
        <Button
          variant="contained"
          component={Link}
          to={`/project/${currentProject.id}/team/add`}
          sx={{
            marginTop: 3,
          }}
        >
          Add a team to this project
        </Button>
      </>
    );
  }

  const tableHeaderItems = [
    'Name',
    'Type',
    'Project domains',
    'FTE',
    'Cognitive Load',
  ];
  const tableContentItems = projectTeams.map((team) => [
    <TableLinkText key={team.id} label={team.name} url={`/team/${team.id}`} />,
    <TeamTopologyCategory key={team.id} teamTopology={team.topology} />,
    team.domains?.map((teamDomain) => {
      const domain = projectDomains.find((domain) => domain.id === teamDomain);
      return (
        domain && (
          <ButtonLink
            key={teamDomain}
            label={domain.name}
            url={`/project/${currentProject.id}/domain/${teamDomain}`}
          />
        )
      );
    }),
    team.fte,
    team.cognitiveLoad,
  ]);

  const actions = projectTeams.map((team) => ({
    basePath: `/team/${team.id}`,
    view: true,
    edit: false,
    delete: false,
  }));

  return (
    <>
      <PageHeadline text={`All teams in ${currentProject.name}`} />
      <ContentWithHints>
        <Table
          headerItems={tableHeaderItems}
          contentItems={tableContentItems}
          actions={actions}
        />
      </ContentWithHints>
    </>
  );
};

export default TeamListForProject;
