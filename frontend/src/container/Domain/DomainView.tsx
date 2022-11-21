import * as React from 'react';
import { useAppSelector } from '../../hooks';
import { Link, useParams } from 'react-router-dom';
import Page404 from '../../components/Page404';
import PageHeadline from '../../components/Layout/PageHeadline';
import ContentWithHints from '../../components/Layout/ContentWithHints';
import Tabs from '../../components/Layout/Tabs';
import DomainViewInformation from './DomainViewInformation';
import DomainViewHistory from './DomainViewHistory';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

const DomainView: React.FC = () => {
  const { domainId } = useParams<{
    domainId: string;
  }>();
  const currentProject = useAppSelector(
    (state) => state.project.currentProject,
  );
  const domains = useAppSelector(
    (state) => state.domain.domains[currentProject.id] || [],
  );

  const domain = domains.find((domain) => domain.id === domainId);
  if (!domain) {
    return <Page404 />;
  }

  return (
    <>
      <PageHeadline text={`Domain ${domain.name}`}>
        <IconButton
          component={Link}
          to={`/project/${currentProject.id}/domain/${domain.id}/edit`}
          sx={{ ml: 2 }}
          size="small"
        >
          <EditIcon />
        </IconButton>
      </PageHeadline>

      <ContentWithHints>
        <Tabs
          tabContent={[
            {
              tabName: 'Information',
              content: <DomainViewInformation domain={domain} />,
            },
            {
              tabName: 'History',
              content: <DomainViewHistory domain={domain} />,
            },
          ]}
        />
      </ContentWithHints>
    </>
  );
};

export default DomainView;
