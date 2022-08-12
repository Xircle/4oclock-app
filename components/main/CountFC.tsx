import React, { PureComponent } from "react";
import styled from "styled-components/native";
import { colors, fontFamilies, GeneralText } from "../../styles/styles";

interface Props {
  totalPointThisSeason?: number | undefined;
  myPointThisSeason?: number | undefined;
}

export default class CountFC extends PureComponent<Props> {
  constructor(props) {
    super(props);
  }

  render() {
    const { totalPointThisSeason, myPointThisSeason } = this.props;

    return (
      <HeaderContainer>
        <TopContainer>
          <HeaderTopText>프렌즈의 출석도장 🙋🏼</HeaderTopText>
          <HeaderInnerWrapper>
            <HeaderTopSubText>정기모임 </HeaderTopSubText>
            <HeaderTopSubHighlight>
              {totalPointThisSeason ?? "?"} 회 이상 참석시
            </HeaderTopSubHighlight>
            <HeaderTopSubText> 보증금 2만원을 환급해줘!</HeaderTopSubText>
          </HeaderInnerWrapper>
        </TopContainer>
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
          <CountLeftContainer>
            <CountMainText>정기모임</CountMainText>
            <CountSubText>매주 열려요🔥</CountSubText>
          </CountLeftContainer>
          <CountRightContainer>
            <CountRightWrapper>
              <CountMyText>{myPointThisSeason ?? "?"}</CountMyText>
              <CountRestText>{" 회"}</CountRestText>
              <CountDivider>{" / "}</CountDivider>
              <CountTotalText>{totalPointThisSeason ?? "?"}</CountTotalText>
              <CountRestText>{" 회"}</CountRestText>
            </CountRightWrapper>
          </CountRightContainer>
        </HeaderCountContainer>
      </HeaderContainer>
    );
  }
}

const TopContainer = styled.View`
  width: 90%;
  margin-bottom: 10px;
`;

const HeaderTopText = styled(GeneralText)`
  font-size: 20px;
  font-family: ${fontFamilies.bold};
`;

const HeaderInnerWrapper = styled.View`
  flex-direction: row;
`;

const HeaderTopSubText = styled(GeneralText)`
  font-size: 12px;
  font-family: ${fontFamilies.thin};
`;

const HeaderTopSubHighlight = styled(HeaderTopSubText)`
  font-family: ${fontFamilies.bold};
  color: ${colors.pureMagenta};
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
`;

const CountLeftContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const CountRightContainer = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const CountRightWrapper = styled.View`
  flex-direction: row;
  align-items: flex-end;
`;

const CountMainText = styled(GeneralText)`
  font-size: 18px;
  font-family: ${fontFamilies.bold};
`;

const CountSubText = styled(GeneralText)`
  margin-top: 3px;
  font-size: 10px;
  font-family: ${fontFamilies.light};
`;

const CountMyText = styled(GeneralText)`
  font-size: 28px;
  font-family: ${fontFamilies.bold};
`;

const CountTotalText = styled(CountMyText)`
  color: #ff00ef;
`;

const CountDivider = styled(CountMyText)`
  font-family: ${fontFamilies.light};
`;

const CountRestText = styled(GeneralText)``;
