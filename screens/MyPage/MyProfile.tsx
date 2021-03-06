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
import AbsoluteMainButtonWBg from "../../components/UI/AbsoluteMainButtonWBg";
import { Alert, Dimensions, Platform, ScrollView, View } from "react-native";
import AvatarUri from "../../components/UI/AvatarUri";
import { useMutation, useQuery } from "react-query";
import { TeamData, UserData } from "../../lib/api/types";
import { getUser } from "../../lib/api/getUser";
import _ from "lodash";
import MySelect from "../../components/UI/MySelect";
import diff from "object-diff";
import { useNavigation } from "@react-navigation/native";
import { editProfile } from "../../lib/api/editProfile";
import * as ImagePicker from "react-native-image-picker";
import {
  DrinkingStyles,
  IndexToMBTI,
  MBTIs,
  MBTIToIndex,
} from "../../lib/SelectData";
import { Permission } from "../../lib/helpers/permission";
import { RESULTS } from "react-native-permissions";
import FullScreenLoader from "../../components/UI/FullScreenLoader";
import MyKeyboardAvoidingView from "../../components/UI/MyKeyboardAvoidingView";
import { getTeams } from "../../lib/api/getTeams";

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
  team?: string;
}

export interface EditProfileData extends ProfileData {
  code?: string;
}

const { width } = Dimensions.get("window");

