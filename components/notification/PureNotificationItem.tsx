import React, { PureComponent } from "react";
import styled from "styled-components/native";
import { colors, fontFamilies, GeneralText } from "../../styles/styles";

interface Props {
  image?: string;
  mainText: string;
  subText?: string;
  type: string;
  isUnread?: boolean;
}

export default class PureNotificationItem extends PureComponent<Props> {
  constructor(props) {
    super(props);
  }

  render() {
    async function CTA() {
      switch (this.props.type) {
        case "message":
          break;
        case "okLink":
          break;
        case "place":
          break;
      }
    }
    return (
      <ItemContainer onPress={CTA} isUnread={this.props.isUnread}>
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

const ItemContainer = styled.TouchableOpacity<{ isUnread: boolean }>`
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  background-color: ${(props) =>
    props.isUnread ? colors.lightBlue : "	#f5f5f5"};
  height: 60px;
  /* border-bottom-width: 1px; */
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
