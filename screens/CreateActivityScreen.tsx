import styled from "styled-components/native";
import React from "react";
import { colors, MainHeading, SubHeading, Text } from "../styles/styles";
import { ScrollView } from "react-native";

interface Props {}

export default function CreateActivityScreen(props: Props) {
  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        <MainHeading>모임을 열어볼까?</MainHeading>
        <SubHeading style={{ marginTop: 20 }}>
          재밌는 모임을 열어보자~~ 행복하고 재밌는 모임
        </SubHeading>
        
      </ScrollView>
    </Container>
  );
}

const Container = styled.ScrollView`
  flex: 1;
  background-color: ${colors.bgColor};
  padding: 0px 30px;
`;



const SubImageContainer = styled.View``;

const CoverImageContainer = styled.View``;