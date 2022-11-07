import * as React from 'react';
import { default as SidebarComponent } from '../components/Sidebar/Sidebar';
import { useLocation, useParams } from 'react-router-dom';
import CurrentProjectSelect from './Project/CurrentProjectSelect';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { setCurrentProject } from '../store/slices/projectSlice';
import { sidebarMenuItems } from '../constants/navigationTypes';

const Sidebar: React.FC = () => {
  const dispatch = useAppDispatch();
  const { projectId, domainId } = useParams<{
    projectId: string;
    domainId: string;
  }>();
  const currentProjectId = useAppSelector(
    (state) => state.project.currentProject.id,
  );

  const location = useLocation();
  let activeMenuItem;
  if (location.pathname.endsWith(`project/${projectId}`)) {
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

  if (location.pathname.endsWith(`${projectId}/teams`)) {
    activeMenuItem = sidebarMenuItems.VIEW_TEAMS;
  }
  if (location.pathname.endsWith(`team/add`)) {
    activeMenuItem = sidebarMenuItems.ADD_TEAM;
  }

  useEffect(() => {
    if (projectId && projectId !== currentProjectId) {
      dispatch(setCurrentProject(projectId));
    }
  }, [dispatch, projectId, currentProjectId]);

  return (
    <SidebarComponent
      projectSelect={<CurrentProjectSelect />}
      activeMenuItem={activeMenuItem}
      currentProjectId={currentProjectId || '-1'}
    />
  );
};

export default Sidebar;
