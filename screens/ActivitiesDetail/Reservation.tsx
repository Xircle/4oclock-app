import styled from "styled-components/native";
import React, { useState } from "react";
import {
  colors,
  fontFamilies,
  GeneralText,
  MainHeading,
} from "../../styles/styles";
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
        placeType: route.params.placeType,
        kakaoLink: route.params.kakaoLink,
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
        <MainHeading>친구들과 놀러가기!🕺</MainHeading>
        <ThanksText>이제 친구들과 맛잼모임에 놀러가자~!</ThanksText>
        <InnerInfoContainer>
          <InfoText>
            👍 모임 시작 전 참여가 어려워진 경우, 반드시 운영진을 통해서 미리
            알려주세요!
          </InfoText>
          <InfoText style={{ marginTop: 20 }}>
            ✌ 모임에서 다른 친구들을 존중해주세요. 비매너 친구는 익명신고를
            통해 연고이팅 운영진에게 말해주세요!
          </InfoText>
        </InnerInfoContainer>
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
              <MandatorySign>*</MandatorySign>
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
        <VaccineInfoText>
          백신 접종 여부 조사를 위해 체크하는 항목이에요:D
        </VaccineInfoText>
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
  font-size: 13px;
  color: ${colors.lightBlack};
  line-height: 22px;
  font-family: ${fontFamilies.light};
`;

const VaccineInfoText = styled(GeneralText)`
  font-size: 13px;
  color: ${colors.bareGrey};
  margin-top: 8px;
`;

const InnerInfoContainer = styled.View`
  margin-top: 22px;
  margin-top: 22px;
  background-color: rgba(219, 237, 255, 0.39);
  padding: 20px 16px;
  border-radius: 10px;
`;

const SelectContainer = styled.View`
  padding: 20px;
`;

const SelectButtonWrapper = styled.View<{ marginBottom?: number }>`
  margin-bottom: ${(props) =>
    props.marginBottom ? props.marginBottom + "px" : "0px"};
`;

const SelectButton = styled.TouchableWithoutFeedback``;

const SelectText = styled(GeneralText)`
  font-size: 15px;
  flex-wrap: wrap;
  margin-left: 12px;
`;

const MandatorySign = styled(GeneralText)`
  font-size: 15px;
  color: red;
  margin-left: 2px;
`;

const SelectInnerWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;
