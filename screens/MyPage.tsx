import styled from "styled-components/native";
import React, { useState } from "react";
import { Dimensions, TouchableOpacity } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import {
  colors,
  GeneralText,
  MainHeading,
  XLButton,
  XLButtonText,
} from "../styles/styles";
import AvatarUri from "../components/UI/AvatarUri";
import { Ionicons } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import { Alert } from "react-native";

interface Props {}

const { width, height } = Dimensions.get("window");

export default function MyPage(props: Props) {
  const [result, setResult] = useState<string>("");

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bgColor }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Container>
          <MainHeading>마이페이지</MainHeading>
          <ProfileContainer>
            <AvatarUri
              size={width * 0.2}
              source={
                "https://xircle-profile-upload.s3.ap-northeast-2.amazonaws.com/uploads/-340b910c-1b94-400f-80ac-14f39d454bc4-1636351789614-%EC%BA%A1%EC%B2%98.JPG"
              }
            />
            <ProfileInnerContainer>
              <GeneralText style={{ fontWeight: "600", lineHeight: 28 }}>
                나는 현덕
              </GeneralText>
              <GeneralText style={{ color: colors.bareGrey, lineHeight: 28 }}>
                워털루 대학교 / 20후반
              </GeneralText>
            </ProfileInnerContainer>
          </ProfileContainer>

          <SXLButton>
            <SXLButtonText>프로필 수정하기</SXLButtonText>
          </SXLButton>
          <ListContainer>
            <ListButton>
              <ListText>맛집 건의하기</ListText>
            </ListButton>
            <ListButton>
              <ListText>문의하기 / 피드백하기</ListText>
            </ListButton>
            <ListButton>
              <ListText>서비스 사용약관</ListText>
            </ListButton>
            <ListButton>
              <ListText>유저 신고하기</ListText>
            </ListButton>
            <ListButton>
              <ListText>로그아웃하기</ListText>
            </ListButton>
          </ListContainer>
          <FooterContainer>
            <SNSWrapper>
              <SNSContainer>
                <Ionicons name="logo-instagram" size={24} color="#ffffff" />
              </SNSContainer>
              <SNSContainer style={{ marginLeft: 10 }}>
                <Ionicons name="logo-youtube" size={24} color="#ffffff" />
              </SNSContainer>
              <SNSContainer style={{ marginLeft: 10 }}>
                <Ionicons name="logo-instagram" size={24} color="#ffffff" />
              </SNSContainer>
            </SNSWrapper>
            <TouchableOpacity>
              <SNSText>개인정보처리방침</SNSText>
            </TouchableOpacity>
            <TouchableOpacity>
              <SNSText>마케팅 수신동의 이용약관</SNSText>
            </TouchableOpacity>
          </FooterContainer>
        </Container>
      </ScrollView>
    </SafeAreaView>
  );
}

const Container = styled.View`
  flex: 1;
  padding: 8%;
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
`;
