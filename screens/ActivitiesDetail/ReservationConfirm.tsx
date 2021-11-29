import styled from "styled-components/native";
import React from "react";
import { colors } from "../../styles/styles";

interface Props {}

export default function ReservationConfirm(props: Props) {
  return <Container></Container>;
}

const Container = styled.View`
  flex: 1;
  background-color: ${colors.bgColor};
`;

const InfoContainer = styled.View`
  width: 100%;
  margin-top: 30px;
  padding: 0px 20px 30px;
  border-bottom-width: 0.3px;
  border-color: ${colors.bareGrey};
`;
