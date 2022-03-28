import React, { PureComponent } from "react";
import styled from "styled-components/native";
import { fontFamilies, GeneralText, colors } from "../../styles/styles";

interface Props {
  name: string | undefined;
  description: string | undefined;
  recommendation?: string | undefined;
}

export default class PureInfoMainFlat extends PureComponent<Props> {
  constructor(props) {
    super(props);
  }

  render() {
    const name =
      this.props.name?.length > 10
        ? this.props.name.slice(0, 10) + "..."
        : this.props.name;

    const recommendation =
      this.props.recommendation && this.props.recommendation.length > 15
        ? this.props.recommendation.slice(0, 15) + "..."
        : this.props.recommendation;

    const description =
      this.props.description && this.props.description.length > 15
        ? this.props.description.slice(0, 15) + "..."
        : this.props.description;
    return (
      <>
        <Heading>{name}</Heading>
        <RecommendationText>{recommendation}</RecommendationText>
        <DescriptionText>{description}</DescriptionText>
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

const RecommendationText = styled(GeneralText)`
  font-size: 12px;
  font-family: ${fontFamilies.medium};
  color: #1c43b7;
`;