import * as React from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import {
  addAllProjects,
  setCurrentProject,
} from '../store/slices/projectSlice';
import axiosInstance from '../axios';
import { setDataLoaded, setNetworkError } from '../store/slices/globalSlice';
import axios from 'axios';
import { addAllDomains } from '../store/slices/domainSlice';

interface IDataLoaderProps {
  children: React.ReactNode | React.ReactNode[];
}

const DataLoader: React.FC<IDataLoaderProps> = ({
  children,
}: IDataLoaderProps) => {
  const isDataLoaded = useAppSelector((state) => state.global.dataLoaded);
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
      const requests = [
        axiosInstance.get('/projects'),
        axiosInstance.get('/domains'),
      ];

      axios
        .all(requests)
        .then((responses) => {
          const projectData = responses[0].data;
          const domainData = responses[1].data;

          dispatch(addAllProjects(projectData));
          dispatch(addAllDomains(domainData));

          dispatch(setDataLoaded(true));
          dispatch(setNetworkError(false));
        })
        .catch(() => {
          dispatch(setDataLoaded(false));
          dispatch(setNetworkError(true));
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
    if (isDataLoaded && projectId && !projectExists) {
      navigate('/project-not-found');
    }
  }, [projectExists, projectId, navigate, isDataLoaded]);

  return <>{children}</>;
};

export default DataLoader;
