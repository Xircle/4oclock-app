import styled from "styled-components/native";
import React, { useEffect, useRef, useState } from "react";
import { Dimensions, Animated, View } from "react-native";
import { colors, GeneralText, Text } from "../styles/styles";
import { useDB } from "../lib/RealmDB";
import { useQuery } from "react-query";
import { GetPlacesByLocationOutput } from "../lib/api/types";
import { getPlacesByLocation } from "../lib/api/getPlacesByLocation";
import TopCarouselPlace from "../components/main/TopCarouselPlace";
import optimizeImage from "../lib/helpers/optimizeImage";

interface Props {}

const { width, height } = Dimensions.get("window");

export default function Main(props: Props) {
  const [middleTabIndex, setMiddleTabIndex] = useState(0);
  const realm = useDB();

  // api call
  const {
    data: topCarouselData,
    isLoading,
    isError,
    isFetching,
    isFetched,
  } = useQuery<GetPlacesByLocationOutput | undefined>(
    ["place", "전체", 1],
    () => getPlacesByLocation("전체", 1),
    {
      retry: 1,
      refetchOnWindowFocus: false,
    }
  );

  // values
  const position = useRef(new Animated.Value(0)).current;

  // animations
  const middleTabAnim = (middleTab: number, position: Animated.Value) =>
    Animated.timing(position, {
      toValue: middleTab * width * -1,
      useNativeDriver: true,
    });

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
        <AnimationWrapper
          style={{
            transform: [{ translateX: position }],
          }}
        >
          <Text>Main </Text>
        </AnimationWrapper>
        <AnimationWrapper
          style={{
            left: width,
            transform: [{ translateX: position }],
          }}
        >
          <Text>Sub </Text>
        </AnimationWrapper>
      </AnimationContainer>
    </Container>
  );
}

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

const AnimationWrapper = styled(Animated.createAnimatedComponent(View))`
  background-color: ${colors.bgColor};
  width: 100%;
  height: 100%;
  position: absolute;
`;

const AnimationContainer = styled.View`
  flex: 1;
`;
