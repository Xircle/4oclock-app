import styled from "styled-components/native";
import React, { useEffect, useReducer } from "react";
import { colors, Text } from "../styles/styles";
import { RouteProp } from "@react-navigation/native";
import { LoggedOutStackParamList } from "../navigators/LoggedOutNav";
import AvatarUri from "../components/UI/AvatarUri";
import { SafeAreaView } from "react-native-safe-area-context";
import { initialState, reducer } from "../lib/auth/AuthReducer";
import MyBackButton from "../components/UI/MyBackButton";
import MainButtonWBg from "../components/UI/MainButtonWBg";
import AuthPhoneNumber from "../components/auth/AuthPhoneNumber";
import AuthProfileMainData from "../components/auth/AuthProfileMainData";

interface Props {
  route: RouteProp<LoggedOutStackParamList, "SignIn">;
}

export default function SignIn({ route }: Props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  console.log(route);

  useEffect(() => {
    const uid = route.params.uid;
    const thumbnail = route.params.profileImageUrl;
    const email = route.params.email;
    const gender = route.params.gender;

    if (uid) dispatch({ type: "setUid", payload: uid });
    if (gender) dispatch({ type: "setGender", payload: gender });
    if (thumbnail) dispatch({ type: "setProfileImgUrl", payload: thumbnail });
    if (email) dispatch({ type: "setEmail", payload: email });
  }, []);

  // API

  // values

  // animations

  // pan responders

  return (
    <SafeAreaView style={{ backgroundColor: colors.bgColor, flex: 1 }}>
      <Container>
        <MyBackButton color={colors.black} size={38} />
        <Wrapper>
          {/* <AuthPhoneNumber
            onNext={() => {}}
            state={state}
            dispatch={dispatch}
          /> */}
          <AuthProfileMainData
            onNext={() => {}}
            state={state}
            dispatch={dispatch}
          />
        </Wrapper>
        <MainButtonWBg onPress={() => {}} title={"다음"} />
      </Container>
    </SafeAreaView>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: ${colors.bgColor};
  padding: 15px;
`;

const Wrapper = styled.View`
  flex: 1;
  flex-direction: row;
`;
