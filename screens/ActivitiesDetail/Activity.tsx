import styled from "styled-components/native";
import React, { useEffect, useState } from "react";
import {
  colors,
  fontFamilies,
  GeneralText,
  ModalBlueButton,
  ModalButtonText,
  ModalCloseButton,
  ModalReportButton,
} from "../../styles/styles";
import { Alert, Dimensions, TouchableOpacity, View } from "react-native";
import optimizeImage from "../../lib/helpers/optimizeImage";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "react-query";
import { Participants, PlaceData, UserData } from "../../lib/api/types.d";
import { getPlaceById } from "../../lib/api/getPlaceById";
import AbsoluteMainButtonWBg from "../../components/UI/AbsoluteMainButtonWBg";
import Swiper from "react-native-swiper";
import { LinearGradient } from "expo-linear-gradient";
import MyBottomModal from "../../components/UI/MyBottomModal";
import { openLink } from "../../components/shared/Links";
import AvatarUri from "../../components/UI/AvatarUri";
import FastImage from "react-native-fast-image";
import storage from "../../lib/helpers/myAsyncStorage";
import { getUser } from "../../lib/api/getUser";
import { displayMeetingTime } from "../../lib/utils";

interface Props {
  id: string;
  name: string;
  modal: boolean;
  setModal: () => void;
  participants: Participants[];
}

const { width, height } = Dimensions.get("window");

export default function Activity({
  id,
  name,
  modal,
  setModal,
  participants,
}: Props) {
  const navigation = useNavigation();
  const [Images, setImages] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const setAccountType = async () => {
    const accountType = await storage.getItem("accountType");
    if (accountType === "Admin") setIsAdmin(true);
  };
  // api
  const {
    data: activityData,
    isLoading,
    refetch,
  } = useQuery<PlaceData | undefined>(
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
  const { data: userData } = useQuery<UserData | undefined>(
    ["userProfile"],
    () => getUser(),
    {
      retry: 1,
    }
  );

  const onPress = async (): Promise<void> => {
    if (!userData?.isYkClub) {
      Alert.alert("활동 코드를 입력해주세요", "", [
        {
          text: "활동코드 입력하기",
          //@ts-ignore
          onPress: () => navigation.navigate("정기"),
        },
        {
          text: "닫기",
          onPress: () => {},
        },
      ]);
      return;
    }

    // @ts-ignore
    navigation.navigate("ReservationInstruction", {
      detailAddress: activityData?.placeDetail.detailAddress,
      participationFee: activityData?.placeDetail.participationFee,
      startDateFromNow: activityData?.startDateFromNow,
      startTime: activityData?.startDateAt,
      placeId: id,
      placeType: activityData?.placeType,
      kakaoLink: activityData.placeDetail.kakaoLink,
      qAndA: activityData?.qAndA,
    });
  };

  const reportCTA = async () => {
    await openLink.LOpenKakaoChat();
  };

  useEffect(() => {
    if (activityData) {
      //console.log(activityData);
      setImages(
        Array(activityData?.coverImage).concat(activityData?.subImages)
      );
    }
  }, [activityData]);

  useEffect(() => {
    refetch();
    setAccountType();
    console.log("UE Activity");
  }, []);
  return (
    <Container>
      <MyBottomModal
        onClose={() => {}}
        visible={modal}
        setModal={setModal}
        height={280}
      >
        {isAdmin ? (
          <ModalBlueButton
            onPress={() =>
              openLink.LOpenLink(activityData.placeDetail.kakaoLink)
            }
          >
            <ModalButtonText>운영진 - 오픈 채팅방 넘어가기</ModalButtonText>
          </ModalBlueButton>
        ) : (
          <ModalReportButton onPress={reportCTA}>
            <ModalButtonText>작성자 차단하기</ModalButtonText>
          </ModalReportButton>
        )}
        <ModalReportButton onPress={reportCTA}>
          <ModalButtonText>작성자 신고하기</ModalButtonText>
        </ModalReportButton>
        <ModalReportButton onPress={reportCTA}>
          <ModalButtonText>게시글 신고하기</ModalButtonText>
        </ModalReportButton>
        <ModalCloseButton onPress={setModal}>
          <ModalButtonText>닫기</ModalButtonText>
        </ModalCloseButton>
      </MyBottomModal>
      <ScrollView showsVerticalScrollIndicator={false}>
        <CarouselContainer>
          {activityData && (
            <Swiper
              loop
              horizontal
              autoplay
              autoplayTimeout={3.5}
              containerStyle={{ width: "100%", height: "100%" }}
              showsButtons={false}
              showsPagination={true}
              dot={
                <View
                  style={{
                    backgroundColor: "rgba(255,255,255,.3)",
                    width: 20,
                    height: 3,
                    marginLeft: 7,
                    marginRight: 7,
                    borderRadius: 1.5,
                  }}
                />
              }
              activeDot={
                <View
                  style={{
                    backgroundColor: "#fff",
                    width: 20,
                    height: 3,
                    marginLeft: 7,
                    marginRight: 7,
                    borderRadius: 1.5,
                  }}
                />
              }
              paginationStyle={{
                bottom: 18,
              }}
            >
              {Images ? (
                Images.map((imageUrl, index) => {
                  if (imageUrl) {
                    return (
                      <ActivityImageContainer key={index}>
                        <ActivityImage
                          source={{
                            uri: optimizeImage(imageUrl, {
                              width: width,
                              height: 100,
                            }),
                          }}
                        />
                      </ActivityImageContainer>
                    );
                  }
                })
              ) : (
                <ActivityImageContainer>
                  <ActivityImage
                    source={{ uri: optimizeImage(activityData?.coverImage) }}
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
                    }}
                  />
                </ActivityImageContainer>
              )}
            </Swiper>
          )}
        </CarouselContainer>

        <InnerWrapper>
          {activityData?.recommendation && (
            <RecommendationText>
              {activityData?.recommendation}
            </RecommendationText>
          )}
          <InnerHeading>{name}</InnerHeading>
          <Description>{activityData?.placeDetail?.description}</Description>
        </InnerWrapper>
        <InnerWrapper upperDividor={true}>
          <InnerHeadingBlue>
            참여 크루원{" "}
            {activityData?.participantsData.participantsCount
              ? activityData?.participantsData.participantsCount
              : "0"}{" "}
            명
          </InnerHeadingBlue>
          {activityData?.participantsData?.maleCount !== undefined &&
          activityData?.participantsData?.femaleCount !== undefined ? (
            <GenderText>
              남:{"  "}
              {activityData?.participantsData?.maleCount}
              {"    "}여:{"  "}
              {activityData?.participantsData?.femaleCount}
            </GenderText>
          ) : null}

          <UsernameContainer>
            {activityData?.participants?.map((item, index) => {
              if (item.profileImgUrl) {
                return (
                  <AvatarWrapper key={item.userId}>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate(
                          //@ts-ignore
                          "ParticipantsList",
                          {
                            placeName: activityData.name,
                            participantsData: activityData.participantsData,
                            participants: activityData.participants,
                            isCreator:
                              activityData.creator_id === userData.fk_user_id,
                            placeId: id,
                          }
                        )
                      }
                    >
                      <AvatarUri
                        source={item.profileImgUrl}
                        size={45}
                        quality={10}
                        isSmall
                      />
                    </TouchableOpacity>
                  </AvatarWrapper>
                );
              } else {
                null;
              }
            })}
          </UsernameContainer>
        </InnerWrapper>
        <InnerWrapper upperDividor={true}>
          <InnerHeadingBlue>자세한 정보를 알려줄게</InnerHeadingBlue>
          <InfoContainer>
            <InfoWrapper>
              <Ionicons name="alarm-outline" size={32} color={colors.midGrey} />
              <InnerSubText>
                {activityData?.startDateAt
                  ? displayMeetingTime(activityData?.startDateAt)
                  : ""}
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
                참가비 {activityData?.placeDetail.participationFee} 원
              </InnerSubText>
            </InfoWrapper>
          </InfoContainer>
        </InnerWrapper>
        <View style={{ height: 200 }} />
      </ScrollView>
      <AbsoluteMainButtonWBg
        title={
          activityData?.isParticipating
            ? "오픈 채팅방 넘어가기"
            : activityData?.isClosed ||
              activityData?.participantsData?.leftParticipantsCount === 0
            ? "마감된 모임입니다"
            : "나도 놀러갈래! 😚"
        }
        onPress={
          activityData?.isParticipating
            ? () => openLink.LOpenLink(activityData.placeDetail.kakaoLink)
            : onPress
        }
        disabled={
          !activityData?.isParticipating &&
          (activityData?.isClosed ||
            activityData?.participantsData?.leftParticipantsCount === 0)
        }
      />
    </Container>
  );
}

