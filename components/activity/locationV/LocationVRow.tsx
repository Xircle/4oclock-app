import styled from "styled-components/native";
import React from "react";
import { colors, fontFamilies, GeneralText } from "../../../styles/styles";

interface Props {
  placeId: string;
  placeName: string;
  addressName: string;
  categoryGroupName: string;
}

export default function LocationVRow({
  placeId,
  placeName,
  addressName,
  categoryGroupName,
}: Props) {
  return (

      <Container>
        <InnerContainer>
          <PlaceName>{placeName}</PlaceName>
          <AddressName>{addressName}</AddressName>
        </InnerContainer>
        <InnerContainer>
          <CategoryGroupName>{categoryGroupName}</CategoryGroupName>
        </InnerContainer>
      </Container>

  );
}

const Container = styled.View`
  width: 100%;
  height: 50px;
  border-bottom-width: 1px;
  flex-direction: row;
  justify-content: space-between;
  padding: 3px;
`;

const InnerContainer = styled.View``;
const PlaceName = styled(GeneralText)`
  font-family: ${fontFamilies.medium};
`;

const AddressName = styled(GeneralText)`
  font-size: 11px;
  color: ${colors.bareGrey};
`;

const CategoryGroupName = styled(GeneralText)``;

const SelectButton = styled.View``;
