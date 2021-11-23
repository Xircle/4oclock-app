import styled from "styled-components/native";
import React from "react";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Props {}

export default function MyBackButton(props: Props) {
  return <Ionicons name="chevron-back" size={24} color={"white"} />;
}
