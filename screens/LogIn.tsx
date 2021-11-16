import styled from "styled-components/native";

interface Props {}

export default function Login(props: Props) {
  return (
    <Container>
      <Text>Login</Text>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Text = styled.Text``;
