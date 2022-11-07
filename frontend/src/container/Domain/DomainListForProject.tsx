import * as React from 'react';
import PageHeadline from '../../components/PageHeadline';
import Table from '../../components/Table/Table';
import { useAppSelector } from '../../hooks';

const DomainListForProject: React.FC = () => {
  const currentProject = useAppSelector(
    (state) => state.project.currentProject,
  );
  const tableHeaderItems = ['Name', 'Team(s)', 'Priority', 'Complexity', 'FTE'];
  const tableContentItems: string[][] = [];

  return (
    <>
      <PageHeadline text={`All domains in ${currentProject.name}`} />
      <Table headerItems={tableHeaderItems} contentItems={tableContentItems} />
    </>
  );
};

export default DomainListForProject;
