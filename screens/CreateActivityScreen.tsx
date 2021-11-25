import styled from "styled-components/native";
import React from "react";
import { colors, Text } from "../styles/styles";
import { ScrollView } from "react-native";

interface Props {}

export default function CreateActivityScreen(props: Props) {
  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text>create a place</Text>

      </ScrollView>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${colors.bgColor};
`;

const SubImageContainer = styled.View``;

const CoverImageContainer = styled.View``;

