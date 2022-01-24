import styled from "styled-components/native";
import React from "react";
import { Asset, useAssets } from "expo-asset";
import { View } from "react-native";

interface Props {
  source?: string;
  size: number;
}

export default function AvatarUri({ size, source }: Props) {
  const [assets] = useAssets([
    require("../../statics/images/anonymous_user.png"),
  ]);
  if (!assets?.[0]) {
    return <View></View>;
  } else {
    return (
      <AvatarImage source={source ? { uri: source } : assets[0]} size={size} />
    );
  }
}

const AvatarImage = styled.Image<{ size: number }>`
  width: ${(props) => props.size + "px"};
  height: ${(props) => props.size + "px"};
  border-radius: ${(props) => props.size / 2 + "px"};
`;
