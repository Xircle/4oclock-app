import styled from "styled-components/native";
import React, { useEffect } from "react";
import { colors, GeneralText, MainHeading } from "../../styles/styles";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { ActivityStackParamList } from "../../navigators/ActivityStackNav";
import MainButtonWBg from "../../components/UI/MainButtonWBg";

interface Props {
  route: RouteProp<ActivityStackParamList, "Reservation">;
}

export default function Reservation({ route }: Props) {
  const navigation = useNavigation();
  useEffect(() => {
    console.log(route.params.detailAddress);
    console.log(route.params.participationFee);
    console.log(route.params.startDateFromNow);
    console.log(route.params.startTime);
  }, []);

  const onPress = () => {
    // @ts-ignore
    navigation.navigate("ReservationConfirm", {
      detailAddress: route.params.detailAddress,
      participationFee: route.params.participationFee,
      startDateFromNow: route.params.startDateFromNow,
      startTime: route.params.startTime,
    });
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
      <MainButtonWBg
        title="나도 놀러갈래~"
        onPress={onPress}
        //disabled={disabled}
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
  border-bottom-width: 0.3px;
  border-color: ${colors.bareGrey};
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
