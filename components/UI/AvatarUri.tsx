import styled from "styled-components/native";
import React, { memo, useEffect, useState, PureComponent } from "react";
import optimizeImage from "../../lib/helpers/optimizeImage";
import FastImage from "react-native-fast-image";

interface Props {
  source?: string;
  size: number;
  quality?: number;
  isSmall?: boolean;
}

class AvatarUri extends PureComponent<Props> {
  constructor(props) {
    super(props);
  }
  render() {
    const { source, size, quality, isSmall } = this.props;
    if (source) {
      return (
        <AvatarImage
          source={{
            uri: optimizeImage(
              source,
              {
                width: size,
                height: size,
                quality: quality,
              },
              isSmall
            ),
          }}
          size={size}
        />
      );
    } else {
      return (
        <AvatarImage
          source={require("../../statics/images/anonymous_user.png")}
          size={size}
        />
      );
    }
  }
}

export default AvatarUri;

const AvatarImage = styled(FastImage)<{ size: number }>`
  width: ${(props) => props.size + "px"};
  height: ${(props) => props.size + "px"};
  border-radius: ${(props) => props.size / 2 + "px"};
`;
