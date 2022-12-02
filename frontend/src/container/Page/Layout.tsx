import * as React from 'react';
import { Outlet, useLocation, useParams } from 'react-router-dom';
import { default as LayoutComponent } from '../../components/Layout/Layout';
import { useAppSelector } from '../../hooks';
import { CircularProgress } from '@mui/material';
import Login from './Login';

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
  const basicAuthDataSet = useAppSelector(
    (state) => state.global.basicAuthDataSet,
  );

  const location = useLocation();
  const { projectId } = useParams<{
    projectId: string;
  }>();
  let bgColor = false;

  if (projectId && location.pathname.endsWith(projectId)) {
    bgColor = true;
  }

  if (location.pathname === '/') {
    bgColor = true;
  }

  return (
    <LayoutComponent
      header={header}
      sidebar={sidebar}
      errorDisplay={errorDisplay}
      bgColor={bgColor}
    >
      {!basicAuthDataSet && <Login />}
      {!dataLoaded && basicAuthDataSet && <CircularProgress />}
      {dataLoaded && basicAuthDataSet && <Outlet />}
    </LayoutComponent>
  );
};

export default Layout;
