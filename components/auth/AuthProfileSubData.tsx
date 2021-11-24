import styled from "styled-components/native";
import React from "react";
import { Dimensions, View } from "react-native";
import {
  colors,
  fontFamilies,
  GeneralText,
  Label,
  MainHeading,
  Text,
} from "../../styles/styles";
import { AuthAction, AuthState } from "./types.d";
import { MBTIs, MBTIToIndex } from "../../lib/SelectData";
import MySelect from "../UI/MySelect";

interface Props {
  onNext: () => void;
  state: AuthState;
  dispatch: React.Dispatch<AuthAction>;
}

const { width } = Dimensions.get("screen");

export default function AuthProfileSubData({ onNext, state, dispatch }: Props) {
  return (
    <Container showsVerticalScrollIndicator={false}>
      <MainHeading style={{ marginTop: 20 }}>
        회원님을 조금만 더 알려주세요!
      </MainHeading>
      <InfoText>자세히 알려주실수록 더 잘 맞는 친구와 마날 수 있어요</InfoText>
      <SLabel>나의 성격이나 스타일</SLabel>
      <MySelect
        data={MBTIs}
        onSelect={(selectedItem, index) => {}}
        width={width - 120}
        defaultButtonText="MBTI"
        defaultValueByIndex={MBTIToIndex[state.MBTI]}
      />
      <SLabel>드링킹 스타일</SLabel>
    </Container>
  );
}

const Container = styled.ScrollView`
  background-color: ${colors.bgColor};
  padding: 15px;
`;

const InfoText = styled(GeneralText)`
  font-size: 13px;
  margin-top: 18px;
  color: ${colors.bareGrey};
`;

const SLabel = styled(Label)`
  margin-top: 20px;
  font-size: 20px;
  font-family: ${fontFamilies.regular};
`;
