import styled from "styled-components/native";
import React, { useState } from "react";
import {
  colors,
  GeneralText,
  MainHeading,
  SpaceBetweenWrapper,
  TextArea,
} from "../../../styles/styles";
import MyKeyboardAvoidingView from "../../UI/MyKeyboardAvoidingView";
import { useSelector } from "react-redux";
import { RootState } from "../../../lib/reducers";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { activityDispatcher } from "../../../lib/activity/ActivityDispatcher";
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
            <STextArea
              placeholder="리더로서 크루원들에게 참고 될만한 질문을 해봐! b행 컨텐츠에 관련된 주제면 환영해!"
              autoCapitalize="none"
              blurOnSubmit={true}
              returnKeyType="next"
              returnKeyLabel="next"
              autoCorrect={false}
              multiline={true}
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
            <ExampleContainer>
              <ExampleWrapper>
                <ExampleLeftContainer>
                  <ExampleLeftText>👽</ExampleLeftText>
                </ExampleLeftContainer>
                <ExampleRightContainer>
                  <ExampleRightText>
                    너의 최근의 관심사를 알려줘!
                  </ExampleRightText>
                </ExampleRightContainer>
              </ExampleWrapper>
              <ExampleWrapper>
                <ExampleLeftContainer>
                  <ExampleLeftText>👽</ExampleLeftText>
                </ExampleLeftContainer>
                <ExampleRightContainer>
                  <ExampleRightText>
                    술 먹고 기억에 남는 흑역사 썰은?
                  </ExampleRightText>
                </ExampleRightContainer>
              </ExampleWrapper>
              <ExampleWrapper>
                <ExampleLeftContainer>
                  <ExampleLeftText>👽</ExampleLeftText>
                </ExampleLeftContainer>
                <ExampleRightContainer>
                  <ExampleRightText>요즘 하고 있는 고민은?</ExampleRightText>
                </ExampleRightContainer>
              </ExampleWrapper>
            </ExampleContainer>
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

const ExampleContainer = styled.View`
  padding-left: 6px;
  padding-right: 3px;
`;

const ExampleWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 18px;
`;

const ExampleLeftContainer = styled.View`
  margin-right: 16px;
`;

const ExampleRightContainer = styled.View`
  background-color: #ebebeb;
  flex: 1;
  padding: 8px;
  border-radius: 5px;
`;

const ExampleLeftText = styled(GeneralText)`
  font-size: 28px;
`;

const ExampleRightText = styled(GeneralText)``;

const Container = styled.ScrollView`
  flex: 1;
  background-color: ${colors.bgColor};
  padding-top: 20px;
  padding-left: 15px;
  padding-right: 15px;
`;

const InnerContainer = styled.View``;

const STextArea = styled(TextArea)`
  margin-top: 18px;
  width: 100%;
  height: 120px;
  border: 0.5px solid ${colors.midGrey};
`;
