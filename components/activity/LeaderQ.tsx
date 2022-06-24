import React, { PureComponent } from "react";
import styled from "styled-components/native";
import { colors, fontFamilies, GeneralText } from "../../styles/styles";
import AvatarUri from "../UI/AvatarUri";

interface Props {
  qAndA: string[];
}

export default class LeaderQ extends PureComponent<Props> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container>
        <Header>모임 생성자의 질문</Header>
        <ShortBioText numberOfLines={2}>
          {this.props.qAndA ? this.props.qAndA[0] : "hihi"}
        </ShortBioText>
      </Container>
    );
  }
}

const Container = styled.View`
  width: 100%;
  padding-top: 5px;
  padding-bottom: 5px;
`;

const Header = styled(GeneralText)`
  font-family: ${fontFamilies.bold};
  font-size: 20px;
`;

const ShortBioText = styled(GeneralText)`
  font-family: ${fontFamilies.light};
`;
