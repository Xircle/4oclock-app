import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { colors, MyAlert } from "../../styles/styles";
import { Ionicons } from "@expo/vector-icons";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";
import messaging from "@react-native-firebase/messaging";
import { NotificationData } from "../../lib/api/types";
import storage, { StorageKey } from "../../lib/helpers/myAsyncStorage";
import { AppState } from "react-native";

type Props = {};

const MainHeaderRight = (props: Props) => {
  const [notificationReceived, setNotificationReceived] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    let mounted = true;
    messaging().onMessage(async (remoteMessage) => {
      if (remoteMessage.data?.type !== "message") setNotificationReceived(true);
    });

    const fetchNewNotification = async () => {
      try {
        const isNewNotification: NotificationData = await storage.getItem(
          StorageKey.notifications
        );
        if (!isNewNotification) return;
        if (isNewNotification?.unreadNotifications?.length > 0) {
          setNotificationReceived(true);
        }
      } catch (e) {}
    };

    async function fetchNotification() {
      if (mounted) {
        const data: NotificationData = await storage.getItem(
          StorageKey.notifications
        );
        if (!data) return;
        if (data?.unreadNotifications?.length) {
          setNotificationReceived(true);
        }
      }
    }

    AppState.addEventListener("change", async () => {
      try {
        await fetchNewNotification();
      } catch (e) {}
    });

    async function cleanUp() {
      mounted = false;
    }
    fetchNotification();
    return () => {
      cleanUp();
    };
  }, []);
  function CTA() {
    setNotificationReceived(false);
    // @ts-ignore
    navigation.navigate("NotificationScreen");
  }
  return (
    <TouchableOpacity
      style={{ marginRight: 8 }}
      // @ts-ignore
      onPress={CTA}
    >
      {notificationReceived && <NotificationAlert />}
      <Ionicons name="notifications-outline" size={30} color={colors.black} />
    </TouchableOpacity>
  );
};

export default MainHeaderRight;

const NotificationAlert = styled(MyAlert)`
  top: 0px;
  left: -5px;
`;
