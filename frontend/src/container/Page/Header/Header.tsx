import * as React from 'react';
import { default as HeaderComponent } from '../../../components/Header/Header';
import NotificationMenu from '../../Notification/NotificationMenu';
import MainNavigation from './MainNavigation';

const Header: React.FC = () => {
  return (
    <HeaderComponent
      navigation={<MainNavigation />}
      notifications={<NotificationMenu />}
    />
  );
};

export default Header;
