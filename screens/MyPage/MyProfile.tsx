import styled from "styled-components/native";
import React from "react";
import { colors } from "../../styles/styles";
import MainButtonWBg from "../../components/UI/MainButtonWBg";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native";
import AvatarUri from "../../components/UI/AvatarUri";

interface Props {}

export default function MyProfile(props: Props) {
  return (
    <Container>
      <ScrollView></ScrollView>
      <MainButtonWBg></MainButtonWBg>
    </Container>
  );
}

const Container = styled.View`
  position: relative;
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${colors.bgColor};
`;

const Text = styled.Text``;
