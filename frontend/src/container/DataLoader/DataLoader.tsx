import * as React from 'react';
import LoadBackendData from './LoadBackendData';
import SetCurrentProject from './SetCurrentProject';
import ValidateUrl from './ValidateUrl';

interface IDataLoaderProps {
  children: React.ReactNode | React.ReactNode[];
}

const DataLoader: React.FC<IDataLoaderProps> = ({
  children,
}: IDataLoaderProps) => {
  return (
    <>
      <LoadBackendData />
      <ValidateUrl />
      <SetCurrentProject />
      {children}
    </>
  );
};

export default DataLoader;
