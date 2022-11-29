import * as React from 'react';
import LoadBackendData from './LoadBackendData';
import SetCurrentProject from './SetCurrentProject';
import ValidateUrl from './ValidateUrl';
import { useAppSelector } from '../../hooks';
import NotificationGeneration from './NotificationGeneration';

interface IDataLoaderProps {
  children: React.ReactNode | React.ReactNode[];
}

const DataLoader: React.FC<IDataLoaderProps> = ({
  children,
}: IDataLoaderProps) => {
  const basicAuthDataSet = useAppSelector(
    (state) => state.global.basicAuthDataSet,
  );

  return (
    <>
      {basicAuthDataSet && <LoadBackendData />}
      {basicAuthDataSet && <ValidateUrl />}
      {basicAuthDataSet && <SetCurrentProject />}
      {basicAuthDataSet && <NotificationGeneration />}
      {children}
    </>
  );
};

export default DataLoader;
