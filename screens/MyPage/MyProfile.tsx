import styled from "styled-components/native";
import React, { useEffect, useState } from "react";
import { BigTextInput, colors, Label } from "../../styles/styles";
import MainButtonWBg from "../../components/UI/MainButtonWBg";
import { Dimensions, ScrollView } from "react-native";
import AvatarUri from "../../components/UI/AvatarUri";
import { useQuery } from "react-query";
import { UserData } from "../../lib/api/types";
import { getUser } from "../../lib/api/getUser";
import RNPickerSelect from "react-native-picker-select";

interface Props {}

export interface ProfileData {
  username?: string;
  shortBio?: string;
  //@ts-ignore
  profileImageFile?: File;
  profileImageUrl?: string;
  job?: string;
  location?: string;
  activities?: string;
  gender?: string;
  isYkClub?: boolean;
  MBTI?: string;
  drinkingStyle?: number;
  personality?: string;
}

const { width } = Dimensions.get("screen");

export default function MyProfile(props: Props) {
  const [localProfileData, setLocalProfileData] = useState<ProfileData>({});

  const { data: userData, isLoading, isSuccess } = useQuery<
    UserData | undefined
  >("userProfile", () => getUser(), {
    retry: 2,
  });

  useEffect(() => {
    if (isSuccess) {
      setLocalProfileData({
        username: userData?.username,
        shortBio: userData?.shortBio,
        job: userData?.job,
        profileImageUrl: userData?.profileImageUrl,
        location: userData?.location,
        activities: userData?.activities,
        gender: userData?.gender,
        isYkClub: userData?.isYkClub,
        MBTI: userData?.MBTI,
        personality: userData?.personality,
        drinkingStyle: userData?.drinkingStyle,
      });
    }
  }, [isSuccess]);

  useEffect(() => {
    console.log(localProfileData);
  }, [localProfileData]);
  return (
    <Container>
      <ScrollView>
        <InnerContainer>
          <AvatarWrapper>
            <AvatarUri
              source={localProfileData.profileImageUrl}
              size={width * 0.5}
            />
            <ChangeProfilePicText>프로필사진 수정하러가기</ChangeProfilePicText>
          </AvatarWrapper>
          <DetailContainer>
            <InfoText>
              학교와 나이, 성별 변경은 불가해요. 수정을 원하실 경우 마이페이지{" "}
              {">"} 문의하기 마이페이지에서 상담원에게 문의해주세요!
            </InfoText>
            <SLabel>닉네임</SLabel>
            <SBigTextInput placeholder="USERNAME" autoCapitalize="none" />
            <SLabel>MBTI</SLabel>
            <RNPickerSelect
              onValueChange={(value) => console.log(value)}
              items={[
                { label: "Football", value: "football" },
                { label: "Baseball", value: "baseball" },
                { label: "Hockey", value: "hockey" },
              ]}
            />
            <SLabel>계열이나 직업</SLabel>
            <SBigTextInput placeholder="USERNAME" autoCapitalize="none" />
          </DetailContainer>
        </InnerContainer>
      </ScrollView>
      <MainButtonWBg></MainButtonWBg>
    </Container>
  );
}

const SLabel = styled(Label)`
  margin-top: 20px;
`;

const SBigTextInput = styled(BigTextInput)`
  margin-top: 20px;
`;

const InnerContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Container = styled.View`
  position: relative;
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${colors.bgColor};
`;

const AvatarWrapper = styled.TouchableOpacity`
  margin: 30px 0px;
  align-items: center;
`;

const ChangeProfilePicText = styled.Text`
  padding-top: 15px;
  color: ${colors.mainBlue};
  font-weight: bold;
  font-size: 18px;
`;

const DetailContainer = styled.View`
  width: 90%;
`;
const InfoContainer = styled.View``;
const InfoText = styled.Text`
  line-height: 14px;
  font-size: 12px;
  color: ${colors.bareGrey};
`;
