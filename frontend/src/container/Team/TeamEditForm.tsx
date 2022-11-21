import * as React from 'react';
import PageHeadline from '../../components/Layout/PageHeadline';
import ContentWithHints from '../../components/Layout/ContentWithHints';
import { useAppSelector } from '../../hooks';
import { useParams } from 'react-router-dom';
import Page404 from '../../components/Page404';

const TeamEditForm: React.FC = () => {
  const { teamId } = useParams<{
    teamId: string;
  }>();
  const currentProject = useAppSelector(
    (state) => state.project.currentProject,
  );
  const teams = useAppSelector((state) => state.team.teams[currentProject.id]);
  const team = teams && teams.find((team) => team.id === teamId);
  if (!team) {
    return <Page404 />;
  }

  return (
    <>
      <PageHeadline text={`Edit domain ${team.name}`} />
      <ContentWithHints>will be implemented soon</ContentWithHints>
    </>
  );
};

export default TeamEditForm;
