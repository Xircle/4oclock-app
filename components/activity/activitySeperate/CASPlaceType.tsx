import styled from "styled-components/native";
import React from "react";
import { CreateActivityStackParamList } from "../../../navigators/CreateActivityStackNav";
import { useNavigation } from "@react-navigation/native";
import { MainHeading } from "../../../styles/styles";
import { TouchableOpacity } from "react-native";

type Props = CreateActivityStackParamList["CASPlaceType"];

export default function CASPlaceType(props: Props) {
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
