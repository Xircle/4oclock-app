import styled from "styled-components/native";
import React from "react";
import { colors, fontFamilies, GeneralText } from "../../../styles/styles";
import { TouchableOpacity } from "react-native";

interface Props {
  placeId: string;
  placeName: string;
  addressName: string;
  categoryGroupName: string;
  onPress: () => void;
}

export default function LocationVRow({
  placeName,
  addressName,
  categoryGroupName,
  onPress,
}: Props) {
  return (
    <Container>
      <LeftContainer>
        <TouchableOpacity onPress={onPress}>
          <SelectContainer>
            <SelectText>선택</SelectText>
          </SelectContainer>
        </TouchableOpacity>
      </LeftContainer>
      <RightContainer>
        <InnerContainer>
          <PlaceName>{placeName}</PlaceName>
          <AddressName>{addressName}</AddressName>
        </InnerContainer>
        <InnerContainer>
          <CategoryGroupName>{categoryGroupName}</CategoryGroupName>
        </InnerContainer>
      </RightContainer>
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

const LeftContainer = styled.View`
  width: 60px;
  justify-content: center;
  align-items: center;
`;

const RightContainer = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
`;

const SelectContainer = styled.View`
  padding: 3px;
  border-radius: 3px;
  background-color: ${colors.mainBlue};
`;

const SelectText = styled(GeneralText)`
  color: ${colors.bgColor};
`;
