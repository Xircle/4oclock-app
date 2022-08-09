import { NavigationProp, ParamListBase } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import PureNotificationItem from "../components/notification/PureNotificationItem";
import { NotificationData } from "../lib/api/types";
import storage, { StorageKey } from "../lib/helpers/myAsyncStorage";
import { colors } from "../styles/styles";

type Props = {
  navigation: NavigationProp<ParamListBase>;
};

export const NotificationScreen = (props: Props) => {
  const [unreadNotifications, setUnreadNotifications] = useState([]);
  const [readNotifications, setReadNotifications] = useState([]);

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
        setUnreadNotifications(data.unreadNotifications);
        setReadNotifications(data.readNotifications);

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
      {unreadNotifications?.length > 0 &&
        unreadNotifications?.map((item, index) => {
          return (
            <PureNotificationItem
              type={item.type}
              mainText={item.title}
              subText={item.body}
              image={item.image}
              isUnread={true}
              mainParam={item.mainParam}
              navigation={props.navigation}
            />
          );
        })}
      {readNotifications?.length > 0 &&
        readNotifications?.map((item, index) => {
          return (
            <PureNotificationItem
              type={item.type}
              mainText={item.title}
              subText={item.body}
              image={item.image}
              isUnread={false}
              mainParam={item.mainParam}
              navigation={props.navigation}
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
