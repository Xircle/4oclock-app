import styled from "styled-components/native";
import React, { useEffect, useState } from "react";
import { GeneralText, MyAlert } from "../../styles/styles";
import { Dimensions, View } from "react-native";
import messaging from "@react-native-firebase/messaging";
import { useNavigation } from "@react-navigation/native";
import storage, { StorageKey } from "../../lib/helpers/myAsyncStorage";

interface Props {
  color: string;
  focused: boolean;
  size?: number;
  isNewMsg?: boolean;
}

const { width } = Dimensions.get("window");

function MessageBottomNavItem({ color, focused, size, isNewMsg }: Props) {
  const navigation = useNavigation();
  const [msgReceived, setMsgReceived] = useState(false);
  useEffect(() => {
    messaging().onMessage(async (remoteMessage) => {
      if (remoteMessage.data?.type === "message") setMsgReceived(true);
    });
  }, []);

  useEffect(() => {
    let isFocused = true;
    const unsubscribe = async () => {
      setMsgReceived(false);
      if (isFocused) {
        await storage.setItem(StorageKey.message, false);
        console.log("msg nav");
      }
    };
    navigation.addListener("focus", (e) => {
      // Do something
      unsubscribe();
    });

    return () => {
      isFocused = false;
    };
  }, []);

  return (
    <View>
      {(msgReceived || isNewMsg) && <MsgAlert />}
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
