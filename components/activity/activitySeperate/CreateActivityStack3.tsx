import styled from "styled-components/native";
import React, { useState } from "react";
import {
  CASContainer,
  colors,
  ErrorMessage,
  MainHeading,
  SpaceBetweenWrapper,
  TextArea,
} from "../../../styles/styles";
import MyKeyboardAvoidingView from "../../UI/MyKeyboardAvoidingView";
import { ScrollView } from "react-native-gesture-handler";
import { activityDispatcher } from "../../../lib/activity/ActivityDispatcher";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { RootState } from "../../../lib/reducers";
import { useSelector } from "react-redux";
import { activityValidation } from "../../../lib/activity/CreateActivityValidation";
import { createPlaceErrorMessage } from "../../../lib/errorMessages";
import RelativeMainButtonWBg from "../../UI/RelativeMainButtonWBG";

interface Props {}

export default function CreateActivityStack3(props: Props) {
  const { description } = useSelector(
    (state: RootState) => state.activityReducer
  );
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [descriptionError, setDescriptionError] = useState(undefined);

  const nextHandler = () => {
    // @ts-ignore
    navigation.navigate("CAS4", {});
  };

  return (
    <MyKeyboardAvoidingView keyboardVerticalOffset={50}>
      <SpaceBetweenWrapper>
        <CASContainer>
          <ScrollView showsVerticalScrollIndicator={false}>
            <MainHeading>어떤 활동을 하는 모임이야?</MainHeading>

            <STextArea
              placeholder="모임에 대한 설명을 입력해줘! 함께하고 싶은 주제나 내용을 입력하면 좋아"
              autoCapitalize="none"
              returnKeyType="next"
              returnKeyLabel="next"
              autoCorrect={false}
              multiline={true}
              defaultValue={description ? description : ""}
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
              <SErrorMessage>{createPlaceErrorMessage[1]}</SErrorMessage>
            ) : null}
          </ScrollView>
        </CASContainer>

        {/* @ts-ignore */}
        <RelativeMainButtonWBg
          onPress={nextHandler}
          disabled={!description}
          title={"다음"}
          bottom={10}
        />
      </SpaceBetweenWrapper>
    </MyKeyboardAvoidingView>
  );
}

const STextArea = styled(TextArea)<{ error?: boolean }>`
  margin-top: 50px;
  width: 100%;
  height: 180px;
  border: ${(props) =>
    props.error
      ? `0.5px solid ${colors.veryLightRed}`
      : `0.5px solid ${colors.midGrey}`};
`;

const SErrorMessage = styled(ErrorMessage)`
  color: ${colors.veryLightRed};
`;
