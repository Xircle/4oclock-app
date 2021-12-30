import styled from "styled-components/native";
import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  Animated,
  View,
  Image,
  FlatList,
  PanResponder,
} from "react-native";
import { colors, fontFamilies, GeneralText, Text } from "../styles/styles";
import { useInfiniteQuery, useQuery, useQueryClient } from "react-query";
import { GetPlacesByLocationOutput, PlaceFeedData } from "../lib/api/types";
import {
  getPlacesEvent,
  getPlacesForCarousel,
  getPlacesLightning,
  getPlacesRegular,
} from "../lib/api/getPlaces";
import TopCarouselPlace from "../components/main/TopCarouselPlace";
import optimizeImage from "../lib/helpers/optimizeImage";
import { PlaceData } from "../lib/api/types.d";
import Loader from "../components/UI/Loader";
import FlatListPlace from "../components/main/FlatListPlace";
import Swiper from "react-native-swiper";
import { SafeAreaView } from "react-native-safe-area-context";

interface Props {}

const { width, height } = Dimensions.get("window");

export default function Main(props: Props) {
  const [middleTabIndex, setMiddleTabIndex] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  const queryClient = useQueryClient();

  // api call
  const { data: topCarouselData, isLoading: topCarouselLoading } = useQuery<
    GetPlacesByLocationOutput | undefined
  >(["places", "전체", "top"], () => getPlacesForCarousel("전체", 1), {
    retry: 1,
    refetchOnWindowFocus: false,
  });

  // main
  const {
    data: mainRegularData,
    isLoading: mainRegularDataLoading,
    hasNextPage: hasNextPageRegular,
    fetchNextPage: fetchNextPageRegular,
  } = useInfiniteQuery<GetPlacesByLocationOutput | undefined>(
    ["places", "Regular-meeting"],
    // @ts-ignore
    getPlacesRegular,
    {
      getNextPageParam: (currentPage) => {
        const nextPage = currentPage.meta.page + 1;
        return nextPage > currentPage.meta.totalPages ? null : nextPage;
      },
    }
  );

  const {
    data: mainLightningData,
    isLoading: mainLightningDataLoading,
    hasNextPage: hasNextPageLightning,
    fetchNextPage: fetchNextPageLightning,
  } = useInfiniteQuery<GetPlacesByLocationOutput | undefined>(
    ["places", "Lightning"],
    // @ts-ignore
    getPlacesLightning,
    {
      getNextPageParam: (currentPage) => {
        const nextPage = currentPage.meta.page + 1;
        return nextPage > currentPage.meta.totalPages ? null : nextPage;
      },
    }
  );

  const {
    data: mainEventData,
    isLoading: mainEventDataLoading,
    hasNextPage: hasNextPageEvent,
    fetchNextPage: fetchNextPageEvent,
  } = useInfiniteQuery<GetPlacesByLocationOutput | undefined>(
    ["places", "Event"],
    // @ts-ignore
    getPlacesEvent,
    {
      getNextPageParam: (currentPage) => {
        const nextPage = currentPage.meta.page + 1;
        return nextPage > currentPage.meta.totalPages ? null : nextPage;
      },
    }
  );

  const onRefresh = async (type: string) => {
    setRefreshing(true);
    await queryClient.refetchQueries(["places", type]);
    setRefreshing(false);
  };

  const loadMoreRegular = () => {
    if (hasNextPageRegular) {
      fetchNextPageRegular();
    }
  };
  const loadMoreLightning = () => {
    if (hasNextPageLightning) {
      fetchNextPageLightning();
    }
  };

  const loadMoreEvent = () => {
    if (hasNextPageEvent) {
      fetchNextPageEvent();
    }
  };

  // values
  const position = useRef(new Animated.Value(0)).current;
  const loading =
    mainRegularDataLoading ||
    topCarouselLoading ||
    mainEventDataLoading ||
    mainLightningDataLoading;
  // animations
  const middleTabAnim = (middleTab: number, position: Animated.Value) =>
    Animated.timing(position, {
      toValue: middleTab * width * -1,
      useNativeDriver: true,
    });

  if (loading) return <Loader />;
  return (
    <Container>
      {/* 일시적 제거 */}
      {/* <TopCarouselContainer
        style={{
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.32,
          shadowRadius: 5.46,

          elevation: 9,
        }}
      >
        <Swiper
          loop
          horizontal
          autoplay
          autoplayTimeout={3.5}
          containerStyle={{ width: "100%", height: "100%" }}
          showsButtons={false}
          showsPagination={false}
        >
          {topCarouselData?.places?.map((item, idx) => {
            if (!item.isClosed || true) {
              return (
                <TopCarouselPlace
                  id={item.id}
                  leftParticipantsCount={item.leftParticipantsCount}
                  coverImageUrl={optimizeImage(item.coverImage)}
                  width={width}
                  height={height * 0.3}
                  key={idx}
                  name={item.name}
                  startDateFromNow={item.startDateFromNow}
                  detailAddress={item.placeDetail.detailAddress}
                />
              );
            }
          })}
        </Swiper>
      </TopCarouselContainer> */}
      <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
        <MiddleTabContainer>
          <MiddleTab
            onPress={() => {
              setMiddleTabIndex(0);
              middleTabAnim(0, position).start();
            }}
          >
            <MiddleTabTextWrapper isSelected={middleTabIndex === 0}>
              <MiddleTabText isSelected={middleTabIndex === 0}>
                정기👾
              </MiddleTabText>
            </MiddleTabTextWrapper>
          </MiddleTab>
          <MiddleTab
            onPress={() => {
              setMiddleTabIndex(1);
              middleTabAnim(1, position).start();
            }}
          >
            <MiddleTabTextWrapper isSelected={middleTabIndex === 1}>
              <MiddleTabText isSelected={middleTabIndex === 1}>
                번개⚡
              </MiddleTabText>
            </MiddleTabTextWrapper>
          </MiddleTab>
          <MiddleTab
            onPress={() => {
              setMiddleTabIndex(2);
              middleTabAnim(2, position).start();
            }}
          >
            <MiddleTabTextWrapper isSelected={middleTabIndex === 2}>
              <MiddleTabText isSelected={middleTabIndex === 2}>
                이벤트💖
              </MiddleTabText>
            </MiddleTabTextWrapper>
          </MiddleTab>
        </MiddleTabContainer>

        <AnimationContainer>
          <AnimWrapper
            style={{
              transform: [{ translateX: position }],
              padding: 20,
            }}
            ListHeaderComponent={
              <ListHeaderContainer>
                <ListMainText>친구들과{"\n"}맛집 투-어 가자 👾</ListMainText>
                <ListSubText>
                  새로운 친구들 사귀는거 얼마나 재밌게요 {"><"}
                </ListSubText>
              </ListHeaderContainer>
            }
            showsVerticalScrollIndicator={false}
            onEndReached={loadMoreRegular}
            onEndReachedThreshold={0.4}
            onRefresh={() => onRefresh("regular")}
            refreshing={refreshing}
            keyExtractor={(item: PlaceFeedData) => item.id + ""}
            // @ts-ignore
            data={mainRegularData.pages.map((page) => page.places).flat()}
            renderItem={({ item }) => (
              <FlatListPlace
                leftParticipantsCount={item.leftParticipantsCount}
                coverImage={item.coverImage}
                name={item.name}
                id={item.id}
                views={item.views}
                description={item.placeDetail.description}
                startDateFromNow={item.startDateFromNow}
                deadline={item.deadline}
              />
            )}
          />

          <AnimWrapper
            style={{
              left: width,
              transform: [{ translateX: position }],
              padding: 20,
            }}
            ListHeaderComponent={
              <ListHeaderContainer>
                <ListMainText>색다른{"\n"}만남 가자 ⚡</ListMainText>
                <ListSubText>
                  새로운 친구들 사귀는거 얼마나 재밌게요 {"><"}
                </ListSubText>
              </ListHeaderContainer>
            }
            showsVerticalScrollIndicator={false}
            onEndReached={loadMoreLightning}
            onEndReachedThreshold={0.4}
            onRefresh={() => onRefresh("lightning")}
            refreshing={refreshing}
            keyExtractor={(item: PlaceFeedData) => item.id + ""}
            // @ts-ignore
            data={mainLightningData.pages?.map((page) => page.places).flat()}
            renderItem={({ item }) => (
              <FlatListPlace
                leftParticipantsCount={item.leftParticipantsCount}
                coverImage={item.coverImage}
                name={item.name}
                id={item.id}
                views={item.views}
                description={item.placeDetail.description}
                startDateFromNow={item.startDateFromNow}
                deadline={item.deadline}
              />
            )}
          />
          <AnimWrapper
            style={{
              left: width * 2,
              transform: [{ translateX: position }],
              padding: 20,
            }}
            ListHeaderComponent={
              <ListHeaderContainer>
                <ListMainText>색다른{"\n"}만남 가자 💖</ListMainText>
                <ListSubText>
                  새로운 친구들 사귀는거 얼마나 재밌게요 {"><"}
                </ListSubText>
              </ListHeaderContainer>
            }
            showsVerticalScrollIndicator={false}
            onEndReached={loadMoreEvent}
            onEndReachedThreshold={0.4}
            onRefresh={() => onRefresh("Event")}
            refreshing={refreshing}
            keyExtractor={(item: PlaceFeedData) => item.id + ""}
            // @ts-ignore
            data={mainEventData.pages?.map((page) => page.places).flat()}
            renderItem={({ item }) => (
              <FlatListPlace
                leftParticipantsCount={item.leftParticipantsCount}
                coverImage={item.coverImage}
                name={item.name}
                id={item.id}
                views={item.views}
                description={item.placeDetail.description}
                startDateFromNow={item.startDateFromNow}
                deadline={item.deadline}
              />
            )}
          />
        </AnimationContainer>
      </SafeAreaView>
    </Container>
  );
}

