import styled from "styled-components/native";
import React from "react";
import { MainHeading } from "../../../styles/styles";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

interface Props {}

export default function CreateActivitiyStack1(props: Props) {
  const navigation = useNavigation();
  return (
    <Container>
        {/* @ts-ignore */}
      <TouchableOpacity onPress={() => navigation.navigate("CAS2")}>
        <MainHeading>스택 1</MainHeading>
      </TouchableOpacity>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
`;
