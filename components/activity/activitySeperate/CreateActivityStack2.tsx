import styled from "styled-components/native";
import React, { useState } from "react";
import {
  BlackLabel,
  CASContainer,
  colors,
  GeneralText,
  MainHeading,
  SubHeading,
} from "../../../styles/styles";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { RootState } from "../../../lib/reducers";
import AbsoluteMainButtonWBg from "../../UI/AbsoluteMainButtonWBg";
import { activityDispatcher } from "../../../lib/activity/ActivityDispatcher";
import { useDispatch } from "react-redux";
import { Alert, Dimensions, Platform, ScrollView, View } from "react-native";
import { Permission } from "../../../lib/helpers/permission";
import * as ImagePicker from "react-native-image-picker";
import { RESULTS } from "react-native-permissions";
import FullScreenLoader from "../../UI/FullScreenLoader";
import { Ionicons } from "@expo/vector-icons";
import FastImage from "react-native-fast-image";

interface Props {
  role?: string;
  modify?: boolean;
}

const { width } = Dimensions.get("window");

export default function CreateActivityStack2({}: Props) {
  const { coverImage, subImages, participating } = useSelector(
    (state: RootState) => state.activityReducer
  );
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const nextHandler = () => {
    // @ts-ignore
    navigation.navigate("CAS3", {});
  };

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
          if (!coverImage && index === 0) {
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
        if (!coverImage)
          activityDispatcher.dispatchCoverImage(coverImageFile, dispatch);
        activityDispatcher.dispatchSubImages(subImages, subImgeFiles, dispatch);
      }
    } else {
      if (Platform.OS === "ios") {
        Alert.alert(
          "'?????? ????????? ?????? ?????? ??????'??? ???????????????. ?????? > ???????????? > ?????? > ?????? ?????? ???????????? ???????????????~"
        );
      } else {
        Alert.alert("'?????? ????????? ?????? ?????? ??????'??? ???????????????.");
      }
    }
    setLoading(false);
  };

  const deleteCoverImage = () => {
    if (subImages) {
      activityDispatcher.dispatchCoverImage(subImages[0], dispatch);
      activityDispatcher.removeSubImagesByIndex(subImages, 0, dispatch);
    } else {
      activityDispatcher.dispatchCoverImage(undefined, dispatch);
    }
  };

  // @ts-ignore
  const deleteSingleSubImage = (toRemove: File) => {
    activityDispatcher.removeSubImagesByFile(subImages, toRemove, dispatch);
  };

  return (
    <CASContainer>
      <ScrollView showsVerticalScrollIndicator={false}>
        <MainHeading>????????? ?????????~</MainHeading>
        <SubHeading style={{ marginTop: 20, marginBottom: 20 }}>
          ????????? ??????, ??????, ?????? ?????? ?????? ??????
        </SubHeading>
        <ParticipatingContainer
          onPress={() =>
            activityDispatcher.dispatchParticipating(!participating, dispatch)
          }
        >
          <ParticipatingWrapper>
            <Ionicons
              name="checkmark-circle-outline"
              size={22}
              color={participating ? colors.mainBlue : colors.bareGrey}
            />
            <BlackLabel style={{ marginLeft: 10 }}>?????? ????????????</BlackLabel>
          </ParticipatingWrapper>
        </ParticipatingContainer>

        <BlackLabel>?????? ?????? ?????????</BlackLabel>
        <AddPhotoContiner onPress={ImageHandle}>
          <AddPhotoWrapper>
            <Ionicons name="camera-outline" size={42} color="#A7B0C0" />
            <AddPhotoText>????????????</AddPhotoText>
          </AddPhotoWrapper>
        </AddPhotoContiner>
        <PhotoContainer space={3}>
          {coverImage && (
            <PhotoButton onPress={deleteCoverImage}>
              <Photo source={{ uri: coverImage?.uri }} space={3} />
              <Ionicons
                name="close-circle"
                color={colors.bgColor}
                style={{ position: "absolute", right: 0, top: 0 }}
                size={22}
              />
            </PhotoButton>
          )}
          {subImages?.length > 0 &&
            subImages.map((item, index) => {
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
      <AbsoluteMainButtonWBg
        onPress={nextHandler}
        disabled={!coverImage}
        title={"??????"}
      />
    </CASContainer>
  );
}

const ParticipatingContainer = styled.TouchableWithoutFeedback``;

const ParticipatingWrapper = styled.View`
  flex-direction: row;
  margin-top: 10px;
  margin-bottom: 10px;
  align-items: center;
`;

const PhotoButton = styled.TouchableOpacity`
  position: relative;
`;

const PhotoContainer = styled.View<{ space: number }>`
  margin-top: 22px;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const Photo = styled(FastImage)<{ space: number }>`
  width: ${(props) => (width - props.space * 2 - 60) / 3 + "px"};
  height: ${(props) => (width - props.space * 2 - 60) / 3 + "px"};
  margin-bottom: ${(props) => props.space + "px"};
`;

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