const ListHeaderContainer = styled.View`
  width: 100%;
  height: 100px;
  padding: 0px 20px;
`;

const ListMainText = styled(GeneralText)`
  font-family: ${fontFamilies.medium};
  font-size: 24px;
`;

const ListSubText = styled(GeneralText)`
  font-family: ${fontFamilies.regular};
  color: ${colors.bareGrey};
  margin-top: 14px;
  font-size: 14px;
`;

const TopCarousel = styled.ScrollView``;

const Container = styled.View`
  flex: 1;
  background-color: ${colors.bgColor};
`;

const TopCarouselContainer = styled.View`
  width: ${width + "px"};
  height: ${height * 0.3 + "px"};
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
`;

const MiddleTabContainer = styled.View`
  width: ${width + "px"};
  height: ${height * 0.1 + "px"};
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const MiddleTab = styled.TouchableOpacity`
  flex: 0.3;
  justify-content: center;
  align-items: center;
`;

const MiddleTabTextWrapper = styled.View<{ isSelcted: boolean }>`
  border-bottom-width: ${(props) => (props.isSelected ? "1px" : 0)};
  border-color: ${colors.black};
  position: relative;
`;

const TagContiner = styled.View`
  position: absolute;
  top: -5px;
  right: -5px;
  background-color: #e7ecf3;
  padding: 1px;
  border-radius: 2px;
`;

const TagText = styled(GeneralText)`
  font-size: 13px;
  color: ${colors.bareGrey};
`;

const MiddleTabText = styled(GeneralText)<{ isSelcted: boolean }>`
  font-size: 20px;
  padding: 12px;
  color: ${(props) => (props.isSelected ? colors.black : colors.bareGrey)};
`;

const AnimWrapper = styled(Animated.createAnimatedComponent(FlatList))`
  background-color: ${colors.bgColor};
  width: 100%;
  height: 100%;
  position: absolute;
`;

const AnimationContainer = styled.View`
  flex: 1;
`;

const HSeperator = styled.View`
  height: 20px;
`;
