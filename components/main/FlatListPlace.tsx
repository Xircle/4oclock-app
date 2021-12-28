import styled from "styled-components/native";
import React from "react";
import { colors, fontFamilies, GeneralText } from "../../styles/styles";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { TouchableWithoutFeedback } from "react-native";
import { getStartDateFromNow } from "../../lib/utils";
import ReviewButton from "../profile/ReviewButton";
import { openLink } from "../shared/Links";
import optimizeImage from "../../lib/helpers/optimizeImage";

export const enum Purpose {
  main = "main",
  mypage = "mypage",
}

interface Props {
  purpose?: Purpose;
  coverImage?: string;
  name?: string;
  id: string;
  views?: number;
  description?: string;
  startDateFromNow?: string;
  deadline?: string;
  leftParticipantsCount?: string;
}

export default function FlatListPlace({
  coverImage,
  name,
  id,
  views,
  description,
  startDateFromNow,
  deadline,
  leftParticipantsCount,
  purpose = Purpose.main,
}: Props) {
  const navigation = useNavigation();

  const onPress = () => {
    // @ts-ignore
    navigation.navigate("ActivityStackNav", {
      id: id,
      name: name,
    });
  };

  const writeReview = async () => {
    await openLink.LWriteReview("placeId");
  };

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Container>
        <LeftContainer>
          <CoverImage
            source={{
              uri: optimizeImage(coverImage, { width: 130, height: 130 }),
            }}
          />
          {purpose === Purpose.main && (
            <TagContainer isDisabled={startDateFromNow === "마감"}>
              <Tag>
                {startDateFromNow === "마감"
                  ? startDateFromNow
                  : "잔여" + leftParticipantsCount + "석"}
              </Tag>
            </TagContainer>
          )}
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
          {purpose === Purpose.main && (
            <BottomRightFixedContainer>
              <DeadLineText>{deadline}</DeadLineText>
            </BottomRightFixedContainer>
          )}
          {purpose === Purpose.mypage && false && (
            <BottomRightFixedContainer>
              <ReviewButton onPress={writeReview} />
            </BottomRightFixedContainer>
          )}
        </RightContiner>
      </Container>
    </TouchableWithoutFeedback>
  );
}

const TagContainer = styled.View<{ isDisabled: Boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  background-color: ${(props) =>
    props.isDisabled ? colors.bareGrey : colors.mainBlue};
  justify-content: center;
  align-items: center;
  width: 58px;
  height: 22px;
  border-radius: 3px;
`;

const Tag = styled(GeneralText)`
  color: ${colors.bgColor};
  font-size: 11px;
  font-family: ${fontFamilies.bold};
`;

const BottomRightFixedContainer = styled.View`
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
