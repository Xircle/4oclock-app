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
  getPlacesAll,
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

const renderItem = ({ item }) => (
  <FlatListPlace
    leftParticipantsCount={item.leftParticipantsCount}
    coverImage={item.coverImage}
    name={item.name}
    id={item.id}
    views={item.views}
    description={item.placeDetail.description}
    startDateFromNow={item.startDateFromNow}
    deadline={item.deadline}
    participants={item.participants}
  />
);

export default function Main(props: Props) {
  const [middleTabIndex, setMiddleTabIndex] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [secondTap, setSecondTap] = useState(false);
  const [thirdTap, setThirdTap] = useState(false);

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
  //animations
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
                번개⚡
              </MiddleTabText>
            </MiddleTabTextWrapper>
          </MiddleTab>
          <MiddleTab
            onPress={() => {
              setSecondTap(true);
              setMiddleTabIndex(1);
              middleTabAnim(1, position).start();
            }}
          >
            <MiddleTabTextWrapper isSelected={middleTabIndex === 1}>
              <MiddleTabText isSelected={middleTabIndex === 1}>
                이벤트💖
              </MiddleTabText>
            </MiddleTabTextWrapper>
          </MiddleTab>
          <MiddleTab
            onPress={() => {
              setThirdTap(true);
              setMiddleTabIndex(2);
              middleTabAnim(2, position).start();
            }}
          >
            <MiddleTabTextWrapper isSelected={middleTabIndex === 2}>
              <MiddleTabText isSelected={middleTabIndex === 2}>
                정기👾
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
                <LightningMainText>
                  [첫 번개 EVENT] 선착순 24명 5000원 쏜다!
                </LightningMainText>
                <LightningSubText>
                  번개를 자유롭게 올리고 참여 가능 한 탭! 😎{"\n"}
                  번개 개설 후 운영진에게 말씀해주시면 전체단톡에 올려드려요--!
                  {"\n"}
                </LightningSubText>
              </ListHeaderContainer>
            }
            showsVerticalScrollIndicator={false}
            onEndReached={loadMoreLightning}
            onEndReachedThreshold={0}
            onRefresh={() => onRefresh("Lightning")}
            refreshing={refreshing}
            keyExtractor={(item: PlaceFeedData) => item.id + ""}
            // @ts-ignore
            data={mainLightningData.pages.map((page) => page.places).flat()}
            renderItem={renderItem}
          />
          {secondTap && (
            <AnimWrapper
              style={{
                left: width,
                transform: [{ translateX: position }],
                padding: 20,
              }}
              ListHeaderComponent={
                <ListHeaderContainer>
                  <ListMainText>설레이는{"\n"}깜짝 이벤트 💖</ListMainText>
                  <ListSubText>
                    운영진들이 야심차게 준비한 이벤트 {"><"}
                  </ListSubText>
                </ListHeaderContainer>
              }
              showsVerticalScrollIndicator={false}
              onEndReached={loadMoreEvent}
              onEndReachedThreshold={0}
              onRefresh={() => onRefresh("Event")}
              refreshing={refreshing}
              keyExtractor={(item: PlaceFeedData) => item.id + ""}
              // @ts-ignore
              data={mainEventData.pages?.map((page) => page.places).flat()}
              renderItem={renderItem}
            />
          )}
          {thirdTap && (
            <AnimWrapper
              style={{
                left: width * 2,
                transform: [{ translateX: position }],
                padding: 20,
              }}
              ListHeaderComponent={
                <ListHeaderContainer>
                  <ListMainText>정기모임 👾</ListMainText>
                  <ListSubText>
                    다른 팀의 정기모임 빈 자리가 올라와요:){"\n"}
                    참여 해주시면, 운영진이 팀 단톡에 초대해드려요!
                  </ListSubText>
                </ListHeaderContainer>
              }
              showsVerticalScrollIndicator={false}
              onEndReached={loadMoreRegular}
              onEndReachedThreshold={0}
              onRefresh={() => onRefresh("Regular-meeting")}
              refreshing={refreshing}
              keyExtractor={(item: PlaceFeedData) => item.id + ""}
              // @ts-ignore
              data={mainRegularData.pages?.map((page) => page.places).flat()}
              renderItem={renderItem}
            />
          )}
        </AnimationContainer>
      </SafeAreaView>
    </Container>
  );
}

const ListHeaderContainer = styled.View`
  width: 100%;
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

const LightningSubText = styled(ListSubText)`
  margin-top: 5px;
`;

const LightningMainText = styled(GeneralText)`
  color: ${colors.lightBlack};
  font-family: ${fontFamilies.bold};
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
