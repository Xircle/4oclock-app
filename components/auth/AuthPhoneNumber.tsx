import styled from "styled-components/native";
import {
  BigTextInput,
  colors,
  GeneralText,
  GreyInfoText,
  MainHeading,
} from "../../styles/styles";
import { AuthAction, AuthState } from "./types";
import React from "react";
import { authDispatcher } from "../../lib/auth/AuthDispatcher";
import { authValidation } from "../../lib/auth/AuthValidation";

interface Props {
  dispatch: React.Dispatch<AuthAction>;
  setCode: (code: string) => void;
  setIsSent: (b: boolean) => void;

  state: AuthState;
}

export default function AuthPhoneNumber({
  setCode,
  dispatch,
  setIsSent,
}: Props) {
  return (
    <Container showsVerticalScrollIndicator={false}>
      <MainHeading style={{ marginTop: 40 }}>
        즐거운 모임 전{"\n"}전화번호를 입력해볼까?
      </MainHeading>
      <GreyInfoText style={{ marginTop: 20 }}>
        안심해! 번호는 절대 공개되지 않아!
      </GreyInfoText>
      <PhoneNumberInput
        blurOnSubmit={true}
        returnKeyType="next"
        returnKeyLabel="next"
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="number-pad"
        placeholder="전화번호를 입력해주세요"
        onChange={(event) => {
          const { eventCount, target, text } = event.nativeEvent;
          authDispatcher.dispatchPhoneNumber(text, dispatch);
          authValidation.validatePhoneNumber(text, dispatch);
          setIsSent(false);
        }}
      />
      <PhoneNumberInput
        blurOnSubmit={true}
        returnKeyType="next"
        returnKeyLabel="next"
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="number-pad"
        placeholder="인증코드"
        onChange={(event) => {
          const { eventCount, target, text } = event.nativeEvent;
          setCode(text);
        }}
      />
    </Container>
  );
}

const Container = styled.ScrollView`
  background-color: ${colors.white};
  padding: 15px;
`;

const PhoneNumberInput = styled(BigTextInput)`
  margin-top: 50px;
  height: 50px;
  border-radius: 0px;
  border: none;
  border-bottom-width: 0.5px;
  border-color: ${colors.bareGrey};
`;
