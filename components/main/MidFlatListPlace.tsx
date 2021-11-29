import styled from "styled-components/native";
import React from "react";
import { colors, fontFamilies, GeneralText } from "../../styles/styles";
import { Dimensions } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

interface Props {
  coverImage?: string;
  name?: string;
  id?: string;
}

const { height } = Dimensions.get("window");

export default function MidFlatListPlace({ coverImage, name, id }: Props) {
  const navigation = useNavigation();

  const onPress = () => {
    // @ts-ignore
    navigation.navigate("ActivityStackNav", {
      id: id,
      name: name,
      coverImage: coverImage,
    });
  };

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Container>
        <CoverImage source={{ uri: coverImage }} />
        <Overlay></Overlay>
        <TextContainer>
          <Heading>{name}</Heading>
        </TextContainer>
      </Container>
    </TouchableWithoutFeedback>
  );
}

const Container = styled.View`
  width: 100%;
  height: ${height * 0.2 + "px"};
  position: relative;
`;

const CoverImage = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: 25px;
`;

const Overlay = styled.View`
  background-color: ${colors.bgColor};
  opacity: 0.5;
  width: 100%;
  height: 40%;
  border-bottom-left-radius: 25px;
  border-bottom-right-radius: 25px;
  position: absolute;
  bottom: 0;
`;

const TextContainer = styled.View`
  width: 100%;
  height: 40%;
  border-bottom-left-radius: 25px;
  border-bottom-right-radius: 25px;
  position: absolute;
  bottom: 0;
  padding: 5px 15px;
`;

const Heading = styled(GeneralText)`
  font-family: ${fontFamilies.bold};
`;
