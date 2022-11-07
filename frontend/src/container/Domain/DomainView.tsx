import * as React from 'react';
import { useAppSelector } from '../../hooks';
import { useParams } from 'react-router-dom';
import Page404 from '../../components/Page404';
import PageHeadline from '../../components/Layout/PageHeadline';
import ContentWithHints from '../../components/Layout/ContentWithHints';
import Tabs from '../../components/Layout/Tabs';

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
      <ContentWithHints>
        <Tabs />
      </ContentWithHints>
    </>
  );
};

export default DomainView;
