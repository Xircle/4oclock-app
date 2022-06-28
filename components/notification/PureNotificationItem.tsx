import React, { PureComponent } from "react";
import styled from "styled-components/native";
import { colors, fontFamilies, GeneralText } from "../../styles/styles";

interface Props {
  image?: string;
  CTA?: () => void;
  mainText: string;
  subText?: string;
}

export default class PureNotificationItem extends PureComponent<Props> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ItemContainer>
        <ItemPicContainer></ItemPicContainer>
        <ItemMidContainer>
          <HeaderText>NotificationScreen</HeaderText>
        </ItemMidContainer>
        <ItemDeleteContainer></ItemDeleteContainer>
      </ItemContainer>
    );
  }
}

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

const ItemDeleteContainer = styled.TouchableOpacity`
  background-color: red;
  width: 40px;
  height: 100%;
`;

const ItemMidContainer = styled.View`
  flex: 1;
`;

const HeaderText = styled(GeneralText)``;
