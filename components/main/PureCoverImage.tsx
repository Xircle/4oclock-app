import React, { PureComponent } from "react";
import FastImage from "react-native-fast-image";
import styled from "styled-components/native";
import optimizeImage from "../../lib/helpers/optimizeImage";
import { colors } from "../../styles/styles";

interface Props {
  source?: string;
}

export default class PureCoverImage extends PureComponent<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { source } = this.props;
    if (source) {
      return (
        <CoverImage
          source={{
            uri: optimizeImage(source, {
              width: 130,
              height: 130,
              quality: 10,
            }),
            priority: FastImage.priority.high,
          }}
        />
      );
    }
    return <EmptyImage />;
  }
}

const CoverImage = styled(FastImage)`
  width: 100%;
  height: 100%;
  border-radius: 5px;
`;

const EmptyImage = styled.View`
  width: 100%;
  height: 100%;
  border-radius: 5px;
  background-color: ${colors.bareGrey};
`;
