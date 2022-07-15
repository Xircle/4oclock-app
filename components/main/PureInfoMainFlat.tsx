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
    const { name, recommendation, description } = this.props;
    const nameModified = name?.length > 10 ? name.slice(0, 10) + "..." : name;

    const recommendationModified =
      recommendation && recommendation.length > 15
        ? recommendation.slice(0, 15) + "..."
        : recommendation;

    const descriptionModified =
      description && description.length > 15
        ? description.slice(0, 15) + "..."
        : description;
    return (
      <>
        <Heading>{nameModified}</Heading>
        <RecommendationText>{recommendationModified}</RecommendationText>
        <DescriptionText>{descriptionModified}</DescriptionText>
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
