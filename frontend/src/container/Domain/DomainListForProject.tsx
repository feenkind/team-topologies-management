import * as React from 'react';
import PageHeadline from '../../components/PageHeadline';
import Table from '../../components/Table/Table';
import { useAppSelector } from '../../hooks';
import { Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import TableLinkText from '../../components/Table/TableLinkText';
import ContentWithHints from '../../components/ContentWithHints';
import { domainHints } from '../../constants/hints';

const DomainListForProject: React.FC = () => {
  const currentProject = useAppSelector(
    (state) => state.project.currentProject,
  );
  const projectDomains = useAppSelector(
    (state) => state.domain.domains[currentProject.id],
  );

  if (!projectDomains) {
    return (
      <>
        <PageHeadline text={`No domains in ${currentProject.name}`} />
        <Typography variant="body1">
          No domains have been added for this project so far.
        </Typography>
        <Button
          variant="contained"
          component={Link}
          to={`/project/${currentProject.id}/domains/add`}
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
  const tableContentItems = projectDomains.map((domain) => [
    <TableLinkText
      key={domain.id}
      label={domain.name}
      url={`/project/${currentProject.id}/domain/${domain.id}`}
    />,
    'not implemented yet',
    domain.priority,
    domain.complexity,
    'not implemented yet',
  ]);
  const actions = projectDomains.map((domain) => ({
    basePath: `/project/${currentProject.id}/domain/${domain.id}`,
    view: true,
    edit: false,
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
