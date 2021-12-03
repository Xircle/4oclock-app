import styled from "styled-components/native";
import React, { useEffect, useState } from "react";
import {
  BigTextInput,
  colors,
  ErrorMessage,
  fontFamilies,
  GreyLabel,
  TextArea,
} from "../../styles/styles";
import MainButtonWBg from "../../components/UI/MainButtonWBg";
import {
  Alert,
  Dimensions,
  Platform,
  ScrollView,
  View,
} from "react-native";
import AvatarUri from "../../components/UI/AvatarUri";
import { useMutation, useQuery } from "react-query";
import { UserData } from "../../lib/api/types";
import { getUser } from "../../lib/api/getUser";
import _ from "lodash";
import MySelect from "../../components/UI/MySelect";
import SelectButton from "../../components/UI/SelectButton";
import diff from "object-diff";
import { useNavigation } from "@react-navigation/native";
import { editProfile } from "../../lib/api/editProfile";
import * as ImagePicker from "react-native-image-picker";
import Loader from "../../components/UI/Loader";
import {
  DrinkingStyles,
  IndexToMBTI,
  MBTIs,
  MBTIToIndex,
} from "../../lib/SelectData";
import { Permission } from "../../lib/helpers/permission";
import { RESULTS } from "react-native-permissions";

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
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const [isYK, setIsYK] = useState(false);
  const [localProfileData, setLocalProfileData] = useState<ProfileData>({});
  const [localValidation, setLocalValidation] = useState<boolean[]>([
    true,
    true,
    true,
    true,
  ]);

  const errorMessages: string[] = [
    "20자 이하의 이름을 입력해주세요",
    "200자 이하의 계열이나 직업을 입력해주세요",
    "1000자 이하의 자기소개를 입력해주세요",
    "200자 이하의 성격이나 스타일을 입력해주세요",
  ];

  const { data: userData, isFetching, isSuccess, refetch } = useQuery<
    UserData | undefined
  >(["userProfile"], () => getUser(), {
    retry: 2,
  });
  const { mutateAsync: mutateUserProfile, isLoading: isUpdating } = useMutation(
    editProfile
  );

  const Refetch = async () => {
    await refetch();
  };

  const updateProfile = async () => {
    setLoading(true);
    const trimedProfileData = Object.keys(localProfileData).reduce(
      (acc, curr) => {
        if (
          typeof localProfileData[curr] === "string" &&
          localProfileData[curr] !== "profileImageUrl"
        ) {
          acc[curr] = localProfileData[curr].trim();
        } else {
          acc[curr] = localProfileData[curr];
        }

        return acc;
      },
      {}
    );
    const editedProfileData: ProfileData = diff(userData, trimedProfileData);
    if (_.isEqual(editedProfileData, {}))
      return Alert.alert("프로필을 수정해주세요");
    const { data } = await mutateUserProfile({
      ...editedProfileData,
    });
    setLoading(false);
    if (!data.ok) return Alert.alert(data.error);
    await Refetch();
    Alert.alert("프로필 편집 성공했습니다");
    navigation.goBack();
  };

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
      if (userData?.isYkClub) {
        setIsYK(userData?.isYkClub);
      }
    }
  }, [isSuccess]);

  const fileHandle = async () => {
    const permission =
      Platform.OS === "ios"
        ? await Permission.askPhotoIos()
        : await Permission.askPhotoAndroid();
    console.log(permission);
    if (permission === RESULTS.GRANTED) {
      const option: ImagePicker.ImageLibraryOptions = {
        mediaType: "photo",
        includeBase64: true,
      };
      const result = await ImagePicker.launchImageLibrary(option);
      //console.log(result);
      if (result.errorMessage) {
        return Alert.alert(result.errorMessage);
      } else if (!result.didCancel && result?.assets?.[0].uri) {
        if (result.assets?.[0].fileSize > 10000000) {
          return Alert.alert(
            "사진 최대 용량을 초과했습니다. 사진 용량은 최대 10MB입니다."
          );
        } else {
          const file = {
            type: "image/jpeg",
            uri: result.assets[0].uri,
            name: result.assets[0].fileName,
          };
          setLocalProfileData((prev) => ({
            ...prev,
            profileImageFile: file,
          }));
          setLocalProfileData((prev) => ({
            ...prev,
            profileImageUrl: result.assets[0].uri,
          }));
        }
      }
    } else {
      Alert.alert("뭔가 잘못됐군,,,,");
    }
  };

  const handleNameChange = (text: string) => {
    if (text.length <= 0 || text.length >= 20) {
      setLocalValidation([
        false,
        localValidation[1],
        localValidation[2],
        localValidation[3],
      ]);
    } else {
      setLocalValidation([
        true,
        localValidation[1],
        localValidation[2],
        localValidation[3],
      ]);
    }
    setLocalProfileData((prev) => ({
      ...prev,
      username: text,
    }));
  };
  const handleJobChange = (text: string) => {
    if (text.length > 0 && text.length < 255) {
      setLocalValidation([
        localValidation[0],
        true,
        localValidation[2],
        localValidation[3],
      ]);
    } else {
      setLocalValidation([
        localValidation[0],
        false,
        localValidation[2],
        localValidation[3],
      ]);
    }
    setLocalProfileData((prev) => ({
      ...prev,
      job: text,
    }));
  };

  const handleBioChange = (text: string) => {
    if (text.length > 0 && text.length < 1023) {
      setLocalValidation([
        localValidation[0],
        localValidation[1],
        true,
        localValidation[3],
      ]);
    } else {
      setLocalValidation([
        localValidation[0],
        localValidation[1],
        false,
        localValidation[3],
      ]);
    }
    setLocalProfileData((prev) => ({
      ...prev,
      shortBio: text,
    }));
  };

  const handlePersonalityChange = (text: string) => {
    if (text.length > 0 && text.length < 255) {
      setLocalValidation([
        localValidation[0],
        localValidation[1],
        localValidation[2],
        true,
      ]);
    } else {
      setLocalValidation([
        localValidation[0],
        localValidation[1],
        localValidation[2],
        false,
      ]);
    }
    setLocalProfileData((prev) => ({
      ...prev,
      personality: text,
    }));
  };

  if (isFetching || loading) return <Loader />;
  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        <InnerContainer>
          <AvatarWrapper onPress={fileHandle}>
            <AvatarUri
              source={localProfileData.profileImageUrl}
              size={width * 0.5}
            />
            <ChangeProfilePicText>프로필사진 수정하기</ChangeProfilePicText>
          </AvatarWrapper>
          <DetailContainer>
            <InfoText>
              학교와 나이, 성별 변경은 불가해요. 수정을 원하실 경우 마이페이지{" "}
              {">"} 문의하기 마이페이지에서 상담원에게 문의해주세요!
            </InfoText>
            <SLabel>닉네임</SLabel>
            <SBigTextInput
              placeholder="USERNAME"
              autoCapitalize="none"
              defaultValue={
                localProfileData.username ? localProfileData.username : ""
              }
              onChange={(event) => {
                const { eventCount, target, text } = event.nativeEvent;
                handleNameChange(text);
              }}
            />
            {!localValidation[0] && (
              <ErrorMessage>{errorMessages[0]}</ErrorMessage>
            )}
            <SLabel>MBTI</SLabel>
            <MySelect
              data={MBTIs}
              onSelect={(selectedItem, index) => {
                setLocalProfileData((prev) => ({
                  ...prev,
                  MBTI: IndexToMBTI[index],
                }));
              }}
              width={width * 0.81}
              defaultButtonText="MBTI를 설정해주세요"
              defaultValueByIndex={MBTIToIndex[localProfileData.MBTI]}
            />
            <SLabel>계열이나 직업</SLabel>
            <SBigTextInput
              placeholder="ex. 새내기 / 스타트업 마케터 / AI중독 문과생..."
              autoCapitalize="none"
              defaultValue={localProfileData.job ? localProfileData.job : ""}
              onChange={(event) => {
                const { eventCount, target, text } = event.nativeEvent;
                handleJobChange(text);
              }}
            />
            {!localValidation[1] && (
              <ErrorMessage>{errorMessages[1]}</ErrorMessage>
            )}
            <SLabel>간단한 자기소개</SLabel>
            <STextArea
              placeholder="ex. 미대에 다니는 다양한 삶을 살고 싶어하는 미개봉화석^^
              요즘 스타트업에 관심이 생겨서 관련하신 분들과 이야기하면 좋을 것 같아요ㅎㅎ"
              autoCapitalize="none"
              multiline={true}
              defaultValue={
                localProfileData.shortBio ? localProfileData.shortBio : ""
              }
              onChange={(event) => {
                const { eventCount, target, text } = event.nativeEvent;
                handleBioChange(text);
              }}
            />
            {!localValidation[2] && (
              <ErrorMessage>{errorMessages[2]}</ErrorMessage>
            )}
            <SLabel>성격이나 스타일</SLabel>
            <STextArea
              placeholder="ex. 친해지면 말 많아요 / 드립력 상 / 조용하고 이야기 잘 들어줘요 / 연락, 답장이 빨라요"
              autoCapitalize="none"
              multiline={true}
              defaultValue={
                localProfileData.personality ? localProfileData.personality : ""
              }
              onChange={(event) => {
                const { eventCount, target, text } = event.nativeEvent;
                handlePersonalityChange(text);
              }}
            />
            {!localValidation[3] && (
              <ErrorMessage>{errorMessages[3]}</ErrorMessage>
            )}
            <SLabel>음주 스타일</SLabel>
            <MySelect
              data={DrinkingStyles}
              onSelect={(_, index) => {
                setLocalProfileData((prev) => ({
                  ...prev,
                  drinkingStyle: index,
                }));
              }}
              width={width * 0.81}
              defaultButtonText="음주 스타일을 설정해주세요"
              defaultValueByIndex={localProfileData.drinkingStyle}
            />
            <SLabel>혹시 맛집 동아리 연고이팅 회원이신가요?</SLabel>
            <YKButton
              onPress={() => {
                setIsYK((prev) => !prev);
                setLocalProfileData((prev) => ({
                  ...prev,
                  isYkClub: !isYK,
                }));
              }}
            >
              <SelectButton marginRight={15} selected={isYK} />
              <SLabel style={{ marginTop: 0 }}>예</SLabel>
            </YKButton>
            <View style={{ height: 150 }} />
          </DetailContainer>
        </InnerContainer>
      </ScrollView>
      <MainButtonWBg
        onPress={updateProfile}
        disabled={localValidation.includes(false)}
        title={"수정하기"}
      ></MainButtonWBg>
    </Container>
  );
}

const YKButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  margin-top: 20px;
`;

const SLabel = styled(GreyLabel)`
  margin-top: 20px;
`;

const SBigTextInput = styled(BigTextInput)`
  margin-top: 20px;
  max-width: 100%;
`;

const STextArea = styled(TextArea)`
  margin-top: 20px;
  max-width: 100%;
  height: 120px;
  max-height: 150px;
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
  font-family: ${fontFamilies.bold};
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
  font-family: ${fontFamilies.regular};
`;
