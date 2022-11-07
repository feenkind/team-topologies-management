import * as React from 'react';
import { useAppSelector } from '../../hooks';
import PageHeadline from '../../components/Layout/PageHeadline';
import Table from '../../components/Table/Table';
import TableLinkText from '../../components/Table/TableLinkText';
import ButtonLink from '../../components/Buttons/ButtonLink';

const ProjectList: React.FC = () => {
  const projects = useAppSelector((state) => state.project.projects);
  const domains = useAppSelector((state) => state.domain.domains);

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
      'not implemented yet',
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
