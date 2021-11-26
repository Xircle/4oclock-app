import styled from "styled-components/native";
import React, { useEffect, useRef, useState } from "react";
import { Dimensions, Animated, View, Image, FlatList } from "react-native";
import { colors, fontFamilies, GeneralText, Text } from "../styles/styles";
import { useDB } from "../lib/RealmDB";
import { useInfiniteQuery, useQuery, useQueryClient } from "react-query";
import { GetPlacesByLocationOutput, PlaceFeedData } from "../lib/api/types";
import {
  getPlacesByLocation,
  getPlacesNew,
} from "../lib/api/getPlacesByLocation";
import TopCarouselPlace from "../components/main/TopCarouselPlace";
import optimizeImage from "../lib/helpers/optimizeImage";
import { PlaceData } from "../lib/api/types.d";
import Loader from "../components/UI/Loader";
import MidFlatListPlace from "../components/main/MidFlatListPlace";

interface Props {}

const { width, height } = Dimensions.get("window");

export default function Main(props: Props) {
  const [middleTabIndex, setMiddleTabIndex] = useState(0);
  const [ableToRefetch, setAbleToRefetch] = useState(false);
  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const realm = useDB();

  const queryClient = useQueryClient();

  // api call
  const { data: topCarouselData } = useQuery<
    GetPlacesByLocationOutput | undefined
  >(["places", "전체", "top"], () => getPlacesByLocation("전체", 1), {
    retry: 1,
    refetchOnWindowFocus: false,
  });
  const {
    data: mainPlaceData,
    isLoading: mainPlaceDataLoading,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery<GetPlacesByLocationOutput | undefined>(
    ["places", "전체", "main"],
    getPlacesNew,
    {
      getNextPageParam: (currentPage) => {
        return 2;
      },
    }
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await queryClient.refetchQueries(["place", "전체", "main"]);
    setRefreshing(false);
  };

  const loadMore = () => {
    console.log("fetch Before");
    if (hasNextPage) {
      console.log("fetch called");
      fetchNextPage();
      console.log("fetch After");
    }
  };

  useEffect(() => {
    console.log(mainPlaceData);
  }, [mainPlaceData]);

  // values
  const position = useRef(new Animated.Value(0)).current;
  const loading = mainPlaceDataLoading;
  // animations
  const middleTabAnim = (middleTab: number, position: Animated.Value) =>
    Animated.timing(position, {
      toValue: middleTab * width * -1,
      useNativeDriver: true,
    });
  if (loading) return <Loader />;
  return (
    <Container>
      <TopCarouselContainer
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
        <TopCarousel
          horizontal={true}
          decelerationRate={0}
          snapToInterval={width}
          snapToAlignment={"center"}
          showsVerticalScrollIndicator={false}
        >
          {topCarouselData?.places?.map((item, idx) => {
            if (!item.isClosed || true) {
              return (
                <TopCarouselPlace
                  coverImageUrl={optimizeImage(item.coverImage)}
                  width={width}
                  height={height * 0.3}
                  key={idx}
                  name={item.name}
                />
              );
            }
          })}
        </TopCarousel>
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
              전체보기
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
              후기보기
            </MiddleTabText>
          </MiddleTabTextWrapper>
        </MiddleTab>
      </MiddleTabContainer>
      <AnimationContainer>
        <MainAnimWrapper
          style={{
            transform: [{ translateX: position }],
            padding: 20,
          }}
          ListHeaderComponent={
            <ListHeaderContainer>
              <ListMainText>맛집 뿌셔뿌셔👋</ListMainText>
              <ListSubText>새로운 친구들 사귀는거 얼마나 재밌게요</ListSubText>
            </ListHeaderContainer>
          }
          onEndReached={loadMore}
          onEndReachedThreshold={0.4}
          onRefresh={onRefresh}
          refreshing={refreshing}
          ItemSeparatorComponent={HSeperator}
          keyExtractor={(item: PlaceFeedData) => item.id + ""}
          data={mainPlaceData.pages.map((page) => page.places).flat()}
          renderItem={({ item }) => <MidFlatListPlace coverImage={item.coverImage}/>}
        />

        <SubAnimWrapper
          style={{
            left: width,
            transform: [{ translateX: position }],
          }}
        >
          <Image
            source={require("../statics/images/mascot.png")}
            style={{ width: 300, resizeMode: "contain" }}
          />
        </SubAnimWrapper>
      </AnimationContainer>
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
  flex: 0.45;
  justify-content: center;
  align-items: center;
`;

const MiddleTabTextWrapper = styled.View<{ isSelcted: boolean }>`
  border-bottom-width: ${(props) => (props.isSelected ? "1px" : 0)};
  border-color: ${colors.black};
`;

const MiddleTabText = styled(GeneralText)<{ isSelcted: boolean }>`
  font-size: 20px;
  padding: 12px;
  color: ${(props) => (props.isSelected ? colors.black : colors.bareGrey)};
`;

const SubAnimWrapper = styled(Animated.createAnimatedComponent(View))`
  background-color: ${colors.bgColor};
  width: 100%;
  height: 100%;
  position: absolute;
  justify-content: center;
  align-items: center;
`;

const MainAnimWrapper = styled(Animated.createAnimatedComponent(FlatList))`
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
