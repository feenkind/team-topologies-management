import * as React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { setCurrentProject } from '../../store/slices/projectSlice';

const SetCurrentProject: React.FC = () => {
  const currentProjectId = useAppSelector(
    (state) => state.project.currentProject.id,
  );
  const dispatch = useAppDispatch();
  const { projectId } = useParams<{
    projectId: string;
  }>();

  useEffect(() => {
    if (projectId && projectId !== currentProjectId) {
      dispatch(setCurrentProject(projectId));
    }
  }, [dispatch, projectId, currentProjectId]);

  return <></>;
};

export default SetCurrentProject;
