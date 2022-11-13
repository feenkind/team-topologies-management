import * as React from 'react';
import { useAppSelector } from '../../hooks';
import PageHeadline from '../../components/Layout/PageHeadline';
import Table from '../../components/Table/Table';
import TableLinkText from '../../components/Table/TableLinkText';
import ButtonLink from '../../components/Buttons/ButtonLink';
import TeamLink from '../../components/Buttons/TeamLink';

const ProjectList: React.FC = () => {
  const projects = useAppSelector((state) => state.project.projects);
  const domains = useAppSelector((state) => state.domain.domains);
  const teams = useAppSelector((state) => state.team.teams);

  const tableHeaderItems = ['Name', 'Domains', 'Teams'];
  const tableContentItems = projects.map((project) => {
    const domainLinks = domains[project.id]
      ? domains[project.id].map((domain) => (
          <ButtonLink
            key={domain.id}
            label={domain.name}
            url={`/project/${project.id}/domain/${domain.id}`}
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
      teams[project.id].map((projectTeam) => (
        <TeamLink
          key={projectTeam.id}
          label={projectTeam.name}
          url={`/project/${project.id}/team/${projectTeam.id}`}
          teamType={projectTeam.type}
        />
      )),
    ];
  });
  const actions = projects.map((project) => ({
    basePath: `/project/${project.id}`,
    view: true,
    edit: false,
    delete: false,
  }));

  return (
    <>
      <PageHeadline text="All projects" />
      <Table
        headerItems={tableHeaderItems}
        contentItems={tableContentItems}
        actions={actions}
      />
    </>
  );
};

export default ProjectList;
