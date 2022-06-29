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
    let mounted = true;
    async function fetchAndSaveNotification() {
      if (mounted) {
        const data: NotificationData = await storage.getItem(
          StorageKey.notifications
        );
        if (!data) return;

        const newReadNotifications = data.unreadNotifications
          .concat(data.readNotifications)
          .slice(0, 10);
        setNotification(newReadNotifications);

        await storage.setItem(StorageKey.notifications, {
          unreadNotifications: [],
          readNotifications: newReadNotifications,
        });
      }
    }
    async function cleanUp() {
      mounted = false;
    }
    fetchAndSaveNotification();
    return () => {
      cleanUp();
    };
  }, []);
  return (
    <Container showsVerticalScrollIndicator={false}>
      {notifications?.length > 0 &&
        notifications?.map((item, index) => {
          return (
            <PureNotificationItem
              mainText={item.title}
              subText={item.body}
              CTA={item.CTA}
              image={item.image}
            />
          );
        })}
    </Container>
  );
};

const Container = styled.ScrollView`
  flex: 1;
  background-color: ${colors.bgColor};
  width: 100%;
`;
