import { isUsingEmbeddedAssets } from "expo-updates";
import React from "react";
import { Dimensions, ScrollView, View } from "react-native";
import styled from "styled-components/native";
import { UserProfile } from "../../lib/api/types";
import { AgeNumberToString } from "../../lib/utils";
import { colors, fontFamilies, InfoBox, InfoText } from "../../styles/styles";
import AvatarUri from "../UI/AvatarUri";

interface Props {
  randomProfileData: UserProfile;
  onPressNext?: () => void;
  enableNext?: boolean;
  onPressChat?: () => void;
  enableChat?: boolean;
}

const { width } = Dimensions.get("screen");

export default function ProfileV({
  randomProfileData,
  onPressNext,
  onPressChat,
  enableChat,
  enableNext,
}: Props) {
  return (
    <>
      <SInfoBox>
        <SInfoText>
          연고이팅을 가입한 친구들과 소통할 수 있는 탭이에요!
        </SInfoText>
      </SInfoBox>
      <View style={{ flex: 8, width: "100%" }}>
        <ScrollView
          style={{ paddingTop: 30 }}
          showsVerticalScrollIndicator={false}
        >
          <Container>
            <AvatarUri
              source={randomProfileData?.profileImageUrl}
              size={width * 0.5}
            />
            <BigBlackText>{randomProfileData?.username}</BigBlackText>
            <MidGreyText>{randomProfileData?.job || ""}</MidGreyText>

            <InnerContainer>
              <InnerContent>
                <SmallBlackText>{randomProfileData?.MBTI}</SmallBlackText>
                <SmallBlackText>
                  {randomProfileData?.personality}
                </SmallBlackText>
              </InnerContent>
              <ShortBioText>{randomProfileData?.shortBio}</ShortBioText>
              <GraySubText>
                {randomProfileData?.location
                  ? randomProfileData?.location
                  : "대한민국 어딘가"}{" "}
                / {randomProfileData?.university || "고연이대"} /{" "}
                {AgeNumberToString(randomProfileData?.age) || "나잇살"} /{" "}
                {randomProfileData
                  ? randomProfileData.gender === "Male"
                    ? "남"
                    : "여"
                  : "남성역"}
              </GraySubText>
            </InnerContainer>
            <View style={{ height: 150 }} />
          </Container>
        </ScrollView>
      </View>
      <ButtonContainer>
        {enableChat && (
          <ChatButton fullWidth={!enableNext}>
            <ChatText>채팅하기</ChatText>
          </ChatButton>
        )}

        {enableNext && (
          <NextButton onPress={onPressNext}>
            <NextText>다음 친구보기</NextText>
          </NextButton>
        )}
      </ButtonContainer>
    </>
  );
}

const SInfoBox = styled(InfoBox)`
  margin-top: 30px;
  width: ${width * 0.9 + "px"};
`;

const SInfoText = styled(InfoText)``;

const Container = styled.View`
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const BigBlackText = styled.Text`
  color: ${colors.black};
  font-size: 30px;
  font-family: ${fontFamilies.medium};
  margin-top: 30px;
`;

const MidGreyText = styled.Text`
  font-size: 17px;
  font-family: ${fontFamilies.regular};
  color: #8c94a4;
  margin: 10px 0px;
`;

const InnerContainer = styled.View`
  width: 80%;
`;

const GraySubText = styled.Text`
  font-size: 17px;
  color: #8c94a4;
  font-family: ${fontFamilies.regular};
`;

const ShortBioText = styled.Text`
  font-size: 16px;
  font-family: ${fontFamilies.light};
  color: rgb(18, 18, 29);
  margin: 20px 0px;
`;

const ButtonContainer = styled.View`
  flex: 0.7;
  width: ${width * 0.9 + "px"};
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 15px;
`;

const ChatButton = styled.TouchableOpacity<{ fullWidth?: boolean }>`
  background-color: ${colors.mainBlue};
  height: 100%;
  flex: 0.47;
  flex: ${(props) => (props.fullWidth ? 1 : 0.47)};
  border-radius: 10px;
  justify-content: center;
  align-items: center;
`;

const NextButton = styled.TouchableOpacity`
  background-color: ${colors.lightBlue};
  height: 100%;
  flex: 0.47;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
`;

const ChatText = styled.Text`
  font-size: 20px;
  font-family: ${fontFamilies.bold};
  color: white;
`;

const NextText = styled.Text`
  font-size: 20px;
  color: ${colors.mainBlue};
  font-family: ${fontFamilies.bold};
`;

const InnerContent = styled.View`
  flex-direction: row;
`;

const SmallBlackText = styled.Text`
  margin-right: 20px;
  font-family: ${fontFamilies.regular};
`;
