import { useQuery } from "react-query";
import styled from "styled-components/native";
import { MyPlaceData } from "../../lib/api/types";
import React, { useEffect } from "react";
import { getMyPlaces } from "../../lib/api/getMyPlaces";
import { colors, Text } from "../../styles/styles";
import { ScrollView } from "react-native-gesture-handler";
import FlatListPlace from "../../components/main/FlatListPlace";

interface Props {}

export default function MyActivities(props: Props) {
  const { data: myPlacesData, isLoading } = useQuery<MyPlaceData[]>(
    "myPlaces",
    () => getMyPlaces(),
    { retry: 1, refetchOnWindowFocus: false }
  );

  useEffect(() => {
    if (myPlacesData) console.log(myPlacesData);
  }, [myPlacesData]);
  return (
    <Container>
      <InnerContainer>
        <ScrollView>
          {myPlacesData?.map((item, index) => {
            return (
              <FlatListPlace
                key={index}
                coverImage={item.coverImage}
                name={item.name}
                id={item.id}
                startDateFromNow={item.startDateFromNow}
                description={item.description}
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