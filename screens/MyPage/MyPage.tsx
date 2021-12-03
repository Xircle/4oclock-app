import styled from "styled-components/native";
import React, { useEffect, useState } from "react";
import { Dimensions, TouchableOpacity } from "react-native";
import {
  colors,
  fontFamilies,
  GeneralText,
  MainHeading,
  XLButton,
  XLButtonText,
} from "../../styles/styles";
import AvatarUri from "../../components/UI/AvatarUri";
import { Ionicons } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import { useQuery } from "react-query";
import { UserData } from "../../lib/api/types";
import { getUser } from "../../lib/api/getUser";
import { AgeNumberToString } from "../../lib/utils";
import { useNavigation } from "@react-navigation/native";
import { openLink } from "../../components/shared/Links";

interface Props {
  isRefetch?: boolean;
}

const { width, height } = Dimensions.get("window");

export default function MyPage({ isRefetch }: Props) {
  const naviagtion = useNavigation();
  const [result, setResult] = useState<string>("");

  const { data: userData, isLoading, refetch } = useQuery<UserData | undefined>(
    ["userProfile"],
    () => getUser(),
    {
      retry: 1,
    }
  );
  if (isRefetch) {
    refetch();
  }

  useEffect(() => {
    refetch();
  }, []);

  return (
    <Wrapper>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ backgroundColor: colors.bgColor, marginTop: 40 }}
      >
        <Container>
          <MainHeading>마이페이지</MainHeading>
          <ProfileContainer>
            {userData?.profileImageUrl && (
              <TouchableOpacity
                /* @ts-ignore */
                onPress={() => naviagtion.navigate("MyProfile")}
              >
                <AvatarUri
                  size={width * 0.2}
                  source={userData?.profileImageUrl}
                />
              </TouchableOpacity>
            )}
            <ProfileInnerContainer>
              <GeneralText style={{ fontWeight: "600", lineHeight: 28 }}>
                {userData?.username || ""}
              </GeneralText>
              <GeneralText style={{ color: colors.bareGrey, lineHeight: 28 }}>
                {userData?.university || "기안대학교"} /{" "}
                {AgeNumberToString(userData?.age) || "모름"}
              </GeneralText>
            </ProfileInnerContainer>
          </ProfileContainer>
          {/* @ts-ignore */}
          <SXLButton onPress={() => naviagtion.navigate("MyProfile")}>
            <SXLButtonText>프로필 수정하기</SXLButtonText>
          </SXLButton>
          <ListContainer>
            <ListButton>
              <RegisteredButton
                // @ts-ignore
                onPress={() => naviagtion.navigate("MyActivities")}
              >
                <ListText style={{ fontFamily: fontFamilies.bold }}>
                  신청한 모임 {userData?.reservation_count}
                </ListText>
                <Ionicons
                  name="chevron-forward-sharp"
                  size={24}
                  color="black"
                />
              </RegisteredButton>
            </ListButton>
            <ListButton onPress={openLink.LOpenKakaoChat}>
              <ListText>맛집 건의하기</ListText>
            </ListButton>
            <ListButton onPress={openLink.LOpenKakaoChat}>
              <ListText>문의하기 / 피드백하기</ListText>
            </ListButton>
            <ListButton onPress={openLink.LServiceAgree}>
              <ListText>서비스 사용약관</ListText>
            </ListButton>
            <ListButton onPress={openLink.LOpenKakaoChat}>
              <ListText>유저 신고하기</ListText>
            </ListButton>
            <ListButton>
              <ListText>로그아웃하기</ListText>
            </ListButton>
          </ListContainer>
          <FooterContainer>
            <SNSWrapper>
              <SNSContainer onPress={openLink.LInstagram}>
                <Ionicons name="logo-instagram" size={24} color="#ffffff" />
              </SNSContainer>
              <SNSContainer
                style={{ marginLeft: 10 }}
                onPress={openLink.LYoutube}
              >
                <Ionicons name="logo-youtube" size={24} color="#ffffff" />
              </SNSContainer>
              <SNSContainer
                style={{ marginLeft: 10 }}
                onPress={openLink.LYoutube}
              >
                <Ionicons name="logo-instagram" size={24} color="#ffffff" />
              </SNSContainer>
            </SNSWrapper>
            <TouchableOpacity onPress={openLink.LPrivacyAgree}>
              <SNSText>개인정보처리방침</SNSText>
            </TouchableOpacity>
            <TouchableOpacity onPress={openLink.LServiceAgree}>
              <SNSText>마케팅 수신동의 이용약관</SNSText>
            </TouchableOpacity>
          </FooterContainer>
        </Container>
      </ScrollView>
    </Wrapper>
  );
}

const Container = styled.View`
  flex: 1;
  padding: 8%;
`;

const Wrapper = styled.View`
  flex: 1;
  background-color: ${colors.bgColor};
`;

const SXLButton = styled(XLButton)`
  background-color: white;
  border: 1px solid ${colors.mainBlue};
  width: ${width * 0.86 + "px"};
  height: ${width * 0.86 * 0.17 + "px"};
`;

const SXLButtonText = styled(XLButtonText)`
  color: ${colors.mainBlue};
  font-size: ${(width * 0.86) / 17 + "px"};
`;

const ProfileContainer = styled.View`
  flex-direction: row;
  padding: 20px 0;
`;

const ProfileInnerContainer = styled.View`
  justify-content: center;
  padding-left: 30px;
`;

const ListContainer = styled.View`
  margin-top: ${height * 0.04 + "px"};
`;

const ListButton = styled.TouchableOpacity`
  margin: 13px 0px;
`;

const ListText = styled.Text`
  color: ${colors.black};
  font-size: 19px;
  line-height: 28px;
  font-family: ${fontFamilies.regular};
`;

const FooterContainer = styled.View`
  margin-top: ${height * 0.08 + "px"};
`;

const SNSContainer = styled.TouchableOpacity`
  width: 36px;
  height: 36px;
  background-color: ${colors.bareGrey};
  justify-content: center;
  align-items: center;
  border-radius: 18px;
`;

const SNSWrapper = styled.View`
  flex-direction: row;
  margin-bottom: 10px;
`;

const SNSText = styled.Text`
  font-size: 15px;
  color: ${colors.bareGrey};
  line-height: 28px;
  font-family: ${fontFamilies.regular};
`;

const RegisteredButton = styled.TouchableOpacity`
  width: 100%;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
`;
