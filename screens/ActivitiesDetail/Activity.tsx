import styled from "styled-components/native";
import React, { useEffect, useState } from "react";
import { colors, fontFamilies, GeneralText } from "../../styles/styles";
import { Alert, Dimensions, TouchableOpacity, View } from "react-native";
import optimizeImage from "../../lib/helpers/optimizeImage";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "react-query";
import { PlaceData } from "../../lib/api/types.d";
import { getPlaceById } from "../../lib/api/getPlaceById";
import MainButtonWBg from "../../components/UI/MainButtonWBg";
import Swiper from "react-native-swiper";
import { LinearGradient } from "expo-linear-gradient";
import { CompareTimeReg, getStartDateFromNow } from "../../lib/utils";
import MyBottomModal from "../../components/UI/MyBottomModal";
import { openLink } from "../../components/shared/Links";
import MyModal from "../../components/UI/MyModal";

interface Props {
  id: string;
  name: string;
  modal: boolean;
  setModal: () => void;
}

const { width, height } = Dimensions.get("window");

export default function Activity({ id, name, modal, setModal }: Props) {
  const navigation = useNavigation();
  const [Images, setImages] = useState([]);
  const [alert, setAlert] = useState(undefined);

  // api
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

  const onPressMain = () => {
    if (
      activityData.placeType === "Regular-meeting" &&
      CompareTimeReg(activityData.startDateAt)
    ) {
      if (alert === undefined) {
        setAlert(true);
        return;
      }
    }
    // @ts-ignore
    navigation.navigate("Reservation", {
      detailAddress: activityData?.placeDetail.detailAddress,
      participationFee: activityData?.placeDetail.participationFee,
      startDateFromNow: activityData?.startDateFromNow,
      startTime: activityData?.startDateAt,
      placeId: id,
    });
  };

  const onPressAlert = () => {
    setAlert(false);
    // @ts-ignore
    navigation.navigate("Reservation", {
      detailAddress: activityData?.placeDetail.detailAddress,
      participationFee: activityData?.placeDetail.participationFee,
      startDateFromNow: activityData?.startDateFromNow,
      startTime: activityData?.startDateAt,
      placeId: id,
    });
  };

  const reportCTA = async () => {
    await openLink.LOpenKakaoChat();
  };

  useEffect(() => {
    if (activityData) {
      setImages(
        Array(activityData?.coverImage).concat(activityData?.subImages)
      );
    }
  }, [activityData]);
  return (
    <Container>
      <MyModal visible={alert === true} onClose={() => setAlert(false)}>
        <AlertWrapper>
          <AlertHeading>현재는 해당 팀 크루원들만 참여가능합니다.</AlertHeading>
          <CenterView>
            <AlertInfoText>
              다른 팀 크루원들은 모임 일{"\n"}하루 전부터 참여가능!
            </AlertInfoText>
          </CenterView>

          <CenterView>
            <AlertCTAButton onPress={onPressAlert}>
              <AlertCTAButtonText>해당 팀원입니다</AlertCTAButtonText>
            </AlertCTAButton>
          </CenterView>
        </AlertWrapper>
      </MyModal>
      <MyBottomModal onClose={() => {}} visible={modal} setModal={setModal}>
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
                              height: height,
                            }),
                          }}
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
          <InnerHeading>{name}</InnerHeading>
          <Title>{activityData?.oneLineIntroText}</Title>
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
          <UsernameContainer>
            {activityData?.participantsData.participantsUsername?.map(
              (item, index) => (
                <InnerSubText key={index}>{item}</InnerSubText>
              )
            )}
          </UsernameContainer>
        </InnerWrapper>
        <InnerWrapper upperDividor={true}>
          <InnerHeadingBlue>자세한 정보를 알려줄게</InnerHeadingBlue>
          <InfoContainer>
            <InfoWrapper>
              <Ionicons name="alarm-outline" size={32} color={colors.midGrey} />
              <InnerSubText>
                {activityData?.startDateFromNow
                  ? getStartDateFromNow(activityData.startDateFromNow)
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
                최대 {activityData?.placeDetail.maxParticipantsNumber} 명(호스트
                포함)
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
      <MainButtonWBg
        title={
          activityData?.isClosed ||
          activityData?.participantsData?.leftParticipantsCount === 0
            ? "마감된 모임입니다"
            : activityData?.isParticipating
            ? "이미 신청한 모임입니다"
            : "나도 놀러갈래! 😚"
        }
        onPress={onPressMain}
        disabled={
          activityData?.isParticipating ||
          activityData?.isClosed ||
          activityData?.participantsData?.leftParticipantsCount === 0
        }
      />
    </Container>
  );
}

const AlertWrapper = styled.View`
  flex: 1;
`;

const AlertHeading = styled(GeneralText)`
  font-size: 23px;
  line-height: 40px;
  padding: 0px 15px;
  text-align: center;
  margin-top: 10px;
`;

const AlertInfoText = styled(GeneralText)`
  color: ${colors.lightBlack};
  font-size: 14px;
  line-height: 26px;
  margin-top: 22px;
  text-align: center;
`;

const CenterView = styled.View`
  justify-content: center;
  align-items: center;
`;

const AlertCTAButton = styled.TouchableOpacity`
  width: 200px;
  height: 70px;
  background-color: ${colors.mainBlue};
  border-radius: 5px;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
`;

const AlertCTAButtonText = styled(GeneralText)`
  font-size: 20px;
  color: ${colors.bgColor};
  font-family: ${fontFamilies.bold};
`;

const ModalButton = styled.TouchableOpacity`
  width: 90%;
  height: 70px;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
`;

const ModalButtonText = styled(GeneralText)`
  font-size: 22px;
  color: ${colors.bgColor};
  font-family: ${fontFamilies.bold};
`;

const ModalCloseButton = styled(ModalButton)`
  background-color: ${colors.bareGrey};
`;

const ModalReportButton = styled(ModalButton)`
  background-color: ${colors.warningRed};
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

const ActivityImage = styled.Image`
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

const InfoContainer = styled.View`
  margin-top: 22px;
`;

const InfoWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  margin: 5px;
`;
