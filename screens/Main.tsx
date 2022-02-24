import styled from "styled-components/native";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Dimensions, Animated, FlatList, SafeAreaView } from "react-native";
import { colors, fontFamilies, GeneralText } from "../styles/styles";
import { useInfiniteQuery, useQueryClient } from "react-query";
import { GetPlacesByLocationOutput, PlaceFeedData } from "../lib/api/types";
import {
  getPlacesEvent,
  getPlacesLightning,
  getPlacesRegular,
} from "../lib/api/getPlaces";
import Loader from "../components/UI/Loader";
import MainFlatListPlace from "../components/main/MainFlatListPlace";
import MainTopCarousel from "../components/UI/MainTopCarousel";
<<<<<<< HEAD
import { OptimizedFlatList } from "react-native-optimized-flatlist";
=======
>>>>>>> 58502ecb90e6d37b06a0c9363348f481c978725b

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

  const placeFlatlistKeyExtractor = (item: PlaceFeedData, index) =>
    item.id + "" + index;

  const renderRegular = ({ item, index }) => {
<<<<<<< HEAD
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
            deadline={item.deadline}
            participants={item.participants}
            isClosed={item.isClosed}
          />
        </>
      );
    } else if (item.seperatorNotMyTeam) {
=======
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
            <MainFlatListPlace
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
    } else if (
      !item.isClosed &&
      temp[index - 1].myTeam === true &&
      temp[index].myTeam === false
    ) {
>>>>>>> 58502ecb90e6d37b06a0c9363348f481c978725b
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
            deadline={item.deadline}
            participants={item.participants}
            isClosed={item.isClosed}
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
        deadline={item.deadline}
        participants={item.participants}
        isClosed={item.isClosed}
      />
    );
  };

  useEffect(() => {
    console.log("main rendered");
  }, []);

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

  const memoizedValueRegular = useMemo(() => renderRegular, [
    mainRegularData?.pages?.map((page) => page.places).flat(),
  ]);
  const memoizedValueEvent = useMemo(() => renderItem, [
    mainLightningData?.pages.map((page) => page.places).flat(),
  ]);
  const memoizedValueLightning = useMemo(() => renderItem, [
    mainLightningData?.pages.map((page) => page.places).flat(),
  ]);

  // values
  const position = useRef(new Animated.Value(0)).current;
  const loading =
    mainRegularDataLoading || mainEventDataLoading || mainLightningDataLoading;
  //animations
  const middleTabAnim = (middleTab: number, position: Animated.Value) =>
    Animated.timing(position, {
      toValue: middleTab * width * -1,
      useNativeDriver: true,
    });

  if (loading) return <Loader />;
  return (
    <SafeAreaView style={{ backgroundColor: colors.bgColor, flex: 1 }}>
      <Container>
        <MainTopCarousel />
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
          {mainLightningData && (
            <AnimWrapper
              style={{
                transform: [{ translateX: position }],
                padding: 20,
              }}
              disableVirtualization={false}
              showsVerticalScrollIndicator={false}
              onEndReached={loadMoreLightning}
              onEndReachedThreshold={0.2}
              onRefresh={onRefreshLightning}
              refreshing={refreshing}
              keyExtractor={placeFlatlistKeyExtractor}
              // @ts-ignore
              data={mainLightningData.pages.map((page) => page.places).flat()}
              renderItem={memoizedValueLightning}
              ListHeaderComponent={
                <LightningInfoContainer>
                  <LightningInfoText style={{ fontSize: 14, lineHeight: 22 }}>
                    크루원 누구나 자유롭게 번개를 올리고 참여할 수 있어요!항상
                    올라오는 꿀잼 번개! 심심하면 놀러오라구{"><"}
                  </LightningInfoText>
                </LightningInfoContainer>
              }
            />
          )}

          {secondTap && mainRegularData && (
            <AnimWrapper
              style={{
                left: width,
                transform: [{ translateX: position }],
                padding: 20,
              }}
              disableVirtualization={false}
              showsVerticalScrollIndicator={false}
              onEndReached={loadMoreRegular}
              onEndReachedThreshold={0.2}
              onRefresh={onRefreshRegular}
              refreshing={refreshing}
              keyExtractor={placeFlatlistKeyExtractor}
              ListHeaderComponent={
                <LightningInfoContainer>
                  <LightningInfoText style={{ fontSize: 14, lineHeight: 22 }}>
                    (매우중요) 정기모임 참여는 마이페이지 {">"} 프로필
                    수정하기에서 팀과 활동코드를 입력해 주셔야지만 가능해요!
                  </LightningInfoText>
                </LightningInfoContainer>
              }
              // @ts-ignore
              data={mainRegularData.pages?.map((page) => page.places).flat()}
              renderItem={memoizedValueRegular}
            />
          )}
          {thirdTap && mainEventData && (
            <AnimWrapper
              disableVirtualization={false}
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
              onRefresh={onRefreshEvent}
              refreshing={refreshing}
              keyExtractor={placeFlatlistKeyExtractor}
              // @ts-ignore
              data={mainEventData.pages?.map((page) => page.places).flat()}
              renderItem={memoizedValueEvent}
            />
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

const AnimWrapper = styled(Animated.createAnimatedComponent(OptimizedFlatList))`
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
`;
