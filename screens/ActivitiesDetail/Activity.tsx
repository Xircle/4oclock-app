import styled from "styled-components/native";
import React from "react";
import { GeneralText } from "../../styles/styles";
import { Dimensions } from "react-native";
import optimizeImage from "../../lib/helpers/optimizeImage";

interface Props {
  coverImage: string;
  id: string;
  name: string;
}

const { width, height } = Dimensions.get("window");

export default function Activity({ coverImage, id, name }: Props) {
  console.log(coverImage);
  console.log(id);
  console.log(name);
  return (
    <Container>
      <CoverImage source={{ uri: optimizeImage(coverImage) }} />
      <ScrollView></ScrollView>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
`;

const CoverImage = styled.Image`
  width: ${width + "px"};
  height: ${height * 0.25 + "px"};
`;

const InnerWrapper = styled.View``;

const ScrollView = styled.ScrollView`
  flex: 1;
`;
