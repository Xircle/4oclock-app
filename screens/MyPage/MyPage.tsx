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
import { Account } from "../../lib/helpers/Account";
import storage from "../../lib/helpers/myAsyncStorage";

interface Props {}

const { width, height } = Dimensions.get("window");

export default function MyPage(props: Props) {
  const navigation = useNavigation();

  const {
    data: userData,
    isLoading,
    refetch,
  } = useQuery<UserData | undefined>(["userProfile"], () => getUser(), {
    retry: 1,
  });

  const saveToLocalStorage = async (variable: string, value: string) => {
    await storage.setItem(variable, value);
  };

  useEffect(() => {
    if (userData?.accountType) {
      saveToLocalStorage("accountType", userData?.accountType);
    }
    if (userData?.team) {
      saveToLocalStorage("team", userData?.team);
    }
    if (userData?.isYkClub) {
      saveToLocalStorage("isYkClub", "true");
    } else {
      saveToLocalStorage("isYkClub", "false");
    }
  }, [userData]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", (e) => {
      // Do something
      if (!isLoading) refetch();
    });
    return unsubscribe;
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
                onPress={() => navigation.navigate("MyProfile")}
              >
                <AvatarUri
                  size={width * 0.2}
                  source={userData?.profileImageUrl}
                />
              </TouchableOpacity>
            )}
            <ProfileInnerContainer>
              {userData?.isYkClub && (
                <RoleTag>
                  {userData?.accountType === "Admin"
                    ? "운영진"
                    : userData?.accountType === "Owner"
                    ? "리더"
                    : "크루"}
                </RoleTag>
              )}

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
          <SXLButton onPress={() => navigation.navigate("MyProfile")}>
            <SXLButtonText>프로필 수정하기</SXLButtonText>
          </SXLButton>
          <ListContainer>
            <ListButton>
              <RegisteredButton
                // @ts-ignore
                onPress={() => navigation.navigate("MyActivities")}
              >
                <ListText style={{ fontFamily: fontFamilies.bold }}>
                  현재 기수 모임 {userData?.this_season_reservation_count} /
                  전체 모임 {userData?.reservation_count}
                </ListText>
                <Ionicons
                  name="chevron-forward-sharp"
                  size={24}
                  color="black"
                />
              </RegisteredButton>
            </ListButton>
            <ListButton onPress={openLink.LOpenKakaoChat}>
              <ListText>연고이팅 운영진에게 문의 / 피드백</ListText>
            </ListButton>
            <ListButton onPress={openLink.LServiceAgree}>
              <ListText>연고이팅 이용자 가이드!</ListText>
            </ListButton>
            <ListButton onPress={openLink.LOpenKakaoChat}>
              <ListText>비매너 유저 신고하기</ListText>
            </ListButton>
            <ListButton
              onPress={() => {
                Account.logout();
                // @ts-ignore
                navigation.navigate("Welcome");
              }}
            >
              <ListText>로그아웃</ListText>
            </ListButton>
            <ListButton onPress={openLink.LOpenKakaoChat}>
              <ListText>탈퇴하기</ListText>
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
            </SNSWrapper>
            <TouchableOpacity onPress={openLink.LPrivacyAgree}>
              <SNSText>개인정보처리방침</SNSText>
            </TouchableOpacity>
            <TouchableOpacity onPress={openLink.LServiceAgree}>
              <SNSText>서비스 사용약관</SNSText>
            </TouchableOpacity>
          </FooterContainer>
        </Container>
      </ScrollView>
    </Wrapper>
  );
}

const RoleTag = styled(GeneralText)`
  color: #9400d1;
`;

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
