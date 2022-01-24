import styled from "styled-components/native";
import React from "react";
import optimizeImage from "../../lib/helpers/optimizeImage";
import FastImage from "react-native-fast-image";

interface Props {
  source?: string;
  size: number;
  isSmall?: boolean;
}

export default function AvatarUri({ size, source, isSmall }: Props) {
  if (source) {
    return (
      <AvatarImage
        source={{
          uri: optimizeImage(source, { width: size, height: size }, isSmall),
        }}
        size={size}
      />
    );
  } else {
    return null;
  }
}

const AvatarImage = styled(FastImage)<{ size: number }>`
  width: ${(props) => props.size + "px"};
  height: ${(props) => props.size + "px"};
  border-radius: ${(props) => props.size / 2 + "px"};
`;
