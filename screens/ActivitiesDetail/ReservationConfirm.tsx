import styled from "styled-components/native";
import React from "react";
import {
  colors,
  fontFamilies,
  GeneralText,
  MainHeading,
  XLButton,
  XLButtonText,
} from "../../styles/styles";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { ActivityStackParamList } from "../../navigators/ActivityStackNav";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { getStartDateFromNow, TimeNumberToString } from "../../lib/utils";

interface Props {
  route: RouteProp<ActivityStackParamList, "ReservationConfirm">;
}

export default function ReservationConfirm({ route }: Props) {
  const navigation = useNavigation();

  const goMain = () => {
    // @ts-ignore
    navigation.navigate("MainT");
  };

  const goMyActivities = () => {};

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bgColor }}>
      <Container>
        <Wrapper>
          <InfoContainer>
            <MainHeading>이팅모임 참석신청 완료 🎉</MainHeading>
          </InfoContainer>
          <CenteredContainer>
            <CongratMainText>
              ⭐신청한 모임에 관한 자세한 내용⭐
            </CongratMainText>
            {route.params.placeType === "Lightning" && (
              <CongratSubText>
                운영진이 모임 전날 같은 번개를 신청한 친구들과 단톡을
                만들어드려요!
              </CongratSubText>
            )}
          </CenteredContainer>
          <DetailContainer>
            <DetailWrapper>
              <Ionicons name="alarm-outline" size={32} color={colors.midGrey} />
              <InnerSubText>
                {route.params?.startDateFromNow
                  ? getStartDateFromNow(route.params.startDateFromNow)
                  : ""}
              </InnerSubText>
            </DetailWrapper>
            <DetailWrapper>
              <Ionicons
                name="location-outline"
                size={32}
                color={colors.midGrey}
              />
              <InnerSubText>{route.params?.detailAddress}</InnerSubText>
            </DetailWrapper>
            <DetailWrapper>
              <Ionicons name="cash-outline" size={32} color={colors.midGrey} />
              <InnerSubText>
                참가비 {route.params?.participationFee}원
              </InnerSubText>
            </DetailWrapper>
          </DetailContainer>
        </Wrapper>

        <XLButton onPress={goMain} disabled={false}>
          <XLButtonText>홈으로 돌아가기</XLButtonText>
        </XLButton>
      </Container>
    </SafeAreaView>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: ${colors.bgColor};
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  justify-content: space-between;
`;

const InfoContainer = styled.View`
  width: 100%;
  margin-top: 80px;
  margin-bottom: 50px;
`;

const CongratMainText = styled(GeneralText)`
  color: ${colors.mainBlue};
  font-family: ${fontFamilies.medium};
  margin-top: 12px;
`;

const CongratSubText = styled(CongratMainText)`
  color: ${colors.midGrey};
  line-height: 28px;
`;

const DetailContainer = styled.View`
  margin-top: 40px;
`;

const DetailWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  margin: 10px;
`;

const InnerSubText = styled(GeneralText)`
  color: ${colors.midGrey};
  margin-right: 11px;
  font-family: ${fontFamilies.medium};
  margin-left: 22px;
`;

const Wrapper = styled.View`
  width: 90%;
  margin-left: auto;
  margin-right: auto;
`;

const CenteredContainer = styled.View`
  justify-content: center;
  align-items: center;
  padding-top: 25px;
  border-top-width: 0.5px;
  border-color: ${colors.lightBlack};
`;
