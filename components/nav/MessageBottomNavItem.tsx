import styled from "styled-components/native";
import React, { useEffect, useState } from "react";
import { GeneralText, MyAlert } from "../../styles/styles";
import { AppState, Dimensions, View } from "react-native";
import messaging from "@react-native-firebase/messaging";
import { useNavigation } from "@react-navigation/native";
import storage, { StorageKey } from "../../lib/helpers/myAsyncStorage";

interface Props {
  color: string;
  focused: boolean;
  size?: number;
}

const { width } = Dimensions.get("window");

function MessageBottomNavItem({ color, focused, size }: Props) {
  const navigation = useNavigation();
  const [msgReceived, setMsgReceived] = useState(false);

  useEffect(() => {
    const fetchNewMsg = async () => {
      try {
        const isNewMessage = await storage.getItem(StorageKey.message);
        if (isNewMessage) {
          setMsgReceived(true);
        } else {
          setMsgReceived(false);
        }
      } catch (e) {}
    };

    messaging().onMessage((remoteMessage) => {
      if (remoteMessage.data?.type === "message") setMsgReceived(true);
    });

    AppState.addEventListener("change", async () => {
      try {
        await fetchNewMsg();
      } catch (e) {}
    });
    navigation.addListener("focus", (e) => {
      // Do something
      setMsgReceived(false);
    });
  }, []);

  return (
    <View>
      {msgReceived && <MsgAlert />}
      <Text width={width} color={color}>
        메세지
      </Text>
    </View>
  );
}
export default MessageBottomNavItem;

const Text = styled(GeneralText)<{ width: number; color: string }>`
  font-size: ${(props) => props.width * 0.04 + "px"};
  color: ${(props) => props.color};
`;

const MsgAlert = styled(MyAlert)`
  left: -7px;
  top: -7px;
`;
