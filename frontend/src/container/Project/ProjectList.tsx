import * as React from 'react';
import { useAppSelector } from '../../hooks';
import PageHeadline from '../../components/Layout/PageHeadline';
import Table from '../../components/Table/Table';
import TableLinkText from '../../components/Table/TableLinkText';
import ButtonLink from '../../components/Buttons/ButtonLink';
import TeamLink from '../../components/Buttons/TeamLink';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

const ProjectList: React.FC = () => {
  const projects = useAppSelector((state) => state.project.projects);
  const domains = useAppSelector((state) => state.domain.domains);
  const teams = useAppSelector((state) => state.team.teams);

  const sortedProjectsByName = projects
    .slice()
    .sort((a, b) => a.name.localeCompare(b.name));

  const tableHeaderItems = ['Name', 'Domains', 'Teams'];
  const tableContentItems = sortedProjectsByName.map((project) => {
    const domainLinks = domains[project.id]
      ? domains[project.id].map((domain) => (
          <ButtonLink
            key={domain.id}
            label={domain.name}
            url={`/project/${project.id}/domain/${domain.id}`}
          />
        ))
      : [];
    const teamLinks = teams[project.id]
      ? teams[project.id].map((projectTeam) => (
          <TeamLink
            key={projectTeam.id}
            label={projectTeam.name}
            url={`/project/${project.id}/team/${projectTeam.id}`}
            teamType={projectTeam.type}
          />
        ))
      : [];

    return [
      <TableLinkText
        key={project.id}
        label={project.name}
        url={`/project/${project.id}`}
      />,
      <>{domainLinks}</>,
      <>{teamLinks}</>,
    ];
  });
  const actions = sortedProjectsByName.map((project) => ({
    basePath: `/project/${project.id}`,
    view: true,
    edit: true,
    delete: false,
  }));

  return (
    <>
      <PageHeadline text="All projects" />
      <Button
        component={Link}
        to="/projects/add"
        variant="contained"
        sx={{ mb: 3 }}
      >
        Add new project
      </Button>
      <Table
        headerItems={tableHeaderItems}
        contentItems={tableContentItems}
        actions={actions}
      />
    </>
  );
};

export default ProjectList;
