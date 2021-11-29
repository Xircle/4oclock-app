import styled from "styled-components/native";
import React, { useEffect, useState } from "react";
import { colors, GeneralText, MainHeading } from "../../styles/styles";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { ActivityStackParamList } from "../../navigators/ActivityStackNav";
import MainButtonWBg from "../../components/UI/MainButtonWBg";
import { Ionicons } from "@expo/vector-icons";
import { Alert } from "react-native";
import { useMutation } from "react-query";
import { makeReservation } from "../../lib/api/makeReservation";

interface Props {
  route: RouteProp<ActivityStackParamList, "Reservation">;
}

export default function Reservation({ route }: Props) {
  const placeId = route.params.placeId;
  const [agree, setAgree] = useState(false);
  const [isVaccinated, setIsVaccinated] = useState(false);
  const navigation = useNavigation();

  const { mutateAsync: mutateReservation, isLoading } = useMutation(
    makeReservation
  );

  const CTAHandler = async () => {
    try {
      const { data } = await mutateReservation({
        isVaccinated,
        placeId,
      });
      if (!data.ok) {
        Alert.alert(data.error);
        return;
      }
      // @ts-ignore
      navigation.navigate("ReservationConfirm", {
        detailAddress: route.params.detailAddress,
        participationFee: route.params.participationFee,
        startDateFromNow: route.params.startDateFromNow,
        startTime: route.params.startTime,
      });
    } catch (err) {
      console.log(err);
      Alert.alert(err);
      return;
    }
  };
  return (
    <Container>
      <InfoContainer>
        <MainHeading>친구들과 놀러가기!</MainHeading>
        <ThanksText>이팅모임을 신청해주셔서 정말 감사합니다 :)</ThanksText>
        <InfoText>
          같이 참여하는 친구들의 자세한 프로필을 확인해보세요! 모임에 참여하는
          친구들을 존중하고 따뜻한 문화를 함께 만들어나가요😊
        </InfoText>
      </InfoContainer>
      <SelectContainer>
        <SelectButtonWrapper marginBottom={15}>
          <SelectButton onPress={() => setAgree((prev) => !prev)}>
            <SelectInnerWrapper>
              <Ionicons
                name={agree ? "checkmark-circle" : "checkmark-circle-outline"}
                size={28}
                color={agree ? colors.mainBlue : colors.bareGrey}
              />
              <SelectText>
                위 사항을 확인하고 이용 규칙을 지키겠습니다
              </SelectText>
            </SelectInnerWrapper>
          </SelectButton>
        </SelectButtonWrapper>
        <SelectButtonWrapper>
          <SelectButton onPress={() => setIsVaccinated((prev) => !prev)}>
            <SelectInnerWrapper>
              <Ionicons
                name={
                  isVaccinated ? "checkmark-circle" : "checkmark-circle-outline"
                }
                size={28}
                color={isVaccinated ? colors.mainBlue : colors.bareGrey}
              />
              <SelectText>백신 접종 후 2주가 지났나요?</SelectText>
            </SelectInnerWrapper>
          </SelectButton>
        </SelectButtonWrapper>
      </SelectContainer>
      <MainButtonWBg
        title="나도 놀러갈래~"
        onPress={CTAHandler}
        disabled={!agree}
      />
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: ${colors.bgColor};
`;

const InfoContainer = styled.View`
  width: 100%;
  margin-top: 30px;
  padding: 0px 20px 30px;
`;
const ThanksText = styled(GeneralText)`
  margin-top: 22px;
  font-size: 14px;
  color: ${colors.bareGrey};
`;

const InfoText = styled(GeneralText)`
  margin-top: 22px;
  font-size: 15px;
  color: ${colors.midGrey};
  line-height: 22px;
`;

const SelectContainer = styled.View`
  padding: 20px;
`;

const SelectButtonWrapper = styled.View<{ marginBottom?: number }>`
  margin-bottom: ${(props) =>
    props.marginBottom ? props.marginBottom + "px" : "0px"};
`;

const SelectButton = styled.TouchableWithoutFeedback``;

const SelectText = styled.Text`
  font-size: 16px;
  flex-wrap: wrap;
  margin-left: 12px;
`;

const SelectInnerWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;
