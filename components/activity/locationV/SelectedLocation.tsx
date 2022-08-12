import styled from "styled-components/native";
import React from "react";
import { colors, GeneralText } from "../../../styles/styles";

interface Props {
  placeName?: string;
  address?: string;
}

export default function SelectedLocation({ placeName, address }: Props) {
  return (
    <Container>
      <PlaceNameText>{placeName}</PlaceNameText>
      <AddressText>{address}</AddressText>
    </Container>
  );
}

const Container = styled.View`
  width: 100%;
  height: 60px;
  justify-content: center;
`;

const PlaceNameText = styled(GeneralText)`
  margin-left: 20px;
  color: ${colors.vividBlue};
`;

const AddressText = styled(GeneralText)`
  margin-left: 20px;
  color: ${colors.vividBlue};
`;
