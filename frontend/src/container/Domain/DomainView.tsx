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
  const { domainId } = useParams<{
    domainId: string;
  }>();
  const currentProject = useAppSelector(
    (state) => state.project.currentProject,
  );
  const domains = useAppSelector(
    (state) => state.domain.domains[currentProject.id],
  );
  const teams = useAppSelector((state) => state.team.teams[currentProject.id]);
  if (!domains) {
    return <Page404 />;
  }

  const domain = domains.find((domain) => domain.id === domainId);
  if (!domain) {
    return <Page404 />;
  }

  const domainTeams =
    teams && teams.filter((team) => team.domains?.includes(domain.id));

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
                      label: 'FTE sum of all teams',
                      content: domainTeams
                        ? domainTeams.reduce(
                            (fteSum, team) => fteSum + team.fte,
                            0,
                          )
                        : 0,
                    },
                    {
                      label: 'Responsible team(s)',
                      content:
                        domainTeams &&
                        domainTeams.map((team) => (
                          <TeamLink
                            key={team.id}
                            teamType={team.type}
                            url={`/project/${currentProject.id}/team/${team.id}`}
                            label={team.name}
                          />
                        )),
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
