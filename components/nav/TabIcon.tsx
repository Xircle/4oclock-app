import React from "react";
import { Ionicons } from "@expo/vector-icons";

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
      color={color}
      size={size ? size : 27}
    />
  );
}
