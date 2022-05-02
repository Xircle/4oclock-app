import React from "react";
import { View } from "react-native";
import { ParticipantsListData } from "../../lib/api/types";

type Props = {
  participants: ParticipantsListData;
};

export default function ParticipantsList({}: Props) {
  return <View>ParticipantsList</View>;
}
