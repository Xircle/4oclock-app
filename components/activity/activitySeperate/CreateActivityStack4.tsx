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
          <BlackLabel>오픈 카카오톡 채팅방 링크</BlackLabel>
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
