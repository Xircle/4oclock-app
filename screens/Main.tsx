import styled from "styled-components/native";
import React, { useMemo, useRef, useState } from "react";
import { Dimensions, Animated, SafeAreaView, View } from "react-native";
import { colors, fontFamilies, GeneralText } from "../styles/styles";
import { useInfiniteQuery, useQuery, useQueryClient } from "react-query";
import {
  GetEventBannersOutput,
  GetPlacesByLocationOutput,
  PlaceFeedData,
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
import { useNavigation } from "@react-navigation/native";

interface Props {}

const { width, height } = Dimensions.get("window");

const renderItem = ({ item }) => (
  <MainFlatListPlace
    leftParticipantsCount={item.leftParticipantsCount}
    coverImage={item.coverImage}
    name={item.name}
    id={item.id}
    description={item.placeDetail.description}
    startDateFromNow={item.startDateFromNow}
    participants={item.participants}
    isClosed={item.isClosed}
    recommendation={item.recommendation}
  />
);

export default function Main(props: Props) {
  const [middleTabIndex, setMiddleTabIndex] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const queryClient = useQueryClient();
  const navigation = useNavigation();

  const placeFlatlistKeyExtractor = (item: PlaceFeedData, index) =>
    item.id + "" + index;

  const renderRegular = ({ item, index }) => {
    if (item.seperatorMyTeam) {
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
          <MainFlatListPlace
            leftParticipantsCount={item.leftParticipantsCount}
            coverImage={item.coverImage}
            name={item.name}
            id={item.id}
            description={item.placeDetail.description}
            startDateFromNow={item.startDateFromNow}
            participants={item.participants}
            isClosed={item.isClosed}
            recommendation={item.recommendation}
          />
        </>
      );
    } else if (item.seperatorNotMyTeam) {
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
          <MainFlatListPlace
            leftParticipantsCount={item.leftParticipantsCount}
            coverImage={item.coverImage}
            name={item.name}
            id={item.id}
            description={item.placeDetail.description}
            startDateFromNow={item.startDateFromNow}
            participants={item.participants}
            isClosed={item.isClosed}
            recommendation={item.recommendation}
          />
        </>
      );
    }

    return (
      <MainFlatListPlace
        leftParticipantsCount={item.leftParticipantsCount}
        coverImage={item.coverImage}
        name={item.name}
        id={item.id}
        description={item.placeDetail.description}
        startDateFromNow={item.startDateFromNow}
        participants={item.participants}
        isClosed={item.isClosed}
        recommendation={item.recommendation}
      />
    );
  };

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

  const { data: eventBannerData } = useQuery<GetEventBannersOutput>(
    ["eventBanner"],
    () => getEventBanners(),
    { retry: 1 }
  );

  const onRefresh = async (type: string) => {
    setRefreshing(true);
    await queryClient.refetchQueries(["places", type]);
    setRefreshing(false);
  };

  const onRefreshEvent = () => onRefresh("Event");
  const onRefreshRegular = () => onRefresh("Regular-meeting");
  const onRefreshLightning = () => onRefresh("Lightning");

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

  const memoizedValueRegular = useMemo(
    () => renderRegular,
    [mainRegularData?.pages?.map((page) => page.places).flat()]
  );
  const memoizedValueEvent = useMemo(
    () => renderItem,
    [mainEventData?.pages.map((page) => page.places).flat()]
  );
  const memoizedValueLightning = useMemo(
    () => renderItem,
    [mainLightningData?.pages.map((page) => page.places).flat()]
  );

  // values
  const position = useRef(new Animated.Value(0)).current;
  const loading =
    mainRegularDataLoading || mainEventDataLoading || mainLightningDataLoading;
  //animations
  const middleTabAnim = (middleTab: number, position: Animated.Value) =>
    Animated.timing(position, {
      toValue: middleTab * width * -1,
      useNativeDriver: true,
      duration: 200,
    });

  if (loading) return <Loader />;
  return (
    <SafeAreaView style={{ backgroundColor: colors.bgColor, flex: 1 }}>
      <Container>
        <HeaderPureComponent onPress={() => {}} />
        <MainTopCarousel eventBanners={eventBannerData.eventBanners} />
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
          {mainLightningData && (
            <AnimWrapper
              style={{
                transform: [{ translateX: position }],
              }}
            >
              <MainFeed
                loadMore={loadMoreLightning}
                onRefresh={onRefreshLightning}
                refreshing={refreshing}
                renderItem={memoizedValueLightning}
                places={mainLightningData.pages
                  ?.map((page) => page.places)
                  .flat()}
                listHeaderCompoent={
                  <LightningInfoContainer>
                    <LightningInfoText>
                      🚨(중요)모임 못 나가시면 오카방에서 상황 설명 후 앱에서 꼭
                      바로 취소 부탁드리겠습니다.🚨
                    </LightningInfoText>
                  </LightningInfoContainer>
                }
              />
            </AnimWrapper>
          )}

          {mainRegularData && (
            <AnimWrapper
              style={{
                left: width,
                transform: [{ translateX: position }],
              }}
            >
              <MainFeed
                loadMore={loadMoreRegular}
                onRefresh={onRefreshRegular}
                refreshing={refreshing}
                renderItem={memoizedValueRegular}
                places={mainRegularData.pages
                  ?.map((page) => page.places)
                  .flat()}
                listHeaderCompoent={
                  <LightningInfoContainer>
                    <LightningInfoText>
                      (매우중요) 정기모임 참여는 마이페이지 {">"} 프로필
                      수정하기에서 팀과 활동코드를 입력해 주셔야지만 가능해요!
                    </LightningInfoText>
                  </LightningInfoContainer>
                }
              />
            </AnimWrapper>
          )}
          {mainEventData && (
            <AnimWrapper
              disableVirtualization={false}
              style={{
                left: width * 2,
                transform: [{ translateX: position }],
              }}
            >
              <MainFeed
                loadMore={loadMoreEvent}
                onRefresh={onRefreshEvent}
                refreshing={refreshing}
                renderItem={memoizedValueEvent}
                places={mainEventData.pages?.map((page) => page.places).flat()}
                listHeaderCompoent={
                  <ListHeaderContainer>
                    <ListMainText>설레이는{"\n"}깜짝 이벤트 💖</ListMainText>
                    <ListSubText>
                      운영진들이 야심차게 준비한 이벤트 {"><"}
                    </ListSubText>
                  </ListHeaderContainer>
                }
              />
            </AnimWrapper>
          )}
        </AnimationContainer>
      </Container>
    </SafeAreaView>
  );
}

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

const Container = styled.View`
  flex: 1;
  background-color: ${colors.bgColor};
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

const MiddleTabText = styled(GeneralText)<{ isSelcted: boolean }>`
  font-size: 20px;
  padding: 12px;
  color: ${(props) => (props.isSelected ? colors.black : colors.bareGrey)};
`;

const AnimWrapper = styled(Animated.createAnimatedComponent(View))`
  background-color: ${colors.bgColor};
  width: 100%;
  height: 100%;
  position: absolute;
`;
const AnimationContainer = styled.View`
  flex: 1;
`;

const LightningInfoContainer = styled.View``;

const LightningInfoText = styled(GeneralText)`
  line-height: 24px;
  color: ${colors.midGrey};
  padding-left: 10px;
  padding-right: 10px;
  font-size: 14px;
  line-height: 22px;
`;
