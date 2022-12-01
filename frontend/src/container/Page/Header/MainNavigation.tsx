import * as React from 'react';
import { useLocation } from 'react-router-dom';
import { headerMenuItems } from '../../../constants/navigation';
import HeaderNavigation from '../../../components/Header/HeaderNavigation';

const MainNavigation: React.FC = () => {
  const location = useLocation();
  let activeMenuItem;
  if (location.pathname === '/teams') {
    activeMenuItem = headerMenuItems.TEAMS;
  }
  if (location.pathname === '/projects') {
    activeMenuItem = headerMenuItems.PROJECTS;
  }
  if (location.pathname === '/') {
    activeMenuItem = headerMenuItems.DASHBOARD;
  }

  return <HeaderNavigation activeMenuItem={activeMenuItem} />;
};

export default MainNavigation;
