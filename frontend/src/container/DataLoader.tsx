import * as React from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import {
  addAllProjects,
  setCurrentProject,
} from '../store/slices/projectSlice';
import axiosInstance from '../axios';
import { setDataLoaded } from '../store/slices/globalSlice';

interface IDataLoaderProps {
  children: React.ReactNode | React.ReactNode[];
}

const DataLoader: React.FC<IDataLoaderProps> = ({
  children,
}: IDataLoaderProps) => {
  const isDataLoaded = useAppSelector((state) => state.global.isDataLoaded);
  const currentProjectId = useAppSelector(
    (state) => state.project.currentProject.id,
  );
  const projects = useAppSelector((state) => state.project.projects);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { projectId } = useParams<{
    projectId: string;
  }>();

  // load all data if not already done
  useEffect(() => {
    if (!isDataLoaded) {
      axiosInstance
        .request({ url: '/projects' })
        .then((response) => {
          if (response.data && response.data.length > 0) {
            dispatch(addAllProjects(response.data));
            dispatch(setDataLoaded(true));
          }
        })
        .catch(() => {
          dispatch(setDataLoaded(false));
        });
    }
  }, [isDataLoaded, dispatch]);

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
