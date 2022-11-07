import * as React from 'react';
import { default as SidebarComponent } from '../components/Sidebar';
import { useParams } from 'react-router-dom';
import CurrentProjectSelect from './Project/CurrentProjectSelect';
import { useEffect } from 'react';
import { useAppDispatch } from '../hooks';
import { setCurrentProjectId } from '../store/slices/projectSlice';

const Sidebar: React.FC = () => {
  const dispatch = useAppDispatch();
  const { projectId } = useParams<{ projectId: string }>();

  useEffect(() => {
    if (projectId) {
      dispatch(setCurrentProjectId(projectId));
    }
  }, [dispatch, projectId]);

  return <SidebarComponent projectSelect={<CurrentProjectSelect />} />;
};

export default Sidebar;
