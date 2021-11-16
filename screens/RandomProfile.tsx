import styled from "styled-components/native";

interface Props {}

export default function RandomProfile(props: Props) {
  return (
    <Container>
      <Text>random profile</Text>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Text = styled.Text``;
