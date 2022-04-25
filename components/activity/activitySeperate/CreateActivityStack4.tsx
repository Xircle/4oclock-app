import styled from "styled-components/native";
import React, { useState } from "react";
import {
  BlackLabel,
  colors,
  ErrorMessage,
  MainHeading,
} from "../../../styles/styles";
import MyKeyboardAvoidingView from "../../UI/MyKeyboardAvoidingView";
import { useSelector } from "react-redux";
import { RootState } from "../../../lib/reducers";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import MainButtonWBg from "../../UI/MainButtonWBg";
import { createPlaceErrorMessage } from "../../../lib/errorMessages";
import { convertTimeCA } from "../../../lib/utils";
import { activityDispatcher } from "../../../lib/activity/ActivityDispatcher";
import DatePicker from "react-native-date-picker";
import { activityValidation } from "../../../lib/activity/CreateActivityValidation";

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
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [addressError, setAddressError] = useState(undefined);
  const [feeError, setFeeError] = useState(undefined);
  const [placeName, setPlaceName] = useState("");
  const [placeAddress, setPlaceAddress] = useState("");
  const [dateError, setDateError] = useState(undefined);
  const [placeSearch, setPlaceSearch] = useState("");

  const nextHandler = () => {
    // @ts-ignore
    navigation.navigate("CAS5", {});
  };

  const CTAPlace = (addressName: string, placeName: string, id: string) => {
    setPlaceName(placeName);
    setPlaceAddress(addressName);
    activityDispatcher.dispatchDetailAddress(addressName, id, dispatch);
    setPlaceSearch("");
    setAddressError(false);
  };

  return (
    <MyKeyboardAvoidingView keyboardVerticalOffset={50}>
      <Container showsVerticalScrollIndicator={false}>
        <MainHeading>모임 디테일</MainHeading>

        <InnerContainer>
          <BlackLabel>만남 날짜/시간</BlackLabel>
          <PickerContainer onPress={() => setOpen(true)}>
            <WhiteText>시간 선택하기</WhiteText>
          </PickerContainer>
          <DatePicker
            modal
            open={open}
            date={date}
            minuteInterval={30}
            onConfirm={(date) => {
              setOpen(false);
              setDate(date);
              activityDispatcher.dispatchStartDateAt(date, dispatch);
              setDateError(!activityValidation.validateTime(date));
            }}
            onCancel={() => {
              setOpen(false);
            }}
          />
          {dateError ? (
            <SErrorMessage>{createPlaceErrorMessage[2]}</SErrorMessage>
          ) : (
            <TimeText>{convertTimeCA(startDateAt)}</TimeText>
          )}
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

const TimeText = styled(ErrorMessage)`
  margin-left: auto;
  margin-right: auto;
`;

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

const PickerContainer = styled.TouchableOpacity`
  background-color: ${colors.mainBlue};
  border-radius: 3px;
  padding: 5px;
`;

const WhiteText = styled(BlackLabel)`
  color: ${colors.bgColor};
  font-size: 20px;
`;

const SErrorMessage = styled(ErrorMessage)`
  color: ${colors.warningRed};
`;
