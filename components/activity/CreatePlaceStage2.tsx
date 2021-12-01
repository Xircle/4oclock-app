import styled from "styled-components/native";
import React from "react";
import { TouchableOpacity, ScrollView, Alert } from "react-native";
import MyBackButton from "../UI/MyBackButton";
import { Ionicons } from "@expo/vector-icons";
import {
  BlackLabel,
  colors,
  GeneralText,
  MainHeading,
  SubHeading,
} from "../../styles/styles";
import { CreateActivityOutput } from "../../lib/api/types";
import { ActivityAction } from "../../lib/activity/ActivityReducer";
import * as ImagePicker from "react-native-image-picker";
import { activityDispatcher } from "../../lib/activity/ActivityDispatcher";

interface Props {
  onBackPressed: () => void;
  state: CreateActivityOutput;
  dispatch: React.Dispatch<ActivityAction>;
}

export default function CreatePlaceStage2({
  onBackPressed,
  dispatch,
  state,
}: Props) {
  const ImageHandle = async () => {
    const option: ImagePicker.ImageLibraryOptions = {
      mediaType: "photo",
      selectionLimit: 0,
      quality: 0,
    };

    const result = await ImagePicker.launchImageLibrary(option);

    if (result.errorMessage) {
      return Alert.alert(result.errorMessage);
    } else if (!result.didCancel && result?.assets) {
      let coverImageFile;
      let subImgeFiles = [];
      result.assets.map((item, index) => {
        if (index === 0) {
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
      activityDispatcher.dispatchCoverImage(coverImageFile, dispatch);
      activityDispatcher.dispatchSubImages(subImgeFiles, dispatch);
    }
  };

  return (
    <Container>
      <TouchableOpacity onPress={onBackPressed}>
        <MyBackButton color={colors.black} />
      </TouchableOpacity>
      <ScrollView showsVerticalScrollIndicator={false}>
        <MainHeading>모임을 열어볼까?</MainHeading>
        <SubHeading style={{ marginTop: 20, marginBottom: 20 }}>
          재밌는 모임을 열어보자~~ 행복하고 재밌는 모임
        </SubHeading>

        <SBlackLabel>관련 사진 올리기 (3개 이상)</SBlackLabel>
        <AddPhotoContiner onPress={ImageHandle}>
          <AddPhotoWrapper>
            <Ionicons name="camera-outline" size={42} color="#A7B0C0" />
            <AddPhotoText>사진추가</AddPhotoText>
          </AddPhotoWrapper>
        </AddPhotoContiner>
        <PhotoContainer>
          {state.coverImage && (
            <Photo source={{ uri: state.coverImage?.uri }} />
          )}
          {state.subImages?.length > 0 &&
            state.subImages.map((item, index) => {
              return <Photo source={{ uri: item.uri }} key={index} />;
            })}
        </PhotoContainer>
      </ScrollView>
    </Container>
  );
}

const PhotoContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`;

const Photo = styled.Image`
  width: 100px;
  height: 100px;
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
