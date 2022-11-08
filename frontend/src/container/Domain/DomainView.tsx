import * as React from 'react';
import { useAppSelector } from '../../hooks';
import { useParams } from 'react-router-dom';
import Page404 from '../../components/Page404';
import PageHeadline from '../../components/Layout/PageHeadline';
import ContentWithHints from '../../components/Layout/ContentWithHints';
import Tabs from '../../components/Layout/Tabs';
import { Typography } from '@mui/material';
import InformationGrid from '../../components/Layout/InformationGrid';
import ComplexityCategory from '../../components/Categories/ComplexityCategory';
import PriorityCategory from '../../components/Categories/PriorityCategory';
import TeamLink from '../../components/Buttons/TeamLink';

const DomainView: React.FC = () => {
  const { projectId, domainId } = useParams<{
    projectId: string;
    domainId: string;
  }>();
  const domains = useAppSelector((state) => state.domain.domains);
  const teams = useAppSelector((state) => state.team.teams);
  if (!projectId || !domainId) {
    return <Page404 />;
  }

  const domain = domains[projectId].find((domain) => domain.id === domainId);
  if (!domain) {
    return <Page404 />;
  }

  const domainTeams = teams.filter(
    (team) =>
      team.projects?.includes(projectId) && team.domains?.includes(domainId),
  );

  const domainTeamDisplay = domainTeams ? (
    <>
      {domainTeams.map((team) => (
        <TeamLink
          key={team.id}
          teamTopology={team.topology}
          url={`/team/${team.id}`}
          label={team.name}
        />
      ))}
    </>
  ) : (
    'No' + ' team(s)' + ' in this' + ' domain'
  );

  return (
    <>
      <PageHeadline text={`Domain ${domain.name}`} />
      <ContentWithHints>
        <Tabs
          tabContent={[
            {
              tabName: 'Information',
              content: (
                <InformationGrid
                  informationItems={[
                    {
                      label: 'Name',
                      content: domain.name,
                    },
                    {
                      label: 'Priority',
                      content: <PriorityCategory priority={domain.priority} />,
                    },
                    {
                      label: 'Complexity',
                      content: (
                        <ComplexityCategory complexity={domain.complexity} />
                      ),
                    },
                    {
                      label: 'Responsible team(s)',
                      content: domainTeamDisplay,
                    },
                    {
                      label: 'Description',
                      content: domain.description,
                    },
                  ]}
                />
              ),
            },
            {
              tabName: 'History',
              content: <Typography>Not implemented yet</Typography>,
            },
          ]}
        />
      </ContentWithHints>
    </>
  );
};

export default DomainView;
