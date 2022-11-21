import * as React from 'react';
import PageHeadline from '../../components/Layout/PageHeadline';
import Table from '../../components/Table/Table';
import { useAppSelector } from '../../hooks';
import { Alert, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import TableLinkText from '../../components/Table/TableLinkText';
import ContentWithHints from '../../components/Layout/ContentWithHints';
import { domainHints } from '../../constants/hints';
import ComplexityCategory from '../../components/Categories/ComplexityCategory';
import PriorityCategory from '../../components/Categories/PriorityCategory';
import TeamLink from '../../components/Buttons/TeamLink';

const DomainListForProject: React.FC = () => {
  const currentProject = useAppSelector(
    (state) => state.project.currentProject,
  );
  const domains = useAppSelector(
    (state) => state.domain.domains[currentProject.id],
  );
  const teams = useAppSelector((state) => state.team.teams[currentProject.id]);

  if (!domains) {
    return (
      <>
        <PageHeadline text={`No domains in ${currentProject.name}`} />
        <Alert severity="info">
          No domains have been added for this project so far.
        </Alert>
        <Button
          variant="contained"
          component={Link}
          to={`/project/${currentProject.id}/domain/add`}
          sx={{
            marginTop: 3,
          }}
        >
          Add a new domain
        </Button>
      </>
    );
  }

  const tableHeaderItems = ['Name', 'Team(s)', 'Priority', 'Complexity', 'FTE'];
  const tableContentItems = domains.map((domain) => {
    const domainTeams = teams.filter((team) =>
      team.domains?.includes(domain.id),
    );
    const fte = domainTeams.reduce(
      (fteSum, domainTeam) => fteSum + domainTeam.fte,
      0,
    );

    return [
      <TableLinkText
        key={domain.id}
        label={domain.name}
        url={`/project/${currentProject.id}/domain/${domain.id}`}
      />,
      domainTeams.map((domainTeam) => (
        <TeamLink
          key={domainTeam.id}
          teamType={domainTeam.type}
          url={`/project/${currentProject.id}/team/${domainTeam.id}`}
          label={domainTeam.name}
        />
      )),
      <PriorityCategory key={domain.id} priority={domain.priority} />,
      <ComplexityCategory key={domain.id} complexity={domain.complexity} />,
      fte,
    ];
  });
  const actions = domains.map((domain) => ({
    basePath: `/project/${currentProject.id}/domain/${domain.id}`,
    view: true,
    edit: true,
    delete: false,
  }));

  return (
    <>
      <PageHeadline text={`All domains in ${currentProject.name}`} />
      <ContentWithHints
        hints={[domainHints['eventStorming'], domainHints['coreDomainChart']]}
      >
        <Table
          headerItems={tableHeaderItems}
          contentItems={tableContentItems}
          actions={actions}
        />
      </ContentWithHints>
    </>
  );
};

export default DomainListForProject;
