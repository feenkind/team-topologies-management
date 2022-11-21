import * as React from 'react';
import { default as SidebarComponent } from '../components/Sidebar/Sidebar';
import { useLocation, useParams } from 'react-router-dom';
import CurrentProjectSelect from './Project/CurrentProjectSelect';
import { useAppSelector } from '../hooks';
import { sidebarMenuItems } from '../constants/navigation';

const Sidebar: React.FC = () => {
  const { domainId } = useParams<{
    domainId: string;
  }>();
  const currentProjectId = useAppSelector(
    (state) => state.project.currentProject.id,
  );

  const location = useLocation();
  let activeMenuItem;
  if (location.pathname.endsWith(`project/${currentProjectId}`)) {
    activeMenuItem = sidebarMenuItems.OVERVIEW;
  }
  if (location.pathname.endsWith(`visualization`)) {
    activeMenuItem = sidebarMenuItems.VISUALIZATION;
  }

  if (location.pathname.endsWith(`domains`)) {
    activeMenuItem = sidebarMenuItems.VIEW_DOMAINS;
  }
  if (location.pathname.endsWith(`domain/add`)) {
    activeMenuItem = sidebarMenuItems.ADD_DOMAIN;
  }
  if (location.pathname.endsWith(`${domainId}`)) {
    activeMenuItem = sidebarMenuItems.VIEW_DOMAINS;
  }

  if (location.pathname.endsWith(`${currentProjectId}/teams`)) {
    activeMenuItem = sidebarMenuItems.VIEW_TEAMS;
  }
  if (location.pathname.endsWith(`team/add`)) {
    activeMenuItem = sidebarMenuItems.ADD_TEAM;
  }

  return (
    <SidebarComponent
      projectSelect={<CurrentProjectSelect />}
      activeMenuItem={activeMenuItem}
      currentProjectId={currentProjectId || '-1'}
    />
  );
};

export default Sidebar;
