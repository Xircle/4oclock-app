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
  description?: string;
  startDateFromNow?: string;
  leftParticipantsCount?: number;
  participants?: Participants[];
  isClosed?: boolean;
  recommendation?: string;
}

function MainFlatListPlace({
  coverImage,
  name,
  id,
  description,
  startDateFromNow,
  leftParticipantsCount,
  participants,
  isClosed,
  recommendation,
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
          <TimeText>{startDateFromNow || " "}</TimeText>
          <PureInfoMainFlat
            name={name}
            description={description}
            recommendation={recommendation}
          />
          <PureAvatarsFlat
            participants={participants}
            length={participants?.length}
          />
        </RightContiner>
      </Container>
    </TouchableWithoutFeedback>
  );
}

export default React.memo(MainFlatListPlace);

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
  height: 130px;
  position: relative;
`;

const RightContiner = styled.View`
  flex: 1;
  padding-left: 20px;
  position: relative;
`;

const Container = styled.View`
  width: 100%;
  min-height: 170px;
  position: relative;
  flex-direction: row;
  padding-top: 20px;
  padding-bottom: 20px;
  border-bottom-width: 0.2px;
  border-bottom-color: ${colors.bareGrey};
`;
