import styled from "styled-components/native";
import React, { useState } from "react";
import { colors, fontFamilies, GeneralText } from "../../styles/styles";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Alert, TouchableWithoutFeedback } from "react-native";
import optimizeImage from "../../lib/helpers/optimizeImage";
import { Participants } from "../../lib/api/types";
import FastImage from "react-native-fast-image";
import MyBottomModal from "../UI/MyBottomModal";
import { useMutation } from "react-query";
import { deletePlace } from "../../lib/api/deletePlace";
import FullScreenLoader from "../UI/FullScreenLoader";
import { activityDispatcher } from "../../lib/activity/ActivityDispatcher";
import { useDispatch } from "react-redux";

export const enum Purpose {
  main = "main",
  mypage = "mypage",
}

export interface existingPlace {
  coverImage?: string;
  name?: string;
  id: string;
  kakaoPlaceId?: string;
  maxParticipantsNumber?: number;
  detailAddress?: string;
  participationFee?: string;
  startDateAt?: string;
  activityType?: string;
  kakaoLink?: string;
  subImages?: string[];
  team?: string;
  recommendation?: string;
  description?: string;
}

interface Props extends existingPlace {
  purpose?: Purpose;
  views?: number;
  startDateFromNow?: string;
  deadline?: string;
  leftParticipantsCount?: number;
  participants?: Participants[];
  refetch?: () => {};
  isRefetch?: boolean;
  isClosed?: boolean;
}

function MyCreatedPlacesFlatList({
  coverImage,
  name,
  id,
  views,
  description,
  startDateFromNow,
  purpose = Purpose.mypage,
  refetch,
  isRefetch,
  participants,
  kakaoPlaceId,
  maxParticipantsNumber,
  detailAddress,
  participationFee,
  startDateAt,
  activityType,
  kakaoLink,
  subImages,
  team,
  recommendation,
}: Props) {
  const navigation = useNavigation();
  const [deleteModal, setDeleteModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { mutateAsync: mutateDeletePlace } = useMutation(deletePlace);
  const onPress = () => {
    // @ts-ignore
    navigation.navigate("ActivityStackNav", {
      id: id,
      name: name,
      participants: participants,
    });
  };

  const EditPlace = async () => {
    setLoading(true);
    try {
      activityDispatcher.dispatchExistingState(
        {
          coverImage,
          name,
          id,
          kakaoPlaceId,
          maxParticipantsNumber,
          detailAddress,
          participationFee,
          startDateAt,
          activityType,
          kakaoLink,
          subImages,
          team,
          recommendation,
          description,
        },
        dispatch
      );
      //@ts-ignore
      navigation.navigate("CreateActivityStackNav");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      Alert.alert("일시적 에러가 발생했습니다");
    }
    setLoading(false);
  };
  const DeletePlace = async () => {
    if (!id) return;
    const data = await mutateDeletePlace(id);
    if (!data.ok) {
      throw new Error(data.error);
    }
    Alert.alert("모임이 삭제되었습니다");
    setDeleteModal(false);
    if (isRefetch) {
      refetch();
    }
  };

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Container>
        {loading && <FullScreenLoader />}
        <MyBottomModal
          onClose={() => {}}
          visible={deleteModal}
          setModal={() => setDeleteModal(false)}
          height={400}
        >
          <ModalWrapper>
            <ModalHeading>{name}</ModalHeading>
            <DeleteActivityContainer showsVerticalScrollIndicator={false}>
              <DeleteSubHeading>정말 모임을 삭제하시겠습니까?</DeleteSubHeading>
              <DeleteInstructionText>
                모임에 관련된 모든 정보가 복구 불가능합니다
              </DeleteInstructionText>
            </DeleteActivityContainer>
            <ModalCloseButton onPress={DeletePlace}>
              <ModalCloseButtonText>모임 삭제하기</ModalCloseButtonText>
            </ModalCloseButton>
          </ModalWrapper>
        </MyBottomModal>

        <LeftContainer>
          <CoverImage
            source={{
              uri: optimizeImage(coverImage, {
                width: 130,
                height: 130,
                quality: 10,
              }),
              priority: FastImage.priority.high,
            }}
          />
        </LeftContainer>
        <RightContiner>
          <Heading>
            {name.length > 11 ? name.slice(0, 11) + "..." : name}
          </Heading>

          <BottomRightFixedContainer>
            {startDateFromNow !== "마감" && (
              <CTAButtonContainer>
                <ActivityCTAButton onPress={EditPlace}>
                  <ModifyText>
                    <Ionicons name="brush" size={14} color={colors.mainBlue} />
                    모임 수정하기
                  </ModifyText>
                </ActivityCTAButton>
                <ActivityCTAButton
                  onPress={() => setDeleteModal(true)}
                  style={{ marginTop: 16 }}
                >
                  <DeleteText>
                    <Ionicons
                      name="alert"
                      size={18}
                      color={colors.warningRed}
                    />
                    모임 삭제하기
                  </DeleteText>
                </ActivityCTAButton>
              </CTAButtonContainer>
            )}
          </BottomRightFixedContainer>
        </RightContiner>
      </Container>
    </TouchableWithoutFeedback>
  );
}

export default MyCreatedPlacesFlatList;

const CTAButtonContainer = styled.View`
  align-items: flex-end;
`;

const ModalButton = styled.TouchableOpacity`
  width: 280px;
  height: 70px;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
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

const DeleteInstructionText = styled(GeneralText)`
  margin-top: 50px;
  margin-left: auto;
  margin-right: auto;
  color: ${colors.bareGrey};
`;

const DeleteActivityContainer = styled.ScrollView`
  flex: 1;
  margin: 50px 0;
  width: 100%;
`;

const DeleteSubHeading = styled(GeneralText)`
  font-family: ${fontFamilies.bold};
  color: ${colors.lightBlack};
  font-size: 22px;
  margin-left: auto;
  margin-right: auto;
`;

const ModalHeading = styled(GeneralText)`
  font-size: 24px;
`;

const ActivityCTAButton = styled.TouchableOpacity`
  align-items: center;
`;

const DeleteText = styled(GeneralText)`
  color: ${colors.warningRed};
`;

const ModifyText = styled(GeneralText)`
  color: ${colors.mainBlue};
`;

const BottomRightFixedContainer = styled.View`
  position: absolute;
  bottom: 0;
  right: 0;
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
