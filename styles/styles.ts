import { Dimensions } from "react-native";
import styled from "styled-components/native";

const { width, height } = Dimensions.get("window");

export const colors = {
  black: "#12121D",
  mainBlue: "#18A0FB",
  bgColor: "#FFFFFF",
  midGrey: "#6F7789",
  bareGrey: "#A7B0C0",
  lightBlue: "#DBEDFF",
};

export const MainHeading = styled.Text`
  font-size: 26px;
  font-weight: 700;
  color: ${colors.black};
`;

export const XLButton = styled.TouchableOpacity<{
  disabled?: boolean;
  bgColor?: string;
}>`
  background-color: ${(props) =>
    props.disabled
      ? colors.midGrey
      : props.bgColor
      ? props.bgColor
      : colors.mainBlue};
  border-radius: ${width / 30 + "px"};
  width: ${width * 0.9 + "px"};
  height: ${width * 0.18 + "px"};
  justify-content: center;
  align-items: center;
`;

export const XLButtonText = styled.Text`
  color: #ffffff;
  font-size: ${width / 17 + "px"};
  font-weight: 600;
`;

export const GeneralText = styled.Text`
  font-size: 16px;
`;

export const InfoBox = styled.View`
  padding: 20px;
  background-color: ${colors.lightBlue};
  border-radius: 5px;
  width: 100%;
`;

export const InfoText = styled.Text`
  color: ${colors.mainBlue};
  font-weight: 400;
  font-size: 13px;
  line-height: 20px;
`;

export const BigTextInput = styled.TextInput`
  width: 100%;
  padding: 10px 10px;
  border-radius: 12px;
  font-size: 16px;
  border: 0.5px solid ${colors.midGrey};
  text-align-vertical: top;
`;

export const Label = styled.Text`
  color: ${colors.midGrey};
  font-size: 16px;
`;
