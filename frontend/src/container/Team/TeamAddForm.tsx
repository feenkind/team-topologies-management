import * as React from 'react';
import PageHeadline from '../../components/Layout/PageHeadline';
import ContentWithHints from '../../components/Layout/ContentWithHints';
import { useAppSelector } from '../../hooks';

const TeamAddForm: React.FC = () => {
  const currentProject = useAppSelector(
    (state) => state.project.currentProject,
  );
  return (
    <>
      <PageHeadline text={`Add a new team to ${currentProject.name}`} />
      <ContentWithHints>will be implemented soon</ContentWithHints>
    </>
  );
};

export default TeamAddForm;
