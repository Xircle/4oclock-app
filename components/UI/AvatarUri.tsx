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
    if (this.props.source) {
      return (
        <AvatarImage
          source={{
            uri: optimizeImage(
              this.props.source,
              {
                width: this.props.size,
                height: this.props.size,
                quality: this.props.quality,
              },
              this.props.isSmall
            ),
          }}
          size={this.props.size}
        />
      );
    } else {
      return (
        <AvatarImage
          source={require("../../statics/images/anonymous_user.png")}
          size={this.props.size}
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
