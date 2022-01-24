import { Dimensions } from "react-native";
import styled from "styled-components/native";

const { width, height } = Dimensions.get("window");

export const colors = {
  lightBlack: "#505050",
  black: "#12121D",
  mainBlue: "#18A0FB",
  bgColor: "#FFFFFF",
  midGrey: "#6F7789",
  bareGrey: "#A7B0C0",
  lightBlue: "#DBEDFF",
  warningRed: "#FF7F7F",
};

export const fontFamilies = {
  bold: "SpoqaHanSansNeo-Bold",
  medium: "SpoqaHanSansNeo-Medium",
  regular: "SpoqaHanSansNeo-Regular",
  light: "SpoqaHanSansNeo-Light",
  thin: "SpoqaHanSansNeo-Thin",
};

export const MainHeading = styled.Text`
  font-size: 26px;
  color: ${colors.black};
  font-family: ${fontFamilies.bold};
`;

export const SubHeading = styled.Text`
  font-size: 16px;
  color: ${colors.midGrey};
  font-family: ${fontFamilies.regular};
`;

export const XLButton = styled.TouchableOpacity<{
  disabled?: boolean;
  bgColor?: string;
}>`
  background-color: ${(props) =>
    props.disabled
      ? colors.bareGrey
      : props.bgColor
      ? props.bgColor
      : colors.mainBlue};
  border-radius: ${width / 25 + "px"};
  width: ${width * 0.9 + "px"};
  height: ${width * 0.14 + "px"};
  justify-content: center;
  align-items: center;
`;

export const XLButtonText = styled.Text`
  color: #ffffff;
  font-size: ${width / 20 + "px"};
  font-family: ${fontFamilies.medium};
`;

export const GeneralText = styled.Text`
  font-size: 16px;
  font-family: ${fontFamilies.regular};
`;

export const InfoBox = styled.View`
  padding: 20px;
  background-color: ${colors.lightBlue};
  border-radius: 5px;
  width: 100%;
  font-family: ${fontFamilies.regular};
`;

export const InfoText = styled.Text`
  color: ${colors.mainBlue};
  font-family: ${fontFamilies.regular};
  font-size: 13px;
  line-height: 20px;
`;

export const BigTextInput = styled.TextInput`
  width: 100%;
  padding: 10px 10px;
  border-radius: 12px;
  font-size: 16px;
  border: 0.5px solid ${colors.midGrey};
  font-family: ${fontFamilies.regular};
`;

export const ChatInput = styled(BigTextInput)`
  width: 85%;
  padding: 12px 10px;
  border-radius: 0px;
  border-width: 0px;
  border-bottom-color: ${colors.black};
  border-bottom-width: 1px;
`;

export const GreyLabel = styled.Text`
  color: ${colors.midGrey};
  font-size: 16px;
  font-family: ${fontFamilies.regular};
`;

export const BlackLabel = styled.Text`
  color: ${colors.black};
  font-size: 16px;
  font-family: ${fontFamilies.regular};
`;

export const Text = styled.Text`
  font-family: ${fontFamilies.regular};
`;

export const GreyInfoText = styled(GeneralText)`
  color: ${colors.bareGrey};
`;

export const ErrorMessage = styled(Text)`
  font-size: 11px;
  /* text-align: center; */
  margin-top: 5px;
  color: ${colors.mainBlue};
`;

export const TextArea = styled(BigTextInput)`
  text-align-vertical: top;
`;
