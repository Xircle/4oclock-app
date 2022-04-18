import styled from "styled-components/native";
import React from "react";
import { MainHeading } from "../../../styles/styles";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

interface Props {}

export default function CreateActivityFinish(props: Props) {
  const navigation = useNavigation();
  return (
    <Container>
      {/* @ts-ignore */}
      <TouchableOpacity onPress={() => navigation.navigate("CAS3")}>
        <MainHeading>Finish</MainHeading>
      </TouchableOpacity>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
`;
