import * as React from 'react';
import { useAppSelector } from '../../hooks';
import TableLinkText from '../../components/Table/TableLinkText';
import PageHeadline from '../../components/Layout/PageHeadline';
import Table, { ITableAction } from '../../components/Table/Table';
import ButtonLink from '../../components/Buttons/ButtonLink';
import TeamTypeCategory from '../../components/Categories/TeamTypeCategory';

const TeamList: React.FC = () => {
  const teams = useAppSelector((state) => state.team.teams);
  const projects = useAppSelector((state) => state.project.projects);
  const tableHeaderItems = [
    'Name',
    'Type',
    'Project',
    'FTE',
    'Cognitive' + ' Load',
  ];

  const tableContentItems: (string | React.ReactNode)[][] = [];
  const actions: ITableAction[] = [];

  Object.values(teams).forEach((projectTeams) =>
    projectTeams.forEach((team) => {
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
            url={`/project/${teamProject.id}/team/${team.id}`}
          />,
          <TeamTypeCategory key={team.id} teamType={team.type} />,
          <ButtonLink
            key={teamProject.id}
            label={teamProject.name}
            url={`/project/${teamProject.id}`}
          />,
          team.fte,
          team.cognitiveLoad,
        ]);

        actions.push({
          basePath: `/project/${teamProject.id}/team/${team.id}`,
          view: true,
          edit: false,
          delete: false,
        });
      }
    }),
  );

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
