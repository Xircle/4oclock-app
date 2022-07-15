import React, { PureComponent } from "react";
import styled from "styled-components/native";
import { colors, fontFamilies, GeneralText } from "../../styles/styles";
import AvatarUri from "../UI/AvatarUri";

interface Props {
  profileImgUrl: string;
  job: string;
  shortBio: string;
  qAndA: string[];
}

export default class ParticipantsPC extends PureComponent<Props> {
  constructor(props) {
    super(props);
  }

  render() {
    const { profileImgUrl, job, qAndA, shortBio } = this.props;
    return (
      <ParticipantsWrapper>
        <ParticipantsLeftContainer>
          <AvatarUri source={profileImgUrl} size={45} quality={10} isSmall />
        </ParticipantsLeftContainer>
        <ParticipantsRightContainer>
          <JobText numberOfLines={1}>{job}</JobText>
          <ShortBioText numberOfLines={2}>
            {qAndA ? qAndA[0] : shortBio}
          </ShortBioText>
        </ParticipantsRightContainer>
      </ParticipantsWrapper>
    );
  }
}

const ParticipantsWrapper = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  padding-top: 5px;
  padding-bottom: 5px;
`;

const ParticipantsLeftContainer = styled.View`
  padding: 5px;
`;

const ParticipantsRightContainer = styled.View`
  padding: 5px;
  flex: 1;
`;

const JobText = styled(GeneralText)`
  color: ${colors.bareGrey};
  font-family: ${fontFamilies.light};
`;

const ShortBioText = styled(GeneralText)`
  font-family: ${fontFamilies.light};
`;
