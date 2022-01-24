import styled from "styled-components/native";
import React from "react";
import { TouchableOpacity } from "react-native";
import {
  colors,
  fontFamilies,
  GeneralText,
  MainHeading,
  SubHeading,
} from "../../styles/styles";
import { CreateActivityOutput } from "../../lib/api/types";
import { Ionicons } from "@expo/vector-icons";
import { convertTimeCA } from "../../lib/utils";
import { ActivityState } from "../../lib/activity/ActivityReducer";

interface Props {
  cleanUp: () => void;
  state: ActivityState;
}

export default function CreatePlaceStage3({ cleanUp, state }: Props) {
  return (
    <Container>
      <MainHeading> 🎉성공적으로 열렸어 🎉 </MainHeading>
      <CongratMainText>⭐생성한 모임에 관한 자세한 내용⭐</CongratMainText>
      {state.activityType === "번개" ? (
        <CongratSubText>
          번개 개설 후 운영진에게 말씀해주시면{"\n"}전체 단톡에 올려드려요--!
          {"\n"}더 많은 친구들이 참여할 수 있어요 {"><"}
        </CongratSubText>
      ) : null}
      <DetailContainer>
        <DetailWrapper>
          <Ionicons name="alarm-outline" size={32} color={colors.midGrey} />
          <InnerSubText>{convertTimeCA(state.startDateAt)}</InnerSubText>
        </DetailWrapper>
        <DetailWrapper>
          <Ionicons name="location-outline" size={32} color={colors.midGrey} />
          <InnerSubText>{state.detailAddress}</InnerSubText>
        </DetailWrapper>
        <DetailWrapper>
          <Ionicons name="cash-outline" size={32} color={colors.midGrey} />
          <InnerSubText>참가비 {state.participationFee}원</InnerSubText>
        </DetailWrapper>
      </DetailContainer>
      <CTAButton onPress={cleanUp}>
        <CTAButtonText>또 다른 모임 생성하기</CTAButtonText>
      </CTAButton>
    </Container>
  );
}

const CongratMainText = styled(GeneralText)`
  color: ${colors.mainBlue};
  font-family: ${fontFamilies.medium};
  margin-top: 50px;
`;

const CongratSubText = styled(GeneralText)`
  color: ${colors.midGrey};
  font-family: ${fontFamilies.medium};
  margin-top: 18px;
  width: 70%;
  line-height: 26px;
`;

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const CTAButton = styled.TouchableOpacity`
  background-color: ${colors.mainBlue};
  padding: 14px;
  border-radius: 5px;
  margin-top: 28px;
`;

const CTAButtonText = styled(GeneralText)`
  color: ${colors.bgColor};
`;

const DetailContainer = styled.View`
  margin-top: 40px;
`;

const DetailWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  margin: 10px;
`;

const InnerSubText = styled(GeneralText)`
  color: ${colors.midGrey};
  margin-right: 11px;
  font-family: ${fontFamilies.medium};
  margin-left: 22px;
`;
