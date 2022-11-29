import * as React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useEffect } from 'react';
import axiosInstance from '../../axios';
import axios from 'axios';
import {
  addAllProjects,
  setCurrentProject,
} from '../../store/slices/projectSlice';
import { addAllDomainsWithHistory } from '../../store/slices/domain/domainSlice';
import { setDataLoaded, setNetworkError } from '../../store/slices/globalSlice';
import {
  addAllDependencies,
  addAllDependencyHistory,
  addAllInteractionHistory,
  addAllInteractions,
  addAllTeamDataWithHistory,
} from '../../store/slices/team/teamSlice';
import {
  IDependencyHistoryImport,
  IDependencyImport,
  IInteractionHistoryImport,
  IInteractionImport,
  ITeamImport,
} from '../../types/teamTypes';
import { IProjectImport } from '../../types/projectTypes';
import { IDomainImport } from '../../types/domainTypes';
import { useParams } from 'react-router-dom';
import { INotificationImport } from '../../types/notificationTypes';
import { addAllNotifications } from '../../store/slices/notificationSlice';

const LoadBackendData: React.FC = () => {
  const isDataLoaded = useAppSelector((state) => state.global.dataLoaded);
  const dispatch = useAppDispatch();

  const { projectId } = useParams<{
    projectId: string;
  }>();

  // load all data if not already done
  useEffect(() => {
    if (!isDataLoaded) {
      const requests = [
        axiosInstance.get('/projects'),
        axiosInstance.get('/domains'),
        axiosInstance.get('/teams'),
        axiosInstance.get('/teams/dependencies'),
        axiosInstance.get('/teams/dependencies/history'),
        axiosInstance.get('/teams/interactions'),
        axiosInstance.get('/teams/interactions/history'),
        axiosInstance.get('/notifications'),
      ];

      axios
        .all(requests)
        .then((responses) => {
          const projectData: IProjectImport[] = responses[0].data;
          const domainData: IDomainImport[] = responses[1].data;
          const teamData: ITeamImport[] = responses[2].data;
          const dependencies: IDependencyImport[] = responses[3].data;
          const dependencyHistory: IDependencyHistoryImport[] =
            responses[4].data;
          const interactions: IInteractionImport[] = responses[5].data;
          const interactionHistory: IInteractionHistoryImport[] =
            responses[6].data;
          const notifications: INotificationImport[] = responses[7].data;

          dispatch(addAllProjects(projectData));
          // if project url is loaded directly, set current project to avoid
          // any false display or unneccessary re-renderings
          if (
            projectId &&
            projectData.find((project) => project.id === projectId)
          ) {
            dispatch(setCurrentProject(projectId));
          }

          dispatch(addAllDomainsWithHistory(domainData));
          dispatch(addAllTeamDataWithHistory(teamData));
          dispatch(addAllDependencies(dependencies));
          dispatch(addAllDependencyHistory(dependencyHistory));
          dispatch(addAllInteractions(interactions));
          dispatch(addAllInteractionHistory(interactionHistory));
          dispatch(addAllNotifications(notifications));

          dispatch(setDataLoaded(true));
          dispatch(setNetworkError(false));
        })
        .catch(() => {
          dispatch(setDataLoaded(false));
          dispatch(setNetworkError(true));
        });
    }
  }, [isDataLoaded, dispatch, projectId]);
  return <></>;
};

export default LoadBackendData;
