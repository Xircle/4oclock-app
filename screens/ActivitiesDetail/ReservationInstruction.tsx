import styled from "styled-components/native";
import React, { useState } from "react";
import {
  colors,
  fontFamilies,
  GeneralText,
  MainHeading,
} from "../../styles/styles";
import { RouteProp, useNavigation } from "@react-navigation/native";
import {
  ActivityStackParamList,
  ReservationQAScreenProp,
} from "../../navigators/ActivityStackNav";
import AbsoluteMainButtonWBg from "../../components/UI/AbsoluteMainButtonWBg";
import { Ionicons } from "@expo/vector-icons";
import { Alert } from "react-native";
import { useMutation } from "react-query";
import { makeReservation } from "../../lib/api/makeReservation";

interface Props {
  route: RouteProp<ActivityStackParamList, "ReservationInstruction">;
}

export default function ReservationInstruction({ route }: Props) {
  const placeId = route.params.placeId;
  const [participantAnswer, setParticipantAnswer] = useState("");
  const [agree, setAgree] = useState(false);
  const navigation = useNavigation<ReservationQAScreenProp>();

  const { mutateAsync: mutateReservation, isLoading } =
    useMutation(makeReservation);

  const CTAHandler = async () => {
    try {
      if (route.params.qAndA?.length) {
        navigation.navigate("ReservationQA", {
          detailAddress: route.params.detailAddress,
          participationFee: route.params.participationFee,
          startDateFromNow: route.params.startDateFromNow,
          startTime: route.params.startTime,
          placeType: route.params.placeType,
          kakaoLink: route.params.kakaoLink,
          qAndA: route.params.qAndA,
          placeId: route.params.placeId,
        });
      } else {
        const { data } = await mutateReservation({
          placeId,
          qAndA: [participantAnswer],
        });
        if (!data.ok) {
          Alert.alert(data.error);
          return;
        }
        navigation.navigate("ReservationConfirm", {
          detailAddress: route.params.detailAddress,
          participationFee: route.params.participationFee,
          startDateFromNow: route.params.startDateFromNow,
          startTime: route.params.startTime,
          placeType: route.params.placeType,
          kakaoLink: route.params.kakaoLink,
        });
      }
    } catch (err) {
      console.log(err);
      Alert.alert(err);
      return;
    }
  };
  return (
    <Container>
      <InfoContainer>
        <MainHeading>???????????? ????????????!????</MainHeading>
        <ThanksText>?????? ???????????? ??????????????? ????????????~!</ThanksText>
        <InnerInfoContainer>
          <InfoText>
            ???? ?????? ?????? ??? ????????? ???????????? ??????, ????????? ???????????? ????????? ??????
            ???????????????!
          </InfoText>
          <InfoText style={{ marginTop: 20 }}>
            ??? ???????????? ?????? ???????????? ??????????????????. ????????? ????????? ???????????????
            ?????? ???????????? ??????????????? ???????????????!
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
                ??? ????????? ???????????? ?????? ????????? ??????????????????
              </SelectText>
              <MandatorySign>*</MandatorySign>
            </SelectInnerWrapper>
          </SelectButton>
        </SelectButtonWrapper>
      </SelectContainer>
      <AbsoluteMainButtonWBg
        title="?????? ????????????~"
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
