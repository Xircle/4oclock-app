import styled from "styled-components/native";
import React from "react";
import { colors } from "../../styles/styles";
import { Dimensions } from "react-native";

interface Props {
  coverImage?: string;
  placeHeading?: string;
  placeLocation?: string;
}

const { height } = Dimensions.get("window");

export default function MidFlatListPlace({ coverImage }: Props) {
  return (
    <Container>
      <CoverImage source={{ uri: coverImage }} />
    </Container>
  );
}

const Container = styled.View`
  width: 100%;
  height: ${height * 0.2 + "px"};
`;

const CoverImage = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: 25px;
`;
