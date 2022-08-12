import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../styles/styles";

interface Props {
  iconName: string;
  color: string;
  focused: boolean;
  size?: number;
}

export default function TabIcon({ iconName, color, focused, size }: Props) {
  return (
    <Ionicons
      //@ts-ignore
      name={focused ? iconName : `${iconName}-outline`}
      color={colors.vividBlue}
      size={size ? size : 27}
    />
  );
}
