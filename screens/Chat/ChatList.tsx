import styled from "styled-components/native";
import { GeneralText } from "../../styles/styles";

interface Props {}

export default function ChatList(props: Props) {
  return (
    <Container>
      <ToBeDeletedText>챗리스트</ToBeDeletedText>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
`;

const ToBeDeletedText = styled(GeneralText)``;
