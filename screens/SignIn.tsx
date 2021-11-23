import styled from "styled-components/native";
import React from "react";
import { Text } from "../styles/styles";
import { RouteProp } from "@react-navigation/native";
import { LoggedOutStackParamList } from "../navigators/LoggedOutNav";
import AvatarUri from "../components/UI/AvatarUri";

interface Props {
  route: RouteProp<LoggedOutStackParamList, "SignIn">;
}

export default function SignIn({ route }: Props) {
  console.log(route);
  return (
    <Container>
      <AvatarUri source={route.params.profileImageUrl} size={100} />
      <Text>{route.params.gender}</Text>
      <Text>{route.params.uid}</Text>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
