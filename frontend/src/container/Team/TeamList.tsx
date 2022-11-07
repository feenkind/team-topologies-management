import * as React from 'react';
import { useAppSelector } from '../../hooks';
import TableLinkText from '../../components/Table/TableLinkText';
import PageHeadline from '../../components/Layout/PageHeadline';
import Table from '../../components/Table/Table';

const TeamList: React.FC = () => {
  const teams = useAppSelector((state) => state.team.teams);
  const tableHeaderItems = [
    'Name',
    'Type',
    'Domain(s)',
    'FTE',
    'Cognitive' + ' Load',
  ];

  const tableContentItems = teams.map((team) => {
    return [
      <TableLinkText
        key={team.id}
        label={team.name}
        url={`/team/${team.id}`}
      />,
      team.topology,
      'will be displayed soon',
      team.fte,
      team.cognitiveLoad,
    ];
  });

  return (
    <>
      <PageHeadline text="All teams" />
      <Table headerItems={tableHeaderItems} contentItems={tableContentItems} />
    </>
  );
};

export default TeamList;
