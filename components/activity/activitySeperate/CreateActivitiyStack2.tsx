import styled from "styled-components/native";
import React, { useEffect } from "react";
import { colors, MainHeading } from "../../../styles/styles";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  ActivityAction,
  ActivityState,
} from "../../../lib/activity/ActivityReducer";
import { useSelector } from "react-redux";
import { RootState } from "../../../lib/reducers";
import MyKeyboardAvoidingView from "../../UI/MyKeyboardAvoidingView";

interface Props {
  role?: string;
  modify?: boolean;
}

export default function CreateActivitiyStack2({}: Props) {
  const { name, modify, activityType, stage1Valid } = useSelector(
    (state: RootState) => state.activityReducer
  );
  const navigation = useNavigation();

  useEffect(() => {
    console.log(name);
  }, [name]);
  return (
    <MyKeyboardAvoidingView keyboardVerticalOffset={100}>
      <Container>
        {/* @ts-ignore */}
        <TouchableOpacity onPress={() => navigation.navigate("CAS3")}>
          <MainHeading>스택 2</MainHeading>
        </TouchableOpacity>
      </Container>
    </MyKeyboardAvoidingView>
  );
}

const Container = styled.View`
  flex: 1;
  padding-top: 20px;
  padding-left: 15px;
  padding-right: 15px;
  background-color: ${colors.bgColor};
`;
