import styled from "styled-components/native";
import React from "react";
import { Dimensions } from "react-native";

interface Props {
  onPress?: () => void;
  bgColor?: string;
  borderColor?: string;
  disabled?: boolean;
  width?: string;
  height?: string;
  children?: React.ReactNode | React.ReactNode[];
}

const { width } = Dimensions.get("window");

export default function XLButton({
  onPress,
  children,
  bgColor,
  borderColor,
  disabled,
}: Props) {
  return (
    <Button
      onPress={!disabled && onPress}
      disabled={disabled}
      bgColor={bgColor}
      borderColor={borderColor}
    >
      {children}
    </Button>
  );
}

const Button = styled.TouchableOpacity<{ disabled: boolean; bgColor: string }>`
  background-color: ${(props) =>
    props.disabled ? "grey" : props.bgColor ? props.bgColor : "blue"};
  border-radius: ${width / 30 + "px"};
  width: ${width * 0.9 + "px"};
  height: ${width * 0.18 + "px"};
  justify-content: center;
  align-items: center;
`;

export const ButtonText = styled.Text`
  color: #ffffff;
  font-size: ${width / 17 + "px"};
  font-weight: 600;
`;
