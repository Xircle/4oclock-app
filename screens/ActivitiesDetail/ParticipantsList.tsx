import React from "react";
import { View } from "react-native";
import styled from "styled-components/native";
import { ParticipantsData } from "../../lib/api/types";
import { MainHeading } from "../../styles/styles";

type Props = {
  participants: ParticipantsData[];
};

export default function ParticipantsList({}: Props) {
  return (
    <Container showsVerticalScrollIndicator={false}>
      <Heading>ParticipantsList</Heading>
    </Container>
  );
}

const Container = styled.ScrollView``;

const Heading = styled(MainHeading)``;
