import styled from "styled-components/native";
import React, { useEffect, useState } from "react";
import { Image, Dimensions } from "react-native";
import { colors, Text } from "../styles/styles";
import { useDB } from "../lib/RealmDB";
import storage from "../lib/helpers/myAsyncStorage";
import { useQuery } from "react-query";
import { GetPlacesByLocationOutput } from "../lib/api/types";
import { getPlacesByLocation } from "../lib/api/getPlacesByLocation";
import TopCarouselPlace from "../components/main/TopCarouselPlace";
import { isTemplateExpression } from "typescript";
import optimizeImage from "../lib/helpers/optimizeImage";

interface Props {}

const { width, height } = Dimensions.get("window");

export default function Main(props: Props) {
  const realm = useDB();
  const [temp, setTemp] = useState("");

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

  useEffect(() => {
    console.log(topCarouselData);
  }, [topCarouselData]);

  return (
    <Container>
      <TopCarouselContainer>
        <TopCarousel
          horizontal={true}
          decelerationRate={0}
          snapToInterval={width}
          snapToAlignment={"center"}
        >
          {topCarouselData?.places?.map((item, idx) => {
            return (
              <TopCarouselPlace
                coverImageUrl={optimizeImage(item.coverImage)}
                width={width}
                height={height * 0.3}
                key={idx}
              />
              // <Text>item.coverImage </Text>
            );
          })}
        </TopCarousel>
      </TopCarouselContainer>
      <Text>Main </Text>
    </Container>
  );
}

const TopCarousel = styled.ScrollView`
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
`;

const Container = styled.View`
  flex: 1;
  /* justify-content: center;
  align-items: center; */
  background-color: ${colors.bgColor};
`;

const TopCarouselContainer = styled.View`
  width: ${width + "px"};
  height: ${height * 0.3 + "px"};
`;
