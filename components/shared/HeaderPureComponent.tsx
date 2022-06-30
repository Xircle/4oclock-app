import React, { PureComponent } from "react";
import FastImage from "react-native-fast-image";
import { TouchableOpacity } from "react-native-gesture-handler";
import styled from "styled-components/native";
import { colors } from "../../styles/styles";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import MainHeaderRight from "./MainHeaderRight";

interface Props {}

export default function HeaderPureComponent(props: Props) {
  const navigation = useNavigation();

  const NotificationCTAHandler = () => {
    // @ts-ignore
    navigation.navigate("NotificationScreen");
  };

  return (
    <HeaderContainer>
      <HeaderImage source={require("../../statics/images/HeaderImage.png")} />
      <HeaderRightContainer>
        <MainHeaderRight />
      </HeaderRightContainer>
    </HeaderContainer>
  );
}

const HeaderContainer = styled.View`
  width: 100%;
  height: 40px;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  padding-left: 5px;
  padding-right: 5px;
`;

const HeaderImage = styled(FastImage)`
  width: 55px;
  height: 50px;
  border-radius: 25px;
`;

const HeaderRightContainer = styled.View``;
