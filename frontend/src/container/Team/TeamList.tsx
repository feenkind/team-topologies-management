import * as React from 'react';
import { useAppSelector } from '../../hooks';
import TableLinkText from '../../components/Table/TableLinkText';
import PageHeadline from '../../components/Layout/PageHeadline';
import Table, { ITableAction } from '../../components/Table/Table';
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

  const tableContentItems: (string | React.ReactNode)[][] = [];
  const actions: ITableAction[] = [];

  teams.values.forEach((team) => {
    const teamProjectId = Object.keys(teams).find((projectId) =>
      teams[projectId].includes(team),
    );
    const teamProject = projects.find(
      (project) => project.id === teamProjectId,
    );

    if (teamProject) {
      tableContentItems.push([
        <TableLinkText
          key={team.id}
          label={team.name}
          url={`project/${teamProject.id}/team/${team.id}`}
        />,
        <TeamTopologyCategory key={team.id} teamTopology={team.topology} />,
        <ButtonLink
          key={teamProject.id}
          label={teamProject.name}
          url={`/project/${teamProject}`}
        />,
        team.fte,
        team.cognitiveLoad,
      ]);

      actions.push({
        basePath: `project/${teamProject.id}/team/${team.id}`,
        view: true,
        edit: false,
        delete: false,
      });
    }
  });

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
