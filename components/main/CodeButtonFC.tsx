import React, { PureComponent } from "react";
import styled from "styled-components/native";
import { colors, fontFamilies, GeneralText } from "../../styles/styles";

interface Props {
  text?: string;
}

export default class CodeButtonFC extends PureComponent<Props> {
  constructor(props) {
    super(props);
  }

  render() {
    const { text } = this.props;

    return (
      <HeaderContainer>
        <HeaderCountContainer
          style={{
            shadowColor: "#000",
            shadowOffset: {
              width: 1,
              height: 1,
            },
            shadowOpacity: 0.15,
            shadowRadius: 10,

            elevation: 1,
          }}
        >
          <ButtonText>{text}</ButtonText>
          <PlusContainer>
            <PlusWrapper>
              <Plus>+</Plus>
            </PlusWrapper>
          </PlusContainer>
        </HeaderCountContainer>
      </HeaderContainer>
    );
  }
}

const PlusContainer = styled.View`
  background-color: ${colors.vividCyan};
  height: 40px;
  width: 40px;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
`;

const HeaderTopText = styled(GeneralText)`
  font-size: 20px;
  font-family: ${fontFamilies.bold};
`;

const HeaderContainer = styled.View`
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const HeaderCountContainer = styled.View`
  width: 90%;
  height: 70px;
  background-color: ${colors.white};
  border-radius: 10px;
  flex-direction: row;
  margin-left: auto;
  margin-right: auto;
  justify-content: space-around;
  align-items: center;
`;

const ButtonText = styled(HeaderTopText)`
  font-size: 15px;
`;

const PlusWrapper = styled.View``;

const Plus = styled(HeaderTopText)`
  font-size: 35px;
`;
