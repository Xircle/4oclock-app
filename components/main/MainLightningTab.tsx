import React, { PureComponent } from "react";
import styled from "styled-components/native";
import { colors } from "../../styles/styles";

interface Props {}

export default class MainLightningTab extends PureComponent<Props> {
  constructor(props) {
    super(props);
  }
  render() {
    return <Container></Container>;
  }
}

const Container = styled.View`
  background-color: ${colors.bgColor};
`;
