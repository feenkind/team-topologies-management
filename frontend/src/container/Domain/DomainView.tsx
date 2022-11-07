import * as React from 'react';
import { useAppSelector } from '../../hooks';
import { useParams } from 'react-router-dom';
import Page404 from '../../components/Page404';
import PageHeadline from '../../components/PageHeadline';

const DomainView: React.FC = () => {
  const { projectId, domainId } = useParams<{
    projectId: string;
    domainId: string;
  }>();
  const domains = useAppSelector((state) => state.domain.domains);
  if (!projectId) {
    return <Page404 />;
  }

  const domain = domains[projectId].find((domain) => domain.id === domainId);
  if (!domain) {
    return <Page404 />;
  }

  return (
    <>
      <PageHeadline text={`Domain ${domain.name}`} />
      There will be more information soon!
    </>
  );
};

export default DomainView;
