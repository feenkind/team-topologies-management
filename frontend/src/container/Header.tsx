import * as React from 'react';
import { default as HeaderComponent } from '../components/Header/Header';
import { useLocation } from 'react-router-dom';
import { headerMenuItems } from '../constants/navigationTypes';

const Header: React.FC = () => {
  const location = useLocation();
  let activeMenuItem;
  if (location.pathname.endsWith('/teams')) {
    activeMenuItem = headerMenuItems.TEAMS;
  }
  if (location.pathname.endsWith('/projects')) {
    activeMenuItem = headerMenuItems.PROJECTS;
  }
  if (location.pathname.endsWith('/')) {
    activeMenuItem = headerMenuItems.DASHBOARD;
  }

  return <HeaderComponent activeMenuItem={activeMenuItem} />;
};

export default Header;
