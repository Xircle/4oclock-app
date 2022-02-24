import styled from "styled-components/native";
import React from "react";
import { colors, fontFamilies, GeneralText } from "../../styles/styles";
import { useNavigation } from "@react-navigation/native";
import { TouchableWithoutFeedback } from "react-native";
import { Participants } from "../../lib/api/types";
import PureCoverImage from "./PureCoverImage";
import PureLeftTagMainFlat from "./PureLeftTagMainFlat";
import PureInfoMainFlat from "./PureInfoMainFlat";
import PureAvatarsFlat from "./PureAvatarsFlat";

export const enum Purpose {
  main = "main",
  mypage = "mypage",
}

interface Props {
  coverImage?: string;
  name?: string;
  id: string;
  views?: number;
  description?: string;
  startDateFromNow?: string;
  deadline?: string;
  leftParticipantsCount?: number;
  participants?: Participants[];
  isClosed?: boolean;
}

function MainFlatListPlace({
  coverImage,
  name,
  id,
  description,
  startDateFromNow,
  deadline,
  leftParticipantsCount,
  participants,
  isClosed,
}: Props) {
  const navigation = useNavigation();

  const onPress = () => {
    // @ts-ignore
    navigation.navigate("ActivityStackNav", {
      id: id,
      name: name,
      participants: participants,
    });
  };

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Container>
        <LeftContainer>
          <PureCoverImage source={coverImage} />
          <PureLeftTagMainFlat
            isClosed={isClosed}
            leftParticipantsCount={leftParticipantsCount}
          />
        </LeftContainer>
        <RightContiner>
          <SpaceBetweenContainer>
            <TimeText>{startDateFromNow || " "}</TimeText>
          </SpaceBetweenContainer>
          <PureInfoMainFlat name={name} description={description} />
          <PureAvatarsFlat
            participants={participants}
            length={participants?.length}
          />
          {!isClosed && leftParticipantsCount > 0 && deadline && (
            <BottomRightFixedContainer>
              <DeadLineText>{deadline}</DeadLineText>
            </BottomRightFixedContainer>
          )}
        </RightContiner>
      </Container>
    </TouchableWithoutFeedback>
  );
}

export default MainFlatListPlace;



const BottomRightFixedContainer = styled.View`
  position: absolute;
  bottom: 0;
  right: 0;
`;

const DeadLineText = styled(GeneralText)`
  font-size: 12px;
`;

const TimeText = styled(GeneralText)`
  font-size: 12px;
  font-family: ${fontFamilies.regular};
  color: ${colors.midGrey};
`;

const SpaceBetweenContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const LeftContainer = styled.View`
  width: 130px;
  position: relative;
`;

const RightContiner = styled.View`
  flex: 1;
  padding-left: 20px;
  position: relative;
`;

const Container = styled.View`
  width: 100%;
  height: 170px;
  position: relative;
  flex-direction: row;
  padding-top: 20px;
  padding-bottom: 20px;
  border-bottom-width: 0.2px;
  border-bottom-color: ${colors.bareGrey};
`;
