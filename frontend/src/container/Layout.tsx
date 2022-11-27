import * as React from 'react';
import { Outlet } from 'react-router-dom';
import { default as LayoutComponent } from '../components/Layout/Layout';
import { useAppSelector } from '../hooks';
import { CircularProgress } from '@mui/material';

interface ILayoutProps {
  header: React.ReactNode;
  sidebar: React.ReactNode;
  errorDisplay: React.ReactNode;
}

const Layout: React.FC<ILayoutProps> = ({
  header,
  sidebar,
  errorDisplay,
}: ILayoutProps) => {
  const dataLoaded = useAppSelector((state) => state.global.dataLoaded);

  return (
    <LayoutComponent
      header={header}
      sidebar={sidebar}
      errorDisplay={errorDisplay}
    >
      {!dataLoaded && <CircularProgress />}
      {dataLoaded && <Outlet />}
    </LayoutComponent>
  );
};

export default Layout;
