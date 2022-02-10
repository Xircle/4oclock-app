import styled from "styled-components/native";
import React, { useState } from "react";
import {
  TouchableOpacity,
  ScrollView,
  Alert,
  Platform,
  Dimensions,
  View,
} from "react-native";
import MyBackButton from "../UI/MyBackButton";
import { Ionicons } from "@expo/vector-icons";
import {
  BlackLabel,
  colors,
  GeneralText,
  MainHeading,
  SubHeading,
} from "../../styles/styles";
import { ActivityAction, ActivityState } from "../../lib/activity/ActivityReducer";
import * as ImagePicker from "react-native-image-picker";
import { activityDispatcher } from "../../lib/activity/ActivityDispatcher";
import { Permission } from "../../lib/helpers/permission";
import { RESULTS } from "react-native-permissions";
import FullScreenLoader from "../UI/FullScreenLoader";

interface Props {
  onBackPressed: () => void;
  state: ActivityState;
  dispatch: React.Dispatch<ActivityAction>;
}

const { width } = Dimensions.get("window");

export default function CreatePlaceStage2({
  onBackPressed,
  dispatch,
  state,
}: Props) {
  const [loading, setLoading] = useState(false);
  const ImageHandle = async () => {
    setLoading(true);
    const permission =
      Platform.OS === "ios"
        ? await Permission.askPhotoIos()
        : await Permission.askPhotoAndroid();
    if (permission === RESULTS.GRANTED) {
      const option: ImagePicker.ImageLibraryOptions = {
        mediaType: "photo",
        selectionLimit: 0,
        quality: 0.5,
      };

      const result = await ImagePicker.launchImageLibrary(option);

      if (result.errorMessage) {
        Alert.alert(result.errorMessage);
      } else if (!result.didCancel && result?.assets) {
        let coverImageFile;
        let subImgeFiles = [];
        result.assets.map((item, index) => {
          if (!state.coverImage && index === 0) {
            coverImageFile = {
              type: "image/jpeg",
              uri: item.uri,
              name: item.fileName,
            };
          } else {
            subImgeFiles.push({
              type: "image/jpeg",
              uri: item.uri,
              name: item.fileName,
            });
          }
        });
        if (!state.coverImage)
          activityDispatcher.dispatchCoverImage(coverImageFile, dispatch);
        activityDispatcher.dispatchSubImages(
          state.subImages,
          subImgeFiles,
          dispatch
        );
      }
    } else {
      if (Platform.OS === "ios") {
        Alert.alert(
          "'모든 사진에 대한 접근 허용'이 필요합니다. 설정 > 연고이팅 > 사진 > 모든 사진 허용으로 바꿔주세요~"
        );
      } else {
        Alert.alert("'모든 사진에 대한 접근 허용'이 필요합니다.");
      }
    }
    setLoading(false);
  };

  const deleteCoverImage = () => {
    if (state.subImages) {
      activityDispatcher.dispatchCoverImage(state.subImages[0], dispatch);
      activityDispatcher.removeSubImagesByIndex(state.subImages, 0, dispatch);
    } else {
      activityDispatcher.dispatchCoverImage(undefined, dispatch);
    }
  };

  // @ts-ignore
  const deleteSingleSubImage = (toRemove: File) => {
    activityDispatcher.removeSubImagesByFile(
      state.subImages,
      toRemove,
      dispatch
    );
  };

  return (
    <Container>
      <TouchableOpacity onPress={onBackPressed}>
        <MyBackButton color={colors.black} />
      </TouchableOpacity>
      <ScrollView showsVerticalScrollIndicator={false}>
        <MainHeading>모임을 열어볼까?</MainHeading>
        <SubHeading style={{ marginTop: 20, marginBottom: 20 }}>
          재밌는 모임을 열어볼까? 열고 친구들과 꿀잼 모임😊{"\n"}
          {"\n"}
          놀러가는 곳에 관한 장소 사진을 올려줘!
        </SubHeading>

        <SBlackLabel>관련 사진 올리기</SBlackLabel>
        <AddPhotoContiner onPress={ImageHandle}>
          <AddPhotoWrapper>
            <Ionicons name="camera-outline" size={42} color="#A7B0C0" />
            <AddPhotoText>사진추가</AddPhotoText>
          </AddPhotoWrapper>
        </AddPhotoContiner>
        <PhotoContainer space={3}>
          {state.coverImage && (
            <PhotoButton onPress={deleteCoverImage}>
              <Photo source={{ uri: state.coverImage?.uri }} space={3} />
              <Ionicons
                name="close-circle"
                color={colors.bgColor}
                style={{ position: "absolute", right: 0, top: 0 }}
                size={22}
              />
            </PhotoButton>
          )}
          {state.subImages?.length > 0 &&
            state.subImages.map((item, index) => {
              return (
                <PhotoButton
                  onPress={() => {
                    deleteSingleSubImage(item);
                  }}
                  key={index}
                >
                  <Photo source={{ uri: item.uri }} space={3} />
                  <Ionicons
                    name="close-circle"
                    color={colors.bgColor}
                    style={{ position: "absolute", right: 0, top: 0 }}
                    size={22}
                  />
                </PhotoButton>
              );
            })}
        </PhotoContainer>
        <View style={{ height: 150 }} />
      </ScrollView>
      {loading && <FullScreenLoader />}
    </Container>
  );
}

const PhotoButton = styled.TouchableOpacity`
  position: relative;
`;

const PhotoContainer = styled.View<{ space: number }>`
  margin-top: 22px;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const Photo = styled.Image<{ space: boolean }>`
  width: ${(props) => (width - props.space * 2 - 60) / 3 + "px"};
  height: ${(props) => (width - props.space * 2 - 60) / 3 + "px"};
  margin-bottom: ${(props) => props.space + "px"};
`;

const Container = styled.View`
  flex: 1;
  padding: 0px 30px;
`;

const SBlackLabel = styled(BlackLabel)``;

const AddPhotoContiner = styled.TouchableOpacity`
  margin-top: 22px;
`;

const AddPhotoWrapper = styled.View`
  width: 100%;
  background-color: #f9f9f9;
  height: 200px;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

const AddPhotoText = styled(GeneralText)`
  margin-left: 20px;
  font-size: 18px;
`;
