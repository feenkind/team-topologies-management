import * as React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useEffect } from 'react';
import axiosInstance from '../../axios';
import axios from 'axios';
import { addAllProjects } from '../../store/slices/projectSlice';
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

const LoadBackendData: React.FC = () => {
  const isDataLoaded = useAppSelector((state) => state.global.dataLoaded);
  const dispatch = useAppDispatch();

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

          dispatch(addAllProjects(projectData));
          dispatch(addAllDomainsWithHistory(domainData));
          dispatch(addAllTeamDataWithHistory(teamData));
          dispatch(addAllDependencies(dependencies));
          dispatch(addAllDependencyHistory(dependencyHistory));
          dispatch(addAllInteractions(interactions));
          dispatch(addAllInteractionHistory(interactionHistory));

          dispatch(setDataLoaded(true));
          dispatch(setNetworkError(false));
        })
        .catch(() => {
          dispatch(setDataLoaded(false));
          dispatch(setNetworkError(true));
        });
    }
  }, [isDataLoaded, dispatch]);
  return <></>;
};

export default LoadBackendData;
