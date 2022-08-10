import styled from "styled-components/native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native";
import { colors } from "../styles/styles";
import { useQuery } from "react-query";
import { GetEventBannersOutput, UserData } from "../lib/api/types";
import MainTopCarousel from "../components/UI/MainTopCarousel";
import { getEventBanners } from "../lib/api/getEventBanners";
import HeaderPureComponent from "../components/shared/HeaderPureComponent";
import { getUser } from "../lib/api/getUser";
import { useNavigation } from "@react-navigation/native";
import MainTopTabNav from "../navigators/MainTopTabNav";

interface Props {}

function Main(props: Props) {
  const navigation = useNavigation();
  //console.log("Main Render");

  const { data: userData } = useQuery<UserData | undefined>(
    ["userProfile"],
    () => getUser(),
    {}
  );

  const { data: eventBannerData, isLoading: evenBannerLoading } =
    useQuery<GetEventBannersOutput>(
      ["eventBanner"],
      () => getEventBanners(),
      {}
    );

  useEffect(() => {
    if (userData?.accountType === "Banned") {
      navigation.reset({
        index: 0,
        // @ts-ignore
        routes: [{ name: "BannedScreen" }],
      });
    }
  }, [userData?.accountType]);

  return (
    <SafeAreaView style={{ backgroundColor: colors.bgColor, flex: 1 }}>
      <Container>
        <HeaderPureComponent />
        <MainTopCarousel eventBanners={eventBannerData?.eventBanners} />
        <MainTopTabNav />
      </Container>
    </SafeAreaView>
  );
}

export default React.memo(Main);

const Container = styled.View`
  flex: 1;
  background-color: ${colors.bgColor};
`;
