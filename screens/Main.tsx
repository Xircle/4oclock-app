import styled from "styled-components/native";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Dimensions, Animated, SafeAreaView, View } from "react-native";
import { colors, fontFamilies, GeneralText } from "../styles/styles";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";
import {
  GetEventBannersOutput,
  GetPlacesByLocationOutput,
  UserData,
} from "../lib/api/types";
import {
  getPlacesEvent,
  getPlacesLightning,
  getPlacesRegular,
} from "../lib/api/getPlaces";
import Loader from "../components/UI/Loader";
import MainFlatListPlace from "../components/main/MainFlatListPlace";
import MainTopCarousel from "../components/UI/MainTopCarousel";
import { getEventBanners } from "../lib/api/getEventBanners";
import MainFeed from "../components/main/MainFeed";
import HeaderPureComponent from "../components/shared/HeaderPureComponent";
import { getUser } from "../lib/api/getUser";
import { useNavigation } from "@react-navigation/native";
import messaging from "@react-native-firebase/messaging";
import { updateFirebaseToken } from "../lib/api/updateFirebaseToken";
import MainTopTabNav from "../navigators/MainTopTabNav";
import {
  renderItemLightning,
  renderRegular,
} from "../components/main/MainRenderItems";

interface Props {}

const { width, height } = Dimensions.get("window");

export default function Main(props: Props) {
  const navigation = useNavigation();

  const { mutateAsync: mutateUpdateFirebaseToken } =
    useMutation(updateFirebaseToken);

  const { data: userData } = useQuery<UserData | undefined>(
    ["userProfile"],
    () => getUser(),
    {
      retry: 1,
    }
  );

  const { data: eventBannerData, isLoading: evenBannerLoading } =
    useQuery<GetEventBannersOutput>(["eventBanner"], () => getEventBanners(), {
      retry: 1,
    });

  useEffect(() => {
    if (userData?.accountType === "Banned") {
      navigation.reset({
        index: 0,
        routes: [{ name: "BannedScreen" }],
      });
    }
  }, [userData]);

  useEffect(() => {
    messaging()
      .getToken()
      .then((token) => {
        mutateUpdateFirebaseToken(token);
      });
  }, []);

  return (
    <SafeAreaView style={{ backgroundColor: colors.bgColor, flex: 1 }}>
      <Container>
        {/* <HeaderPureComponent onPress={() => {}} /> */}
        <MainTopCarousel eventBanners={eventBannerData?.eventBanners} />
        <MainTopTabNav />
      </Container>
    </SafeAreaView>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: ${colors.bgColor};
`;
