import { Dimensions } from "react-native";
import styled from "styled-components/native";

const { width, height } = Dimensions.get("window");

export const colors = {
  lightBlack: "#505050",
  black: "#12121D",
  vividBlue: "#18A0FB",
  white: "#FFFFFF",
  midGrey: "#6F7789",
  bareGrey: "#A7B0C0",
  veryPaleBlue: "#DBEDFF",
  veryLightRed: "#FF7F7F",
  pureMagenta: "#ff00ef",
  vividOrange: "#F15F24",
  vividCyan: "#21E19C",
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

export const CASContainer = styled.View`
  flex: 1;
  background-color: ${colors.white};
  padding-top: 20px;
  padding-left: 15px;
  padding-right: 15px;
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
  background-color: ${colors.veryPaleBlue};
  border-radius: 5px;
  width: 100%;
  font-family: ${fontFamilies.regular};
`;

export const InfoText = styled.Text`
  color: ${colors.vividBlue};
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

export const UnderLineInput = styled(BigTextInput)`
  margin-top: 50px;
  height: 50px;
  border-radius: 0px;
  border: none;
  border-bottom-width: 0.5px;
  border-color: ${colors.bareGrey};
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
  color: ${colors.vividBlue};
`;

export const TextArea = styled(BigTextInput)`
  text-align-vertical: top;
`;

export const ModalButton = styled.TouchableOpacity`
  width: 90%;
  height: 70px;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
`;

export const ModalButtonText = styled(GeneralText)`
  font-size: 22px;
  color: ${colors.white};
  font-family: ${fontFamilies.bold};
`;

export const ModalCloseButton = styled(ModalButton)`
  background-color: ${colors.bareGrey};
  height: 50px;
`;

export const ModalReportButton = styled(ModalButton)`
  background-color: ${colors.veryLightRed};
  height: 50px;
`;

export const ModalBlueButton = styled(ModalReportButton)`
  background-color: ${colors.vividBlue};
`;

export const MyAlert = styled.View`
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: red;
  position: absolute;
  left: -7px;
  top: -7px;
`;

export const SpaceBetweenWrapper = styled.View`
  flex: 1;
  justify-content: space-between;
  width: 100%;
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
      : colors.vividBlue};
  border-radius: ${width / 25 + "px"};
  width: ${width * 0.9 + "px"};
  height: ${width * 0.14 + "px"};
  justify-content: center;
  align-items: center;
`;
