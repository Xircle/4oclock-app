import styled from "styled-components/native";
import React, { useEffect, useState } from "react";
import {
  BigTextInput,
  BlackLabel,
  colors,
  ErrorMessage,
  GeneralText,
  MainHeading,
  SpaceBetweenWrapper,
} from "../../../styles/styles";
import MyKeyboardAvoidingView from "../../UI/MyKeyboardAvoidingView";
import { useSelector } from "react-redux";
import { RootState } from "../../../lib/reducers";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { activityDispatcher } from "../../../lib/activity/ActivityDispatcher";
import { createPlaceErrorMessage } from "../../../lib/errorMessages";
import { openLink } from "../../shared/Links";
import { Alert } from "react-native";
import FullScreenLoader from "../../UI/FullScreenLoader";
import { createPlace } from "../../../lib/api/createPlace";
import { editPlace } from "../../../lib/api/editPlace";
import RelativeMainButtonWBg from "../../UI/RelativeMainButtonWBG";

interface Props {}

export default function CreateActivityStackQA(props: Props) {
  const { qAndA, modify, modifyPlaceId } = useSelector(
    (state: RootState) => state.activityReducer
  );

  const state = useSelector((state: RootState) => state.activityReducer);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [openKakaoLinkError, setOpenKakaoLinkError] = useState(undefined);
  const [loading, setLoading] = useState(false);

  const nextHandler = async () => {
    setLoading(true);
    try {
      if (!modify) {
        await createPlace(state);
      } else if (modifyPlaceId) {
        await editPlace(state, modifyPlaceId);
      }
    } catch (e) {
      setLoading(false);
      Alert.alert("일시적 오류가 발생했습니다");
      console.log(e);
    }
    setLoading(false);
    // @ts-ignore
    navigation.navigate("CAS6", {});
  };

  return (
    <MyKeyboardAvoidingView keyboardVerticalOffset={50}>
      <SpaceBetweenWrapper>
        <Container showsVerticalScrollIndicator={false}>
          <MainHeading>
            (선택){`\n`}참여 크루원에게 물어보고 싶은 질문을 해봐!
          </MainHeading>

          <InnerContainer>
            <BlackLabel>오픈 카카오톡 채팅wcwcwc방 링크</BlackLabel>
            <SBigTextInput
              placeholder="ex: https://open.kakao.com/o/grFhbIBd"
              autoCapitalize="none"
              blurOnSubmit={true}
              returnKeyType="next"
              returnKeyLabel="next"
              autoCorrect={false}
              value={qAndA?.[0] ? qAndA?.[0] : ""}
              defaultValue={qAndA?.[0] ? qAndA?.[0] : ""}
              onChange={(event) => {
                const { eventCount, target, text } = event.nativeEvent;
                activityDispatcher.dispatchQAndA(
                  //text.replace(/[^A-Za-z0-9/.]/g, ""),
                  [text],
                  dispatch
                );
              }}
            />
          </InnerContainer>
        </Container>
        <RelativeMainButtonWBg
          onPress={nextHandler}
          title={"다음"}
          bottom={10}
        />

        {loading && <FullScreenLoader />}
      </SpaceBetweenWrapper>
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

const SBigTextInput = styled(BigTextInput)<{ error?: Boolean }>`
  border: ${(props) =>
    props.error
      ? `0.5px solid ${colors.warningRed}`
      : `0.5px solid ${colors.midGrey}`};
  margin-top: 20px;
`;
