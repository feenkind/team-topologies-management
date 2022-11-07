import * as React from 'react';
import { default as SidebarComponent } from '../components/Sidebar/Sidebar';
import { useLocation, useParams } from 'react-router-dom';
import CurrentProjectSelect from './Project/CurrentProjectSelect';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { setCurrentProjectId } from '../store/slices/projectSlice';
import { sidebarMenuItems } from '../constants/navigationTypes';

const Sidebar: React.FC = () => {
  const dispatch = useAppDispatch();
  const { projectId } = useParams<{ projectId: string }>();
  const currentProjectId = useAppSelector(
    (state) => state.project.currentProjectId,
  );

  const location = useLocation();
  let activeMenuItem;
  if (location.pathname.endsWith(`project/${projectId}`)) {
    activeMenuItem = sidebarMenuItems.OVERVIEW;
  }
  if (location.pathname.endsWith(`project/${projectId}/visualization`)) {
    activeMenuItem = sidebarMenuItems.VISUALIZATION;
  }

  useEffect(() => {
    if (projectId && projectId !== currentProjectId) {
      dispatch(setCurrentProjectId(projectId));
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
