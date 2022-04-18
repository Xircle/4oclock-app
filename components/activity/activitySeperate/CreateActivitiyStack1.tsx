import styled from "styled-components/native";
import React, { useEffect, useReducer } from "react";
import {
  colors,
  fontFamilies,
  MainHeading,
  SubHeading,
} from "../../../styles/styles";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import MyKeyboardAvoidingView from "../../UI/MyKeyboardAvoidingView";
import {
  ActivityAction,
  activityInitialState,
  ActivityState,
  reducer,
} from "../../../lib/activity/ActivityReducer";

interface Props {
  state?: ActivityState;
  dispatch?: React.Dispatch<ActivityAction>;
  role?: string;
  modify?: boolean;
}

export default function CreateActivitiyStack1({
  state,
  dispatch,
  role,
  modify,
}: Props) {
  const navigation = useNavigation();

  const [newState, newDispatch] = useReducer(reducer, activityInitialState);

  useEffect(() => {
    if (modify) {
    }
  }, []);

  return (
    <MyKeyboardAvoidingView keyboardVerticalOffset={100}>
      <Container>
        {/* @ts-ignore */}
        <TouchableOpacity onPress={() => navigation.navigate("CAS2")}>
          <MainHeading>모임을 열어볼까?</MainHeading>
          <SubHeading style={{ marginTop: 20, marginBottom: 20 }}>
            재밌는 모임을 열어볼까? 열고 친구들과 꿀잼모임😊
          </SubHeading>
        </TouchableOpacity>
      </Container>
    </MyKeyboardAvoidingView>
  );
}

const SHeader = styled(MainHeading)`
  font-family: ${fontFamilies.medium};
  font-size: 22px;
`;

const Container = styled.ScrollView`
  flex: 1;
  padding-top: 20px;
  padding-left: 15px;
  padding-right: 15px;
  background-color: ${colors.bgColor};
`;
