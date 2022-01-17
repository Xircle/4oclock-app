import styled from "styled-components/native";

interface Props {
  content: string;
  isMe: boolean;
  isRead: boolean;
  sentAd: Date;
}

export default function ChatMessage({isMe}: Props) {
return <Container>{isMe? '나' : '너'}</Container>;
}

const Container = styled.View`
  width: 100%;
  height: 60px;
`;
