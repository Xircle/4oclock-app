import styled from "styled-components/native";
import React from "react";
import { colors, GeneralText } from "../../styles/styles";
import { ConvertSentTime } from "../../lib/utils";

interface Props {
  content: string;
  isMe: boolean;
  isRead: boolean;
  sentAt: Date;
}

export default function ChatMessage({ content, isMe, isRead, sentAt }: Props) {
  return (
    <Container isMe={isMe}>
      <Wrapper isMe={isMe}>
        <MessageText isMe={isMe}>{content}</MessageText>
      </Wrapper>
      <TimeText>{ConvertSentTime(sentAt)}</TimeText>
    </Container>
  );
}

const TimeText = styled(GeneralText)`
  color: ${colors.bareGrey};
  font-size: 12px;
  margin-left: 4px;
  margin-right: 4px;
`;

const Container = styled.View<{ isMe?: boolean }>`
  width: 100%;
  flex-direction: ${(props) => (props.isMe ? "row-reverse" : "row")};
  padding: 5px;
  align-items: flex-end;
`;

const Wrapper = styled.View<{ isMe?: boolean }>`
  background-color: ${(props) => (props.isMe ? colors.mainBlue : "#ededed")};
  padding: 10px;
  border-radius: 5px;
  max-width: 60%;
`;

const MessageText = styled(GeneralText)<{ isMe?: boolean }>`
  color: ${(props) => (props.isMe ? colors.bgColor : colors.black)};
`;
