import styled from "styled-components/native";
import React, { useState } from "react";
import {
  BigTextInput,
  BlackLabel,
  colors,
  ErrorMessage,
  GeneralText,
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
import SelectedLocation from "../locationV/SelectedLocation";
import LocationVRow from "../locationV/LocationVRow";
import { kakaoLocal, kakaoLocalData } from "../../../lib/api/kakaoLocalApis";
import { Ionicons } from "@expo/vector-icons";

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
  const [searchResult, setSearchResult] = useState<kakaoLocalData[]>(undefined);

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
    setSearchResult(undefined);
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
          <InnerContainer style={{ justifyContent: "flex-start" }}>
            {addressError ? (
              <SErrorMessage>{createPlaceErrorMessage[3]}</SErrorMessage>
            ) : null}
            <SBigTextInput
              style={{ marginTop: 5 }}
              placeholder="만남 장소를 입력해주세요"
              autoCapitalize="none"
              blurOnSubmit={true}
              returnKeyType="next"
              returnKeyLabel="next"
              autoCorrect={false}
              defaultValue={placeSearch}
              onChange={async (event) => {
                const { eventCount, target, text } = event.nativeEvent;
                const temp = await kakaoLocal.searchByNameAndKeyword(text);
                setSearchResult(temp.documents);
                setPlaceSearch(text);
              }}
              error={addressError}
            />
            {placeName ? (
              <SelectedLocation placeName={placeName} address={placeAddress} />
            ) : null}
            <SearchListContainer showsVerticalScrollIndicator={false}>
              {searchResult?.map((item, index) => {
                return (
                  <LocationVRow
                    key={index}
                    placeId={item.id}
                    placeName={item.place_name}
                    addressName={item.address_name}
                    categoryGroupName={item.category_group_name}
                    onPress={() =>
                      CTAPlace(item.address_name, item.place_name, item.id)
                    }
                  />
                );
              })}
            </SearchListContainer>
          </InnerContainer>
        </InnerContainer>
        <InnerContainer>
          <BlackLabel>최대 참가인원</BlackLabel>

          <MaxParticipantsContainer>
            <MaxPrticipantsButton
              left={true}
              onPress={() => {
                activityDispatcher.dispatchMaxParticipants(
                  maxParticipantsNumber - 1,
                  dispatch
                );
              }}
            >
              <Ionicons
                name="remove-outline"
                size={35}
                color={colors.bgColor}
              />
            </MaxPrticipantsButton>
            <MaxParticipantsNumber>
              {maxParticipantsNumber}
            </MaxParticipantsNumber>
            <MaxPrticipantsButton
              left={false}
              onPress={() => {
                activityDispatcher.dispatchMaxParticipants(
                  maxParticipantsNumber + 1,
                  dispatch
                );
              }}
            >
              <Ionicons name="add" size={35} color={colors.bgColor} />
            </MaxPrticipantsButton>
          </MaxParticipantsContainer>
        </InnerContainer>
        <InnerContainer>
          <BlackLabel>참가비</BlackLabel>
        </InnerContainer>
        <BottomWhiteSpace />
      </Container>
      <MainButtonWBg onPress={nextHandler} disabled={false} title={"다음"} />
    </MyKeyboardAvoidingView>
  );
}

const BottomWhiteSpace = styled.View`
  width: 100%;
  height: 200px;
`;

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

const MaxParticipantsContainer = styled.View`
  width: 280px;
  flex-direction: row;

  height: 100%;
  max-height: 60px;
  align-items: center;
  justify-content: center;
  border-radius: 30px;
  border: 1px solid ${colors.bareGrey};
`;

const MaxPrticipantsButton = styled.TouchableOpacity<{ left?: boolean }>`
  width: 60px;
  align-items: center;
  justify-content: center;
  background-color: ${(props) =>
    props.left ? colors.warningRed : colors.mainBlue};
  height: 100%;
  border-bottom-left-radius: ${(props) => (props.left ? "30px" : "0px")};
  border-top-left-radius: ${(props) => (props.left ? "30px" : "0px")};
  border-bottom-right-radius: ${(props) => (!props.left ? "30px" : "0px")};
  border-top-right-radius: ${(props) => (!props.left ? "30px" : "0px")};
`;

const MaxParticipantsNumber = styled(GeneralText)`
  flex: 1;
  background-color: ${colors.bgColor};
  text-align: center;
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

const SearchListContainer = styled.ScrollView`
  width: 100%;
  padding-top: 5px;
  padding-bottom: 5px;
`;

const SBigTextInput = styled(BigTextInput)<{ error?: Boolean }>`
  border: ${(props) =>
    props.error
      ? `0.5px solid ${colors.warningRed}`
      : `0.5px solid ${colors.midGrey}`};
`;
