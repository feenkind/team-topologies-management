import * as React from 'react';
import { useAppSelector } from '../../hooks';
import TableLinkText from '../../components/Table/TableLinkText';
import PageHeadline from '../../components/Layout/PageHeadline';
import Table from '../../components/Table/Table';
import ButtonLink from '../../components/Buttons/ButtonLink';
import TeamTopologyCategory from '../../components/Categories/TeamTopologyCategory';

const TeamList: React.FC = () => {
  const teams = useAppSelector((state) => state.team.teams);
  const projects = useAppSelector((state) => state.project.projects);
  const tableHeaderItems = [
    'Name',
    'Type',
    'Project(s)',
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
      <TeamTopologyCategory key={team.id} teamTopology={team.topology} />,
      team.projects?.map((teamProject) => {
        const project = projects.find((project) => project.id === teamProject);
        return (
          project && (
            <ButtonLink
              key={teamProject}
              label={project.name}
              url={`/project/${teamProject}`}
            />
          )
        );
      }),
      team.fte,
      team.cognitiveLoad,
    ];
  });

  const actions = teams.map((team) => ({
    basePath: `/team/${team.id}`,
    view: true,
    edit: false,
    delete: false,
  }));

  return (
    <>
      <PageHeadline text="All teams" />
      <Table
        headerItems={tableHeaderItems}
        contentItems={tableContentItems}
        actions={actions}
      />
    </>
  );
};

export default TeamList;
