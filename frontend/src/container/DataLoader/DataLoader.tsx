import * as React from 'react';
import LoadBackendData from './LoadBackendData';
import SetCurrentProject from './SetCurrentProject';
import ValidateUrl from './ValidateUrl';
import { useAppSelector } from '../../hooks';

interface IDataLoaderProps {
  children: React.ReactNode | React.ReactNode[];
}

const DataLoader: React.FC<IDataLoaderProps> = ({
  children,
}: IDataLoaderProps) => {
  const dataLoaded = useAppSelector((state) => state.global.dataLoaded);
  return (
    <>
      <LoadBackendData />
      <ValidateUrl />
      <SetCurrentProject />
      {
        // prevent any display and weird data state as long as not all
        // data is loaded from backend
        dataLoaded && children
      }
    </>
  );
};

export default DataLoader;
