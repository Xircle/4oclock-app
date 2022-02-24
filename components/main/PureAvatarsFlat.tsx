import React, { PureComponent } from "react";
import styled from "styled-components/native";
import { Participants } from "../../lib/api/types";
import { GeneralText, colors } from "../../styles/styles";
import AvatarUri from "../UI/AvatarUri";

interface Props {
  participants?: Participants[];
  length?: number | undefined;
}

export default class PureAvatarsFlat extends PureComponent<Props> {
  constructor(props) {
    super(props);

  }

  render() {
    if (this.props.participants && this.props.length) {
      return (
        <AvatarContainer>
          {this.props.participants?.map((item, index) => {
            if (index < 4) {
              return (
                <AvartarWrapper key={item.userId}>
                  <AvatarUri
                    source={item.profileImgUrl}
                    size={38}
                    quality={10}
                    isSmall
                  />
                </AvartarWrapper>
              );
            }
          })}
          {this.props.participants?.length > 4 ? (
            <AvatarNumText>+ {this.props.participants.length - 4}</AvatarNumText>
          ) : null}
        </AvatarContainer>
      );
    }
    return <></>
  }
}

const AvatarContainer = styled.View`
  flex-direction: row;
  margin-top: 8px;
  align-items: center;
`;

const AvartarWrapper = styled.View`
  margin-left: -5px;
`;

const AvatarNumText = styled(GeneralText)`
  color: ${colors.lightBlack};
  margin-left: 10px;
`;
