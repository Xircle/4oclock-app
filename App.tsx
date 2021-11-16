import React from "react";
import { Text, View } from "react-native";
import styled from "styled-components/native";
import AvatarUri from "./components/AvatarUri";
import Loader from "./components/Loader";

export default function App() {
  return (
    <Container>
      <AvatarUri
        size={300}
        source={
          "https://xircle-profile-upload.s3.ap-northeast-2.amazonaws.com/uploads/-340b910c-1b94-400f-80ac-14f39d454bc4-1636351789614-%EC%BA%A1%EC%B2%98.JPG"
        }
      />
      <Loader size={"large"} />
    </Container>
  );
}

// TODO: delete Container after comonentify
const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
