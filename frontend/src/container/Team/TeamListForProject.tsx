import * as React from 'react';
import PageHeadline from '../../components/Layout/PageHeadline';
import Table from '../../components/Table/Table';
import { useAppSelector } from '../../hooks';
import ContentWithHints from '../../components/Layout/ContentWithHints';

const TeamListForProject: React.FC = () => {
  const currentProject = useAppSelector(
    (state) => state.project.currentProject,
  );
  const tableHeaderItems = ['Name', 'Type', 'Domains', 'FTE', 'Cognitive Load'];
  const tableContentItems: string[][] = [];

  return (
    <>
      <PageHeadline text={`All teams in ${currentProject.name}`} />
      <ContentWithHints>
        <Table
          headerItems={tableHeaderItems}
          contentItems={tableContentItems}
        />
      </ContentWithHints>
    </>
  );
};

export default TeamListForProject;
