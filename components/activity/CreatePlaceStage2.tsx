import styled from "styled-components/native";
import React from "react";
import { TouchableOpacity, ScrollView } from "react-native";
import MyBackButton from "../UI/MyBackButton";

import { Ionicons } from "@expo/vector-icons";
import {
  BlackLabel,
  colors,
  GeneralText,
  MainHeading,
  SubHeading,
} from "../../styles/styles";

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

        <SBlackLabel>관련 사진 올리기 (3개 이상)</SBlackLabel>
        <AddPhotoContiner>
          <AddPhotoWrapper>
            <Ionicons name="camera-outline" size={42} color="#A7B0C0" />
            <AddPhotoText>사진추가</AddPhotoText>
          </AddPhotoWrapper>
        </AddPhotoContiner>
      </ScrollView>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  padding: 0px 30px;
`;

const SBlackLabel = styled(BlackLabel)``;

const AddPhotoContiner = styled.TouchableOpacity`
  margin-top: 22px;
`;

const AddPhotoWrapper = styled.View`
  width: 100%;
  background-color: #f9f9f9;
  height: 200px;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

const AddPhotoText = styled(GeneralText)`
  margin-left: 20px;
  font-size: 18px;
`;
