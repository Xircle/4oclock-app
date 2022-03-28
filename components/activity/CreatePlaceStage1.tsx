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
import { ScrollView, View, Dimensions, TouchableOpacity } from "react-native";
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
import SelectedLocation from "./locationV/SelectedLocation";
import MyKeyboardAvoidingView from "../UI/MyKeyboardAvoidingView";
import CreatePlaceTypeSelector from "./CreatePlaceTypeSelector";
import MySelect from "../UI/MySelect";
import { getTeams } from "../../lib/api/getTeams";
import { useQuery } from "react-query";
import { TeamData } from "../../lib/api/types";
import { openLink } from "../shared/Links";

interface Props {
  state: ActivityState;
  dispatch: React.Dispatch<ActivityAction>;
  admin?: boolean;
}

const { width } = Dimensions.get("window");

export default function CreatePlaceStage1({ state, dispatch, admin }: Props) {
  const [nameError, setNameError] = useState(undefined);
  const [descriptionError, setDescriptionError] = useState(undefined);
  const [dateError, setDateError] = useState(undefined);
  const [addressError, setAddressError] = useState(undefined);
  const [feeError, setFeeError] = useState(undefined);
  const [openKakaoLinkError, setOpenKakaoLinkError] = useState(undefined);
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [searchResult, setSearchResult] = useState<kakaoLocalData[]>(undefined);
  const [placeSearch, setPlaceSearch] = useState("");
  const [refreshCount, setRefreshCount] = useState(0);

  const [localTeamNames, setLocalTeamNames] = useState<string[]>([]);
  // refactor on V2
  const [placeName, setPlaceName] = useState("");
  const [placeAddress, setPlaceAddress] = useState("");

  const { data: teamsData } = useQuery<TeamData[] | undefined>(
    ["teams"],
    () => getTeams(),
    {
      retry: 1,
    }
  );

  useEffect(() => {
    if (teamsData && teamsData.length > 0 && localTeamNames.length === 0) {
      teamsData.forEach((team, index) => {
        setLocalTeamNames((prev) => [...prev, team.name]);
      });
    }
  }, [teamsData]);

  useEffect(() => {
    activityDispatcher.dispatchStage1Valid(
      nameError === false &&
        descriptionError === false &&
        dateError === false &&
        addressError === false &&
        openKakaoLinkError === false &&
        !feeError,
      dispatch
    );
  }, [
    nameError,
    descriptionError,
    dateError,
    addressError,
    feeError,
    openKakaoLinkError,
  ]);

  useEffect(() => {
    if (state.isFinished) {
      setRefreshCount((prev) => prev + 1);
      dispatch({ type: "setIsFinished", payload: false });
      setNameError(undefined);
      setDescriptionError(undefined);
      setDateError(undefined);
      setAddressError(undefined);
      setFeeError(undefined);
      setSearchResult(undefined);
      setOpenKakaoLinkError(undefined);
      setPlaceName("");
    }
  }, [state.isFinished]);

  const CTAPlace = (addressName: string, placeName: string, id: string) => {
    setPlaceName(placeName);
    setPlaceAddress(addressName);
    activityDispatcher.dispatchDetailAddress(addressName, id, dispatch);
    setPlaceSearch("");
    setAddressError(false);
  };

  const setActivityType = (type: string) => {
    activityDispatcher.dispatchActivityType(type, dispatch);
  };
  return (
    <Container>
      <MyKeyboardAvoidingView keyboardVerticalOffset={100}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <MainHeading>모임을 열어볼까?</MainHeading>
          <SubHeading style={{ marginTop: 20, marginBottom: 20 }}>
            재밌는 모임을 열어볼까? 열고 친구들과{"\n"}꿀잼모임😊
          </SubHeading>
          {admin && (
            <InnerContainer style={{ paddingBottom: 5 }}>
              <CreatePlaceTypeSelector
                onPress={setActivityType}
                selectedType={state.activityType}
              />
            </InnerContainer>
          )}
          <ExpandableV
            title="만들고 싶은 모임 주제를 적어봐! (제목)"
            height={120}
            error={nameError}
            refreshCount={refreshCount}
          >
            <InnerContainer>
              <SBigTextInput
                placeholder="친구들과 함께 놀러갈 곳 이름을 적어줘!"
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
          {state.activityType === "정기" && (
            <ExpandableV
              title="어떤 팀에 열려있는 모임이야? (팀)"
              height={120}
              refreshCount={refreshCount}
            >
              <InnerContainer>
                <MySelect
                  data={localTeamNames}
                  onSelect={(selectedItem, index) => {
                    // setLocalProfileData((prev) => ({
                    //   ...prev,
                    //   team: selectedItem,
                    // }));
                    if (index !== 0) {
                      activityDispatcher.dispatchTeam(selectedItem, dispatch);
                    } else {
                      activityDispatcher.dispatchTeam("", dispatch);
                    }
                  }}
                  width={width * 0.81}
                  defaultButtonText="팀을 선택해주세요"
                />
              </InnerContainer>
            </ExpandableV>
          )}
          <ExpandableV
            title="모임 조건을 적어주세요! (선택)"
            height={120}
            refreshCount={refreshCount}
          >
            <InnerContainer>
              <ReqBigTextInput
                placeholder="ex. I들의 모임, 보드게임 초보만, 새내기 모여라, 무알콜"
                autoCapitalize="none"
                blurOnSubmit={true}
                returnKeyType="next"
                returnKeyLabel="next"
                autoCorrect={false}
                defaultValue={state.recommendation ? state.recommendation : ""}
                onChange={(event) => {
                  const { eventCount, target, text } = event.nativeEvent;
                  activityDispatcher.dispatchRecommendation(text, dispatch);
                }}
              />
            </InnerContainer>
          </ExpandableV>
          <ExpandableV
            title="어떤 활동을 하는 모임이야?(설명)"
            height={150}
            error={descriptionError}
            refreshCount={refreshCount}
          >
            <InnerContainer style={[{ paddingTop: 15 }, { paddingBottom: 15 }]}>
              <STextArea
                placeholder="모임에 대한 설명을 입력해줘! 함께하고 싶은 주제나 내용을 입력하면 좋아"
                autoCapitalize="none"
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
          <ExpandableV
            title="오픈 카카오톡 채팅방 링크"
            height={120}
            error={openKakaoLinkError}
            refreshCount={refreshCount}
          >
            <InnerContainer style={[{ paddingTop: 15 }, { paddingBottom: 15 }]}>
              <SBigTextInput
                placeholder="ex: https://open.kakao.com/o/grFhbIBd"
                autoCapitalize="none"
                blurOnSubmit={true}
                returnKeyType="next"
                returnKeyLabel="next"
                autoCorrect={false}
                value={state.kakaoLink}
                defaultValue={state.kakaoLink ? state.kakaoLink : ""}
                onChange={(event) => {
                  const { eventCount, target, text } = event.nativeEvent;
                  activityDispatcher.dispatchKakaoLink(
                    //text.replace(/[^A-Za-z0-9/.]/g, ""),
                    text,
                    dispatch
                  );

                  setOpenKakaoLinkError(
                    !text.startsWith("https://open.kakao.com/o/g")
                  );
                  // setNameError(!activityValidation.validateName(text));
                }}
              />
              {openKakaoLinkError ? (
                <SErrorMessage>{createPlaceErrorMessage[7]}</SErrorMessage>
              ) : null}
              <TouchableOpacity onPress={openLink.LOpenKakaoChatGUide}>
                <OKInfoText>오카방 만드는 방법</OKInfoText>
              </TouchableOpacity>
            </InnerContainer>
          </ExpandableV>
          <ExpandableV
            title="만남날짜/시간"
            height={80}
            error={dateError}
            refreshCount={refreshCount}
          >
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
          <ExpandableV
            title="만남위치"
            height={250}
            error={addressError}
            refreshCount={refreshCount}
          >
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
                <SelectedLocation
                  placeName={placeName}
                  address={placeAddress}
                />
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
          </ExpandableV>
          <ExpandableV
            title="최대 참가인원"
            height={100}
            refreshCount={refreshCount}
          >
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
          <ExpandableV
            title="참가비"
            height={80}
            error={feeError}
            refreshCount={refreshCount}
          >
            <InnerContainer>
              <SBigTextInput
                placeholder="ex. 15000"
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
                  setFeeError(
                    !activityValidation.validateParticipationFee(text)
                  );
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
      </MyKeyboardAvoidingView>
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

const ReqBigTextInput = styled(SBigTextInput)`
  font-size: 12px;
`;

const InnerContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
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
  padding-top: 5px;
  padding-bottom: 5px;
`;

const OKInfoText = styled(GeneralText)`
  font-size: 11px;
  margin-top: 11px;
  color: ${colors.midGrey};
  text-decoration-line: underline;
`;
