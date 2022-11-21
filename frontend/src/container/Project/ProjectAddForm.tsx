import * as React from 'react';
import PageHeadline from '../../components/Layout/PageHeadline';
import ContentWithHints from '../../components/Layout/ContentWithHints';
import { projectHints } from '../../constants/hints';

const ProjectAddForm: React.FC = () => {
  return (
    <>
      <PageHeadline text="Add a new project" />
      <ContentWithHints hints={[projectHints.projectDescription]}>
        will be implemented soon
      </ContentWithHints>
    </>
  );
};

export default ProjectAddForm;
