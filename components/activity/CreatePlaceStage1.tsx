import styled from "styled-components/native";
import React, { useEffect, useState } from "react";
import {
  BigTextInput,
  BlackLabel,
  colors,
  ErrorMessage,
  GeneralText,
  MainHeading,
  SubHeading,
  TextArea,
} from "../../styles/styles";
import { ScrollView, View, Dimensions } from "react-native";
import ExpandableV from "../UI/ExpandableV";
import DatePicker from "react-native-date-picker";
import {
  ActivityAction,
  ActivityState,
} from "../../lib/activity/ActivityReducer";
import { Ionicons } from "@expo/vector-icons";
import { activityDispatcher } from "../../lib/activity/ActivityDispatcher";
import { activityValidation } from "../../lib/activity/CreateActivityValidation";
import { createPlaceErrorMessage } from "../../lib/errorMessages";
import { convertTimeCA } from "../../lib/utils";
import { kakaoLocal, kakaoLocalData } from "../../lib/api/kakaoLocalApis";
import LocationVRow from "./locationV/LocationVRow";

interface Props {
  state: ActivityState;
  dispatch: React.Dispatch<ActivityAction>;
}

export default function CreatePlaceStage1({ state, dispatch }: Props) {
  const [nameError, setNameError] = useState(undefined);
  const [descriptionError, setDescriptionError] = useState(undefined);
  const [dateError, setDateError] = useState(undefined);
  const [addressError, setAddressError] = useState(undefined);
  const [feeError, setFeeError] = useState(undefined);
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [searchResult, setSearchResult] = useState<kakaoLocalData[]>(undefined);

  useEffect(() => {
    activityDispatcher.dispatchStage1Valid(
      nameError === false &&
        descriptionError === false &&
        dateError === false &&
        addressError === false &&
        !feeError,
      dispatch
    );
  }, [nameError, descriptionError, dateError, addressError, feeError]);

  useEffect(() => {
    console.log(searchResult);
  }, [searchResult]);

  useEffect(() => {
    if (state.isFinished) {
      // unmount
      console.log("clean up");
      dispatch({ type: "setIsFinished", payload: false });
      setNameError(undefined);
      setDescriptionError(undefined);
      setDateError(undefined);
      setAddressError(undefined);
      setFeeError(undefined);
    }
  }, [state.isFinished]);
  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        <MainHeading>모임을 열어볼까?</MainHeading>
        <SubHeading style={{ marginTop: 20, marginBottom: 20 }}>
          재밌는 모임을 열어보자~~ 행복하고 재밌는 모임
        </SubHeading>

        <ExpandableV
          title="어떤 모임인가요? (제목)"
          height={120}
          error={nameError}
        >
          <InnerContainer>
            <SBigTextInput
              placeholder="모임을 한마디로 표현해주세요"
              autoCapitalize="none"
              blurOnSubmit={true}
              returnKeyType="next"
              returnKeyLabel="next"
              autoCorrect={false}
              defaultValue={state.name ? state.name : ""}
              onChange={(event) => {
                const { eventCount, target, text } = event.nativeEvent;
                activityDispatcher.dispatchName(text, dispatch);
                setNameError(!activityValidation.validateName(text));
              }}
              error={nameError}
            />

            {nameError ? (
              <SErrorMessage>{createPlaceErrorMessage[0]}</SErrorMessage>
            ) : null}
          </InnerContainer>
        </ExpandableV>
        <ExpandableV
          title="모임에 대한 간단한 소개!"
          height={150}
          error={descriptionError}
        >
          <InnerContainer style={[{ paddingTop: 15 }, { paddingBottom: 15 }]}>
            <STextArea
              placeholder="모임을 재밌게 설명해주세요"
              autoCapitalize="none"
              blurOnSubmit={true}
              returnKeyType="next"
              returnKeyLabel="next"
              autoCorrect={false}
              multiline={true}
              defaultValue={state.description ? state.description : ""}
              onChange={(event) => {
                const { eventCount, target, text } = event.nativeEvent;
                activityDispatcher.dispatchDescription(text, dispatch);
                setDescriptionError(
                  !activityValidation.validateDescription(text)
                );
              }}
              error={descriptionError}
            />
            {descriptionError ? (
              <SErrorMessage>{createPlaceErrorMessage[2]}</SErrorMessage>
            ) : null}
          </InnerContainer>
        </ExpandableV>
        <ExpandableV title="만남시간" height={80} error={dateError}>
          <InnerContainer>
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
              <ErrorMessage>{convertTimeCA(state.startDateAt)}</ErrorMessage>
            )}
          </InnerContainer>
        </ExpandableV>
        <ExpandableV title="만남장소" height={200} error={addressError}>
          <InnerContainer>
            <SBigTextInput
              placeholder="만남 장소를 입력해주세요"
              autoCapitalize="none"
              blurOnSubmit={true}
              returnKeyType="next"
              returnKeyLabel="next"
              autoCorrect={false}
              defaultValue={state.detailAddress ? state.detailAddress : ""}
              onChange={async (event) => {
                const { eventCount, target, text } = event.nativeEvent;
                const temp = await kakaoLocal.searchByNameAndKeyword(text);
                setSearchResult(temp.documents);
                activityDispatcher.dispatchDetailAddress(text, dispatch);
                setAddressError(
                  !activityValidation.validateDetailAddress(text)
                );
              }}
              error={addressError}
            />
            {searchResult ? (
              <SErrorMessage>{searchResult?.[0]?.place_name}</SErrorMessage>
            ) : null}
            <SearchListContainer showsVerticalScrollIndicator={false}>
              <LocationVRow />
            </SearchListContainer>
          </InnerContainer>
        </ExpandableV>
        <ExpandableV title="최대 참가인원" height={100}>
          <InnerContainer>
            <MaxParticipantsContainer>
              <MaxPrticipantsButton
                left={true}
                onPress={() => {
                  activityDispatcher.dispatchMaxParticipants(
                    state.maxParticipantsNumber - 1,
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
                {state.maxParticipantsNumber}
              </MaxParticipantsNumber>
              <MaxPrticipantsButton
                left={false}
                onPress={() => {
                  activityDispatcher.dispatchMaxParticipants(
                    state.maxParticipantsNumber + 1,
                    dispatch
                  );
                }}
              >
                <Ionicons name="add" size={35} color={colors.bgColor} />
              </MaxPrticipantsButton>
            </MaxParticipantsContainer>
          </InnerContainer>
        </ExpandableV>
        <ExpandableV title="참가비" height={80} error={feeError}>
          <InnerContainer>
            <SBigTextInput
              placeholder="ex. 말이 많아요 / 치믈리에 새내기..."
              autoCapitalize="none"
              blurOnSubmit={true}
              returnKeyType="next"
              returnKeyLabel="next"
              autoCorrect={false}
              keyboardType="number-pad"
              defaultValue={
                state.participationFee ? state.participationFee : ""
              }
              onChange={(event) => {
                const { eventCount, target, text } = event.nativeEvent;
                activityDispatcher.dispatchParticipationFee(text, dispatch);
                setFeeError(!activityValidation.validateParticipationFee(text));
              }}
              error={feeError}
            />
            {feeError ? (
              <SErrorMessage>{createPlaceErrorMessage[5]}</SErrorMessage>
            ) : null}
          </InnerContainer>
        </ExpandableV>
        <View style={{ height: 150 }} />
      </ScrollView>
    </Container>
  );
}

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

const PickerContainer = styled.TouchableOpacity`
  background-color: ${colors.mainBlue};
  border-radius: 3px;
  padding: 5px;
`;

const WhiteText = styled(BlackLabel)`
  color: ${colors.bgColor};
  font-size: 20px;
`;

const Container = styled.View`
  flex: 1;
  background-color: ${colors.bgColor};
  padding: 0px 30px;
`;

const SBigTextInput = styled(BigTextInput)<{ error?: Boolean }>`
  border: ${(props) =>
    props.error
      ? `0.5px solid ${colors.warningRed}`
      : `0.5px solid ${colors.midGrey}`};
`;

const InnerContainer = styled.View`
  flex: 1;
  align-items: center;
`;

const STextArea = styled(TextArea)`
  flex: 1;
  border: ${(props) =>
    props.error
      ? `0.5px solid ${colors.warningRed}`
      : `0.5px solid ${colors.midGrey}`};
`;

const SErrorMessage = styled(ErrorMessage)`
  color: ${colors.warningRed};
`;

const InstructionText = styled(ErrorMessage)`
  color: ${colors.lightBlack};
`;

const SearchListContainer = styled.ScrollView`
  width: 100%;
`;