const RecommendationText = styled(GeneralText)`
  font-size: 12px;
  font-family: ${fontFamilies.bold};
  color: ${colors.mainBlue};
`;

const AvatarWrapper = styled.View`
  margin-right: 4px;
  margin-bottom: 4px;
`;

const Container = styled.View`
  flex: 1;
  position: relative;
  background-color: ${colors.bgColor};
`;

const ActivityImageContainer = styled.View`
  width: 100%;
  height: 100%;
`;

const ActivityImage = styled(FastImage)`
  width: 100%;
  height: 100%;
`;

const CarouselContainer = styled.View`
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

const InnerHeadingBlue = styled(InnerHeading)`
  color: ${colors.mainBlue};
`;

const Description = styled(GeneralText)`
  margin-top: 18px;
  font-size: 13px;
  font-family: ${fontFamilies.light};
  color: ${colors.midGrey};
  line-height: 21px;
`;

const UsernameContainer = styled.View`
  flex-wrap: wrap;
  justify-content: flex-start;
  flex-direction: row;
  margin-top: 22px;
`;

const InnerSubText = styled(GeneralText)`
  color: ${colors.midGrey};
  font-family: ${fontFamilies.medium};
  margin-left: 22px;
`;

const GenderText = styled(InnerSubText)`
  margin-left: 0;
  margin-top: 15px;
  font-size: 18px;
`;

const InfoContainer = styled.View`
  margin-top: 22px;
`;

const InfoWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  margin: 5px;
`;
