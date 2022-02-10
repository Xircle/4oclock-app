import styled from "styled-components/native";
import React, { useEffect, useRef, useState } from "react";
import { Dimensions, Animated, FlatList, SafeAreaView } from "react-native";
import { colors, fontFamilies, GeneralText, Text } from "../styles/styles";
import { useInfiniteQuery, useQuery, useQueryClient } from "react-query";
import { GetPlacesByLocationOutput, PlaceFeedData } from "../lib/api/types";
import {
  getPlacesEvent,
  getPlacesForCarousel,
  getPlacesLightning,
  getPlacesRegular,
} from "../lib/api/getPlaces";
import Loader from "../components/UI/Loader";
import FlatListPlace from "../components/main/FlatListPlace";
import Swiper from "react-native-swiper";
import { LinearGradient } from "expo-linear-gradient";
import { openLink } from "../components/shared/Links";
import { TouchableWithoutFeedback } from "react-native";

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
                  # 이번주 우리 팀 정기모임🔥
                </RegularDividorHeader>
                <RegularDividorMainText>
                  이번주에 열린 우리 팀 정기모임 2개 중 하나를 선택해서
                  참여해주세요!{"\n"} 선착순으로 마감되니 빨리 ㄱㄱ
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
                # 지금 올라온 정기모임 🎉
              </RegularDividorHeader>
              <RegularDividorMainText>
                이번주에 우리 팀 참여가 불가하다고?! 담당 운영진에게 연락을 주고
                {"\n"}다른 팀 정기모임에 참여해봐!
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
        <TopCarouselContainer>
          <Swiper
            loop
            horizontal
            autoplay
            autoplayTimeout={3.5}
            containerStyle={{ width: "100%", height: "100%" }}
            showsButtons={false}
            showsPagination={false}
          >
            <TouchableWithoutFeedback
              onPress={() =>
                openLink.LOpenLink(
                  "https://longhaired-gym-a5e.notion.site/250885c37ef3433690f141e4bcae2d30"
                )
              }
            >
              <RegularMainListHeaderContainer>
                <RegularMainListHeaderImage
                  source={require("../statics/images/calendar.jpeg")}
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
                    opacity: 0.7,
                  }}
                />
                <RMLTextWrapper>
                  <RegularMainListHeaderSubHeading>
                    2/14~3/13에 어떤 활동들이 열릴까?
                  </RegularMainListHeaderSubHeading>
                  <RegularMainListHeaderHeading>
                    연고이팅 2기 달력 {">"}
                  </RegularMainListHeaderHeading>
                </RMLTextWrapper>
              </RegularMainListHeaderContainer>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() =>
                openLink.LOpenLink(
                  "https://longhaired-gym-a5e.notion.site/54081710685b456aa31ec0665c21267f"
                )
              }
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
                    opacity: 0.7,
                  }}
                />
                <RMLTextWrapper>
                  <RegularMainListHeaderSubHeading>
                    연고이팅 처음 가입했다면 필독!
                  </RegularMainListHeaderSubHeading>
                  <RegularMainListHeaderHeading>
                    연고이팅 정기모임 가이드 {">"}
                  </RegularMainListHeaderHeading>
                </RMLTextWrapper>
              </RegularMainListHeaderContainer>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() =>
                openLink.LOpenLink(
                  "https://longhaired-gym-a5e.notion.site/823262fe528e4d3d9ceca8800764dcfe"
                )
              }
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
                    opacity: 0.7,
                  }}
                />
                <RMLTextWrapper>
                  <RegularMainListHeaderSubHeading>
                    연고이팅 번개는 누구나 열고 참여가능하다구 {"><"}
                  </RegularMainListHeaderSubHeading>
                  <RegularMainListHeaderHeading>
                    연고이팅 번개모임 가이드 {">"}
                  </RegularMainListHeaderHeading>
                </RMLTextWrapper>
              </RegularMainListHeaderContainer>
            </TouchableWithoutFeedback>
          </Swiper>
        </TopCarouselContainer>

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
            showsVerticalScrollIndicator={false}
            onEndReached={loadMoreLightning}
            onEndReachedThreshold={0.2}
            onRefresh={() => onRefresh("Lightning")}
            refreshing={refreshing}
            keyExtractor={(item: PlaceFeedData) => item.id + ""}
            // @ts-ignore
            data={mainLightningData.pages.map((page) => page.places).flat()}
            renderItem={renderItem}
            ListHeaderComponent={
              <LightningInfoContainer>
                <LightningInfoText style={{ fontSize: 14, lineHeight: 22 }}>
                  크루원 누구나 자유롭게 번개를 올리고 참여할 수 있어요!항상
                  올라오는 꿀잼 번개! 심심하면 놀러오라구{"><"}
                </LightningInfoText>
              </LightningInfoContainer>
            }
          />
          {secondTap && (
            <AnimWrapper
              style={{
                left: width,
                transform: [{ translateX: position }],
                padding: 20,
              }}
              showsVerticalScrollIndicator={false}
              onEndReached={loadMoreRegular}
              onEndReachedThreshold={0.2}
              onRefresh={() => onRefresh("Regular-meeting")}
              refreshing={refreshing}
              keyExtractor={(item: PlaceFeedData) => item.id + ""}
              ListHeaderComponent={
                <LightningInfoContainer>
                  <LightningInfoText style={{ fontSize: 14, lineHeight: 22 }}>
                    (매우중요) 정기모임 참여는 마이페이지 {">"} 프로필
                    수정하기에서 팀과 활동코드를 입력해 주셔야지만 가능해요!
                  </LightningInfoText>
                </LightningInfoContainer>
              }
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
  height: 100%;
  background-color: ${colors.black};
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
  height: 150px;
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

const LightningInfoContainer = styled.View``;

const LightningInfoText = styled(GeneralText)`
  line-height: 24px;
  color: ${colors.midGrey};
  padding-left: 10px;
  padding-right: 10px;
`;
