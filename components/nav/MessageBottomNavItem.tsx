import styled from "styled-components/native";
import React, { useEffect, useState } from "react";
import { GeneralText, MyAlert } from "../../styles/styles";
import { Dimensions, View } from "react-native";
import messaging from "@react-native-firebase/messaging";
import { useFocusEffect } from "@react-navigation/native";

interface Props {
  color: string;
  focused: boolean;
  size?: number;
}

const { width } = Dimensions.get("window");

function MessageBottomNavItem({ color, focused, size }: Props) {
  const [msgReceived, setMsgReceived] = useState(false);
  useEffect(() => {
    messaging().onMessage(async (remoteMessage) => {
      if (remoteMessage.data?.type === "message") setMsgReceived(true);
    });
  }, []);

  useFocusEffect(() => {
    setMsgReceived(false);
  });

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
