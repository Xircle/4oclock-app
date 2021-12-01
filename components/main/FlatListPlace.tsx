import styled from "styled-components/native";
import React from "react";
import { colors, fontFamilies, GeneralText } from "../../styles/styles";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { TouchableWithoutFeedback } from "react-native";
import { getStartDateFromNow } from "../../lib/utils";

interface Props {
  coverImage?: string;
  name?: string;
  id?: string;
  views?: number;
  description?: string;
  startDateFromNow?: string;
  deadline?: string;
}

export default function FlatListPlace({
  coverImage,
  name,
  id,
  views,
  description,
  startDateFromNow,
  deadline,
}: Props) {
  const navigation = useNavigation();

  const onPress = () => {
    // @ts-ignore
    navigation.navigate("ActivityStackNav", {
      id: id,
      name: name,
      coverImage: coverImage,
    });
  };

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Container>
        <LeftContainer>
          <CoverImage source={{ uri: coverImage }} />
        </LeftContainer>
        <RightContiner>
          <SpaceBetweenContainer>
            <TimeText>{getStartDateFromNow(startDateFromNow)}</TimeText>
            {views ? (
              <ViewContainer>
                <ViewText>
                  <Ionicons name="eye" size={12} color={colors.bareGrey} />
                  {views}
                </ViewText>
              </ViewContainer>
            ) : null}
          </SpaceBetweenContainer>
          <Heading>
            {name.length > 11 ? name.slice(0, 11) + "..." : name}
          </Heading>
          <DescriptionText>
            {description && description.length > 18
              ? description.slice(0, 18) + "..."
              : description}
          </DescriptionText>
          <DeadLineContainer>
            <DeadLineText>{deadline}</DeadLineText>
          </DeadLineContainer>
        </RightContiner>
      </Container>
    </TouchableWithoutFeedback>
  );
}

const DeadLineContainer = styled.View`
  position: absolute;
  bottom: 0;
  right: 0;
`;

const DeadLineText = styled(GeneralText)`
  font-size: 12px;
`;

const ViewContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const ViewText = styled(GeneralText)`
  font-size: 10px;
  color: ${colors.bareGrey};
  margin-left: 3px;
`;

const TimeText = styled(GeneralText)`
  font-size: 12px;
  font-family: ${fontFamilies.regular};
  color: ${colors.midGrey};
`;

const DescriptionText = styled(GeneralText)`
  font-size: 12px;
  font-family: ${fontFamilies.regular};
  color: ${colors.bareGrey};
`;

const SpaceBetweenContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const LeftContainer = styled.View`
  width: 130px;
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

const CoverImage = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: 5px;
`;

const Heading = styled(GeneralText)`
  font-family: ${fontFamilies.medium};
  font-size: 18px;
  margin-top: 3px;
  margin-bottom: 3px;
`;
