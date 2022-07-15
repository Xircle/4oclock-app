import React, { PureComponent } from "react";
import styled from "styled-components/native";
import { colors, fontFamilies, GeneralText } from "../../styles/styles";

interface Props {
  isClosed: boolean | undefined;
  leftParticipantsCount: number | undefined;
}

export default class PureLeftTagMainFlat extends PureComponent<Props> {
  constructor(props) {
    super(props);
  }

  render() {
    const { isClosed, leftParticipantsCount } = this.props;
    if (isClosed) {
      return (
        <LeftContainerOverlay>
          <ClosedText>마 감</ClosedText>
        </LeftContainerOverlay>
      );
    } else {
      return (
        <TagContainer>
          <Tag>잔여{leftParticipantsCount || "0"}석</Tag>
        </TagContainer>
      );
    }
  }
}

const ClosedText = styled(GeneralText)`
  color: ${colors.bgColor};
  font-family: ${fontFamilies.bold};
  font-size: 22px;
`;

const LeftContainerOverlay = styled.View`
  position: absolute;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background-color: rgba(52, 52, 52, 0.6);
  border-radius: 5px;
`;

const TagContainer = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  background-color: ${colors.mainBlue};
  justify-content: center;
  align-items: center;
  width: 58px;
  height: 22px;
  border-radius: 3px;
`;

const Tag = styled(GeneralText)`
  color: ${colors.bgColor};
  font-size: 11px;
  font-family: ${fontFamilies.bold};
`;
