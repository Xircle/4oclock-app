import React, { useEffect } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { useQuery } from "react-query";
import styled from "styled-components/native";
import { MyCreatedPlaceData } from "../../lib/api/types";
import { colors } from "../../styles/styles";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { getMyPlacesCreated } from "../../lib/api/getMyPlacesCreated";
import MyCreatedPlacesFlatList from "../../components/profile/MyCreatedPlacesFlatList";
import { typeEnToKo } from "../../lib/api/createPlace";
type Props = {};

const CreatedActivityScreen = (props: Props) => {
  const navigation = useNavigation();
  const { data: myCreatedPlacesData, refetch } = useQuery<MyCreatedPlaceData[]>(
    "myPlacesCreated",
    () => getMyPlacesCreated(),
    {
      retry: 1,
      refetchOnWindowFocus: false,
    }
  );

  useEffect(() => {
    let isFocused = true;
    navigation.addListener("focus", (e) => {
      try {
        // Do something
        if (isFocused) {
          refetch();
          console.log("hi CAS");
        }
      } catch (e) {}
    });

    return () => {
      isFocused = false;
    };
  }, []);
  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        {myCreatedPlacesData &&
          myCreatedPlacesData?.map((item, index) => {
            return (
              <MyCreatedPlacesFlatList
                key={index}
                coverImage={item.coverImage}
                name={item.name}
                id={item.id}
                startDateFromNow={item.startDateFromNow}
                description={item.placeDetail.description}
                refetch={refetch}
                isRefetch={true}
                kakaoPlaceId={item.kakaoPlaceId}
                isClosed={item.isClosed}
                subImages={item.subImages}
                activityType={typeEnToKo[item.placeType]}
                maxParticipantsNumber={item.placeDetail.maxParticipantsNumber}
                detailAddress={item.placeDetail.detailAddress}
                participationFee={item.placeDetail.participationFee + ""}
                startDateAt={item.startDateAt}
                kakaoLink={item.placeDetail.kakaoLink}
                team={item.team_id}
                recommendation={item.recommendation}
              />
            );
          })}
      </ScrollView>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: ${colors.white};
`;

export default CreatedActivityScreen;
