import styled from "styled-components/native";
import React, { useState } from "react";
import {
  BigTextInput,
  colors,
  fontFamilies,
  GeneralText,
} from "../../styles/styles";
import { TouchableOpacity } from "react-native";

interface Props {
  submit: () => void;
  emailOnchange: (text: string) => void;
  pwdOnchange: (text: string) => void;
}

export default function MyLogin({ emailOnchange, pwdOnchange, submit }: Props) {
  return (
    <Container
      style={{
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
      }}
    >
      <LeftContainer>
        <SBigTextInput
          placeholder="Email"
          autoCapitalize="none"
          blurOnSubmit={true}
          returnKeyType="next"
          returnKeyLabel="next"
          autoCorrect={false}
          keyboardType="email-address"
          onChange={(event) => {
            const { eventCount, target, text } = event.nativeEvent;
            emailOnchange(text);
          }}
        />
        <SBigTextInput
          placeholder="Password"
          autoCapitalize="none"
          blurOnSubmit={true}
          returnKeyType="done"
          returnKeyLabel="done"
          secureTextEntry
          autoCorrect={false}
          onChange={(event) => {
            const { eventCount, target, text } = event.nativeEvent;
            pwdOnchange(text);
          }}
        />
      </LeftContainer>
      <RightContainer>
        <LoginButton
          style={{
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.22,
            shadowRadius: 2.22,

            elevation: 3,
          }}
          onPress={submit}
        >
          <LoginText>Login</LoginText>
        </LoginButton>
      </RightContainer>
    </Container>
  );
}

const Container = styled.View`
  width: 100%;
  height: 110px;
  border-radius: 4px;
  background-color: ${colors.bgColor};
  flex-direction: row;
`;

const LeftContainer = styled.View`
  flex: 1;
  justify-content: space-evenly;
  padding-left: 10px;
`;

const RightContainer = styled.View`
  width: 80px;
  padding: 10px 10px;
  height: 100%;
`;

const SBigTextInput = styled(BigTextInput)`
  border-color: ${colors.black};
  border-radius: 4px;
`;

const LoginButton = styled.TouchableOpacity`
  flex: 1;
  width: 100%;
  background-color: ${colors.mainBlue};
  border-radius: 4px;
  justify-content: center;
  align-items: center;
`;

const LoginText = styled(GeneralText)`
  color: ${colors.bgColor};
  font-family: ${fontFamilies.bold};
`;
