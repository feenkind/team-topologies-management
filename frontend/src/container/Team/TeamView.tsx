import * as React from 'react';
import { useParams } from 'react-router-dom';
import Page404 from '../../components/Page404';
import { useAppSelector } from '../../hooks';
import ContentWithHints from '../../components/Layout/ContentWithHints';
import Tabs from '../../components/Layout/Tabs';
import TeamViewDependencies from './TeamViewDependencies';
import TeamViewInformation from './TeamViewInformation';
import TeamPageHeadline from '../../components/Layout/TeamPageHeadline';
import TeamViewWork from './TeamViewWork';
import TeamViewInteractions from './TeamViewInteractions';
import TeamViewCognitiveLoad from './TeamViewCognitiveLoad';
import { useCognitiveLoad } from './useCognitiveLoadHook';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const TeamView: React.FC = () => {
  const { projectId, teamId } = useParams<{
    projectId: string;
    teamId: string;
  }>();
  const team = useAppSelector(
    (state) =>
      (projectId &&
        teamId &&
        state.team.teams[projectId].find((team) => team.id === teamId)) ||
      undefined,
  );
  const { isLoadTooHigh } = useCognitiveLoad({
    team: team,
    projectId: projectId,
  });

  if (!team) {
    return <Page404 />;
  }

  return (
    <>
      <TeamPageHeadline teamName={team.name} teamType={team.topology} />
      <ContentWithHints>
        <Tabs
          tabContent={[
            {
              tabName: 'Information',
              content: <TeamViewInformation team={team} />,
            },
            { tabName: 'Work', content: <TeamViewWork team={team} /> },
            {
              tabName: 'Interactions',
              content: <TeamViewInteractions team={team} />,
            },
            {
              tabName: 'Dependencies',
              content: <TeamViewDependencies team={team} />,
            },
            {
              tabName: 'Cognitive Load',
              content: <TeamViewCognitiveLoad team={team} />,
              tabIcon: isLoadTooHigh ? (
                <ErrorOutlineIcon color="error" />
              ) : undefined,
            },
            { tabName: 'History', content: 'coming later' },
          ]}
        />
      </ContentWithHints>
    </>
  );
};

export default TeamView;
