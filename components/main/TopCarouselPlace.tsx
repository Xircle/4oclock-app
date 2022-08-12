import styled from "styled-components/native";
import { colors, fontFamilies, GeneralText, Text } from "../../styles/styles";
import React from "react";

import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { TouchableWithoutFeedback } from "react-native";
import optimizeImage from "../../lib/helpers/optimizeImage";
import FastImage from "react-native-fast-image";

interface Props {
  coverImageUrl: string;
  width: number;
  height: number;
  key: number;
  name: string;
  id: string;
  leftParticipantsCount: number;
  startDateFromNow: string;
  detailAddress: string;
}

export default function TopCarouselPlace({
  coverImageUrl,
  width,
  height,
  name,
  id,
  leftParticipantsCount,
  startDateFromNow,
  detailAddress,
}: Props) {
  const navigation = useNavigation();
  const onPress = () => {
    // @ts-ignore
    navigation.navigate("ActivityStackNav", {
      id: id,
      name: name,
    });
  };

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Container>
        <CoverImage
          source={{
            uri: optimizeImage(coverImageUrl, { width: width, height: height }),
          }}
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
          <TagContainer isDisabled={startDateFromNow === "마감"}>
            <Tag>
              {startDateFromNow === "마감"
                ? startDateFromNow
                : "잔여 " + leftParticipantsCount + "석"}
            </Tag>
          </TagContainer>

          <NameText>{name}</NameText>
          <SubText>
            {startDateFromNow === "마감"
              ? startDateFromNow
              : startDateFromNow + " 시"}
          </SubText>
          <SubText>{detailAddress}</SubText>
        </TextContainer>
      </Container>
    </TouchableWithoutFeedback>
  );
}
const TagContainer = styled.View<{ isDisabled: Boolean }>`
  background-color: ${(props) =>
    props.isDisabled ? colors.bareGrey : colors.vividBlue};
  justify-content: center;
  align-items: center;
  width: 58px;
  height: 22px;
  border-radius: 3px;
  margin-left: 5px;
  margin-bottom: 5px;
`;

const Tag = styled(GeneralText)`
  color: ${colors.white};
  font-size: 11px;
  font-family: ${fontFamilies.bold};
`;

const SubText = styled(GeneralText)`
  color: ${colors.white};
  font-size: 13px;
  margin-left: 5px;
  font-family: ${fontFamilies.bold};
  line-height: 19px;
`;

const TextContainer = styled.View`
  position: absolute;
  left: 20px;
  bottom: 20px;
`;

const NameText = styled(GeneralText)`
  color: ${colors.white};
  font-family: ${fontFamilies.bold};
  font-size: 20px;
`;

const Container = styled.View`
  justify-content: center;
  align-items: center;
  position: relative;
`;

const CoverImage = styled(FastImage)<{ width: number; height: number }>`
  width: ${(props) => props.width + "px"};
  height: ${(props) => props.height + "px"};
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
`;
