import styled from "styled-components/native";
import React, { useEffect } from "react";
import { colors } from "../../styles/styles";
import { RouteProp } from "@react-navigation/native";
import { ActivityStackParamList } from "../../navigators/ActivityStackNav";

interface Props {
  route: RouteProp<ActivityStackParamList, "Reservation">;
}

export default function Reservation({ route }: Props) {
  useEffect(() => {
    console.log(route.params.detailAddress);
    console.log(route.params.participationFee);
    console.log(route.params.startDateFromNow);
    console.log(route.params.startTime);
  }, []);

  return <Container></Container>;
}

const Container = styled.View`
  flex: 1;
  background-color: ${colors.bgColor};
`;
