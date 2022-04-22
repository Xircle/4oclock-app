import React, { PureComponent } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";
import { colors } from "../styles/styles";

type Props = {};

export default class ActivityManageScreen extends PureComponent<Props> {
  render() {
    return (
      <Container>
        <SafeAreaView style={{ backgroundColor: colors.bgColor, flex: 1 }}>
          <Header>테스트</Header>
        </SafeAreaView>
      </Container>
    );
  }
}

const Container = styled.ScrollView`
  flex: 1;
  background-color: ${colors.bgColor};
`;

const Header = styled.Text``;
