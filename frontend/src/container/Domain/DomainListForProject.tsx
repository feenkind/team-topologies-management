import * as React from 'react';
import PageHeadline from '../../components/PageHeadline';
import Table from '../../components/Table/Table';
import { useAppSelector } from '../../hooks';
import { Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

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
    domain.name,
    'not implemented yet',
    domain.priority,
    domain.complexity,
    'not implemented yet',
  ]);

  return (
    <>
      <PageHeadline text={`All domains in ${currentProject.name}`} />
      <Table headerItems={tableHeaderItems} contentItems={tableContentItems} />
    </>
  );
};

export default DomainListForProject;
