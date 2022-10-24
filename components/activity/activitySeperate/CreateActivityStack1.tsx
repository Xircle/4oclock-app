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
import { activityDispatcher } from "../../../lib/activity/ActivityDispatcher";
import { activityValidation } from "../../../lib/activity/CreateActivityValidation";
import { createPlaceErrorMessage } from "../../../lib/errorMessages";
import { CreateActivityStackParamList } from "../../../navigators/CreateActivityStackNav";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { RootState } from "../../../lib/reducers";
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
  background-color: ${colors.white};
`;

const InnerContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const SBigTextInput = styled(BigTextInput)<{ error?: Boolean }>`
  border: ${(props) =>
    props.error
      ? `0.5px solid ${colors.veryLightRed}`
      : `0.5px solid ${colors.midGrey}`};
  margin-top: 11px;
`;

const SErrorMessage = styled(ErrorMessage)`
  color: ${colors.veryLightRed};
`;
