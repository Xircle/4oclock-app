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
import { TimeNumberToString } from "../../lib/utils";

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
            <MainHeading>친구들과 놀러가기!</MainHeading>
            <ThanksText>이팅모임을 신청해주셔서 정말 감사합니다 :)</ThanksText>
            <InfoText>
              같이 참여하는 친구들의 자세한 프로필을 확인해보세요! 모임에
              참여하는 친구들을 존중하고 따뜻한 문화를 함께 만들어나가요😊
            </InfoText>
          </InfoContainer>
          <DetailContainer>
            <DetailWrapper>
              <Ionicons name="alarm-outline" size={32} color={colors.midGrey} />
              <InnerSubText>
                {route.params?.startDateFromNow}{" "}
                {TimeNumberToString(route.params?.startTime, {
                  hasIndicator: true,
                })}
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
  margin-top: 30px;
  padding-bottom: 60px;
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

const Wrapper = styled.View``;
