import styled from "styled-components/native";
import { colors, fontFamilies, GeneralText, Text } from "../../styles/styles";
import React from "react";

import { LinearGradient } from "expo-linear-gradient";

interface Props {
  coverImageUrl: string;
  width: number;
  height: number;
  key: number;
  name: string;
}

export default function TopCarouselPlace({
  coverImageUrl,
  width,
  height,
  name,
}: Props) {
  return (
    <Container>
      <CoverImage
        source={{ uri: coverImageUrl }}
        width={width}
        height={height}
      />
      <LinearGradient
        // Background Linear Gradient
        colors={["transparent", colors.black]}
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          borderRadius: 15,
        }}
      />
      <TextContainer>
        <NameText>{name}</NameText>
      </TextContainer>
    </Container>
  );
}

const TextContainer = styled.View`
  position: absolute;
  left: 20px;
  bottom: 20px;
`;

const NameText = styled(GeneralText)`
  color: ${colors.bgColor};
  font-family: ${fontFamilies.bold};
  font-size: 20px;
`;

const Container = styled.View`
  justify-content: center;
  align-items: center;
  position: relative;
`;

const CoverImage = styled.Image<{ width: number; height: number }>`
  width: ${(props) => props.width + "px"};
  height: ${(props) => props.height + "px"};
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
`;
