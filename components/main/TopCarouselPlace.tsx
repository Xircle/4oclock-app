import styled from "styled-components/native";
import { colors, GeneralText, Text } from "../../styles/styles";
import React from "react";
import { Dimensions } from "react-native";

interface Props {
  coverImageUrl: string;
  width: number;
  height: number;
}

export default function TopCarouselPlace({
  coverImageUrl,
  width,
  height,
}: Props) {
  console.log("tc");
  return (
    <Container>
      <CoverImage
        source={{ uri: coverImageUrl }}
        width={width}
        height={height}
      />
    </Container>
  );
}

const Container = styled.View`
  justify-content: center;
  align-items: center;
`;

const CoverImage = styled.Image<{ width: number; height: number }>`
  width: ${(props) => props.width + "px"};
  height: ${(props) => props.height + "px"};
`;
