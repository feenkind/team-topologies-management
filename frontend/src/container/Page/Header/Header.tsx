import * as React from 'react';
import { default as HeaderComponent } from '../../../components/Header/Header';
import NotificationMenu from '../../Notification/NotificationMenu';
import MainNavigation from './MainNavigation';
import { LOCAL_PASSWORD, LOCAL_USERNAME } from '../../../constants/basicAuth';
import { setBasicAuthData } from '../../../store/slices/globalSlice';
import { useAppDispatch } from '../../../hooks';

const Header: React.FC = () => {
  const dispatch = useAppDispatch();

  return (
    <HeaderComponent
      navigation={<MainNavigation />}
      notifications={<NotificationMenu />}
      logoutAction={() => {
        localStorage.removeItem(LOCAL_USERNAME);
        localStorage.removeItem(LOCAL_PASSWORD);
        dispatch(setBasicAuthData(false));
      }}
    />
  );
};

export default Header;
