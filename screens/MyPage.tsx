import styled from "styled-components/native";

interface Props {}

export default function MyPage(props: Props) {
  return (
    <Container>
      <Text>profile</Text>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Text = styled.Text``;
