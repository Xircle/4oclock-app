import React from "react";
import styled from "styled-components/native";
import { colors, GeneralText } from "../styles/styles";

type Props = {};

export const NotificationScreen = (props: Props) => {
  return (
    <Container showsVerticalScrollIndicator={false}>
      <ItemContainer>
        <ItemPicContainer></ItemPicContainer>
        <ItemMidContainer>
          <HeaderText>NotificationScreen</HeaderText>
        </ItemMidContainer>
        <ItemDeleteContainer></ItemDeleteContainer>
      </ItemContainer>
    </Container>
  );
};

const Container = styled.ScrollView`
  flex: 1;
  background-color: ${colors.bgColor};
  width: 100%;
`;

const HeaderText = styled(GeneralText)``;

const ItemContainer = styled.TouchableOpacity`
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  background-color: ${colors.lightBlue};
  height: 60px;
  border-bottom-width: 1px;
  flex-direction: row;
`;

const ItemPicContainer = styled.View`
  background-color: red;
  width: 40px;
  height: 100%;
`;

const ItemDeleteContainer = styled.View`
  background-color: red;
  width: 40px;
  height: 100%;
`;

const ItemMidContainer = styled.View`
  flex: 1;
`;
