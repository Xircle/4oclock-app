import { useQuery } from "react-query";
import styled from "styled-components/native";
import { MyPlaceData } from "../../lib/api/types";
import React from "react";
import { getMyPlaces } from "../../lib/api/getMyPlaces";
import { colors } from "../../styles/styles";
import { ScrollView } from "react-native-gesture-handler";
import MyPageFlatlistPlace from "../../components/profile/MyPlacesFlatList";

interface Props {}

export default function MyActivities(props: Props) {
  const {
    data: myPlacesData,
    isLoading,
    refetch,
  } = useQuery<MyPlaceData[]>("myPlaces", () => getMyPlaces(), {
    retry: 1,
    refetchOnWindowFocus: false,
  });

  return (
    <Container>
      <InnerContainer>
        <ScrollView showsVerticalScrollIndicator={false}>
          {myPlacesData?.map((item, index) => {
            return (
              <MyPageFlatlistPlace
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
      </InnerContainer>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: ${colors.bgColor};
`;

const InnerContainer = styled.View`
  flex: 1;
  padding: 15px;
`;

const BottomSpace = styled.View`
  width: 100%;
  height: 100px;
  background-color: #f0f0f0;
`;
