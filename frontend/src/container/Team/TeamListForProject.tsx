import * as React from 'react';
import PageHeadline from '../../components/Layout/PageHeadline';
import Table from '../../components/Table/Table';
import { useAppSelector } from '../../hooks';
import ContentWithHints from '../../components/Layout/ContentWithHints';
import TableLinkText from '../../components/Table/TableLinkText';
import TeamTopologyCategory from '../../components/Categories/TeamTopologyCategory';
import ButtonLink from '../../components/Buttons/ButtonLink';

const TeamListForProject: React.FC = () => {
  const currentProject = useAppSelector(
    (state) => state.project.currentProject,
  );
  const teams = useAppSelector((state) => state.team.teams);
  const projectDomains = useAppSelector(
    (state) => state.domain.domains[currentProject.id],
  );
  const projectTeams = teams.filter((team) =>
    team.projects?.includes(currentProject.id),
  );

  const tableHeaderItems = [
    'Name',
    'Type',
    'Project domains',
    'FTE',
    'Cognitive Load',
  ];
  const tableContentItems = projectTeams.map((team) => [
    <TableLinkText key={team.id} label={team.name} url={`/team/${team.id}`} />,
    <TeamTopologyCategory key={team.id} teamTopology={team.topology} />,
    team.domains?.map((teamDomain) => {
      const domain = projectDomains.find((domain) => domain.id === teamDomain);
      return (
        domain && (
          <ButtonLink
            key={teamDomain}
            label={domain.name}
            url={`/project/${currentProject.id}/domain/${teamDomain}`}
          />
        )
      );
    }),
    team.fte,
    team.cognitiveLoad,
  ]);

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
