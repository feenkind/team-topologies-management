import * as React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useEffect } from 'react';
import axiosInstance from '../../axios';
import axios from 'axios';
import { addAllProjects } from '../../store/slices/projectSlice';
import { addAllDomainsWithHistory } from '../../store/slices/domainSlice';
import { setDataLoaded, setNetworkError } from '../../store/slices/globalSlice';

const LoadBackendData: React.FC = () => {
  const isDataLoaded = useAppSelector((state) => state.global.dataLoaded);
  const dispatch = useAppDispatch();

  // load all data if not already done
  useEffect(() => {
    if (!isDataLoaded) {
      const requests = [
        axiosInstance.get('/projects'),
        axiosInstance.get('/domains?includeHistory=true'),
      ];

      axios
        .all(requests)
        .then((responses) => {
          const projectData = responses[0].data;
          const domainData = responses[1].data;

          dispatch(addAllProjects(projectData));
          dispatch(addAllDomainsWithHistory(domainData));

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
