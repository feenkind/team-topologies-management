import * as React from 'react';
import PageHeadline from '../../components/Layout/PageHeadline';
import ContentWithHints from '../../components/Layout/ContentWithHints';
import { useAppSelector } from '../../hooks';

const DomainAddForm: React.FC = () => {
  const currentProject = useAppSelector(
    (state) => state.project.currentProject,
  );
  return (
    <>
      <PageHeadline text={`Add a new domain to ${currentProject.name}`} />
      <ContentWithHints>will be implemented soon</ContentWithHints>
    </>
  );
};

export default DomainAddForm;
