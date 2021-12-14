import styled from "styled-components/native";
import React from "react";
import { colors, fontFamilies, GeneralText } from "../../../styles/styles";

interface Props {
  placeId: number;
  placeName: string;
  addressName: string;
  categoryGroupName: string;
}

export default function LocationVRow(props: Props) {
  return (
    <Container>
      <LeftContainer></LeftContainer>
      <RightContainer>
        <RightInnerContainer>
          <PlaceName>고려대학교 서울캠퍼스</PlaceName>
          <AddressName>서울 성북구 안암동5가 1-2</AddressName>
        </RightInnerContainer>
        <RightInnerContainer>
          <CategoryGroupName>학교</CategoryGroupName>
        </RightInnerContainer>
      </RightContainer>
    </Container>
  );
}

const Container = styled.View`
  width: 100%;
  height: 50px;
  border-bottom-width: 1px;
  flex-direction: row;
  padding: 3px;
`;

const LeftContainer = styled.View`
  border: 1px solid #258184;
  height: 100%;

  width: 40px;
`;

const MiddleContainer = styled.View`
  height: 100%;
`;

const RightContainer = styled.View`
  height: 100%;
  justify-content: space-between;
  flex-direction: row;
  flex: 1;
  padding: 0 3px;
`;

const RightInnerContainer = styled.View``;
const PlaceName = styled(GeneralText)`
  font-family: ${fontFamilies.medium};
`;

const AddressName = styled(GeneralText)`
  font-size: 11px;
  color: ${colors.bareGrey};
`;

const CategoryGroupName = styled(GeneralText)``;

const SelectButton = styled.View``;
