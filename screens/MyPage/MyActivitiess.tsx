import { useQuery } from "react-query";
import styled from "styled-components/native";
import { MyPlaceData } from "../../lib/api/types";
import React, { useEffect } from "react";
import { getMyPlaces } from "../../lib/api/getMyPlaces";
import { colors, Text } from "../../styles/styles";

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
      <Text>MyPlaces</Text>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${colors.bgColor};
`;
