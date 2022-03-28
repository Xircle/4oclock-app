import styled from "styled-components/native";
import React from "react";
import { Animated, Dimensions } from "react-native";
import { colors, GeneralText } from "../../styles/styles";

interface Props {
  setMiddleTabIndex: (value: React.SetStateAction<number>) => void;
  middleTabAnim: (
    middleTab: number,
    position: Animated.Value
  ) => Animated.CompositeAnimation;
  middleTabIndex: number;
  position: Animated.Value;
}

const { width, height } = Dimensions.get("window");

function MainMiddleTab({
  setMiddleTabIndex,
  middleTabAnim,
  middleTabIndex,
  position,
}: Props) {
  return (
    <MiddleTabContainer>
      <MiddleTab
        onPress={() => {
          setMiddleTabIndex(0);
          middleTabAnim(0, position).start();
        }}
      >
        <MiddleTabTextWrapper isSelected={middleTabIndex === 0}>
          <MiddleTabText isSelected={middleTabIndex === 0}>
            번개⚡
          </MiddleTabText>
        </MiddleTabTextWrapper>
      </MiddleTab>
      <MiddleTab
        onPress={() => {
          setMiddleTabIndex(1);
          middleTabAnim(1, position).start();
        }}
      >
        <MiddleTabTextWrapper isSelected={middleTabIndex === 1}>
          <MiddleTabText isSelected={middleTabIndex === 1}>
            정기👾
          </MiddleTabText>
        </MiddleTabTextWrapper>
      </MiddleTab>
      <MiddleTab
        onPress={() => {
          setMiddleTabIndex(2);
          middleTabAnim(2, position).start();
        }}
      >
        <MiddleTabTextWrapper isSelected={middleTabIndex === 2}>
          <MiddleTabText isSelected={middleTabIndex === 2}>
            이벤트💖
          </MiddleTabText>
        </MiddleTabTextWrapper>
      </MiddleTab>
    </MiddleTabContainer>
  );
}

export default React.memo(MainMiddleTab);

const MiddleTabContainer = styled.View`
  width: ${width + "px"};
  height: ${height * 0.1 + "px"};
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const MiddleTab = styled.TouchableOpacity`
  flex: 0.3;
  justify-content: center;
  align-items: center;
`;

const MiddleTabTextWrapper = styled.View<{ isSelcted: boolean }>`
  border-bottom-width: ${(props) => (props.isSelected ? "1px" : 0)};
  border-color: ${colors.black};
  position: relative;
`;

const MiddleTabText = styled(GeneralText)<{ isSelcted: boolean }>`
  font-size: 20px;
  padding: 12px;
  color: ${(props) => (props.isSelected ? colors.black : colors.bareGrey)};
`;
