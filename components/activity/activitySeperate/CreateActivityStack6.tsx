import styled from "styled-components/native";
import React, { useEffect } from "react";
import { MainHeading } from "../../../styles/styles";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

interface Props {}

export default function CreateActivityStack6(props: Props) {
  const navigation = useNavigation();
  useEffect(() => {
    // @ts-ignore
    navigation.navigate("CreatePlaceT");
  });
  return (
    <Container>
      <TouchableOpacity>
        <MainHeading>스택 3</MainHeading>
      </TouchableOpacity>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
`;
