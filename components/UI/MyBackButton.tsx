import styled from "styled-components/native";
import React from "react";
import { OpaqueColorValue, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  color?: string;
  size?: number;
}

export default function MyBackButton({ size, color }: Props) {
  return (
    <Ionicons
      name="chevron-back"
      size={size ? size : 24}
      color={color ? color : "white"}
    />
  );
}
