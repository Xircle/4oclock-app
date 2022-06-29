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
      <ItemContainer onPress={this.props.CTA}>
        <ItemPicContainer>
          {/* {this.props.image ? : } */}
          <ImageSub>👽</ImageSub>
        </ItemPicContainer>
        <ItemMidContainer>
          <HeaderText>
            {this.props.mainText ? this.props.mainText : "no title provided"}
          </HeaderText>
          <SubText>
            {this.props.subText ? this.props.subText : "no title provided"}
          </SubText>
        </ItemMidContainer>
        {/* <ItemDeleteContainer></ItemDeleteContainer> */}
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
  width: 60px;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const ItemDeleteContainer = styled.TouchableOpacity`
  background-color: red;
  width: 40px;
  height: 100%;
`;

const ItemMidContainer = styled.View`
  flex: 1;
  justify-content: space-around;
`;

const HeaderText = styled(GeneralText)``;

const SubText = styled(GeneralText)`
  color: ${colors.bareGrey};
`;

const ImageSub = styled.Text`
  font-size: 40px;
`;
