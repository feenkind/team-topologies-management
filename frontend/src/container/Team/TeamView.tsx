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
import TeamViewHistory from './TeamViewHistory';

const TeamView: React.FC = () => {
  const { teamId } = useParams<{
    teamId: string;
  }>();
  const currentProject = useAppSelector(
    (state) => state.project.currentProject,
  );
  const teams = useAppSelector((state) => state.team.teams[currentProject.id]);
  const team = teams && teams.find((team) => team.id === teamId);
  const { isSubjectiveLoadTooHigh } = useCognitiveLoad({
    team: team,
    projectId: currentProject.id,
  });

  if (!team) {
    return <Page404 />;
  }

  return (
    <>
      <TeamPageHeadline teamName={team.name} teamType={team.type} />
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
              tabIcon: isSubjectiveLoadTooHigh ? (
                <ErrorOutlineIcon color="error" />
              ) : undefined,
            },
            { tabName: 'History', content: <TeamViewHistory team={team} /> },
          ]}
        />
      </ContentWithHints>
    </>
  );
};

export default TeamView;
