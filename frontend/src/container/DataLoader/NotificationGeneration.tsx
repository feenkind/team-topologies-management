import * as React from 'react';
import { addNotification } from '../../store/slices/notificationSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useCallback, useEffect, useState } from 'react';
import { INotificationImport } from '../../types/notificationTypes';
import axiosInstance from '../../axios';

const NotificationGeneration: React.FC = () => {
  const dataLoaded = useAppSelector((state) => state.global.dataLoaded);
  const dispatch = useAppDispatch();
  const [token, setToken] = useState<string>();

  const getRealtimeData = useCallback(
    (notification: INotificationImport) => {
      dispatch(addNotification(notification));
    },
    [dispatch],
  );

  useEffect(() => {
    axiosInstance
      .get('notifications/token')
      .then((response) => {
        setToken(response.data);
      })
      .catch(() => {
        setToken(undefined);
      });

    const sse = new EventSource(
      `${process.env.REACT_APP_BACKEND_URL}/notifications/sse?token=${token}`,
      {
        withCredentials: false,
      },
    );

    if (!dataLoaded || !token) {
      sse.close();
    }

    sse.onmessage = (e) => getRealtimeData(JSON.parse(e.data));
    sse.onerror = () => {
      sse.close();
    };

    return () => {
      sse.close();
    };
  }, [dataLoaded, setToken, getRealtimeData, token]);

  return <></>;
};

export default NotificationGeneration;
