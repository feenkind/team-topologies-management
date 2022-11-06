import * as React from 'react';
import { useAppSelector } from '../hooks';
import PageHeadline from '../components/PageHeadline';
import Table from '../components/Table/Table';
import TableLinkText from '../components/Table/TableLinkText';

const ProjectList: React.FC = () => {
  const projects = useAppSelector((state) => state.project.projects);
  const tableHeaderItems = ['Name', 'Domains', 'Teams'];
  const tableContentItems = projects.map((project) => [
    <TableLinkText
      key={project.id}
      label={project.name}
      url={`/project/${project.id}`}
    />,
    'not implemented yet',
    'not implemented yet',
  ]);
  const actions = projects.map((project) => ({
    id: project.id,
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
