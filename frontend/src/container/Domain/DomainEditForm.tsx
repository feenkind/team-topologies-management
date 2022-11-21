import * as React from 'react';
import PageHeadline from '../../components/Layout/PageHeadline';
import ContentWithHints from '../../components/Layout/ContentWithHints';
import { useAppSelector } from '../../hooks';
import { useParams } from 'react-router-dom';
import Page404 from '../../components/Page404';

const DomainEditForm: React.FC = () => {
  const { domainId } = useParams<{
    domainId: string;
  }>();
  const currentProject = useAppSelector(
    (state) => state.project.currentProject,
  );
  const domains = useAppSelector(
    (state) => state.domain.domains[currentProject.id] || [],
  );

  const domain = domains && domains.find((domain) => domain.id === domainId);
  if (!domain) {
    return <Page404 />;
  }

  return (
    <>
      <PageHeadline text={`Edit domain ${domain.name}`} />
      <ContentWithHints>will be implemented soon</ContentWithHints>
    </>
  );
};

export default DomainEditForm;
