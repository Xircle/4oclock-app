import styled from "styled-components/native";
import React, { useEffect } from "react";
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
import { Ionicons } from "@expo/vector-icons";
import { openLink } from "../../components/shared/Links";
import { SafeAreaView } from "react-native";

interface Props {
  route: RouteProp<ActivityStackParamList, "ReservationConfirm">;
}

export default function ReservationConfirm({ route }: Props) {
  const navigation = useNavigation();

  const goMain = () => {
    // @ts-ignore
    navigation.navigate("MainT");
  };

  useEffect(() => {
    openLink.LOpenLink(route.params?.kakaoLink);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
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
                  ? route.params.startDateFromNow
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
        <BottomButtonContainer>
          <XLButton onPress={goMain} disabled={false} bgColor={colors.bareGrey}>
            <XLButtonText>홈으로 돌아가기</XLButtonText>
          </XLButton>
          <SpaceForBottom />
          {route.params?.kakaoLink && (
            <XLButton
              onPress={() => openLink.LOpenLink(route.params?.kakaoLink)}
              disabled={false}
            >
              <XLButtonText>오픈 채팅 입장하기</XLButtonText>
            </XLButton>
          )}
        </BottomButtonContainer>
      </Container>
    </SafeAreaView>
  );
}

const SpaceForBottom = styled.View`
  height: 30px;
`;

const BottomButtonContainer = styled.View``;

const Container = styled.View`
  flex: 1;
  background-color: ${colors.white};
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
  color: ${colors.vividBlue};
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
