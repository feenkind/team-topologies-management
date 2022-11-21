import * as React from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { setCurrentProject } from '../store/slices/projectSlice';

interface IDataLoaderProps {
  children: React.ReactNode | React.ReactNode[];
}

const DataLoader: React.FC<IDataLoaderProps> = ({
  children,
}: IDataLoaderProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const currentProjectId = useAppSelector(
    (state) => state.project.currentProject.id,
  );
  const projects = useAppSelector((state) => state.project.projects);
  const { projectId } = useParams<{
    projectId: string;
  }>();

  const projectExists = projects.find((project) => project.id === projectId);

  useEffect(() => {
    if (projectId && projectExists && projectId !== currentProjectId) {
      dispatch(setCurrentProject(projectId));
    }
  }, [dispatch, projectId, currentProjectId, projectExists]);

  useEffect(() => {
    if (projectId && !projectExists) {
      navigate('/project-not-found');
    }
  }, [projectExists, projectId, navigate]);

  return <>{children}</>;
};

export default DataLoader;
