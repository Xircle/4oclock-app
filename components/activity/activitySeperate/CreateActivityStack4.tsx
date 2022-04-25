import styled from "styled-components/native";
import React, { useState } from "react";
import { BlackLabel, colors, MainHeading } from "../../../styles/styles";
import MyKeyboardAvoidingView from "../../UI/MyKeyboardAvoidingView";
import { useSelector } from "react-redux";
import { RootState } from "../../../lib/reducers";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import MainButtonWBg from "../../UI/MainButtonWBg";

interface Props {}

export default function CreateActivityStack4(props: Props) {
  const {
    maxParticipantsNumber,
    detailAddress,
    participationFee,
    startDateAt,
    placeId,
  } = useSelector((state: RootState) => state.activityReducer);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [openKakaoLinkError, setOpenKakaoLinkError] = useState(undefined);

  const nextHandler = () => {
    // @ts-ignore
    navigation.navigate("CAS5", {});
  };

  return (
    <MyKeyboardAvoidingView keyboardVerticalOffset={50}>
      <Container showsVerticalScrollIndicator={false}>
        <MainHeading>모임 디테일</MainHeading>

        <InnerContainer>
          <BlackLabel>만남 날짜/시간</BlackLabel>
        </InnerContainer>
        <InnerContainer>
          <BlackLabel>만남위치</BlackLabel>
        </InnerContainer>
        <InnerContainer>
          <BlackLabel>최대 참가인원</BlackLabel>
        </InnerContainer>
        <InnerContainer>
          <BlackLabel>참가비</BlackLabel>
        </InnerContainer>
      </Container>
      <MainButtonWBg onPress={nextHandler} disabled={false} title={"다음"} />
    </MyKeyboardAvoidingView>
  );
}

const Container = styled.ScrollView`
  flex: 1;
  background-color: ${colors.bgColor};
  padding-top: 20px;
  padding-left: 15px;
  padding-right: 15px;
`;

const InnerContainer = styled.View`
  margin-top: 22px;
`;
