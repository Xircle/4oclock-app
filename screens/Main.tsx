import styled from "styled-components/native";
import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  Animated,
  FlatList,
  PanResponder,
  SafeAreaView,
  TouchableOpacity,
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
import { useNavigation } from "@react-navigation/native";
import { useAssets } from "expo-asset";
import { LinearGradient } from "expo-linear-gradient";

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
    isClosed={item.isClosed}
  />
);

export default function Main(props: Props) {
  const [assets, error] = useAssets([
    require("../statics/images/RegularHeader.jpeg"),
  ]);
  const navigation = useNavigation();
  const [middleTabIndex, setMiddleTabIndex] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [secondTap, setSecondTap] = useState(false);
  const [thirdTap, setThirdTap] = useState(false);
  const [temp, setTemp] = useState([]);
  const queryClient = useQueryClient();

  const renderRegular = ({ item, index }) => {
    if (!item.isClosed) {
      if (index === 0) {
        if (item.myTeam) {
          return (
            <>
              <RegularDividorContainer>
                <RegularDividorHeader>
                  # 이주의 우리조 모임 🔥
                </RegularDividorHeader>
                <RegularDividorMainText>
                  아래 모임들 중 하나를 선택해서 참여해주세요! 선착순으로
                  마감되니 서두르시길!
                </RegularDividorMainText>
              </RegularDividorContainer>
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
                isClosed={item.isClosed}
              />
            </>
          );
        }
      } else if (temp[index - 1].myTeam !== temp[index].myTeam) {
        return (
          <>
            <RegularDividorContainer>
              <RegularDividorHeader>
                # 지금 올라오는 정기모임 🎉
              </RegularDividorHeader>
            </RegularDividorContainer>
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
              isClosed={item.isClosed}
            />
          </>
        );
      }
    }
    return (
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
        isClosed={item.isClosed}
      />
    );
  };

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

  useEffect(() => {
    if (mainRegularData) {
      // @ts-ignore
      setTemp(mainRegularData.pages?.map((page) => page.places).flat());
    }
  }, [mainRegularData]);

  if (loading) return <Loader />;
  return (
    <SafeAreaView style={{ backgroundColor: colors.bgColor, flex: 1 }}>
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
                정기👾
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
              <TouchableOpacity
                //@ts-ignore
                onPress={() => navigation.navigate("LightningGuide")}
              >
                <RegularMainListHeaderContainer>
                  <RegularMainListHeaderImage
                    source={require("../statics/images/LightningHeader.jpeg")}
                  />
                  <LinearGradient
                    // Background Linear Gradient
                    colors={["transparent", colors.black]}
                    style={{
                      position: "absolute",
                      left: 0,
                      right: 0,
                      top: 0,
                      bottom: 0,
                      borderRadius: 15,
                      opacity: 0.7,
                    }}
                  />
                  <RMLTextWrapper>
                    <RegularMainListHeaderSubHeading>
                      연고이팅이 처음이라고?
                    </RegularMainListHeaderSubHeading>
                    <RegularMainListHeaderHeading>
                      연고이팅 번개모임 가이드 {">"}
                    </RegularMainListHeaderHeading>
                  </RMLTextWrapper>
                </RegularMainListHeaderContainer>
              </TouchableOpacity>
            }
            showsVerticalScrollIndicator={false}
            onEndReached={loadMoreLightning}
            onEndReachedThreshold={0.2}
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
                <TouchableOpacity
                  //@ts-ignore
                  onPress={() => navigation.navigate("RegularGuide")}
                >
                  <RegularMainListHeaderContainer>
                    <RegularMainListHeaderImage
                      source={require("../statics/images/RegularHeader.jpeg")}
                    />
                    <LinearGradient
                      // Background Linear Gradient
                      colors={["transparent", colors.black]}
                      style={{
                        position: "absolute",
                        left: 0,
                        right: 0,
                        top: 0,
                        bottom: 0,
                        borderRadius: 15,
                        opacity: 0.7,
                      }}
                    />
                    <RMLTextWrapper>
                      <RegularMainListHeaderSubHeading>
                        연고이팅이 처음이라고?
                      </RegularMainListHeaderSubHeading>
                      <RegularMainListHeaderHeading>
                        연고이팅 정기모임 가이드 {">"}
                      </RegularMainListHeaderHeading>
                    </RMLTextWrapper>
                  </RegularMainListHeaderContainer>
                </TouchableOpacity>
              }
              showsVerticalScrollIndicator={false}
              onEndReached={loadMoreRegular}
              onEndReachedThreshold={0.2}
              onRefresh={() => onRefresh("Regular-meeting")}
              refreshing={refreshing}
              keyExtractor={(item: PlaceFeedData) => item.id + ""}
              // @ts-ignore
              data={temp}
              renderItem={renderRegular}
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
                  <ListMainText>설레이는{"\n"}깜짝 이벤트 💖</ListMainText>
                  <ListSubText>
                    운영진들이 야심차게 준비한 이벤트 {"><"}
                  </ListSubText>
                </ListHeaderContainer>
              }
              showsVerticalScrollIndicator={false}
              onEndReached={loadMoreEvent}
              onEndReachedThreshold={0.2}
              onRefresh={() => onRefresh("Event")}
              refreshing={refreshing}
              keyExtractor={(item: PlaceFeedData) => item.id + ""}
              // @ts-ignore
              data={mainEventData.pages?.map((page) => page.places).flat()}
              renderItem={renderItem}
            />
          )}
        </AnimationContainer>
      </Container>
    </SafeAreaView>
  );
}

const RegularMainListHeaderContainer = styled.View`
  width: 100%;
  height: 110px;
  border-radius: 15px;

  justify-content: flex-end;
`;

const RMLTextWrapper = styled.View`
  padding: 11px;
  padding-left: 13px;
`;

const RegularMainListHeaderImage = styled.Image`
  width: 100%;
  height: 100%;
  position: absolute;
  border-radius: 15px;
`;

const RegularMainListHeaderHeading = styled(GeneralText)`
  color: ${colors.bgColor};
  font-size: 20px;
  font-family: ${fontFamilies.bold};
`;

const RegularMainListHeaderSubHeading = styled(RegularMainListHeaderHeading)`
  font-size: 12px;
  font-family: ${fontFamilies.regular};
  padding-bottom: 2px;
`;

const ListHeaderContainer = styled.View`
  width: 100%;
  padding: 0px 20px;
`;

const RegularDividorContainer = styled.View`
  width: 100%;
  padding-top: 15px;
`;

const RegularDividorHeader = styled(GeneralText)`
  font-family: ${fontFamilies.bold};
  font-size: 20px;
`;

const RegularDividorMainText = styled(GeneralText)`
  font-size: 12px;
  color: ${colors.midGrey};
  padding-top: 13px;
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
