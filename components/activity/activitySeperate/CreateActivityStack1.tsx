import styled from "styled-components/native";
import React, { useEffect, useState } from "react";
import {
  BigTextInput,
  BlackLabel,
  colors,
  ErrorMessage,
  MainHeading,
  SpaceBetweenWrapper,
  SubHeading,
} from "../../../styles/styles";
import { Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import MyKeyboardAvoidingView from "../../UI/MyKeyboardAvoidingView";
import storage from "../../../lib/helpers/myAsyncStorage";
import CreatePlaceTypeSelector from "../CreatePlaceTypeSelector";
import { activityDispatcher } from "../../../lib/activity/ActivityDispatcher";
import { activityValidation } from "../../../lib/activity/CreateActivityValidation";
import { createPlaceErrorMessage } from "../../../lib/errorMessages";
import { CreateActivityStackParamList } from "../../../navigators/CreateActivityStackNav";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { RootState } from "../../../lib/reducers";
import MySelect from "../../UI/MySelect";
import { useQuery } from "react-query";
import { TeamData } from "../../../lib/api/types";
import { getTeams } from "../../../lib/api/getTeams";
import RelativeMainButtonWBg from "../../UI/RelativeMainButtonWBG";

type Props = CreateActivityStackParamList["CAS1"];

const { width } = Dimensions.get("window");

export default function CreateActivityStack1(props: Props) {
  const { name, modify, activityType, stage1Valid, recommendation } =
    useSelector((state: RootState) => state.activityReducer);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [nameError, setNameError] = useState(undefined);
  const [localTeamNames, setLocalTeamNames] = useState<string[]>([]);

  const nextHandler = () => {
    if (modify) {
      // @ts-ignore
      navigation.navigate("CAS21", {});
    } else {
      // @ts-ignore
      navigation.navigate("CAS2", {});
    }
  };

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

  return (
    <MyKeyboardAvoidingView keyboardVerticalOffset={50}>
      <SpaceBetweenWrapper>
        <Container>
          <MainHeading>모임을 열어볼까?</MainHeading>
          <SubHeading style={{ marginTop: 20, marginBottom: 20 }}>
            재밌는 모임을 열어볼까? 열고 친구들과 꿀잼모임😊
          </SubHeading>

          <CAPartWrapper>
            <BlackLabel>만들고 싶은 모임 주제를 적어봐!(제목)</BlackLabel>
            <SBigTextInput
              placeholder="친구들과 함께 놀러갈 곳 이름을 적어줘!"
              autoCapitalize="none"
              blurOnSubmit={true}
              returnKeyType="next"
              returnKeyLabel="next"
              autoCorrect={false}
              defaultValue={name ? name : ""}
              onChange={(event) => {
                const { eventCount, target, text } = event.nativeEvent;
                activityDispatcher.dispatchName(text, dispatch);
                setNameError(!activityValidation.validateName(text));
                activityDispatcher.dispatchStage1Valid(
                  text.length > 2,
                  dispatch
                );
              }}
              error={nameError}
            />
            {nameError ? (
              <SErrorMessage>{createPlaceErrorMessage[0]}</SErrorMessage>
            ) : null}
          </CAPartWrapper>

          <CAPartWrapper>
            <BlackLabel>모임 조건을 적어주세요!(선택)</BlackLabel>
            <SBigTextInput
              placeholder="ex. I들의 모임, 보드게임 초보만, 새내기 모여라, 무알콜"
              autoCapitalize="none"
              blurOnSubmit={true}
              returnKeyType="next"
              returnKeyLabel="next"
              autoCorrect={false}
              defaultValue={recommendation ? recommendation : ""}
              onChange={(event) => {
                const { eventCount, target, text } = event.nativeEvent;
                activityDispatcher.dispatchRecommendation(text, dispatch);
              }}
            />
          </CAPartWrapper>
          {activityType === "정기" && (
            <CAPartWrapper>
              <BlackLabel>어떤 팀에 열려있는 모임이야? (팀)</BlackLabel>
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
            </CAPartWrapper>
          )}
        </Container>

        <RelativeMainButtonWBg
          onPress={nextHandler}
          disabled={!stage1Valid}
          title={"다음"}
          bottom={10}
        />
      </SpaceBetweenWrapper>
    </MyKeyboardAvoidingView>
  );
}

const CAPartWrapper = styled.View`
  margin-top: 20px;
  margin-bottom: 20px;
`;

const Container = styled.ScrollView`
  flex: 1;
  padding-top: 20px;
  padding-left: 15px;
  padding-right: 15px;
  background-color: ${colors.bgColor};
`;

const InnerContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const SBigTextInput = styled(BigTextInput)<{ error?: Boolean }>`
  border: ${(props) =>
    props.error
      ? `0.5px solid ${colors.warningRed}`
      : `0.5px solid ${colors.midGrey}`};
  margin-top: 11px;
`;

const SErrorMessage = styled(ErrorMessage)`
  color: ${colors.warningRed};
`;
