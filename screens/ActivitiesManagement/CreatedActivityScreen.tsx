import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import { useQuery } from "react-query";
import styled from "styled-components/native";
import { MyCreatedPlaceData } from "../../lib/api/types";
import { colors } from "../../styles/styles";
import { useFocusEffect } from "@react-navigation/native";
import { getMyPlacesCreated } from "../../lib/api/getMyPlacesCreated";
import MyCreatedPlacesFlatList from "../../components/profile/MyCreatedPlacesFlatList";

type Props = {};

const CreatedActivityScreen = (props: Props) => {
  const {
    data: myCreatedPlacesData,
    isLoading,
    refetch,
  } = useQuery<MyCreatedPlaceData[]>("myPlaces", () => getMyPlacesCreated(), {
    retry: 1,
    refetchOnWindowFocus: false,
  });
  useFocusEffect(() => {
    refetch();
  });

  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        {myCreatedPlacesData?.map((item, index) => {
          return (
            <MyCreatedPlacesFlatList
              key={index}
              coverImage={item.coverImage}
              name={item.name}
              id={item.id}
              startDateFromNow={item.startDateFromNow}
              description={item.description}
              refetch={refetch}
              isRefetch={true}
              kakaoPlaceId={item.kakaoPlaceId}
              isClosed={item.isClosed}
            />
          );
        })}
      </ScrollView>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: ${colors.bgColor};
`;

export default CreatedActivityScreen;