export default function MyProfile(props: Props) {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const [isYK, setIsYK] = useState(false);
  const [localProfileData, setLocalProfileData] = useState<EditProfileData>({});
  const [localValidation, setLocalValidation] = useState<boolean[]>([
    true,
    true,
    true,
    true,
  ]);
  const [localTeamNames, setLocalTeamNames] = useState<string[]>([]);
  const [localMyTeam, setLocalMyTeam] = useState("");

  const errorMessages: string[] = [
    "20??? ????????? ????????? ??????????????????",
    "200??? ????????? ???????????? ????????? ??????????????????",
    "1000??? ????????? ??????????????? ??????????????????",
    "200??? ????????? ???????????? ???????????? ??????????????????",
  ];
  const { data: teamsData } = useQuery<TeamData[] | undefined>(
    ["teams"],
    () => getTeams(),
    {
      retry: 1,
    }
  );
  const {
    data: userData,
    isFetching,
    isSuccess,
    refetch,
  } = useQuery<UserData | undefined>(["userProfile"], () => getUser(), {
    retry: 2,
  });

  const { mutateAsync: mutateUserProfile, isLoading: isUpdating } =
    useMutation(editProfile);

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
    // if (_.isEqual(editedProfileData, {})) {
    //   setLoading(false);
    //   return Alert.alert("???????????? ??????????????????");
    // }
    const { data } = await mutateUserProfile({
      ...trimedProfileData,
    });
    setLoading(false);
    if (!data.ok) return Alert.alert(data.error);
    await Refetch();
    Alert.alert("????????? ?????? ??????????????????");
    navigation.goBack();
  };

  const fileHandle = async () => {
    setLoading(true);
    const permission =
      Platform.OS === "ios"
        ? await Permission.askPhotoIos()
        : await Permission.askPhotoAndroid();
    if (permission === RESULTS.GRANTED) {
      const option: ImagePicker.ImageLibraryOptions = {
        mediaType: "photo",
      };
      const result = await ImagePicker.launchImageLibrary(option);
      if (result.errorMessage) {
        Alert.alert(result.errorMessage);
      } else if (!result.didCancel && result?.assets?.[0].uri) {
        if (result.assets?.[0].fileSize > 10000000) {
          Alert.alert(
            "?????? ?????? ????????? ??????????????????. ?????? ????????? ?????? 10MB?????????."
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
      if (Platform.OS === "ios") {
        Alert.alert(
          "'?????? ????????? ?????? ?????? ??????'??? ???????????????. ?????? > ???????????? > ?????? > ?????? ?????? ???????????? ???????????????~"
        );
      } else {
        Alert.alert("?????? ?????? ????????????????????????~");
      }
    }
    setLoading(false);
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
        team: userData?.team,
      });
      if (userData?.isYkClub) {
        setIsYK(userData?.isYkClub);
      }
    }
  }, [isSuccess]);

  useEffect(() => {
    if (teamsData.length > 0 && localTeamNames.length === 0) {
      teamsData?.forEach((team, index) => {
        setLocalTeamNames((prev) => [...prev, team.name]);
        if (index === teamsData.length - 1) {
          setLocalMyTeam(userData?.team);
        }
      });
    }
  }, [teamsData]);

  return (
    <Container>
      <MyKeyboardAvoidingView>
        <ScrollView showsVerticalScrollIndicator={false}>
          <InnerContainer>
            <AvatarWrapper onPress={fileHandle}>
              <AvatarUri
                source={localProfileData.profileImageUrl}
                size={width * 0.5}
              />
              <ChangeProfilePicText>??????????????? ????????????</ChangeProfilePicText>
            </AvatarWrapper>
            <DetailContainer>
              <InfoText>
                ????????? ??????, ?????? ????????? ????????????. ????????? ????????? ?????? ???????????????{" "}
                {">"} ???????????? ????????????????????? ??????????????? ??????????????????!
              </InfoText>
              <SLabel>?????????</SLabel>
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
                defaultButtonText="MBTI??? ??????????????????"
                defaultValueByIndex={MBTIToIndex[localProfileData.MBTI]}
              />
              <SLabel>???</SLabel>
              <MySelect
                data={localTeamNames}
                onSelect={(selectedItem, index) => {
                  setLocalProfileData((prev) => ({
                    ...prev,
                    team: selectedItem,
                  }));
                }}
                width={width * 0.81}
                defaultButtonText="?????? ??????????????????"
                defaultValue={localMyTeam}
              />
              <SLabel>???????????? ??????</SLabel>
              <SBigTextInput
                placeholder="ex. ????????? / ???????????? ????????? / AI?????? ?????????..."
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
              <SLabel>????????? ????????????</SLabel>
              <STextArea
                placeholder="ex. ????????? ????????? ????????? ?????? ?????? ???????????? ???????????????^^
              ?????? ??????????????? ????????? ????????? ???????????? ????????? ??????????????? ?????? ??? ???????????????"
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
              <SLabel>???????????? ?????????</SLabel>
              <STextArea
                placeholder="ex. ???????????? ??? ????????? / ????????? ??? / ???????????? ????????? ??? ???????????? / ??????, ????????? ?????????"
                autoCapitalize="none"
                multiline={true}
                defaultValue={
                  localProfileData.personality
                    ? localProfileData.personality
                    : ""
                }
                onChange={(event) => {
                  const { eventCount, target, text } = event.nativeEvent;
                  handlePersonalityChange(text);
                }}
              />
              {!localValidation[3] && (
                <ErrorMessage>{errorMessages[3]}</ErrorMessage>
              )}
              <SLabel>?????? ?????????</SLabel>
              <MySelect
                data={DrinkingStyles}
                onSelect={(_, index) => {
                  setLocalProfileData((prev) => ({
                    ...prev,
                    drinkingStyle: index,
                  }));
                }}
                width={width * 0.81}
                defaultButtonText="?????? ???????????? ??????????????????"
                defaultValueByIndex={localProfileData.drinkingStyle}
              />
              <SLabel>???????????? ?????? ??????</SLabel>
              <SBigTextInput
                placeholder="?????? ??????"
                autoCapitalize="none"
                defaultValue={""}
                onChange={(event) => {
                  const { eventCount, target, text } = event.nativeEvent;
                  setLocalProfileData((prev) => ({
                    ...prev,
                    code: text,
                  }));
                }}
              />
              <View style={{ height: 150 }} />
            </DetailContainer>
          </InnerContainer>
        </ScrollView>
      </MyKeyboardAvoidingView>
      <AbsoluteMainButtonWBg
        onPress={updateProfile}
        disabled={localValidation.includes(false)}
        title={"????????????"}
      ></AbsoluteMainButtonWBg>
      {(isFetching || loading) && <FullScreenLoader />}
    </Container>
  );
}

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
const InfoText = styled.Text`
  line-height: 14px;
  font-size: 12px;
  color: ${colors.bareGrey};
  font-family: ${fontFamilies.regular};
`;
