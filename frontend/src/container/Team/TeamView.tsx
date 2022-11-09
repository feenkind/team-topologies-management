import * as React from 'react';
import { useParams } from 'react-router-dom';
import Page404 from '../../components/Page404';
import { useAppSelector } from '../../hooks';
import PageHeadline from '../../components/Layout/PageHeadline';
import ContentWithHints from '../../components/Layout/ContentWithHints';
import Tabs from '../../components/Layout/Tabs';
import TeamViewDependencies from './TeamViewDependencies';
import TeamViewInformation from './TeamViewInformation';

const TeamView: React.FC = () => {
  const { teamId } = useParams<{
    teamId: string;
  }>();
  const team = useAppSelector((state) =>
    state.team.teams.find((team) => teamId && team.id === teamId),
  );

  if (!teamId || !team) {
    return <Page404 />;
  }

  return (
    <>
      <PageHeadline text={`Team ${team.name}`} />
      <ContentWithHints>
        <Tabs
          tabContent={[
            {
              tabName: 'Information',
              content: <TeamViewInformation team={team} />,
            },
            { tabName: 'Work', content: 'coming soon' },
            { tabName: 'Interactions', content: 'coming soon' },
            {
              tabName: 'Dependencies',
              content: <TeamViewDependencies team={team} />,
            },
            { tabName: 'Cognitive Load', content: 'coming soon' },
            { tabName: 'History', content: 'coming later' },
          ]}
        />
      </ContentWithHints>
    </>
  );
};

export default TeamView;
