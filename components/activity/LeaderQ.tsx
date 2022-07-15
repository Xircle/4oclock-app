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
    const { qAndA } = this.props;
    return (
      <Container>
        <Header>모임 생성자의 질문</Header>
        <InnerInfoContainer>
          <InfoText>
            📌{`    `}
            {qAndA?.[0]}
          </InfoText>
        </InnerInfoContainer>
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

const InfoText = styled(GeneralText)`
  font-size: 13px;
  color: ${colors.lightBlack};
  line-height: 22px;
  font-family: ${fontFamilies.light};
`;

const InnerInfoContainer = styled.View`
  margin-top: 22px;
  margin-top: 22px;
  background-color: rgba(219, 237, 255, 0.39);
  padding: 20px 16px;
  border-radius: 10px;
`;
