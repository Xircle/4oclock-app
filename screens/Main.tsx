import styled from "styled-components/native";
import React, { useEffect, useState } from "react";
import {} from "react-native";
import { colors, Text } from "../styles/styles";
import { useDB } from "../lib/RealmDB";
import storage from "../lib/helpers/myAsyncStorage";

interface Props {}

export default function Main(props: Props) {
  const realm = useDB();
  const [temp, setTemp] = useState("");
  const t = async () => {
    const tt = await storage.getItem("token");
    console.log(tt);
  };
  useEffect(() => {
    t();
  }, []);

  return (
    <Container>
      <Text>Main </Text>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${colors.bgColor};
`;

