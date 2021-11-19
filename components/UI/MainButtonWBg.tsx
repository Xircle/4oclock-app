import styled from "styled-components/native";
import React from "react";
import { colors, XLButton, XLButtonText } from "../../styles/styles";
import { Dimensions } from "react-native";


interface Props {
  color?: string;
}

const { width } = Dimensions.get("window");

export default function MainButtonWBg(props: Props) {
  return (
    <Container>
      <XLButton>
        <XLButtonText>수정하기</XLButtonText>
      </XLButton>
    </Container>
  );
}

const Container = styled.View`
  background-color: ${colors.bgColor};
  padding: ${width * 0.05 + "px"};
  position: absolute;
  left: 0;
  bottom: 0;
`;
