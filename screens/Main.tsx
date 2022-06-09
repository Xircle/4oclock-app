import styled from "styled-components/native";
import React, { useEffect } from "react";
import { Dimensions, SafeAreaView } from "react-native";
import { colors } from "../styles/styles";
import { useMutation, useQuery } from "react-query";
import { GetEventBannersOutput, UserData } from "../lib/api/types";
import MainTopCarousel from "../components/UI/MainTopCarousel";
import { getEventBanners } from "../lib/api/getEventBanners";
import HeaderPureComponent from "../components/shared/HeaderPureComponent";
import { getUser } from "../lib/api/getUser";
import { useNavigation } from "@react-navigation/native";
import messaging from "@react-native-firebase/messaging";
import { updateFirebaseToken } from "../lib/api/updateFirebaseToken";
import MainTopTabNav from "../navigators/MainTopTabNav";

interface Props {}

const { width, height } = Dimensions.get("window");

function Main(props: Props) {
  const navigation = useNavigation();
  console.log("Main Render");

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
        {/* <HeaderPureComponent /> */}
        <MainTopCarousel eventBanners={eventBannerData?.eventBanners} />
        <MainTopTabNav />
      </Container>
    </SafeAreaView>
  );
}

export default Main;

const Container = styled.View`
  flex: 1;
  background-color: ${colors.bgColor};
`;
