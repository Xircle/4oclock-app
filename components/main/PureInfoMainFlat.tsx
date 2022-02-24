import React, { PureComponent } from "react";
import styled from "styled-components/native";
import { fontFamilies, GeneralText, colors } from "../../styles/styles";

interface Props {
  name: string | undefined;
  description: string | undefined;
}

export default class PureInfoMainFlat extends PureComponent<Props> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <Heading>
          {this.props.name?.length > 11
            ? this.props.name.slice(0, 11) + "..."
            : this.props.name}
        </Heading>
        <DescriptionText>
          {this.props.description && this.props.description.length > 18
            ? this.props.description.slice(0, 18) + "..."
            : this.props.description}
        </DescriptionText>
      </>
    );
  }
}

const Heading = styled(GeneralText)`
  font-family: ${fontFamilies.medium};
  font-size: 18px;
  margin-top: 3px;
  margin-bottom: 3px;
`;

const DescriptionText = styled(GeneralText)`
  font-size: 12px;
  font-family: ${fontFamilies.regular};
  color: ${colors.bareGrey};
`;
