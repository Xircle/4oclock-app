import styled from "styled-components/native";
import React, { useEffect, useState } from "react";
import { Image } from "react-native";
import { colors, Text } from "../styles/styles";
import { useDB } from "../lib/RealmDB";
import storage from "../lib/helpers/myAsyncStorage";

interface Props {}

export default function Main(props: Props) {
  const realm = useDB();
  const [temp, setTemp] = useState("");
  const t = async () => {
    const tt = await storage.getItem("token");
  };
  useEffect(() => {
    t();
  }, []);

  return (
    <Container>
      <Image
        source={require("../statics/images/mascot.png")}
        style={{ width: 300, resizeMode: "contain" }}
      />
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
