import styled from "styled-components/native";
import React, { useEffect } from "react";
import {
  colors,
  fontFamilies,
  GeneralText,
  InfoText,
} from "../../styles/styles";
import { Alert, Dimensions, Image, TouchableOpacity, View } from "react-native";
import optimizeImage from "../../lib/helpers/optimizeImage";
import { useNavigation } from "@react-navigation/native";
import MyBackButton from "../../components/UI/MyBackButton";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "react-query";
import { PlaceData } from "../../lib/api/types.d";
import { getPlaceById } from "../../lib/api/getPlaceById";
import MainButtonWBg from "../../components/UI/MainButtonWBg";
import { TimeNumberToString } from "../../lib/utils";

interface Props {
  coverImage: string;
  id: string;
  name: string;
}

const { width, height } = Dimensions.get("window");

export default function Activity({ coverImage, id, name }: Props) {
  const navigation = useNavigation();

  const { data: activityData, isLoading } = useQuery<PlaceData | undefined>(
    ["place-detail", id],
    () => getPlaceById(id),
    {
      onError: (err: any) => {
        Alert.alert(err);
        return;
      },
      retry: 1,
      refetchOnWindowFocus: false,
    }
  );

  const onPress = () => {};

  useEffect(() => {
    console.log(activityData);
  }, [activityData]);

  return (
    <Container>
      <ScrollView>
        <CoverImage source={{ uri: optimizeImage(coverImage) }} />
        <InnerWrapper>
          <InnerHeading>{name}</InnerHeading>
          <Title>{activityData?.oneLineIntroText}</Title>
          <Description>{activityData?.placeDetail?.description}</Description>
        </InnerWrapper>
        <InnerWrapper upperDividor={true}>
          <InnerHeading>
            참여 크루원 {activityData?.participantsCount} 명
          </InnerHeading>
          <UsernameContainer>
            {activityData?.participantsUsername?.map((item, index) => (
              <InnerSubText key={index}>{item}</InnerSubText>
            ))}
          </UsernameContainer>
        </InnerWrapper>
        <InnerWrapper upperDividor={true}>
          <InnerHeading>자세한 정보를 알려줄게</InnerHeading>
          <InfoContainer>
            <InfoWrapper>
              <Ionicons name="alarm-outline" size={32} color={colors.midGrey} />
              <InnerSubText>
                {activityData?.startDateFromNow}{" "}
                {activityData &&
                  TimeNumberToString(activityData.startTime, {
                    hasIndicator: true,
                  })}
              </InnerSubText>
            </InfoWrapper>
            <InfoWrapper>
              <Ionicons
                name="location-outline"
                size={32}
                color={colors.midGrey}
              />
              <InnerSubText>
                {activityData?.placeDetail.detailAddress}
              </InnerSubText>
            </InfoWrapper>
            <InfoWrapper>
              <Ionicons
                name="person-outline"
                size={32}
                color={colors.midGrey}
              />
              <InnerSubText>
                최대 {activityData?.placeDetail.maxParticipantsNumber} 명
              </InnerSubText>
            </InfoWrapper>
            <InfoWrapper>
              <Ionicons name="cash-outline" size={32} color={colors.midGrey} />
              <InnerSubText>
                참가비 {activityData?.placeDetail.participationFee}원
              </InnerSubText>
            </InfoWrapper>
          </InfoContainer>
        </InnerWrapper>
        <View style={{ height: 200 }} />
      </ScrollView>
      <MainButtonWBg title="나도 놀러갈래!" onPress={onPress} />
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  position: relative;
  background-color: ${colors.bgColor};
`;

const CoverImage = styled.Image`
  width: ${width + "px"};
  height: ${height * 0.3 + "px"};
`;

const InnerWrapper = styled.View<{ upperDividor?: boolean }>`
  margin: 22px 0;
  padding: 18px;
  border-top-width: ${(props) => (props.upperDividor ? ".3px" : "0px")};
  border-color: ${colors.bareGrey};
`;

const ScrollView = styled.ScrollView`
  flex: 1;
`;

const InnerHeading = styled(GeneralText)`
  font-family: ${fontFamilies.medium};
  font-size: 22px;
`;

const Title = styled(GeneralText)`
  margin-top: 15px;
  font-size: 14px;
  font-family: ${fontFamilies.regular};
  color: ${colors.midGrey};
`;

const Description = styled(GeneralText)`
  margin-top: 11px;
  font-size: 13px;
  font-family: ${fontFamilies.light};
  color: ${colors.midGrey};
`;

const SubImage = styled.Image`
  width: 100%;
  height: 100%;
`;

const UsernameContainer = styled.View`
  flex-wrap: wrap;
  justify-content: flex-start;
  flex-direction: row;
  margin-top: 22px;
`;

const InnerSubText = styled(GeneralText)`
  color: ${colors.midGrey};
  margin-right: 11px;
  font-family: ${fontFamilies.medium};
  margin-left: 22px;
`;

const InfoContainer = styled.View`
  margin-top: 22px;
`;

const InfoWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  margin: 5px;
`;
