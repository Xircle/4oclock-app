import { RouteProp, useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Alert } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useMutation, useQuery } from "react-query";
import styled from "styled-components/native";
import LeaderQ from "../../components/activity/LeaderQ";
import ParticipantsPC from "../../components/activity/ParticipantsPC";
import MyBottomModal from "../../components/UI/MyBottomModal";
import { cancelReservationByCreator } from "../../lib/api/cancelReservationByCreator";
import { getPlaceParticipantList } from "../../lib/api/getPlaceParticipantList";
import { PlaceParticipantListData } from "../../lib/api/types";
import { LoggedInStackParamList } from "../../navigators/LoggedInNav";
import {
  colors,
  fontFamilies,
  GeneralText,
  ModalBlueButton,
  ModalButtonText,
  ModalCloseButton,
  ModalReportButton,
} from "../../styles/styles";

interface Props {
  route: RouteProp<LoggedInStackParamList, "ParticipantsList">;
}

export default function ParticipantsList({ route }: Props) {
  const navigation = useNavigation();
  const [userId, setUserId] = useState("");
  const [modal, setModal] = useState(false);

  const {
    data: participantsData,
    isLoading,
    refetch,
  } = useQuery<PlaceParticipantListData | undefined>(
    ["place-participant", route.params.placeId],
    () => getPlaceParticipantList(route.params.placeId),
    {
      onError: (err: any) => {
        Alert.alert(err);
        return;
      },
      retry: 1,
      refetchOnWindowFocus: false,
    }
  );

  const { mutateAsync: mutateCancelReservationByCreator } = useMutation(
    cancelReservationByCreator
  );

  const CancelReservation = async () => {
    const { data } = await mutateCancelReservationByCreator({
      placeId: route.params.placeId,
      participantId: userId,
    });
    if (!data.ok) {
      throw new Error(data.error);
    }
    refetch();
    Alert.alert("예약이 취소되었습니다");
    setModal(false);
  };

  const navigateToFriendProfile = (id: string) => {
    //@ts-ignore
    navigation.navigate("FriendProfile", { id: id });
  };

  const participantsCTA = (id: string) => {
    if (route?.params?.isCreator) {
      setUserId(id);
      setModal(true);
    } else {
      navigateToFriendProfile(id);
    }
  };

  const modalNavigateToFriendProfile = () => {
    if (userId) {
      setModal(false);
      navigateToFriendProfile(userId);
    }
  };

  useEffect(() => {
    if (participantsData) console.log(participantsData.qAndA);
  }, [participantsData]);

  return (
    <Container showsVerticalScrollIndicator={false}>
      {route?.params?.isCreator && (
        <MyBottomModal
          onClose={() => {}}
          visible={modal}
          setModal={() => setModal(false)}
          height={250}
        >
          <ModalBlueButton onPress={modalNavigateToFriendProfile}>
            <ModalButtonText>프로필 보러가기</ModalButtonText>
          </ModalBlueButton>
          <ModalBlueButton onPress={modalNavigateToFriendProfile}>
            <ModalButtonText>오카방 초대하기</ModalButtonText>
          </ModalBlueButton>
          <ModalReportButton onPress={CancelReservation}>
            <ModalButtonText>참가자 강퇴하기</ModalButtonText>
          </ModalReportButton>
          <ModalCloseButton onPress={() => setModal(false)}>
            <ModalButtonText>닫기</ModalButtonText>
          </ModalCloseButton>
        </MyBottomModal>
      )}
      <Heading>{route.params.placeName}</Heading>
      {participantsData.qAndA?.length && <LeaderQ qAndA={["hello"]} />}
      <AgeContainer>
        <AgeText>남 {participantsData?.participantsInfo?.male_count}</AgeText>
        <AgeText>
          여{" "}
          {participantsData?.participantsInfo?.total_count -
            participantsData?.participantsInfo?.male_count}
        </AgeText>
      </AgeContainer>
      <ParticipantsContainer>
        {participantsData?.participantListProfiles.map((item, index) => {
          return (
            <TouchableOpacity
              key={item.userId}
              onPress={() => participantsCTA(item.userId)}
            >
              <ParticipantsPC
                profileImgUrl={item.profileImgUrl}
                shortBio={item.shortBio}
                job={item.job}
                qAndA={route?.params?.isCreator ? item.qAndA : []}
              />
            </TouchableOpacity>
          );
        })}
      </ParticipantsContainer>
    </Container>
  );
}

const Container = styled.ScrollView`
  flex: 1;
  background-color: ${colors.bgColor};
  padding: 15px;
`;

const Heading = styled(GeneralText)`
  font-family: ${fontFamilies.medium};
  font-size: 26px;
`;

const AgeContainer = styled.View`
  flex-direction: row;
  margin-top: 30px;
`;

const AgeText = styled(GeneralText)`
  margin-right: 10px;
  font-size: 20px;
  font-family: ${fontFamilies.medium};
  color: ${colors.midGrey};
`;

const ParticipantsContainer = styled.View``;
