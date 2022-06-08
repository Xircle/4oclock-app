import styled from "styled-components/native";
import React, { PureComponent } from "react";
import { colors, GreyInfoText, MainHeading } from "../../styles/styles";

interface Props {}

export default class AuthAgree extends PureComponent<Props> {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Container>
        <MainHeading style={{ marginTop: 40 }}>
          연고이팅 크루가{"\n"}된 걸 환영해🎉
        </MainHeading>
        <GreyInfoText style={{ marginTop: 20 }}>
          이제 친구들과 맛있는 밥먹으며 놀러가자!!!
        </GreyInfoText>
      </Container>
    );
  }
}

const Container = styled.ScrollView`
  background-color: ${colors.bgColor};
  padding: 15px;
`;
