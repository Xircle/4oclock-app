import styled from "styled-components/native";
import React from "react";
import { TouchableOpacity, ScrollView } from "react-native";
import MyBackButton from "../UI/MyBackButton";
import { colors, MainHeading, SubHeading } from "../../styles/styles";

interface Props {
  onBackPressed: () => void;
}

export default function CreatePlaceStage2({ onBackPressed }: Props) {
  return (
    <Container>
      <TouchableOpacity onPress={onBackPressed}>
        <MyBackButton color={colors.black} />
      </TouchableOpacity>
      <ScrollView showsVerticalScrollIndicator={false}>
        <MainHeading>모임을 열어볼까?</MainHeading>
        <SubHeading style={{ marginTop: 20, marginBottom: 20 }}>
          재밌는 모임을 열어보자~~ 행복하고 재밌는 모임
        </SubHeading>
      </ScrollView>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  padding: 0px 30px;
`;
