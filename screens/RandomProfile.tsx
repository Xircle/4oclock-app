import styled from "styled-components/native";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { UserProfile, UserData, GetMyRooms } from "../lib/api/types";
import { useDB } from "../lib/RealmDB";
import { Alert, Dimensions } from "react-native";
import { seeRandomProfile } from "../lib/api/seeRandomProfile";
import { AgeNumberToString, TOKEN } from "../lib/utils";
import AvatarUri from "../components/UI/AvatarUri";
import { colors, InfoBox, InfoText } from "../styles/styles";
import { SafeAreaView } from "react-native-safe-area-context";
import Loader from "../components/UI/Loader";

interface Props {}

const { width, height } = Dimensions.get("screen");

export default function RandomProfile(props: Props) {
  const [isYkClub, SetIsYkClub] = useState<boolean>(false);
  const [isYkOnly, SetIsYkOnly] = useState<boolean>(true);
  const [age, setAge] = useState<string>("");
  const realm = useDB();
  const { data: randomProfileData, refetch, isLoading, isFetching } = useQuery<
    UserProfile | undefined
  >(["randomProfile"], () => seeRandomProfile(isYkClub && isYkOnly), {
    retry: 1,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const refetchRandomProfileData = () => {
    refetch();
  };

  useEffect(() => {
    if (!realm.objects("UserSchema")[0].token) {
      Alert.alert("token missing");
    }
  }, []);
  useEffect(() => {
    if (randomProfileData) {
      setAge(AgeNumberToString(randomProfileData.age));
    }
  }, [randomProfileData?.age]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <SafeAreaView
      style={{ flex: 1, alignItems: "center", backgroundColor: colors.bgColor }}
    >
      <SInfoBox>
        <SInfoText>
          연고이팅을 가입한 친구들과 소통할 수 있는 탭이에요!
        </SInfoText>
      </SInfoBox>
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
            <SmallBlackText>{randomProfileData?.personality}</SmallBlackText>
          </InnerContent>
          <ShortBioText>{randomProfileData?.shortBio}</ShortBioText>
          <GraySubText>
            {randomProfileData?.location
              ? randomProfileData?.location
              : "대한민국 어딘가"}{" "}
            / {randomProfileData?.university || "고연이대"} / {age || "나잇살"}{" "}
            /{" "}
            {randomProfileData
              ? randomProfileData.gender === "Male"
                ? "남"
                : "여"
              : "남성역"}
          </GraySubText>
        </InnerContainer>
      </Container>
      <ButtonContainer>
        <ChatButton>
          <ChatText>채팅하기</ChatText>
        </ChatButton>
        <NextButton>
          <NextText onPress={refetchRandomProfileData}>다음 친구보기</NextText>
        </NextButton>
      </ButtonContainer>
    </SafeAreaView>
  );
}

const Container = styled.View`
  flex: 0.9;
  justify-content: center;
  align-items: center;
  width: 90%;
`;

const InnerContent = styled.View`
  flex-direction: row;
`;

const SmallBlackText = styled.Text`
  margin-right: 20px;
`;

const SInfoBox = styled(InfoBox)`
  margin-top: 30px;
  width: ${width * 0.9 + "px"};
`;

const SInfoText = styled(InfoText)``;

const BigBlackText = styled.Text`
  color: ${colors.black};
  font-size: 30px;
  font-weight: 600;
  margin-top: 30px;
`;

const MidGreyText = styled.Text`
  font-size: 17px;
  font-weight: 500;
  color: #8c94a4;
  margin: 10px 0px;
`;

const InnerContainer = styled.View`
  width: 100%;
`;

const GraySubText = styled.Text`
  font-size: 17px;
  color: #8c94a4;
`;

const ShortBioText = styled.Text`
  font-size: 16px;
  font-weight: 300;
  color: rgb(18, 18, 29);
  margin: 20px 0px;
`;

const ButtonContainer = styled.View`
  flex: 0.1;
  width: ${width * 0.9 + "px"};
  flex-direction: row;
  justify-content: space-between;
`;

const ChatButton = styled.TouchableOpacity`
  background-color: ${colors.mainBlue};
  height: 100%;
  flex: 0.47;
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
  font-weight: 800;
  color: white;
`;

const NextText = styled.Text`
  font-size: 20px;
  font-weight: 800;
  color: ${colors.mainBlue};
`;
