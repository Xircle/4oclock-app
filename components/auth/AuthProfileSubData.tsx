import styled from "styled-components/native";
import React from "react";
import { Dimensions, View } from "react-native";
import {
  colors,
  fontFamilies,
  GeneralText,
  GreyInfoText,
  Label,
  MainHeading,
  Text,
  TextArea,
} from "../../styles/styles";
import { AuthAction, AuthState } from "./types.d";
import { IndexToMBTI, MBTIs, MBTIToIndex } from "../../lib/SelectData";
import MySelect from "../UI/MySelect";
import MySelectTag from "../UI/MySelectTag";
import { authDispatcher } from "../../lib/auth/AuthDispatcher";
import { authValidation } from "../../lib/auth/AuthValidation";

interface Props {
  onNext: () => void;
  state: AuthState;
  dispatch: React.Dispatch<AuthAction>;
}

const { width } = Dimensions.get("screen");

export default function AuthProfileSubData({ onNext, state, dispatch }: Props) {
  return (
    <Container showsVerticalScrollIndicator={false}>
      <MainHeading style={{ marginTop: 20 }}>
        회원님을 조금만 더 알려주세요!
      </MainHeading>
      <InfoText>자세히 알려주실수록 더 잘 맞는 친구와 마날 수 있어요</InfoText>
      <SLabel>나의 성격이나 스타일</SLabel>
      <MySelect
        data={MBTIs}
        onSelect={(selectedItem, index) => {
          authDispatcher.dispatchMBTI(IndexToMBTI[index], dispatch);
          authValidation.validateStage3(
            IndexToMBTI[index],
            state.drinkingStyle,
            state.personality,
            dispatch
          );
        }}
        width={width - 120}
        defaultButtonText="MBTI"
        defaultValueByIndex={MBTIToIndex[state.MBTI]}
      />
      <STextArea
        placeholder="ex. 친해지면 말 많아요 / 드립력 상 / 조용하고 성실함 / 연락, 답장 빨라요"
        autoCapitalize="none"
        blurOnSubmit={true}
        returnKeyType="next"
        returnKeyLabel="next"
        autoCorrect={false}
        defaultValue={state.personality ? state.personality : ""}
        multiline={true}
        onChange={(event) => {
          const { eventCount, target, text } = event.nativeEvent;
          authDispatcher.dispatchPersonality(text, dispatch);
          authValidation.validateStage3(
            state.MBTI,
            state.drinkingStyle,
            text,
            dispatch
          );
        }}
      />
      <SLabel>드링킹 스타일</SLabel>
      <TagContainer>
        <MySelectTag
          tag={"안마셔요"}
          isSelected={state.drinkingStyle === 0}
          onPress={() => {
            authDispatcher.dispatchDrinkingStyle(0, dispatch);
            authValidation.validateStage3(
              state.MBTI,
              0,
              state.personality,
              dispatch
            );
          }}
        />
        <MySelectTag
          tag={"가끔"}
          isSelected={state.drinkingStyle === 1}
          onPress={() => {
            authDispatcher.dispatchDrinkingStyle(1, dispatch);
            authValidation.validateStage3(
              state.MBTI,
              1,
              state.personality,
              dispatch
            );
          }}
        />
        <MySelectTag
          tag={"술은 분위기상"}
          isSelected={state.drinkingStyle === 2}
          onPress={() => {
            authDispatcher.dispatchDrinkingStyle(2, dispatch);
            authValidation.validateStage3(
              state.MBTI,
              2,
              state.personality,
              dispatch
            );
          }}
        />
        <MySelectTag
          tag={"메뉴가 좋으면 못 참지!"}
          isSelected={state.drinkingStyle === 3}
          onPress={() => {
            authDispatcher.dispatchDrinkingStyle(3, dispatch);
            authValidation.validateStage3(
              state.MBTI,
              3,
              state.personality,
              dispatch
            );
          }}
        />
        <MySelectTag
          tag={"술은 인생의 동반자"}
          isSelected={state.drinkingStyle === 4}
          onPress={() => {
            authDispatcher.dispatchDrinkingStyle(4, dispatch);
            authValidation.validateStage3(
              state.MBTI,
              4,
              state.personality,
              dispatch
            );
          }}
        />
      </TagContainer>
      <View style={{ height: 150 }}></View>
    </Container>
  );
}

const TagContainer = styled.View`
  margin-top: 15px;
`;

const Container = styled.ScrollView`
  background-color: ${colors.bgColor};
  padding: 15px;
`;

const InfoText = styled(GreyInfoText)`
  margin-top: 18px;
`;

const SLabel = styled(Label)`
  margin-top: 20px;
  font-size: 20px;
  font-family: ${fontFamilies.regular};
`;

const STextArea = styled(TextArea)`
  margin-top: 20px;
  height: 150px;
`;
