import styled from "styled-components/native";
import React from "react";
import { colors, GeneralText } from "../../styles/styles";

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
    </Container>
  );
}

const Container = styled.View<{ isMe?: boolean }>`
  width: 100%;
  flex-direction: row;
  justify-content: ${(props) => (props.isMe ? "flex-end" : "flex-start")};
  padding: 5px;
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
