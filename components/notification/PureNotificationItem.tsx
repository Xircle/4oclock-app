import { NavigationProp, ParamListBase } from "@react-navigation/native";
import React, { PureComponent } from "react";
import styled from "styled-components/native";
import { colors, GeneralText } from "../../styles/styles";
import { openLink } from "../shared/Links";

interface Props {
  image?: string;
  mainText: string;
  subText?: string;
  type: string;
  isUnread?: boolean;
  mainParam?: string;
  navigation: NavigationProp<ParamListBase>;
}

export default class PureNotificationItem extends PureComponent<Props> {
  constructor(props) {
    super(props);
  }

  CTA = async (
    type: string,
    navigation: NavigationProp<ParamListBase>,
    mainParam?: string
  ) => {
    if (!mainParam) return;
    switch (type) {
      case "message":
        break;
      case "okLink":
        //openLink
        await openLink.LOpenLink(mainParam);
        break;
      case "place":
        navigation.navigate("ActivityStackNav", {
          id: mainParam,
        });
        break;
    }
  };

  render() {
    const { mainText, isUnread, subText, mainParam, type, navigation } =
      this.props;
    return (
      <ItemContainer
        onPress={async () => await this.CTA(type, navigation, mainParam)}
        isUnread={isUnread}
      >
        <ItemPicContainer>
          {/* {this.props.image ? : } */}
          <ImageSub>☀️</ImageSub>
        </ItemPicContainer>
        <ItemMidContainer>
          <HeaderText>{mainText ? mainText : "no title provided"}</HeaderText>
          <SubText>{subText ? subText : "no subtitle provided"}</SubText>
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
    props.isUnread ? colors.veryPaleBlue : "	#f5f5f5"};
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
