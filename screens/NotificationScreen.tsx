import React, { useEffect, useState } from "react";
import { Alert } from "react-native";
import styled from "styled-components/native";
import PureNotificationItem from "../components/notification/PureNotificationItem";
import { Notification, NotificationData } from "../lib/api/types";
import storage, { StorageKey } from "../lib/helpers/myAsyncStorage";
import { colors, GeneralText } from "../styles/styles";

type Props = {};

export const NotificationScreen = (props: Props) => {
  const [notifications, setNotification] = useState([]);
  useEffect(() => {
    async function fetchAndSaveNotification() {
      const data: NotificationData = await storage.getItem(
        StorageKey.notifications
      );
      Alert.alert(typeof data + data?.unreadNotifications?.length);
      setNotification(data.unreadNotifications.concat(data.readNotifications));
    }
    fetchAndSaveNotification();
  }, []);
  return (
    <Container showsVerticalScrollIndicator={false}>
      {notifications?.length > 0 &&
        notifications?.map((item, index) => {
          return <PureNotificationItem mainText={item.title} />;
        })}
    </Container>
  );
};

const Container = styled.ScrollView`
  flex: 1;
  background-color: ${colors.bgColor};
  width: 100%;
`;
