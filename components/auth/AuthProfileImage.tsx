import styled from "styled-components/native";
import React, { useState } from "react";
import { Alert, Platform, View } from "react-native";
import {
  colors,
  fontFamilies,
  GeneralText,
  GreyInfoText,
  MainHeading,
  Text,
} from "../../styles/styles";
import { AuthAction, AuthState } from "./types.d";
import AvatarUri from "../UI/AvatarUri";
import * as ImagePicker from "react-native-image-picker";
import { authDispatcher } from "../../lib/auth/AuthDispatcher";
import { Permission } from "../../lib/helpers/permission";
import { RESULTS } from "react-native-permissions";
import FullScreenLoader from "../UI/FullScreenLoader";

interface Props {
  state: AuthState;
  dispatch: React.Dispatch<AuthAction>;
}

export default function AuthProfileImage({ state, dispatch }: Props) {
  const [loading, setLoading] = useState(false);
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
            "사진 최대 용량을 초과했습니다. 사진 용량은 최대 10MB입니다."
          );
        } else {
          const file = {
            type: "image/jpeg",
            uri: result.assets[0].uri,
            name: result.assets[0].fileName,
          };
          authDispatcher.dispatchProfileImg(
            file,
            result.assets[0].uri,
            dispatch
          );
        }
      }
    } else {
      if (Platform.OS === "ios") {
        Alert.alert(
          "'모든 사진에 대한 접근 허용'이 필요합니다. 설정 > 케빈의 클럽 > 사진 > 모든 사진 허용으로 바꿔주세요~"
        );
      } else {
        Alert.alert("사진 접근 허용부탁드립니다~");
      }
    }
    setLoading(false);
  };

  return (
    <Container showsVerticalScrollIndicator={false}>
      <MainHeading style={{ marginTop: 20 }}>마지막! 프로필 사진</MainHeading>
      <InfoText>꼭! 프로필 가이드를 준수한 사진을 올려주세요!</InfoText>
      <AvatarContainer onPress={fileHandle}>
        <AvatarUri size={100} source={state.profileImgUrl} />
        <AvatarText>프로필 사진 업로드하기</AvatarText>
      </AvatarContainer>
      <MainInstText># 프로필 사진 예시</MainInstText>
      <SubInstText>
        관심사를 즐기는 사진 / 좋아하는 공간에서 찍은 사진 / 라이프 스타일이
        보여지는 사진 / 친구들과 함께 찍은 사진 등등 자유롭게!
      </SubInstText>
      {loading && <FullScreenLoader notFullScreen />}
    </Container>
  );
}

const Container = styled.ScrollView`
  background-color: ${colors.white};
  padding: 15px;
  flex: 1;
`;
const AvatarContainer = styled.TouchableOpacity`
  align-items: center;
  margin: 20px;
`;
const InfoText = styled(GreyInfoText)`
  margin-top: 18px;
`;

const AvatarText = styled(GeneralText)`
  color: ${colors.vividBlue};
  font-family: ${fontFamilies.bold};
  margin-top: 12px;
`;

const MainInstText = styled(GeneralText)`
  color: ${colors.midGrey};
  font-family: ${fontFamilies.bold};
  margin-top: 16px;
`;

const SubInstText = styled(GeneralText)`
  color: ${colors.bareGrey};
  font-family: ${fontFamilies.medium};
  margin-top: 15px;
  font-size: 13px;
  line-height: 17px;
`;
