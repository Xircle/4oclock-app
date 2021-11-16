import styled from "styled-components/native";

interface Props {}

export default function SignIn(props: Props) {
  return (
    <Container>
      <Text>sign in</Text>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Text = styled.Text``;
