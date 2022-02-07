import styled from "styled-components/native";
import React, { useState } from "react";
import {
  TextArea,
  colors,
  fontFamilies,
  GeneralText,
} from "../../styles/styles";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Alert, TouchableWithoutFeedback } from "react-native";
import { getStartDateFromNow } from "../../lib/utils";
import ReviewButton from "../profile/ReviewButton";
import { openLink } from "../shared/Links";
import optimizeImage from "../../lib/helpers/optimizeImage";
import { Participants } from "../../lib/api/types";
import AvatarUri from "../UI/AvatarUri";
import FastImage from "react-native-fast-image";
import MyBottomModal from "../UI/MyBottomModal";
import { useMutation } from "react-query";
import { cancelReservation } from "../../lib/api/cancelReservation";

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
  leftParticipantsCount?: number;
  participants?: Participants[];
  refetch?: () => {};
  isRefetch?: boolean;
  kakaoPlaceId?: string;
  isClosed?: boolean;
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
  refetch,
  isRefetch,
  participants,
  kakaoPlaceId,
  isClosed,
}: Props) {
  const navigation = useNavigation();
  const [cancelModal, setCancelModal] = useState(false);
  const [cancelReason, setCancelReason] = useState("");

  const { mutateAsync: mutateCancelReservation } = useMutation(
    cancelReservation
  );

  const onPress = () => {
    // @ts-ignore
    navigation.navigate("ActivityStackNav", {
      id: id,
      name: name,
      participants: participants,
    });
  };

  const CancelReservation = async () => {
    if (!id) return;
    const { data } = await mutateCancelReservation({
      placeId: id,
      cancelReason: "기타",
      detailReason: cancelReason,
    });
    if (!data.ok) {
      throw new Error(data.error);
    }
    Alert.alert("예약이 취소되었습니다");
    setCancelModal(false);
    if (isRefetch) {
      refetch();
    }
  };

  const writeReview = async (kid: string) => {
    await openLink.LWriteReview(kid);
  };

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Container>
        {purpose === Purpose.mypage && <MyBottomModal
          onClose={() => {}}
          visible={cancelModal}
          setModal={() => setCancelModal(false)}
          height={startDateFromNow?.startsWith("오늘") ? 300 : 500}
        >
          {startDateFromNow?.startsWith("오늘") ? (
            <ModalWrapper>
              <ModalHeading>모임 당일에는 취소가 불가능합니다</ModalHeading>
              <ModalInstruction>
                다른 크루분들을 위해 모임 당일 취소를 불가하는 방침을 가지고
                있습니다.{"\n"}불가피한 상황일 경우에만 (ex.코로나) 운영진께
                문의 부탁드립니다.
              </ModalInstruction>
              <ModalCloseButton onPress={() => setCancelModal(false)}>
                <ModalCloseButtonText>닫기</ModalCloseButtonText>
              </ModalCloseButton>
            </ModalWrapper>
          ) : (
            <ModalWrapper>
              <ModalHeading>{name}</ModalHeading>
              <CancelReservationContainer showsVerticalScrollIndicator={false}>
                <CancelSubHeading>사유</CancelSubHeading>
                <STextArea
                  placeholder="친구들과 함께 놀러갈 곳 이름을 적어줘!"
                  autoCapitalize="none"
                  multiline={true}
                  autoCorrect={false}
                  defaultValue={""}
                  onChange={(event) => {
                    const { eventCount, target, text } = event.nativeEvent;
                    setCancelReason(text);
                  }}
                />
              </CancelReservationContainer>
              <ModalCloseButton onPress={CancelReservation}>
                <ModalCloseButtonText>취소하기</ModalCloseButtonText>
              </ModalCloseButton>
            </ModalWrapper>
          )}
        </MyBottomModal>}
        
        <LeftContainer>
          <CoverImage
            source={{
              uri: optimizeImage(coverImage, { width: 130, height: 130 }),
              priority: FastImage.priority.high,
            }}
          />
          {purpose === Purpose.main &&
          !isClosed &&
          leftParticipantsCount > 0 ? (
            <TagContainer>
              <Tag>잔여{leftParticipantsCount}석</Tag>
            </TagContainer>
          ) : (
            (purpose === Purpose.main || isClosed) && (
              <LeftContainerOverlay>
                <ClosedText>마 감</ClosedText>
              </LeftContainerOverlay>
            )
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
          <AvatarContainer>
            {participants?.map((item, index) => {
              if (index < 4) {
                return (
                  <AvartarWrapper key={item.userId}>
                    <AvatarUri source={item.profileImgUrl} size={38} isSmall />
                  </AvartarWrapper>
                );
              }
            })}
            {participants?.length > 4 ? (
              <AvatarNumText>+ {participants.length - 4}</AvatarNumText>
            ) : null}
          </AvatarContainer>
          {purpose === Purpose.main && !isClosed && leftParticipantsCount > 0 && (
            <BottomRightFixedContainer>
              <DeadLineText>{deadline}</DeadLineText>
            </BottomRightFixedContainer>
          )}
          {purpose === Purpose.mypage && (
            <BottomRightFixedContainer>
              {startDateFromNow !== "마감" ? (
                <CancelButton onPress={() => setCancelModal(true)}>
                  <CancelText>
                    <Ionicons
                      name="alert"
                      size={18}
                      color={colors.warningRed}
                    />
                    취소하기
                  </CancelText>
                </CancelButton>
              ) : kakaoPlaceId ? (
                <ReviewButton onPress={() => writeReview(kakaoPlaceId)} />
              ) : null}
            </BottomRightFixedContainer>
          )}
        </RightContiner>
      </Container>
    </TouchableWithoutFeedback>
  );
}

const ModalButton = styled.TouchableOpacity`
  width: 280px;
  height: 70px;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
`;

const STextArea = styled(TextArea)`
  margin-top: 20px;
  height: 150px;
`;

const ModalCloseButton = styled(ModalButton)`
  background-color: ${colors.bareGrey};
  height: 50px;
`;

const ModalCloseButtonText = styled(GeneralText)`
  color: ${colors.bgColor};
  font-family: ${fontFamilies.bold};
`;

const ModalWrapper = styled.View`
  flex: 1;
  padding: 30px 20px;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const CancelReservationContainer = styled.ScrollView`
  flex: 1;
  margin: 50px 0;
  width: 100%;
`;

const CancelSubHeading = styled(GeneralText)`
  font-family: ${fontFamilies.bold};
  color: ${colors.lightBlack};
  font-size: 22px;
`;

const ModalHeading = styled(GeneralText)`
  font-size: 24px;
`;

const ModalInstruction = styled(GeneralText)`
  color: ${colors.lightBlack};
  line-height: 28px;
`;

const ClosedText = styled(GeneralText)`
  color: ${colors.bgColor};
  font-family: ${fontFamilies.bold};
  font-size: 22px;
`;

const CancelButton = styled.TouchableOpacity`
  align-items: center;
`;

const CancelText = styled(GeneralText)`
  color: ${colors.warningRed};
`;

const LeftContainerOverlay = styled.View`
  position: absolute;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background-color: rgba(52, 52, 52, 0.6);
  border-radius: 5px;
`;

const AvatarNumText = styled(GeneralText)`
  color: ${colors.lightBlack};
  margin-left: 10px;
`;

const AvatarContainer = styled.View`
  flex-direction: row;
  margin-top: 8px;
  align-items: center;
`;

const AvartarWrapper = styled.View`
  margin-left: -5px;
`;

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

const CoverImage = styled(FastImage)`
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
